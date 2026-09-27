import React from 'react';
import type { DocumentDraft } from '../../types/production';
import { generateProductionPDF } from '../../utils/productionPdfGenerator';

interface DocumentPreviewProps {
  draft: DocumentDraft;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ draft }) => {
  let pdfDataUri = '';
  try {
    const doc = generateProductionPDF(draft);
    pdfDataUri = doc.output('datauristring');
  } catch (e) {
    console.error('Failed to render live PDF preview data string:', e);
  }

  return (
    <div className="w-full h-full min-h-[600px] flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
      <div className="p-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            LIVE DOCUMENT PREVIEW
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
          {draft.referenceNumber}
        </span>
      </div>

      <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden flex items-center justify-center">
        {pdfDataUri ? (
          <iframe
            src={pdfDataUri}
            title="NationsWorld Live Document Preview"
            className="w-full h-full min-h-[550px] rounded-lg border border-slate-800 bg-white"
          />
        ) : (
          <div className="text-center p-8 text-gray-400 text-sm">
            Generating document preview...
          </div>
        )}
      </div>
    </div>
  );
};
