import { useEffect, useState } from "react";
import { acceptInvite, getInvites } from "../api/userApi";

const NotificationBox = () => {
  const [invites, setInvites] = useState({});

  const getAllInvites = async () => {
    try {
      const res = await getInvites();
      // console.log(res.data.data)
      setInvites(res.data.data); 
    } catch (error) {
      console.error("Error fetching invites:", error);
    }
  };

  useEffect(() => {
    getAllInvites();
    // console.log(invites)
  }, []);

  const handleAcceptInvite =async (workspaceId) => {
    console.log(workspaceId)
    await acceptInvite({workspaceId});
  };

  const handleRejectInvite = (workspaceId) => {
    console.log("Rejected invite for workspace:", workspaceId);
  };

  return (
    <div className="fixed top-16 right-6 w-80 bg-[#2a2a2a] text-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm border border-gray-700 z-50">
      <h4 className="font-semibold mb-2">Notifications</h4>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {invites.length > 0 ? (
          invites.map((invite) => (
            <li
              key={invite.workspaceId}
              className="p-2 bg-zinc-900 rounded-md"
            >
              <p className="font-medium">{invite.workspaceName}</p>
              <p className="text-xs text-gray-400">
                Invited by {invite.senderEmail} as <b>{invite.role}</b>
              </p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleAcceptInvite(invite.workspaceId)}
                  className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectInvite(invite.workspaceId)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
                >
                  Reject
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No pending invites</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationBox;
