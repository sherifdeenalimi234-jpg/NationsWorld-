import React from 'react';
import type { ProjectSlot } from '../../data/projectsData';
import {
  DEFAULT_RECOMMENDED_APPROACH,
  DEFAULT_TIMELINE
} from '../../data/projectsData';
import {
  FileText,
  Target,
  HelpCircle,
  CheckSquare,
  Sparkles,
  Clock,
  Award,
  Layers,
  Calendar,
  ShieldAlert,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

interface ProjectBriefViewProps {
  project: ProjectSlot;
  onBeginProject: () => void;
  onBack?: () => void;
  isModal?: boolean;
}

export const ProjectBriefView: React.FC<ProjectBriefViewProps> = ({
  project,
  onBeginProject,
  onBack,
  isModal = false,
}) => {
  const formattedNum = project.number < 10 ? `0${project.number}` : `${project.number}`;

  const approach = project.recommendedApproach || DEFAULT_RECOMMENDED_APPROACH;
  const timeline = project.timeline || DEFAULT_TIMELINE;

  return (
    <div className={`w-full font-sans text-[#f7faf8] ${isModal ? '' : 'max-w-4xl mx-auto py-8 px-4 sm:px-6'}`}>
      {/* Back navigation button if applicable */}
      {onBack && !isModal && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#64748b] hover:text-[#0b8f6a] transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-[#d6b45a]" />
          <span>Back to Project Room Dashboard</span>
        </button>
      )}

      {/* Main Container */}
      <div className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-8">

        {/* Header Section */}
        <div className="border-b border-[#0b8f6a]/25 pb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-[#d6b45a]/20 text-[#d6b45a] border border-[#d6b45a]/40 px-3 py-1 rounded-md font-mono font-bold tracking-wider uppercase">
              PROJECT {formattedNum}
            </span>
            <span className="text-xs bg-[#0b8f6a]/20 text-[#0b8f6a] border border-[#0b8f6a]/40 px-3 py-1 rounded-md font-mono font-bold uppercase">
              {project.category}
            </span>
            <span className="ml-auto text-xs bg-[#0b8f6a]/30 text-[#0b8f6a] border border-[#0b8f6a]/50 px-3 py-1 rounded-full font-mono font-bold uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0b8f6a] animate-pulse"></span>
              STATUS: ASSIGNED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-[#f7faf8] tracking-tight leading-snug pt-1">
            {project.title}
          </h1>
        </div>

        {/* Attribute Cards Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#04271e]/80 border border-[#0b8f6a]/20 text-center">
          <div className="p-2.5">
            <span className="text-[10px] text-[#64748b] font-mono uppercase block">CATEGORY</span>
            <span className="font-bold text-[#f7faf8] text-xs mt-1 block truncate">
              {project.category}
            </span>
          </div>
          <div className="p-2.5 border-l border-[#0b8f6a]/20">
            <span className="text-[10px] text-[#64748b] font-mono uppercase block">PROJECT TYPE</span>
            <span className="font-bold text-[#f7faf8] text-xs mt-1 block">
              {project.type}
            </span>
          </div>
          <div className="p-2.5 border-t md:border-t-0 md:border-l border-[#0b8f6a]/20">
            <span className="text-[10px] text-[#64748b] font-mono uppercase block">DIFFICULTY</span>
            <span className="font-bold text-[#d6b45a] text-xs mt-1 block flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#d6b45a]" />
              {project.difficulty}
            </span>
          </div>
          <div className="p-2.5 border-t md:border-t-0 border-l border-[#0b8f6a]/20">
            <span className="text-[10px] text-[#64748b] font-mono uppercase block">ESTIMATED DURATION</span>
            <span className="font-bold text-[#0b8f6a] text-xs mt-1 block flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0b8f6a]" />
              {project.duration}
            </span>
          </div>
        </div>

        {/* Project Objective */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#d6b45a] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#d6b45a]" />
            <span>PROJECT OBJECTIVE</span>
          </h3>
          <div className="p-5 rounded-2xl bg-[#084234]/40 border border-[#0b8f6a]/30 text-[#f7faf8] text-sm font-medium leading-relaxed">
            {project.objective}
          </div>
        </div>

        {/* Central Research Question */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#d6b45a] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#d6b45a]" />
            <span>CENTRAL RESEARCH QUESTION</span>
          </h3>
          <div className="p-5 rounded-2xl bg-[#021f18]/90 border border-[#0b8f6a]/40 text-[#0b8f6a] text-base font-serif italic shadow-inner">
            “{project.researchQuestion}”
          </div>
        </div>

        {/* Project Overview */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#d6b45a] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#d6b45a]" />
            <span>PROJECT OVERVIEW</span>
          </h3>
          <p className="p-5 rounded-2xl bg-[#04271e]/60 border border-[#0b8f6a]/20 text-[#64748b] text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Instructions */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#d6b45a] flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#d6b45a]" />
            <span>PROJECT INSTRUCTIONS</span>
          </h3>
          <div className="p-5 rounded-2xl bg-[#04271e]/60 border border-[#0b8f6a]/20">
            <ol className="space-y-3">
              {project.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#f7faf8]">
                  <span className="font-mono text-[#d6b45a] font-bold text-xs pt-0.5">
                    {String(idx + 1).padStart(2, '0')} —
                  </span>
                  <span className="leading-relaxed text-[#e2e8f0]">{inst}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Expected Deliverables */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#d6b45a] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d6b45a]" />
            <span>EXPECTED DELIVERABLES</span>
          </h3>
          <div className="p-5 rounded-2xl bg-[#04271e]/60 border border-[#0b8f6a]/20 space-y-2.5">
            {project.deliverables.map((deliv, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-[#f7faf8]">
                <div className="w-2 h-2 rounded-full bg-[#0b8f6a]" />
                <span className="font-medium text-[#f7faf8]">{deliv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Approach */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#d6b45a] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#d6b45a]" />
            <span>RECOMMENDED APPROACH</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {approach.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#04271e]/80 border border-[#0b8f6a]/20 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#d6b45a] block mb-1">
                    {step.phase}
                  </span>
                  <h4 className="text-xs font-bold font-mono text-[#f7faf8] uppercase tracking-wider mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-[#64748b] leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Timeline */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#d6b45a] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#d6b45a]" />
            <span>PROJECT TIMELINE</span>
          </h3>
          <div className="p-5 rounded-2xl bg-[#04271e]/60 border border-[#0b8f6a]/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-center">
              {timeline.map((phase, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#021f18]/70 border border-[#0b8f6a]/15">
                  <span className="text-[10px] font-mono text-[#0b8f6a] font-bold block uppercase mb-1">
                    {phase.period}
                  </span>
                  <p className="text-xs text-[#f7faf8] font-medium leading-tight">
                    {phase.task}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research & Integrity Notice */}
        <div className="p-5 rounded-2xl bg-[#021f18]/80 border border-[#d6b45a]/30 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-[#d6b45a] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold uppercase text-[#d6b45a]">
              RESEARCH & INTEGRITY
            </h4>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Use credible sources, distinguish evidence from opinion, acknowledge the work of others and ensure that your final submission reflects your own understanding and contribution.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[#0b8f6a]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748b]">
            Assigned project brief is active for the current cycle.
          </p>
          <button
            onClick={onBeginProject}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl hover:shadow-[#0b8f6a]/30 transition-all flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>BEGIN PROJECT</span>
            <ArrowRight className="w-4 h-4 text-[#d6b45a] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
