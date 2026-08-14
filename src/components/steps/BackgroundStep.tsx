import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { ApplicationFormData, ValidationErrors } from '../../types';
import { CURRENT_STATUS_OPTIONS, HIGHEST_EDUCATION_OPTIONS, SUGGESTED_SKILLS } from '../../data/teams';
import { GraduationCap, Briefcase, Plus, X } from 'lucide-react';

interface BackgroundStepProps {
  formData: ApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
  errors: ValidationErrors;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

export const BackgroundStep: React.FC<BackgroundStepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const [customSkillInput, setCustomSkillInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (formData.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setCustomSkillInput('');
      return;
    }
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setCustomSkillInput('');
    if (errors.skills) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.skills;
        return copy;
      });
    }
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(customSkillInput);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-nw-border pb-4">
        <h2 className="text-xl font-bold text-nw-dark flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-nw-green" />
          Step 02: Education & Professional Background
        </h2>
        <p className="text-sm text-nw-muted mt-1">
          Tell us about your current academic standing, institution, field of expertise, and core skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-nw-dark mb-1">
            Current Status <span className="text-nw-error">*</span>
          </label>
          <select
            name="currentStatus"
            value={formData.currentStatus}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
              errors.currentStatus ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
            }`}
          >
            <option value="">-- Select Current Status --</option>
            {CURRENT_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.currentStatus && <p className="text-xs text-nw-error mt-1">{errors.currentStatus}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-nw-dark mb-1">
            Highest Level of Education <span className="text-nw-error">*</span>
          </label>
          <select
            name="highestEducation"
            value={formData.highestEducation}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
              errors.highestEducation ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
            }`}
          >
            <option value="">-- Select Highest Education --</option>
            {HIGHEST_EDUCATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.highestEducation && <p className="text-xs text-nw-error mt-1">{errors.highestEducation}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-nw-dark mb-1 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-nw-green" />
            Institution / Organisation <span className="text-nw-error">*</span>
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="e.g. University of Lagos / Federal Ministry"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
              errors.institution ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
            }`}
          />
          {errors.institution && <p className="text-xs text-nw-error mt-1">{errors.institution}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-nw-dark mb-1">
            Field of Study / Profession <span className="text-nw-error">*</span>
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            placeholder="e.g. Political Science / Economics / Software Engineering"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
              errors.fieldOfStudy ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
            }`}
          />
          {errors.fieldOfStudy && <p className="text-xs text-nw-error mt-1">{errors.fieldOfStudy}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-nw-dark mb-1">
          Relevant Skills <span className="text-nw-error">*</span>
        </label>
        <p className="text-xs text-nw-muted mb-2">
          Select or type skills relevant to your background. Press Enter or comma to add custom skills.
        </p>

        <div className="flex flex-wrap gap-2 mb-3 min-h-[42px] p-2 bg-white rounded-lg border border-nw-border focus-within:border-nw-green transition">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-nw-soft text-nw-deep text-xs font-semibold rounded-full border border-nw-border"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-nw-error transition"
                title={`Remove ${skill}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          <input
            type="text"
            value={customSkillInput}
            onChange={(e) => setCustomSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder={formData.skills.length === 0 ? "Type custom skill & press Enter..." : "Add more..."}
            className="flex-1 min-w-[140px] text-sm focus:outline-none bg-transparent px-1"
          />
          {customSkillInput.trim() && (
            <button
              type="button"
              onClick={() => addSkill(customSkillInput)}
              className="p-1 text-nw-green hover:bg-nw-soft rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
        {errors.skills && <p className="text-xs text-nw-error mb-2">{errors.skills}</p>}

        <div>
          <span className="text-xs font-semibold text-nw-muted block mb-1.5">Quick Suggestions:</span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_SKILLS.filter(
              (s) => !formData.skills.some((existing) => existing.toLowerCase() === s.toLowerCase())
            ).map((suggested) => (
              <button
                key={suggested}
                type="button"
                onClick={() => addSkill(suggested)}
                className="px-2.5 py-1 text-xs rounded-full bg-gray-100 hover:bg-nw-soft hover:text-nw-deep text-nw-muted transition border border-transparent hover:border-nw-border"
              >
                + {suggested}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
