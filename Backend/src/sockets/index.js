import { Server } from "socket.io";
import { registerEditorNamespace } from "./editorNamespace.js";
import { registerTerminalNamespace } from "./terminalNamespace.js";
import { registerSharedSocket } from "./sharedHandlers.js";

export function setupSocket(server, getFileContentForSocket, saveFileContentAndName) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const workspaceUsers = new Map();

  registerEditorNamespace(io, saveFileContentAndName, getFileContentForSocket);
  registerTerminalNamespace(io);
  registerSharedSocket(io, workspaceUsers);
}
