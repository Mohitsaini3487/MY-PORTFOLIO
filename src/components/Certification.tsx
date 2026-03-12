import React, { useEffect, useRef } from "react";
import certificate1 from '../components/certificate1.jpg';
import certificate2 from '../components/certificate2.jpg';
import certificate3 from '../components/certificate3.jpg';
import { Award, ExternalLink } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const certificates = [
    {
      title: "Software Engineering Job Simulation",
      issuer: "JPMORGAN CHASE & CO",
      image: certificate1,
    },
    {
      title: "OCI 2025 Certified Generative AI Professional",
      issuer: "Oracle Certification Professional",
      image: certificate2,
    },
    {
      title: "Privacy and Security in Online Social Media",
      issuer: "Nptel Online Certification",
      image: certificate3,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(gridRef.current?.children || [], { y: 60, opacity: 0 });

      gsap.to(gridRef.current?.children || [], { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" className="py-32 bg-dark-BASE relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Award size={14} />
            <span>Honors</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
            Certifications & <span className="text-gray-500">Recognition</span>
          </h2>
          <div className="max-w-2xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group relative bg-dark-SURFACE rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-brand-primary/30 hover:-translate-y-3"
            >
              <div className="aspect-[4/3] relative overflow-hidden p-8">
                <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-brand-primary transition-colors cursor-pointer">
                    <ExternalLink size={18} />
                  </div>
                </div>
              </div>

              <div className="p-10 pt-0 text-center">
                <div className="mb-4 flex flex-col items-center">
                  <h3 className="text-xl font-display font-bold text-white mb-2 leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium tracking-wide uppercase italic">
                    {cert.issuer}
                  </p>
                </div>
                
                <div className="w-full h-[1px] bg-white/5 mb-6"></div>
                
                <div className="inline-flex items-center gap-2 text-brand-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center justify-center w-full">
                  <span>View Credentials</span>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-brand-primary rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
