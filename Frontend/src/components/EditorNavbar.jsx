import { useState, useRef, useEffect } from "react";
import { Search, Settings, Bell, ChevronDown, User } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/userSlice";

const EditorNavbar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const notifRef = useRef();
  const profileRef = useRef();

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

    const handleClick = async () => {
        try {
            await dispatch(logout());
            navigate('/');
            console.log("Logged out");
        } catch (error) {
            console.error("Registration failed:", error);
            alert(error);
        }
    }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notifRef.current && !notifRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current && !profileRef.current.contains(e.target)
      ) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 text-white px-6 py-2 flex items-center justify-between">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link to="/workspaces" className="hover:text-violet-400 transition">Home</Link>
        <div className="flex items-center gap-1 hover:text-violet-400 transition cursor-pointer">
          Workspaces
          <ChevronDown size={14} />
        </div>
      </nav>

      <div className="relative w-[250px] hidden md:flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search Workspace"
          className="w-full pl-10 pr-16 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-violet-500 text-sm"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 text-xs bg-zinc-700 text-gray-300 px-1.5 py-0.5 rounded-md">
          <kbd className="font-mono">Ctrl</kbd>
          <kbd className="font-mono">K</kbd>
        </div>
      </div>

      <div className="flex items-center space-x-4 relative">
        <button
          onClick={() => navigate("/settings")}
          className="p-1 flex items-center justify-center hover:text-violet-400 transition"
        >
          <Settings size={20} />
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="p-1 flex items-center justify-center hover:text-violet-400 transition"
          >
            <Bell size={20} />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-zinc-800 text-sm border border-zinc-700 rounded-md shadow-lg p-3 z-10">
              <p className="text-gray-300">No new notifications</p>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileOptions((prev) => !prev)}
            className="p-1 flex items-center justify-center hover:text-violet-400 transition"
          >
            <User size={20} />
          </button>
          {showProfileOptions && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg p-2 z-10">
              <button
                onClick={handleClick}
                className="block w-full text-left text-sm text-white hover:bg-zinc-700 px-3 py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default EditorNavbar;
