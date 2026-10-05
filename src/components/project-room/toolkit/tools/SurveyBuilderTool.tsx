import React, { useState } from 'react';
import type { ProjectToolkitData, SurveyQuestion, SurveyQuestionType } from '../../../../types/toolkit';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Eye, Edit2, Download, Save } from 'lucide-react';

interface SurveyBuilderToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

const QUESTION_TYPES: SurveyQuestionType[] = [
  'Short Answer',
  'Long Answer',
  'Multiple Choice',
  'Checkboxes',
  'Yes/No',
  'Rating Scale',
];

export const SurveyBuilderTool: React.FC<SurveyBuilderToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const survey = toolkitData.survey || {
    title: 'Field Research Questionnaire',
    description: 'Gathering empirical insights and stakeholder feedback.',
    questions: [],
  };

  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQId, setEditingQId] = useState<string | null>(null);

  const [qText, setQText] = useState('');
  const [qType, setQType] = useState<SurveyQuestionType>('Multiple Choice');
  const [qOptions, setQOptions] = useState<string>('Option 1, Option 2, Option 3');
  const [qRequired, setQRequired] = useState(true);

  const handleSaveSurveyMeta = (title: string, description: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      survey: {
        ...survey,
        title,
        description,
      },
    });
  };

  const handleAddQuestion = () => {
    if (!qText.trim()) return;

    const parsedOptions =
      qType === 'Multiple Choice' || qType === 'Checkboxes'
        ? qOptions.split(',').map((o) => o.trim()).filter((o) => o.length > 0)
        : qType === 'Yes/No'
        ? ['Yes', 'No']
        : qType === 'Rating Scale'
        ? ['1', '2', '3', '4', '5']
        : undefined;

    const newQ: SurveyQuestion = {
      id: `q-${Date.now()}`,
      text: qText.trim(),
      type: qType,
      options: parsedOptions,
      required: qRequired,
    };

    onUpdateToolkitData({
      ...toolkitData,
      survey: {
        ...survey,
        questions: [...survey.questions, newQ],
      },
    });

    setQText('');
    setQOptions('Option 1, Option 2, Option 3');
    setIsAddingQuestion(false);
  };

  const handleStartEdit = (q: SurveyQuestion) => {
    setEditingQId(q.id);
    setQText(q.text);
    setQType(q.type);
    setQOptions(q.options ? q.options.join(', ') : '');
    setQRequired(q.required);
  };

  const handleSaveEdit = () => {
    if (!editingQId || !qText.trim()) return;

    const parsedOptions =
      qType === 'Multiple Choice' || qType === 'Checkboxes'
        ? qOptions.split(',').map((o) => o.trim()).filter((o) => o.length > 0)
        : qType === 'Yes/No'
        ? ['Yes', 'No']
        : qType === 'Rating Scale'
        ? ['1', '2', '3', '4', '5']
        : undefined;

    const updatedQs = survey.questions.map((q) => {
      if (q.id === editingQId) {
        return {
          ...q,
          text: qText.trim(),
          type: qType,
          options: parsedOptions,
          required: qRequired,
        };
      }
      return q;
    });

    onUpdateToolkitData({
      ...toolkitData,
      survey: {
        ...survey,
        questions: updatedQs,
      },
    });

    setEditingQId(null);
  };

  const handleDeleteQuestion = (id: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      survey: {
        ...survey,
        questions: survey.questions.filter((q) => q.id !== id),
      },
    });
  };

  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= survey.questions.length) return;

    const newQs = [...survey.questions];
    const temp = newQs[index];
    newQs[index] = newQs[targetIdx];
    newQs[targetIdx] = temp;

    onUpdateToolkitData({
      ...toolkitData,
      survey: {
        ...survey,
        questions: newQs,
      },
    });
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Survey Builder</h2>
          <p className="text-xs text-[#64748b] mt-1">
            Design field survey instruments, questionnaires, and stakeholder assessments.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-[#021f18] p-1 rounded-xl border border-[#0b8f6a]/30">
            <button
              type="button"
              onClick={() => setMode('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1 cursor-pointer ${
                mode === 'edit' ? 'bg-[#0b8f6a] text-white' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1 cursor-pointer ${
                mode === 'preview' ? 'bg-[#0b8f6a] text-white' : 'text-[#64748b] hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Mode</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => alert('Export Survey instrument coming in next phase.')}
            className="px-3.5 py-2 rounded-xl bg-[#063b2e] hover:bg-[#084234] text-[#f7faf8] hover:text-[#d6b45a] border border-[#0b8f6a]/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#d6b45a]" />
            <span>Export Instrument</span>
          </button>
        </div>
      </div>

      {mode === 'edit' ? (
        /* Edit Survey Mode */
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-5 space-y-3 shadow-md">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Survey Title</label>
              <input
                type="text"
                value={survey.title}
                onChange={(e) => handleSaveSurveyMeta(e.target.value, survey.description)}
                placeholder="Survey Title..."
                className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-sm font-serif font-bold text-[#f7faf8]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Survey Description</label>
              <textarea
                rows={2}
                value={survey.description}
                onChange={(e) => handleSaveSurveyMeta(survey.title, e.target.value)}
                placeholder="Participant instructions..."
                className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
              />
            </div>
          </div>

          {/* Add Question Header */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold uppercase text-[#d6b45a]">
              Questions ({survey.questions.length})
            </span>

            {!isAddingQuestion && (
              <button
                type="button"
                onClick={() => {
                  setEditingQId(null);
                  setQText('');
                  setQOptions('Option 1, Option 2, Option 3');
                  setIsAddingQuestion(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#0b8f6a] hover:bg-[#0d9d75] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4 text-[#d6b45a]" />
                <span>Add Question</span>
              </button>
            )}
          </div>

          {/* Add / Edit Question Form */}
          {(isAddingQuestion || editingQId) && (
            <div className="p-5 rounded-2xl bg-[#04271e] border border-[#d6b45a]/40 space-y-4 animate-fade-in">
              <h4 className="text-xs font-mono font-bold uppercase text-[#d6b45a]">
                {editingQId ? 'Edit Question' : 'New Question'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Question Text *</label>
                  <input
                    type="text"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    placeholder="State your question..."
                    className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Question Type</label>
                  <select
                    value={qType}
                    onChange={(e) => setQType(e.target.value as SurveyQuestionType)}
                    className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                  >
                    {QUESTION_TYPES.map((qt) => (
                      <option key={qt} value={qt}>
                        {qt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {(qType === 'Multiple Choice' || qType === 'Checkboxes') && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">
                    Options (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={qOptions}
                    onChange={(e) => setQOptions(e.target.value)}
                    placeholder="Option A, Option B, Option C"
                    className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="req-cb"
                  checked={qRequired}
                  onChange={(e) => setQRequired(e.target.checked)}
                  className="accent-[#0b8f6a]"
                />
                <label htmlFor="req-cb" className="text-xs text-[#f7faf8]">
                  Required question
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingQuestion(false);
                    setEditingQId(null);
                  }}
                  className="px-3 py-1 text-xs text-[#64748b]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={editingQId ? handleSaveEdit : handleAddQuestion}
                  className="px-4 py-1.5 bg-[#0b8f6a] text-white text-xs font-bold rounded-xl flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Question</span>
                </button>
              </div>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-3">
            {survey.questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#0b8f6a]/60 transition"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#d6b45a]">Q{idx + 1}</span>
                    <span className="text-[9px] font-mono bg-[#0b8f6a]/20 text-[#0b8f6a] px-2 py-0.5 rounded font-bold uppercase">
                      {q.type}
                    </span>
                    {q.required && (
                      <span className="text-[9px] font-mono text-red-400 font-bold">* Required</span>
                    )}
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#f7faf8]">{q.text}</h3>
                  {q.options && (
                    <p className="text-xs text-[#64748b] font-mono">Options: {q.options.join(' • ')}</p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleMoveQuestion(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-[#021f18] text-[#64748b] disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveQuestion(idx, 'down')}
                    disabled={idx === survey.questions.length - 1}
                    className="p-1.5 rounded-lg bg-[#021f18] text-[#64748b] disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartEdit(q)}
                    className="p-1.5 text-[#64748b] hover:text-[#d6b45a]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-1.5 text-[#64748b] hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Preview Survey Mode */
        <div className="max-w-2xl mx-auto bg-[#063b2e] border border-[#0b8f6a]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-[#0b8f6a]/30 pb-4 space-y-1">
            <span className="text-[10px] font-mono text-[#d6b45a] uppercase font-bold">
              Respondent Preview
            </span>
            <h2 className="text-xl font-serif font-bold text-[#f7faf8]">{survey.title}</h2>
            <p className="text-xs text-[#64748b] leading-relaxed">{survey.description}</p>
          </div>

          <div className="space-y-6">
            {survey.questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-[#021f18] border border-[#0b8f6a]/20 space-y-2">
                <label className="text-xs font-serif font-bold text-[#f7faf8] block">
                  {idx + 1}. {q.text} {q.required && <span className="text-red-400">*</span>}
                </label>

                {q.type === 'Short Answer' && (
                  <input
                    type="text"
                    disabled
                    placeholder="Your answer..."
                    className="w-full bg-[#04271e] border border-[#0b8f6a]/20 rounded-xl p-2.5 text-xs text-[#64748b] cursor-not-allowed"
                  />
                )}

                {q.type === 'Long Answer' && (
                  <textarea
                    rows={3}
                    disabled
                    placeholder="Your response..."
                    className="w-full bg-[#04271e] border border-[#0b8f6a]/20 rounded-xl p-2.5 text-xs text-[#64748b] cursor-not-allowed"
                  />
                )}

                {q.type === 'Multiple Choice' && q.options && (
                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, oIdx) => (
                      <label key={oIdx} className="flex items-center gap-2 text-xs text-[#64748b]">
                        <input type="radio" disabled name={`preview-mc-${q.id}`} className="accent-[#0b8f6a]" />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'Checkboxes' && q.options && (
                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, oIdx) => (
                      <label key={oIdx} className="flex items-center gap-2 text-xs text-[#64748b]">
                        <input type="checkbox" disabled className="accent-[#0b8f6a]" />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'Yes/No' && (
                  <div className="flex items-center gap-4 pt-1 text-xs text-[#64748b]">
                    <label className="flex items-center gap-1.5">
                      <input type="radio" disabled name={`preview-yn-${q.id}`} className="accent-[#0b8f6a]" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input type="radio" disabled name={`preview-yn-${q.id}`} className="accent-[#0b8f6a]" />
                      <span>No</span>
                    </label>
                  </div>
                )}

                {q.type === 'Rating Scale' && (
                  <div className="flex items-center gap-3 pt-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        disabled
                        className="w-8 h-8 rounded-lg bg-[#04271e] border border-[#0b8f6a]/30 text-xs font-mono font-bold text-[#d6b45a]"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              disabled
              className="px-6 py-2.5 rounded-xl bg-[#0b8f6a] text-white text-xs font-bold opacity-60 cursor-not-allowed"
            >
              Submit Survey (Preview Only)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
