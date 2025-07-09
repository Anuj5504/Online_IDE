import React from 'react';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-violet-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />


      <h1 className="text-5xl font-extrabold text-center mb-4">
        Code Anywhere. <span className="text-violet-400">Build Anything.</span>
      </h1>

      <p className="text-center text-gray-400 mb-8 max-w-lg">
        Lightning-Fast Coding in the Cloud.
      </p>

      <button className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300 shadow-md">
        Get Started
      </button>

      <p className="text-sm text-gray-500 mt-12">Preorders Q4 Ship 2025</p>

      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        {['Collaboration', 'Workspace', 'Secure'].map((item, idx) => (
          <div
            key={idx}
            className="bg-[#2b2b2b] border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#3a3a3a] transition duration-200"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
