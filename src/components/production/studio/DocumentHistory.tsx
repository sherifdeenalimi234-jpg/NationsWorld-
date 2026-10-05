import React from 'react';
import type { StudioVersionRecord } from '../../../types/documentStudio';
import { History, Download, Eye, Clock, Trash2 } from 'lucide-react';

interface DocumentHistoryProps {
  historyRecords: StudioVersionRecord[];
  onPreviewVersion: (record: StudioVersionRecord) => void;
  onDownloadVersionPDF: (record: StudioVersionRecord) => void;
  onClearHistory: () => void;
}

export const DocumentHistory: React.FC<DocumentHistoryProps> = ({
  historyRecords,
  onPreviewVersion,
  onDownloadVersionPDF,
  onClearHistory,
}) => {
  if (!historyRecords || historyRecords.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs mb-8 font-sans">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-[#12A875]" />
          <h3 className="text-sm font-extrabold text-[#063B2E] uppercase tracking-wide">
            DOCUMENT VERSION HISTORY ({historyRecords.length})
          </h3>
        </div>

        <button
          type="button"
          onClick={onClearHistory}
          className="text-xs text-red-600 hover:text-red-700 font-bold transition flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {historyRecords.map((rec) => (
          <div
            key={rec.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#12A875] transition flex items-center justify-between flex-wrap gap-3"
          >
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#063B2E] text-[10px] font-extrabold font-mono">
                  v{rec.version}
                </span>
                <span className="text-xs font-extrabold text-[#063B2E]">
                  {rec.documentTitle}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#12A875]" />
                  <span>{new Date(rec.generatedAt).toLocaleString('en-GB')}</span>
                </span>
                <span className="font-mono">{rec.referenceNumber}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPreviewVersion(rec)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-[#063B2E] transition flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#12A875]" />
                <span>Re-Edit</span>
              </button>

              <button
                type="button"
                onClick={() => onDownloadVersionPDF(rec)}
                className="px-3 py-1.5 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#8DE0BE]" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
