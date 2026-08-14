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
      <div className="border-b border-nw-border pb-4">
        <h2 className="text-xl font-bold text-nw-dark flex items-center gap-2">
          <FileText className="w-5 h-5 text-nw-green" />
          Step 04: Interest & Experience
        </h2>
        <p className="text-sm text-nw-muted mt-1">
          Share your motivations, expertise, and vision for driving advancement with NationsWorld.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-1">
          14. Why do you want to become a NationsWorld member? <span className="text-nw-error">*</span>
        </label>
        <textarea
          name="whyMember"
          rows={3}
          value={formData.whyMember}
          onChange={handleChange}
          placeholder="Describe your primary motivation for joining NationsWorld..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
            errors.whyMember ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
          }`}
        />
        {errors.whyMember && <p className="text-xs text-nw-error mt-1">{errors.whyMember}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-1">
          15. What area of work, research or development are you most interested in? <span className="text-nw-error">*</span>
        </label>
        <textarea
          name="areaOfInterest"
          rows={3}
          value={formData.areaOfInterest}
          onChange={handleChange}
          placeholder="Specify the topics or domains you want to explore..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
            errors.areaOfInterest ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
          }`}
        />
        {errors.areaOfInterest && <p className="text-xs text-nw-error mt-1">{errors.areaOfInterest}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-1">
          16. What skills or experience can you contribute to NationsWorld? <span className="text-nw-error">*</span>
        </label>
        <textarea
          name="skillsContribution"
          rows={3}
          value={formData.skillsContribution}
          onChange={handleChange}
          placeholder="Highlight your key skills, knowledge, or capabilities..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
            errors.skillsContribution ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
          }`}
        />
        {errors.skillsContribution && <p className="text-xs text-nw-error mt-1">{errors.skillsContribution}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-1">
          17. What do you hope to gain or develop through NationsWorld? <span className="text-nw-error">*</span>
        </label>
        <textarea
          name="gainOrDevelop"
          rows={3}
          value={formData.gainOrDevelop}
          onChange={handleChange}
          placeholder="Describe how NationsWorld can support your personal and professional growth..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
            errors.gainOrDevelop ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
          }`}
        />
        {errors.gainOrDevelop && <p className="text-xs text-nw-error mt-1">{errors.gainOrDevelop}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-1">
          18. Describe one problem in your community, country or the world that you would like to contribute towards solving. <span className="text-nw-error">*</span>
        </label>
        <textarea
          name="communityProblem"
          rows={3}
          value={formData.communityProblem}
          onChange={handleChange}
          placeholder="Explain a specific challenge and your vision for addressing it..."
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
            errors.communityProblem ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
          }`}
        />
        {errors.communityProblem && <p className="text-xs text-nw-error mt-1">{errors.communityProblem}</p>}
      </div>

      <div className="pt-2">
        <label className="block text-sm font-semibold text-nw-dark mb-2 flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-nw-green" />
          19. Previous areas of experience (Select all that apply):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {PREVIOUS_EXPERIENCE_AREAS.map((area) => {
            const checked = formData.previousExperienceAreas.includes(area);
            return (
              <label
                key={area}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                  checked
                    ? 'bg-nw-soft border-nw-green text-nw-deep font-bold'
                    : 'bg-white border-nw-border text-nw-dark hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckboxChange(area)}
                  className="rounded text-nw-green focus:ring-nw-green w-4 h-4"
                />
                <span className="truncate">{area}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        <label className="block text-sm font-semibold text-nw-dark mb-2">
          20. Have you worked on a project, research, organisation, campaign or initiative before?
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setWorkedOnProject(true)}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${
              formData.workedOnProject === true
                ? 'bg-nw-green text-white border-nw-green font-bold'
                : 'bg-white text-nw-dark border-nw-border hover:bg-gray-50'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setWorkedOnProject(false)}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${
              formData.workedOnProject === false
                ? 'bg-nw-green text-white border-nw-green font-bold'
                : 'bg-white text-nw-dark border-nw-border hover:bg-gray-50'
            }`}
          >
            No
          </button>
        </div>

        {formData.workedOnProject === true && (
          <div className="mt-3">
            <label className="block text-xs font-semibold text-nw-dark mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-nw-green" />
              Briefly describe your experience:
            </label>
            <textarea
              name="projectExperienceDetails"
              rows={3}
              value={formData.projectExperienceDetails}
              onChange={handleChange}
              placeholder="Give a brief summary of the project, role, or initiative..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-nw-border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 focus:border-nw-green"
            />
          </div>
        )}
      </div>

      <div className="pt-2">
        <label className="block text-sm font-semibold text-nw-dark mb-1 flex items-center gap-1.5">
          <Link className="w-4 h-4 text-nw-green" />
          21. Portfolio / Evidence of Work <span className="text-nw-muted font-normal">(Optional)</span>
        </label>
        <input
          type="url"
          name="portfolioUrl"
          value={formData.portfolioUrl}
          onChange={handleChange}
          placeholder="https://... (LinkedIn, GitHub, Google Scholar, Website, Drive link)"
          className="w-full px-3.5 py-2.5 rounded-lg border border-nw-border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 focus:border-nw-green"
        />
        <p className="text-xs text-nw-muted mt-1">
          Provide a link to your publication, portfolio, CV, or online professional profile if available.
        </p>
      </div>
    </div>
  );
};
