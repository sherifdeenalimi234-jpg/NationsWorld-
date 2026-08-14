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
      <div className="bg-white rounded-2xl border border-nw-border p-6 sm:p-8 shadow-sm text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-nw-soft text-nw-green mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-nw-deep font-extrabold text-xs uppercase tracking-wider mb-2">
          APPLICATION GENERATED SUCCESSFULLY
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-nw-dark">
          APPLICATION READY FOR SUBMISSION
        </h1>

        <p className="text-nw-muted text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          Your Stage 1 NationsWorld membership application document has been prepared and formatted for formal submission.
        </p>

        <div className="mt-6 p-5 rounded-2xl bg-nw-soft border-2 border-nw-green/30 max-w-md mx-auto relative shadow-xs">
          <span className="text-xs uppercase font-extrabold tracking-wider text-nw-muted block mb-1">
            APPLICATION REFERENCE
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-nw-green my-1 selection:bg-nw-green selection:text-white">
            {refCode}
          </div>
          <p className="text-xs text-nw-muted mt-1">
            <strong>IMPORTANT:</strong> Keep this reference. You will need it when submitting your application.
          </p>

          <button
            type="button"
            onClick={copyReference}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 bg-white rounded-full border border-nw-green/40 text-nw-deep font-bold text-xs hover:bg-emerald-100 transition shadow-xs"
          >
            {copiedRef ? (
              <>
                <Check className="w-4 h-4 text-nw-green" /> Reference Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-nw-green" /> Copy Reference
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-nw-border p-5 sm:p-6 shadow-xs mb-6">
        <h3 className="font-bold text-nw-dark text-base mb-3 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-nw-green" /> Application Checklist Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-nw-border">
            <CheckCircle2 className="w-4 h-4 text-nw-green shrink-0" />
            <span className="font-medium text-nw-dark">Application generated</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-nw-border">
            <CheckCircle2 className="w-4 h-4 text-nw-green shrink-0" />
            <span className="font-medium text-nw-dark">Application reference created</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-nw-border">
            <CheckCircle2 className="w-4 h-4 text-nw-green shrink-0" />
            <span className="font-medium text-nw-dark">PDF ready for download</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <ArrowRight className="w-4 h-4 text-nw-green shrink-0 animate-pulse" />
            <span className="font-bold text-nw-deep">Submit through WhatsApp</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-nw-muted flex justify-between items-center">
          <span>Membership Status: <strong className="text-nw-deep">Prospective Member</strong></span>
          <span className="font-mono text-[11px] truncate max-w-[200px] sm:max-w-xs">{pdfFilename}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-nw-border shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="w-full py-4 px-5 rounded-xl bg-white border-2 border-nw-green text-nw-green font-bold text-sm sm:text-base hover:bg-nw-soft transition shadow-xs flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            DOWNLOAD APPLICATION PDF
          </button>

          <button
            type="button"
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="w-full py-4 px-5 rounded-xl bg-nw-green hover:bg-nw-hover text-white font-bold text-sm sm:text-base transition shadow-md flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            SUBMIT VIA WHATSAPP
          </button>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex items-center gap-1.5 text-xs text-nw-muted hover:text-nw-error transition py-2"
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
