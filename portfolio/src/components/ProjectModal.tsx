"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectData {
  id: string;
  title: string;
  role: string;
  desc: string;
  tech: string[];
  live?: string;
  github?: string;
  image: string;
  details?: {
    overview: string;
    architecture: string[];
    features: string[];
  };
}

interface ProjectModalProps {
  project: ProjectData | null;
  themeColor: string;
  onClose: () => void;
}

export default function ProjectModal({ project, themeColor, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "features">("overview");

  if (!project) return null;

  const defaultDetails = {
    overview: project.desc,
    architecture: [
      "Modular microservice structure with high concurrency support.",
      "Optimized database connection pooling and caching strategy.",
      "Strict type validation and robust RESTful API gateway integration."
    ],
    features: [
      "Real-time interactive user experience with low latency.",
      "Role-based access control and token-scoped security.",
      "Automated CI/CD pipeline deployment with zero downtime."
    ]
  };

  const details = project.details || defaultDetails;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest block" style={{ color: themeColor }}>
                {project.role}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors focus:outline-none cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Tab Selector */}
            <div className="flex gap-2 border-b border-white/10 pb-4">
              {(["overview", "architecture", "features"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === tab ? "bg-white text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-medium">
                  {details.overview}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-full border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "architecture" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Key Architectural Highlights</h4>
                <ul className="space-y-3">
                  {details.architecture.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: themeColor }} />
                      <span className="text-base text-neutral-200 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "features" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Core Engineering Features</h4>
                <ul className="space-y-3">
                  {details.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <span className="text-lg">⚡</span>
                      <span className="text-base text-neutral-200 font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Footer Action Links */}
          <div className="flex flex-wrap gap-4 items-center justify-between px-6 py-5 border-t border-white/10 bg-white/5">
            <div className="flex gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: themeColor }}
                >
                  Launch Live Site ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-white/20 font-black text-sm uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  GitHub Repository ↗
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
