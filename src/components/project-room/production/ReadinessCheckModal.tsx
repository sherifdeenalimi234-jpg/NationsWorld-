import React from 'react';
import type { ProjectReadinessCheck, SectionReadinessStatus } from '../../../types/projectProduction';
import { AlertTriangle, CheckCircle2, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface ReadinessCheckModalProps {
  readiness: ProjectReadinessCheck;
  onReturnToWorkspace: () => void;
  onContinueAnyway: () => void;
}

export const ReadinessCheckModal: React.FC<ReadinessCheckModalProps> = ({
  readiness,
  onReturnToWorkspace,
  onContinueAnyway,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 block">
              PROJECT READINESS CHECK
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#063B2E]">
              PRODUCTION REVIEW
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#374151] mb-6 leading-relaxed">
          Before generating your final document, review your project readiness status below.
          Some sections may require further writing or literature sources.
        </p>

        {/* Readiness Breakdown List */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2 text-[#063B2E]">
              {readiness.isAssigned ? (
                <CheckCircle2 className="w-4 h-4 text-[#0B8F6A]" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              Project Assignment Confirmed
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">VALIDATED</span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2 text-[#063B2E]">
              {readiness.isDeclarationConfirmed ? (
                <CheckCircle2 className="w-4 h-4 text-[#0B8F6A]" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              Participant Declaration Accepted
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">CONFIRMED</span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2 text-[#063B2E]">
              {readiness.hasTitle ? (
                <CheckCircle2 className="w-4 h-4 text-[#0B8F6A]" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-500" />
              )}
              Project Title Defined
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">AVAILABLE</span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2 text-[#063B2E]">
              {readiness.hasResearchMaterials ? (
                <CheckCircle2 className="w-4 h-4 text-[#0B8F6A]" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              Research Materials & Citations
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">TOOLKIT</span>
          </div>
        </div>

        {/* Section Completion Breakdown */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 text-xs font-extrabold text-[#063B2E]">
            <span>SECTION PROGRESS</span>
            <span>{readiness.overallProgress}% COMPLETE</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-4">
            <div
              className="bg-[#0B8F6A] h-full transition-all duration-300"
              style={{ width: `${readiness.overallProgress}%` }}
            />
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
            {readiness.sectionsStatus.map((sec: SectionReadinessStatus) => (
              <div
                key={sec.id}
                className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  {sec.isComplete ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B8F6A] shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  )}
                  <span className="font-bold text-[#063B2E] truncate">{sec.title}</span>
                </div>
                <span className="text-[10px] font-mono font-medium text-[#64748B]">
                  {sec.wordCount} words
                </span>
              </div>
            ))}
          </div>
        </div>

        {!readiness.isFullyReady && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 mb-6 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Your project is not fully complete, but you can continue into Production Studio to preview and adjust settings.
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onReturnToWorkspace}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-[#063B2E] font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Workspace</span>
          </button>

          <button
            type="button"
            onClick={onContinueAnyway}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
          >
            <span>Continue to Production Studio</span>
            <ArrowRight className="w-4 h-4 text-[#8DE0BE]" />
          </button>
        </div>
      </div>
    </div>
  );
};
