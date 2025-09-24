import React from "react";
import { motion } from "framer-motion";
import { Users, Laptop, Shield } from "lucide-react";

const features = [
  { name: "Collaboration", icon: Users },
  { name: "Workspace", icon: Laptop },
  { name: "Secure", icon: Shield },
];

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background gradient blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold text-center mb-4 leading-tight"
      >
        Code Anywhere.{" "}
        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          Build Anything.
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-400 mb-8 max-w-xl"
      >
        Lightning-Fast Cloud IDE for Teams & Creators 🚀
      </motion.p>

      {/* Call to Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4"
      >
        <button className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-fuchsia-500/40 transition-transform">
          Get Started
        </button>
        <button className="border border-gray-600 px-6 py-3 rounded-full font-semibold text-gray-300 hover:bg-gray-800 transition">
          Watch Demo
        </button>
      </motion.div>


      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex gap-4 mt-8 flex-wrap justify-center"
      >
        {features.map(({ name, icon: Icon }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition backdrop-blur-sm"
          >
            <Icon className="w-4 h-4 text-violet-400" />
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
