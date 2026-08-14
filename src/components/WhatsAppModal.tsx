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
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-nw-border relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-nw-muted hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-nw-border pb-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-nw-green">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-nw-dark leading-tight">
              NATIONSWORLD APPLICATION SUBMISSION
            </h3>
            <p className="text-xs text-nw-muted">
              Official Membership WhatsApp: <strong className="text-nw-deep">{OFFICIAL_WHATSAPP_NUMBER}</strong>
            </p>
          </div>
        </div>

        {/* Application Ref Badge */}
        <div className="bg-nw-soft p-3 rounded-xl border border-nw-border mb-5 text-center">
          <span className="text-xs uppercase font-semibold text-nw-muted block mb-0.5">
            Application Reference
          </span>
          <span className="text-xl font-extrabold tracking-wider text-nw-green font-mono">
            {appReference}
          </span>
        </div>

        {/* 4-Step Instructions */}
        <div className="space-y-3 mb-5">
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-nw-muted">
            Submission Steps
          </h4>

          {/* Step 1 */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-nw-border">
            <div className="w-6 h-6 rounded-full bg-nw-green text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-nw-dark">Download your application PDF</p>
              <p className="text-xs text-nw-muted font-mono mt-0.5 truncate">{pdfFilename}</p>
              <button
                type="button"
                onClick={onDownloadPdf}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-nw-border rounded-lg text-xs font-semibold text-nw-green hover:bg-nw-soft transition shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF Now
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-nw-border">
            <div className="w-6 h-6 rounded-full bg-nw-green text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <p className="text-sm font-semibold text-nw-dark">Open official WhatsApp</p>
              <p className="text-xs text-nw-muted">
                Pre-loaded with reference <span className="font-mono font-bold text-nw-dark">{appReference}</span>.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 p-3 bg-emerald-50/80 rounded-xl border border-emerald-200">
            <div className="w-6 h-6 rounded-full bg-nw-green text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div>
              <p className="text-sm font-bold text-nw-deep">Attach the downloaded PDF</p>
              <p className="text-xs text-nw-dark mt-0.5">
                Tap the paperclip icon in WhatsApp and attach your downloaded application PDF file.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-nw-border">
            <div className="w-6 h-6 rounded-full bg-nw-green text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              4
            </div>
            <div>
              <p className="text-sm font-semibold text-nw-dark">Send it to NationsWorld</p>
              <p className="text-xs text-nw-muted">
                Send the message to the official NationsWorld Secretariat.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Technical Limitation Notice */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 mb-5 text-amber-900 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Note:</strong> Browsers cannot attach local PDF files automatically. You must tap the paperclip icon in WhatsApp to attach the downloaded PDF before sending.
          </p>
        </div>

        {openedWhatsApp && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-center mb-5 font-semibold text-xs text-nw-deep animate-pulse">
            Remember to attach your downloaded PDF before tapping Send in WhatsApp.
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition shadow-md flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            OPEN WHATSAPP
          </button>

          <button
            type="button"
            onClick={copyMessageText}
            className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-nw-dark font-medium text-xs transition flex items-center justify-center gap-1.5"
          >
            {copiedMsg ? (
              <>
                <Check className="w-4 h-4 text-nw-green" /> Copied WhatsApp Message!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy WhatsApp Message Text
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
