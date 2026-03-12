import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Sparkles, GraduationCap, Code, Briefcase, Award, Target, Rocket } from "lucide-react";

import certificate1 from '../components/certificate1.jpg';
import certificate2 from '../components/certificate2.jpg';
import certificate3 from '../components/certificate3.jpg';

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
type Category = "Education" | "Skill Development" | "Projects" | "Experience" | "Future Goals" | "Certificates";

interface Milestone {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  startOffset: number; // 0-100 percentage
  duration: number; // 0-100 percentage
  icon: React.ReactNode;
  tags?: string[];
  link?: string;
  image?: string;
}

// --- Data ---
const journeyData: Milestone[] = [
  {
    id: "edu-1",
    category: "Education",
    title: "B.Tech in CSE",
    subtitle: "Lovely Professional University",
    date: "Aug 2023 – Present",
    description: "Currently pursuing Computer Science and Engineering. Focusing on core algorithms and full-stack development. Balancing academic excellence with real-world project builds.",
    startOffset: 16,
    duration: 80,
    icon: <GraduationCap size={14} />,
    tags: ["CSE", "LPU", "Student"],
  },
  {
    id: "skill-1",
    category: "Skill Development",
    title: "DSA & Python Mastery",
    subtitle: "CSE Pathshala",
    date: "Jun 2025 – Jul 2025",
    description: "Intensive training in Data Structures and Algorithms. Optimized complex problem solutions and mastered recursion, dynamic programming, and data modeling.",
    startOffset: 55,
    duration: 10,
    icon: <Code size={14} />,
    tags: ["DSA", "Python", "Problem Solving"],
  },
  {
    id: "proj-1",
    category: "Projects",
    title: "Carewise Australia",
    subtitle: "Healthcare Booking Platform",
    date: "Nov 2025 – Dec 2025",
    description: "Developed and deployed a full-service booking platform generating 25K+ AUD in bookings. Orchestrated automated email systems and commercial-grade UI.",
    startOffset: 27,
    duration: 22,
    icon: <Rocket size={14} />,
    tags: ["React", "Firebase", "HealthTech"],
  },
  {
    id: "proj-2",
    category: "Projects",
    title: "Medical & Finance AI",
    subtitle: "ResNet50 & LSTM System",
    date: "Jun 2025 – Aug 2025",
    description: "Built a dual-model system using ResNet50 for brain tumor detection (87.8% accuracy) and LSTM for Bitcoin price prediction with real-time pipelines.",
    startOffset: 66,
    duration: 6,
    icon: <Rocket size={14} />,
    tags: ["ResNet50", "LSTM", "Flask"],
  },
  {
    id: "proj-3",
    category: "Projects",
    title: "SatyaSh App",
    subtitle: "Dynamic Digital Platform",
    date: "Sep 2025 – Nov 2025",
    description: "Designed a high-performance frontend using React and Framer Motion for interactive visualizations and seamless user experiences.",
    startOffset: 73,
    duration: 6,
    icon: <Rocket size={14} />,
    tags: ["React", "Tailwind", "Motion"],
  },
  {
    id: "proj-4",
    category: "Projects",
    title: "BhartVest",
    subtitle: "Financial Insights Engine",
    date: "Jan 2026 – Mar 2026",
    description: "Empowering users with real-time financial insights and investment management tools built on a scalable production-ready stack.",
    startOffset: 80,
    duration: 6,
    icon: <Rocket size={14} />,
    tags: ["Vite", "Tailwind", "Production"],
  },
  {
    id: "exp-1",
    category: "Experience",
    title: "Commercial Web Development",
    subtitle: "Freelance & Agency Projects",
    date: "Nov 2025 – Dec 2025",
    description: "Leading technical delivery for enterprise-grade web solutions, focusing on performance optimization and scalable cloud architectures.",
    startOffset: 25,
    duration: 25,
    icon: <Briefcase size={14} />,
    tags: ["Commercial", "Cloud", "Architecture"],
  },
  {
    id: "cert-1",
    category: "Certificates",
    title: "OCI 2025 Certified Generative AI Professional",
    subtitle: "Oracle Academy",
    date: "Sep 2025",
    description: "Earned global certification in Generative AI, demonstrating expertise in Large Language Models and prompt engineering strategies.",
    startOffset: 67,
    duration: 8,
    icon: <Award size={14} />,
    tags: ["Oracle", "GenAI", "LLM"],
    image: certificate2
  },
  {
    id: "cert-2",
    category: "Certificates",
    title: "Software Engineering Simulation",
    subtitle: "JPMorgan Chase & Co",
    date: "Jun 2024",
    description: "Completed an intensive software engineering job simulation at JPMorgan, focusing on system architecture and engineering best practices.",
    startOffset: 35,
    duration: 10,
    icon: <Award size={14} />,
    tags: ["JPMorgan", "SoftwareEngineering"],
    image: certificate1
  },
  {
    id: "cert-3",
    category: "Certificates",
    title: "Privacy and Security in Social Media",
    subtitle: "Nptel Certification",
    date: "Jul 2024",
    description: "Successfully completed a specialized NPTEL course on privacy and security in online social media, covering data protection and security paradigms.",
    startOffset: 46,
    duration: 8,
    icon: <Award size={14} />,
    tags: ["Nptel", "Security"],
    image: certificate3
  },
  {
    id: "future-1",
    category: "Future Goals",
    title: "Scaling AI Solutions",
    subtitle: "Enterprise Deployment",
    date: "2026 & Beyond",
    description: "Planning to deploy production-ready AI agents for larger enterprises, focusing on automated decision-making and real-time data processing.",
    startOffset: 87,
    duration: 13,
    icon: <Sparkles size={14} />,
    tags: ["Next Goal", "Scaling", "AIGC"],
  },
];

