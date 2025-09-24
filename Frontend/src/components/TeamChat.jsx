    import { useState, useEffect } from "react";

export default function TeamChat({ socket, roomId, user }) {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("chat-message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, [roomId, socket]);

  const sendMessage = () => {
    const payload = { user, msg };
    socket.emit("chat-message", payload);
    setChat((prev) => [...prev, payload]);
    setMsg("");
  };

  return (
    <div>
      <div className="h-40 overflow-y-auto bg-zinc-900 p-2 mb-2 rounded">
        {chat.map((m, i) => (
          <div key={i} className="text-sm">
            <span className="text-blue-400 font-medium">{m.user.name}: </span>
            <span>{m.msg}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 p-2 rounded-md bg-zinc-900 text-white"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-green-600 px-3 py-1 rounded text-white">
          Send
        </button>
      </div>
    </div>
  );
}
