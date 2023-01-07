/* eslint-disable react/no-unknown-property */
import './App.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js';
import ShaderTest from './ShaderTest';
import { Environment, OrbitControls, Sky } from '@react-three/drei';

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 400,
          position: [-14, 18, 36],
        }}
      >
        <color attach="background" args={['#000000']} />
        <OrbitControls />
        <Sky />
        <Environment preset="forest" />
        {/* <ShaderTest /> */}
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
