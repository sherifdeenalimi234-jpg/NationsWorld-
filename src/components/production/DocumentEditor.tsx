import React, { useState } from 'react';
import type {
  DocumentDraft,
  LetterFormData,
  ReportFormData,
  OrganizationalFormData,
  CertificateFormData,
} from '../../types/production';
import { DocumentPreview } from './DocumentPreview';
import {
  Save,
  FileCheck,
  ArrowLeft,
  Eye,
  Edit3,
  Bold,
  Italic,
  List,
  Heading,
  Upload,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface DocumentEditorProps {
  draft: DocumentDraft;
  onUpdateDraft: (updated: DocumentDraft) => void;
  onSave: () => void;
  onGeneratePdf: () => void;
  onBackToDashboard: () => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  draft,
  onUpdateDraft,
  onSave,
  onGeneratePdf,
  onBackToDashboard,
}) => {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleFormDataChange = (field: string, value: any) => {
    setValidationError('');
    onUpdateDraft({
      ...draft,
      formData: {
        ...draft.formData,
        [field]: value,
      },
    });
  };

  const handleTitleChange = (newTitle: string) => {
    onUpdateDraft({
      ...draft,
      title: newTitle,
    });
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Signature image file size must be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFormDataChange('signatureImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    onSave();
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
  };

  const handleGenerateClick = () => {
    if (draft.category === 'letters') {
      const fd = draft.formData as LetterFormData;
      if (!fd.recipientName || !fd.subject) {
        setValidationError('Please enter at least Recipient Name and Subject before generating.');
        return;
      }
    } else if (draft.category === 'reports') {
      const fd = draft.formData as ReportFormData;
      if (!fd.reportTitle) {
        setValidationError('Please enter a Report Title before generating.');
        return;
      }
    } else if (draft.category === 'certificates') {
      const fd = draft.formData as CertificateFormData;
      if (!fd.recipientName || !fd.programmeOrEvent) {
        setValidationError('Please enter Recipient Name and Programme/Event for certificate.');
        return;
      }
    }

    onGeneratePdf();
  };

  const applyTextFormatting = (targetField: string, formatType: string) => {
    const currentText = (draft.formData as any)[targetField] || '';
    let inserted = '';
    if (formatType === 'bold') inserted = '**bold text**';
    else if (formatType === 'italic') inserted = '_italic text_';
    else if (formatType === 'heading') inserted = '\n### Heading Title\n';
    else if (formatType === 'bullet') inserted = '\n• Bullet point item';

    handleFormDataChange(targetField, currentText + inserted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-2xl shadow-lg mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                {draft.category.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-gray-400">
                Ref: {draft.referenceNumber}
              </span>
            </div>
            <input
              type="text"
              value={draft.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="bg-transparent text-lg sm:text-2xl font-black text-white focus:outline-none focus:border-b border-emerald-500 w-full mt-1 tracking-tight"
              placeholder="Document Title"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSaveClick}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 border border-white/10"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>SAVE DRAFT</span>
          </button>

          <button
            type="button"
            onClick={handleGenerateClick}
            className="px-5 py-2.5 rounded-xl bg-nw-green hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            <span>GENERATE PDF</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3 mb-6 bg-emerald-900/90 border border-emerald-500 text-emerald-100 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Draft successfully saved to local browser storage!</span>
        </div>
      )}

      {validationError && (
        <div className="p-3 mb-6 bg-red-900/90 border border-red-500 text-red-100 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{validationError}</span>
        </div>
      )}

      <div className="lg:hidden flex rounded-xl bg-slate-200 p-1 mb-6">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 ${
            mobileTab === 'editor' ? 'bg-nw-dark text-white shadow' : 'text-gray-700'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>FORM / EDITOR</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 ${
            mobileTab === 'preview' ? 'bg-nw-dark text-white shadow' : 'text-gray-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>LIVE PREVIEW</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div
          className={`lg:col-span-6 space-y-6 ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          {draft.category === 'letters' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-[#063B2E] uppercase tracking-wider border-b border-slate-200 pb-2">
                RECIPIENT & COMMUNIQUÉ DETAILS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as LetterFormData).recipientName || ''}
                    onChange={(e) => handleFormDataChange('recipientName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                    placeholder="e.g. Dr. Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Recipient Position
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as LetterFormData).recipientPosition || ''}
                    onChange={(e) => handleFormDataChange('recipientPosition', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                    placeholder="e.g. Executive Director"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as LetterFormData).organization || ''}
                    onChange={(e) => handleFormDataChange('organization', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                    placeholder="e.g. Global Policy Institute"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Address / Location
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as LetterFormData).address || ''}
                    onChange={(e) => handleFormDataChange('address', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                    placeholder="Lagos, Nigeria"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={(draft.formData as LetterFormData).subject || ''}
                  onChange={(e) => handleFormDataChange('subject', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-[#063B2E] focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  placeholder="SUBJECT: FORMAL COMMUNIQUÉ..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#1E293B]">
                    Letter Content (Rich Text / Paragraphs)
                  </label>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => applyTextFormatting('content', 'bold')}
                      className="p-1 hover:bg-slate-200 rounded text-[#1E293B]"
                      title="Bold text"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTextFormatting('content', 'italic')}
                      className="p-1 hover:bg-slate-200 rounded text-[#1E293B]"
                      title="Italic text"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTextFormatting('content', 'heading')}
                      className="p-1 hover:bg-slate-200 rounded text-[#1E293B]"
                      title="Add Heading"
                    >
                      <Heading className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyTextFormatting('content', 'bullet')}
                      className="p-1 hover:bg-slate-200 rounded text-[#1E293B]"
                      title="Add Bullet"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <textarea
                  rows={8}
                  value={(draft.formData as LetterFormData).content || ''}
                  onChange={(e) => handleFormDataChange('content', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none font-sans"
                  placeholder="Type letter content..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Prepared By (Name)
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as LetterFormData).preparedBy || ''}
                    onChange={(e) => handleFormDataChange('preparedBy', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                    placeholder="Amb. Emmanuel Okafor"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Position / Title
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as LetterFormData).position || ''}
                    onChange={(e) => handleFormDataChange('position', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                    placeholder="Head of Secretariat"
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Signature Image (Optional PNG/JPG)
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-nw-dark font-bold text-xs rounded-xl border border-slate-300 inline-flex items-center gap-2">
                    <Upload className="w-4 h-4 text-nw-green" />
                    <span>Upload Signature</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                  </label>
                  {(draft.formData as LetterFormData).signatureImage && (
                    <span className="text-xs font-bold text-nw-green flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Signature Uploaded
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {draft.category === 'reports' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-[#063B2E] uppercase tracking-wider border-b border-slate-200 pb-2">
                REPORT STRUCTURE & SECTIONS
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Report Title *
                </label>
                <input
                  type="text"
                  value={(draft.formData as ReportFormData).reportTitle || ''}
                  onChange={(e) => handleFormDataChange('reportTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-[#063B2E] focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  placeholder="e.g. SUSTAINABLE HUMAN CAPITAL REPORT"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Programme / Project Name
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as ReportFormData).programmeOrProject || ''}
                    onChange={(e) => handleFormDataChange('programmeOrProject', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Prepared By
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as ReportFormData).preparedBy || ''}
                    onChange={(e) => handleFormDataChange('preparedBy', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Executive Summary
                </label>
                <textarea
                  rows={3}
                  value={(draft.formData as ReportFormData).executiveSummary || ''}
                  onChange={(e) => handleFormDataChange('executiveSummary', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Introduction
                </label>
                <textarea
                  rows={3}
                  value={(draft.formData as ReportFormData).introduction || ''}
                  onChange={(e) => handleFormDataChange('introduction', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Key Activities & Execution
                </label>
                <textarea
                  rows={3}
                  value={(draft.formData as ReportFormData).activities || ''}
                  onChange={(e) => handleFormDataChange('activities', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Outcomes & Metrics
                </label>
                <textarea
                  rows={3}
                  value={(draft.formData as ReportFormData).outcomes || ''}
                  onChange={(e) => handleFormDataChange('outcomes', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Recommendations & Conclusion
                </label>
                <textarea
                  rows={3}
                  value={(draft.formData as ReportFormData).recommendations || ''}
                  onChange={(e) => handleFormDataChange('recommendations', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>
            </div>
          )}

          {draft.category === 'organizational' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-[#063B2E] uppercase tracking-wider border-b border-slate-200 pb-2">
                ORGANIZATIONAL DOCUMENT CONTENT
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  value={(draft.formData as OrganizationalFormData).documentTitle || ''}
                  onChange={(e) => handleFormDataChange('documentTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-[#063B2E] focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as OrganizationalFormData).targetAudience || ''}
                    onChange={(e) => handleFormDataChange('targetAudience', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Prepared By
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as OrganizationalFormData).preparedBy || ''}
                    onChange={(e) => handleFormDataChange('preparedBy', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Summary / Overview
                </label>
                <textarea
                  rows={3}
                  value={(draft.formData as OrganizationalFormData).summary || ''}
                  onChange={(e) => handleFormDataChange('summary', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Main Body / Details
                </label>
                <textarea
                  rows={6}
                  value={(draft.formData as OrganizationalFormData).mainBody || ''}
                  onChange={(e) => handleFormDataChange('mainBody', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Action Items / Resolutions
                </label>
                <textarea
                  rows={3}
                  value={(draft.formData as OrganizationalFormData).actionItems || ''}
                  onChange={(e) => handleFormDataChange('actionItems', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>
            </div>
          )}

          {draft.category === 'certificates' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-[#063B2E] uppercase tracking-wider border-b border-slate-200 pb-2">
                CERTIFICATE DETAILS
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={(draft.formData as CertificateFormData).recipientName || ''}
                  onChange={(e) => handleFormDataChange('recipientName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base font-extrabold text-[#063B2E] focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  placeholder="e.g. David O. Adeleke"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Programme / Event Name *
                </label>
                <input
                  type="text"
                  value={(draft.formData as CertificateFormData).programmeOrEvent || ''}
                  onChange={(e) => handleFormDataChange('programmeOrEvent', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-[#12A875] focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Achievement / Citation Statement
                </label>
                <textarea
                  rows={3}
                  value={(draft.formData as CertificateFormData).achievementTitle || ''}
                  onChange={(e) => handleFormDataChange('achievementTitle', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  placeholder="for active participation and valuable contributions..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Authorized Signatory Name
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as CertificateFormData).authorizedSignatoryName || ''}
                    onChange={(e) => handleFormDataChange('authorizedSignatoryName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">
                    Signatory Title
                  </label>
                  <input
                    type="text"
                    value={(draft.formData as CertificateFormData).authorizedSignatoryTitle || ''}
                    onChange={(e) => handleFormDataChange('authorizedSignatoryTitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#12A875]/30 focus:border-[#12A875] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold text-[#1E293B] mb-1">
                  Signatory Signature Image (Optional PNG/JPG)
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#063B2E] font-bold text-xs rounded-xl border border-slate-300 inline-flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#12A875]" />
                    <span>Upload Signature</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                  </label>
                  {(draft.formData as CertificateFormData).signatureImage && (
                    <span className="text-xs font-bold text-[#12A875] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Signature Uploaded
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className={`lg:col-span-6 sticky top-24 ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <DocumentPreview draft={draft} />
        </div>
      </div>
    </div>
  );
};
