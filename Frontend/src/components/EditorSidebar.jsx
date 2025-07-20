import React, { useState } from 'react';
import {
  Folder,
  Users,
  Settings,
  FilePlus,
  FolderPlus,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { createFile } from '../api/fileApi';
import { useParams } from 'react-router-dom';

const EditorSidebar = ({
  fileTree,
  onFileClick,
  onAddFolder, // unused for now
}) => {
  const [activeTab, setActiveTab] = useState('explorer');
  const [expandedFolders, setExpandedFolders] = useState({});
  const [fileName, setFileName] = useState('');
  const [createMode, setCreateMode] = useState('');

  const { id: workspaceId } = useParams();

  const toggleFolder = (id) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => {
      const padding = 12 + level * 12;

      if (node.isFolder) {
        const isOpen = expandedFolders[node.id];
        return (
          <div key={node.id} className="mb-1">
            <div
              onClick={() => toggleFolder(node.id)}
              className="flex items-center gap-1 text-green-400 cursor-pointer"
              style={{ paddingLeft: `${padding}px` }}
            >
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <Folder size={14} />
              <span className="font-medium">{node.name}</span>
            </div>
            {isOpen && node.children && (
              <div className="mt-1">
                {renderTree(node.children, level + 1)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={node.id}
            onClick={() => onFileClick(node)}
            className="ml-6 text-gray-300 hover:text-white cursor-pointer"
            style={{ paddingLeft: `${padding}px` }}
          >
            {node.name}
          </div>
        );
      }
    });
  };

  const handleCreateFile = async () => {
    if (!fileName.trim()) return;
    const split=fileName.split('.');

    const fileType=split[split.length-1];

    try {
      const data={
        name: fileName,
        path: '/',
        fileType,
        workspaceId: workspaceId
      };
      const response = await createFile(data);
      console.log(response);
      
      setFileName('');
      setCreateMode('');
    } catch (err) {
      console.error('Error creating file:', err);
    }
  };

  return (
    <div className="bg-[#252526] text-gray-200 h-full flex flex-col border-r border-gray-700">
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
                <button title="New File" onClick={() => setCreateMode('file')}>
                  <FilePlus size={16} className="hover:text-white" />
                </button>
                <button title="New Folder" disabled>
                  <FolderPlus size={16} className="opacity-30 cursor-not-allowed" />
                </button>
              </div>
            </div>

            {createMode === 'file' && (
              <div className="flex gap-2 pb-2 items-center">
                <FilePlus
                  size={16}
                  className="hover:text-white cursor-pointer"
                />
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateFile();
                    }
                  }}
                  placeholder="Enter file name"
                  className="w-full border rounded-3xl px-3 py-1 "
                />
              </div>
            )}

            <div>{renderTree(fileTree)}</div>
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
