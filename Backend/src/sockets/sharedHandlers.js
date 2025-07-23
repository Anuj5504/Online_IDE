export function registerSharedSocket(io, workspaceUsers) {
  io.on("connection", (socket) => {
    console.log("Base socket connected:", socket.id);

    socket.on("join-workspace", ({ workspaceId, user }) => {
      socket.join(workspaceId);

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

    socket.on("workspace-file-update", ({ workspaceId, file }) => {
      socket.to(workspaceId).emit("workspace-file-update", file);
    });

    socket.on("disconnect", () => {
      for (const [workspaceId, sockets] of workspaceUsers.entries()) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          workspaceUsers.delete(workspaceId);
        } else {
          io.to(workspaceId).emit("workspace-users", { count: sockets.size });
        }
      }
    });
  });
}
