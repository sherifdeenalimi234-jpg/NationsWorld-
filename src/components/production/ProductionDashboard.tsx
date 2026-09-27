import React, { useState } from 'react';
import type {
  DocumentDraft,
  DocumentCategory,
  TemplateDefinition,
} from '../../types/production';
import {
  PRODUCTION_TEMPLATES,
  getTemplatesByCategory,
} from '../../templates/productionTemplates';
import { generateDocumentReference } from '../../utils/documentRef';
import {
  saveDraft,
  getAllDrafts,
  parseImportedJson,
} from '../../utils/productionStorage';
import { DocumentEditor } from './DocumentEditor';
import { LocalDraftsManager } from './LocalDraftsManager';
import { PdfResultScreen } from './PdfResultScreen';
import {
  PlusCircle,
  FolderKanban,
  FileText,
  Upload,
  Mail,
  FileSpreadsheet,
  Building,
  Award,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const ProductionDashboard: React.FC = () => {
  const [hubState, setHubState] = useState<
    'dashboard' | 'categories' | 'editor' | 'drafts' | 'result' | 'help'
  >('dashboard');

  const [activeDraft, setActiveDraft] = useState<DocumentDraft | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');

  const handleStartTemplate = (template: TemplateDefinition) => {
    const newDraft: DocumentDraft = {
      id: 'draft_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      documentType: template.id,
      category: template.category,
      title: template.title,
      referenceNumber: generateDocumentReference(template.id),
      formData: { ...template.defaultFormData },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      templateVersion: '1.0',
    };

    saveDraft(newDraft);
    setActiveDraft(newDraft);
    setHubState('editor');
  };

  const handleEditDraft = (draft: DocumentDraft) => {
    setActiveDraft(draft);
    setHubState('editor');
  };

  const handleSaveActiveDraft = () => {
    if (activeDraft) {
      saveDraft(activeDraft);
    }
  };

  const handleGeneratePdf = () => {
    if (activeDraft) {
      saveDraft(activeDraft);
      setHubState('result');
    }
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target?.result as string;
        const imported = parseImportedJson(content);
        if (imported) {
          setActiveDraft(imported);
          setHubState('editor');
        } else {
          alert('Invalid draft JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const draftCount = getAllDrafts().length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-nw-dark pb-16">
      {/* VIEW 1: EDITOR */}
      {hubState === 'editor' && activeDraft && (
        <DocumentEditor
          draft={activeDraft}
          onUpdateDraft={(updated) => setActiveDraft(updated)}
          onSave={handleSaveActiveDraft}
          onGeneratePdf={handleGeneratePdf}
          onBackToDashboard={() => setHubState('dashboard')}
        />
      )}

      {/* VIEW 2: PDF RESULT SCREEN */}
      {hubState === 'result' && activeDraft && (
        <PdfResultScreen
          draft={activeDraft}
          onSaveDraft={handleSaveActiveDraft}
          onCreateAnother={() => setHubState('categories')}
          onBackToDashboard={() => setHubState('dashboard')}
        />
      )}

      {/* VIEW 3: LOCAL DRAFTS ARCHIVE */}
      {hubState === 'drafts' && (
        <LocalDraftsManager
          onEditDraft={handleEditDraft}
          onCreateNewClick={() => setHubState('categories')}
          onBackToDashboard={() => setHubState('dashboard')}
        />
      )}

      {/* VIEW 4: CATEGORIES / TEMPLATES LIST */}
      {hubState === 'categories' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-nw-green block mb-1">
                DOCUMENT TEMPLATES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-nw-dark tracking-tight">
                SELECT A TEMPLATE
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setHubState('dashboard')}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-xs uppercase"
            >
              ← Back to Hub
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'all'
                  ? 'bg-nw-green text-white shadow-xs'
                  : 'bg-white border text-gray-700 hover:bg-slate-100'
              }`}
            >
              ALL TEMPLATES ({PRODUCTION_TEMPLATES.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('letters')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'letters'
                  ? 'bg-nw-green text-white shadow-xs'
                  : 'bg-white border text-gray-700 hover:bg-slate-100'
              }`}
            >
              OFFICIAL LETTERS
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('reports')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'reports'
                  ? 'bg-nw-green text-white shadow-xs'
                  : 'bg-white border text-gray-700 hover:bg-slate-100'
              }`}
            >
              REPORTS
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('organizational')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'organizational'
                  ? 'bg-nw-green text-white shadow-xs'
                  : 'bg-white border text-gray-700 hover:bg-slate-100'
              }`}
            >
              ORGANIZATIONAL
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('certificates')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'certificates'
                  ? 'bg-nw-green text-white shadow-xs'
                  : 'bg-white border text-gray-700 hover:bg-slate-100'
              }`}
            >
              CERTIFICATES
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedCategory === 'all'
              ? PRODUCTION_TEMPLATES
              : getTemplatesByCategory(selectedCategory as DocumentCategory)
            ).map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-nw-green hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-nw-soft text-nw-green text-[10px] font-extrabold uppercase tracking-wide">
                      {template.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {template.codePrefix}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-nw-dark mb-2 leading-snug group-hover:text-nw-green transition-colors">
                    {template.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {template.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartTemplate(template)}
                  className="w-full py-2.5 rounded-xl bg-nw-dark hover:bg-nw-green text-white font-bold text-xs uppercase tracking-wider transition shadow-xs flex items-center justify-center gap-2"
                >
                  <span>CREATE {template.title.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: HELP & PRIVACY PAGE */}
      {hubState === 'help' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-nw-dark">
              PRODUCTION HUB — HOW IT WORKS
            </h2>
            <button
              type="button"
              onClick={() => setHubState('dashboard')}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-xs"
            >
              ← Back to Hub
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-sm text-gray-700 leading-relaxed">
            <h3 className="text-base font-extrabold text-nw-green uppercase">
              Database-Free Architecture & Local Privacy
            </h3>
            <p>
              The NationsWorld Production Hub runs entirely inside your web browser. No document drafts, form inputs, or signature uploads are ever sent to or stored on external database servers.
            </p>

            <h3 className="text-base font-extrabold text-nw-green uppercase">
              Cross-Device Workflow (.JSON Drafts)
            </h3>
            <p>
              Because there is no cloud database, you can use the <strong className="font-bold">Export Draft</strong> button to download an unfinished document as a lightweight `.json` file. You can then send this file to your laptop or phone and click <strong className="font-bold">Import Draft</strong> to resume editing seamlessly.
            </p>

            <h3 className="text-base font-extrabold text-nw-green uppercase">
              Institutional Branding
            </h3>
            <p>
              All generated PDFs automatically incorporate NationsWorld colors, logo headers, footers, reference numbers, and legal disclaimer blocks without requiring manual graphic design.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 0: MAIN DASHBOARD HUB */}
      {hubState === 'dashboard' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-nw-dark via-[#0d2a1b] to-nw-dark text-white shadow-xl relative overflow-hidden border border-emerald-900/50 mb-12">
            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 block mb-2">
                NATIONSWORLD DIGITAL SECRETARIAT
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
                PRODUCTION HUB
              </h1>
              <p className="text-base sm:text-lg font-bold text-emerald-200 mb-4">
                Create. Develop. Produce.
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Create professional NationsWorld documents, reports, and materials directly from the portal. Your drafts are saved locally on this device. They are not stored on the NationsWorld server.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <button
              type="button"
              onClick={() => setHubState('categories')}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-nw-green hover:shadow-lg transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-4 group-hover:bg-nw-green group-hover:text-white transition-colors">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-nw-dark mb-1">
                  + CREATE DOCUMENT
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Start a new letter, report, proposal, or certificate.
                </p>
              </div>
              <span className="text-xs font-bold text-nw-green mt-6 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse Templates →
              </span>
            </button>

            <button
              type="button"
              onClick={() => setHubState('drafts')}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-nw-green hover:shadow-lg transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-4 group-hover:bg-nw-green group-hover:text-white transition-colors">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-nw-dark mb-1">
                    MY LOCAL DRAFTS
                  </h3>
                  {draftCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-nw-green text-white text-[10px] font-mono font-bold">
                      {draftCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  View, edit, or manage drafts saved on this device.
                </p>
              </div>
              <span className="text-xs font-bold text-nw-green mt-6 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Drafts Archive →
              </span>
            </button>

            <button
              type="button"
              onClick={() => setHubState('categories')}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-nw-green hover:shadow-lg transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-4 group-hover:bg-nw-green group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-nw-dark mb-1">
                  TEMPLATES
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  20 pre-formatted institutional document templates.
                </p>
              </div>
              <span className="text-xs font-bold text-nw-green mt-6 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Library →
              </span>
            </button>

            <label className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-nw-green hover:shadow-lg transition-all text-left flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-4 group-hover:bg-nw-green group-hover:text-white transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-nw-dark mb-1">
                  IMPORT DRAFT
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Restore an exported `.json` draft file from your device.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJsonFile}
                  className="hidden"
                />
              </div>
              <span className="text-xs font-bold text-nw-green mt-6 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Select .JSON File →
              </span>
            </label>
          </div>

          <div className="mb-12">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-nw-green mb-4">
              AVAILABLE PRODUCTION CATEGORIES
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => {
                  setSelectedCategory('letters');
                  setHubState('categories');
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-nw-green cursor-pointer transition shadow-xs"
              >
                <Mail className="w-5 h-5 text-nw-green mb-2" />
                <h4 className="text-sm font-bold text-nw-dark">Official Letters</h4>
                <p className="text-xs text-gray-500 mt-1">Official, Invitation, Appreciation, Sponsorship & Appointment</p>
              </div>

              <div
                onClick={() => {
                  setSelectedCategory('reports');
                  setHubState('categories');
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-nw-green cursor-pointer transition shadow-xs"
              >
                <FileSpreadsheet className="w-5 h-5 text-nw-green mb-2" />
                <h4 className="text-sm font-bold text-nw-dark">Reports</h4>
                <p className="text-xs text-gray-500 mt-1">General, Programme, Event, and Project Multi-page Reports</p>
              </div>

              <div
                onClick={() => {
                  setSelectedCategory('organizational');
                  setHubState('categories');
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-nw-green cursor-pointer transition shadow-xs"
              >
                <Building className="w-5 h-5 text-nw-green mb-2" />
                <h4 className="text-sm font-bold text-nw-dark">Organizational Docs</h4>
                <p className="text-xs text-gray-500 mt-1">Proposals, Memos, Notices, Public Statements & Minutes</p>
              </div>

              <div
                onClick={() => {
                  setSelectedCategory('certificates');
                  setHubState('categories');
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-nw-green cursor-pointer transition shadow-xs"
              >
                <Award className="w-5 h-5 text-nw-green mb-2" />
                <h4 className="text-sm font-bold text-nw-dark">Certificates</h4>
                <p className="text-xs text-gray-500 mt-1">Participation, Appreciation, Achievement & Fellowships</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950 text-white border border-emerald-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-300 block mb-0.5">Local Storage & Privacy Assurance</span>
              <p className="text-gray-300 leading-relaxed">
                NationsWorld Production Hub operates securely in your local browser without external cloud document storage. Drafts and generated PDFs stay strictly on your device.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
