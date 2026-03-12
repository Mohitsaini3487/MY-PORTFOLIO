import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Zap, Activity, BrainCircuit, Network, LayoutGrid, Github, MessageSquare, History, Trophy, Loader2, Gauge as GaugeIcon, Flame, CalendarRange } from 'lucide-react';
import codolloProfile from './codollo_profile.jpg';

gsap.registerPlugin(ScrollTrigger);

interface GitHubCommit {
  repo: string;
  message: string;
  time: string;
}

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

const CodingStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [syncTime, setSyncTime] = useState("00:00:00");
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [lcStats, setLcStats] = useState<LeetCodeStats | null>(null);
  const [isSyncing, setIsSyncing] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  // Simulated heatmap data (approx 12 weeks for a compact view)
  const heatmapWeeks = 16;
  const heatmapDays = Array.from({ length: 7 * heatmapWeeks }, () => Math.floor(Math.random() * 5));

  useEffect(() => {
    const syncInterval = setInterval(() => {
      setSyncTime(new Date().toLocaleTimeString());
    }, 1000);

    const fetchData = async () => {
      setIsSyncing(true);
      try {
        const lcRes = await fetch("https://leetcode-api-faisalshohag.vercel.app/MohitSaini__3487");
        const lcData = await lcRes.json();
        if (lcData && !lcData.errors) {
            setLcStats({
                totalSolved: lcData.totalSolved || 215,
                totalQuestions: lcData.totalQuestions || 2400,
                easySolved: lcData.easySolved || 58,
                totalEasy: lcData.totalEasy || 600,
                mediumSolved: lcData.mediumSolved || 100,
                totalMedium: lcData.totalMedium || 1300,
                hardSolved: lcData.hardSolved || 25,
                totalHard: lcData.totalHard || 500,
                ranking: lcData.ranking || 124500,
                contributionPoints: lcData.contributionPoints || 450,
                reputation: lcData.reputation || 12
            });
        }

        const ghRes = await fetch(
          "https://api.github.com/users/Mohitsaini3487/events/public",
          { headers: { Accept: "application/vnd.github+json" } }
        );
        const ghData = await ghRes.json();
        if (Array.isArray(ghData)) {
          const pushEvents = ghData
            .filter((e: any) => e.type === "PushEvent" && e.payload?.commits)
            .slice(0, 5)
            .map((e: any) => ({
              repo: e.repo.name.split('/')[1],
              message: e.payload.commits[0]?.message || "No message",
              time: new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }));
          setCommits(pushEvents);
        }
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setTimeout(() => {
            setIsSyncing(false);
            setInitialLoading(false);
        }, 1500);
      }
    };

    fetchData();
    const dataInterval = setInterval(fetchData, 60000);

    const ctx = gsap.context(() => {
      gsap.from(".vibrant-unit", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      clearInterval(syncInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const ContributionHeatmap = () => (
    <div className="vibrant-unit p-8 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl flex flex-col gap-6 flex-1 min-w-[320px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CalendarRange className="text-emerald-500" size={18} />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Activity Heatmap</span>
        </div>
        <div className="flex items-baseline gap-2">
           <span className="text-2xl font-display font-bold text-white">34</span>
           <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Days</span>
        </div>
      </div>
      
      <div className="flex gap-1 overflow-x-hidden pt-2">
        {Array.from({ length: heatmapWeeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1 shrink-0">
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const intensity = heatmapDays[weekIndex * 7 + dayIndex];
              const colors = ['bg-white/5', 'bg-emerald-900/40', 'bg-emerald-700/60', 'bg-emerald-500', 'bg-emerald-400'];
              return (
                <div 
                  key={dayIndex} 
                  className={`w-3 h-3 rounded-[2px] ${colors[intensity]} transition-all duration-500 hover:scale-125 cursor-help`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[8px] font-bold text-gray-600 uppercase tracking-widest pt-2">
         <span>Mar</span>
         <span>May</span>
         <span>Jul</span>
         <span>Sep</span>
         <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
               {[1, 2, 3, 4].map(i => <div key={i} className={`w-2 h-2 rounded-[1px] bg-emerald-500 opacity-${i*2}0`} />)}
            </div>
            <span>More</span>
         </div>
      </div>
    </div>
  );

  const MasterChart = ({ solved, total, label, color, type }: { solved: number, total: number, label: string, color: string, type: 'radial' | 'power' | 'diamond' }) => {
    const percentage = Math.min((solved / total) * 100, 100);
    const radius = 32;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (percentage / 100) * circ;

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {type === 'radial' && (
            <svg className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r={radius} className="fill-none stroke-white/5 stroke-[8] rounded-full" />
              <motion.circle
                cx="48" cy="48" r={radius}
                className="fill-none stroke-[8]"
                stroke={color}
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 2, ease: "circOut" }}
                strokeLinecap="round"
              />
              <defs>
                 <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                 </filter>
              </defs>
            </svg>
          )}

          {type === 'power' && (
            <div className="flex items-end gap-1.5 h-16 pt-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: i < (percentage / 12.5) ? '100%' : '20%', opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className={`w-2 rounded-t-full ${i < (percentage / 12.5) ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b44]' : 'bg-white/10 dark'}`}
                />
              ))}
            </div>
          )}

          {type === 'diamond' && (
            <div className="relative w-16 h-16 rotate-45 border-4 border-white/5 flex items-center justify-center">
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: percentage / 100 }}
                 className="absolute inset-0 bg-red-500/80 shadow-[0_0_20px_#ef4444]"
               />
               <span className="relative -rotate-45 text-white font-bold text-lg">{solved}</span>
            </div>
          )}

          {type !== 'diamond' && (
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-sm font-display font-bold text-white">{solved}</span>
            </div>
          )}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</span>
      </div>
    );
  };

  if (initialLoading) {
    return (
      <section id="stats" className="py-48 bg-dark-BASE flex flex-col items-center justify-center gap-8">
          <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-brand-primary/20 rounded-full" />
              <div className="absolute inset-0 border-t-4 border-brand-primary rounded-full animate-spin" />
              <Activity className="absolute inset-0 m-auto text-brand-primary animate-pulse" size={32} />
          </div>
          <div className="text-center">
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-2 block">Signal Found</span>
              <h3 className="text-white text-2xl font-display font-bold tracking-tight">Decrypting Infrastructure...</h3>
          </div>
      </section>
    );
  }

  return (
    <section id="stats" className="py-32 bg-dark-BASE relative overflow-hidden" ref={sectionRef}>
      {/* Dynamic Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header HUD */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <Flame size={14} className="animate-bounce" />
              Mastery Feed Integrated
            </div>
            <h2 className="text-5xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-none">
              Coding <span className="bg-gradient-to-r from-gray-500 via-gray-300 to-white bg-clip-text text-transparent">Nexus</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-end">
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Global Signal Status</span>
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shadow-[0_0_10px_#10b981]" />
                  <span className="text-2xl font-mono font-bold text-white tracking-tighter">{syncTime}</span>
               </div>
            </div>
          </div>
        </div>

        {/* The Linear HUB Overhaul */}
        <div className="flex flex-col gap-10">
          
          {/* Top Row: Hero Stats & Profile */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Identity Card */}
            <div className="vibrant-unit flex-[1] relative group rounded-[4rem] bg-dark-SURFACE border border-white/5 overflow-hidden transition-all duration-700 hover:border-brand-primary/40 shadow-2xl min-h-[460px]">
              {/* Colorful Aura */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <img 
                src={codolloProfile} 
                alt="Mohit Saini" 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

              <div className="absolute bottom-12 left-10 right-10 z-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-brand-primary/20 backdrop-blur-xl flex items-center justify-center border border-brand-primary/30">
                     <LayoutGrid className="text-brand-primary" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">System Identity</span>
                    <span className="text-sm font-display font-bold text-brand-primary">MohitSaini__3487</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">LeetCode Pro</span>
                  <span className="px-4 py-1.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-bold text-brand-primary">Verified Hub</span>
                </div>
              </div>
            </div>

            {/* Global Rank Hero Card */}
            <div className="vibrant-unit flex-[1.5] relative rounded-[4rem] bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-white/10 backdrop-blur-3xl p-12 flex flex-col justify-center items-center overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                  <Trophy size={200} className="text-brand-primary" />
               </div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-brand-primary flex items-center justify-center mb-8 shadow-[0_0_30px_#A855F7]">
                     <Trophy className="text-white" size={40} />
                  </div>
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-[0.5em] mb-4">Global Network Ranking</span>
                  <h4 className="text-7xl lg:text-9xl font-display font-bold text-white tracking-tighter mb-6 relative">
                     <span className="absolute -top-10 -left-6 text-brand-primary text-4xl">#</span>
                     {lcStats?.ranking.toLocaleString() || "124,500"}
                  </h4>
                  <div className="flex items-center gap-10">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Reputation</span>
                       <span className="text-2xl font-display font-bold text-brand-secondary">+{lcStats?.contributionPoints || 450}</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10" />
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Impact Tier</span>
                       <span className="text-2xl font-display font-bold text-brand-primary">Alpha</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Row: Analytics & Activity */}
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Mystery Mastery Section */}
            <div className="vibrant-unit flex-[1.8] p-10 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col justify-between overflow-hidden relative">
               <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                     <GaugeIcon className="text-brand-primary" size={24} />
                     <h4 className="text-xl font-display font-bold text-white">Logic Intensities</h4>
                  </div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-4xl font-display font-bold text-white tracking-tighter">{lcStats?.totalSolved || 215}</span>
                     <span className="text-xs font-bold text-gray-500 uppercase">Solves</span>
                  </div>
               </div>

               <div className="flex justify-between items-center px-6">
                  <MasterChart solved={lcStats?.easySolved || 58} total={lcStats?.totalEasy || 600} label="Easy" color="#10B981" type="radial" />
                  <MasterChart solved={lcStats?.mediumSolved || 100} total={lcStats?.totalMedium || 1300} label="Medium" color="#F59E0B" type="power" />
                  <MasterChart solved={lcStats?.hardSolved || 25} total={lcStats?.totalHard || 500} label="Hard" color="#EF4444" type="diamond" />
               </div>

               <div className="mt-12 pt-10 border-t border-white/5 grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                     <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">DSA Topic Coverage</span>
                     <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div animate={{ width: '85%' }} className="h-full bg-brand-primary shadow-[0_0_10px_#A855F7]" />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                     <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Problem Stream Accuracy</span>
                     <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div animate={{ width: '92%' }} className="h-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Contribution & Feed Combined Column */}
            <div className="flex-[1.2] flex flex-col gap-8">
               <ContributionHeatmap />

               {/* Streamlined GitHub Feed */}
               <div className="vibrant-unit p-8 rounded-[3rem] bg-dark-SURFACE border border-white/10 relative overflow-hidden flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <History className="text-brand-primary" size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Commit Stream</span>
                    </div>
                    <div className="flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                       <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest">Live</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {commits.slice(0, 3).map((c, i) => (
                      <div key={i} className="flex flex-col gap-1 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-primary/20 transition-all cursor-default group/item">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-bold text-brand-primary uppercase truncate">{c.repo}</span>
                            <span className="text-[8px] font-mono text-gray-600">{c.time}</span>
                         </div>
                         <p className="text-[10px] text-gray-400 group-hover/item:text-white transition-colors truncate">{c.message}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default CodingStats;
