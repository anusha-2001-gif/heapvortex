import React, { useEffect, useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";

export default function Scene() {
  const graphRef = useRef();

  const [graphData, setGraphData] = useState({
    nodes: [],
    links: []
  });

  const [selectedNode, setSelectedNode] = useState(null);

  const [search, setSearch] = useState("");

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());

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
              classId: "Unknown"
            });
          }

          if (!nodeMap.has(link.target)) {
            nodeMap.set(link.target, {
              id: link.target,
              classId: "Unknown"
            });
          }
        });

        setGraphData({
          nodes: Array.from(nodeMap.values()),
          links: data.links || []
        });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!graphRef.current) return;

    graphRef.current.d3Force("charge").strength(-90);
    graphRef.current.d3Force("link").distance(45);
    graphRef.current.d3Force("center").strength(0.4);
  }, [graphData]);
  const handleSearch = () => {
  if (!search.trim()) return;

  const nodeSet = new Set();
  const linkSet = new Set();

  const matched = graphData.nodes.filter(
    (n) =>
      String(n.id) === search ||
      String(n.classId) === search
  );

  matched.forEach((node) => {
    nodeSet.add(node);

    graphData.links.forEach((link) => {
      const sourceId =
        typeof link.source === "object" ? link.source.id : link.source;

      const targetId =
        typeof link.target === "object" ? link.target.id : link.target;

      if (sourceId === node.id || targetId === node.id) {
        linkSet.add(link);
      }
    });
  });

  setHighlightNodes(nodeSet);
  setHighlightLinks(linkSet);

  if (matched.length > 0) {
    graphRef.current.cameraPosition(
      {
        x: matched[0].x * 1.5,
        y: matched[0].y * 1.5,
        z: matched[0].z * 1.5,
      },
      matched[0],
      1000
    );
  }
};
  
const highlightRecursively = (startNode) => {

  const nodeSet = new Set();
  const linkSet = new Set();

  const visited = new Set();

  const dfsForward = (id) => {

    if (visited.has(id)) return;

    visited.add(id);

    const node = graphData.nodes.find(n => n.id === id);

    if (node) nodeSet.add(node);

    graphData.links.forEach(link => {

      const source =
        typeof link.source === "object"
          ? link.source.id
          : link.source;

      const target =
        typeof link.target === "object"
          ? link.target.id
          : link.target;

      if (source === id) {

        linkSet.add(link);

        dfsForward(target);

      }

    });

  };

  const dfsBackward = (id) => {

    graphData.links.forEach(link => {

      const source =
        typeof link.source === "object"
          ? link.source.id
          : link.source;

      const target =
        typeof link.target === "object"
          ? link.target.id
          : link.target;

      if (target === id) {

        const node = graphData.nodes.find(n => n.id === source);

        if (node) nodeSet.add(node);

        linkSet.add(link);

        if (!visited.has(source))
          dfsBackward(source);

      }

    });

  };

  dfsForward(startNode.id);

  dfsBackward(startNode.id);

  nodeSet.add(startNode);

  setHighlightNodes(nodeSet);

  setHighlightLinks(linkSet);

};
  const clearSearch = () => {
    setSearch("");
    setHighlightNodes(new Set());
    setHighlightLinks(new Set());
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative"
      }}
    >
      {/* Search Box */}

      <div
        style={{
          position: "absolute",
          top: 15,
          left: 20,
          zIndex: 100,
          background: "#ffffff",
          padding: 12,
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0,0,0,.25)"
        }}
      >
        <input
          type="text"
          placeholder="Object ID or Class ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: 220,
            padding: 8
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            marginLeft: 8,
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Search
        </button>

        <button
          onClick={clearSearch}
          style={{
            marginLeft: 5,
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Reset
        </button>
      </div>
          <ForceGraph3D
  ref={graphRef}
  graphData={graphData}
  backgroundColor="#1f232b"

  nodeRelSize={10}

  nodeColor={(node) =>
    highlightNodes.has(node) ? "#ff3333" : "#00e5ff"
  }

  nodeOpacity={1}

  nodeThreeObject={(node) => {
    const geometry = new THREE.SphereGeometry(3);
    const material = new THREE.MeshLambertMaterial({
      color: highlightNodes.has(node) ? "#ff3333" : "#00e5ff"
    });

    return new THREE.Mesh(geometry, material);
  }}

  linkColor={(link) =>
    highlightLinks.has(link)
      ? "#ffff00"
      : "rgba(255,255,255,0.4)"
  }

  linkWidth={(link) => (highlightLinks.has(link) ? 3 : 1)}

  linkOpacity={0.6}

  nodeResolution={12}
  linkDirectionalParticles={0}

  onNodeClick={(node) => {
    setSelectedNode(node);

    graphRef.current.cameraPosition(
      {
        x: node.x * 1.6,
        y: node.y * 1.6,
        z: node.z * 1.6,
      },
      node,
      1000
    );
  }}
/>
      {selectedNode && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            width: 260,
            background: "white",
            color: "black",
            padding: 15,
            borderRadius: 8,
            boxShadow: "0 2px 10px rgba(0,0,0,.3)"
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
            style={{
              width: "100%",
              padding: 8,
              marginTop: 10,
              cursor: "pointer"
            }}
            onClick={() => setSelectedNode(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}