import React, { useState } from 'react';
import type {
  BrandingConfig,
  BrandingMode,
  ExistingBrandingChoice,
  DocumentTypeId,
} from '../../../types/documentStudio';
import {
  ShieldCheck,
  CheckSquare,
  Square,
  Sparkles,
  Info,
  AlertTriangle,
  FileCheck2,
} from 'lucide-react';

interface TransformationSelectorProps {
  selectedTypeId: DocumentTypeId | null;
  config: BrandingConfig;
  onChangeConfig: (newConfig: BrandingConfig) => void;
  onSelectAll?: () => void;
}

export const ALL_TRANSFORMATION_OPTIONS = [
  { id: 'apply-branding', label: 'Apply NationsWorld branding', defaultChecked: true },
  { id: 'reformat-document', label: 'Reformat document', defaultChecked: true },
  { id: 'organize-sections', label: 'Organize sections', defaultChecked: true },
  { id: 'clean-formatting', label: 'Clean formatting', defaultChecked: true },
  { id: 'official-typography', label: 'Apply official typography', defaultChecked: true },
  { id: 'add-header', label: 'Add organization header', defaultChecked: true },
  { id: 'add-footer', label: 'Add organization footer', defaultChecked: true },
  { id: 'add-watermark', label: 'Add watermark', defaultChecked: true },
  { id: 'add-page-numbers', label: 'Add page numbers', defaultChecked: true },
];

