import React from 'react';
import type { DocumentDraft } from '../../types/production';
import { downloadProductionPDF } from '../../utils/productionPdfGenerator';
import {
  Download,
  PlusCircle,
  Save,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';

interface PdfResultScreenProps {
  draft: DocumentDraft;
  onSaveDraft: () => void;
  onCreateAnother: () => void;
  onBackToDashboard: () => void;
}

export const PdfResultScreen: React.FC<PdfResultScreenProps> = ({
  draft,
  onSaveDraft,
  onCreateAnother,
  onBackToDashboard,
}) => {
  const handleDownload = () => {
    downloadProductionPDF(draft);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#12A875] flex items-center justify-center mx-auto mb-6 shadow-xs">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-extrabold uppercase tracking-widest text-[#12A875] block mb-2">
          PDF GENERATED SUCCESSFULLY
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#063B2E] tracking-tight mb-3">
          DOCUMENT READY
        </h2>

        <p className="text-sm text-[#374151] font-medium max-w-md mx-auto mb-8">
          Your NationsWorld document has been generated locally directly inside your browser.
        </p>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-lg mx-auto mb-8 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold border-b border-slate-200 pb-2">
            <span>Document Title:</span>
            <span className="font-extrabold text-[#063B2E]">{draft.title}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold border-b border-slate-200 pb-2">
            <span>Reference Number:</span>
            <span className="font-mono font-bold text-[#12A875]">{draft.referenceNumber}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
            <span>Category:</span>
            <span className="font-bold text-[#063B2E] uppercase">{draft.category}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-extrabold text-sm uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2.5 group"
          >
            <Download className="w-5 h-5 text-[#8DE0BE] group-hover:translate-y-0.5 transition-transform" />
            <span>DOWNLOAD PDF NOW</span>
          </button>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3 text-xs">
          <button
            type="button"
            onClick={onSaveDraft}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#063B2E] font-bold transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-[#12A875]" />
            <span>KEEP LOCAL DRAFT</span>
          </button>

          <button
            type="button"
            onClick={onCreateAnother}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#063B2E] font-bold transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-[#12A875]" />
            <span>CREATE ANOTHER DOCUMENT</span>
          </button>

          <button
            type="button"
            onClick={onBackToDashboard}
            className="px-4 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-bold transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-[#8DE0BE]" />
            <span>BACK TO PRODUCTION HUB</span>
          </button>
        </div>
      </div>
    </div>
  );
};
