import React from 'react';
import type { TransformationOption, DocumentTypeId } from '../../../types/documentStudio';
import { CheckSquare, Square, Sparkles } from 'lucide-react';

export const ALL_TRANSFORMATION_OPTIONS: TransformationOption[] = [
  {
    id: 'apply-branding',
    label: 'Apply NationsWorld branding',
    description: 'Enforce NationsWorld institutional colors, identity, and visual hierarchy.',
    defaultChecked: true,
    applicableTypes: ['all'],
    applicableDocTypes: ['official-letter', 'appointment-letter', 'invitation-letter', 'certificate', 'report', 'research-report', 'research-proposal', 'policy-brief', 'project-report', 'memo', 'press-release', 'official-notice', 'recommendation-letter', 'other'],
  },
  {
    id: 'reformat-document',
    label: 'Reformat document',
    description: 'Clean paragraph structures and standardize alignment.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'organize-sections',
    label: 'Organize sections',
    description: 'Structure content into formal institutional document sections.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'clean-formatting',
    label: 'Clean formatting',
    description: 'Strip inconsistent legacy inline fonts and tab spacing.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'official-typography',
    label: 'Apply official typography',
    description: 'Set standard Helvetica / Inter print-optimized serif/sans hierarchy.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'add-header',
    label: 'Add organization header',
    description: 'Top NationsWorld banner with gold emblem box and official tagline.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'add-footer',
    label: 'Add organization footer',
    description: 'Bottom official secretariat line and page reference number.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'add-watermark',
    label: 'Add watermark',
    description: 'Subtle security background seal and diagonal brand text (~3.5% opacity).',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'add-page-numbers',
    label: 'Add page numbers',
    description: 'Sequential "Page X of Y" footer indicators.',
    defaultChecked: true,
    applicableTypes: ['report', 'research-report', 'research-proposal', 'policy-brief', 'project-report', 'other'],
  },
  {
    id: 'table-of-contents',
    label: 'Create table of contents',
    description: 'Automated numbered section list for multi-page reports.',
    defaultChecked: true,
    applicableTypes: ['report', 'research-report', 'project-report', 'research-proposal'],
  },
  {
    id: 'standardize-headings',
    label: 'Standardize headings',
    description: 'Uppercase section headers with emerald left accent border.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'standardize-spacing',
    label: 'Standardize spacing',
    description: '1.2x line height and consistent section margin padding.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'standardize-margins',
    label: 'Standardize margins',
    description: 'Print-ready 15mm page margins with gold corner accents.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
  {
    id: 'convert-to-pdf',
    label: 'Convert to official PDF',
    description: 'Generate high-resolution vector PDF document.',
    defaultChecked: true,
    applicableTypes: ['all'],
  },
];

interface TransformationSelectorProps {
  selectedTypeId: DocumentTypeId | null;
  selectedOptionIds: string[];
  onToggleOption: (optionId: string) => void;
  onSelectAll: () => void;
}

export const TransformationSelector: React.FC<TransformationSelectorProps> = ({
  selectedTypeId,
  selectedOptionIds,
  onToggleOption,
  onSelectAll,
}) => {
  const relevantOptions = ALL_TRANSFORMATION_OPTIONS.filter((opt) => {
    if (!opt.applicableTypes || opt.applicableTypes.includes('all')) return true;
    if (!selectedTypeId) return true;
    return opt.applicableTypes.includes(selectedTypeId);
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#12A875] block mb-1">
            03 TRANSFORMATION OPTIONS
          </span>
          <h2 className="text-2xl font-black text-[#063B2E] tracking-tight">
            What would you like us to do?
          </h2>
          <p className="text-xs sm:text-sm text-[#374151] mt-1 font-medium">
            Select transformation rules to apply during document synthesis.
          </p>
        </div>

        <button
          type="button"
          onClick={onSelectAll}
          className="px-3.5 py-2 rounded-xl bg-emerald-100 text-[#063B2E] text-xs font-extrabold hover:bg-emerald-200 transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#12A875]" />
          <span>Apply All Standard Transformations</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relevantOptions.map((opt) => {
          const isChecked = selectedOptionIds.includes(opt.id);
          return (
            <div
              key={opt.id}
              onClick={() => onToggleOption(opt.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                isChecked
                  ? 'border-[#12A875] bg-emerald-50/50 shadow-xs'
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
                <h3 className="text-xs font-extrabold text-[#063B2E] mb-0.5">
                  {opt.label}
                </h3>
                <p className="text-[11px] text-[#374151] leading-relaxed font-medium">
                  {opt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
