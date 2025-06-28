import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { markdown } from '@codemirror/lang-markdown';

const languageExtensions = {
  javascript: javascript({ jsx: true, typescript: true }),
  python: python(),
  java: java(),
  markdown: markdown(),
};

const CodeEditor = ({language}) => {
    const [code, setCode] = useState('// Start coding...')

    return (
        <div className=''>
            <CodeMirror
                value={code}
                height="100vh"
                extensions={[languageExtensions[language]]}
                onChange={(value) => setCode(value)}
                theme="dark"
            />
        </div>
    )
}

export default CodeEditor