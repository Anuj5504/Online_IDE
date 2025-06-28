import React from 'react'
import { clsx } from 'clsx';
import { Globe, Play, X } from 'lucide-react';

const FileTabs = ({ files, activeId, onActivate, onClose, onRun, onPreview }) => {
    const iconFor = (lang) => {
        switch (lang) {
            case 'javascript': return 'codicon codicon-file-code';
            case 'typescript': return 'codicon codicon-symbol-structure';
            case 'python': return 'codicon codicon-symbol-method';
            case 'cpp': return 'codicon codicon-symbol-namespace';
            case 'java': return 'codicon codicon-symbol-class';
            case 'html': return 'codicon codicon-code';
            case 'react': return 'codicon codicon-symbol-event';
            default: return 'codicon codicon-file';
        }
    };

    const showRun = (lang) => ['javascript', 'typescript', 'python', 'cpp', 'c', 'java'].includes(lang);
    const showPreview = (lang) => ['react', 'html'].includes(lang);
    const current = files.find((f) => f.id === activeId);

    return (
        <div className='flex items-center bg-zinc-900 border-b border-zinc-700 overflow-x-auto no-scrollbar'>
            {
                files.map((file) => (
                    <button
                        key={file.id}
                        onClick={() => onActivate(file.id)}
                        className={clsx(' cursor-pointer flex items-center px-3 py-2 gap-2 text-sm select-none group',
                            activeId === file.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'
                        )}
                    >
                        <i className={`${iconFor(file.language)} text-[16px] mr-1`} />
                        <span>{file.name}</span>
                        {file.dirty && <span className='text-violet-500 ml-0.5'>●</span>}
                        <X
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose(file.id);
                            }}
                            className='h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 hover:text-red-400'
                        />
                    </button>
                ))}

            {current && (
                <div className="ml-auto flex items-center pr-3 gap-2 text-white">
                    {showRun(current.language) && (
                        <button
                            onClick={() => onRun(current.id)}
                            className="flex cursor-pointer items-center gap-1 text-xs px-2 py-1 border border-zinc-600 rounded hover:bg-zinc-700"
                        >
                            <Play className="h-3 w-3" /> Run
                        </button>
                    )}
                    {showPreview(current.language) && (
                        <button
                            onClick={() => onPreview(current.id)}
                            className="flex cursor-pointer items-center gap-1 text-xs px-2 py-1 border border-zinc-600 rounded hover:bg-zinc-700"
                        >
                            <Globe className="h-3 w-3" /> Live Preview
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default FileTabs