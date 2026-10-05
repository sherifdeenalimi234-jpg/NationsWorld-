import React, { useState } from 'react';
import { ShieldCheck, User, Mail, Calendar, CheckCircle2, AlertCircle, ArrowRight, Eye, Download, FileText } from 'lucide-react';
import type { ProjectSlot } from '../../data/projectsData';
import type { StoredAssignment } from '../../utils/projectRoomStorage';
import { saveDeclaration, DEFAULT_DECLARATION_TEXT } from '../../utils/projectRoomStorage';
import { downloadDeclarationPDF, formatProjectNumber } from '../../utils/declarationPdfGenerator';
import { DeclarationPreviewModal } from './DeclarationPreviewModal';

interface ProjectDeclarationProps {
  project: ProjectSlot;
  onComplete: (updatedAssignment: StoredAssignment) => void;
  onCancel?: () => void;
}

export const ProjectDeclaration: React.FC<ProjectDeclarationProps> = ({
  project,
  onComplete,
}) => {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [errors, setErrors] = useState<{ fullName?: string; contact?: string; checkbox?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedAssignment, setConfirmedAssignment] = useState<StoredAssignment | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Auto populated date
  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; contact?: string; checkbox?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!contact.trim()) {
      newErrors.contact = 'Please provide your contact information.';
    }

    if (!isChecked) {
      newErrors.checkbox = 'Please confirm the declaration before continuing.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const updated = saveDeclaration(fullName.trim(), contact.trim());
      setIsSubmitting(false);
      if (updated) {
        setConfirmedAssignment(updated);
      }
    }, 400);
  };

  const handleDownloadPDF = () => {
    if (!confirmedAssignment?.declaration) return;
    downloadDeclarationPDF({
      fullName: confirmedAssignment.declaration.fullName,
      contact: confirmedAssignment.declaration.contact,
      projectTitle: project.title,
      projectNumber: project.number,
      cycleId: confirmedAssignment.cycleId || '2026-OCTOBER',
      acceptedAt: confirmedAssignment.declaration.acceptedAt,
      declarationText: confirmedAssignment.declaration.declarationText || DEFAULT_DECLARATION_TEXT,
    });
  };

  // If confirmed, show the Declaration Confirmed / Download section
  if (confirmedAssignment && confirmedAssignment.declaration) {
    const decl = confirmedAssignment.declaration;
    const formattedProjNum = formatProjectNumber(project.number);
    const acceptedDateFormatted = new Date(decl.acceptedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 font-sans">
        <div className="bg-[#063b2e]/80 border border-[#0b8f6a]/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0b8f6a]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Success Banner Header */}
          <div className="flex items-center gap-4 border-b border-[#0b8f6a]/20 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0b8f6a]/20 border border-[#0b8f6a]/50 text-[#0b8f6a] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8 text-[#d6b45a]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d6b45a] block">
                PARTICIPANT COMMITMENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#f7faf8]">
                Participant Declaration
              </h2>
              <p className="text-xs sm:text-sm text-[#64748b] mt-1">
                Download a copy of the declaration you accepted before beginning your project.
              </p>
            </div>
          </div>

          {/* Key Declaration Status Box */}
          <div className="p-5 rounded-2xl bg-[#021f18] border border-[#0b8f6a]/30 space-y-4">
            <div className="flex items-center justify-between border-b border-[#0b8f6a]/20 pb-3">
              <span className="text-xs font-mono text-[#64748b] uppercase font-bold">Declaration Status</span>
              <span className="px-3 py-1 rounded-full bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 text-[#0b8f6a] text-xs font-bold font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d6b45a]" />
                ✓ Confirmed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#64748b] block font-mono">Participant:</span>
                <span className="font-bold text-[#f7faf8] text-sm block mt-0.5">{decl.fullName}</span>
              </div>
              <div>
                <span className="text-[#64748b] block font-mono">Contact:</span>
                <span className="font-bold text-[#f7faf8] text-xs block mt-0.5 truncate">{decl.contact}</span>
              </div>
              <div>
                <span className="text-[#64748b] block font-mono">Project:</span>
                <span className="font-bold text-[#f7faf8] text-xs block mt-0.5">{project.title}</span>
              </div>
              <div>
                <span className="text-[#64748b] block font-mono">Project Number & Cycle:</span>
                <span className="font-bold text-[#d6b45a] text-xs font-mono block mt-0.5">
                  {formattedProjNum} • {confirmedAssignment.cycleId || '2026-OCTOBER'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[#64748b] block font-mono">Accepted Date:</span>
                <span className="font-bold text-[#f7faf8] text-xs block mt-0.5">{acceptedDateFormatted}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="w-full sm:w-1/2 px-5 py-3.5 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#f7faf8] hover:text-[#d6b45a] border border-[#0b8f6a]/40 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Eye className="w-4 h-4 text-[#d6b45a]" />
              <span>Preview Declaration</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="w-full sm:w-1/2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#d6b45a]" />
              <span>Download Declaration PDF</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#0b8f6a]/20 flex justify-end">
            <button
              type="button"
              onClick={() => onComplete(confirmedAssignment)}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d6b45a] to-[#b3933b] hover:brightness-110 text-[#021f18] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2 group cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#021f18]" />
              <span>Continue to Project Brief</span>
              <ArrowRight className="w-4 h-4 text-[#021f18] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Declaration Preview Modal */}
        <DeclarationPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          declarationData={{
            fullName: decl.fullName,
            contact: decl.contact,
            projectTitle: project.title,
            projectNumber: project.number,
            cycleId: confirmedAssignment.cycleId || '2026-OCTOBER',
            acceptedAt: decl.acceptedAt,
            declarationText: decl.declarationText || DEFAULT_DECLARATION_TEXT,
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#0b8f6a]/10 border border-[#0b8f6a]/20 text-[#0b8f6a] text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4 text-[#d6b45a]" />
          <span>NationsWorld Participant Commitment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#f7faf8] tracking-tight mb-3">
          Project Declaration
        </h1>
        <p className="text-sm sm:text-base text-[#64748b] max-w-xl mx-auto">
          Before beginning your project, confirm that you understand your responsibilities as a NationsWorld participant.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-[#063b2e]/50 border border-[#0b8f6a]/30 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        {/* Project Context Summary */}
        <div className="mb-8 p-4 rounded-xl bg-[#04271e]/70 border border-[#0b8f6a]/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#64748b] font-mono">
              ASSIGNED PROJECT {String(project.number).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-serif text-[#f7faf8] mt-0.5">{project.title}</h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#0b8f6a]/20 text-[#0b8f6a] border border-[#0b8f6a]/30">
            {project.category}
          </span>
        </div>

        {/* Declaration Box */}
        <div className="mb-8 p-5 sm:p-6 rounded-xl bg-[#021f18]/80 border border-[#0b8f6a]/20 text-sm text-[#e2e8f0] leading-relaxed relative">
          <div className="absolute top-3 right-3 text-[#d6b45a]/30 font-serif text-3xl font-bold select-none pointer-events-none">
            ”
          </div>
          <p className="italic font-light tracking-wide text-gray-200">
            "I acknowledge that the project assigned to me is my responsibility. I agree to approach the project with honesty, originality, intellectual discipline and respect for credible sources. I understand that I am responsible for researching, developing and presenting my work to the required standard and within the applicable project timeline."
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Participant Info Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs uppercase tracking-wider font-semibold text-[#f7faf8] mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#d6b45a]" />
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 bg-[#04271e]/90 border ${
                  errors.fullName ? 'border-red-500/80 focus:ring-red-500/30' : 'border-[#0b8f6a]/40 focus:border-[#0b8f6a]'
                } rounded-xl text-[#f7faf8] placeholder-[#64748b] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8f6a]/30 transition-all`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <label htmlFor="contact" className="block text-xs uppercase tracking-wider font-semibold text-[#f7faf8] mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#d6b45a]" />
                Contact <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (errors.contact) setErrors({ ...errors, contact: undefined });
                }}
                placeholder="Email address or phone number"
                className={`w-full px-4 py-3 bg-[#04271e]/90 border ${
                  errors.contact ? 'border-red-500/80 focus:ring-red-500/30' : 'border-[#0b8f6a]/40 focus:border-[#0b8f6a]'
                } rounded-xl text-[#f7faf8] placeholder-[#64748b] text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8f6a]/30 transition-all`}
              />
              {errors.contact && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.contact}
                </p>
              )}
            </div>
          </div>

          {/* Date (Auto-populated) */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#f7faf8] mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#d6b45a]" />
              Date
            </label>
            <input
              type="text"
              readOnly
              value={currentDateFormatted}
              className="w-full px-4 py-3 bg-[#021f18]/60 border border-[#0b8f6a]/20 rounded-xl text-[#64748b] text-sm select-none cursor-not-allowed"
            />
          </div>

          {/* Declaration Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                    if (errors.checkbox) setErrors({ ...errors, checkbox: undefined });
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                    isChecked
                      ? 'bg-[#0b8f6a] border-[#0b8f6a] text-white'
                      : errors.checkbox
                      ? 'border-red-500 bg-red-950/20'
                      : 'border-[#0b8f6a]/50 bg-[#04271e] group-hover:border-[#0b8f6a]'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              </div>
              <span className="text-sm text-[#f7faf8] select-none font-medium leading-tight">
                I have read and agree to the Project Declaration.
              </span>
            </label>
            {errors.checkbox && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 ml-8">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.checkbox}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#0b8f6a]/20">
            <p className="text-xs text-[#64748b]">
              Your declaration will be stored locally on this device.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-[#0b8f6a]/25 focus:outline-none focus:ring-2 focus:ring-[#0b8f6a] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              <span>{isSubmitting ? 'Recording...' : 'Accept & Continue'}</span>
              <ArrowRight className="w-4 h-4 text-[#d6b45a] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
