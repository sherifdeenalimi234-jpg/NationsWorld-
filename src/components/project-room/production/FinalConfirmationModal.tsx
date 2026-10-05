import React from 'react';
import { AlertCircle, FileCheck2, X } from 'lucide-react';

interface FinalConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const FinalConfirmationModal: React.FC<FinalConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl animate-in fade-in zoom-in duration-200 relative">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#063B2E] flex items-center justify-center mb-4">
          <FileCheck2 className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-black text-[#063B2E] mb-2">
          GENERATE FINAL DOCUMENT
        </h3>

        <p className="text-xs sm:text-sm text-[#374151] mb-6 leading-relaxed">
          Are you sure you want to mark this document as <strong className="font-extrabold text-[#063B2E]">FINAL</strong>? Make sure you have reviewed your research, citations, and section details. You can still make edits and regenerate if needed.
        </p>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 mb-6 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Generating this final document updates your project production state to FINAL and increments the document version.
          </span>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-xs text-[#063B2E] uppercase"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition"
          >
            Confirm Final Document
          </button>
        </div>
      </div>
    </div>
  );
};
