import React, { useState } from 'react';
import type { ApplicationFormData } from '../types';
import { WhatsAppModal } from './WhatsAppModal';
import { generateApplicationPDF } from '../utils/pdfGenerator';
import { CheckCircle2, Download, MessageSquare, RotateCcw, Copy, Check, FileCheck, ArrowRight } from 'lucide-react';

interface SuccessScreenProps {
  formData: ApplicationFormData;
  onStartOver: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ formData, onStartOver }) => {
  const [copiedRef, setCopiedRef] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const refCode = formData.appReference || 'NWA-PENDING';
  const pdfFilename = `NationsWorld_Membership_Application_${refCode}.pdf`;

  const copyReference = () => {
    navigator.clipboard.writeText(refCode);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleDownloadPDF = () => {
    generateApplicationPDF(formData);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#12A875] mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full bg-[#063B2E] text-white font-extrabold text-xs uppercase tracking-wider mb-3">
          APPLICATION GENERATED SUCCESSFULLY
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#063B2E]">
          APPLICATION READY FOR SUBMISSION
        </h1>

        <p className="text-[#374151] text-sm font-medium max-w-lg mx-auto mt-2 leading-relaxed">
          Your Stage 1 NationsWorld membership application document has been prepared and formatted for formal submission.
        </p>

        <div className="mt-6 p-5 rounded-2xl bg-emerald-50/80 border-2 border-[#12A875]/40 max-w-md mx-auto relative shadow-xs">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#063B2E] block mb-1">
            APPLICATION REFERENCE
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-[#063B2E] my-1">
            {refCode}
          </div>
          <p className="text-xs text-[#374151] font-semibold mt-1">
            <strong className="text-[#063B2E]">IMPORTANT:</strong> Keep this reference. You will need it when submitting your application.
          </p>

          <button
            type="button"
            onClick={copyReference}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-[#12A875] text-[#063B2E] font-extrabold text-xs hover:bg-emerald-100 transition shadow-xs"
          >
            {copiedRef ? (
              <>
                <Check className="w-4 h-4 text-[#12A875]" /> Reference Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#12A875]" /> Copy Reference
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <h3 className="font-extrabold text-[#063B2E] text-base mb-3 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-[#12A875]" /> Application Checklist Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-[#12A875] shrink-0 font-bold" />
            <span className="font-bold text-[#1E293B]">Application generated</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-[#12A875] shrink-0 font-bold" />
            <span className="font-bold text-[#1E293B]">Application reference created</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-[#12A875] shrink-0 font-bold" />
            <span className="font-bold text-[#1E293B]">PDF ready for download</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-300">
            <ArrowRight className="w-4 h-4 text-[#12A875] shrink-0 animate-pulse font-bold" />
            <span className="font-extrabold text-[#063B2E]">Submit through WhatsApp</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-[#64748B] flex justify-between items-center font-medium">
          <span>Membership Status: <strong className="text-[#063B2E]">Prospective Member</strong></span>
          <span className="font-mono text-[11px] font-bold text-[#1E293B] truncate max-w-[200px] sm:max-w-xs">{pdfFilename}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="w-full py-4 px-5 rounded-xl bg-white border-2 border-[#063B2E] text-[#063B2E] font-extrabold text-sm sm:text-base hover:bg-emerald-50 transition shadow-xs flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5 text-[#12A875]" />
            DOWNLOAD APPLICATION PDF
          </button>

          <button
            type="button"
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="w-full py-4 px-5 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-extrabold text-sm sm:text-base transition shadow-md flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5 text-[#8DE0BE]" />
            SUBMIT VIA WHATSAPP
          </button>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex items-center gap-1.5 text-xs text-[#64748B] font-semibold hover:text-red-600 transition py-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear & Start New Application
          </button>
        </div>
      </div>

      <WhatsAppModal
        appReference={refCode}
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onDownloadPdf={handleDownloadPDF}
      />
    </div>
  );
};
