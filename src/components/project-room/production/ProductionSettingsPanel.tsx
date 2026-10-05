import React from 'react';
import type {
  ProjectProductionSettings,
  DocumentProductionType,
  CitationStyleOption,
  PageSizeOption,
  PageOrientationOption,
} from '../../../types/projectProduction';
import { Settings, Sliders, FileText, Layout, BookOpen, Sparkles } from 'lucide-react';

interface ProductionSettingsPanelProps {
  settings: ProjectProductionSettings;
  onChangeSettings: (updated: ProjectProductionSettings) => void;
}

export const ProductionSettingsPanel: React.FC<ProductionSettingsPanelProps> = ({
  settings,
  onChangeSettings,
}) => {
  const update = (key: keyof ProjectProductionSettings, value: any) => {
    onChangeSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
        <Settings className="w-5 h-5 text-[#0B8F6A]" />
        <h3 className="text-base font-extrabold text-[#063B2E] uppercase tracking-wide">
          DOCUMENT SETTINGS
        </h3>
      </div>

      {/* METADATA FIELDS */}
      <div className="space-y-4">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B8F6A] block">
          1. DOCUMENT METADATA
        </span>

        <div>
          <label className="block text-xs font-bold text-[#063B2E] mb-1">
            Document Title
          </label>
          <input
            type="text"
            value={settings.documentTitle}
            onChange={(e) => update('documentTitle', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#1E293B] focus:outline-hidden focus:border-[#0B8F6A]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#063B2E] mb-1">
              Participant / Fellow Name
            </label>
            <input
              type="text"
              value={settings.participantName}
              onChange={(e) => update('participantName', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#1E293B] focus:outline-hidden focus:border-[#0B8F6A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#063B2E] mb-1">
              Project Number
            </label>
            <input
              type="text"
              value={settings.projectNumber}
              onChange={(e) => update('projectNumber', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#1E293B] focus:outline-hidden focus:border-[#0B8F6A]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#063B2E] mb-1">
              Document Type
            </label>
            <select
              value={settings.documentType}
              onChange={(e) => update('documentType', e.target.value as DocumentProductionType)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#063B2E] focus:outline-hidden focus:border-[#0B8F6A]"
            >
              <option value="Research Report">Research Report</option>
              <option value="Policy Brief">Policy Brief</option>
              <option value="Project Report">Project Report</option>
              <option value="Research Proposal">Research Proposal</option>
              <option value="Project Paper">Project Paper</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#063B2E] mb-1">
              Category
            </label>
            <input
              type="text"
              value={settings.projectCategory}
              onChange={(e) => update('projectCategory', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#1E293B] focus:outline-hidden focus:border-[#0B8F6A]"
            />
          </div>
        </div>
      </div>

      {/* FORMATTING & LAYOUT */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B8F6A] block flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5" />
          2. PAGE FORMAT & CITATIONS
        </span>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-extrabold text-[#063B2E] uppercase mb-1">
              Page Size
            </label>
            <select
              value={settings.pageSize}
              onChange={(e) => update('pageSize', e.target.value as PageSizeOption)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-[#063B2E]"
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-[#063B2E] uppercase mb-1">
              Orientation
            </label>
            <select
              value={settings.orientation}
              onChange={(e) => update('orientation', e.target.value as PageOrientationOption)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-[#063B2E]"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-[#063B2E] uppercase mb-1">
              Citation Style
            </label>
            <select
              value={settings.citationStyle}
              onChange={(e) => update('citationStyle', e.target.value as CitationStyleOption)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-[#063B2E]"
            >
              <option value="APA 7">APA 7</option>
              <option value="MLA 9">MLA 9</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>
        </div>
      </div>

      {/* TOGGLES & OPTIONS */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B8F6A] block flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5" />
          3. BRANDING & SECTIONS TOGGLES
        </span>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-bold text-[#063B2E]">
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D6B45A]" />
            Subtle NationsWorld Watermark
          </span>
          <input
            type="checkbox"
            checked={settings.watermark}
            onChange={(e) => update('watermark', e.target.checked)}
            className="w-4 h-4 rounded-md accent-[#0B8F6A] cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-bold text-[#063B2E]">
          <span className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#0B8F6A]" />
            Generate Table of Contents
          </span>
          <input
            type="checkbox"
            checked={settings.tableOfContents}
            onChange={(e) => update('tableOfContents', e.target.checked)}
            className="w-4 h-4 rounded-md accent-[#0B8F6A] cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-bold text-[#063B2E]">
          <span className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[#0B8F6A]" />
            Include Literature Review Notes
          </span>
          <input
            type="checkbox"
            checked={settings.includeLiteratureNotes}
            onChange={(e) => update('includeLiteratureNotes', e.target.checked)}
            className="w-4 h-4 rounded-md accent-[#0B8F6A] cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
