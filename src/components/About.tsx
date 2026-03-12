import React, { useEffect, useRef } from 'react';
import { Code, Coffee, Lightbulb, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following architecture patterns.'
    },
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      description: 'Approaching AI challenges with innovative algorithms and creative solutions.'
    },
    {
      icon: Users,
      title: 'Team Player',
      description: 'Collaborating effectively to deliver high-impact digital experiences.'
    },
    {
      icon: Coffee,
      title: 'Growth Mindset',
      description: 'Always exploring the bleeding edge of AI and modern web technologies.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title appearance
      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      // Left content slide
      gsap.fromTo(leftContentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: 'top 80%',
          }
        }
      );

      // Right cards stagger
      gsap.fromTo(rightContentRef.current?.children || [],
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: rightContentRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-32 bg-dark-BASE relative overflow-hidden" ref={sectionRef}>
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-24">
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tighter">
            Elevating <span className="text-brand-primary">Intelligence</span> Through Design
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full shadow-[0_0_15px_#A855F7]"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div ref={leftContentRef} className="space-y-8">
            <h3 className="text-3xl lg:text-4xl font-display font-bold text-white leading-tight">
              Bridging the gap between <br /> Data Science & Web Reality
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              As an aspiring <span className="text-white font-medium">Machine Learning Analyst</span> and Full-Stack Developer, I build digital systems that don't just look pretty—they think. My approach combines rigorous data analysis with stunning interactive frontend experiences.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              I specialize in Python ecosystem (Scikit-learn, Keras) while mastering modern web stacks like React and Node.js. My goal is to create AI-driven applications that are accessible, high-performing, and beautiful.
            </p>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-6">
              {[
                { label: 'Major Projects', value: '4+', color: 'text-brand-primary' },
                { label: 'Modern Techs', value: '10+', color: 'text-brand-secondary' },
                { label: 'Success Rate', value: '92.89%', color: 'text-brand-accent' }
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <div className={`text-4xl font-display font-extrabold ${stat.color} mb-1 group-hover:scale-110 transition-transform`}>{stat.value}</div>
                  <div className="text-gray-500 text-sm font-medium tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Grid */}
          <div ref={rightContentRef} className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-dark-SURFACE border border-white/5 shadow-2xl group hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 transition-colors">
                  <item.icon className="w-7 h-7 text-brand-primary group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-xl font-display font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
