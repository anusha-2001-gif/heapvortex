import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import { useRef } from 'react';
import graphData from '../data/mockGraph';

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

// Render graph nodes
function GraphNodes() {
  return (
    <>
      {graphData.nodes.map((node) => (
        <mesh
          key={node.id}
          position={[node.x, node.y, node.z]}
        >
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color='cyan' />
        </mesh>
      ))}
    </>
  );
}

// Render graph edges
function GraphEdges() {
  return (
    <>
      {graphData.edges.map((edge, index) => {
        const fromNode = graphData.nodes.find((n) => n.id === edge.from);
        const toNode = graphData.nodes.find((n) => n.id === edge.to);

        return (
          <Line
            key={index}
            points={[
              [fromNode.x, fromNode.y, fromNode.z],
              [toNode.x, toNode.y, toNode.z],
            ]}
            color='white'
            lineWidth={2}
          />
        );
      })}
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 50,
      }}
      style={{
        width: '100%',
        height: '100%',
        background: '#20232a',
      }}
    >
      {/* Lights */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      {/* 3D Objects */}
      <Cube />
      <GraphNodes />
      <GraphEdges />

      {/* Camera Controls */}
      <OrbitControls />
    </Canvas>
  );
}