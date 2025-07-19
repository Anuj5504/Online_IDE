import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { getFileContentForSocket } from "./utils/getFileContentById.js";
import { saveFileContentAndName } from "./utils/saveFileContent.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",    
    methods: ["GET", "POST"],
    credentials: true, 
  },
});


const workspaceUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user has connected:", socket.id);

  socket.on("join-workspace", ({ workspaceId, user }) => {
    socket.join(workspaceId);
    console.log(`User ${user.name} joined workspace ${workspaceId}`);

    if (!workspaceUsers.has(workspaceId)) {
      workspaceUsers.set(workspaceId, new Set());
    }

    workspaceUsers.get(workspaceId).add(socket.id);

    socket.to(workspaceId).emit("User-joined", { user });

    const userCount = workspaceUsers.get(workspaceId).size;
    io.to(workspaceId).emit("workspace-users", { count: userCount });
  });

  socket.on("workspace-message", ({ workspaceId, message }) => {
    socket.to(workspaceId).emit("workspace-message", message);
  });

  socket.on("load-file", async ({ fileId, userId }) => {
    try {
      const { file, content } = await getFileContentForSocket(fileId, userId);

      socket.emit("load-file-success", {
        fileId,
        name: file.name,
        content,
        language: file.language,
      });
    } catch (err) {
      socket.emit("load-file-error", {
        fileId,
        error: err.message || "Could not load file",
      });
    }
  });

  socket.on("workspace-file-update", ({ workspaceId, file }) => {
    socket.to(workspaceId).emit("workspace-file-update", file);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);

    for (const [workspaceId, sockets] of workspaceUsers.entries()) {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        workspaceUsers.delete(workspaceId);
      } else {
        io.to(workspaceId).emit("workspace-users", {
          count: sockets.size,
        });
      }
    }
  });

  socket.on("save-file", async ({ fileId, userId, content, newName }) => {
    try {

      const { fileId: savedId, name, workspaceId } = await saveFileContentAndName({ fileId, userId, content, newName });
      console.log("HII");
      socket.emit("save-file-success", { fileId: savedId });

      socket.to(workspaceId).emit("file-saved", {
        fileId: savedId,
        name,
      });

      console.log(`File ${savedId} saved by user ${userId}`);
    } catch (err) {

      console.error("Error saving file:", err);
      socket.emit("save-file-error", {
        fileId,
        error: err.message || "Save failed",
      });
    }
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
