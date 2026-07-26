"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface SkillTerminalProps {
  themeColor: string;
}

export default function SkillTerminal({ themeColor }: SkillTerminalProps) {
  const [mode, setMode] = useState<"visual" | "cli">("visual");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: "welcome",
      output: "Type 'help' for available commands. Try: 'skills', 'projects', 'contact', 'clear'."
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const skillsData = [
    { category: "Frontend & UI", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL / Three.js"] },
    { category: "Backend & Systems", items: ["Python", "Django REST Framework", "Node.js", "Express", "PostgreSQL", "WebRTC"] },
    { category: "DevOps & Cloud", items: ["Google Cloud Platform", "Docker", "Postman API", "Git / GitHub Actions", "Vercel CI/CD"] },
  ];

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = "";

    switch (trimmed) {
      case "help":
        response = "Available commands: 'skills', 'projects', 'experience', 'contact', 'clear'";
        break;
      case "skills":
        response = "Languages & Tech: JavaScript, TypeScript, Python, React, Next.js, Django, PostgreSQL, WebGL, Three.js, Docker";
        break;
      case "projects":
        response = "Live Works:\n- Zrooth-Jobs: Microservice Recruitment Platform\n- BrainStack.AI: Neural Assessment Engine\n- Web Editor: Browser UI Builder\n- Gaming Market: E-Commerce Platform";
        break;
      case "experience":
        response = "Lawcrust Legal Technology — Software Engineer Intern & Team Lead (Jan 2026 - Present)";
        break;
      case "contact":
        response = "Email: dineshrajan2112@gmail.com | GitHub: github.com/Dinesh2112 | LinkedIn: linkedin.com/in/dinesh-rajan-734343248/";
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        response = `Command not recognized: '${trimmed}'. Type 'help' for command list.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 pointer-events-auto">
      {/* Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Engineering Matrix
          </h3>
          <p className="text-sm text-neutral-400 font-medium mt-1">
            Interactive skill explorer and terminal interface
          </p>
        </div>

        <div className="flex bg-white/5 border border-white/10 p-1 rounded-full">
          <button
            onClick={() => setMode("visual")}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              mode === "visual" ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            Visual Mode
          </button>
          <button
            onClick={() => {
              setMode("cli");
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              mode === "cli" ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            CLI Mode
          </button>
        </div>
      </div>

      {/* Mode Content */}
      {mode === "visual" ? (
        <div className="flex flex-col gap-6 w-full p-4 sm:p-8 bg-black/40 rounded-3xl backdrop-blur-3xl border border-white/5">
          {skillsData.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border-b border-white/10 pb-6 last:border-0 last:pb-0"
            >
              <h4 className="w-full md:w-1/4 text-sm font-black uppercase tracking-widest" style={{ color: themeColor }}>
                {group.category}
              </h4>
              <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                {group.items.map((item, i) => (
                  <div key={item} className="flex items-center gap-4 group">
                    <span className="text-sm sm:text-base font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors cursor-default drop-shadow-md">
                      {item}
                    </span>
                    {i < group.items.length - 1 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div 
          onClick={() => inputRef.current?.focus()}
          className="relative z-20 bg-black/90 font-mono text-sm border border-white/15 rounded-2xl p-6 h-80 overflow-y-auto space-y-4 shadow-inner cursor-text pointer-events-auto"
        >
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-400">
                <span style={{ color: themeColor }}>dinesh@portfolio:~$</span>
                <span className="text-white font-bold">{h.command}</span>
              </div>
              <div className="text-neutral-300 whitespace-pre-wrap pl-4 border-l-2 border-white/20">
                {h.output}
              </div>
            </div>
          ))}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                handleCommand(input);
                setInput("");
              }
            }}
            className="flex items-center gap-2 pt-2"
          >
            <span style={{ color: themeColor }}>dinesh@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'help'..."
              className="bg-transparent border-none text-white focus:outline-none flex-1 font-mono text-sm cursor-text"
              autoFocus
            />
          </form>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
