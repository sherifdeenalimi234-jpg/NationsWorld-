import React, { useState } from 'react';
import type { StructuredDocumentData, DocumentSection } from '../../../types/documentStudio';
import { ProjectMaterialSelector } from './ProjectMaterialSelector';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
} from 'lucide-react';

interface DocumentStructureEditorProps {
  data: StructuredDocumentData;
  originalRawContent: string;
  onChange: (updated: StructuredDocumentData) => void;
}

export const DocumentStructureEditor: React.FC<DocumentStructureEditorProps> = ({
  data,
  originalRawContent,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<'metadata' | 'sections'>('sections');

  // Metadata field handlers
  const handleMetaChange = (field: keyof StructuredDocumentData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Section edit handlers
  const handleSectionChange = (id: string, field: keyof DocumentSection, value: any) => {
    const updatedSections = data.sections.map((sec) =>
      sec.id === id ? { ...sec, [field]: value } : sec
    );
    onChange({ ...data, sections: updatedSections });
  };

  const handleAddSection = () => {
    const newSec: DocumentSection = {
      id: 'sec_' + Date.now(),
      heading: 'New Custom Section',
      content: '',
      type: 'text',
      required: false,
    };
    onChange({ ...data, sections: [...data.sections, newSec] });
  };

  const handleRemoveSection = (id: string) => {
    onChange({ ...data, sections: data.sections.filter((s) => s.id !== id) });
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.sections.length) return;

    const newSections = [...data.sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;

    onChange({ ...data, sections: newSections });
  };

  const handleRestoreOriginal = () => {
    if (originalRawContent) {
      if (data.sections.length > 0) {
        const updatedSections = [...data.sections];
        updatedSections[0] = {
          ...updatedSections[0],
          content: originalRawContent,
        };
        onChange({ ...data, sections: updatedSections });
      }
    }
  };

  const handleInsertMaterial = (title: string, content: string) => {
    const newSec: DocumentSection = {
      id: 'sec_mat_' + Date.now(),
      heading: title,
      content,
      type: 'text',
      required: false,
    };
    onChange({ ...data, sections: [...data.sections, newSec] });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm font-sans">
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-200">
        <div>
          <h3 className="text-xl font-black text-[#063B2E]">
            DOCUMENT CONTENT & STRUCTURE
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Review, refine, reorder, or edit extracted document content. Fact preservation is strictly maintained.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRestoreOriginal}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Content</span>
          </button>

          <div className="flex p-1 rounded-xl bg-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('sections')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'sections'
                  ? 'bg-[#063B2E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sections ({data.sections.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('metadata')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'metadata'
                  ? 'bg-[#063B2E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Document Metadata
            </button>
          </div>
        </div>
      </div>

      {/* Project Materials Integration Panel */}
      <ProjectMaterialSelector
        cycleId={data.cycleId}
        projectId={data.projectId}
        onInsertMaterial={handleInsertMaterial}
      />

      {/* TAB 1: METADATA EDITOR */}
      {activeTab === 'metadata' && (
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-[#1E293B] mb-1">
              Document Title
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleMetaChange('title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-[#063B2E]"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-[#1E293B] mb-1">
              Reference Number
            </label>
            <input
              type="text"
              value={data.referenceNumber}
              onChange={(e) => handleMetaChange('referenceNumber', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-[#063B2E]"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-[#1E293B] mb-1">
              Document Date
            </label>
            <input
              type="text"
              value={data.date}
              onChange={(e) => handleMetaChange('date', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-[#063B2E]"
            />
          </div>

          {['official-letter', 'appointment-letter', 'invitation-letter'].includes(data.docTypeId) && (
            <>
              <div>
                <label className="block text-xs font-black uppercase text-[#1E293B] mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={data.recipient || ''}
                  onChange={(e) => handleMetaChange('recipient', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-[#063B2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#1E293B] mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={data.subject || ''}
                  onChange={(e) => handleMetaChange('subject', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-[#063B2E]"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: SECTIONS STRUCTURE EDITOR */}
      {activeTab === 'sections' && (
        <div className="py-6 space-y-4">
          {data.sections.map((sec, idx) => (
            <div
              key={sec.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 transition hover:border-slate-300"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-5 h-5 rounded-full bg-[#063B2E] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={sec.heading}
                    onChange={(e) => handleSectionChange(sec.id, 'heading', e.target.value)}
                    className="font-black text-sm text-[#063B2E] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#063B2E] focus:bg-white px-2 py-1 rounded focus:outline-hidden flex-1"
                  />
                  {sec.required && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-100 text-amber-800 shrink-0">
                      Required
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveSection(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveSection(idx, 'down')}
                    disabled={idx === data.sections.length - 1}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSection(sec.id)}
                    className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition cursor-pointer ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={sec.content}
                  onChange={(e) => handleSectionChange(sec.id, 'content', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-xs font-mono text-slate-800 leading-relaxed focus:outline-hidden focus:border-[#063B2E]"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddSection}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#063B2E] text-slate-600 hover:text-[#063B2E] text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Document Section</span>
          </button>
        </div>
      )}
    </div>
  );
};
