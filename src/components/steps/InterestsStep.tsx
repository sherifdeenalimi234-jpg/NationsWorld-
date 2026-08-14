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
      <div className="border-b border-nw-border pb-4">
        <h2 className="text-xl font-bold text-nw-dark flex items-center gap-2">
          <Compass className="w-5 h-5 text-nw-green" />
          Step 03: NationsWorld Interest
        </h2>
        <h3 className="text-lg font-bold text-nw-deep mt-2">
          Choose Your Primary NationsWorld Area
        </h3>
        <p className="text-sm text-nw-muted mt-1">
          Select the area where you would most like to contribute and develop.
        </p>
      </div>

      {errors.primaryTeam && (
        <div className="p-3 bg-red-50 border border-nw-error rounded-lg flex items-center gap-2 text-nw-error text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.primaryTeam}</span>
        </div>
      )}

      <div className="p-3.5 bg-nw-soft/80 border border-nw-green/30 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-nw-green shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-nw-dark">
          <strong className="font-semibold text-nw-deep">NASDI Structural Note:</strong> Members admitted into NASDI (NationsWorld Affairs of Sustainable Development Institute) are automatically part of the Research & Innovation Team under the current NationsWorld structure.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-nw-dark mb-3">
          1. Select Primary Team / Institute <span className="text-nw-error">*</span>
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
                    ? 'border-nw-green bg-nw-soft/60 shadow-md ring-2 ring-nw-green/20'
                    : isSelectedSecondary
                    ? 'border-emerald-300 bg-gray-50/80 opacity-75'
                    : 'border-nw-border bg-white hover:border-nw-green/50 hover:bg-emerald-50/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100/70 text-nw-deep">
                      {team.acronym || team.category}
                    </span>
                    {isSelectedPrimary && (
                      <span className="flex items-center gap-1 text-xs font-bold text-nw-green bg-white px-2 py-0.5 rounded-full border border-nw-green shadow-xs">
                        <Check className="w-3.5 h-3.5" /> Primary
                      </span>
                    )}
                    {isSelectedSecondary && (
                      <span className="text-xs font-medium text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                        Secondary
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-nw-dark group-hover:text-nw-green transition-colors leading-snug">
                    {team.name}
                  </h4>
                  <p className="text-xs text-nw-muted mt-1.5 leading-relaxed">
                    {team.description}
                  </p>
                </div>

                {team.id === 'nasdi' && (
                  <div className="mt-3 pt-2 border-t border-emerald-200/60 text-[11px] text-nw-deep italic">
                    * Auto-enrolled in Research & Innovation
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-nw-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-nw-dark">
            2. Secondary Area of Interest <span className="text-nw-muted font-normal">(Optional)</span>
          </label>
          {formData.secondaryTeam && (
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, secondaryTeam: '' }))}
              className="text-xs text-nw-muted hover:text-nw-error underline self-start sm:self-auto"
            >
              Clear Secondary Area
            </button>
          )}
        </div>
        <p className="text-xs text-nw-muted mb-3">
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
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                    : isSecondary
                    ? 'bg-nw-soft border-nw-green text-nw-deep font-bold shadow-xs'
                    : 'bg-white text-nw-dark border-nw-border hover:border-nw-green/50 hover:bg-gray-50'
                }`}
              >
                <span className="truncate pr-1">{team.name}</span>
                {isPrimary ? (
                  <span className="text-[10px] uppercase font-bold text-gray-400 shrink-0">(Primary)</span>
                ) : isSecondary ? (
                  <Check className="w-3.5 h-3.5 text-nw-green shrink-0" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
