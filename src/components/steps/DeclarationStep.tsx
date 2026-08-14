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
      <div className="border-b border-nw-border pb-4">
        <h2 className="text-xl font-bold text-nw-dark flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-nw-green" />
          Step 05: Participation & Declaration
        </h2>
        <p className="text-sm text-nw-muted mt-1">
          Finalise your engagement preferences and complete the official applicant declaration.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-1">
          22. How did you hear about NationsWorld? <span className="text-nw-error">*</span>
        </label>
        <select
          name="howHeard"
          value={formData.howHeard}
          onChange={handleChange}
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 ${
            errors.howHeard ? 'border-nw-error bg-red-50/20' : 'border-nw-border focus:border-nw-green'
          }`}
        >
          <option value="">-- Select Option --</option>
          {HOW_HEARD_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.howHeard && <p className="text-xs text-nw-error mt-1">{errors.howHeard}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-2">
          23. Have you participated in a NationsWorld programme before?
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setParticipatedBefore(true)}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${
              formData.participatedBefore === true
                ? 'bg-nw-green text-white border-nw-green font-bold'
                : 'bg-white text-nw-dark border-nw-border hover:bg-gray-50'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setParticipatedBefore(false)}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${
              formData.participatedBefore === false
                ? 'bg-nw-green text-white border-nw-green font-bold'
                : 'bg-white text-nw-dark border-nw-border hover:bg-gray-50'
            }`}
          >
            No
          </button>
        </div>

        {formData.participatedBefore === true && (
          <div className="mt-3">
            <label className="block text-xs font-semibold text-nw-dark mb-1">
              Programme / Event Name:
            </label>
            <input
              type="text"
              name="pastProgrammeName"
              value={formData.pastProgrammeName}
              onChange={handleChange}
              placeholder="e.g. NationsWorld Youth Innovation Summit 2025"
              className="w-full px-3.5 py-2.5 rounded-lg border border-nw-border text-sm transition focus:outline-none focus:ring-2 focus:ring-nw-green/20 focus:border-nw-green"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-2">
          24. What type of participation interests you? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {PARTICIPATION_TYPES.map((type) => {
            const checked = formData.participationTypes.includes(type);
            return (
              <label
                key={type}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                  checked
                    ? 'bg-nw-soft border-nw-green text-nw-deep font-bold'
                    : 'bg-white border-nw-border text-nw-dark hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleParticipationTypeToggle(type)}
                  className="rounded text-nw-green focus:ring-nw-green w-4 h-4"
                />
                <span className="truncate">{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-8 bg-nw-soft/60 border-2 border-nw-green/40 p-5 rounded-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-nw-green/20 pb-2">
          <ShieldCheck className="w-5 h-5 text-nw-green" />
          <h3 className="font-bold text-nw-deep text-base">Formal Applicant Declaration</h3>
        </div>

        <blockquote className="text-xs sm:text-sm text-nw-dark leading-relaxed italic border-l-2 border-nw-green pl-3">
          "I confirm that the information provided in this application is accurate and complete to the best of my knowledge. I understand that submission of this application does not automatically constitute membership of NationsWorld. I agree to comply with applicable NationsWorld membership policies, code of conduct and programme requirements if admitted."
        </blockquote>

        <div className="space-y-3 pt-2">
          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
            formData.declarationAccurate ? 'bg-white border-nw-green shadow-xs' : 'bg-white/80 border-nw-border'
          }`}>
            <input
              type="checkbox"
              checked={formData.declarationAccurate}
              onChange={(e) => handleDeclarationChange('declarationAccurate', e.target.checked)}
              className="mt-0.5 rounded text-nw-green focus:ring-nw-green w-4 h-4 shrink-0"
            />
            <div className="text-xs sm:text-sm text-nw-dark">
              <span className="font-semibold text-nw-deep">I agree to the declaration above.</span>
              <span className="text-nw-error font-bold ml-1">*</span>
            </div>
          </label>
          {errors.declarationAccurate && (
            <p className="text-xs text-nw-error ml-1">{errors.declarationAccurate}</p>
          )}

          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
            formData.declarationReview ? 'bg-white border-nw-green shadow-xs' : 'bg-white/80 border-nw-border'
          }`}>
            <input
              type="checkbox"
              checked={formData.declarationReview}
              onChange={(e) => handleDeclarationChange('declarationReview', e.target.checked)}
              className="mt-0.5 rounded text-nw-green focus:ring-nw-green w-4 h-4 shrink-0"
            />
            <div className="text-xs sm:text-sm text-nw-dark">
              <span className="font-semibold text-nw-deep">
                I understand that NationsWorld may review this application before making a membership decision.
              </span>
              <span className="text-nw-error font-bold ml-1">*</span>
            </div>
          </label>
          {errors.declarationReview && (
            <p className="text-xs text-nw-error ml-1">{errors.declarationReview}</p>
          )}
        </div>
      </div>

      <div className="p-3 bg-gray-100 rounded-lg text-xs text-nw-muted flex items-start gap-2">
        <Info className="w-4 h-4 text-nw-muted shrink-0 mt-0.5" />
        <p>
          <strong>Privacy Notice:</strong> Information submitted through this application is intended for NationsWorld membership administration and review. Applicants should provide only information necessary for the application process.
        </p>
      </div>
    </div>
  );
};
