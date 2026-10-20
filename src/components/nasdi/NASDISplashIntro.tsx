import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface NASDISplashIntroProps {
  onComplete: () => void;
}

const LEADERSHIP_HIGHLIGHTS = [
  { name: 'Sherifdeen Titilope Alimi', office: 'Team Lead' },
  { name: 'Bello Hajara', office: 'Deputy Team Lead' },
  { name: 'Samuel Adebisi', office: 'Second Deputy Team Lead' },
  { name: 'ONIYE MARY', office: 'Chief of Staff & Female SDG 4 Spokesperson' },
  { name: 'Afolashade Islamia', office: 'Secretary' },
  { name: 'Tijani Eniola', office: 'Financial Secretary' },
  { name: 'Grace', office: 'Assistant Team Lead (Press Release)' },
  { name: 'KENNY OSEWA', office: 'Male SDG 4 Spokesperson' },
];

export const NASDISplashIntro: React.FC<NASDISplashIntroProps> = ({ onComplete }) => {
  const [currentMemberIdx, setCurrentMemberIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle leadership highlights
    const cycleInterval = setInterval(() => {
      setCurrentMemberIdx((prev) => (prev + 1) % LEADERSHIP_HIGHLIGHTS.length);
    }, 1800);

    // Progress bar towards auto-enter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(cycleInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(cycleInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const activeLeader = LEADERSHIP_HIGHLIGHTS[currentMemberIdx];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden selection:bg-purple-500/30 selection:text-amber-300">
      {/* Background Radial Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Identity */}
      <div className="relative z-10 text-center space-y-2 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono tracking-widest shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>UNITED NATIONS SDG 4: QUALITY EDUCATION</span>
        </div>

        <p className="text-[11px] text-purple-300/80 tracking-widest uppercase font-mono mt-1">
          NationsWorld of Visionary Advancement
        </p>
      </div>

      {/* Centerpiece Full Screen Institute Presentation & Animated Name Design */}
      <div className="relative z-10 max-w-4xl text-center space-y-8 my-auto">
        {/* Animated Emblem */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-900 border-2 border-amber-400/60 shadow-2xl flex items-center justify-center text-amber-300 animate-bounce">
          <BookOpen className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Full Official Title */}
        <div className="space-y-3">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-amber-200 leading-tight">
            NATIONS WORLD AFFAIRS OF SUSTAINABLE DEVELOPMENT INSTITUTE
          </h1>
          <span className="inline-block text-sm sm:text-base font-extrabold text-amber-400 tracking-[0.3em] font-mono uppercase bg-purple-950/60 px-4 py-1 rounded-xl border border-amber-400/30">
            (NASDI)
          </span>
        </div>

        {/* Animated Leadership Name Presentation */}
        <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 backdrop-blur-xl shadow-2xl max-w-lg mx-auto transform transition-all duration-500 hover:scale-105">
          <span className="block text-[10px] font-extrabold text-amber-300 tracking-[0.2em] uppercase font-mono mb-2 flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            NASDI LEADERSHIP STRUCTURE
          </span>

          <div key={activeLeader.name} className="animate-fadeIn space-y-1">
            <h2 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
              {activeLeader.name}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-purple-200/90 font-mono">
              {activeLeader.office}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Controls & Auto-Enter Progress Bar */}
      <div className="relative z-10 w-full max-w-md space-y-4 text-center">
        <div className="w-full h-1.5 rounded-full bg-purple-950 border border-purple-500/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-amber-400 to-yellow-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-2 transition hover:scale-[1.02]"
        >
          <ShieldCheck className="w-4 h-4 text-slate-950" />
          <span>ENTER ASSESSMENT PORTAL NOW</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>

        <p className="text-[10px] text-purple-300/60 font-mono">
          Human Capital Development and Assessment Programme
        </p>
      </div>
    </div>
  );
};
