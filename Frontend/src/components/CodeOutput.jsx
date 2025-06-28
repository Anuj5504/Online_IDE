import React, { useState } from 'react'

const CodeOutput = () => {
    const [output, setoutput] = useState('int main(){}');
    const [error, seterror] = useState('; missing');

  return (
    <div className="bg-black text-green-400 p-4 font-mono text-sm h-full overflow-auto">
      {output}
      {error && <div className="text-red-400">{error}</div>}
    </div>
  );
}

export default CodeOutput