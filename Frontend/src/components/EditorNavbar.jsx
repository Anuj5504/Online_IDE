import { Search, Settings, Bell, ChevronDown } from 'lucide-react';

const EditorNavbar = () => {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 text-white px-6 py-2 flex items-center justify-between">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <a href="#" className="hover:text-violet-400 transition">Home</a>
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

      <div className="flex items-center space-x-4">
        <button className="hover:text-violet-400 transition">
          <Settings size={18} />
        </button>
        <button className="hover:text-violet-400 transition">
          <Bell size={18} />
        </button>
        <img
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default EditorNavbar;
