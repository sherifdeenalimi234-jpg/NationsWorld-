import React, { useState, useEffect } from 'react';
import type { ProjectSlot } from '../../data/projectsData';
import { CheckCircle, Clock, Sparkles, Award, FileText, ArrowRight } from 'lucide-react';

interface AssignmentRevealProps {
  project: ProjectSlot;
  onOpenBrief: () => void;
}

export const AssignmentReveal: React.FC<AssignmentRevealProps> = ({
  project,
  onOpenBrief,
}) => {
  const [phase, setPhase] = useState<'SELECTED' | 'ASSIGNING' | 'REVEALED'>('SELECTED');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('ASSIGNING');
    }, 600);

    const timer2 = setTimeout(() => {
      setPhase('REVEALED');
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const formattedNum = project.number < 10 ? `0${project.number}` : `${project.number}`;

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-6 sm:p-10 bg-obsidian/90 border border-gold/40 rounded-3xl shadow-2xl relative overflow-hidden text-center animate-fadeIn font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald/15 rounded-full blur-3xl pointer-events-none" />

      {phase !== 'REVEALED' ? (
        <div className="py-12 space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-deep-emerald border border-gold/40 flex items-center justify-center text-gold shadow-lg animate-pulse">
            <Sparkles className="w-8 h-8 text-gold animate-spin" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold">
              {phase === 'SELECTED' ? 'PROJECT SELECTED' : 'ALLOCATING PROJECT RESOURCES...'}
            </span>
            <h3 className="text-2xl font-extrabold text-ivory">
              Claiming Project {formattedNum}
            </h3>
            <p className="text-xs text-sage">
              Verifying cycle availability and binding project parameters...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Assigned Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald/30 border border-emerald/50 text-mint text-xs font-mono font-bold tracking-widest uppercase">
            <CheckCircle className="w-4 h-4 text-mint shrink-0" />
            <span>PROJECT ASSIGNED</span>
          </div>

          {/* Number & Title */}
          <div className="space-y-2">
            <span className="text-sm font-mono font-extrabold text-gold tracking-widest block">
              PROJECT {formattedNum}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-ivory leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-left border-y border-gold/20">
            <div className="bg-deep-emerald/30 p-3 rounded-xl border border-gold/15">
              <span className="text-[10px] text-sage font-mono block">CATEGORY</span>
              <span className="text-xs font-bold text-ivory mt-0.5 block truncate">
                {project.category}
              </span>
            </div>

            <div className="bg-deep-emerald/30 p-3 rounded-xl border border-gold/15">
              <span className="text-[10px] text-sage font-mono block">TYPE</span>
              <span className="text-xs font-bold text-ivory mt-0.5 block truncate">
                {project.type}
              </span>
            </div>

            <div className="bg-deep-emerald/30 p-3 rounded-xl border border-gold/15">
              <span className="text-[10px] text-sage font-mono block">DIFFICULTY</span>
              <span className="text-xs font-bold text-gold mt-0.5 block flex items-center gap-1">
                <Award className="w-3 h-3 text-gold" />
                {project.difficulty}
              </span>
            </div>

            <div className="bg-deep-emerald/30 p-3 rounded-xl border border-gold/15">
              <span className="text-[10px] text-sage font-mono block">DURATION</span>
              <span className="text-xs font-bold text-mint mt-0.5 block flex items-center gap-1">
                <Clock className="w-3 h-3 text-mint" />
                {project.duration}
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-sage leading-relaxed text-left bg-black/20 p-4 rounded-2xl border border-white/5">
            {project.description}
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenBrief}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald via-emerald-600 to-deep-emerald hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/40 shadow-xl transition inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-gold" />
              <span>Open Full Project Brief</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
