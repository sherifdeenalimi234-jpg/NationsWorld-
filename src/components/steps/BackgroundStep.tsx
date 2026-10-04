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
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#063B2E] flex items-center gap-2">
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#12A875]" />
          Step 02: Education & Professional Background
        </h2>
        <p className="text-sm text-[#374151] font-medium mt-1">
          Tell us about your current academic standing, institution, field of expertise, and core skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1">
            Current Status <span className="text-red-600">*</span>
          </label>
          <select
            name="currentStatus"
            value={formData.currentStatus}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.currentStatus ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          >
            <option value="">-- Select Current Status --</option>
            {CURRENT_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.currentStatus && <p className="text-xs text-red-600 font-bold mt-1">{errors.currentStatus}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1">
            Highest Level of Education <span className="text-red-600">*</span>
          </label>
          <select
            name="highestEducation"
            value={formData.highestEducation}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.highestEducation ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          >
            <option value="">-- Select Highest Education --</option>
            {HIGHEST_EDUCATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.highestEducation && <p className="text-xs text-red-600 font-bold mt-1">{errors.highestEducation}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#12A875]" />
            Institution / Organisation <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="e.g. University of Lagos / Federal Ministry"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.institution ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          {errors.institution && <p className="text-xs text-red-600 font-bold mt-1">{errors.institution}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#1E293B] mb-1">
            Field of Study / Profession <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            placeholder="e.g. Political Science / Economics / Software Engineering"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
              errors.fieldOfStudy ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
            }`}
          />
          {errors.fieldOfStudy && <p className="text-xs text-red-600 font-bold mt-1">{errors.fieldOfStudy}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-1">
          Relevant Skills <span className="text-red-600">*</span>
        </label>
        <p className="text-xs text-[#64748B] font-medium mb-2">
          Select or type skills relevant to your background. Press Enter or comma to add custom skills.
        </p>

        <div className="flex flex-wrap gap-2 mb-3 min-h-[42px] p-2 bg-white rounded-lg border border-slate-300 focus-within:border-[#12A875] transition">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8DE0BE]/30 text-[#063B2E] text-xs font-bold rounded-full border border-[#12A875]/40"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-red-600 transition"
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
            className="flex-1 min-w-[140px] text-sm font-medium text-slate-900 focus:outline-none bg-transparent px-1 placeholder:text-slate-400"
          />
          {customSkillInput.trim() && (
            <button
              type="button"
              onClick={() => addSkill(customSkillInput)}
              className="p-1 text-[#12A875] hover:bg-emerald-50 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
        {errors.skills && <p className="text-xs text-red-600 font-bold mb-2">{errors.skills}</p>}

        <div>
          <span className="text-xs font-bold text-[#64748B] block mb-1.5">Quick Suggestions:</span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_SKILLS.filter(
              (s) => !formData.skills.some((existing) => existing.toLowerCase() === s.toLowerCase())
            ).map((suggested) => (
              <button
                key={suggested}
                type="button"
                onClick={() => addSkill(suggested)}
                className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 hover:bg-[#8DE0BE]/30 hover:text-[#063B2E] text-[#374151] transition border border-slate-200 hover:border-[#12A875]"
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
