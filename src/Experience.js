/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo, useRef } from 'react';
import {
  //   EnvironmentMap,
  useGLTF,
  //   OrbitControls,
  //   Sky,
  //   Environment,
  shaderMaterial,
  MeshReflectorMaterial,
  MeshWobbleMaterial,
  MeshRefractionMaterial,
} from '@react-three/drei';
import { InstancedRigidBodies, Physics, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useLoader, extend, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DoubleSide } from 'three';
import portalVertexShader from './shaders/portal/vertex.js';
import portalfragmentShader from './shaders/portal/fragment.js';
// import expVertexShader from './shaders/exp/vertex.js';
// import expfragmentShader from './shaders/exp/fragment.js';
// import ShaderTest from './ShaderTest.js';

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#01fff3'),
    uColorEnd: new THREE.Color('#44239f'),
  },
  portalVertexShader,
  portalfragmentShader
);
extend({ PortalMaterial });

const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  /* glsl */ `
    varying vec2 vUv;
    void main() {
    //   vUv = uv;
    //   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}
  `,
  // fragment shader
  /* glsl */ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
);

extend({ ColorShiftMaterial });

const Tree = ({ url, position, scale, rotation, ...props }) => {
  url =
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf';

  const { scene } = useLoader(GLTFLoader, url);
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  const randomRange = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
  };

  return (
    <group>
      <primitive
        object={copiedScene}
        scale={Math.random() * 0.4 + 0.2}
        rotation={[0, Math.random() * 360, 0]}
        position={[randomRange(-20, 20), 0, randomRange(-30, -15)]}
      />
    </group>
  );
};

export default function Experience() {
  const henge = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cromlech/model.gltf'
  );
  const portalMaterial = useRef();

  //   useFrame((state, delta) => {
  //     portalMaterial.current.uTime += delta * 0.5;
  //   });

  const shaderRef = useRef();

  useFrame((state, delta) => {
    shaderRef.current.time += delta;
    shaderRef.current.rotation.y += 0.25 * delta;
    shaderRef.current.rotation.z += 0.125 * delta;
    shaderRef.current.position.set({
      x: 0,
      y: Math.sin(delta) * 0.2 * delta,
      z: 0,
    });
  });

  const eventHandler = (event) => {
    console.log(event);
    shaderRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  const contextHandler = (event) => {
    console.log(event);
    shaderRef.scale = Math.random() * 8;
  };

  const model = useGLTF('/cromlech.gltf');
  console.log(model.nodes);
  const hengeRef = useRef();
  const treeRef = useRef();

  return (
    <>
      <Physics>
        <RigidBody type="fixed" friction={0.5} position={[0, -1.25, -4]}>
          <mesh receiveShadow>
            <boxGeometry args={[60, 0.5, 60]} />
            {/* <portalMaterial ref={portalMaterial} /> */}
            {/* <MeshReflectorMaterial
              resolution={512}
              mirror={1}
              side={DoubleSide}
              mixBlur={0.5}
              mixStrength={1}
              mixContrast={0.25}
            /> */}
            <MeshWobbleMaterial factor={0.1} speed={0.1} />
          </mesh>
        </RigidBody>
        <RigidBody dispose={null} ref={hengeRef} scale={0.4} colliders="hull" position={[0, 0, 0]}>
          <primitive object={henge.scene} castShadow receiveShadow />
          <meshStandardMaterial roughness={0.3} metalness={0.9} />
        </RigidBody>
        <RigidBody dispose={null} ref={treeRef}>
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
          <Tree />
        </RigidBody>
        {/* <InstancedRigidBodies
          dispose={null}
          colliders="hull"
          position={treeTransforms.positions}
          rotations={treeTransforms.rotations}
          scales={treeTransforms.scales}
        >
          <instancedMesh castShadow ref={treeRef} args={[null, null, treeCount]}>
            <primitive object={tree1.scene} />
          </instancedMesh>
        </InstancedRigidBodies> */}
        <group>
          <mesh ref={shaderRef} onClick={eventHandler} onContextMenu={contextHandler}>
            <boxGeometry args={[1, 1, 1]} />
            {/* <MeshRefractionMaterial
            // background={false}
            // envMap={'forest'}
            // bounces={6}
            // ior={2.5}
            // fresnel={0.7}
            // aberrationStrength={0.3}
            // color={'#ffffff'}
            // fastChroma={true}
            // /> */}
            <colorShiftMaterial key={ColorShiftMaterial.key} time={3} />
          </mesh>
        </group>
      </Physics>
    </>
  );
}
