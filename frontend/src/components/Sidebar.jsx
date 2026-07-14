import { useEffect, useState } from "react";
import api from "../services/api";

function Sidebar() {
  const [heap, setHeap] = useState(null);
  const [thread, setThread] = useState(null);
  const [gc, setGc] = useState([]);

  useEffect(() => {
    // Heap Info
    api
      .get("/api/heap")
      .then((response) => {
        setHeap(response.data);
      })
      .catch((error) => {
        console.error("Heap API Error:", error);
      });

    // Thread Info
    api
      .get("/api/threads")
      .then((response) => {
        setThread(response.data);
      })
      .catch((error) => {
        console.error("Thread API Error:", error);
      });

    // Garbage Collector Info
    api
      .get("/api/gc")
      .then((response) => {
        setGc(response.data);
      })
      .catch((error) => {
        console.error("GC API Error:", error);
      });
  }, []);

  return (
    <div className="sidebar">
      <h3>System Metrics</h3>

      <div className="metric">
        <strong>Heap Usage</strong>
        <p>
          {heap
            ? `${heap.used} MB / ${heap.max} MB`
            : "Loading..."}
        </p>
      </div>

      <div className="metric">
        <strong>Thread Count</strong>
        <p>
          {thread
            ? thread.threadCount
            : "Loading..."}
        </p>
      </div>

      <div className="metric">
        <strong>GC Events</strong>
        <p>
          {gc.length > 0
            ? gc[0].collectionCount
            : "Loading..."}
        </p>
      </div>

      <div className="metric">
        <strong>CPU Usage</strong>
        <p>Coming Soon</p>
      </div>
    </div>
  );
}

export default Sidebar;