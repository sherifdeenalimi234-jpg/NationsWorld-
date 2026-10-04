import React from 'react';
import { Sparkles, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';

interface WorkspacePlaceholderModalProps {
  onClose: () => void;
  projectNumber?: number;
}

export const WorkspacePlaceholderModal: React.FC<WorkspacePlaceholderModalProps> = ({
  onClose,
  projectNumber,
}) => {
  const formattedNum = projectNumber
    ? projectNumber < 10
      ? `0${projectNumber}`
      : `${projectNumber}`
    : null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#021f18]/90 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="w-full max-w-lg bg-[#063b2e] border border-[#0b8f6a]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center space-y-6">

        {/* Subtle background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#0b8f6a]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#d6b45a]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-[#084234] border border-[#0b8f6a]/40 flex items-center justify-center text-[#0b8f6a] shadow-inner">
          <Sparkles className="w-8 h-8 text-[#d6b45a] animate-pulse" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0b8f6a] text-white flex items-center justify-center text-[10px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          {formattedNum && (
            <span className="inline-block px-3 py-1 rounded-full bg-[#0b8f6a]/20 border border-[#0b8f6a]/30 text-[#0b8f6a] text-xs font-mono font-bold uppercase tracking-wider mb-1">
              PROJECT {formattedNum} CONFIRMED
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f7faf8] tracking-tight">
            Your Workspace Is Ready
          </h2>
          <p className="text-sm text-[#64748b] leading-relaxed max-w-sm mx-auto">
            Your research and writing environment will be available here in the next phase.
          </p>
        </div>

        {/* Status card preview */}
        <div className="p-4 rounded-xl bg-[#04271e]/80 border border-[#0b8f6a]/20 text-xs text-[#64748b] space-y-2 text-left">
          <div className="flex items-center justify-between text-[#f7faf8] font-medium">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#d6b45a]" />
              Phase 4 Workspace Pipeline
            </span>
            <span className="text-[10px] bg-[#d6b45a]/20 text-[#d6b45a] px-2 py-0.5 rounded font-mono font-bold uppercase">
              COMING NEXT
            </span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            Future modules will feature research planners, literature review matrices, built-in citation engines, and Production Hub integrations.
          </p>
        </div>

        {/* Action button */}
        <div>
          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-[#0b8f6a]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#d6b45a]" />
            <span>Return to Project Room</span>
          </button>
        </div>

      </div>
    </div>
  );
};