const categoryConfig: Record<Category, { color: string; label: string }> = {
  Education: { color: "#3B82F6", label: "Education" },
  "Skill Development": { color: "#10B981", label: "Learning" },
  Projects: { color: "#F59E0B", label: "Projects" },
  Experience: { color: "#2563EB", label: "Experience" },
  Certificates: { color: "#A855F7", label: "Certificates" },
  "Future Goals": { color: "#6B7280", label: "Future Goals" },
};

// --- Components ---

const QuoteCard: React.FC<{ milestone: Milestone; isVisible: boolean; mousePos: { x: number; y: number } }> = ({ milestone, isVisible, mousePos }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9, rotateX: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          left: mousePos.x,
          top: mousePos.y - 20
        }}
        exit={{ opacity: 0, y: 10, scale: 0.9, rotateX: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed z-[100] pointer-events-none -translate-x-1/2 -translate-y-full perspective-1000"
        style={{ width: milestone.image ? '500px' : '450px' }}
      >
        <div className="relative p-7 rounded-[2.5rem] bg-[#0d0d0d]/95 backdrop-blur-3xl border border-white/20 shadow-[0_40px_120px_rgba(0,0,0,1)] overflow-hidden">
          {/* Quote Glow */}
          <div
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-40 blur-3xl animate-pulse"
            style={{ backgroundColor: categoryConfig[milestone.category].color }}
          />

          <Quote className="text-white/5 absolute top-6 right-8" size={80} strokeWidth={1} />

          <div className="relative z-10 flex flex-col gap-6">
            {/* Certificate Image Pop-up */}
            {milestone.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={milestone.image}
                  alt={milestone.title}
                  className="w-full h-full object-contain relative z-0"
                />
                <div className="absolute bottom-4 left-6 z-20">
                  <div className="px-3 py-1 rounded-full bg-brand-primary text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                    Verified Credential
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border shadow-sm"
                  style={{
                    borderColor: `${categoryConfig[milestone.category].color}44`,
                    color: categoryConfig[milestone.category].color,
                    backgroundColor: `${categoryConfig[milestone.category].color}11`
                  }}
                >
                  {categoryConfig[milestone.category].label}
                </div>
                <span className="text-gray-500 text-[10px] font-medium tracking-widest uppercase">{milestone.date}</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight tracking-tight">{milestone.title}</h3>
              <p className="text-gray-400 text-[13px] italic mb-6 leading-relaxed font-medium">
                "{milestone.description}"
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-2">
                <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">{milestone.subtitle}</span>
                <div className="flex gap-2">
                  {milestone.tags?.map(tag => (
                    <span key={tag} className="text-[10px] text-brand-primary font-bold bg-brand-primary/10 px-2 py-0.5 rounded-lg border border-brand-primary/20">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Journey: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Category | "All">("All");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = ["Education", "Skill Development", "Projects", "Experience", "Certificates", "Future Goals"];

  const handleMouseMove = (e: React.MouseEvent) => {
    // Using pageX/Y or clientX/Y. clientX/Y with 'fixed' is usually safest.
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state via GSAP to avoid FOUC
      gsap.set(".timeline-card", { opacity: 0, x: -50, scale: 0.95 });

      gsap.to(".timeline-card", {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: {
          each: 0.1,
          from: "start"
        },
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: false // Allow re-triggering for "every time" effect
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hoveredMilestone = journeyData.find(m => m.id === hoveredId);

  return (
    <section
      id="journey"
      className="py-32 bg-dark-BASE relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            My Journey Roadmap
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-display font-bold text-white mb-6"
          >
            Learning & <span className="text-gray-600">Development</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A visual roadmap of my academic path, commercial experience, and future technical objectives.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Mouse Following Quote Card */}
          <QuoteCard milestone={hoveredMilestone!} isVisible={!!hoveredId} mousePos={mousePos} />

          <div className="rounded-[3rem] bg-[#080808]/50 border border-white/5 p-8 lg:p-16 backdrop-blur-xl shadow-3xl overflow-x-auto no-scrollbar relative">
            {/* Category Filters (SaaS Style) */}
            <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-8 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveFilter("All")}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${activeFilter === "All"
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "text-gray-500 border-white/5 hover:border-white/20 hover:text-gray-300"
                  }`}
              >
                All Milestones
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${activeFilter === cat
                      ? "bg-brand-primary text-white border-brand-primary shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      : "text-gray-500 border-white/5 hover:border-white/20 hover:text-gray-300"
                    }`}
                >
                  {cat === "Skill Development" ? "Learning" : cat}
                </button>
              ))}
            </div>

            {/* Decorative Tech Nodes */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-sm" />
              <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-sm" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/40 rounded-sm" />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/40 rounded-sm" />
            </div>

            <div className="min-w-[1000px] relative" ref={timelineRef}>

              {/* Timeline Header (Years) */}
              <div className="flex mb-16 border-b border-white/10 pb-8 ml-[180px] relative">
                {["2023", "2024", "2025", "2026", "Future"].map((label) => (
                  <div key={label} className="flex-1 text-center relative">
                    {/* Tick Mark */}
                    <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-[2px] h-[8px] bg-white/20" />

                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${label === "2026" ? "text-brand-primary" : "text-gray-600"}`}>
                      {label}
                    </span>
                    {label === "2026" && (
                      <div className="absolute top-12 left-[25%] -translate-x-1/2 w-px h-[650px] bg-gradient-to-b from-brand-primary/60 via-brand-primary/20 to-transparent z-10">
                        <div className="w-3 h-3 bg-brand-primary rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping opacity-50" />
                        <div className="w-1.5 h-1.5 bg-brand-primary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#A855F7]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tracks */}
              <div className="space-y-6">
                {categories
                  .filter(cat => activeFilter === "All" || activeFilter === cat)
                  .map((cat) => (
                    <div key={cat} className="flex items-center min-h-[80px] group/row">
                      {/* Category Label */}
                      <div className="w-[180px] pr-10 shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/row:bg-brand-primary transition-colors" />
                          <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 group-hover/row:text-white transition-all duration-500 whitespace-nowrap">
                            {cat}
                          </h4>
                        </div>
                      </div>

                      {/* Track Rail */}
                      <div className="flex-1 relative h-20 bg-white/[0.01] rounded-2xl border border-white/[0.03] shadow-inner group-hover/row:bg-white/[0.02] transition-colors">
                        {/* Grid Decors per row */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02]" />
                          <div className="absolute top-0 left-2/4 w-px h-full bg-white/[0.02]" />
                          <div className="absolute top-0 left-3/4 w-px h-full bg-white/[0.02]" />
                        </div>

                        {journeyData
                          .filter(m => m.category === cat)
                          .map(m => (
                            <motion.div
                              key={m.id}
                              onMouseEnter={() => setHoveredId(m.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              className="timeline-card absolute top-3 bottom-3 rounded-xl cursor-pointer transition-all duration-500 group/item flex items-center px-4 overflow-hidden border backdrop-blur-sm"
                              style={{
                                left: `${m.startOffset}%`,
                                width: `${m.duration}%`,
                                backgroundColor: `${categoryConfig[m.category].color}08`,
                                borderColor: hoveredId === m.id ? categoryConfig[m.category].color : `${categoryConfig[m.category].color}33`,
                                boxShadow: hoveredId === m.id ? `0 10px 30px ${categoryConfig[m.category].color}15` : 'none'
                              }}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/5 bg-[#0a0a0a]"
                                  style={{ color: categoryConfig[m.category].color }}
                                >
                                  {m.icon}
                                </div>
                                <div className="truncate pr-4">
                                  <p className="text-[11px] font-bold text-white truncate tracking-wide">{m.title}</p>
                                  <p className="text-[9px] text-gray-500 truncate mt-0.5">{m.subtitle}</p>
                                </div>
                              </div>

                              {/* Card Tech Detail */}
                              <div className="absolute top-1 right-1 opacity-20 group-hover/item:opacity-40 transition-opacity">
                                <div className="w-1 h-1 bg-white rounded-full" />
                              </div>

                              {/* Accent Line */}
                              <div
                                className="absolute inset-y-0 left-0 w-[3px]"
                                style={{ backgroundColor: categoryConfig[m.category].color }}
                              />
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
