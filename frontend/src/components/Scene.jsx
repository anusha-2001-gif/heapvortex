import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Cube() {
  const cubeRef = useRef();

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas
  camera={{
    position: [0, 0, 6],
    fov: 50,
  }}
  style={{
    width: "100%",
    height: "100%",
    background: "#20232a",
  }}
>
      <ambientLight intensity={0.8} />

    <directionalLight
      position={[5, 5, 5]}
      intensity={1.5}
    />

    <directionalLight
      position={[-5, -5, -5]}
     intensity={0.5}
    />

      <Cube />

      <OrbitControls />
    </Canvas>
  );
}