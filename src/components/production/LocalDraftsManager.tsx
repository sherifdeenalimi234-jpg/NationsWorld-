import React, { useState } from 'react';
import type { DocumentDraft } from '../../types/production';
import {
  getAllDrafts,
  deleteDraft,
  duplicateDraft,
  exportDraftToJson,
  parseImportedJson,
} from '../../utils/productionStorage';
import {
  Search,
  FileText,
  Trash2,
  Copy,
  Download,
  Upload,
  Edit,
  PlusCircle,
  HardDrive,
  Info,
} from 'lucide-react';

interface LocalDraftsManagerProps {
  onEditDraft: (draft: DocumentDraft) => void;
  onCreateNewClick: () => void;
  onBackToDashboard: () => void;
}

export const LocalDraftsManager: React.FC<LocalDraftsManagerProps> = ({
  onEditDraft,
  onCreateNewClick,
}) => {
  const [drafts, setDrafts] = useState<DocumentDraft[]>(getAllDrafts());
  const [searchQuery, setSearchQuery] = useState('');
  const [importedMessage, setImportedMessage] = useState('');

  const refreshDrafts = () => {
    setDrafts(getAllDrafts());
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete local draft "${title}"?`)) {
      deleteDraft(id);
      refreshDrafts();
    }
  };

  const handleDuplicate = (id: string) => {
    const dup = duplicateDraft(id);
    if (dup) {
      refreshDrafts();
    }
  };

  const handleExport = (draft: DocumentDraft) => {
    exportDraftToJson(draft);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonContent = event.target?.result as string;
        const imported = parseImportedJson(jsonContent);
        if (imported) {
          refreshDrafts();
          setImportedMessage(`Successfully imported draft "${imported.title}"!`);
          setTimeout(() => setImportedMessage(''), 3000);
        } else {
          alert('Invalid NationsWorld draft JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredDrafts = drafts.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-nw-green block mb-1">
            LOCAL STORAGE ARCHIVE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-nw-dark tracking-tight">
            MY LOCAL DRAFTS
          </h2>
          <p className="text-xs text-gray-600 mt-1 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-nw-green shrink-0" />
            <span>Drafts are stored securely on this browser/device without server databases.</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-nw-dark font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-xs flex items-center gap-2">
            <Upload className="w-4 h-4 text-nw-green" />
            <span>IMPORT .JSON DRAFT</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={onCreateNewClick}
            className="px-5 py-2.5 rounded-xl bg-nw-green hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>NEW DRAFT</span>
          </button>
        </div>
      </div>

      {importedMessage && (
        <div className="p-3 mb-6 bg-emerald-900 text-white text-xs font-bold rounded-xl animate-fadeIn">
          {importedMessage}
        </div>
      )}

      <div className="relative mb-6">
        <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search drafts by title, reference number, or category..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-nw-green focus:outline-none shadow-xs"
        />
      </div>

      {filteredDrafts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-extrabold text-nw-dark mb-1">
            No Local Drafts Found
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            {searchQuery
              ? 'No drafts match your search parameters.'
              : 'You have not saved any local document drafts yet on this device.'}
          </p>
          <button
            type="button"
            onClick={onCreateNewClick}
            className="px-6 py-3 rounded-xl bg-nw-dark text-white font-bold text-xs uppercase tracking-wider hover:bg-nw-green transition shadow"
          >
            CREATE YOUR FIRST DRAFT
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrafts.map((draft) => {
            const formattedDate = new Date(draft.updatedAt).toLocaleDateString(
              'en-GB',
              { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
            );

            return (
              <div
                key={draft.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-nw-soft text-nw-green text-[10px] font-extrabold uppercase tracking-wide">
                      {draft.category}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">
                      {draft.referenceNumber}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-nw-dark mb-2 leading-snug group-hover:text-nw-green transition-colors">
                    {draft.title}
                  </h3>

                  <p className="text-[11px] text-gray-400 mb-6">
                    Last edited: {formattedDate}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onEditDraft(draft)}
                    className="px-3.5 py-2 rounded-xl bg-nw-dark hover:bg-nw-green text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>EDIT</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(draft.id)}
                      className="p-2 rounded-lg text-gray-500 hover:text-nw-green hover:bg-slate-100 transition"
                      title="Duplicate Draft"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExport(draft)}
                      className="p-2 rounded-lg text-gray-500 hover:text-nw-green hover:bg-slate-100 transition"
                      title="Export .JSON Draft File"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(draft.id, draft.title)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                      title="Delete Draft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-12 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Privacy Notice — Local Device Storage</span>
          <p className="text-amber-800 leading-relaxed">
            Your document drafts are stored locally inside this specific browser&apos;s storage cache. To work across multiple computers or phones, use the <strong className="font-bold">Export .JSON</strong> button to save a draft file and <strong className="font-bold">Import .JSON</strong> on your other device.
          </p>
        </div>
      </div>
    </div>
  );
};
