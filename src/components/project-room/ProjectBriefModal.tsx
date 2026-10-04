import React from 'react';
import type { ProjectSlot } from '../../data/projectsData';
import { X, FileText, CheckSquare, Target, HelpCircle, Sparkles, Clock, Award } from 'lucide-react';

interface ProjectBriefModalProps {
  project: ProjectSlot;
  onClose: () => void;
}

export const ProjectBriefModal: React.FC<ProjectBriefModalProps> = ({
  project,
  onClose,
}) => {
  const formattedNum = project.number < 10 ? `0${project.number}` : `${project.number}`;

  return (
    <div className="fixed inset-0 z-[110] bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-sans">
      <div className="w-full max-w-3xl bg-obsidian border border-gold/40 rounded-3xl my-8 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-deep-emerald via-obsidian to-deep-emerald border-b border-gold/25 flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-gold/20 text-gold border border-gold/40 px-2.5 py-0.5 rounded font-mono font-bold uppercase">
                PROJECT {formattedNum} BRIEF
              </span>
              <span className="text-[10px] bg-emerald/20 text-mint border border-emerald/40 px-2.5 py-0.5 rounded font-mono font-bold uppercase">
                {project.category}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-ivory tracking-tight leading-snug">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-sage hover:text-ivory transition focus:outline-none shrink-0"
            aria-label="Close brief"
          >
            <X className="w-5 h-5 text-gold" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-ivory/90 leading-relaxed">
          {/* Attributes Summary Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-deep-emerald/30 border border-gold/20 text-center">
            <div>
              <span className="text-[10px] text-sage font-mono uppercase block">PROJECT TYPE</span>
              <span className="font-bold text-ivory text-xs mt-0.5 block">{project.type}</span>
            </div>
            <div>
              <span className="text-[10px] text-sage font-mono uppercase block">DIFFICULTY</span>
              <span className="font-bold text-gold text-xs mt-0.5 block flex items-center justify-center gap-1">
                <Award className="w-3 h-3 text-gold" />
                {project.difficulty}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-sage font-mono uppercase block">ESTIMATED DURATION</span>
              <span className="font-bold text-mint text-xs mt-0.5 block flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-mint" />
                {project.duration}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold" />
              <span>PROJECT OVERVIEW</span>
            </h4>
            <p className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sage text-xs leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Objective */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
              <Target className="w-4 h-4 text-gold" />
              <span>CORE OBJECTIVE</span>
            </h4>
            <p className="p-4 rounded-2xl bg-deep-emerald/20 border border-gold/20 text-ivory text-xs font-medium">
              {project.objective}
            </p>
          </div>

          {/* Research Question */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-gold" />
              <span>CENTRAL RESEARCH QUESTION</span>
            </h4>
            <p className="p-4 rounded-2xl bg-deep-emerald/20 border border-gold/20 text-mint text-xs italic">
              “{project.researchQuestion}”
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-gold" />
              <span>GUIDING DIRECTIVES</span>
            </h4>
            <ul className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-sage">
              {project.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-gold font-mono font-bold">0{idx + 1}.</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>EXPECTED DELIVERABLES</span>
            </h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              {project.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-center gap-2 text-ivory font-semibold text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 3 Notice */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <p>
              <strong className="text-amber-300">Phase 3 Preview:</strong> The writing workspace, citation tools, and Production Hub integration for this project will activate in the next release phase.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gold/20 bg-obsidian text-right shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-deep-emerald hover:bg-emerald text-white border border-gold/30 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
};
