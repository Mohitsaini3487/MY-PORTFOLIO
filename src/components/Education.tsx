import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Award, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  degree: string;
  period: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  badge?: string;
}

const educationData: EducationEntry[] = [
  {
    id: 'edu-1',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    degree: 'Bachelor of Technology — Computer Science & Engineering',
    period: "Aug '23 – Present",
    detail: 'CGPA: 6.14',
    icon: <GraduationCap size={22} />,
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.25)',
    badge: 'Pursuing',
  },
  {
    id: 'edu-2',
    institution: 'Cygnus High World School',
    location: 'Ambala, Haryana',
    degree: 'Intermediate (Class XII) — PCM',
    period: "Mar '21 – May '22",
    detail: 'Percentage: 81%',
    icon: <BookOpen size={22} />,
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.25)',
  },
  {
    id: 'edu-3',
    institution: 'Cygnus High World School',
    location: 'Ambala, Haryana',
    degree: 'Matriculation (Class X)',
    period: "Mar '19 – May '20",
    detail: 'Percentage: 61%',
    icon: <Award size={22} />,
    color: '#10B981',
    glow: 'rgba(16,185,129,0.25)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.18, duration: 0.7, ease: 'easeOut' as const },
  }),
};

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.edu-line',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-32 bg-dark-BASE relative overflow-hidden"
    >
      {/* Background glow blob */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Academic Background
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl lg:text-7xl font-display font-bold text-white mb-6"
          >
            My <span className="text-gray-600">Education</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed"
          >
            A strong academic foundation spanning engineering, science, and technology.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connector line */}
          <div className="edu-line absolute left-[38px] md:left-[50px] top-8 bottom-8 w-px bg-gradient-to-b from-brand-primary/60 via-blue-400/30 to-emerald-400/30 origin-top" />

          <div className="space-y-10">
            {educationData.map((entry, i) => (
              <motion.div
                key={entry.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="flex gap-6 md:gap-10 group"
              >
                {/* Icon Node */}
                <div className="relative flex-shrink-0 z-10">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
                    style={{
                      color: entry.color,
                      borderColor: `${entry.color}33`,
                      backgroundColor: `${entry.color}0d`,
                      boxShadow: `0 0 25px ${entry.glow}`,
                    }}
                  >
                    {entry.icon}
                  </div>
                  {/* Dot on line */}
                  <div
                    className="absolute -left-[19px] md:-left-[27px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-dark-BASE ring-2 transition-all duration-500 group-hover:ring-4"
                    style={{
                      backgroundColor: entry.color,
                      boxShadow: `0 0 12px ${entry.color}`,
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="flex-1 relative p-7 rounded-3xl border backdrop-blur-md transition-all duration-500 group-hover:border-opacity-60 group-hover:-translate-y-1"
                  style={{
                    borderColor: `${entry.color}22`,
                    backgroundColor: `${entry.color}05`,
                  }}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 40px ${entry.color}08, 0 20px 60px ${entry.glow}`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {entry.badge && (
                        <span
                          className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                          style={{
                            color: entry.color,
                            borderColor: `${entry.color}44`,
                            backgroundColor: `${entry.color}11`,
                          }}
                        >
                          {entry.badge}
                        </span>
                      )}
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: entry.color }}
                      >
                        {entry.detail}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-tight mb-2">
                      {entry.institution}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium mb-4">
                      {entry.degree}
                    </p>

                    <div className="flex flex-wrap gap-5 text-gray-500 text-xs font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} style={{ color: entry.color }} />
                        {entry.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} style={{ color: entry.color }} />
                        {entry.period}
                      </span>
                    </div>
                  </div>

                  {/* Accent left bar */}
                  <div
                    className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
