import React from 'react';
import type { ProjectSlot } from '../../data/projectsData';
import { CheckCircle2, Clock, Award, FileText, ArrowUpRight } from 'lucide-react';

interface AssignedProjectCardProps {
  project: ProjectSlot;
  onOpenBrief: () => void;
}

export const AssignedProjectCard: React.FC<AssignedProjectCardProps> = ({
  project,
  onOpenBrief,
}) => {
  const formattedNum = project.number < 10 ? `0${project.number}` : `${project.number}`;

  return (
    <div className="bg-gradient-to-br from-deep-emerald/80 via-obsidian/90 to-deep-emerald/80 border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Number */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald/20 border border-gold/40 flex items-center justify-center text-mint font-mono font-black text-sm">
            {formattedNum}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold block">
              ASSIGNED PROJECT
            </span>
            <span className="text-xs font-bold text-ivory">PROJECT {formattedNum}</span>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-mint bg-emerald/20 border border-emerald/40 px-3 py-1 rounded-full flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-mint" />
          Status: ASSIGNED
        </span>
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-mint bg-emerald/20 px-2.5 py-0.5 rounded border border-emerald/30 inline-block">
          {project.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-ivory tracking-tight group-hover:text-gold transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-sage leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Key Metadata Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-obsidian/60 border border-gold/15">
          <span className="text-[10px] font-mono text-sage block">TYPE</span>
          <span className="text-xs font-bold text-ivory mt-0.5 block truncate">
            {project.type}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/60 border border-gold/15">
          <span className="text-[10px] font-mono text-sage block">DIFFICULTY</span>
          <span className="text-xs font-bold text-gold mt-0.5 block flex items-center gap-1">
            <Award className="w-3 h-3 text-gold" />
            {project.difficulty}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-obsidian/60 border border-gold/15 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-sage block">DURATION</span>
          <span className="text-xs font-bold text-mint mt-0.5 block flex items-center gap-1">
            <Clock className="w-3 h-3 text-mint" />
            {project.duration}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-sage/80">
          Your brief is active for the current <strong className="text-gold">2026-OCTOBER</strong> cycle.
        </p>

        <button
          type="button"
          onClick={onOpenBrief}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald via-emerald-600 to-deep-emerald hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/30 shadow-lg transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <FileText className="w-4 h-4 text-gold" />
          <span>Open Project Brief</span>
          <ArrowUpRight className="w-4 h-4 text-gold" />
        </button>
      </div>
    </div>
  );
};
