import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Calendar, CheckCircle2, ExternalLink, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Training: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const training = {
    company: 'CSE Pathshala',
    type: 'Edtech Company',
    role: 'DSA Training Program',
    duration: "Jun' 25 – Jul' 25",
    skills: ['Python', 'Data Structures', 'Algorithms', 'Problem Solving'],
    highlights: [
      'Gained hands-on experience in Data Structures and Algorithms using Python, covering arrays, strings, stacks, and queues.',
      'Practiced advanced concepts including trees, graphs, recursion, and dynamic programming through intensive problem solving.',
      'Optimized algorithmic solutions to improve coding efficiency, logical thinking, and technical interview readiness.',
    ],
    tags: ['DSA', 'Python', 'Trees', 'Graphs', 'Dynamic Programming', 'Recursion'],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.training-fade', { y: 40, opacity: 0 });
      gsap.to('.training-fade', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="training" className="py-32 bg-dark-BASE relative overflow-hidden" ref={sectionRef}>
      {/* Background ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="training-fade flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen size={14} />
            <span>Practical Training</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Training & <span className="text-gray-500">Internship</span>
          </h2>
          <p className="text-gray-500 max-w-xl text-lg font-light">
            Industry-oriented training programs that shaped my technical foundation and problem-solving mindset.
          </p>
        </div>

        {/* Training Card */}
        <div ref={cardRef} className="max-w-5xl mx-auto">
          <div className="training-fade relative group rounded-[3rem] bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-700 overflow-hidden shadow-2xl p-10 lg:p-16">

            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Corner Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-10 items-start">
              {/* Left: Main Content */}
              <div className="flex flex-col gap-8">
                {/* Company Info */}
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <Layers className="text-emerald-400" size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-2xl lg:text-3xl font-display font-bold text-white tracking-tight">
                        {training.company}
                      </h3>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        {training.type}
                      </span>
                    </div>
                    <p className="text-emerald-400 font-bold text-lg tracking-tight">{training.role}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-4">
                  {training.highlights.map((point, i) => (
                    <div key={i} className="training-fade flex items-start gap-4 group/item">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                      </div>
                      <p className="text-gray-400 text-[15px] leading-relaxed group-hover/item:text-gray-200 transition-colors">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {training.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400 transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Duration & Skills */}
              <div className="flex flex-col gap-6 lg:min-w-[220px]">
                {/* Duration Badge */}
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <Calendar size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-0.5">Duration</p>
                    <p className="text-white font-bold text-sm">{training.duration}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col gap-3">
                  <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Core Skills</p>
                  <div className="flex flex-col gap-2">
                    {training.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-gray-300 text-xs font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Training;
