// /* eslint-disable react/no-unknown-property */
// import React, { useEffect, useRef } from 'react';
// import expVertexShader from './shaders/exp/vertex.js';
// import expfragmentShader from './shaders/exp/fragment.js';
// import { extend, useFrame } from '@react-three/fiber';
// import { shaderMaterial } from '@react-three/drei';
// import * as THREE from 'three';

// const ExpMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uColorStart: new THREE.Color('#de83ef'),
//     uColorEnd: new THREE.Color('#296d98'),
//   },
//   expVertexShader,
//   expfragmentShader
// );
// extend({ ExpMaterial });

// export default function ShaderTest() {
//   const expMaterial = useRef();
//   const ref = useRef();

//   useFrame((state, delta) => {
//     shaderBoxMaterial.current.uTime += delta;
//   });

//   const uniformData = {
//     uTime: {
//       type: 'f',
//       value: 0,
//     },
//   };
//   const shaderBoxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);

//   const shaderBoxMaterial = shaderMaterial({
//     wireframe: true,
//     uniforms: uniformData,
//     vertexShader: `void main() {
//     vec4 result;
//     result = vec4(position.x, position.y, position.z, 1.0);
//     // projectionMatrix, modelViewMatrix, position
//     // gl_Position = projectionMatrix
//     //  * modelViewMatrix
//     //  * vec4(position.x, position.y, position.z, 1.0);
//     // gl_Position = projectionMatrix
//     //     * modelViewMatrix
//     //     * vec4(position.x, sin(position.z), position.z, 1.0);
//     // gl_Position = projectionMatrix
//     //     * modelViewMatrix
//     //     * vec4(position.x, sin(position.z) + position.y, position.z, 1.0);
//     // gl_Position = projectionMatrix
//     //     * modelViewMatrix
//     //     * vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);
//     gl_Position = projectionMatrix
//         * modelViewMatrix
//         // * vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
//         * result;
// }`,
//     fragmentShader: `
// void main() {
//     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//     // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
//     // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
//     // gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
// }
// `,
//   });

//   return (
//     <>
//       <group ref={ref}>
//         <mesh scale={1} geometry={shaderBoxGeometry} material={shaderBoxMaterial}>
//           <axesHelper scale={15} />
//         </mesh>
//       </group>
//     </>
//   );
// }
