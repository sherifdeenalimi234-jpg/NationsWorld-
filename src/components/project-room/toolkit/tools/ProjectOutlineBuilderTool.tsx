import React, { useState } from 'react';
import type { ProjectToolkitData, OutlineSection } from '../../../../types/toolkit';
import { DEFAULT_OUTLINE_SECTIONS } from '../../../../utils/toolkitStorage';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Check, Save, RotateCcw, Send } from 'lucide-react';

interface ProjectOutlineBuilderToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

export const ProjectOutlineBuilderTool: React.FC<ProjectOutlineBuilderToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const outline = toolkitData.outline || [];

  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  // Edit / Add state
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    const newSec: OutlineSection = {
      id: `sec-${Date.now()}`,
      number: outline.length + 1,
      title: `${outline.length + 1}. ${newSectionTitle.trim()}`,
      notes: '',
      isCustom: true,
    };

    onUpdateToolkitData({
      ...toolkitData,
      outline: [...outline, newSec],
    });

    setNewSectionTitle('');
    setIsAddingSection(false);
  };

  const startEdit = (sec: OutlineSection) => {
    setEditingSectionId(sec.id);
    setEditTitle(sec.title);
    setEditNotes(sec.notes);
  };

  const handleSaveEdit = () => {
    if (!editingSectionId) return;
    const updated = outline.map((s) => {
      if (s.id === editingSectionId) {
        return {
          ...s,
          title: editTitle.trim(),
          notes: editNotes.trim(),
        };
      }
      return s;
    });

    onUpdateToolkitData({
      ...toolkitData,
      outline: updated,
    });

    setEditingSectionId(null);
  };

  const handleDeleteSection = (id: string) => {
    const filtered = outline.filter((s) => s.id !== id);
    // Renumber remaining sections
    const renumbered = filtered.map((s, idx) => ({
      ...s,
      number: idx + 1,
    }));

    onUpdateToolkitData({
      ...toolkitData,
      outline: renumbered,
    });
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= outline.length) return;

    const newOutline = [...outline];
    const temp = newOutline[index];
    newOutline[index] = newOutline[targetIndex];
    newOutline[targetIndex] = temp;

    // Renumber
    const renumbered = newOutline.map((s, idx) => ({
      ...s,
      number: idx + 1,
    }));

    onUpdateToolkitData({
      ...toolkitData,
      outline: renumbered,
    });
  };

  const handleResetToDefault = () => {
    const defaultSecs: OutlineSection[] = DEFAULT_OUTLINE_SECTIONS.map((sec, idx) => ({
      id: `sec-${idx + 1}`,
      number: sec.number,
      title: sec.title,
      notes: sec.notes,
      isCustom: false,
    }));

    onUpdateToolkitData({
      ...toolkitData,
      outline: defaultSecs,
    });
  };

  const handleApplyToWorkspace = () => {
    setAppliedNotice('Outline metadata successfully updated in workspace navigation!');
    setTimeout(() => setAppliedNotice(null), 3500);
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Project Outline Builder</h2>
          <p className="text-xs text-[#64748b] mt-1">
            Build, reorder, and refine your academic project sections. Apply your custom outline structure to your workspace.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3.5 py-2 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#64748b] hover:text-[#f7faf8] border border-[#0b8f6a]/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            type="button"
            onClick={handleApplyToWorkspace}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Send className="w-3.5 h-3.5 text-[#d6b45a]" />
            <span>Apply to Workspace</span>
          </button>
        </div>
      </div>

      {/* Applied Notice Banner */}
      {appliedNotice && (
        <div className="p-4 rounded-2xl bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 text-[#f7faf8] text-xs font-medium flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#d6b45a]" />
            <span>{appliedNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setAppliedNotice(null)}
            className="text-xs text-[#64748b] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Add Section Controls */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-mono font-bold uppercase text-[#d6b45a]">
          Structure ({outline.length} Sections)
        </span>

        {!isAddingSection ? (
          <button
            type="button"
            onClick={() => setIsAddingSection(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#0b8f6a] hover:bg-[#0d9d75] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Section</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <input
              type="text"
              placeholder="e.g. Policy Feasibility Matrix"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="flex-1 bg-[#021f18] border border-[#0b8f6a]/40 rounded-xl px-3 py-1.5 text-xs text-[#f7faf8] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSection}
              className="px-3 py-1.5 bg-[#0b8f6a] text-white text-xs font-bold rounded-xl"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddingSection(false)}
              className="text-xs text-[#64748b]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {outline.map((sec, idx) => {
          const isEditing = editingSectionId === sec.id;

          if (isEditing) {
            return (
              <div key={sec.id} className="p-4 rounded-2xl bg-[#04271e] border border-[#d6b45a]/50 space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
                />
                <textarea
                  rows={2}
                  placeholder="Section scope notes or key bullet points..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSectionId(null)}
                    className="px-3 py-1 text-xs text-[#64748b]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-[#0b8f6a] text-white text-xs rounded-xl font-bold flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={sec.id}
              className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#0b8f6a]/60 transition"
            >
              <div className="flex items-start gap-3 flex-1">
                <span className="w-7 h-7 rounded-lg bg-[#0b8f6a]/20 border border-[#0b8f6a]/30 text-[#d6b45a] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {sec.number}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-serif font-bold text-[#f7faf8]">{sec.title}</h3>
                    {sec.isCustom && (
                      <span className="text-[9px] font-mono bg-[#d6b45a]/20 text-[#d6b45a] px-2 py-0.5 rounded uppercase">
                        Custom
                      </span>
                    )}
                  </div>
                  {sec.notes ? (
                    <p className="text-xs text-[#64748b] leading-relaxed">{sec.notes}</p>
                  ) : (
                    <p className="text-[11px] text-[#64748b]/60 italic">No notes added for this section.</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-[#021f18] text-[#64748b] hover:text-[#d6b45a] disabled:opacity-30 disabled:cursor-not-allowed transition"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === outline.length - 1}
                  className="p-1.5 rounded-lg bg-[#021f18] text-[#64748b] hover:text-[#d6b45a] disabled:opacity-30 disabled:cursor-not-allowed transition"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => startEdit(sec)}
                  className="p-1.5 text-[#64748b] hover:text-[#d6b45a] transition cursor-pointer"
                  title="Edit Section Title & Notes"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteSection(sec.id)}
                  className="p-1.5 text-[#64748b] hover:text-red-400 transition cursor-pointer"
                  title="Delete Section"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
