import React from 'react';
import { X, Download, ShieldCheck, CheckCircle2, User, Mail, Calendar, FileText, Award } from 'lucide-react';
import { downloadDeclarationPDF, formatProjectNumber } from '../../utils/declarationPdfGenerator';
import { DEFAULT_DECLARATION_TEXT } from '../../utils/projectRoomStorage';

interface DeclarationPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  declarationData: {
    fullName: string;
    contact: string;
    projectTitle: string;
    projectNumber: number;
    cycleId: string;
    acceptedAt: string;
    declarationText?: string;
  };
}

export const DeclarationPreviewModal: React.FC<DeclarationPreviewModalProps> = ({
  isOpen,
  onClose,
  declarationData,
}) => {
  if (!isOpen) return null;

  const formattedProjNum = formatProjectNumber(declarationData.projectNumber);
  const formattedAcceptedDate = declarationData.acceptedAt
    ? new Date(declarationData.acceptedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const formattedGenDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const exactDeclarationText = declarationData.declarationText || DEFAULT_DECLARATION_TEXT;

  const handleDownload = () => {
    downloadDeclarationPDF({
      fullName: declarationData.fullName,
      contact: declarationData.contact,
      projectTitle: declarationData.projectTitle,
      projectNumber: declarationData.projectNumber,
      cycleId: declarationData.cycleId || '2026-OCTOBER',
      acceptedAt: declarationData.acceptedAt,
      declarationText: exactDeclarationText,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#04271e] border border-[#0b8f6a]/40 text-[#f7faf8] rounded-3xl max-w-3xl w-full my-auto p-5 sm:p-8 shadow-2xl relative overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
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

        {/* Header Branding */}
        <div className="border-b border-[#0b8f6a]/30 pb-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-md bg-[#d6b45a] text-[#021f18] font-bold text-xs flex items-center justify-center shrink-0">
              NW
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#d6b45a]">
              NationsWorld of Visionary Advancement
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0b8f6a] block">
                PROJECT ROOM
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f7faf8] tracking-tight">
                Confirmed Participant Declaration
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 text-[#0b8f6a] text-xs font-bold font-mono flex items-center gap-1.5 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#d6b45a]" />
              Status: Confirmed
            </span>
          </div>
        </div>

        {/* Document Content Box */}
        <div className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-2xl p-4 sm:p-6 space-y-6 shadow-inner text-sm">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#063b2e]/60 border border-[#0b8f6a]/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#64748b]">
                <User className="w-3.5 h-3.5 text-[#d6b45a]" />
                <span>PARTICIPANT NAME:</span>
              </div>
              <p className="font-bold text-[#f7faf8] pl-5.5 text-sm">{declarationData.fullName || 'N/A'}</p>

              <div className="flex items-center gap-2 text-xs text-[#64748b] pt-1">
                <Mail className="w-3.5 h-3.5 text-[#d6b45a]" />
                <span>CONTACT:</span>
              </div>
              <p className="font-bold text-[#f7faf8] pl-5.5 text-xs truncate">{declarationData.contact || 'N/A'}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#64748b]">
                <FileText className="w-3.5 h-3.5 text-[#d6b45a]" />
                <span>ASSIGNED PROJECT:</span>
              </div>
              <p className="font-bold text-[#f7faf8] pl-5.5 text-xs sm:text-sm">{declarationData.projectTitle}</p>

              <div className="flex items-center gap-2 text-xs text-[#64748b] pt-1">
                <Award className="w-3.5 h-3.5 text-[#d6b45a]" />
                <span>PROJECT NUMBER & CYCLE:</span>
              </div>
              <p className="font-bold text-[#f7faf8] pl-5.5 text-xs font-mono">
                {formattedProjNum} • {declarationData.cycleId || '2026-OCTOBER'}
              </p>
            </div>
          </div>

          {/* Declaration Statement Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#04271e] border border-[#d6b45a]/30 relative">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#d6b45a] font-bold block mb-2">
              OFFICIAL DECLARATION TEXT
            </span>
            <p className="italic text-gray-200 text-xs sm:text-sm leading-relaxed">
              "{exactDeclarationText}"
            </p>
          </div>

          {/* Electronic Acknowledgement Signature Box */}
          <div className="p-4 rounded-xl bg-[#063b2e]/60 border border-[#0b8f6a]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] block">
                ELECTRONIC ACKNOWLEDGEMENT
              </span>
              <p className="text-xs font-bold text-[#f7faf8] mt-0.5">
                Participant: {declarationData.fullName}
              </p>
              <p className="text-xs text-[#0b8f6a] font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d6b45a]" />
                Signature: Electronically acknowledged
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-[#64748b]">
              <span className="flex items-center gap-1 sm:justify-end">
                <Calendar className="w-3.5 h-3.5 text-[#d6b45a]" />
                Accepted Date:
              </span>
              <span className="font-bold text-[#f7faf8] block mt-0.5">{formattedAcceptedDate}</span>
            </div>
          </div>

          {/* Document System Metadata Footer */}
          <div className="p-3 rounded-xl bg-[#021f18] border border-[#0b8f6a]/20 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-[#64748b]">
            <div>
              <span className="block text-[9px] uppercase">Doc Type:</span>
              <span className="font-bold text-[#f7faf8]">Participant Declaration</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase">Project No:</span>
              <span className="font-bold text-[#f7faf8]">{formattedProjNum}</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase">Version:</span>
              <span className="font-bold text-[#f7faf8]">v1.0</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase">Generated:</span>
              <span className="font-bold text-[#f7faf8]">{formattedGenDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Large & Mobile Friendly) */}
        <div className="mt-6 pt-4 border-t border-[#0b8f6a]/30 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#021f18] hover:bg-[#063b2e] text-[#f7faf8] border border-[#0b8f6a]/40 font-bold text-xs uppercase tracking-wider transition cursor-pointer text-center"
          >
            Close Preview
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#d6b45a]" />
            <span>Download Declaration PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
