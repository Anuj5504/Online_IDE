import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  withCredentials: true,
});

export const editorSocket = io("http://localhost:4000/editor", {
  withCredentials: true,
});

export const terminalSocket = io("http://localhost:4000/terminal", {
  withCredentials: true,
});
