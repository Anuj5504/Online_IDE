import { useState } from "react";
import { Users, MousePointer2Icon, MessageCircleMore, UserPlus } from "lucide-react";
import InviteUserForm from "./InviteUserForm";
import TeamChat from "./TeamChat";
import LiveCursorOverlay from "./LiveCursorOverlay";

export default function CollaborationPanel({ socket, roomId, currentUser }) {
  const [activeTab, setActiveTab] = useState("invite");

  const tabs = [
      { id: "chat", label: "Team Chat", icon: <MessageCircleMore className="w-4 h-4" /> },
    { id: "invite", label: "Invite", icon: <UserPlus className="w-4 h-4" /> },
    { id: "cursors", label: "Live Cursors", icon: <MousePointer2Icon className="w-4 h-4" /> },
  ];

  return (
    <div className="text-gray-300 w-full m-2">
      <div className="flex space-x-3 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md ${
              activeTab === tab.id ? "bg-zinc-700 text-white" : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-zinc-800 p-4 rounded-md">
        {activeTab === "chat" && <TeamChat socket={socket} roomId={roomId} user={currentUser} />}
        {activeTab === "invite" && <InviteUserForm roomId={roomId} />}
        {activeTab === "cursors" && <LiveCursorOverlay socket={socket} user={currentUser} />}
      </div>
    </div>
  );
}
