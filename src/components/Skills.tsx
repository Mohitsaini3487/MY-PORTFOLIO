import React, { useEffect, useRef } from "react";
import { Code, Brain, Database, Cpu, Sparkles } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "Full-Stack Dev",
      icon: Code,
      skills: ["React", "Node.js", "TypeScript", "Next.js", "SQL"],
      description: "Crafting scalable web architectures with modern frameworks.",
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "#3B82F6"
    },
    {
      title: "ML & AI",
      icon: Brain,
      skills: ["Python", "TensorFlow", "Keras", "Scikit-Learn"],
      description: "Building intelligent models and predictive neural networks.",
      color: "from-purple-500/20 to-pink-500/20",
      accent: "#A855F7"
    },
    {
      title: "Data Intelligence",
      icon: Database,
      skills: ["Analysis", "Excel", "Visualization", "Statistics"],
      description: "Extracting actionable insights from complex datasets.",
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "#10B981"
    },
    {
      title: "Tools & DevOps",
      icon: Cpu,
      skills: ["Git", "Docker", "Vite", "Tailwind", "Firebase"],
      description: "Optimizing workflows and deploying cloud-native apps.",
      color: "from-orange-500/20 to-amber-500/20",
      accent: "#F59E0B"
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards appearance
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              x: index < 2 ? -50 : 50, 
              opacity: 0, 
              scale: 0.9 
            },
            { 
              x: 0, 
              opacity: 1, 
              scale: 1, 
              duration: 1, 
              delay: index * 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              }
            }
          );
        }
      });

      // Animate center circle
      if (centerRef.current) {
        gsap.fromTo(centerRef.current,
          { scale: 0, opacity: 0, rotate: -180 },
          { 
            scale: 1, 
            opacity: 1, 
            rotate: 0, 
            duration: 1.5, 
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: centerRef.current,
              start: "top 80%",
            }
          }
        );

        // Continuous pulse/shine animation for all rings
        centerRef.current.querySelectorAll('.shine-ring').forEach((ring, i) => {
          gsap.to(ring, {
            rotate: i % 2 === 0 ? 360 : -360,
            duration: 5 + i * 2,
            repeat: -1,
            ease: "none"
          });
        });
      }

      // Animate SVG paths with a more visible energy pulse
      gsap.fromTo("path.connector-path",
        { strokeDashoffset: 50 },
        { 
          strokeDashoffset: 0, 
          duration: 1.5, 
          repeat: -1,
          ease: "none",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCard = (category: typeof skillCategories[0], index: number) => (
    <div
      key={index}
      ref={(el) => (cardsRef.current[index] = el)}
      className={`group relative p-6 rounded-[2rem] bg-dark-SURFACE border border-white/5 transition-all duration-500 hover:border-white/20 overflow-hidden shadow-2xl`}
    >
      {/* Background Glow */}
      <div className={`absolute -top-24 -right-24 w-40 h-40 bg-gradient-to-br ${category.color} blur-[60px] group-hover:blur-[80px] transition-all duration-500 opacity-50`}></div>
      
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
          <category.icon className="w-6 h-6 text-white" style={{ filter: `drop-shadow(0 0 8px ${category.accent})` }} />
        </div>
        
        <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight">
          {category.title}
        </h3>
        
        <p className="text-gray-400 text-xs mb-6 leading-relaxed">
          {category.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {category.skills.map((skill, si) => (
            <span
              key={si}
              className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 rounded-md hover:bg-white/10 hover:text-white transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
    </div>
  );

  return (
    <section id="skills" className="py-32 bg-dark-BASE relative overflow-hidden" ref={sectionRef}>
      {/* Grid & Grain Background */}
      <div className="absolute inset-0 z-0">
        {/* Pitch Black Base */}
        <div className="absolute inset-0 bg-[#000000]"></div>
        
        {/* Center Glow - Adjusted for white grid */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)] z-0"></div>
        
        {/* Bold White Flat Grid */}
        <div className="absolute inset-0 opacity-[0.25]">
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px] w-full h-full"
          ></div>
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:10px_10px] w-full h-full"
          ></div>
        </div>
        
        {/* Side Glows - Matches Image's subtle depth */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.02),transparent_70%)]"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 h-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.02),transparent_70%)]"></div>

        {/* Grain/Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-2 mb-4 text-brand-primary font-bold tracking-widest uppercase text-sm">
            <Sparkles size={16} />
            <span>Expertise Area</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
            Technical <span className="text-blue-500">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-2xl">
            A specialized ecosystem of technologies driving high-performance solutions and intelligent systems.
          </p>
        </div>

        <div ref={containerRef} className="relative max-w-7xl mx-auto">
          {/* SVG Connectors - Desktop only */}
          <div className="absolute inset-0 hidden lg:block pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Left Top */}
              <path className="connector-path" d="M350 150 C 450 150, 500 300, 600 300" stroke="url(#line-grad)" strokeWidth="2" fill="none" strokeDasharray="10, 40" filter="url(#glow)" />
              {/* Left Bottom */}
              <path className="connector-path" d="M350 450 C 450 450, 500 300, 600 300" stroke="url(#line-grad)" strokeWidth="2" fill="none" strokeDasharray="10, 40" filter="url(#glow)" />
              {/* Right Top */}
              <path className="connector-path" d="M850 150 C 750 150, 700 300, 600 300" stroke="url(#line-grad)" strokeWidth="2" fill="none" strokeDasharray="10, 40" filter="url(#glow)" />
              {/* Right Bottom */}
              <path className="connector-path" d="M850 450 C 750 450, 700 300, 600 300" stroke="url(#line-grad)" strokeWidth="2" fill="none" strokeDasharray="10, 40" filter="url(#glow)" />
            </svg>
          </div>

          <div className="grid lg:grid-cols-3 items-center gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="flex flex-col gap-12 z-10">
              {renderCard(skillCategories[0], 0)}
              {renderCard(skillCategories[2], 2)}
            </div>

            {/* Center Circle */}
            <div className="flex justify-center items-center z-20">
              <div ref={centerRef} className="relative group">
                {/* Mirroring Shining Circle */}
                <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-dark-SURFACE border border-white/10 flex items-center justify-center relative overflow-hidden shadow-[0_0_120px_rgba(59,130,246,0.05)]">
                  {/* Sharper Conic Gradient Shine */}
                  <div className="shine-ring absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.15)_10%,transparent_20%,rgba(255,255,255,0.08)_25%,transparent_30%,rgba(59,130,246,0.15)_45%,transparent_55%,rgba(255,255,255,0.08)_75%,transparent_85%)] opacity-90"></div>
                  <div className="shine-ring absolute inset-0 bg-[conic-gradient(from_120deg,transparent,rgba(59,130,246,0.1)_15%,transparent_35%,rgba(255,255,255,0.05)_50%,transparent_65%,rgba(59,130,246,0.1)_80%,transparent)] opacity-70 scale-105"></div>
                  
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_50%,rgba(255,255,255,0.03)_100%)]"></div>
                  
                  {/* Glassmorph core */}
                  <div className="absolute inset-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-center group-hover:bg-white/10 transition-all duration-700">
                    <div className="relative">
                      {/* Inner Glow */}
                      <div className="absolute inset-0 blur-3xl bg-blue-500/40 scale-[2] rounded-full animate-pulse"></div>
                      <Cpu size={56} className="text-white relative z-10 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                    </div>
                  </div>
                  
                  {/* Dynamic Orbits */}
                  <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_10s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60A5FA]"></div>
                  </div>
                  <div className="absolute inset-12 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                  </div>
                </div>
                
                {/* Outer floating particles - decorative */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-2 h-2 bg-blue-500/40 rounded-full blur-[1px] animate-pulse"
                    style={{
                      top: `${50 + 45 * Math.sin(i * Math.PI / 3)}%`,
                      left: `${50 + 45 * Math.cos(i * Math.PI / 3)}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-12 z-10">
              {renderCard(skillCategories[1], 1)}
              {renderCard(skillCategories[3], 3)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
