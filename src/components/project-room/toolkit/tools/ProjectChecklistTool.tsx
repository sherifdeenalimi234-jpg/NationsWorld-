import React, { useState } from 'react';
import type { ProjectToolkitData, ChecklistItem } from '../../../../types/toolkit';
import { DEFAULT_CHECKLIST_ITEMS } from '../../../../utils/toolkitStorage';
import { Plus, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';

interface ProjectChecklistToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

export const ProjectChecklistTool: React.FC<ProjectChecklistToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const items = toolkitData.checklist || [];

  const [newItemText, setNewItemText] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleItem = (id: string) => {
    const updated = items.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i));
    onUpdateToolkitData({
      ...toolkitData,
      checklist: updated,
    });
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: `chk-${Date.now()}`,
      text: newItemText.trim(),
      completed: false,
      isDefault: false,
    };

    onUpdateToolkitData({
      ...toolkitData,
      checklist: [...items, newItem],
    });

    setNewItemText('');
    setIsAddingItem(false);
  };

  const handleDeleteItem = (id: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      checklist: items.filter((i) => i.id !== id),
    });
  };

  const handleResetChecklist = () => {
    const defaultList: ChecklistItem[] = DEFAULT_CHECKLIST_ITEMS.map((text, idx) => ({
      id: `chk-${idx + 1}`,
      text,
      completed: idx === 0,
      isDefault: true,
    }));

    onUpdateToolkitData({
      ...toolkitData,
      checklist: defaultList,
    });
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Project Checklist</h2>
          <p className="text-xs text-[#64748b] mt-1">
            Track key research milestones, review steps, and submission readiness for your assigned project.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetChecklist}
          className="px-3.5 py-2 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#64748b] hover:text-[#f7faf8] border border-[#0b8f6a]/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Default List</span>
        </button>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-2xl p-6 space-y-3 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#f7faf8] font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#d6b45a]" />
            Completion Progress
          </span>
          <span className="text-[#d6b45a] font-bold">
            {completedCount} of {totalCount} completed ({progressPct}%)
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-3 bg-[#021f18] rounded-full overflow-hidden border border-[#0b8f6a]/30">
          <div
            className="h-full bg-gradient-to-r from-[#0b8f6a] to-[#d6b45a] transition-all duration-500 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Add Custom Item Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-mono font-bold uppercase text-[#d6b45a]">
          Checklist Milestones
        </span>

        {!isAddingItem ? (
          <button
            type="button"
            onClick={() => setIsAddingItem(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#0b8f6a] hover:bg-[#0d9d75] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Item</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="e.g. Conduct expert interview with district officer"
              className="flex-1 bg-[#021f18] border border-[#0b8f6a]/40 rounded-xl px-3 py-1.5 text-xs text-[#f7faf8] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1.5 bg-[#0b8f6a] text-white text-xs font-bold rounded-xl"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddingItem(false)}
              className="text-xs text-[#64748b]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
              item.completed
                ? 'bg-[#063b2e]/30 border-[#0b8f6a]/20 opacity-85'
                : 'bg-[#063b2e]/70 border-[#0b8f6a]/30 hover:border-[#0b8f6a]/60'
            }`}
          >
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggleItem(item.id)}
                className="w-5 h-5 rounded-lg accent-[#0b8f6a] cursor-pointer"
              />
              <span
                className={`text-xs font-serif ${
                  item.completed ? 'line-through text-[#64748b]' : 'text-[#f7faf8] font-bold'
                }`}
              >
                {idx + 1}. {item.text}
              </span>
            </label>

            {!item.isDefault && (
              <button
                type="button"
                onClick={() => handleDeleteItem(item.id)}
                className="p-1.5 text-[#64748b] hover:text-red-400 transition cursor-pointer shrink-0"
                title="Remove Custom Item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
