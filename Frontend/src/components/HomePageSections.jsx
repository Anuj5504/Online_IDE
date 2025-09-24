import { Cloud, GitBranch, Globe, Lock, MessageSquare, Share2, Shield, Users, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"
import { useState } from "react";

export const ProblemSection = () => {
  const problems = [
    { label: "Complex setup & dependency hell", icon: Code },
    { label: "Tied to local machine performance", icon: Laptop },
    { label: "No real-time collaboration", icon: Users },
    { label: "Security risks with local storage", icon: Shield },
    { label: "Slow builds & wasted time", icon: Zap },
    { label: "Hard to share or reproduce environments", icon: GitBranch },
  ];

  return (
    <section className="bg-[#1e1e1e] text-white py-20 px-6" id="the-problem">
      <div className="text-center mb-16">
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
          Developers waste hours debugging setups, configuring tools, and fixing
          environments instead of shipping code. Local IDEs just don’t scale for
          modern teams.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {problems.map(({ label, icon: Icon }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition"
          >
            <Icon className="w-5 h-5 text-violet-400" />
            <p className="text-gray-200">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const SolutionSection = () => {
  const solutions = [
    "Instant, zero-setup environments",
    "Runs in your browser on any device",
    "Live collaboration with teammates",
    "Secure, sandboxed workspaces",
    "Integrated terminals & cloud builds",
    "One-click sharing & deployments",
  ];

  return (
    <section className="bg-[#0f0f0f] text-white py-20 px-6" id="solution">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full mb-4">
          The Solution
        </span>
        <h2 className="text-4xl font-extrabold">
          A{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Cloud IDE
          </span>{" "}
          built for the Future
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Stop wasting time on configs. Start coding instantly, collaborate in
          real time, and ship faster with a powerful IDE in the cloud.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {solutions.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition text-center"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export const FeaturesSection = () => {
  const features = [
    { title: "Real-time Collaboration", icon: Users },
    { title: "Zero Setup", icon: Cloud },
    { title: "Secure Sandboxing", icon: Lock },
    { title: "Integrated DevOps", icon: GitBranch },
    { title: "Cross-Device Access", icon: Globe },
    { title: "Blazing Fast", icon: Zap },
  ];

  return (
    <section className="bg-[#1e1e1e] text-white py-20 px-6" id="features">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold">Key Features</h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Everything you need to code, collaborate, and deploy — right from your
          browser.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map(({ title, icon: Icon }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
          >
            <Icon className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="font-semibold">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export const DemoSection = () => (
  <section className="bg-[#0f0f0f] text-white py-20 px-6" id="demo">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold">See It in Action</h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Your workspace, terminal, and collaboration tools — all inside one
        browser tab.
      </p>
    </div>

    <div className="max-w-5xl mx-auto bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-[#2b2b2b] flex gap-2 p-2">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      <div className="p-6 text-gray-400">
        <p>// Code editor + terminal preview goes here</p>
      </div>
    </div>
  </section>
);

export const CollaborationSection = () => (
  <section className="bg-[#1e1e1e] text-white py-20 px-6" id="collab">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold">Made for Teams</h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Pair program, chat, and share code in real time — as if you were sitting
        side by side.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition">
        <Users className="w-6 h-6 text-violet-400 mb-2" />
        Live Cursors
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition">
        <MessageSquare className="w-6 h-6 text-violet-400 mb-2" />
        Team Chat
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition">
        <Share2 className="w-6 h-6 text-violet-400 mb-2" />
        Easy Invites
      </div>
    </div>
  </section>
);

export const SecuritySection = () => (
  <section className="bg-[#0f0f0f] text-white py-20 px-6" id="security">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold">Secure by Design</h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Every workspace is isolated, encrypted, and monitored to keep your code
        and data safe.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
        <Shield className="w-6 h-6 text-violet-400 mb-2" />
        Sandboxed Environments
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
        <Lock className="w-6 h-6 text-violet-400 mb-2" />
        End-to-End Encryption
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
        <Globe className="w-6 h-6 text-violet-400 mb-2" />
        Global Reliability
      </div>
    </div>
  </section>
);

export const PricingSection = () => (
  <section className="bg-[#1e1e1e] text-white py-20 px-6" id="pricing">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold">Simple Pricing</h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Whether you’re a solo dev or a growing team, we’ve got you covered.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition">
        <h3 className="text-xl font-bold mb-2">Free</h3>
        <p className="text-gray-400 mb-4">For hobbyists</p>
        <p className="text-2xl font-extrabold mb-4">$0</p>
        <button className="bg-violet-600 px-4 py-2 rounded-full font-semibold">
          Get Started
        </button>
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition">
        <h3 className="text-xl font-bold mb-2">Pro</h3>
        <p className="text-gray-400 mb-4">For professionals</p>
        <p className="text-2xl font-extrabold mb-4">$15/mo</p>
        <button className="bg-violet-600 px-4 py-2 rounded-full font-semibold">
          Upgrade
        </button>
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center hover:bg-white/10 transition">
        <h3 className="text-xl font-bold mb-2">Team</h3>
        <p className="text-gray-400 mb-4">For startups & orgs</p>
        <p className="text-2xl font-extrabold mb-4">$50/mo</p>
        <button className="bg-violet-600 px-4 py-2 rounded-full font-semibold">
          Contact Sales
        </button>
      </div>
    </div>
  </section>
);

export const TestimonialsSection = () => (
  <section className="bg-[#0f0f0f] text-white py-20 px-6" id="testimonials">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold">Loved by Developers</h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Early adopters are already building the future with our Cloud IDE.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
        <p className="text-gray-300">
          “I spun up my workspace in seconds — no installs, no config. Game
          changer!”
        </p>
        <p className="text-violet-400 mt-3 font-semibold">— Alex, Backend Dev</p>
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
        <p className="text-gray-300">
          “Pair programming feels natural, like Google Docs for code.”
        </p>
        <p className="text-violet-400 mt-3 font-semibold">— Priya, Fullstack</p>
      </div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
        <p className="text-gray-300">
          “Finally, I can code on my iPad while traveling. Unreal.”
        </p>
        <p className="text-violet-400 mt-3 font-semibold">— Sam, Student</p>
      </div>
    </div>
  </section>
);

const faqs = [
  {
    question: "Can I run any language (C++, Python, Node, etc.)?",
    answer:
      "Yes! Our Cloud IDE supports multiple runtimes including Python, C++, Node.js, and more. You can install custom packages as well.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "Nope. Everything runs in the browser. Just log in and start coding — zero setup required.",
  },
  {
    question: "Can teams collaborate in real-time?",
    answer:
      "Absolutely. Multiple devs can edit the same file, see live cursors, chat in-app, and even share terminals.",
  },
  {
    question: "Is my code secure?",
    answer:
      "Your code is sandboxed in isolated containers with encrypted storage. Only you and invited teammates can access it.",
  },
  {
    question: "What about pricing?",
    answer:
      "We’ll launch pricing tiers closer to release. For now, you can preorder and secure early access.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[#1e1e1e] text-white py-20 px-6 relative" id="faq">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full mb-4">
          FAQ
        </span>
        <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Got questions? We’ve got answers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-white/10 rounded-xl bg-[#2b2b2b]/60 backdrop-blur-sm shadow-lg"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-gray-200 hover:text-white transition"
              onClick={() => toggleFAQ(idx)}
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openIndex === idx ? "rotate-180 text-violet-400" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-4 text-gray-400 text-lg leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

