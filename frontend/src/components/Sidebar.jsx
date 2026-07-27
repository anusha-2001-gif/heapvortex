import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function Sidebar() {

  const [heap, setHeap] = useState("Loading...");
  const [threads, setThreads] = useState("Loading...");
  const [gc, setGc] = useState("Loading...");
  const [cpu] = useState("Available Soon");

  useEffect(() => {

    // -------------------------
    // Load initial data using REST APIs
    // -------------------------

    fetch("http://localhost:8080/api/heap")
      .then(res => res.json())
      .then(data => {
        setHeap(`${data.used} MB / ${data.max} MB`);
      });

    fetch("http://localhost:8080/api/threads")
      .then(res => res.json())
      .then(data => {
        setThreads(data.threadCount);
      });

    fetch("http://localhost:8080/api/gc")
      .then(res => res.json())
      .then(data => {
        setGc(data.length);
      });

    // -------------------------
    // Connect to WebSocket
    // -------------------------

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({

      webSocketFactory: () => socket,

      reconnectDelay: 5000,

      onConnect: () => {

        console.log("✅ WebSocket Connected");

        client.subscribe("/topic/metrics", (message) => {

          const data = JSON.parse(message.body);

          setHeap(`${data.heap.used} MB / ${data.heap.max} MB`);

          setThreads(data.threads.threadCount);

          setGc(data.gc.length);

        });

      },

      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
      }

    });

    client.activate();

    return () => {
      client.deactivate();
    };

  }, []);

  return (

    <div className="sidebar">

      <h3>System Metrics</h3>

      <div className="metric">
        <strong>Heap Usage</strong>
        <p>{heap}</p>
      </div>

      <div className="metric">
        <strong>Thread Count</strong>
        <p>{threads}</p>
      </div>

      <div className="metric">
        <strong>GC Events</strong>
        <p>{gc}</p>
      </div>

      <div className="metric">
        <strong>CPU Usage</strong>
        <p>{cpu}</p>
      </div>

    </div>

  );
}

export default Sidebar;