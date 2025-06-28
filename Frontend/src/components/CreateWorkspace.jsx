import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Plus,
    X,
    Search,
    Atom,
    Code2,
    Terminal,
    Braces,
    Users
} from 'lucide-react';



const TEMPLATES = [
    {
        id: 'cpp',
        name: 'C++ Console',
        desc: 'Basic C++ template with g++ build.',
        category: 'language',
        tags: ['cpp', 'c++', 'clang', 'g++'],
        icon: <Braces className="w-6 h-6" />,
    },
    {
        id: 'python',
        name: 'Python Script',
        desc: 'Vanilla Python 3 environment.',
        category: 'language',
        tags: ['python', 'py'],
        icon: <Terminal className="w-6 h-6" />,
    },
    {
        id: 'java',
        name: 'Java Gradle',
        desc: 'Java 21 with Gradle build.',
        category: 'language',
        tags: ['java', 'gradle'],
        icon: <Code2 className="w-6 h-6" />,
    },
    {
        id: 'x',
        name: 'React + Vite',
        desc: 'React 19, Vite, TS, Tailwind.',
        category: 'framework',
        tags: ['react', 'vite', 'typescript', 'js', 'framework'],
        icon: <Atom className="w-6 h-6" />,
    },
    {
        id: 'f',
        name: 'React + Vite',
        desc: 'React 19, Vite, TS, Tailwind.',
        category: 'framework',
        tags: ['react', 'vite', 'typescript', 'js', 'framework'],
        icon: <Atom className="w-6 h-6" />,
    },
    {
        id: 's',
        name: 'React + Vite',
        desc: 'React 19, Vite, TS, Tailwind.',
        category: 'framework',
        tags: ['react', 'vite', 'typescript', 'js', 'framework'],
        icon: <Atom className="w-6 h-6" />,
    }
];

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'language', label: 'Languages' },
    { key: 'framework', label: 'Frameworks' },
];

const CreateWorkspace = ({ setcreateProjectOpen }) => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [invite, setinvite] = useState([{
        email: '',
        to: '',
        from: ''
    }]);
    const navigate=useNavigate();

    const handleCreateSubmit=()=>{
        if(true) {
            navigate('/workspace/1212')
        }
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    const visibleTemplates = useMemo(() => {
        return TEMPLATES.filter((t) => {
            const matchesFilter = filter === 'all' || t.category === filter;
            const q = search.toLowerCase().trim();
            const matchesSearch =
                q === '' ||
                t.name.toLowerCase().includes(q) ||
                t.tags.some((tag) => tag.includes(q));
            return matchesFilter && matchesSearch;

        });
    }, [search, filter]);

    return (
        <div className="w-[90%] max-w-4xl bg-zinc-900 rounded-xl p-6 text-white shadow-lg border ">

            <div className="flex justify-between items-start mb-8">
                <h2 className="text-2xl font-semibold">Create new Workspace</h2>
                <X className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => setcreateProjectOpen(false)} />
            </div>

            <form className="space-y-6">

                <div>
                    <label
                        htmlFor="ws-name"
                        className="text-sm font-medium flex gap-1 text-gray-200"
                    >
                        Name<span className="text-rose-500">*</span>
                    </label>
                    <input
                        id="ws-name"
                        type="text"
                        placeholder="My Workspace"
                        className="mt-1 w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="ws-desc"
                        className="text-sm font-medium text-gray-200"
                    >
                        Description
                    </label>
                    <input
                        id="ws-desc"
                        type="text"
                        placeholder="Enter description"
                        className="mt-1 w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search templates"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.key}
                                    type="button"
                                    onClick={() =>
                                        setFilter(f.key)
                                    }
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${filter === f.key
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <X onClick={() => setFilter('')} className='cursor-pointer' />
                    </div>

                    <div className="max-h-75 overflow-y-auto pr-1 border-none rounded-sm p-2    ">
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                            {visibleTemplates.map((tpl) => (
                                <div
                                    key={tpl.id}
                                    className="flex flex-col gap-2 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-md cursor-pointer transition-colors"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-zinc-700 rounded-md">
                                        {tpl.icon}
                                    </div>
                                    <h4 className="font-medium">{tpl.name}</h4>
                                    <p className="text-xs text-gray-400">{tpl.desc}</p>
                                </div>
                            ))}
                            {visibleTemplates.length === 0 && (
                                <p className="col-span-full text-center text-sm text-gray-400 py-8">
                                    No templates found.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-1/3 relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Invite Collaborators"
                            className="pl-10 pr-16 py-2 w-full rounded-md bg-zinc-800 border border-zinc-700
               focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                        />
                        <button
                            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-300 text-sm font-medium"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="flex justify-end ">
                    <button
                        type="submit"
                        className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors"
                    onClick={handleCreateSubmit}
                    >
                        Create
                        <Plus size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateWorkspace;
