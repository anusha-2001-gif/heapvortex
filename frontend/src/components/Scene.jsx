import React, { useEffect, useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";

export default function Scene() {
  const graphRef = useRef();
  const containerRef = useRef();

  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });

  const [selectedNode, setSelectedNode] = useState(null);

  const [size, setSize] = useState({
    width: 800,
    height: 600,
  });

  // -----------------------------
  // Resize graph with container
  // -----------------------------
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // -----------------------------
  // Load graph
  // -----------------------------
  useEffect(() => {
    fetch("http://localhost:8080/api/parser/parse")
      .then((res) => res.json())
      .then((data) => {
        const nodeMap = new Map();

        (data.nodes || []).forEach((node) => {
          nodeMap.set(node.id, node);
        });

        (data.links || []).forEach((link) => {
          if (!nodeMap.has(link.source)) {
            nodeMap.set(link.source, {
              id: link.source,
              classId: "Unknown",
            });
          }

          if (!nodeMap.has(link.target)) {
            nodeMap.set(link.target, {
              id: link.target,
              classId: "Unknown",
            });
          }
        });

        const graph = {
          nodes: Array.from(nodeMap.values()),
          links: data.links || [],
        };

        setGraphData(graph);

        setTimeout(() => {
          if (graphRef.current) {
            graphRef.current.zoomToFit(800, 50);
          }
        }, 500);
      })
      .catch(console.error);
  }, []);

  // -----------------------------
  // Force settings
  // -----------------------------
  useEffect(() => {
    if (!graphRef.current) return;

    graphRef.current.d3Force("charge").strength(-40);

    graphRef.current.d3Force("link").distance(18);

    graphRef.current.d3Force("center").strength(0.8);
  }, [graphData]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ForceGraph3D
        ref={graphRef}
        width={size.width}
        height={size.height}
        graphData={graphData}
        backgroundColor="#1f232b"
        nodeRelSize={4}
        nodeColor={() => "#00e5ff"}
        linkColor={() => "rgba(255,255,255,0.25)"}
        linkWidth={0.5}
        cooldownTicks={100}
        nodeLabel={(node) => `
Object ID : ${node.id}
Class ID  : ${node.classId}
`}
        onNodeClick={(node) => {
          setSelectedNode(node);

          graphRef.current.cameraPosition(
            {
              x: node.x * 1.5,
              y: node.y * 1.5,
              z: node.z * 1.5,
            },
            node,
            1200
          );
        }}
      />

      {selectedNode && (
        <div
          style={{
            position: "absolute",
            left: 20,
            bottom: 20,
            width: 260,
            background: "white",
            color: "black",
            padding: 15,
            borderRadius: 8,
            boxShadow: "0 3px 10px rgba(0,0,0,.3)",
          }}
        >
          <h3>Selected Object</h3>

          <hr />

          <p>
            <b>Object ID</b>
          </p>

          <p>{selectedNode.id}</p>

          <p>
            <b>Class ID</b>
          </p>

          <p>{selectedNode.classId}</p>

          <button
            onClick={() => setSelectedNode(null)}
            style={{
              width: "100%",
              marginTop: 10,
              padding: 8,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}