import { useState } from "react";

const SettingsPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-200 flex">
      <aside className="w-64 bg-[#2a2a2a] p-6 border-r border-gray-700">
        <h2 className="text-xl font-semibold mb-8">Settings</h2>
        <ul className="space-y-3 text-gray-400">
          <li className="hover:text-white cursor-pointer">Account</li>
          <li className="hover:text-white cursor-pointer">Notifications</li>
          <li className="hover:text-white cursor-pointer">Theme</li>
        </ul>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:border-blue-500 outline-none transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:border-blue-500 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:border-blue-500 outline-none transition"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-200 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition font-semibold"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
};

export default SettingsPage;
