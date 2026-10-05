import React, { useState } from 'react';
import type { ProjectProductionSettings } from '../../../types/projectProduction';
import type { CitationItem, LiteratureMatrixItem } from '../../../types/toolkit';
import { Eye, ListTree, FileText, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface DocumentPreviewAreaProps {
  settings: ProjectProductionSettings;
  projectTitle: string;
  projectNumber: string;
  sections: Array<{ id: string; title: string; content: string }>;
  citations: CitationItem[];
  literatureMatrix: LiteratureMatrixItem[];
}

export const DocumentPreviewArea: React.FC<DocumentPreviewAreaProps> = ({
  settings,
  projectTitle,
  projectNumber,
  sections,
  citations,
  literatureMatrix,
}) => {
  const [viewMode, setViewMode] = useState<'document' | 'structure'>('document');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#0B8F6A]" />
          <h3 className="text-sm font-extrabold text-[#063B2E] uppercase tracking-wide">
            DOCUMENT PREVIEW
          </h3>
        </div>

        <div className="flex bg-slate-200 p-1 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setViewMode('document')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
              viewMode === 'document'
                ? 'bg-[#063B2E] text-white shadow-xs'
                : 'text-[#374151] hover:text-[#063B2E]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Document View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('structure')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
              viewMode === 'structure'
                ? 'bg-[#063B2E] text-white shadow-xs'
                : 'text-[#374151] hover:text-[#063B2E]'
            }`}
          >
            <ListTree className="w-3.5 h-3.5" />
            <span>Structure View</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STRUCTURE VIEW */}
      {viewMode === 'structure' && (
        <div className="p-6 bg-slate-50 space-y-3 overflow-y-auto max-h-[600px]">
          <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-2 px-1">
            <span>DOCUMENT HIERARCHY</span>
            <span>STATUS</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold text-[#063B2E]">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-[#063B2E] text-[10px] flex items-center justify-center">01</span>
              Cover Page
            </span>
            <span className="text-[10px] font-mono font-extrabold text-[#0B8F6A] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              READY
            </span>
          </div>

          {settings.tableOfContents && (
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold text-[#063B2E]">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-[#063B2E] text-[10px] flex items-center justify-center">02</span>
                Table of Contents
              </span>
              <span className="text-[10px] font-mono font-extrabold text-[#0B8F6A] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                AUTO GENERATED
              </span>
            </div>
          )}

          {sections.map((sec, idx) => {
            const raw = (sec.content || '').replace(/<[^>]*>/g, '').trim();
            const wordCount = raw ? raw.split(/\s+/).filter(Boolean).length : 0;
            const num = (settings.tableOfContents ? 3 : 2) + idx;
            const numStr = num < 10 ? `0${num}` : `${num}`;

            return (
              <div
                key={sec.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold text-[#063B2E]"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-[#063B2E] text-[10px] flex items-center justify-center shrink-0">
                    {numStr}
                  </span>
                  <span className="truncate">{sec.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-[#64748B]">{wordCount} words</span>
                  {wordCount > 20 ? (
                    <CheckCircle2 className="w-4 h-4 text-[#0B8F6A]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                  )}
                </div>
              </div>
            );
          })}

          {settings.includeLiteratureNotes && literatureMatrix.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold text-[#063B2E]">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0B8F6A]" />
                Literature Review Matrix ({literatureMatrix.length} Sources)
              </span>
              <span className="text-[10px] font-mono text-[#0B8F6A]">INCLUDED</span>
            </div>
          )}

          {citations.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold text-[#063B2E]">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0B8F6A]" />
                References & Bibliography ({citations.length} Items - {settings.citationStyle})
              </span>
              <span className="text-[10px] font-mono text-[#0B8F6A]">FORMATTED</span>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: HIGH-FIDELITY DOCUMENT CANVAS VIEW */}
      {viewMode === 'document' && (
        <div className="p-6 bg-slate-200/60 overflow-y-auto max-h-[650px] flex justify-center">
          {/* Simulated A4 Page Container */}
          <div className="bg-white max-w-[595px] w-full min-h-[750px] shadow-xl rounded-lg p-8 border border-slate-300 relative text-[#1E293B] font-sans flex flex-col justify-between">
            {/* Watermark Overlay */}
            {settings.watermark && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-25deg]">
                <div className="text-center">
                  <div className="text-6xl font-black text-[#063B2E]">NATIONSWORLD</div>
                  <div className="text-xl font-bold text-[#063B2E]">OFFICIAL RESEARCH PUBLICATION</div>
                </div>
              </div>
            )}

            {/* Simulated Header */}
            <div>
              <div className="bg-[#063B2E] text-white p-4 rounded-xl mb-6 border-b-2 border-[#D6B45A] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#D6B45A] text-[#063B2E] font-black text-[10px] flex items-center justify-center">
                      NW
                    </div>
                    <span className="text-xs font-black tracking-wide">
                      NATIONSWORLD OF VISIONARY ADVANCEMENT
                    </span>
                  </div>
                  <span className="text-[9px] text-[#8DE0BE] font-mono block mt-0.5">
                    PROJECT ROOM SECRETARIAT • {settings.referenceNumber}
                  </span>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#D6B45A]" />
              </div>

              {/* Document Category & Type */}
              <div className="mb-4">
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-100 text-[#063B2E] text-[10px] font-extrabold uppercase tracking-wide mb-2">
                  {settings.projectCategory} • {settings.documentType}
                </span>

                <h1 className="text-xl font-black text-[#063B2E] uppercase tracking-tight leading-snug">
                  {projectTitle || settings.documentTitle || 'Untitled Research Project'}
                </h1>
              </div>

              {/* Metadata Box */}
              <div className="p-4 rounded-xl bg-[#EAF7EF] border border-[#0B8F6A] text-xs space-y-1.5 mb-6">
                <div className="flex justify-between font-bold">
                  <span className="text-[#64748B]">Project Number:</span>
                  <span className="text-[#063B2E]">PROJECT {projectNumber || settings.projectNumber}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#64748B]">Author / Fellow:</span>
                  <span className="text-[#063B2E]">{settings.participantName}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#64748B]">Institution:</span>
                  <span className="text-[#063B2E]">{settings.organization}</span>
                </div>
              </div>

              {/* Sections Preview List */}
              <div className="space-y-4">
                {sections.slice(0, 3).map((sec, idx) => {
                  const text = (sec.content || '').replace(/<[^>]*>/g, '').trim();
                  const previewText = text.slice(0, 180) + (text.length > 180 ? '...' : '');

                  return (
                    <div key={sec.id} className="border-b border-slate-100 pb-3">
                      <h4 className="text-xs font-extrabold text-[#063B2E] uppercase mb-1">
                        {idx + 1}. {sec.title}
                      </h4>
                      <p className="text-[11px] text-[#374151] leading-relaxed">
                        {previewText || '[Content for this section is currently empty]'}
                      </p>
                    </div>
                  );
                })}

                {sections.length > 3 && (
                  <div className="text-center text-[10px] font-bold text-[#64748B] italic pt-2">
                    + {sections.length - 3} additional section(s) in complete document output.
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Footer */}
            <div className="pt-6 border-t border-slate-200 mt-8 flex items-center justify-between text-[9px] font-mono text-[#64748B]">
              <span>NationsWorld Project Room | Ref: {settings.referenceNumber}</span>
              <span>Page 1 of {sections.length + (settings.tableOfContents ? 2 : 1)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
