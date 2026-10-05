import React, { useState } from 'react';
import type { ProjectToolkitData, ResearchQuestionInputs, ResearchQuestionItem } from '../../../../types/toolkit';
import { HelpCircle, Sparkles, Check, Bookmark, Copy, Trash2, Info } from 'lucide-react';

interface ResearchQuestionBuilderToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

export const ResearchQuestionBuilderTool: React.FC<ResearchQuestionBuilderToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const [inputs, setInputs] = useState<ResearchQuestionInputs>({
    topic: '',
    context: '',
    targetPopulation: '',
    locationSetting: '',
    mainIssue: '',
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);

  const handleInputChange = (field: keyof ResearchQuestionInputs, val: string) => {
    setInputs((prev) => ({ ...prev, [field]: val }));
  };

  const t = inputs.topic.trim() || '[Topic / Problem]';
  const c = inputs.context.trim() || '[Context]';
  const p = inputs.targetPopulation.trim() || '[Target Population]';
  const l = inputs.locationSetting.trim() || '[Location / Setting]';
  const i = inputs.mainIssue.trim() || '[Main Issue]';

  const PATTERNS = [
    {
      id: 'pat-1',
      template: 'What factors influence ______ regarding ______ among ______ in ______?',
      formatted: `What factors influence ${i} regarding ${t} among ${p} in ${l}?`,
    },
    {
      id: 'pat-2',
      template: 'How does ______ affect ______ within ______?',
      formatted: `How does ${t} affect ${i} within ${c}?`,
    },
    {
      id: 'pat-3',
      template: 'What are the challenges associated with ______ in ______?',
      formatted: `What are the challenges associated with ${i} in ${l}?`,
    },
    {
      id: 'pat-4',
      template: 'To what extent does ______ contribute to ______ regarding ______?',
      formatted: `To what extent does ${t} contribute to ${i} regarding ${p}?`,
    },
    {
      id: 'pat-5',
      template: 'How can ______ be improved in ______ through ______?',
      formatted: `How can ${i} be improved in ${l} through ${c}?`,
    },
  ];

  const handleUseQuestion = (questionText: string, patternTemplate: string) => {
    const newItem: ResearchQuestionItem = {
      id: `rq-${Date.now()}`,
      questionText,
      patternTemplate,
      selected: true,
      savedAt: new Date().toISOString(),
    };

    // Update research plan central question AND append to saved research questions list
    const updatedPlan = {
      ...toolkitData.researchPlan,
      researchQuestion: questionText,
    };

    const existingQs = toolkitData.researchQuestions || [];
    const updatedQs = [newItem, ...existingQs.map((q) => ({ ...q, selected: false }))];

    onUpdateToolkitData({
      ...toolkitData,
      researchPlan: updatedPlan,
      researchQuestions: updatedQs,
    });

    setSelectedNotice(`Question saved to your Research Plan: "${questionText.slice(0, 45)}..."`);
    setTimeout(() => setSelectedNotice(null), 3500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteSavedQuestion = (id: string) => {
    const updated = (toolkitData.researchQuestions || []).filter((q) => q.id !== id);
    onUpdateToolkitData({
      ...toolkitData,
      researchQuestions: updated,
    });
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Research Question Builder</h2>
        <p className="text-xs text-[#64748b] mt-1">
          Input your core research parameters to generate structured inquiry question patterns. Select a question to save it to your project workspace.
        </p>
      </div>

      {/* Info Notice */}
      <div className="p-4 rounded-2xl bg-[#04271e] border border-[#0b8f6a]/30 text-xs text-[#64748b] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#d6b45a] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#f7faf8] block mb-0.5">Structured Inquiry Engine</span>
          This tool generates precise academic question structures based on your input parameters. It uses structured inquiry logic to formulate clear, testable research questions.
        </div>
      </div>

      {/* Selected Notice Banner */}
      {selectedNotice && (
        <div className="p-4 rounded-2xl bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 text-[#f7faf8] text-xs font-medium flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#d6b45a]" />
            <span>{selectedNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedNotice(null)}
            className="text-xs text-[#64748b] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Inputs Form */}
      <div className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-6 space-y-4 shadow-md">
        <h3 className="text-sm font-serif font-bold text-[#f7faf8] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d6b45a]" />
          Research Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Topic / Problem *</label>
            <input
              type="text"
              placeholder="e.g. AI Governance Frameworks"
              value={inputs.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Context *</label>
            <input
              type="text"
              placeholder="e.g. Public Sector Administration"
              value={inputs.context}
              onChange={(e) => handleInputChange('context', e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Target Population</label>
            <input
              type="text"
              placeholder="e.g. Municipal Civil Servants"
              value={inputs.targetPopulation}
              onChange={(e) => handleInputChange('targetPopulation', e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Location / Setting</label>
            <input
              type="text"
              placeholder="e.g. Emerging Regional Economies"
              value={inputs.locationSetting}
              onChange={(e) => handleInputChange('locationSetting', e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a]"
            />
          </div>

          <div className="space-y-1 sm:col-span-2 lg:col-span-2">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Main Issue / Outcome *</label>
            <input
              type="text"
              placeholder="e.g. Transparent, Equitable Policy Delivery"
              value={inputs.mainIssue}
              onChange={(e) => handleInputChange('mainIssue', e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none focus:border-[#0b8f6a]"
            />
          </div>
        </div>
      </div>

      {/* Generated Patterns */}
      <div className="space-y-4">
        <h3 className="text-base font-serif font-bold text-[#f7faf8] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#d6b45a]" />
          Generated Research Question Patterns
        </h3>

        <div className="space-y-3">
          {PATTERNS.map((pat) => (
            <div
              key={pat.id}
              className="bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#0b8f6a]/60 transition"
            >
              <div className="space-y-1 flex-1">
                <span className="text-[10px] font-mono text-[#64748b] block uppercase">
                  Pattern Template
                </span>
                <p className="text-xs font-serif font-bold text-[#f7faf8] leading-relaxed">
                  "{pat.formatted}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleCopy(pat.formatted, pat.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#64748b] hover:text-[#f7faf8] border border-[#0b8f6a]/30 text-xs transition flex items-center gap-1 cursor-pointer"
                  title="Copy to clipboard"
                >
                  <Copy className="w-3.5 h-3.5 text-[#d6b45a]" />
                  <span>{copiedId === pat.id ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUseQuestion(pat.formatted, pat.template)}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Use This Question</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Questions History */}
      {toolkitData.researchQuestions && toolkitData.researchQuestions.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#0b8f6a]/20">
          <h3 className="text-base font-serif font-bold text-[#f7faf8] flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#d6b45a]" />
            Saved Research Questions
          </h3>

          <div className="space-y-2">
            {toolkitData.researchQuestions.map((q) => (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  q.selected
                    ? 'bg-[#0b8f6a]/20 border-[#0b8f6a]'
                    : 'bg-[#063b2e]/40 border-[#0b8f6a]/20'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {q.selected && (
                      <span className="text-[9px] font-mono font-bold uppercase bg-[#d6b45a] text-[#021f18] px-2 py-0.5 rounded">
                        Active Workspace Question
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-[#64748b]">
                      Saved {new Date(q.savedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#f7faf8] font-serif font-medium">"{q.questionText}"</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteSavedQuestion(q.id)}
                  className="p-1.5 text-[#64748b] hover:text-red-400 transition cursor-pointer"
                  title="Remove question"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
