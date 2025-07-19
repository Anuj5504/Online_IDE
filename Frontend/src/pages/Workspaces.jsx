import React, { useEffect, useState } from 'react';
import { Lock, Users, ArrowRight, Plus } from 'lucide-react';
import CreateWorkspace from '../components/CreateWorkspace';
import EditorNavbar from '../components/EditorNavbar';
import { getallworkspace } from '../api/workplaceApi';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Workspace = () => {
  const [createProjectOpen, setcreateProjectOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  const [workspaces, setworkspaces] = useState([]);

  const handleGetWorkspace = async () => {
    try {
      const response = await getallworkspace();

      const mapped = response.data.data.map((ws) => ({
        name: ws.name,
        description: ws.description,
        ownerId: ws.owner._id || ws.owner,
        workspaceId: ws._id,
        templateType:ws.templateType,
        role:
          (ws.owner._id || ws.owner) === user._id
            ? 'You (Owner)'
            : 'Member',
      }));
      console.log(mapped)
      setworkspaces(mapped);
    } catch (error) {
      console.error("Error fetching workspaces", error);
      alert("Error fetching workspaces");
    }
  };

  useEffect(() => {
    if (user) {
      handleGetWorkspace();
    }
  }, [user]);

  const recent = [
    { name: 'Webdev1', icon: <Lock size={18} className="text-gray-400" /> },
    { name: 'My Workspace', icon: <Lock size={18} className="text-gray-400" /> },
    { name: 'DBMS-PCCOE Workspace', icon: <Users size={18} className="text-gray-400" /> },
  ];

  return (
    <div>
      <EditorNavbar />
      <div className="bg-zinc-900 text-white flex justify-center">
        <div className="min-h-screen w-[60vw] max-w-7xl px-6 py-8">
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-4">Recently visited</h2>
            <ul className="space-y-2">
              {recent.map((ws, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-zinc-800 hover:bg-zinc-700 p-3 rounded-md cursor-pointer transition-colors"
                >
                  <span>{ws.name}</span>
                  {ws.icon}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
              <div>
                <h2 className="text-lg font-semibold">Your Workspaces</h2>
                <p className="text-sm text-gray-400">
                  Explore the full potential of your cloud IDE with templates.
                </p>
              </div>
              <a
                href="#"
                className="text-blue-400 text-sm flex items-center gap-1 hover:underline"
              >
                View all <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
              <div className="relative group cursor-pointer transition-transform hover:scale-105">
                <div className="p-[2px] rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" onClick={() => setcreateProjectOpen(true)}>
                  <div className="relative h-56 rounded-xl bg-[#2c2c2c] flex flex-col items-center justify-center text-center transition-colors duration-300">
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 transition-opacity duration-300" />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <Plus size={40} />
                      <p className="text-lg font-semibold leading-snug">
                        Create a Workspace<br />project
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {workspaces.map((ws, idx) => (
                <Link to={`/workspace/${ws.workspaceId}`}>
                  <div
                    key={idx}
                    className="h-56 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-md transition-colors cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className='flex justify-between'>
                      <h3 className="font-medium mb-1 text-xl">{ws.name}</h3>
                      <h2 className="text-gray-500">{ws.templateType}</h2>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {ws.description || 'No description provided.'}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 italic">Role: {ws.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Explore popular APIs</h2>

            <div className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center transition-colors">
              <div>
                <h3 className="font-medium">Salesforce Platform APIs</h3>
                <p className="text-sm text-gray-400">
                  APIs for developing on the Salesforce Platform (REST, Bulk, Metadata, Tooling).
                </p>
              </div>
              <div className="mt-3 md:mt-0 flex gap-6 text-sm text-gray-400">
                <span>🔄 Fork&nbsp;200k+</span>
                <span>👁️ Watch&nbsp;124k</span>
              </div>
            </div>

            <button className="mt-2 text-sm text-blue-400 hover:underline">
              Explore all →
            </button>
          </section>
        </div>

        {createProjectOpen && (
          <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
            <CreateWorkspace setcreateProjectOpen={setcreateProjectOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
