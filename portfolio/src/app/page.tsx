"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import SmoothTab from "@/components/SmoothTab";
import ThemeDock, { themes, Theme } from "@/components/ThemeDock";
import ProjectModal, { ProjectData } from "@/components/ProjectModal";
import SkillTerminal from "@/components/SkillTerminal";
import MouseEffectCard from "@/components/MouseEffectCard";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const MetaballBackground = dynamic(() => import("@/components/MetaballBackground"), { ssr: false });
const WebGLImageHover = dynamic(() => import("@/components/WebGLImageHover"), { ssr: false });
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const SplitTextReveal = dynamic(() => import("@/components/SplitTextReveal"), { ssr: false });
const InfiniteMarquee = dynamic(() => import("@/components/InfiniteMarquee"), { ssr: false });

export default function Home() {
  const [activeNavTab, setActiveNavTab] = useState("work");
  const [activeFilterTab, setActiveFilterTab] = useState("all");
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const navTabs = [
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "terminal", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll Spy for Main Navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNavTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    const sections = navTabs.map(tab => document.getElementById(tab.id)).filter(Boolean);
    sections.forEach((s) => s && observer.observe(s));

    return () => {
      sections.forEach((s) => s && observer.unobserve(s));
    };
  }, []);

  const filterTabs = [
    { id: "all", label: "All Works" },
    { id: "fullstack", label: "Full-Stack" },
    { id: "ai", label: "AI Engine" },
    { id: "tools", label: "Tools" },
  ];

  const projects: ProjectData[] = [
    {
      id: "zrooth",
      title: "Zrooth-Jobs",
      role: "Microservice Platform",
      desc: "A massive microservice-based recruitment platform supporting concurrent video interviews. Implemented custom email-primary JWT auth, WebRTC video calling, and system-wide audit logging across 30+ API endpoints.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "WebRTC"],
      live: "http://zrooth-jobs.duckdns.org/",
      github: "",
      image: "/zrooth_brutalist_1781683826872.png",
      details: {
        overview: "Zrooth-Jobs is an enterprise-grade recruitment platform designed for high concurrency video interviews and automated candidate evaluations.",
        architecture: [
          "Microservice architecture with decoupled API services.",
          "Custom WebRTC signaling server for peer-to-peer video streaming.",
          "PostgreSQL database with connection pooling and token-scoped security."
        ],
        features: [
          "Live peer-to-peer video interview rooms.",
          "Real-time interview scoring & audit logging.",
          "High performance JWT authentication engine."
        ]
      }
    },
    {
      id: "brainstack",
      title: "BrainStack.AI",
      role: "Neural Assessment Engine",
      desc: "An advanced, high-performance platform that generates academic-grade Multiple Choice Questions (MCQs) for interview and assessment training. Powered by a resilient Triple-Stack AI Architecture (Gemini, GPT-4o, Llama 3) for 100% uptime, featuring multi-source generation from URLs and PDFs with a gamified analytics dashboard.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      live: "https://brain-stack-lurb.vercel.app/",
      github: "https://github.com/Dinesh2112/Brain-Stack/tree/main",
      image: "/brainstack_brutalist_1781683840303.png",
      details: {
        overview: "BrainStack.AI automates academic and technical assessment creation from any document or web URL with zero downtime guarantees.",
        architecture: [
          "Triple-Stack AI fallback mechanism (Gemini 1.5 -> GPT-4o -> Llama 3).",
          "Document parsing pipelines supporting PDF and DOCX extractions.",
          "Gamified analytics dashboard built with Recharts."
        ],
        features: [
          "Multi-source question generation (Topic, URL, PDF).",
          "Automated fallback routing ensuring 100% uptime.",
          "Real-time performance badges & score breakdowns."
        ]
      }
    },
    {
      id: "webeditor",
      title: "Web Editor",
      role: "UI Design Tool",
      desc: "A Figma-like design tool in the browser — drag-and-drop canvas, real-time CSS property editing, hierarchical layer management, and responsive design controls; deployed with automated CI/CD.",
      tech: ["React", "Node.js", "Express", "Vercel"],
      live: "https://web-editor-opal.vercel.app/",
      github: "",
      image: "/notepad_brutalist_1781683850879.png",
      details: {
        overview: "Web Editor empowers users to visually design web layouts directly in the browser with real-time CSS code generation.",
        architecture: [
          "Canvas state management with undo/redo action trees.",
          "Hierarchical DOM layer tree renderer.",
          "Automated CI/CD deployment pipeline."
        ],
        features: [
          "Drag and drop component positioning.",
          "Live CSS property inspection and modification.",
          "One-click HTML/CSS bundle export."
        ]
      }
    },
    {
      id: "gaming",
      title: "Gaming Market",
      role: "E-Commerce",
      desc: "Full-stack marketplace with an AI sales assistant — Node.js/Express on Supabase (PostgreSQL) with connection pooling. Configured CI/CD pipelines with environment variable security.",
      tech: ["Node.js", "Supabase", "React", "PostgreSQL"],
      live: "https://gamming-ecommerce.vercel.app/",
      github: "",
      image: "/gaming_brutalist_1781683864661.png",
      details: {
        overview: "Gaming Market is a full-featured e-commerce ecosystem tailored for digital game distribution and hardware sales.",
        architecture: [
          "Supabase backend with PostgreSQL connection pooling.",
          "Integrated AI recommendation assistant.",
          "Secure environment variable management."
        ],
        features: [
          "Instant product search & category filtering.",
          "AI sales assistant integration for product recommendations.",
          "Seamless cart and checkout flow."
        ]
      }
    }
  ];

  const filteredProjects = activeFilterTab === "all"
    ? projects
    : projects.filter((p) => p.id.includes(activeFilterTab) || (activeFilterTab === "fullstack" && (p.id === "zrooth" || p.id === "gaming")) || (activeFilterTab === "ai" && p.id === "brainstack") || (activeFilterTab === "tools" && p.id === "webeditor"));

  const handleNavChange = (id: string) => {
    setActiveNavTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Preloader />
      <CustomCursor />
      <MetaballBackground themeColor={currentTheme.color} />

      {/* Floating Theme Switcher Dock */}
      <ThemeDock
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Interactive Project Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        themeColor={currentTheme.color}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Kokonut UI Header Navigation */}
      <div className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto px-4 max-w-full">
        <SmoothTab
          tabs={navTabs}
          activeTab={activeNavTab}
          onChange={handleNavChange}
          activeColor={currentTheme.color}
        />
      </div>

      <main className="relative w-full min-h-screen text-white font-sans overflow-hidden z-10 selection:bg-black selection:text-white">
        
        {/* HERO SECTION */}
        <section className="h-[100dvh] flex flex-col justify-between px-4 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-10 sm:pb-12 relative w-full">
          
          <div className="flex flex-col items-start w-full">
            <h1 className="text-[clamp(3.5rem,14vw,14rem)] font-black tracking-tighter leading-[0.8] uppercase text-white pb-2 md:pb-4 border-b-[1vw] border-white z-10 break-words w-full">
              Dinesh
            </h1>
            
            <h1 className="text-[clamp(3.5rem,14vw,14rem)] font-black tracking-tighter leading-[0.8] uppercase text-white pb-2 md:pb-4 border-b-[1vw] border-white z-10 break-words w-full mt-4 sm:mt-6">
              Rajan
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-16 w-full z-10 mt-4 sm:mt-6">
              <h1 className="text-[clamp(3.5rem,14vw,14rem)] font-black tracking-tighter leading-[0.8] uppercase text-white pb-2 md:pb-4 border-b-[1vw] border-white shrink-0 break-words w-full md:w-auto">
                Pandian
              </h1>
              <div className="pb-2 sm:pb-4 mt-2 sm:mt-4 md:mt-0">
                <p className="font-bold text-base sm:text-lg md:text-2xl leading-snug uppercase tracking-tight text-white max-w-sm">
                  FULL-STACK ENGINEER<br/>
                  CURRENTLY BASED<br/>
                  IN INDIA
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end w-full z-10 pointer-events-auto mt-6 sm:mt-8">
            <div className="flex items-center gap-3 text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider">
              <a 
                href="#work" 
                className="bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-2xl"
              >
                Work
              </a>
              <span className="text-white/40">/</span>
              <a 
                href="#about" 
                className="bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-2xl"
              >
                About
              </a>
            </div>

            <motion.a 
              href="#work"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer border-2 border-white rounded-full p-3 sm:p-4 md:p-6 hover:bg-white hover:text-black transition-colors group shadow-2xl bg-black/80 backdrop-blur-md text-white"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </motion.a>
          </div>
        </section>

        {/* PROJECTS SECTION WITH SMOOTH TAB FILTER & MODAL TRIGGER */}
        <section id="work" className="px-4 sm:px-8 md:px-24 py-24 sm:py-36 md:py-48">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-16 sm:mb-24 border-b-4 border-white pb-8">
            <SplitTextReveal text="SELECTED WORKS" className="text-4xl sm:text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-none" />
            
            {/* Smooth Tab Filter */}
            <div className="pointer-events-auto max-w-full">
              <SmoothTab
                tabs={filterTabs}
                activeTab={activeFilterTab}
                onChange={setActiveFilterTab}
                activeColor={currentTheme.color}
              />
            </div>
          </div>

          <motion.div layout className="flex flex-col gap-32 sm:gap-48 md:gap-64">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-32 items-center group"
                >
                  {/* WebGL Canvas Container with Clickable Modal Trigger */}
                  <motion.div 
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProject(project)}
                    className="lg:col-span-7 w-full h-[45vh] sm:h-[60vh] md:h-[80vh] cursor-pointer pointer-events-auto shadow-2xl relative rounded-2xl overflow-hidden group/canvas"
                  >
                     <div 
                       className="absolute inset-0 transform -translate-x-4 translate-y-4 z-[-1] transition-transform group-hover/canvas:translate-x-0 group-hover/canvas:translate-y-0"
                       style={{ backgroundColor: currentTheme.color }}
                     />
                     <WebGLImageHover imagePath={project.image} className="w-full h-full border-4 border-[#050505] bg-[#050505]" />

                     {/* Overlay Badge */}
                     <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentTheme.color }} />
                       Quick Inspect 🔍
                     </div>
                  </motion.div>
                  
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <h3 className="text-[clamp(2.2rem,5vw,5rem)] font-black uppercase tracking-tighter mb-3 sm:mb-4 leading-none break-words">
                      {project.title}
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold italic font-serif mb-8 sm:mb-12 text-white/90 drop-shadow-md">
                      <span style={{ color: currentTheme.color }} className="mr-2">✦</span> {project.role}
                    </p>
                    <p className="text-lg sm:text-2xl md:text-3xl font-medium leading-snug mb-10 sm:mb-16 text-neutral-200">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-16">
                      {project.tech.map((t) => (
                        <motion.span 
                          key={t}
                          whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.2)" }}
                          className="px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] pointer-events-auto cursor-default transition-colors"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-6 sm:gap-12">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedProject(project)}
                        className="px-6 py-3 rounded-full font-black text-sm sm:text-base uppercase tracking-widest text-white pointer-events-auto cursor-pointer"
                        style={{ backgroundColor: currentTheme.color }}
                      >
                        Inspect Details ↗
                      </motion.button>

                      {project.live && (
                        <motion.a 
                          whileHover={{ x: 5 }}
                          href={project.live} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-lg sm:text-2xl font-black border-b-2 sm:border-b-4 border-white hover:text-white transition-colors pointer-events-auto cursor-pointer uppercase tracking-widest flex items-center"
                        >
                          Live Site ↗
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="px-4 sm:px-8 md:px-16 py-24 sm:py-36 md:py-48 bg-[#050505] text-white">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-16 sm:mb-24 border-b-4 border-white pb-8">
            <SplitTextReveal text="EXPERIENCE" className="text-4xl sm:text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-none" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">
            <div className="lg:col-span-5">
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4 leading-none">Lawcrust Legal<br/>Technology</h3>
              <p className="text-xl sm:text-2xl font-bold italic serif mb-8 sm:mb-12 text-gray-300">Software Engineer Intern — Team Lead</p>
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://fundmycase.in/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block border-b-2 sm:border-b-4 border-white pb-2 uppercase font-black tracking-widest text-lg sm:text-xl transition-colors cursor-pointer pointer-events-auto"
                style={{ color: currentTheme.color, borderColor: currentTheme.color }}
              >
                View Live Site ↗
              </motion.a>
              <p className="mt-8 sm:mt-12 text-gray-400 font-bold text-base sm:text-xl uppercase tracking-widest">
                Jan 2026 — Present
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-8 sm:space-y-16 text-lg sm:text-2xl md:text-3xl font-medium leading-snug">
                <li className="p-6 sm:p-8 border-l-4 bg-white/5 backdrop-blur-md rounded-r-2xl" style={{ borderColor: currentTheme.color }}>
                  <span className="font-black block mb-2 sm:mb-4 uppercase tracking-tighter" style={{ color: currentTheme.color }}>Platform Architecture</span>
                  Led a 4-member team architecting a production platform serving 3 live products across 6 independent React SPAs connected to a centralised Django REST API gateway.
                </li>
                <li className="p-6 sm:p-8 border-l-4 bg-white/5 backdrop-blur-md rounded-r-2xl" style={{ borderColor: currentTheme.color }}>
                  <span className="font-black block mb-2 sm:mb-4 uppercase tracking-tighter" style={{ color: currentTheme.color }}>Algorithmic Engine</span>
                  Engineered a configurable algorithmic engine in Python evaluating 60+ data fields against admin-defined knockout matrices for autonomous yield computation.
                </li>
                <li className="p-6 sm:p-8 border-l-4 bg-white/5 backdrop-blur-md rounded-r-2xl" style={{ borderColor: currentTheme.color }}>
                  <span className="font-black block mb-2 sm:mb-4 uppercase tracking-tighter" style={{ color: currentTheme.color }}>CRM & Role-Based Access</span>
                  Built an interactive CRM admin dashboard with Kanban pipelines and implemented end-to-end RBAC with token-scoped access.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEVELOPER CLI & SKILLS MATRIX */}
        <section id="terminal" className="px-4 sm:px-8 md:px-24 py-24 sm:py-36">
          <SkillTerminal themeColor={currentTheme.color} />
        </section>

        {/* SKILLS INFINITE MARQUEE */}
        <section className="py-24 sm:py-36 md:py-48 text-white relative z-10 bg-black">
          <InfiniteMarquee text="JAVASCRIPT TYPESCRIPT PYTHON REACT NEXT.JS DJANGO POSTGRESQL WEBGL THREE.JS" themeColor={currentTheme.color} />
        </section>

        {/* ABOUT & EDUCATION SECTION */}
        <section id="about" className="px-4 sm:px-8 md:px-16 py-24 sm:py-36 md:py-48 bg-[#050505] text-white border-t-4 border-white">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-16 sm:mb-24 border-b-4 border-white pb-8">
            <SplitTextReveal text="EDUCATION" className="text-4xl sm:text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24">
            <div>
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Master of Computer Applications</h3>
              <p className="text-xl sm:text-2xl font-bold italic font-serif mb-12 sm:mb-16 text-gray-300">SIES College (2024 — 2026)</p>
              
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4">B.Sc. Computer Science</h3>
              <p className="text-xl sm:text-2xl font-bold italic font-serif text-gray-300">SIES College (2021 — 2024)</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter mb-8 sm:mb-12">Certifications</h3>
              <ul className="space-y-8 sm:space-y-12 text-xl sm:text-3xl font-medium">
                <li>
                  <motion.a 
                    whileHover={{ x: 8 }}
                    href="https://www.skills.google/public_profiles/19f8df9d-5ee3-4637-8b37-0d1696475eab/badges/5245377" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="border-b-2 sm:border-b-4 border-white pb-2 transition-colors cursor-pointer pointer-events-auto inline-block"
                    style={{ color: currentTheme.color, borderColor: currentTheme.color }}
                  >
                    Google Foundational Cloud Developer ↗
                  </motion.a>
                </li>
                <li><span className="border-b-2 sm:border-b-4 border-white pb-2">Postman API Fundamentals Expert</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT FOOTER */}
        <footer id="contact" className="px-4 sm:px-8 md:px-16 py-24 sm:py-36 md:py-48 flex flex-col items-center justify-center transition-colors duration-500" style={{ backgroundColor: currentTheme.color }}>
          <SplitTextReveal text="LET'S TALK" className="text-[12vw] font-black uppercase tracking-tighter text-white border-b-4 sm:border-b-8 border-white pb-8 mb-16 sm:mb-24" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 w-full max-w-6xl justify-items-center">
            <MouseEffectCard 
              title="Email"
              subtitle="Drop me a line"
              topText="Contact"
              topSubtext="Let's build something"
              primaryCtaText="Send Email"
              primaryCtaUrl="mailto:dineshrajan2112@gmail.com"
              secondaryCtaText=""
              footerText="Available for work"
            />
            <MouseEffectCard 
              title="GitHub"
              subtitle="Explore open source code"
              topText="Code"
              topSubtext="Repositories"
              primaryCtaText="View GitHub"
              primaryCtaUrl="https://github.com/Dinesh2112"
              secondaryCtaText=""
              footerText="Active contributor"
            />
            <MouseEffectCard 
              title="LinkedIn"
              subtitle="Connect professionally"
              topText="Network"
              topSubtext="Experience"
              primaryCtaText="View Profile"
              primaryCtaUrl="https://www.linkedin.com/in/dinesh-rajan-734343248/"
              secondaryCtaText=""
              footerText="Let's connect"
            />
          </div>
        </footer>

        {/* BACK TO TOP BUTTON */}
        <div className="fixed bottom-6 left-6 z-50 pointer-events-auto hidden sm:block">
          <button 
            className="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="svgIcon" viewBox="0 0 384 512">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
            </svg>
          </button>
        </div>

      </main>
    </>
  );
}
