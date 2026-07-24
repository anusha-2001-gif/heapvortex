import { connectWebSocket } from "../services/websocket";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import api from "../services/api";

function GraphNodes({ graphData }) {
  if (!graphData || !graphData.classDetails) {
    return null;
  }

  return (
    <>
      {graphData.classDetails.slice(0, 10).map((node, index) => {
        const angle = (index / 10) * Math.PI * 2;
        const radius = 3;

        return (
          <mesh
            key={node.classId}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0,
            ]}
          >
            <sphereGeometry args={[0.35, 32, 32]} />

            <meshStandardMaterial
              color={
                graphData.liveMetrics &&
                graphData.liveMetrics.heap.used > 100
                  ? "red"
                  : "cyan"
              }
            />
          </mesh>
        );
      })}
    </>
  );
}

// Week 3: Edges will be added later
function GraphEdges() {
  return null;
}

export default function Scene() {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    // Load heap dump graph
    api
      .get("/parser/parse")
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.error("Parser API Error:", error);
      });

    // Connect WebSocket
    const client = connectWebSocket((liveData) => {
      console.log("Live Metrics:", liveData);

      setGraphData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          liveMetrics: liveData,
        };
      });
    });

    return () => {
      client.deactivate();
    };
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

      {/* Heap Graph */}
      <GraphNodes graphData={graphData} />

      {/* Week 3 - Enable after implementing edges */}
      {/* <GraphEdges graphData={graphData} /> */}

      <OrbitControls />
    </Canvas>
  );
}