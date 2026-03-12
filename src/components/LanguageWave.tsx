import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const languages = [
  { name: "C++", slug: "cpp" },
  { name: "Python", slug: "python" },
  { name: "Java", slug: "java" },
  { name: "JavaScript", slug: "js" },
  { name: "React", slug: "react" },
  { name: "Tailwind", slug: "tailwind" },
  { name: "Node.js", slug: "nodejs" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "Vite", slug: "vite" },
  { name: "Git", slug: "git" },
  { name: "SQL", slug: "mysql" },
];

const LanguageWave: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const scrollWidth = marquee.scrollWidth;
    
    // GSAP for perfectly seamless horizontal scroll
    const tl = gsap.to(marquee, {
      x: `-=${scrollWidth / 2}`,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Double the items for seamless loop
  const items = [...languages, ...languages];

  return (
    <section className="py-32 bg-dark-BASE overflow-hidden relative" ref={containerRef}>
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-brand-primary font-bold tracking-[0.4em] uppercase text-[11px] mb-4"
        >
          Technical Ecosystem
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-white/40 text-lg font-light max-w-xl mx-auto"
        >
          A wave of technologies I use to build scalable AI & Web solutions.
        </motion.p>
      </div>

      <div className="flex relative items-center h-56">
        {/* Fading Mask */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-dark-BASE via-transparent to-dark-BASE h-full" />

        <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap px-8">
          {items.map((lang, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-6 group"
              animate={{ 
                y: [0, -25, 0, 25, 0],
                rotate: [0, -5, 0, 5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            >
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 p-5 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 group-hover:border-brand-primary/50 transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <img 
                  src={`https://skillicons.dev/icons?i=${lang.slug}`} 
                  alt={lang.name}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 group-hover:text-brand-primary transition-all duration-500">
                {lang.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative background scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
    </section>
  );
};

export default LanguageWave;
