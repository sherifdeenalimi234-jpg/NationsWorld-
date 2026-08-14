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
      <div className="border-b border-nw-border pb-4">
        <h2 className="text-xl font-bold text-nw-dark flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-nw-green" />
          Step 06: Review Your Application
        </h2>
        <p className="text-sm text-nw-muted mt-1">
          Please carefully inspect all submitted information below before generating your official application document.
        </p>
      </div>

      <div className="space-y-5 text-sm">
        <div className="bg-white rounded-xl border border-nw-border overflow-hidden shadow-xs">
          <div className="bg-nw-soft/80 px-4 py-2.5 border-b border-nw-border flex items-center justify-between">
            <span className="font-bold text-nw-deep flex items-center gap-2">
              <User className="w-4 h-4 text-nw-green" /> 01. Personal Information
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              className="text-xs text-nw-green font-semibold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-nw-muted block text-xs">Full Name</span>
              <span className="font-semibold text-nw-dark">{fullName || 'N/A'}</span>
            </div>
            {formData.preferredName && (
              <div>
                <span className="text-nw-muted block text-xs">Preferred Name</span>
                <span className="font-semibold text-nw-dark">{formData.preferredName}</span>
              </div>
            )}
            <div>
              <span className="text-nw-muted block text-xs">Email Address</span>
              <span className="font-semibold text-nw-dark">{formData.email || 'N/A'}</span>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">WhatsApp Number</span>
              <span className="font-semibold text-nw-dark">{formData.whatsapp || 'N/A'}</span>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Location</span>
              <span className="font-semibold text-nw-dark">
                {formData.city ? `${formData.city}, ` : ''}
                {formData.state ? `${formData.state}, ` : ''}
                {formData.country}
              </span>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Profile Photograph</span>
              <span className="font-semibold text-nw-dark">
                {formData.profilePhoto ? 'Attached (Ready for PDF embedding)' : 'Not attached'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-nw-border overflow-hidden shadow-xs">
          <div className="bg-nw-soft/80 px-4 py-2.5 border-b border-nw-border flex items-center justify-between">
            <span className="font-bold text-nw-deep flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-nw-green" /> 02. Education & Professional Background
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="text-xs text-nw-green font-semibold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-nw-muted block text-xs">Current Status</span>
              <span className="font-semibold text-nw-dark">{formData.currentStatus || 'N/A'}</span>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Highest Education</span>
              <span className="font-semibold text-nw-dark">{formData.highestEducation || 'N/A'}</span>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Institution / Organisation</span>
              <span className="font-semibold text-nw-dark">{formData.institution || 'N/A'}</span>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Field of Study / Profession</span>
              <span className="font-semibold text-nw-dark">{formData.fieldOfStudy || 'N/A'}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-nw-muted block text-xs">Relevant Skills</span>
              <span className="font-semibold text-nw-dark">
                {formData.skills.length > 0 ? formData.skills.join(', ') : 'None listed'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-nw-border overflow-hidden shadow-xs">
          <div className="bg-nw-soft/80 px-4 py-2.5 border-b border-nw-border flex items-center justify-between">
            <span className="font-bold text-nw-deep flex items-center gap-2">
              <Compass className="w-4 h-4 text-nw-green" /> 03. NationsWorld Team Placement
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="text-xs text-nw-green font-semibold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-nw-muted block text-xs">Primary Team</span>
              <span className="font-bold text-nw-green">{getTeamName(formData.primaryTeam)}</span>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Secondary Area</span>
              <span className="font-semibold text-nw-dark">{getTeamName(formData.secondaryTeam)}</span>
            </div>
            {(formData.primaryTeam === 'nasdi' || formData.secondaryTeam === 'nasdi') && (
              <div className="sm:col-span-2 text-xs text-nw-deep bg-emerald-50 p-2 rounded border border-emerald-200 italic">
                * Note: NASDI members are automatically part of the Research & Innovation Team.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-nw-border overflow-hidden shadow-xs">
          <div className="bg-nw-soft/80 px-4 py-2.5 border-b border-nw-border flex items-center justify-between">
            <span className="font-bold text-nw-deep flex items-center gap-2">
              <FileText className="w-4 h-4 text-nw-green" /> 04. Purpose, Motivation & Experience
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(4)}
              className="text-xs text-nw-green font-semibold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-nw-muted block text-xs">Why NationsWorld?</span>
              <p className="text-nw-dark font-medium mt-0.5">{formData.whyMember || 'N/A'}</p>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Area of Focus / Research Interest</span>
              <p className="text-nw-dark font-medium mt-0.5">{formData.areaOfInterest || 'N/A'}</p>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Skills to Contribute</span>
              <p className="text-nw-dark font-medium mt-0.5">{formData.skillsContribution || 'N/A'}</p>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Hope to Gain / Develop</span>
              <p className="text-nw-dark font-medium mt-0.5">{formData.gainOrDevelop || 'N/A'}</p>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Community Problem to Solve</span>
              <p className="text-nw-dark font-medium mt-0.5">{formData.communityProblem || 'N/A'}</p>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Previous Experience Areas</span>
              <p className="text-nw-dark font-medium mt-0.5">
                {formData.previousExperienceAreas.length > 0 ? formData.previousExperienceAreas.join(', ') : 'None'}
              </p>
            </div>
            {formData.workedOnProject && (
              <div>
                <span className="text-nw-muted block text-xs">Project Experience</span>
                <p className="text-nw-dark font-medium mt-0.5">{formData.projectExperienceDetails || 'Yes'}</p>
              </div>
            )}
            {formData.portfolioUrl && (
              <div>
                <span className="text-nw-muted block text-xs">Portfolio / Link</span>
                <a
                  href={formData.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-nw-green font-semibold hover:underline break-all"
                >
                  {formData.portfolioUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-nw-border overflow-hidden shadow-xs">
          <div className="bg-nw-soft/80 px-4 py-2.5 border-b border-nw-border flex items-center justify-between">
            <span className="font-bold text-nw-deep flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-nw-green" /> 05. Participation & Declaration Status
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(5)}
              className="text-xs text-nw-green font-semibold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-nw-muted block text-xs">How heard about NationsWorld</span>
              <span className="font-semibold text-nw-dark">{formData.howHeard || 'N/A'}</span>
            </div>
            <div>
              <span className="text-nw-muted block text-xs">Prior Participation</span>
              <span className="font-semibold text-nw-dark">
                {formData.participatedBefore === true
                  ? `Yes (${formData.pastProgrammeName || 'N/A'})`
                  : 'No'}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-nw-muted block text-xs">Participation Preferences</span>
              <span className="font-semibold text-nw-dark">
                {formData.participationTypes.length > 0 ? formData.participationTypes.join(', ') : 'None selected'}
              </span>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-gray-100 flex items-center gap-2 text-nw-green font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4" /> Formal Declaration Accepted & Confirmed
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onGoToStep(5)}
          className="w-full sm:w-auto px-6 py-3 rounded-lg border border-nw-border text-nw-dark font-semibold text-sm hover:bg-gray-100 transition"
        >
          BACK TO EDIT
        </button>

        <button
          type="button"
          onClick={onGenerate}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-nw-green text-white font-bold text-base hover:bg-nw-hover transition shadow-md flex items-center justify-center gap-2 group"
        >
          GENERATE APPLICATION
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
