import React from 'react'
import Navbar from './Navbar'
import { Lock, Users, ArrowRight } from 'lucide-react';

const Workspace = () => {
  const workspaces = [
    { name: 'Webdev1', icon: <Lock size={18} className="text-gray-400" /> },
    { name: 'My Workspace', icon: <Lock size={18} className="text-gray-400" /> },
    { name: 'DBMS-PCCOE Workspace', icon: <Users size={18} className="text-gray-400" /> },
  ];

  const features = [
    {
      title: 'REST API basics',
      desc: 'Get up to speed with testing REST APIs.',
    },
    {
      title: 'Integration testing basics',
      desc: 'Verify if your APIs work as expected.',
    },
    {
      title: 'API documentation',
      desc: 'Create beautiful API documentation using Markdown.',
    },
    {
      title: 'API scenario testing',
      desc: 'Iterate through data and trigger workflows.',
    },
    {
      title: 'Data visualization',
      desc: 'Turn response data into visualizations.',
    },
    {
      title: 'Authorization methods',
      desc: 'Learn about different auth types and setup flows.',
    },
  ];
  return (
    <div>
      <div className="min-h-screen bg-zinc-900 text-white px-8 py-6">
        {/* Recently Visited */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Recently visited workspaces</h2>
          <ul className="space-y-2">
            {workspaces.map((ws, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-zinc-800 hover:bg-zinc-700 p-3 rounded-md"
              >
                <span>{ws.name}</span>
                {ws.icon}
              </li>
            ))}
          </ul>
        </section>

        {/* Discover Features */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Discover what you can do in DevFlow</h2>
              <p className="text-sm text-gray-400">Explore the full potential of your cloud IDE with templates.</p>
            </div>
            <a href="#" className="text-blue-400 text-sm flex items-center gap-1 hover:underline">
              View all <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, idx) => (
              <div key={idx} className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-md transition">
                <h3 className="font-medium mb-1">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Explore popular APIs</h2>
          <div className="bg-zinc-800 p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="font-medium text-white">Salesforce Platform APIs</h3>
              <p className="text-sm text-gray-400">
                APIs for developing on the Salesforce Platform (REST, Bulk, Metadata, Tooling).
              </p>
            </div>
            <div className="mt-2 md:mt-0 flex gap-4 text-sm text-gray-400">
              <span>🔄 Fork 200k+</span>
              <span>👁️ Watch 124k</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-blue-400 hover:underline cursor-pointer">
            Explore all →
          </div>
        </section>
      </div>
    </div>
  )
}

export default Workspace