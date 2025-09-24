import React from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Server,
  Users,
  Shield,
  Timer,
  Share2,
} from "lucide-react";

const problems = [
  { label: "Complex setup & dependency hell", icon: Wrench },
  { label: "Tied to local machine performance", icon: Server },
  { label: "No real-time collaboration", icon: Users },
  { label: "Security risks with local storage", icon: Shield },
  { label: "Slow builds & wasted time", icon: Timer },
  { label: "Hard to share or reproduce environments", icon: Share2 },
];

const DemoSection = () => {
  return (
    <section
      className="bg-[#1e1e1e] text-white py-20 px-6 relative overflow-hidden"
      id="the-problem"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-fuchsia-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block px-4 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full mb-4">
          The Problem
        </span>
        <h2 className="text-4xl font-extrabold">
          Traditional Dev Environments <br />
          equal{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Big Headaches
          </span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Local IDEs are slow, fragile, and hard to collaborate in. Developers
          spend more time fixing setups than building. Our Cloud IDE fixes that.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#2b2b2b]/60 rounded-3xl p-8 lg:p-14 shadow-xl border border-white/10 relative z-10 backdrop-blur-sm">
        {/* Left Side: Visual Problem Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center h-[320px] rounded-3xl bg-gradient-to-br from-violet-900/30 via-black to-fuchsia-900/20 shadow-inner overflow-hidden"
        >
          <h3 className="text-2xl font-semibold text-center text-gray-200 z-10">
            ⚡ Dev Pain Points
          </h3>
          {/* Floating dots for visual accent */}
          <div className="absolute inset-0 flex justify-between p-6">
            <div className="flex flex-col gap-3">
              <div className="w-5 h-5 bg-violet-400 rounded-full opacity-60 animate-pulse" />
              <div className="w-4 h-4 bg-fuchsia-400 rounded-full opacity-60 animate-bounce" />
              <div className="w-6 h-6 bg-purple-600 rounded-full opacity-60 animate-ping" />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Problems List */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-2xl font-semibold mb-6">Why Devs Struggle</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            {problems.map(({ label, icon: Icon }, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white/5 border border-white/10 p-3 rounded-lg hover:bg-white/10 transition"
              >
                <Icon className="w-5 h-5 text-violet-400 mt-0.5" />
                <p className="text-gray-200">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
