import React from 'react';
import type { ApplicationFormData, ValidationErrors } from '../../types';
import { PREVIOUS_EXPERIENCE_AREAS } from '../../data/teams';
import { FileText, Link, CheckSquare, MessageSquare } from 'lucide-react';

interface ExperienceStepProps {
  formData: ApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
  errors: ValidationErrors;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCheckboxChange = (area: string) => {
    setFormData((prev) => {
      let updated: string[];
      if (area === 'None') {
        updated = prev.previousExperienceAreas.includes('None') ? [] : ['None'];
      } else {
        const withoutNone = prev.previousExperienceAreas.filter((a) => a !== 'None');
        if (withoutNone.includes(area)) {
          updated = withoutNone.filter((a) => a !== area);
        } else {
          updated = [...withoutNone, area];
        }
      }
      return { ...prev, previousExperienceAreas: updated };
    });
  };

  const setWorkedOnProject = (val: boolean) => {
    setFormData((prev) => ({
      ...prev,
      workedOnProject: val,
      projectExperienceDetails: val ? prev.projectExperienceDetails : '',
    }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#063B2E] flex items-center gap-2">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#12A875]" />
          Step 04: Interest & Experience
        </h2>
        <p className="text-sm text-[#374151] font-medium mt-1">
          Share your motivations, expertise, and vision for driving advancement with NationsWorld.
        </p>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-1">
          14. Why do you want to become a NationsWorld member? <span className="text-red-600">*</span>
        </label>
        <textarea
          name="whyMember"
          rows={3}
          value={formData.whyMember}
          onChange={handleChange}
          placeholder="Describe your primary motivation for joining NationsWorld..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
            errors.whyMember ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
          }`}
        />
        {errors.whyMember && <p className="text-xs text-red-600 font-bold mt-1">{errors.whyMember}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-1">
          15. What area of work, research or development are you most interested in? <span className="text-red-600">*</span>
        </label>
        <textarea
          name="areaOfInterest"
          rows={3}
          value={formData.areaOfInterest}
          onChange={handleChange}
          placeholder="Specify the topics or domains you want to explore..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
            errors.areaOfInterest ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
          }`}
        />
        {errors.areaOfInterest && <p className="text-xs text-red-600 font-bold mt-1">{errors.areaOfInterest}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-1">
          16. What skills or experience can you contribute to NationsWorld? <span className="text-red-600">*</span>
        </label>
        <textarea
          name="skillsContribution"
          rows={3}
          value={formData.skillsContribution}
          onChange={handleChange}
          placeholder="Highlight your key skills, knowledge, or capabilities..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
            errors.skillsContribution ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
          }`}
        />
        {errors.skillsContribution && <p className="text-xs text-red-600 font-bold mt-1">{errors.skillsContribution}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-1">
          17. What do you hope to gain or develop through NationsWorld? <span className="text-red-600">*</span>
        </label>
        <textarea
          name="gainOrDevelop"
          rows={3}
          value={formData.gainOrDevelop}
          onChange={handleChange}
          placeholder="Describe how NationsWorld can support your personal and professional growth..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
            errors.gainOrDevelop ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
          }`}
        />
        {errors.gainOrDevelop && <p className="text-xs text-red-600 font-bold mt-1">{errors.gainOrDevelop}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-1">
          18. Describe one problem in your community, country or the world that you would like to contribute towards solving. <span className="text-red-600">*</span>
        </label>
        <textarea
          name="communityProblem"
          rows={3}
          value={formData.communityProblem}
          onChange={handleChange}
          placeholder="Explain a specific challenge and your vision for addressing it..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
            errors.communityProblem ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
          }`}
        />
        {errors.communityProblem && <p className="text-xs text-red-600 font-bold mt-1">{errors.communityProblem}</p>}
      </div>

      <div className="pt-2">
        <label className="block text-sm font-bold text-[#1E293B] mb-2 flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-[#12A875]" />
          19. Previous areas of experience (Select all that apply):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {PREVIOUS_EXPERIENCE_AREAS.map((area) => {
            const checked = formData.previousExperienceAreas.includes(area);
            return (
              <label
                key={area}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                  checked
                    ? 'bg-[#8DE0BE]/30 border-[#12A875] text-[#063B2E] font-extrabold shadow-xs'
                    : 'bg-white border-slate-300 text-[#1E293B] font-semibold hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckboxChange(area)}
                  className="rounded text-[#12A875] focus:ring-[#12A875] w-4 h-4"
                />
                <span className="truncate">{area}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        <label className="block text-sm font-bold text-[#1E293B] mb-2">
          20. Have you worked on a project, research, organisation, campaign or initiative before?
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setWorkedOnProject(true)}
            className={`px-5 py-2 rounded-lg text-sm font-bold border transition ${
              formData.workedOnProject === true
                ? 'bg-[#063B2E] text-white border-[#063B2E]'
                : 'bg-white text-[#1E293B] border-slate-300 hover:bg-slate-50'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setWorkedOnProject(false)}
            className={`px-5 py-2 rounded-lg text-sm font-bold border transition ${
              formData.workedOnProject === false
                ? 'bg-[#063B2E] text-white border-[#063B2E]'
                : 'bg-white text-[#1E293B] border-slate-300 hover:bg-slate-50'
            }`}
          >
            No
          </button>
        </div>

        {formData.workedOnProject === true && (
          <div className="mt-3">
            <label className="block text-xs font-bold text-[#1E293B] mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#12A875]" />
              Briefly describe your experience:
            </label>
            <textarea
              name="projectExperienceDetails"
              rows={3}
              value={formData.projectExperienceDetails}
              onChange={handleChange}
              placeholder="Give a brief summary of the project, role, or initiative..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875]"
            />
          </div>
        )}
      </div>

      <div className="pt-2">
        <label className="block text-sm font-bold text-[#1E293B] mb-1 flex items-center gap-1.5">
          <Link className="w-4 h-4 text-[#12A875]" />
          21. Portfolio / Evidence of Work <span className="text-[#64748B] font-semibold">(Optional)</span>
        </label>
        <input
          type="url"
          name="portfolioUrl"
          value={formData.portfolioUrl}
          onChange={handleChange}
          placeholder="https://... (LinkedIn, GitHub, Google Scholar, Website, Drive link)"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875]"
        />
        <p className="text-xs text-[#64748B] font-medium mt-1">
          Provide a link to your publication, portfolio, CV, or online professional profile if available.
        </p>
      </div>
    </div>
  );
};
