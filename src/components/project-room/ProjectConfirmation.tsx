import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ProjectConfirmationProps {
  projectNumber: number;
  onCancel: () => void;
  onConfirm: (num: number) => void;
}

export const ProjectConfirmation: React.FC<ProjectConfirmationProps> = ({
  projectNumber,
  onCancel,
  onConfirm,
}) => {
  const formattedNum = projectNumber < 10 ? `0${projectNumber}` : `${projectNumber}`;

  return (
    <div className="fixed inset-0 z-[100] bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-obsidian border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

        {/* Selected Badge Header */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-deep-emerald to-emerald border border-gold/40 flex items-center justify-center text-gold shadow-lg">
          <span className="text-2xl font-black font-mono text-gold">{formattedNum}</span>
        </div>

        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-gold block mb-1">
            PROJECT {formattedNum} SELECTED
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-ivory tracking-tight">
            Are you sure you want to claim this project?
          </h3>
        </div>

        {/* Informational Warning */}
        <div className="p-4 rounded-2xl bg-deep-emerald/40 border border-gold/25 text-xs text-sage leading-relaxed text-left space-y-2">
          <p className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>
              Your project topic will be revealed immediately after confirmation. You will not be able to change your selection during this project cycle.
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-ivory border border-white/15 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-sage" />
            <span>Go Back</span>
          </button>

          <button
            type="button"
            onClick={() => onConfirm(projectNumber)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald via-emerald-600 to-deep-emerald hover:brightness-110 text-white border border-gold/40 shadow-xl text-xs font-extrabold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-gold" />
            <span>Confirm Project {formattedNum}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
