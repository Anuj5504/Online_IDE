import React, { useEffect, useState } from "react";
import { terminalSocket } from "../utils/socket";


const CodeOutput = ({ code, language, runTrigger, setrunTrigger }) => {
  const [output, setOutput] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!terminalSocket) return;

    terminalSocket.on("output", (data) => {
      setOutput((prev) => prev + data);
    });

    return () => {
      terminalSocket.off("output");
    };
  }, []);

  useEffect(() => {
    if (runTrigger && code && language) {
      setOutput("");
      console.log(code);
      setrunTrigger(false);
      terminalSocket.emit("code", { code, language });
    }
  }, [runTrigger, code, language]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trimEnd();
    if (trimmed) {
      setOutput((prev) => prev + `\n$ ${trimmed}\n`);
      terminalSocket.emit("input", inputValue + "\n");
    }
    setInputValue("");
  };

  return (
    <div className="bg-black text-green-400 p-4 font-mono text-sm  overflow-auto whitespace-pre-wrap h-[50vh]">
      ${output || "Run your code"}

      <form onSubmit={handleSubmit} className="flex">
        <span>$&nbsp;</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-black text-green-400 border-none outline-none w-full"
          autoFocus
        />
      </form>

    </div>
  );
};

export default CodeOutput;
