import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { gsap } from 'gsap';
import resumeFile from '../components/Resume.pdf';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(titleRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, delay: 0.2 }
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(buttonsRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
        "-=0.4"
      )
      .fromTo(socialRef.current?.children || [],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.2"
      )
      .fromTo(imageRef.current,
        { scale: 0.8, opacity: 0, rotationY: -15 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "slow(0.7, 0.7, false)" },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-BASE text-white" ref={containerRef}>
      {/* Mesh Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      
      {/* Animated Glow Orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-brand-secondary/10 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      {/* Premium Glass Overlay gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-dark-BASE/60 via-transparent to-dark-BASE/80 z-[1]"></div>
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-1/3 h-[50vh] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none z-[1]"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-[60vh] bg-brand-secondary/5 rounded-full blur-[150px] pointer-events-none z-[1]"></div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Content (Left) */}
          <div className="flex-1 text-center lg:text-left z-20">
            <div className="mb-8">
              <h1 ref={titleRef} className="text-5xl lg:text-7xl font-display font-bold mb-4 tracking-tight leading-[1.1]">
                <span className="block text-gray-400 text-3xl lg:text-4xl mb-2 font-medium tracking-normal">Hello, I'm</span>
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-sm">
                  Mohit Saini
                </span>
              </h1>
              <p ref={subtitleRef} className="text-2xl lg:text-3xl text-brand-primary font-medium tracking-wide mb-6 opacity-90">
                Machine Learning Analyst
              </p>
              <p ref={descRef} className="text-gray-400 text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Passionate about Machine Learning, AI, and Data Science. I craft innovative solutions using advanced algorithms and build modern, interactive web experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-10">
              <button onClick={scrollToAbout} className="relative group overflow-hidden bg-brand-primary text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>
              
              <a 
                href={resumeFile} 
                download="Mohit_Saini_Resume.pdf"
                className="relative group flex items-center justify-center gap-2 border-[1px] border-gray-600 bg-white/5 backdrop-blur-md text-gray-200 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:border-brand-primary hover:bg-brand-primary/10"
              >
                <FileDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex justify-center lg:justify-start space-x-5">
              {[
                { icon: Github, href: "https://github.com/Mohitsaini3487", color: "hover:text-white" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/mohit-saini-n0/", color: "hover:text-[#0A66C2]" },
                { icon: Mail, href: "mailto:mohitdsaini.2005@gmail.com", color: "hover:text-brand-accent" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-lg transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:-translate-y-1 ${social.color} text-gray-400`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Photo (Right) */}
          <div ref={imageRef} className="flex-1 flex justify-center lg:justify-end z-10 hidden lg:flex">
             <div className="relative group">
                {/* Glow Background */}
                <div className="absolute -inset-4 bg-brand-primary/20 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Image Container */}
                <div className="relative w-[380px] h-[480px] rounded-[2.5rem] border border-white/10 overflow-hidden bg-dark-SURFACE/50 backdrop-blur-sm shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                   <img 
                      src="/image.png" 
                      alt="Mohit Saini" 
                      className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                   />
                </div>

                {/* Decorative accent */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-2 border-b-2 border-brand-primary/30 rounded-bl-3xl"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 border-r-2 border-t-2 border-brand-primary/30 rounded-tr-3xl"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-50 group"
      >
        <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center p-1 group-hover:border-brand-primary/50 transition-colors">
          <div className="w-1.5 h-3 bg-brand-primary rounded-full animate-bounce"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;
