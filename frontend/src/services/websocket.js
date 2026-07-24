import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const connectWebSocket = (onMessage) => {
  const socket = new SockJS("http://localhost:8080/ws");

  const client = new Client({
    webSocketFactory: () => socket,

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("Connected to WebSocket");

      client.subscribe("/topic/metrics", (message) => {
        const data = JSON.parse(message.body);
        onMessage(data);
      });
    },

    onStompError: (frame) => {
      console.error(frame);
    },
  });

  client.activate();

  return client;
};