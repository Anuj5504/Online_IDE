import { useState } from "react";
import axios from "axios";

export default function InviteUserForm({ roomId }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInvite = async () => {
    try {
      const res = await axios.post("/api/invite", { roomId, email });
      setMessage("Invitation sent!");
      setEmail("");
    } catch (err) {
      setMessage("Failed to invite user.");
    }
  };

  return (
    <div>
      <label className="block text-sm mb-2">User Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
        className="w-full p-2 rounded-md bg-zinc-900 text-white mb-2"
      />
      <button
        onClick={handleInvite}
        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
      >
        Invite
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
