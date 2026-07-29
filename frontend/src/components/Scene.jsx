import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";

function GraphNodes({ graphData, nodePositions }) {
  if (!graphData) return null;

  const radius = 4;

  return (
    <>
      {graphData.nodes.map((node, index) => {
        const angle = (index / graphData.nodes.length) * Math.PI * 2;

        const position = [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0,
        ];

        nodePositions.current[node.id] = position;

        return (
          <mesh key={node.id} position={position}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="cyan" />
          </mesh>
        );
      })}
    </>
  );
}

function GraphEdges({ graphData, nodePositions }) {
  if (!graphData) return null;

  return (
    <>
      {graphData.edges.map((edge, index) => {
        const start = nodePositions.current[edge.source];
        const end = nodePositions.current[edge.target];

        if (!start || !end) return null;

        return (
          <Line
            key={index}
            points={[start, end]}
            color="white"
            lineWidth={1}
          />
        );
      })}
    </>
  );
}

export default function Scene() {
  const [graphData, setGraphData] = useState(null);
  const nodePositions = useRef({});

  useEffect(() => {
    fetch("http://localhost:8080/api/parser/parse")
      .then((res) => res.json())
      .then((data) => {

        // Take only first 150 edges
        const limitedEdges = data.edges.slice(0, 150);

        // Build node list from those edges
        const nodeMap = new Map();

        limitedEdges.forEach((edge) => {
          nodeMap.set(edge.source, {
            id: edge.source,
          });

          nodeMap.set(edge.target, {
            id: edge.target,
          });
        });

        const limitedNodes = Array.from(nodeMap.values());

        console.log("Nodes:", limitedNodes.length);
        console.log("Edges:", limitedEdges.length);

        setGraphData({
          nodes: limitedNodes,
          edges: limitedEdges,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2} />

      <GraphNodes
        graphData={graphData}
        nodePositions={nodePositions}
      />

      <GraphEdges
        graphData={graphData}
        nodePositions={nodePositions}
      />

      <OrbitControls />
    </Canvas>
  );
}