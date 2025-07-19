import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { markdown } from '@codemirror/lang-markdown';
import { useDebouncedCallback } from 'use-debounce';
import { useSelector } from 'react-redux';
import { socket } from '../utils/socket';

const languageExtensions = {
    javascript: javascript({ jsx: true, typescript: true }),
    python: python(),
    java: java(),
    markdown: markdown(),
};

const CodeEditor = ({ file, fileContents, setFileContents }) => {
    const [value, setValue] = useState('');
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (file && fileContents[file.id] !== undefined) {
            setValue(fileContents[file.id]);
        }
    }, [file?.id, fileContents]);

    const debouncedSave = useDebouncedCallback((content) => {
        if (!file || !user) return;

        const payload = {
            fileId: file.id,
            userId: user._id,
            content,
            newName: file.name,
        };

        console.log("Emitting save-file with:", payload);
        socket.emit("save-file", payload);
    }, 1000);

    const handleChange = (val) => {
        setValue(val);
        if (file) {
            setFileContents(prev => ({
                ...prev,
                [file.id]: val,
            }));

            debouncedSave(val);
        }
    };

    if (!file) return <div className="text-white p-4">No file selected</div>;

    const language = file.language || 'javascript';
    const extension = languageExtensions[language] || languageExtensions.javascript;

    return (
        <CodeMirror
            value={value}
            height="100vh"
            extensions={[extension]}
            onChange={handleChange}
            theme="dark"
        />
    );
};

export default CodeEditor;
