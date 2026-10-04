import React from 'react';
import type { ApplicationFormData, ValidationErrors } from '../../types';
import { HOW_HEARD_OPTIONS, PARTICIPATION_TYPES } from '../../data/teams';
import { ShieldCheck, Info } from 'lucide-react';

interface DeclarationStepProps {
  formData: ApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
  errors: ValidationErrors;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

export const DeclarationStep: React.FC<DeclarationStepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
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

  const handleParticipationTypeToggle = (type: string) => {
    setFormData((prev) => {
      const exists = prev.participationTypes.includes(type);
      const updated = exists
        ? prev.participationTypes.filter((t) => t !== type)
        : [...prev.participationTypes, type];
      return { ...prev, participationTypes: updated };
    });
  };

  const setParticipatedBefore = (val: boolean) => {
    setFormData((prev) => ({
      ...prev,
      participatedBefore: val,
      pastProgrammeName: val ? prev.pastProgrammeName : '',
    }));
  };

  const handleDeclarationChange = (field: 'declarationAccurate' | 'declarationReview', checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#063B2E] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#12A875]" />
          Step 05: Participation & Declaration
        </h2>
        <p className="text-sm text-[#374151] font-medium mt-1">
          Finalise your engagement preferences and complete the official applicant declaration.
        </p>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-1">
          22. How did you hear about NationsWorld? <span className="text-red-600">*</span>
        </label>
        <select
          name="howHeard"
          value={formData.howHeard}
          onChange={handleChange}
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 ${
            errors.howHeard ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-[#12A875]'
          }`}
        >
          <option value="">-- Select Option --</option>
          {HOW_HEARD_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.howHeard && <p className="text-xs text-red-600 font-bold mt-1">{errors.howHeard}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-2">
          23. Have you participated in a NationsWorld programme before?
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setParticipatedBefore(true)}
            className={`px-5 py-2 rounded-lg text-sm font-bold border transition ${
              formData.participatedBefore === true
                ? 'bg-[#063B2E] text-white border-[#063B2E]'
                : 'bg-white text-[#1E293B] border-slate-300 hover:bg-slate-50'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setParticipatedBefore(false)}
            className={`px-5 py-2 rounded-lg text-sm font-bold border transition ${
              formData.participatedBefore === false
                ? 'bg-[#063B2E] text-white border-[#063B2E]'
                : 'bg-white text-[#1E293B] border-slate-300 hover:bg-slate-50'
            }`}
          >
            No
          </button>
        </div>

        {formData.participatedBefore === true && (
          <div className="mt-3">
            <label className="block text-xs font-bold text-[#1E293B] mb-1">
              Programme / Event Name:
            </label>
            <input
              type="text"
              name="pastProgrammeName"
              value={formData.pastProgrammeName}
              onChange={handleChange}
              placeholder="e.g. NationsWorld Youth Innovation Summit 2025"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875]"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-2">
          24. What type of participation interests you? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {PARTICIPATION_TYPES.map((type) => {
            const checked = formData.participationTypes.includes(type);
            return (
              <label
                key={type}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                  checked
                    ? 'bg-[#8DE0BE]/30 border-[#12A875] text-[#063B2E] font-extrabold shadow-xs'
                    : 'bg-white border-slate-300 text-[#1E293B] font-semibold hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleParticipationTypeToggle(type)}
                  className="rounded text-[#12A875] focus:ring-[#12A875] w-4 h-4"
                />
                <span className="truncate">{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-8 bg-slate-50 border-2 border-[#12A875]/40 p-5 rounded-xl space-y-4 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <ShieldCheck className="w-5 h-5 text-[#12A875]" />
          <h3 className="font-extrabold text-[#063B2E] text-base">Formal Applicant Declaration</h3>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#374151] leading-relaxed italic border-l-3 border-[#12A875] pl-3 font-medium">
          "I confirm that the information provided in this application is accurate and complete to the best of my knowledge. I understand that submission of this application does not automatically constitute membership of NationsWorld. I agree to comply with applicable NationsWorld membership policies, code of conduct and programme requirements if admitted."
        </blockquote>

        <div className="space-y-3 pt-2">
          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
            formData.declarationAccurate ? 'bg-white border-[#12A875] shadow-xs' : 'bg-white border-slate-300'
          }`}>
            <input
              type="checkbox"
              checked={formData.declarationAccurate}
              onChange={(e) => handleDeclarationChange('declarationAccurate', e.target.checked)}
              className="mt-0.5 rounded text-[#12A875] focus:ring-[#12A875] w-4 h-4 shrink-0"
            />
            <div className="text-xs sm:text-sm text-[#1E293B]">
              <span className="font-bold text-[#063B2E]">I agree to the declaration above.</span>
              <span className="text-red-600 font-bold ml-1">*</span>
            </div>
          </label>
          {errors.declarationAccurate && (
            <p className="text-xs text-red-600 font-bold ml-1">{errors.declarationAccurate}</p>
          )}

          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
            formData.declarationReview ? 'bg-white border-[#12A875] shadow-xs' : 'bg-white border-slate-300'
          }`}>
            <input
              type="checkbox"
              checked={formData.declarationReview}
              onChange={(e) => handleDeclarationChange('declarationReview', e.target.checked)}
              className="mt-0.5 rounded text-[#12A875] focus:ring-[#12A875] w-4 h-4 shrink-0"
            />
            <div className="text-xs sm:text-sm text-[#1E293B]">
              <span className="font-bold text-[#063B2E]">
                I understand that NationsWorld may review this application before making a membership decision.
              </span>
              <span className="text-red-600 font-bold ml-1">*</span>
            </div>
          </label>
          {errors.declarationReview && (
            <p className="text-xs text-red-600 font-bold ml-1">{errors.declarationReview}</p>
          )}
        </div>
      </div>

      <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs text-[#374151] font-medium flex items-start gap-2">
        <Info className="w-4 h-4 text-[#12A875] shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#063B2E]">Privacy Notice:</strong> Information submitted through this application is intended for NationsWorld membership administration and review. Applicants should provide only information necessary for the application process.
        </p>
      </div>
    </div>
  );
};
