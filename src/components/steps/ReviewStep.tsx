import React from 'react';
import type { ApplicationFormData } from '../../types';
import { NATIONSWORLD_TEAMS } from '../../data/teams';
import { CheckCircle2, User, GraduationCap, Compass, FileText, ShieldCheck, Edit2, ArrowRight } from 'lucide-react';

interface ReviewStepProps {
  formData: ApplicationFormData;
  onGoToStep: (step: number) => void;
  onGenerate: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onGoToStep,
  onGenerate,
}) => {
  const getTeamName = (id: string) => {
    if (!id) return 'None Selected';
    const t = NATIONSWORLD_TEAMS.find((team) => team.id === id);
    return t ? t.name : id;
  };

  const fullName = `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`.trim();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#063B2E] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#12A875]" />
          Step 06: Review Your Application
        </h2>
        <p className="text-sm text-[#374151] font-medium mt-1">
          Please carefully inspect all submitted information below before generating your official application document.
        </p>
      </div>

      <div className="space-y-5 text-sm">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="font-extrabold text-[#063B2E] flex items-center gap-2">
              <User className="w-4 h-4 text-[#12A875]" /> 01. Personal Information
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              className="text-xs text-[#12A875] font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Full Name</span>
              <span className="font-bold text-[#1E293B]">{fullName || 'N/A'}</span>
            </div>
            {formData.preferredName && (
              <div>
                <span className="text-[#64748B] block text-xs font-semibold">Preferred Name</span>
                <span className="font-bold text-[#1E293B]">{formData.preferredName}</span>
              </div>
            )}
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Email Address</span>
              <span className="font-bold text-[#1E293B]">{formData.email || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">WhatsApp Number</span>
              <span className="font-bold text-[#1E293B]">{formData.whatsapp || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Location</span>
              <span className="font-bold text-[#1E293B]">
                {formData.city ? `${formData.city}, ` : ''}
                {formData.state ? `${formData.state}, ` : ''}
                {formData.country}
              </span>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Profile Photograph</span>
              <span className="font-bold text-[#1E293B]">
                {formData.profilePhoto ? 'Attached (Ready for PDF embedding)' : 'Not attached'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="font-extrabold text-[#063B2E] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#12A875]" /> 02. Education & Professional Background
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="text-xs text-[#12A875] font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Current Status</span>
              <span className="font-bold text-[#1E293B]">{formData.currentStatus || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Highest Education</span>
              <span className="font-bold text-[#1E293B]">{formData.highestEducation || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Institution / Organisation</span>
              <span className="font-bold text-[#1E293B]">{formData.institution || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Field of Study / Profession</span>
              <span className="font-bold text-[#1E293B]">{formData.fieldOfStudy || 'N/A'}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[#64748B] block text-xs font-semibold">Relevant Skills</span>
              <span className="font-bold text-[#1E293B]">
                {formData.skills.length > 0 ? formData.skills.join(', ') : 'None listed'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="font-extrabold text-[#063B2E] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#12A875]" /> 03. NationsWorld Team Placement
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="text-xs text-[#12A875] font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Primary Team</span>
              <span className="font-extrabold text-[#063B2E]">{getTeamName(formData.primaryTeam)}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Secondary Area</span>
              <span className="font-bold text-[#1E293B]">{getTeamName(formData.secondaryTeam)}</span>
            </div>
            {(formData.primaryTeam === 'nasdi' || formData.secondaryTeam === 'nasdi') && (
              <div className="sm:col-span-2 text-xs text-[#063B2E] bg-emerald-50 p-2.5 rounded border border-emerald-300 font-semibold italic">
                * Note: NASDI members are automatically part of the Research & Innovation Team.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="font-extrabold text-[#063B2E] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#12A875]" /> 04. Purpose, Motivation & Experience
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(4)}
              className="text-xs text-[#12A875] font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Why NationsWorld?</span>
              <p className="text-[#374151] font-medium mt-0.5 leading-relaxed">{formData.whyMember || 'N/A'}</p>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Area of Focus / Research Interest</span>
              <p className="text-[#374151] font-medium mt-0.5 leading-relaxed">{formData.areaOfInterest || 'N/A'}</p>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Skills to Contribute</span>
              <p className="text-[#374151] font-medium mt-0.5 leading-relaxed">{formData.skillsContribution || 'N/A'}</p>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Hope to Gain / Develop</span>
              <p className="text-[#374151] font-medium mt-0.5 leading-relaxed">{formData.gainOrDevelop || 'N/A'}</p>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Community Problem to Solve</span>
              <p className="text-[#374151] font-medium mt-0.5 leading-relaxed">{formData.communityProblem || 'N/A'}</p>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Previous Experience Areas</span>
              <p className="text-[#374151] font-medium mt-0.5">
                {formData.previousExperienceAreas.length > 0 ? formData.previousExperienceAreas.join(', ') : 'None'}
              </p>
            </div>
            {formData.workedOnProject && (
              <div>
                <span className="text-[#64748B] block text-xs font-semibold">Project Experience</span>
                <p className="text-[#374151] font-medium mt-0.5 leading-relaxed">{formData.projectExperienceDetails || 'Yes'}</p>
              </div>
            )}
            {formData.portfolioUrl && (
              <div>
                <span className="text-[#64748B] block text-xs font-semibold">Portfolio / Link</span>
                <a
                  href={formData.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#12A875] font-bold hover:underline break-all"
                >
                  {formData.portfolioUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="font-extrabold text-[#063B2E] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#12A875]" /> 05. Participation & Declaration Status
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(5)}
              className="text-xs text-[#12A875] font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">How heard about NationsWorld</span>
              <span className="font-bold text-[#1E293B]">{formData.howHeard || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-xs font-semibold">Prior Participation</span>
              <span className="font-bold text-[#1E293B]">
                {formData.participatedBefore === true
                  ? `Yes (${formData.pastProgrammeName || 'N/A'})`
                  : 'No'}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[#64748B] block text-xs font-semibold">Participation Preferences</span>
              <span className="font-bold text-[#1E293B]">
                {formData.participationTypes.length > 0 ? formData.participationTypes.join(', ') : 'None selected'}
              </span>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-slate-200 flex items-center gap-2 text-[#063B2E] font-extrabold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#12A875]" /> Formal Declaration Accepted & Confirmed
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onGoToStep(5)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-[#374151] font-bold text-sm hover:bg-slate-100 transition"
        >
          BACK TO EDIT
        </button>

        <button
          type="button"
          onClick={onGenerate}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#063B2E] text-white font-extrabold text-base hover:bg-[#0B3D2E] transition shadow-md flex items-center justify-center gap-2 group"
        >
          GENERATE APPLICATION
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#8DE0BE]" />
        </button>
      </div>
    </div>
  );
};
