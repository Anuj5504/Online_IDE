import { useEffect, useState } from "react";
import { editorSocket } from "./socket";


export const useFileLoader = (fileId, userId) => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fileId) return;

    editorSocket.emit("load-file", { fileId, userId });

    const onSuccess = ({ fileId: loadedId, content }) => {
      setContent(content);
      setError(null);
    };

    const onError = ({ error }) => {
      setError(error);
      setContent(null);
    };

    editorSocket.once("load-file-success", onSuccess);
    editorSocket.once("load-file-error", onError);

    return () => {
      editorSocket.off("load-file-success", onSuccess);
      editorSocket.off("load-file-error", onError);
    };
  }, [fileId, userId]);

  return { content, error };
};
