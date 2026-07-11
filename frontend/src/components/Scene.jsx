import { Canvas } from "@react-three/fiber";

function Cube() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas style={{ height: "100vh" }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
}