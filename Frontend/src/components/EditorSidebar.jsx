import React, { useState } from 'react';
import {
  Folder,
  Users,
  Settings,
  FilePlus,
  FolderPlus
} from 'lucide-react';

const EditorSidebar = () => {
  const [activeTab, setActiveTab] = useState('explorer');
  const [files, setFiles] = useState(['index.js', 'App.jsx']);
  const [folders, setFolders] = useState(['components']);

  const addFile = () => {
    const name = prompt('Enter file name');
    if (name) setFiles([...files, name]);
  };

  const addFolder = () => {
    const name = prompt('Enter folder name');
    if (name) setFolders([...folders, name]);
  };

  return (
    <div className="bg-[#252526] text-gray-200 w-64 h-screen flex flex-col border-r border-gray-700">
      {/* Tabs */}
      <div className="flex justify-around py-2 bg-[#1e1e1e] border-b border-gray-700">
        <button
          className={`p-2 ${activeTab === 'explorer' ? 'bg-[#333333] rounded' : ''}`}
          onClick={() => setActiveTab('explorer')}
        >
          <Folder size={18} />
        </button>
        <button
          className={`p-2 ${activeTab === 'collab' ? 'bg-[#333333] rounded' : ''}`}
          onClick={() => setActiveTab('collab')}
        >
          <Users size={18} />
        </button>
        <button
          className={`p-2 ${activeTab === 'settings' ? 'bg-[#333333] rounded' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 text-sm">
        {activeTab === 'explorer' && (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 font-medium">Explorer</span>
              <div className="flex gap-2">
                <button onClick={addFile} title="New File">
                  <FilePlus size={16} className="hover:text-white" />
                </button>
                <button onClick={addFolder} title="New Folder">
                  <FolderPlus size={16} className="hover:text-white" />
                </button>
              </div>
            </div>

            <div className="pl-2">
              {folders.map((folder, i) => (
                <div key={`folder-${i}`} className="mb-1 flex items-center gap-2 text-green-400">
                  <Folder size={16} /> <span className="font-semibold">{folder}</span>
                </div>
              ))}
              {files.map((file, i) => (
                <div key={`file-${i}`} className="ml-6 text-gray-300 hover:text-white">
                  {file}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'collab' && (
          <div className="text-gray-300">
            <h4 className="text-white font-semibold mb-2">Collaboration</h4>
            <ul className="space-y-2">
              <li>Live cursors</li>
              <li>Team chat</li>
              <li>Invite users</li>
            </ul>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-gray-300">
            <h4 className="text-white font-semibold mb-2">Settings</h4>
            <ul className="space-y-2">
              <li>Theme: Dark</li>
              <li>Font: 14px</li>
              <li>Autosave: On</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorSidebar;
