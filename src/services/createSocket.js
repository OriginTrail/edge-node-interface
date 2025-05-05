import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export const userUUID = uuidv4();

export default function createSocket(SERVER_URL) {
  const socket = io(new URL(SERVER_URL).origin, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    socket.emit("register", { uuid: userUUID });
  });

  return socket;
}
