import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const technologies = [
  "Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", 
  "NumPy", "SQL", "React", "TypeScript", "Three.js", "GSAP",
  "TailwindCSS", "Node.js", "MongoDB", "Docker", "Git", "AWS"
];

const TechMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // Animate the marquee banner to scroll infinitely
    const tl = gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
    
    return () => {
      tl.kill();
    };
  }, []);

  // Double the array to create a seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className="w-full bg-dark-SURFACE border-y border-white/5 py-8 overflow-hidden relative flex">
      {/* Left/Right fading gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-SURFACE to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-SURFACE to-transparent z-10 pointer-events-none"></div>
      
      <div ref={marqueeRef} className="flex space-x-12 whitespace-nowrap min-w-max px-6">
        {duplicatedTech.map((tech, i) => (
          <div 
            key={i} 
            className="flex items-center space-x-3 group cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary/50 group-hover:bg-brand-primary transition-colors group-hover:shadow-[0_0_10px_#A855F7]"></span>
            <span className="text-xl md:text-2xl font-display font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
