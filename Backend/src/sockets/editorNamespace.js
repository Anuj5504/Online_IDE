export function registerEditorNamespace(io, saveFileContentAndName, getFileContentForSocket) {
  const editorNamespace = io.of("/editor");

  editorNamespace.on("connection", (socket) => {
    console.log("[Editor] Connected:", socket.id);

    socket.on("save-file", async ({ fileId, userId, content, newName }) => {
      try {
        const { fileId: savedId, name, workspaceId } = await saveFileContentAndName({
          fileId,
          userId,
          content,
          newName,
        });

        socket.emit("save-file-success", { fileId: savedId });
        socket.to(workspaceId).emit("file-saved", { fileId: savedId, name });
      } catch (err) {
        socket.emit("save-file-error", {
          fileId,
          error: err.message || "Save failed",
        });
      }
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
  });
}
