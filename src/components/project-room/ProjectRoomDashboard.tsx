import React from 'react';
import type { ProjectSlot } from '../../data/projectsData';
import { DEV_MODE } from '../../data/projectsData';
import { AssignedProjectCard } from './AssignedProjectCard';
import { Lock, FileText, PenTool, Wrench, Send, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

interface ProjectRoomDashboardProps {
  assignedProject: ProjectSlot | null;
  declarationAccepted?: boolean;
  onOpenBrief: () => void;
  onCompleteDeclaration?: () => void;
  onScrollToSelection?: () => void;
  onLockWorkspace?: () => void;
  onDevReset?: () => void;
}

export const ProjectRoomDashboard: React.FC<ProjectRoomDashboardProps> = ({
  assignedProject,
  declarationAccepted = false,
  onOpenBrief,
  onCompleteDeclaration,
  onScrollToSelection,
  onLockWorkspace,
  onDevReset,
}) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#063b2e] via-[#084234] to-[#063b2e] border border-[#0b8f6a]/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 flex items-center justify-center text-[#0b8f6a] shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#d6b45a]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d6b45a]">
                {assignedProject ? 'Welcome Back' : 'Access Granted'}
              </span>
              <span className="text-[10px] bg-[#0b8f6a]/20 text-[#0b8f6a] border border-[#0b8f6a]/30 px-2 py-0.5 rounded font-mono font-bold">
                2026-OCTOBER CYCLE
              </span>
            </div>
            <p className="text-xs font-semibold text-[#f7faf8] mt-0.5">
              {assignedProject
                ? declarationAccepted
                  ? 'Your assigned project is active in your NationsWorld workspace.'
                  : 'Action required: Complete your participant declaration.'
                : 'Choose a project number to receive your assignment.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {DEV_MODE && onDevReset && (
            <button
              type="button"
              onClick={onDevReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/40 text-[11px] font-mono font-bold transition cursor-pointer"
              title="Developer Mode: Reset project assignment in localStorage"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>DEV RESET</span>
            </button>
          )}

          {onLockWorkspace && (
            <button
              type="button"
              onClick={onLockWorkspace}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#021f18]/80 hover:bg-[#021f18] text-[#64748b] hover:text-[#d6b45a] border border-[#0b8f6a]/30 text-xs font-medium transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#d6b45a]" />
              <span>Lock Workspace</span>
            </button>
          )}
        </div>
      </div>

      {/* Header Title */}
      <div className="text-center sm:text-left border-b border-[#0b8f6a]/20 pb-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-[#f7faf8] tracking-tight">
          Project Room
        </h2>
        <p className="text-xs sm:text-sm text-[#64748b] font-medium mt-1">
          Your workspace for assigned NationsWorld projects.
        </p>
      </div>

      {/* CURRENT PROJECT SECTION */}
      {assignedProject ? (
        <div className="animate-fade-in">
          <AssignedProjectCard
            project={assignedProject}
            declarationAccepted={declarationAccepted}
            onOpenBrief={onOpenBrief}
            onCompleteDeclaration={onCompleteDeclaration}
          />
        </div>
      ) : (
        <div className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-6 sm:p-8 shadow-md hover:border-[#0b8f6a]/50 transition-colors">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#04271e] border border-[#0b8f6a]/30 flex items-center justify-center text-[#d6b45a]">
                <FileText className="w-5 h-5 text-[#d6b45a]" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#f7faf8]">CURRENT PROJECT</h3>
                <p className="text-xs text-[#64748b]">Choose a project number to receive your assignment.</p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d6b45a] bg-[#d6b45a]/10 border border-[#d6b45a]/30 px-2.5 py-1 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-[#d6b45a]" />
              Awaiting Assignment
            </span>
          </div>

          <p className="text-xs text-[#64748b] leading-relaxed mt-2">
            Select an unrevealed project number from the workspace grid below to receive your assignment for the active 2026-OCTOBER project cycle.
          </p>

          {onScrollToSelection && (
            <div className="mt-6 pt-4 border-t border-[#0b8f6a]/15">
              <button
                type="button"
                onClick={onScrollToSelection}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-medium text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
              >
                Choose Project Number ↓
              </button>
            </div>
          )}
        </div>
      )}

      {/* FUTURE PIPELINE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* WORKSPACE */}
        <div className="bg-[#063b2e]/50 border border-[#0b8f6a]/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-[#0b8f6a]/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#04271e] border border-[#0b8f6a]/30 flex items-center justify-center text-[#d6b45a]">
                <PenTool className="w-5 h-5 text-[#d6b45a]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748b] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Phase 4
              </span>
            </div>

            <h3 className="text-base font-serif font-bold text-[#f7faf8] group-hover:text-[#d6b45a] transition-colors">
              PROJECT WORKSPACE
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed mt-2">
              Your research and writing workspace will appear here.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0b8f6a]/15">
            <div className="text-[11px] font-mono text-[#64748b] flex items-center justify-between">
              <span>Status:</span>
              <span className="text-[#d6b45a] font-medium">Coming in Next Phase</span>
            </div>
          </div>
        </div>

        {/* PROJECT TOOLS */}
        <div className="bg-[#063b2e]/50 border border-[#0b8f6a]/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-[#0b8f6a]/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#04271e] border border-[#0b8f6a]/30 flex items-center justify-center text-[#d6b45a]">
                <Wrench className="w-5 h-5 text-[#d6b45a]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748b] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Phase 4+
              </span>
            </div>

            <h3 className="text-base font-serif font-bold text-[#f7faf8] group-hover:text-[#d6b45a] transition-colors">
              PROJECT TOOLS
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed mt-2">
              Research and productivity tools will appear here.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0b8f6a]/15">
            <div className="text-[11px] font-mono text-[#64748b] flex items-center justify-between">
              <span>Tools:</span>
              <span className="text-[#d6b45a] font-medium">Planned for Phase 4+</span>
            </div>
          </div>
        </div>

        {/* SUBMISSION */}
        <div className="bg-[#063b2e]/50 border border-[#0b8f6a]/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-[#0b8f6a]/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#04271e] border border-[#0b8f6a]/30 flex items-center justify-center text-[#d6b45a]">
                <Send className="w-5 h-5 text-[#d6b45a]" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748b] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Phase 5
              </span>
            </div>

            <h3 className="text-base font-serif font-bold text-[#f7faf8] group-hover:text-[#d6b45a] transition-colors">
              SUBMISSION
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed mt-2">
              Your completed project and submission tools will appear here.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#0b8f6a]/15">
            <div className="text-[11px] font-mono text-[#64748b] flex items-center justify-between">
              <span>Pipeline:</span>
              <span className="text-[#d6b45a] font-medium">Production Hub Integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
