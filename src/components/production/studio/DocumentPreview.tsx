import React, { useState } from 'react';
import type { StructuredDocumentData } from '../../../types/documentStudio';
import { UNEXTRACTED_PLACEHOLDER } from '../../../services/studioFileProcessor';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';

interface DocumentPreviewProps {
  data: StructuredDocumentData;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Simple page estimate logic
  const totalContentLength = data.sections.reduce((acc, s) => acc + (s.content?.length || 0), 0);
  const totalPages = Math.max(1, Math.ceil(totalContentLength / 1800));

  const handleZoomIn = () => setZoomLevel((z) => Math.min(150, z + 15));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(70, z - 15));
  const handleResetZoom = () => setZoomLevel(100);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 text-white shadow-xl font-sans">
      {/* Preview Navigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-[#8DE0BE]" />
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
            NATIONSWORLD INSTITUTIONAL PREVIEW
          </span>
        </div>

        {/* Zoom & Page Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-30 transition cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            <span className="px-3 text-xs font-mono font-bold text-gray-200">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-30 transition cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-slate-700 transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-gray-300" />
            </button>

            <span className="px-2 text-xs font-mono font-bold text-gray-200">
              {zoomLevel}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-slate-700 transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-gray-300" />
            </button>

            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-gray-300 transition ml-1 cursor-pointer"
              title="Fit to Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Paper Document Canvas */}
      <div className="overflow-auto max-h-[750px] p-4 bg-slate-950/60 rounded-2xl flex justify-center">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200 w-full max-w-[700px] min-h-[920px] bg-[#FAFAF8] text-[#1E293B] shadow-2xl rounded-sm p-8 sm:p-12 border border-slate-300 relative flex flex-col justify-between select-none font-sans"
        >
          {/* Subtle Security Watermark Background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035]">
            <div className="text-center transform -rotate-30">
              <div className="w-64 h-64 border-8 border-[#063B2E] rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-4xl font-black text-[#063B2E]">NW</span>
              </div>
              <p className="text-2xl font-extrabold text-[#063B2E]">
                NATIONSWORLD OF VISIONARY ADVANCEMENT
              </p>
              <p className="text-sm font-bold text-[#063B2E] mt-1">
                OFFICIAL INSTITUTIONAL DOCUMENT
              </p>
            </div>
          </div>

          <div>
            {/* Header Banner */}
            <div className="bg-[#063B2E] text-white p-4 -mx-8 sm:-mx-12 -mt-8 sm:-mt-12 mb-6 border-b-2 border-[#D6B56D] relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#D6B56D] text-[#063B2E] font-black text-xs flex items-center justify-center rounded-xs">
                    NW
                  </div>
                  <div>
                    <h1 className="text-xs sm:text-sm font-black tracking-wider text-white">
                      NATIONSWORLD OF VISIONARY ADVANCEMENT
                    </h1>
                    <p className="text-[9px] font-bold text-[#8DE0BE] tracking-widest">
                      RESEARCH • INNOVATION • DEVELOPMENT • LEADERSHIP • PRODUCTION
                    </p>
                  </div>
                </div>
                <span className="text-[9px] text-gray-300 font-medium hidden sm:inline">
                  www.nationsworld.org
                </span>
              </div>
            </div>

            {/* Document Metadata Box */}
            <div className="bg-[#EAF7EF] border border-[#12A875] rounded-lg p-3.5 mb-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#12A875]" />
              <div className="flex items-start justify-between flex-wrap gap-2 text-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#063B2E] tracking-wider block">
                    {data.docTypeId.toUpperCase().replace('-', ' ')}
                  </span>
                  {data.recipientName && (
                    <p className="font-bold text-[#1E293B] mt-0.5">
                      TO: {data.recipientName}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-[#063B2E]">
                    Ref: {data.referenceNumber}
                  </p>
                  <p className="text-[10px] text-[#64748B]">{data.date}</p>
                </div>
              </div>
            </div>

            {/* Document Title / Subject Line */}
            {data.title && (
              <div className="bg-[#F3F8F5] border border-[#D6B56D] rounded-md p-3 mb-6">
                <h2 className="text-xs font-black uppercase text-[#063B2E] leading-snug">
                  SUBJECT: {data.title}
                </h2>
              </div>
            )}

            {/* Document Content Sections */}
            <div className="space-y-5 text-xs text-[#374151] leading-relaxed">
              {data.sections.map((sec) => {
                const isUnextracted = sec.content?.trim() === UNEXTRACTED_PLACEHOLDER;
                return (
                  <div key={sec.id}>
                    {sec.key !== 'content' && sec.key !== 'salutation' && sec.key !== 'closing' && (
                      <div className="bg-[#EAF7EF] border-l-2 border-[#12A875] px-2.5 py-1 mb-2 font-bold text-[#063B2E] text-[11px] uppercase tracking-wide">
                        {sec.title}
                      </div>
                    )}

                    <div className={isUnextracted ? 'p-2 rounded bg-amber-50 border border-amber-300 text-amber-900 font-medium' : ''}>
                      {sec.content.split('\n').map((para, pIdx) => (
                        <p key={pIdx} className="mb-2">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Signature Block Preview */}
            <div className="mt-8 pt-4 border-t border-slate-200">
              <p className="text-xs text-[#374151] mb-4">Yours faithfully,</p>
              <div className="w-36 h-0.5 bg-[#12A875] mb-2" />
              <p className="text-xs font-bold text-[#063B2E]">
                {data.author || 'NationsWorld Official'}
              </p>
              <p className="text-[10px] text-[#64748B]">
                NationsWorld Secretariat Representative
              </p>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-12 pt-3 border-t border-[#D6B56D] flex items-center justify-between text-[10px] text-[#64748B]">
            <span>NationsWorld of Visionary Advancement | Official Document</span>
            <span className="font-bold text-[#063B2E]">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Visual preview matches generated vector PDF layout closely. Actual font kerning and vector page breaks adjust dynamically during PDF download.
        </span>
      </div>
    </div>
  );
};
