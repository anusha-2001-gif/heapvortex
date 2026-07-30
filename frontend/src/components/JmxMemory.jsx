import React, { useEffect, useState } from "react";

export default function JmxMemory() {
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const loadMemory = () => {
      fetch("http://localhost:8080/api/jmx/memory")
        .then((res) => res.json())
        .then((data) => {
          setMemory(data);
        })
        .catch((err) => console.error(err));
    };

    // Load immediately
    loadMemory();

    // Refresh every 2 seconds
    const timer = setInterval(loadMemory, 2000);

    return () => clearInterval(timer);
  }, []);

  if (!memory) {
    return (
      <div style={{ padding: "20px" }}>
        Loading JVM Memory...
      </div>
    );
  }
return (
  <div
    style={{
      width: "320px",
      height: "100%",
      overflowY: "auto",
      background: "#1e1e1e",
      color: "white",
      padding: "20px",
      borderLeft: "1px solid #444",
      fontFamily: "Arial",
      flexShrink: 0
    }}
  >
    <h2>Live JVM Memory Monitor</h2>

    <hr />

    <h3>Heap Memory</h3>

    <p>
      <strong>Used:</strong>{" "}
      {(memory.heapUsed / 1024 / 1024).toFixed(2)} MB
    </p>

    <p>
      <strong>Committed:</strong>{" "}
      {(memory.heapCommitted / 1024 / 1024).toFixed(2)} MB
    </p>

    <p>
      <strong>Maximum:</strong>{" "}
      {(memory.heapMax / 1024 / 1024).toFixed(2)} MB
    </p>

    <hr />

    <h3>Non Heap Memory</h3>

    <p>
      <strong>Used:</strong>{" "}
      {(memory.nonHeapUsed / 1024 / 1024).toFixed(2)} MB
    </p>

    <p>
      <strong>Committed:</strong>{" "}
      {(memory.nonHeapCommitted / 1024 / 1024).toFixed(2)} MB
    </p>

    <hr />

    <h3>Memory Pools</h3>

    {Object.entries(memory.memoryPools).map(([name, pool]) => (
      <div
        key={name}
        style={{
          border: "1px solid gray",
          borderRadius: "6px",
          padding: "10px",
          marginBottom: "10px",
          wordBreak: "break-word"
        }}
      >
        <h4>{name}</h4>

        <p>Used: {(pool.used / 1024 / 1024).toFixed(2)} MB</p>

        <p>Committed: {(pool.committed / 1024 / 1024).toFixed(2)} MB</p>

        <p>
          Max:{" "}
          {pool.max === -1
            ? "Unlimited"
            : `${(pool.max / 1024 / 1024).toFixed(2)} MB`}
        </p>
      </div>
    ))}
  </div>
);
}