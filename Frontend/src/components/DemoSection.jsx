import React from 'react';

const DemoSection = () => {
  return (
    <section className="bg-[#1e1e1e] text-white py-20 px-6" id="the-problem">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 text-xs font-medium text-gray-300 bg-[#2b2b2b] rounded-full mb-4">
          The Problem
        </div>
        <h2 className="text-4xl font-extrabold">
          New AI workflows<br />
          equal <span className="text-purple-400">New Threats</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Paragraph of text on Compromising AI Supply Chains. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#2b2b2b] rounded-3xl p-6 lg:p-12 shadow-inner">
        
        <div className="bg-gradient-to-br from-green-700 via-black to-[#1e1e1e] rounded-3xl h-[300px] flex items-center justify-center relative">
          <h3 className="text-white text-2xl font-semibold underline z-10">New Threats</h3>
          <div className="absolute top-4 left-6 flex flex-col gap-2">
            <div className="w-6 h-6 bg-green-400 rounded-full opacity-80" />
            <div className="w-6 h-6 bg-white rounded-full opacity-80" />
            <div className="w-6 h-6 bg-green-600 rounded-full opacity-80" />
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-semibold mb-4">The Problem</h4>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-300">
            <div>› Inserting Backdoors in AI Models</div>
            <div>› Hallucination</div>
            <div>› Extraction of AI Models and Data</div>
            <div>› Bias and Discrimination</div>
            <div>› Jailbreaks</div>
            <div>› Toxicity, Aggression and Disinformation</div>
            <div>› Model DoS Attacks</div>
            <div>› Social Engineering</div>
            <div>
              › <strong className="text-white">FinOps Attacks</strong>
              <br />
              <span className="text-xs text-gray-500">
                (slowing performance, exhausting token budgets)
              </span>
            </div>
            <div>› Misalignment</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
