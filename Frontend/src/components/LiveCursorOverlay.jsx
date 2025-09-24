import { useEffect } from "react";

export default function LiveCursorOverlay({ socket, user }) {
  useEffect(() => {
    const handleMouseMove = (e) => {
      socket.emit("cursor-move", {
        userId: user.id,
        name: user.name,
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [socket, user]);

  useEffect(() => {
    socket.on("cursor-move", (data) => {
      // update other users' cursors on screen
      // you need to maintain cursor state per user
    });

    return () => {
      socket.off("cursor-move");
    };
  }, [socket]);

  return null;
}
