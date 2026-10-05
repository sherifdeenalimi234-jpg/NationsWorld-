import React from 'react';
import { Sparkles, ArrowLeft, CheckCircle2, Wrench, ArrowRight, FileCheck } from 'lucide-react';

interface WorkspacePlaceholderModalProps {
  onClose: () => void;
  onOpenToolkit?: () => void;
  onOpenProductionStudio?: () => void;
  projectNumber?: number;
}

export const WorkspacePlaceholderModal: React.FC<WorkspacePlaceholderModalProps> = ({
  onClose,
  onOpenToolkit,
  onOpenProductionStudio,
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

        {/* Background glow */}
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
            Your research and writing environment is active. Use the Project Toolkit to research and build, then open Production Studio to generate your final document.
          </p>
        </div>

        {/* Actions Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {/* Project Toolkit Highlight Card */}
          <div className="p-4 rounded-xl bg-[#04271e]/90 border border-[#0b8f6a]/30 text-xs space-y-2.5">
            <div className="flex items-center justify-between text-[#f7faf8] font-serif font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#d6b45a]" />
                Project Toolkit
              </span>
            </div>
            <p className="text-[11px] text-[#64748b] leading-snug">
              Research, organize, and analyze sources.
            </p>

            {onOpenToolkit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenToolkit();
                }}
                className="w-full py-2 px-3 bg-[#0b8f6a] hover:bg-[#0d9d75] text-white font-bold text-[11px] rounded-lg shadow-md transition flex items-center justify-center gap-1 cursor-pointer mt-1"
              >
                <span>Open Toolkit</span>
                <ArrowRight className="w-3 h-3 text-[#d6b45a]" />
              </button>
            )}
          </div>

          {/* Production Studio Highlight Card */}
          <div className="p-4 rounded-xl bg-[#04271e]/90 border border-[#0b8f6a]/30 text-xs space-y-2.5">
            <div className="flex items-center justify-between text-[#f7faf8] font-serif font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-[#8DE0BE]" />
                Production Studio
              </span>
            </div>
            <p className="text-[11px] text-[#64748b] leading-snug">
              Generate final branded document.
            </p>

            {onOpenProductionStudio && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenProductionStudio();
                }}
                className="w-full py-2 px-3 bg-[#063B2E] hover:bg-[#084234] border border-[#0b8f6a] text-white font-bold text-[11px] rounded-lg shadow-md transition flex items-center justify-center gap-1 cursor-pointer mt-1"
              >
                <span>Open Production</span>
                <ArrowRight className="w-3 h-3 text-[#8DE0BE]" />
              </button>
            )}
          </div>
        </div>

        {/* Return button */}
        <div>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-6 bg-[#021f18] hover:bg-[#04271e] text-[#64748b] hover:text-[#f7faf8] border border-[#0b8f6a]/30 font-medium text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#d6b45a]" />
            <span>Return to Project Room</span>
          </button>
        </div>

      </div>
    </div>
  );
};
