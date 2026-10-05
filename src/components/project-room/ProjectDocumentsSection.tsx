import React, { useState } from 'react';
import { FileText, CheckCircle2, Eye, Download, ShieldCheck, User, Calendar } from 'lucide-react';
import type { ProjectSlot } from '../../data/projectsData';
import type { StoredAssignment } from '../../utils/projectRoomStorage';
import { downloadDeclarationPDF, formatProjectNumber } from '../../utils/declarationPdfGenerator';
import { DEFAULT_DECLARATION_TEXT } from '../../utils/projectRoomStorage';
import { DeclarationPreviewModal } from './DeclarationPreviewModal';

interface ProjectDocumentsSectionProps {
  assignment: StoredAssignment | null;
  project: ProjectSlot | null;
}

export const ProjectDocumentsSection: React.FC<ProjectDocumentsSectionProps> = ({
  assignment,
  project,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!assignment || !project || !assignment.declarationAccepted || !assignment.declaration) {
    return null;
  }

  const decl = assignment.declaration;
  const formattedProjNum = formatProjectNumber(project.number);
  const acceptedDateFormatted = new Date(decl.acceptedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownload = () => {
    downloadDeclarationPDF({
      fullName: decl.fullName,
      contact: decl.contact,
      projectTitle: project.title,
      projectNumber: project.number,
      cycleId: assignment.cycleId || '2026-OCTOBER',
      acceptedAt: decl.acceptedAt,
      declarationText: decl.declarationText || DEFAULT_DECLARATION_TEXT,
    });
  };

  return (
    <div className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-6 shadow-lg hover:border-[#0b8f6a]/50 transition-colors font-sans space-y-5">
      {/* Section Title */}
      <div className="flex items-center justify-between border-b border-[#0b8f6a]/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#04271e] border border-[#0b8f6a]/30 flex items-center justify-center text-[#d6b45a]">
            <FileText className="w-5 h-5 text-[#d6b45a]" />
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-[#f7faf8]">PROJECT DOCUMENTS</h3>
            <p className="text-xs text-[#64748b]">Official documents associated with your project workspace.</p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0b8f6a] bg-[#0b8f6a]/20 border border-[#0b8f6a]/30 px-2.5 py-1 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0b8f6a]" />
          Document Active
        </span>
      </div>

      {/* Document Item Row / Card */}
      <div className="p-4 rounded-xl bg-[#021f18] border border-[#0b8f6a]/25 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0b8f6a]/15 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d6b45a]" />
            <span className="font-bold text-sm text-[#f7faf8]">Participant Declaration</span>
          </div>
          <span className="text-[11px] font-mono text-[#0b8f6a] font-bold bg-[#0b8f6a]/15 border border-[#0b8f6a]/30 px-2 py-0.5 rounded flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#d6b45a]" />
            ✓ Confirmed
          </span>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#64748b]">
          <div>
            <span className="block text-[10px] uppercase font-mono">Participant:</span>
            <span className="font-bold text-[#f7faf8] flex items-center gap-1">
              <User className="w-3 h-3 text-[#d6b45a]" />
              {decl.fullName}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-mono">Project & Cycle:</span>
            <span className="font-bold text-[#d6b45a] font-mono">
              {project.title} ({formattedProjNum}) • {assignment.cycleId || '2026-OCTOBER'}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="block text-[10px] uppercase font-mono">Accepted Date:</span>
            <span className="font-bold text-[#f7faf8] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#d6b45a]" />
              {acceptedDateFormatted}
            </span>
          </div>
        </div>

        {/* Mobile touch-friendly action buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-[#04271e] hover:bg-[#063b2e] text-[#f7faf8] hover:text-[#d6b45a] border border-[#0b8f6a]/40 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Eye className="w-4 h-4 text-[#d6b45a]" />
            <span>View Declaration</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#d6b45a]" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <DeclarationPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        declarationData={{
          fullName: decl.fullName,
          contact: decl.contact,
          projectTitle: project.title,
          projectNumber: project.number,
          cycleId: assignment.cycleId || '2026-OCTOBER',
          acceptedAt: decl.acceptedAt,
          declarationText: decl.declarationText || DEFAULT_DECLARATION_TEXT,
        }}
      />
    </div>
  );
};
