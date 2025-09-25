const NotificationBox = () => {
  const notifications = [
    { id: 1, message: "Build completed successfully 🚀" },
    { id: 2, message: "New collaborator invited you 👥" },
    { id: 3, message: "Team chat has 2 new messages 💬" },
  ];

  return (
    <div className="fixed top-16 right-6 w-80 bg-[#2a2a2a] text-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm border border-gray-700 z-50">
      <h4 className="font-semibold mb-2">Notifications</h4>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
          >
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationBox;
