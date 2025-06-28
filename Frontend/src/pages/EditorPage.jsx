import React, { useState, useRef, useEffect } from 'react';
import EditorNavbar from '../components/EditorNavbar';
import EditorSidebar from '../components/EditorSidebar';
import CodeEditor from '../components/CodeEditor';
import CodeOutput from '../components/CodeOutput';
import FileTabs from '../components/FileTabs';

const MIN_WIDTH = 100;
const MAX_WIDTH = 600;

const EditorPage = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [outputWidth, setOutputWidth] = useState(250);
  const isDraggingSidebar = useRef(false);
  const isDraggingOutput = useRef(false);

  //language
  const [language, setlanguage] = useState('python')

  const [openFiles, setOpenFiles] = useState([
    { id: '1', name: 'App.jsx', language: 'react', dirty: true },
    { id: '2', name: 'main.py', language: 'python', dirty: false },
  ]);
  const [activeId, setActiveId] = useState('1');

  const closeFile = (id) => {
    setOpenFiles((prev) => prev.filter((f) => f.id !== id));
    if (id === activeId && openFiles.length > 1) {
      const next = openFiles.find((f) => f.id !== id);
      setActiveId(next.id);
    }
  };

  const runCode = (id) => {
    console.log('Run:', id);
  };

  const previewCode = (id) => {
    console.log('Live Preview:', id);
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
          <EditorSidebar />
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
            onRun={runCode}
            onPreview={previewCode}
          />
          <CodeEditor language={language} />
        </div>

        <div
          onMouseDown={() => (isDraggingOutput.current = true)}
          className="w-1 cursor-col-resize bg-zinc-700 hover:bg-violet-500 transition-all"
        />

        <div style={{ width: outputWidth }} className="bg-zinc-800">
          <CodeOutput />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
