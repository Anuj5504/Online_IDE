import React, { useState, useRef, useEffect } from 'react';
import EditorNavbar from '../components/EditorNavbar';
import EditorSidebar from '../components/EditorSidebar';
import CodeEditor from '../components/CodeEditor';
import CodeOutput from '../components/CodeOutput';
import FileTabs from '../components/FileTabs';
import { useParams } from 'react-router-dom';
import { getFiles } from '../api/fileApi';
import { transformFilesToTree } from '../utils/fileTree';
import { useSelector } from 'react-redux'; 
import { useFileLoader } from '../utils/fileLoader';
import CollaborationPanel from '../components/CollaborationPanel';
import { Divide } from 'lucide-react';

const MIN_WIDTH = 100;
const MAX_WIDTH = 600;

const EditorPage = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [outputWidth, setOutputWidth] = useState(400);
  const isDraggingSidebar = useRef(false);
  const isDraggingOutput = useRef(false);

  const { id: workspaceId } = useParams();
  const { user } = useSelector(state => state.user); // assumes { user } in Redux

  const [fileTree, setFileTree] = useState([]);
  const [fileContents, setFileContents] = useState({});
  const [openFiles, setOpenFiles] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [pendingFile, setPendingFile] = useState(null);
  const [language, setlanguage] = useState("")

  const [runTrigger, setrunTrigger] = useState(false)

  
  const { content, error } = useFileLoader(selectedFileId, user?._id);

  const getAllFiles = async () => {
    try {
      const response = await getFiles(workspaceId);
      const tree = transformFilesToTree(response.data.data);
      setFileTree(tree);
    } catch (error) {
      console.error("Cannot get files", error);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      getAllFiles();
    }
  }, [workspaceId]);

  const detectLanguage = (filename) => {
    const ext = filename.split('.').pop();
    switch (ext) {
      case 'js': return 'javascript';
      case 'jsx': return 'react';
      case 'py': return 'python';
      case 'cpp': return 'cpp';
      default: return 'plaintext';
    }
  };

  const handleFileClick = (file) => {
    if (file.isFolder) return;

    const isOpen = openFiles.find(f => f.id === file.id);
    if (isOpen) {
      setActiveId(file.id);
      return;
    }

    setPendingFile(file);
    setSelectedFileId(file.id);
  };

  useEffect(() => {
    if (!pendingFile || !content) return;

    // 🛡️ Ensure content belongs to the selected file
    if (pendingFile.id !== selectedFileId) return;

    const language = detectLanguage(pendingFile.name);
    setlanguage(language);
    const newFile = {
      ...pendingFile,
      content,
      language,
    };

    setOpenFiles(prev => [...prev, newFile]);
    setFileContents(prev => ({ ...prev, [pendingFile.id]: content }));
    setActiveId(pendingFile.id);

    setPendingFile(null);
    setSelectedFileId(null);
  }, [content, error, pendingFile, selectedFileId]);


  const closeFile = (id) => {
    setOpenFiles((prev) => prev.filter((f) => f.id !== id));

    if (id === activeId && openFiles.length > 1) {
      const next = openFiles.find((f) => f.id !== id);
      setActiveId(next ? next.id : '');
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingSidebar.current) {
      const newWidth = Math.min(Math.max(e.clientX, MIN_WIDTH), MAX_WIDTH);
      setSidebarWidth(newWidth);
    } else if (isDraggingOutput.current) {
      const newWidth = Math.min(Math.max(window.innerWidth - e.clientX, MIN_WIDTH), MAX_WIDTH);
      setOutputWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isDraggingSidebar.current = false;
    isDraggingOutput.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <EditorNavbar />
      <div className="flex flex-1 bg-zinc-900 overflow-hidden">
        <div style={{ width: sidebarWidth }} className="border-r border-zinc-700 bg-zinc-800">
          <EditorSidebar fileTree={fileTree} onFileClick={handleFileClick} />
        </div>
        <div
          onMouseDown={() => (isDraggingSidebar.current = true)}
          className="w-1 cursor-col-resize bg-zinc-700 hover:bg-violet-500 transition-all"
        />

        <div className="flex-1 border-r border-zinc-700 bg-zinc-900">
          <FileTabs
            files={openFiles}
            activeId={activeId}
            onActivate={setActiveId}
            onClose={closeFile}
            runTrigger={runTrigger}
            setrunTrigger={setrunTrigger}
          />
          <CodeEditor
            file={openFiles.find(f => f.id === activeId)}
            fileContents={fileContents}
            setFileContents={setFileContents}
          />
        </div>

        <div
          onMouseDown={() => (isDraggingOutput.current = true)}
          className="w-1 cursor-col-resize bg-zinc-700 hover:bg-violet-500 transition-all "
        />

        
        <div style={{ width: outputWidth }} className="bg-zinc-800 flex flex-col">
          <CodeOutput runTrigger={runTrigger} code={fileContents[activeId]} language={language} setrunTrigger={setrunTrigger}/>
          <CollaborationPanel/>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
