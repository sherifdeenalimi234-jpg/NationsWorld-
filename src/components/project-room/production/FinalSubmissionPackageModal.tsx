import React, { useState } from 'react';
import { X, CheckCircle2, Download, Eye, ExternalLink, ShieldCheck, FileCheck, MessageSquare, AlertCircle } from 'lucide-react';
import { downloadDeclarationPDF, formatProjectNumber } from '../../../utils/declarationPdfGenerator';
import { DEFAULT_DECLARATION_TEXT, getStoredAssignment } from '../../../utils/projectRoomStorage';
import { DeclarationPreviewModal } from '../DeclarationPreviewModal';
import { OFFICIAL_WHATSAPP_NUMBER, generateWhatsAppLink } from '../../../utils/reference';

interface FinalSubmissionPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectNumber: string;
  cycleId: string;
  onDownloadProjectPDF: () => void;
}

export const FinalSubmissionPackageModal: React.FC<FinalSubmissionPackageModalProps> = ({
  isOpen,
  onClose,
  projectTitle,
  projectNumber,
  cycleId,
  onDownloadProjectPDF,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isWhatsAppMode, setIsWhatsAppMode] = useState(false);

  if (!isOpen) return null;

  const assignment = getStoredAssignment();
  const decl = assignment?.declaration;
  const numInt = parseInt(projectNumber, 10) || assignment?.projectNumber || 1;
  const formattedProjNum = formatProjectNumber(numInt);

  const handleDownloadDeclaration = () => {
    if (decl) {
      downloadDeclarationPDF({
        fullName: decl.fullName,
        contact: decl.contact,
        projectTitle: projectTitle,
        projectNumber: numInt,
        cycleId: cycleId || '2026-OCTOBER',
        acceptedAt: decl.acceptedAt,
        declarationText: decl.declarationText || DEFAULT_DECLARATION_TEXT,
      });
    }
  };

  const handlePrepareSubmission = () => {
    setIsWhatsAppMode(true);
  };

  const handleOpenWhatsApp = () => {
    const refText = `NW-SUBMISSION-${formattedProjNum}`;
    const url = generateWhatsAppLink(refText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto font-sans">
      <div className="bg-[#04271e] border border-[#0b8f6a]/40 text-[#f7faf8] rounded-3xl max-w-2xl w-full my-auto p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0b8f6a]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#64748b] hover:text-[#f7faf8] hover:bg-[#063b2e] transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#0b8f6a]/30 pb-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 text-[#0b8f6a] text-[10px] font-mono font-bold uppercase">
              PHASE 7 SUBMISSION
            </span>
            <span className="text-xs text-[#d6b45a] font-mono font-bold">
              {cycleId || '2026-OCTOBER'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7faf8] tracking-tight">
            FINAL PROJECT PACKAGE
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] mt-1">
            Review your submission documents before completing official Secretariat submission.
          </p>
        </div>

        {!isWhatsAppMode ? (
          /* Package Overview View */
          <div className="space-y-6">
            {/* Package Item 1: Declaration */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#021f18] border border-[#0b8f6a]/30 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 flex items-center justify-center text-[#d6b45a] font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#f7faf8] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#d6b45a]" />
                      Participant Declaration
                    </h3>
                    <p className="text-[11px] text-[#64748b]">
                      Accepted by {decl?.fullName || 'Participant'} on {decl?.acceptedAt ? new Date(decl.acceptedAt).toLocaleDateString('en-GB') : 'N/A'}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 text-[#0b8f6a] text-xs font-bold font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d6b45a]" />
                  ✓ Ready
                </span>
              </div>

              {/* Action Buttons for Declaration */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-[#04271e] hover:bg-[#063b2e] text-[#f7faf8] hover:text-[#d6b45a] border border-[#0b8f6a]/40 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#d6b45a]" />
                  <span>Preview Declaration</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadDeclaration}
                  className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-[#063b2e] hover:bg-[#084234] text-[#f7faf8] border border-[#0b8f6a]/50 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#d6b45a]" />
                  <span>Download Declaration PDF</span>
                </button>
              </div>
            </div>

            {/* Package Item 2: Final Project Document */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#021f18] border border-[#0b8f6a]/30 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 flex items-center justify-center text-[#d6b45a] font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#f7faf8] flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#8DE0BE]" />
                      Final Project Document
                    </h3>
                    <p className="text-[11px] text-[#64748b]">
                      Project {formattedProjNum}: {projectTitle}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 text-[#0b8f6a] text-xs font-bold font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0b8f6a]" />
                  ✓ Ready
                </span>
              </div>

              {/* Action Button for Project Document */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onDownloadProjectPDF}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#063b2e] hover:bg-[#084234] text-[#f7faf8] border border-[#0b8f6a]/50 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#8DE0BE]" />
                  <span>Download Project PDF</span>
                </button>
              </div>
            </div>

            {/* Prepare Submission CTA */}
            <div className="pt-4 border-t border-[#0b8f6a]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#64748b]">
                Download both documents then proceed to WhatsApp submission.
              </p>

              <button
                type="button"
                onClick={handlePrepareSubmission}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#d6b45a]" />
                <span>Prepare Submission</span>
              </button>
            </div>
          </div>
        ) : (
          /* WhatsApp Submission Preparation Step */
          <div className="space-y-6 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-[#021f18] border border-[#0b8f6a]/30 space-y-3">
              <div className="flex items-center gap-3 border-b border-[#0b8f6a]/20 pb-3">
                <div className="w-10 h-10 rounded-xl bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 flex items-center justify-center text-[#d6b45a] shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#d6b45a]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#f7faf8]">
                    Official WhatsApp Submission
                  </h3>
                  <p className="text-xs text-[#64748b]">
                    Secretariat Number: <strong className="text-[#d6b45a] font-mono">{OFFICIAL_WHATSAPP_NUMBER}</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#f7faf8] pt-2">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0b8f6a] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span>Ensure you have downloaded both your <strong>Participant Declaration PDF</strong> and <strong>Final Project PDF</strong>.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0b8f6a] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span>Click <strong>Open Official WhatsApp</strong> below to open the NationsWorld Secretariat chat.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0b8f6a] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <span>Tap the paperclip attachment icon in WhatsApp and send both PDF documents.</span>
                </div>
              </div>

              <div className="p-3 bg-[#063b2e] border border-[#0b8f6a]/40 rounded-xl text-xs text-emerald-200 flex items-start gap-2 mt-3">
                <AlertCircle className="w-4 h-4 text-[#d6b45a] shrink-0 mt-0.5" />
                <span>
                  <strong>Note:</strong> Web browsers cannot automatically attach PDF files into WhatsApp. You must attach the downloaded PDF files using WhatsApp's paperclip menu.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsWhatsAppMode(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#021f18] text-[#f7faf8] border border-[#0b8f6a]/30 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Back to Package
              </button>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-[#d6b45a]" />
                <span>Open Official WhatsApp</span>
              </button>
            </div>
          </div>
        )}

        {/* Declaration Preview Modal */}
        {decl && (
          <DeclarationPreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            declarationData={{
              fullName: decl.fullName,
              contact: decl.contact,
              projectTitle: projectTitle,
              projectNumber: numInt,
              cycleId: cycleId || '2026-OCTOBER',
              acceptedAt: decl.acceptedAt,
              declarationText: decl.declarationText || DEFAULT_DECLARATION_TEXT,
            }}
          />
        )}
      </div>
    </div>
  );
};
