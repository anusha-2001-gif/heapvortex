import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import api from "../services/api";

// Rotating cube (your existing work)
function Cube() {
  const cubeRef = useRef();

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}

function GraphNodes({ graphData }) {

  if (!graphData || !graphData.classDetails) {
    return null;
  }

  return (
    <>
      {graphData.classDetails.slice(0, 10).map((node, index) => (
        <mesh
          key={node.classId}
          position={[
            index * 1.2 - 5,
            2,
            0
          ]}
        >
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </>
  );
}
// Render graph edges (disabled for now)
function GraphEdges() {
  return null;
}

export default function Scene() {

  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    api.get("/parser/parse")
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Canvas
  camera={{
    position: [0, 0, 8],
    fov: 50,
  }}
  style={{
    width: "100%",
    height: "100%",
    background: "#20232a",
  }}
>
  {/* Lights */}
  <ambientLight intensity={0.8} />
  <directionalLight position={[5, 5, 5]} intensity={1.5} />
  <directionalLight position={[-5, -5, -5]} intensity={0.5} />

  {/* 3D Objects */}
  <Cube />
  <GraphNodes graphData={graphData} />

  {/* GraphEdges will be added later */}
  {/* <GraphEdges /> */}

  {/* Camera Controls */}
  <OrbitControls />
</Canvas>
);
}