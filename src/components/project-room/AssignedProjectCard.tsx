import React from 'react';
import type { ProjectSlot } from '../../data/projectsData';
import { CheckCircle2, Clock, Award, FileText, ArrowUpRight, ShieldAlert, ShieldCheck } from 'lucide-react';

interface AssignedProjectCardProps {
  project: ProjectSlot;
  declarationAccepted?: boolean;
  onOpenBrief: () => void;
  onCompleteDeclaration?: () => void;
}

export const AssignedProjectCard: React.FC<AssignedProjectCardProps> = ({
  project,
  declarationAccepted = false,
  onOpenBrief,
  onCompleteDeclaration,
}) => {
  const formattedNum = project.number < 10 ? `0${project.number}` : `${project.number}`;

  return (
    <div className="bg-gradient-to-br from-[#063b2e]/90 via-[#04271e]/90 to-[#063b2e]/90 border border-[#0b8f6a]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0b8f6a]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Number */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0b8f6a]/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 flex items-center justify-center text-[#d6b45a] font-mono font-bold text-sm">
            {formattedNum}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d6b45a] block">
              ASSIGNED PROJECT
            </span>
            <span className="text-xs font-bold text-[#f7faf8]">PROJECT {formattedNum}</span>
          </div>
        </div>

        {declarationAccepted ? (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0b8f6a] bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0b8f6a]" />
            Status: Ready to Begin
          </span>
        ) : (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d6b45a] bg-[#d6b45a]/20 border border-[#d6b45a]/40 px-3 py-1 rounded-full flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#d6b45a]" />
            Declaration Required
          </span>
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0b8f6a] bg-[#0b8f6a]/20 px-2.5 py-0.5 rounded border border-[#0b8f6a]/30 inline-block">
          {project.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-serif text-[#f7faf8] tracking-tight group-hover:text-[#d6b45a] transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Key Metadata Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-[#021f18]/60 border border-[#0b8f6a]/15">
          <span className="text-[10px] font-mono text-[#64748b] block">TYPE</span>
          <span className="text-xs font-bold text-[#f7faf8] mt-0.5 block truncate">
            {project.type}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#021f18]/60 border border-[#0b8f6a]/15">
          <span className="text-[10px] font-mono text-[#64748b] block">DIFFICULTY</span>
          <span className="text-xs font-bold text-[#d6b45a] mt-0.5 block flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#d6b45a]" />
            {project.difficulty}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#021f18]/60 border border-[#0b8f6a]/15 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-[#64748b] block">DURATION</span>
          <span className="text-xs font-bold text-[#0b8f6a] mt-0.5 block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#0b8f6a]" />
            {project.duration}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-[#0b8f6a]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-[#64748b]">
          {declarationAccepted ? (
            <span>Declaration confirmed. Ready for full research brief.</span>
          ) : (
            <span>Confirm project declaration before accessing brief.</span>
          )}
        </p>

        {declarationAccepted ? (
          <button
            type="button"
            onClick={onOpenBrief}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-medium text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <FileText className="w-4 h-4 text-[#d6b45a]" />
            <span>Open Project Brief</span>
            <ArrowUpRight className="w-4 h-4 text-[#d6b45a]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onCompleteDeclaration || onOpenBrief}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#d6b45a] to-[#b3933b] hover:brightness-110 text-[#021f18] font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-[#021f18]" />
            <span>Complete Declaration</span>
            <ArrowUpRight className="w-4 h-4 text-[#021f18]" />
          </button>
        )}
      </div>
    </div>
  );
};