export const TransformationSelector: React.FC<TransformationSelectorProps> = ({
  config,
  onChangeConfig,
}) => {
  const [showFullReformatConfirm, setShowFullReformatConfirm] = useState(false);

  const handleModeSelect = (mode: BrandingMode) => {
    if (mode === 'full-reformat') {
      setShowFullReformatConfirm(true);
    } else {
      setShowFullReformatConfirm(false);
      onChangeConfig({ ...config, mode });
    }
  };

  const confirmFullReformat = () => {
    setShowFullReformatConfirm(false);
    onChangeConfig({ ...config, mode: 'full-reformat' });
  };

  const handleToggleOption = (field: keyof BrandingConfig) => {
    if (typeof config[field] === 'boolean') {
      onChangeConfig({
        ...config,
        [field]: !config[field],
      });
    }
  };

  const handleChoiceSelect = (existingBrandingChoice: ExistingBrandingChoice) => {
    onChangeConfig({ ...config, existingBrandingChoice });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-sans space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#12A875] block mb-1">
            03 TRANSFORMATION & BRANDING MODE
          </span>
          <h2 className="text-2xl font-black text-[#063B2E] tracking-tight">
            What would you like us to do?
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] mt-1 font-medium">
            "Brand it. Don't touch it." Author content is preserved as source of truth.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-emerald-50 text-[#063B2E] text-xs font-extrabold border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#12A875]" />
          <span>Golden Rule: Author Content Untouched</span>
        </div>
      </div>

      {/* Existing Branding Detected Banner */}
      {config.detectedExistingBranding && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-900">
              NationsWorld Branding Detected
            </h3>
          </div>
          <p className="text-xs font-medium text-amber-800 leading-relaxed">
            This uploaded document appears to already contain NationsWorld institutional headers or references. Select how you would like to handle branding:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {[
              {
                id: 'keep-existing',
                label: 'Keep Existing Branding (Default)',
                desc: 'Preserve existing headers and refrain from overlaying duplicate headers.',
              },
              {
                id: 'refresh-branding',
                label: 'Refresh Branding',
                desc: 'Clean existing header frames and replace with standardized high-res elements.',
              },
              {
                id: 'apply-new',
                label: 'Apply New Branding',
                desc: 'Apply full NationsWorld framing overlay regardless of existing elements.',
              },
            ].map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => handleChoiceSelect(choice.id as ExistingBrandingChoice)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  config.existingBrandingChoice === choice.id
                    ? 'border-[#063B2E] bg-white ring-2 ring-[#063B2E]/20 shadow-xs'
                    : 'border-amber-200 bg-amber-50/50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="existingBrandingChoice"
                    checked={config.existingBrandingChoice === choice.id}
                    onChange={() => handleChoiceSelect(choice.id as ExistingBrandingChoice)}
                    className="accent-[#063B2E]"
                  />
                  <span className="text-xs font-black text-[#063B2E]">
                    {choice.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {choice.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3 Core Transformation Modes */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-[#063B2E] mb-3">
          1. Select Transformation Mode
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mode A: BRAND ONLY (DEFAULT) */}
          <div
            onClick={() => handleModeSelect('brand-only')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
              config.mode === 'brand-only'
                ? 'border-[#12A875] bg-emerald-50/60 shadow-md ring-2 ring-[#12A875]/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-[#12A875] text-white text-[10px] font-black uppercase tracking-widest">
                  DEFAULT MODE
                </span>
                <FileCheck2 className="w-5 h-5 text-[#12A875]" />
              </div>
              <h4 className="text-base font-black text-[#063B2E] mb-1">
                A. BRAND ONLY
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                Preserve the original document as much as technically possible and apply NationsWorld institutional branding.
              </p>
            </div>
            <div className="pt-3 border-t border-emerald-200/60 text-[11px] text-[#063B2E] font-bold">
              ✓ Zero rewriting • Content visually recognizable
            </div>
          </div>

          {/* Mode B: BRAND + CLEAN LAYOUT */}
          <div
            onClick={() => handleModeSelect('brand-clean')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
              config.mode === 'brand-clean'
                ? 'border-[#063B2E] bg-slate-50 shadow-md ring-2 ring-[#063B2E]/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-[#063B2E] text-white text-[10px] font-black uppercase tracking-widest">
                  LAYOUT CLEANUP
                </span>
                <Sparkles className="w-5 h-5 text-[#063B2E]" />
              </div>
              <h4 className="text-base font-black text-[#063B2E] mb-1">
                B. BRAND + CLEAN LAYOUT
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                Improve visual consistency, margins, and section spacing while preserving every single word of original content.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 text-[11px] text-[#063B2E] font-bold">
              ✓ Standardized margins • No text altered
            </div>
          </div>

          {/* Mode C: FULL REFORMAT */}
          <div
            onClick={() => handleModeSelect('full-reformat')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
              config.mode === 'full-reformat'
                ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-500/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest">
                  USER CONTROLLED
                </span>
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">
                C. FULL REFORMAT
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                Reorganize visual structure to standard NationsWorld template layout while strictly retaining author wording.
              </p>
            </div>
            <div className="pt-3 border-t border-amber-200 text-[11px] text-amber-900 font-bold">
              ⚠ Structural reflow • Requires confirmation
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Full Reformat */}
      {showFullReformatConfirm && (
        <div className="p-4 rounded-2xl bg-amber-100 border border-amber-400 text-amber-950 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
              Confirm Full Reformatting Mode
            </h4>
          </div>
          <p className="text-xs font-medium leading-relaxed">
            Full reformatting may change the visual structure of your document but will not intentionally alter its written content.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={confirmFullReformat}
              className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase transition cursor-pointer"
            >
              Confirm Full Reformat
            </button>
            <button
              type="button"
              onClick={() => setShowFullReformatConfirm(false)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase transition cursor-pointer border border-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Specific Branding Options Checkboxes */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-[#063B2E] mb-3">
          2. Branding Controls
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              key: 'preserveOriginalLayout' as keyof BrandingConfig,
              label: 'Preserve original layout',
              desc: 'Keep original paragraph structure, page breaks, and formatting.',
            },
            {
              key: 'applyWatermark' as keyof BrandingConfig,
              label: 'Apply NationsWorld watermark',
              desc: 'Subtle security seal (~3.5% opacity) in background.',
            },
            {
              key: 'addHeader' as keyof BrandingConfig,
              label: 'Add NationsWorld header',
              desc: 'Official top institutional banner with emblem & tagline.',
            },
            {
              key: 'addFooter' as keyof BrandingConfig,
              label: 'Add NationsWorld footer',
              desc: 'Bottom secretariat identification line.',
            },
            {
              key: 'addPageNumbers' as keyof BrandingConfig,
              label: 'Add page numbers',
              desc: 'Sequential Page X of Y footer indicators.',
            },
          ].map((item) => {
            const isChecked = !!config[item.key];
            return (
              <div
                key={item.key}
                onClick={() => handleToggleOption(item.key)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? 'border-[#12A875] bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button type="button" className="mt-0.5 text-[#12A875] focus:outline-hidden cursor-pointer">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[#12A875]" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div>
                  <h4 className="text-xs font-extrabold text-[#063B2E]">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
