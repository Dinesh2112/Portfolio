"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const MetaballBackground = dynamic(() => import("@/components/MetaballBackground"), { ssr: false });
const WebGLImageHover = dynamic(() => import("@/components/WebGLImageHover"), { ssr: false });
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const SplitTextReveal = dynamic(() => import("@/components/SplitTextReveal"), { ssr: false });
const InfiniteMarquee = dynamic(() => import("@/components/InfiniteMarquee"), { ssr: false });

export default function Home() {
  const projects = [
    {
      title: "Zrooth-Jobs",
      role: "Microservice Platform",
      desc: "A massive microservice-based recruitment platform supporting concurrent video interviews. Implemented custom email-primary JWT auth, WebRTC video calling, and system-wide audit logging across 30+ API endpoints.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "WebRTC"],
      live: "https://zrooth-jobs-orpin.vercel.app/",
      github: "",
      image: "/zrooth_brutalist_1781683826872.png" // Updated Brutalist Photo
    },
    {
      title: "BrainStack.AI",
      role: "Neural Assessment Engine",
      desc: "An advanced, high-performance platform that generates academic-grade Multiple Choice Questions (MCQs) for interview and assessment training. Powered by a resilient Triple-Stack AI Architecture (Gemini, GPT-4o, Llama 3) for 100% uptime, featuring multi-source generation from URLs and PDFs with a gamified analytics dashboard.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      live: "https://brain-stack-lurb.vercel.app/",
      github: "https://github.com/Dinesh2112/Brain-Stack/tree/main",
      image: "/brainstack_brutalist_1781683840303.png" // Updated Brutalist Photo
    },
    {
      title: "Web Editor",
      role: "UI Design Tool",
      desc: "A Figma-like design tool in the browser — drag-and-drop canvas, real-time CSS property editing, hierarchical layer management, and responsive design controls; deployed with automated CI/CD.",
      tech: ["React", "Node.js", "Express", "Vercel"],
      live: "https://web-editor-opal.vercel.app/",
      github: "",
      image: "/notepad_brutalist_1781683850879.png" // Updated Brutalist Photo
    },
    {
      title: "Gaming Market",
      role: "E-Commerce",
      desc: "Full-stack marketplace with an AI sales assistant — Node.js/Express on Supabase (PostgreSQL) with connection pooling. Configured CI/CD pipelines with environment variable security.",
      tech: ["Node.js", "Supabase", "React", "PostgreSQL"],
      live: "https://gamming-ecommerce.vercel.app/",
      github: "",
      image: "/gaming_brutalist_1781683864661.png" // Updated Brutalist Photo
    }
  ];

  return (
    <>
      <Preloader />
      <CustomCursor />
      <MetaballBackground />
      
      <main className="relative w-full min-h-screen text-white font-sans overflow-hidden z-10 selection:bg-black selection:text-white">
        
        {/* HERO SECTION - PATRICK HENG BRUTALIST */}
        <section className="h-[100dvh] flex flex-col justify-between px-6 md:px-16 pt-32 pb-12 relative w-full">
          
          <div className="flex flex-col items-start w-full">
            <h1 className="text-[clamp(4rem,14vw,14rem)] font-black tracking-tighter leading-[0.8] uppercase text-white pb-2 md:pb-4 border-b-[1vw] border-white z-10 break-words w-full">
              Dinesh
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-16 w-full z-10 mt-6">
              <h1 className="text-[clamp(4rem,14vw,14rem)] font-black tracking-tighter leading-[0.8] uppercase text-white pb-2 md:pb-4 border-b-[1vw] border-white shrink-0">
                Rajan
              </h1>
              <div className="pb-4 mt-4 md:mt-0">
                <p className="font-bold text-lg md:text-2xl leading-snug uppercase tracking-tight text-white max-w-sm">
                  FULL-STACK ENGINEER<br/>
                  CURRENTLY BASED<br/>
                  IN INDIA
                </p>
              </div>
            </div>
            
            <h1 className="text-[clamp(4rem,14vw,14rem)] font-black tracking-tighter leading-[0.8] uppercase text-white mt-6 pb-2 md:pb-4 border-b-[1vw] border-white z-10 break-words w-full">
              Pandian
            </h1>
          </div>

          <div className="flex justify-between items-end w-full z-10 pointer-events-auto mt-8">
            <div className="flex gap-4 text-xl md:text-3xl font-serif italic font-bold">
              <a href="#work" className="border-b-2 border-white hover:text-[#2563EB] hover:border-[#2563EB] transition-colors">Work</a>
              <span>,</span>
              <a href="#about" className="border-b-2 border-white hover:text-[#2563EB] hover:border-[#2563EB] transition-colors">About</a>
            </div>

            <a href="#about" className="cursor-pointer border-2 border-white rounded-full p-4 md:p-6 hover:bg-white hover:text-[#2563EB] transition-all animate-bounce group shadow-2xl bg-black/50 backdrop-blur-sm">
              <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="about" className="px-6 md:px-16 py-32 md:py-48 bg-[#050505] text-white">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-24 border-b-4 border-white pb-8">
            <SplitTextReveal text="EXPERIENCE" className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-none" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4 leading-none">Lawcrust Legal<br/>Technology</h3>
              <p className="text-2xl font-bold italic serif mb-12 text-gray-300">Software Engineer Intern — Team Lead</p>
              <a href="https://fundmycase.in/" target="_blank" rel="noreferrer" className="inline-block border-b-4 border-white hover:border-[#2563EB] hover:text-[#2563EB] pb-2 uppercase font-black tracking-widest text-xl transition-colors cursor-pointer pointer-events-auto">
                View Live Site ↗
              </a>
              <p className="mt-12 text-gray-400 font-bold text-xl uppercase tracking-widest">
                Jan 2026 — Present
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-16 text-2xl md:text-3xl font-medium leading-snug">
                <li>
                  <span className="text-[#2563EB] font-black block mb-4 uppercase tracking-tighter">Platform Architecture</span>
                  Led a 4-member team architecting a production platform serving 3 live products across 6 independent React SPAs connected to a centralised Django REST API gateway.
                </li>
                <li>
                  <span className="text-[#2563EB] font-black block mb-4 uppercase tracking-tighter">Algorithmic Engine</span>
                  Engineered a configurable algorithmic engine in Python evaluating 60+ data fields against admin-defined knockout matrices for autonomous yield computation.
                </li>
                <li>
                  <span className="text-[#2563EB] font-black block mb-4 uppercase tracking-tighter">CRM & Role-Based Access</span>
                  Built an interactive CRM admin dashboard with Kanban pipelines and implemented end-to-end RBAC with token-scoped access.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="work" className="px-8 md:px-24 py-48">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-32 border-b-4 border-white pb-8">
            <SplitTextReveal text="SELECTED WORKS" className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-none" />
          </div>

          <div className="flex flex-col gap-64">
            {projects.map((project, idx) => (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center group">
                <div className="lg:col-span-7 w-full h-[60vh] md:h-[80vh] cursor-pointer pointer-events-auto shadow-2xl relative">
                   <div className="absolute inset-0 bg-[#2563EB] transform -translate-x-4 translate-y-4 z-[-1] transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                   <WebGLImageHover imagePath={project.image} className="w-full h-full border-4 border-[#050505] bg-[#050505]" />
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <h3 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase tracking-tighter mb-4 leading-none break-words">
                    {project.title}
                  </h3>
                  <p className="text-3xl font-bold italic font-serif mb-12">
                    {project.role}
                  </p>
                  <p className="text-2xl md:text-3xl font-medium leading-snug mb-16">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-16">
                    {project.tech.map((t) => (
                      <span key={t} className="px-6 py-3 border-4 border-white font-bold text-lg uppercase pointer-events-none">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-12">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="text-2xl font-black border-b-4 border-white hover:border-black hover:text-black transition-colors pointer-events-auto cursor-pointer uppercase tracking-widest">
                        Live Site ↗
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-2xl font-black border-b-4 border-white hover:border-black hover:text-black transition-colors pointer-events-auto cursor-pointer uppercase tracking-widest">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS INFINITE MARQUEE */}
        <section className="py-48 bg-[#111] text-white">
          <InfiniteMarquee text="JAVASCRIPT TYPESCRIPT PYTHON REACT NEXT.JS DJANGO POSTGRESQL WEBGL THREE.JS" />
        </section>

        <section className="px-6 md:px-16 py-32 md:py-48 bg-[#050505] text-white border-t-4 border-white">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-24 border-b-4 border-white pb-8">
            <SplitTextReveal text="EDUCATION" className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h3 className="text-5xl font-black uppercase tracking-tighter mb-4">Master of Computer Applications</h3>
              <p className="text-2xl font-bold italic font-serif mb-16 text-gray-300">SIES College (2024 — 2026)</p>
              
              <h3 className="text-5xl font-black uppercase tracking-tighter mb-4">B.Sc. Computer Science</h3>
              <p className="text-2xl font-bold italic font-serif text-gray-300">SIES College (2021 — 2024)</p>
            </div>
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-12">Certifications</h3>
              <ul className="space-y-12 text-3xl font-medium">
                <li><a href="https://www.skills.google/public_profiles/19f8df9d-5ee3-4637-8b37-0d1696475eab/badges/5245377" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] border-b-4 border-white hover:border-[#2563EB] pb-2 transition-colors cursor-pointer pointer-events-auto">Google Foundational Cloud Developer</a></li>
                <li><span className="border-b-4 border-white pb-2">Postman API Fundamentals Expert</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT FOOTER */}
        <footer className="px-6 md:px-16 py-32 md:py-64 flex flex-col items-center justify-center bg-[#2563EB]">
          <SplitTextReveal text="LET'S TALK" className="text-[14vw] font-black uppercase tracking-tighter text-white border-b-8 border-white pb-8 mb-24" />
          <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-center">
            <a href="mailto:dineshrajan2112@gmail.com" className="text-4xl md:text-6xl font-bold italic font-serif hover:text-black transition-colors cursor-pointer pointer-events-auto border-b-4 border-transparent hover:border-black pb-2">
              Email
            </a>
            <a href="https://github.com/Dinesh2112" target="_blank" rel="noreferrer" className="text-4xl md:text-6xl font-bold italic font-serif hover:text-black transition-colors cursor-pointer pointer-events-auto border-b-4 border-transparent hover:border-black pb-2">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dinesh-rajan-734343248/" target="_blank" rel="noreferrer" className="text-4xl md:text-6xl font-bold italic font-serif hover:text-black transition-colors cursor-pointer pointer-events-auto border-b-4 border-transparent hover:border-black pb-2">
              LinkedIn
            </a>
          </div>
        </footer>

      </main>
    </>
  );
}
