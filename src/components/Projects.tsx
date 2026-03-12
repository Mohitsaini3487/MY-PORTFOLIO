import React, { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'BhartVest',
      quote: '"Empowering users with real-time financial insights and seamless investment management."',
      technologies: ['React', 'Vite', 'Tailwind CSS'],
      github: 'https://github.com/Mohitsaini3487/BhartVest',
      live: 'https://bhart-vest.vercel.app',
      color: 'text-blue-400'
    },
    {
      title: 'SatyaSh App',
      quote: '"A high-performance, responsive application designed for modern digital engagement."',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/Mohitsaini3487/SatyaSh-App',
      live: 'https://satya-sh-app.vercel.app',
      color: 'text-purple-400'
    },
    {
      title: 'Carewise Australia',
      quote: '"Advanced healthcare solutions leveraging AI to provide accessible care for the community."',
      technologies: ['React', 'AI', 'Tailwind CSS'],
      github: 'https://github.com/carewiseaustralia-ai/carewiseproject',
      live: 'https://www.carewiseaustralia.com.au/',
      color: 'text-emerald-400'
    },
    {
      title: 'Medical & Finance AI',
      quote: '"Dual-model system featuring ResNet50 for tumor detection and LSTM for price prediction."',
      technologies: ['Machine Learning', 'Flask', 'React'],
      github: 'https://github.com/Mohitsaini3487/brain-tumor-',
      live: 'https://github.com/Mohitsaini3487/brain-tumor-',
      color: 'text-orange-400'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(".project-quote-card", { y: 60, opacity: 0, scale: 0.98 });

      gsap.to(".project-quote-card", {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-24 bg-dark-BASE relative overflow-hidden" ref={sectionRef}>
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-primary text-[9px] font-bold uppercase tracking-[0.4em] mb-4">
            Spotlight
          </div>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4 italic tracking-tighter">
            Showcase <span className="text-gray-500 text-2xl lg:text-4xl">Projects</span>
          </h2>
        </div>

        <div ref={containerRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch justify-center">
          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <div className="project-quote-card group p-6 lg:p-8 relative bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col hover:bg-white/[0.04] transition-colors duration-500">
                <div className="relative h-full flex flex-col">
                  {/* Decorative Quote Mark */}
                  <div className="absolute -top-4 -left-2 text-white/5 text-[6rem] font-serif leading-none pointer-events-none group-hover:text-brand-primary/10 transition-colors duration-700">
                    “
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className={`text-lg lg:text-xl font-display font-bold ${project.color} leading-snug mb-6 flex-grow group-hover:translate-x-1 transition-transform duration-700`}>
                      {project.quote}
                    </h3>
                    
                    <div className="pt-6 border-t border-white/5 mt-auto">
                      <div className="flex flex-col mb-6">
                        <span className="text-gray-700 text-[9px] font-bold uppercase tracking-widest mb-1">Project_{index + 1}</span>
                        <span className="text-white text-lg font-display font-bold truncate">{project.title}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <a 
                          href={project.github} 
                          target="_blank" rel="noreferrer"
                          className="flex items-center gap-2 text-white/30 hover:text-white transition-all bg-white/5 px-3 py-2 rounded-xl border border-white/5 hover:border-white/10"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Code</span>
                        </a>
                        
                        <a 
                          href={project.live} 
                          target="_blank" rel="noreferrer"
                          className="flex items-center gap-2 text-brand-primary hover:bg-brand-primary hover:text-white transition-all bg-brand-primary/10 px-3 py-2 rounded-xl border border-brand-primary/20"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Live</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sparkVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}} />
    </section>
  );
};

export default Projects;
