import React from 'react';
import type { ProjectSlot } from '../../data/projectsData';
import { DEV_MODE } from '../../data/projectsData';
import { AssignedProjectCard } from './AssignedProjectCard';
import { Lock, FileText, PenTool, Wrench, Send, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

interface ProjectRoomDashboardProps {
  assignedProject: ProjectSlot | null;
  onOpenBrief: () => void;
  onScrollToSelection?: () => void;
  onLockWorkspace?: () => void;
  onDevReset?: () => void;
}

export const ProjectRoomDashboard: React.FC<ProjectRoomDashboardProps> = ({
  assignedProject,
  onOpenBrief,
  onScrollToSelection,
  onLockWorkspace,
  onDevReset,
}) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-deep-emerald via-emerald/20 to-deep-emerald border border-gold/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald/30 border border-gold/40 flex items-center justify-center text-mint shrink-0">
            <CheckCircle2 className="w-5 h-5 text-mint" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-gold">
                {assignedProject ? 'Welcome Back' : 'Access Granted'}
              </span>
              <span className="text-[10px] bg-emerald/30 text-mint border border-emerald/40 px-2 py-0.5 rounded font-mono font-bold">
                2026-OCTOBER CYCLE
              </span>
            </div>
            <p className="text-xs font-bold text-ivory mt-0.5">
              {assignedProject
                ? 'Your assigned project is active in your NationsWorld workspace.'
                : 'Welcome to the NationsWorld Project Room.'}
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-obsidian/70 hover:bg-obsidian text-sage hover:text-gold border border-gold/30 text-xs font-semibold transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-gold" />
              <span>Lock Workspace</span>
            </button>
          )}
        </div>
      </div>

      {/* Header Title */}
      <div className="text-center sm:text-left border-b border-gold/20 pb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ivory tracking-tight">
          Project Room
        </h2>
        <p className="text-xs sm:text-sm text-gold font-medium mt-1">
          Your workspace for assigned NationsWorld projects.
        </p>
      </div>

      {/* CURRENT PROJECT SECTION */}
      {assignedProject ? (
        <div className="animate-fadeIn">
          <AssignedProjectCard project={assignedProject} onOpenBrief={onOpenBrief} />
        </div>
      ) : (
        <div className="bg-obsidian/70 border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-md hover:border-gold/50 transition-colors">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold">
                <FileText className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-ivory">CURRENT PROJECT</h3>
                <p className="text-xs text-sage">No project assigned yet.</p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-300" />
              Awaiting Assignment
            </span>
          </div>

          <p className="text-xs text-sage leading-relaxed mt-2">
            Choose a project number below to receive your assigned topic for the current project cycle.
          </p>

          {onScrollToSelection && (
            <div className="mt-6 pt-4 border-t border-gold/15">
              <button
                type="button"
                onClick={onScrollToSelection}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald via-emerald-600 to-deep-emerald hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/40 shadow-md transition cursor-pointer"
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
        <div className="bg-obsidian/70 border border-gold/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-gold/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold">
                <PenTool className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sage bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Phase 3
              </span>
            </div>

            <h3 className="text-base font-extrabold text-ivory group-hover:text-gold transition-colors">
              PROJECT WORKSPACE
            </h3>
            <p className="text-xs text-sage leading-relaxed mt-2">
              Your research and writing workspace will appear here.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gold/15">
            <div className="text-[11px] font-mono text-sage/70 flex items-center justify-between">
              <span>Status:</span>
              <span className="text-gold font-semibold">Coming in Next Phase</span>
            </div>
          </div>
        </div>

        {/* PROJECT TOOLS */}
        <div className="bg-obsidian/70 border border-gold/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-gold/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold">
                <Wrench className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sage bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Phase 3+
              </span>
            </div>

            <h3 className="text-base font-extrabold text-ivory group-hover:text-gold transition-colors">
              PROJECT TOOLS
            </h3>
            <p className="text-xs text-sage leading-relaxed mt-2">
              Research and productivity tools will appear here.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gold/15">
            <div className="text-[11px] font-mono text-sage/70 flex items-center justify-between">
              <span>Tools:</span>
              <span className="text-gold font-semibold">Planned for Phase 3+</span>
            </div>
          </div>
        </div>

        {/* SUBMISSION */}
        <div className="bg-obsidian/70 border border-gold/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-gold/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold">
                <Send className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sage bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Phase 4
              </span>
            </div>

            <h3 className="text-base font-extrabold text-ivory group-hover:text-gold transition-colors">
              SUBMISSION
            </h3>
            <p className="text-xs text-sage leading-relaxed mt-2">
              Your completed project and submission tools will appear here.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gold/15">
            <div className="text-[11px] font-mono text-sage/70 flex items-center justify-between">
              <span>Pipeline:</span>
              <span className="text-gold font-semibold">Production Hub Integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
