import { io } from "socket.io-client";

let startsocket;

export const socket = () => {
  console.log("Attempting to initialize socket...");
  if (!startsocket) {
    startsocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    startsocket.on("connect", () => {
      console.log("✅ Connected to socket server with ID: " + startsocket.id);
    });

    startsocket.on("connect_error", (err) => {
      console.log("❌ Socket connection error:", err.message);
    });

    startsocket.on("disconnect", (reason) => {
      console.log("🔌 Disconnected from socket server:", reason);
    });
  }
  return startsocket;
};
