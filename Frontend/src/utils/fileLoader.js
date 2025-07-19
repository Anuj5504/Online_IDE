import { useEffect, useState } from "react";
import { socket } from "./socket";



export const useFileLoader = (fileId, userId) => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fileId) return;

    socket.emit("load-file", { fileId, userId });

    const onSuccess = ({ fileId: loadedId, content }) => {
      setContent(content);
      setError(null);
    };

    const onError = ({ error }) => {
      setError(error);
      setContent(null);
    };

    socket.once("load-file-success", onSuccess);
    socket.once("load-file-error", onError);

    return () => {
      socket.off("load-file-success", onSuccess);
      socket.off("load-file-error", onError);
    };
  }, [fileId, userId]);

  return { content, error };
};
