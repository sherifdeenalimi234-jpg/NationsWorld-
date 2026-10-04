import React from 'react';
import type { ApplicationFormData, ValidationErrors } from '../../types';
import { NATIONSWORLD_TEAMS } from '../../data/teams';
import { Compass, Check, AlertCircle, Info } from 'lucide-react';

interface InterestsStepProps {
  formData: ApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
  errors: ValidationErrors;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

export const InterestsStep: React.FC<InterestsStepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const selectPrimaryTeam = (teamId: string) => {
    setFormData((prev) => {
      const secondary = prev.secondaryTeam === teamId ? '' : prev.secondaryTeam;
      return {
        ...prev,
        primaryTeam: teamId,
        secondaryTeam: secondary,
      };
    });

    if (errors.primaryTeam) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.primaryTeam;
        return copy;
      });
    }
  };

  const selectSecondaryTeam = (teamId: string) => {
    if (teamId === formData.primaryTeam) return;

    setFormData((prev) => ({
      ...prev,
      secondaryTeam: prev.secondaryTeam === teamId ? '' : teamId,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#063B2E] flex items-center gap-2">
          <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#12A875]" />
          Step 03: NationsWorld Interest
        </h2>
        <h3 className="text-base sm:text-lg font-bold text-[#063B2E] mt-2">
          Choose Your Primary NationsWorld Area
        </h3>
        <p className="text-sm text-[#374151] font-medium mt-1">
          Select the area where you would most like to contribute and develop.
        </p>
      </div>

      {errors.primaryTeam && (
        <div className="p-3 bg-red-50 border border-red-300 rounded-lg flex items-center gap-2 text-red-700 font-bold text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errors.primaryTeam}</span>
        </div>
      )}

      <div className="p-3.5 bg-[#8DE0BE]/20 border border-[#12A875]/30 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-[#12A875] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-[#374151] font-medium leading-relaxed">
          <strong className="font-extrabold text-[#063B2E]">NASDI Structural Note:</strong> Members admitted into NASDI (NationsWorld Affairs of Sustainable Development Institute) are automatically part of the Research & Innovation Team under the current NationsWorld structure.
        </p>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E293B] mb-3">
          1. Select Primary Team / Institute <span className="text-red-600">*</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {NATIONSWORLD_TEAMS.map((team) => {
            const isSelectedPrimary = formData.primaryTeam === team.id;
            const isSelectedSecondary = formData.secondaryTeam === team.id;

            return (
              <div
                key={team.id}
                onClick={() => selectPrimaryTeam(team.id)}
                className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelectedPrimary
                    ? 'border-[#12A875] bg-emerald-50/70 shadow-md ring-2 ring-[#12A875]/30'
                    : isSelectedSecondary
                    ? 'border-emerald-300 bg-slate-50'
                    : 'border-slate-200 bg-white hover:border-[#12A875]/60 hover:bg-emerald-50/20 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#063B2E] text-white">
                      {team.acronym || team.category}
                    </span>
                    {isSelectedPrimary && (
                      <span className="flex items-center gap-1 text-xs font-black text-[#063B2E] bg-white px-2 py-0.5 rounded-full border border-[#12A875] shadow-xs">
                        <Check className="w-3.5 h-3.5 text-[#12A875]" /> Primary
                      </span>
                    )}
                    {isSelectedSecondary && (
                      <span className="text-xs font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-400">
                        Secondary
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-sm text-[#063B2E] group-hover:text-[#12A875] transition-colors leading-snug">
                    {team.name}
                  </h4>
                  <p className="text-xs text-[#374151] font-medium mt-1.5 leading-relaxed">
                    {team.description}
                  </p>
                </div>

                {team.id === 'nasdi' && (
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-[#063B2E] font-bold italic">
                    * Auto-enrolled in Research & Innovation
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
          <label className="block text-sm font-bold text-[#1E293B]">
            2. Secondary Area of Interest <span className="text-[#64748B] font-semibold">(Optional)</span>
          </label>
          {formData.secondaryTeam && (
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, secondaryTeam: '' }))}
              className="text-xs text-[#64748B] hover:text-red-600 font-semibold underline self-start sm:self-auto"
            >
              Clear Secondary Area
            </button>
          )}
        </div>
        <p className="text-xs text-[#64748B] font-medium mb-3">
          Select an optional secondary team or area you would also like to participate in. Cannot be the same as primary team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {NATIONSWORLD_TEAMS.map((team) => {
            const isPrimary = formData.primaryTeam === team.id;
            const isSecondary = formData.secondaryTeam === team.id;

            return (
              <button
                type="button"
                key={`sec-${team.id}`}
                disabled={isPrimary}
                onClick={() => selectSecondaryTeam(team.id)}
                className={`px-3 py-2.5 text-xs text-left rounded-lg border transition flex items-center justify-between ${
                  isPrimary
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed font-medium'
                    : isSecondary
                    ? 'bg-[#8DE0BE]/30 border-[#12A875] text-[#063B2E] font-extrabold shadow-xs'
                    : 'bg-white text-[#1E293B] font-semibold border-slate-300 hover:border-[#12A875] hover:bg-slate-50'
                }`}
              >
                <span className="truncate pr-1">{team.name}</span>
                {isPrimary ? (
                  <span className="text-[10px] uppercase font-extrabold text-slate-400 shrink-0">(Primary)</span>
                ) : isSecondary ? (
                  <Check className="w-3.5 h-3.5 text-[#12A875] shrink-0 font-bold" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
