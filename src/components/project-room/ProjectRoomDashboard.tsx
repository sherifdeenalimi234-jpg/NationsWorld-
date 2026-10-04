import React from 'react';
import { Lock, FileText, PenTool, Wrench, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProjectRoomDashboardProps {
  onLockWorkspace?: () => void;
}

export const ProjectRoomDashboard: React.FC<ProjectRoomDashboardProps> = ({ onLockWorkspace }) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Success Access Granted Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-deep-emerald via-emerald/20 to-deep-emerald border border-gold/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald/30 border border-gold/40 flex items-center justify-center text-mint shrink-0">
            <CheckCircle2 className="w-5 h-5 text-mint" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-gold">
                Access Granted
              </span>
              <span className="text-[10px] bg-emerald/30 text-mint border border-emerald/40 px-2 py-0.5 rounded font-mono font-bold">
                PHASE 1 FOUNDATION
              </span>
            </div>
            <p className="text-xs font-bold text-ivory mt-0.5">
              Welcome to the NationsWorld Project Room.
            </p>
          </div>
        </div>

        {onLockWorkspace && (
          <button
            type="button"
            onClick={onLockWorkspace}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-obsidian/70 hover:bg-obsidian text-sage hover:text-gold border border-gold/30 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <Lock className="w-3.5 h-3.5 text-gold" />
            <span>Lock Workspace</span>
          </button>
        )}
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

      {/* Placeholder Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: CURRENT PROJECT */}
        <div className="bg-obsidian/70 border border-gold/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-gold/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold">
                <FileText className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-300" />
                Awaiting Assignment
              </span>
            </div>

            <h3 className="text-base font-extrabold text-ivory group-hover:text-gold transition-colors">
              CURRENT PROJECT
            </h3>
            <p className="text-xs text-sage leading-relaxed mt-2">
              Your assigned project will appear here.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gold/15">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-sage/60 font-bold text-xs uppercase tracking-wider cursor-not-allowed opacity-60 text-center"
            >
              Project Assignment — Coming Soon
            </button>
          </div>
        </div>

        {/* CARD 2: PROJECT WORKSPACE */}
        <div className="bg-obsidian/70 border border-gold/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-gold/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold">
                <PenTool className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sage bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Coming in the next phase
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
              <span className="text-gold font-semibold">In Development</span>
            </div>
          </div>
        </div>

        {/* CARD 3: PROJECT TOOLS */}
        <div className="bg-obsidian/70 border border-gold/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-gold/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold">
                <Wrench className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sage bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Coming Soon
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
              <span className="text-gold font-semibold">Planned for Phase 2+</span>
            </div>
          </div>
        </div>

        {/* CARD 4: SUBMISSION */}
        <div className="bg-obsidian/70 border border-gold/30 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-gold/50 transition-colors group">
          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold">
                <Send className="w-5 h-5 text-gold" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sage bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                Coming Soon
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
