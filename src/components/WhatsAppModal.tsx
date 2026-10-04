import React, { useState } from 'react';
import {
  OFFICIAL_WHATSAPP_NUMBER,
  generateWhatsAppLink,
  generateWhatsAppMessageText,
} from '../utils/reference';
import { MessageSquare, Download, ExternalLink, Copy, Check, X, AlertTriangle } from 'lucide-react';

interface WhatsAppModalProps {
  appReference: string;
  isOpen: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  appReference,
  isOpen,
  onClose,
  onDownloadPdf,
}) => {
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [openedWhatsApp, setOpenedWhatsApp] = useState(false);

  if (!isOpen) return null;

  const messageText = generateWhatsAppMessageText(appReference);
  const whatsappUrl = generateWhatsAppLink(appReference);
  const pdfFilename = `NationsWorld_Membership_Application_${appReference}.pdf`;

  const copyMessageText = () => {
    navigator.clipboard.writeText(messageText);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    setOpenedWhatsApp(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#64748B] hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#12A875]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#063B2E] leading-tight">
              NATIONSWORLD APPLICATION SUBMISSION
            </h3>
            <p className="text-xs text-[#374151] font-medium">
              Official Membership WhatsApp: <strong className="text-[#063B2E] font-bold">{OFFICIAL_WHATSAPP_NUMBER}</strong>
            </p>
          </div>
        </div>

        {/* Application Ref Badge */}
        <div className="bg-emerald-50/80 p-3 rounded-xl border border-[#12A875]/30 mb-5 text-center">
          <span className="text-xs uppercase font-extrabold text-[#063B2E] block mb-0.5">
            Application Reference
          </span>
          <span className="text-xl font-black tracking-wider text-[#063B2E] font-mono">
            {appReference}
          </span>
        </div>

        {/* 4-Step Instructions */}
        <div className="space-y-3 mb-5">
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#063B2E]">
            Submission Steps
          </h4>

          {/* Step 1 */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-[#063B2E] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#1E293B]">Download your application PDF</p>
              <p className="text-xs text-[#64748B] font-mono mt-0.5 truncate">{pdfFilename}</p>
              <button
                type="button"
                onClick={onDownloadPdf}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#12A875] rounded-lg text-xs font-bold text-[#063B2E] hover:bg-emerald-50 transition shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[#12A875]" /> Download PDF Now
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-[#063B2E] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="text-sm font-bold text-[#1E293B]">Open official WhatsApp</p>
              <p className="text-xs text-[#374151] font-medium">
                Pre-loaded with reference <span className="font-mono font-bold text-[#063B2E]">{appReference}</span>.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-300">
            <div className="w-6 h-6 rounded-full bg-[#063B2E] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#063B2E]">Attach the downloaded PDF</p>
              <p className="text-xs text-[#374151] font-medium mt-0.5">
                Tap the paperclip icon in WhatsApp and attach your downloaded application PDF file.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-[#063B2E] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
              4
            </div>
            <div>
              <p className="text-sm font-bold text-[#1E293B]">Send it to NationsWorld</p>
              <p className="text-xs text-[#374151] font-medium">
                Send the message to the official NationsWorld Secretariat.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Technical Limitation Notice */}
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2.5 mb-5 text-amber-900 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold">Note:</strong> Browsers cannot attach local PDF files automatically. You must tap the paperclip icon in WhatsApp to attach the downloaded PDF before sending.
          </p>
        </div>

        {openedWhatsApp && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-center mb-5 font-extrabold text-xs text-[#063B2E] animate-pulse">
            Remember to attach your downloaded PDF before tapping Send in WhatsApp.
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-3.5 px-4 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-extrabold text-base transition shadow-md flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5 text-[#8DE0BE]" />
            OPEN WHATSAPP
          </button>

          <button
            type="button"
            onClick={copyMessageText}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E293B] font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            {copiedMsg ? (
              <>
                <Check className="w-4 h-4 text-[#12A875]" /> Copied WhatsApp Message!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#374151]" /> Copy WhatsApp Message Text
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
