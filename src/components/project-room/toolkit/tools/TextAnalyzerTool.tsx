import React, { useState } from 'react';
import type { ProjectToolkitData } from '../../../../types/toolkit';
import { PROJECTS_DATA } from '../../../../data/projectsData';
import { FileSpreadsheet, Sparkles, Clock, RefreshCw } from 'lucide-react';

interface TextAnalyzerToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

export const TextAnalyzerTool: React.FC<TextAnalyzerToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const [text, setText] = useState(toolkitData.textAnalysis?.sourceText || '');

  const handleTextChange = (newVal: string) => {
    setText(newVal);
    onUpdateToolkitData({
      ...toolkitData,
      textAnalysis: {
        sourceText: newVal,
        lastAnalyzedAt: new Date().toISOString(),
      },
    });
  };

  // Metrics calculation
  const cleanText = text.trim();
  const words = cleanText ? cleanText.split(/\s+/).filter((w) => w.length > 0) : [];
  const wordCount = words.length;
  const charCountWithSpaces = text.length;
  const charCountNoSpaces = text.replace(/\s+/g, '').length;

  const sentences = cleanText ? cleanText.split(/[.!?]+/).filter((s) => s.trim().length > 0) : [];
  const sentenceCount = sentences.length;

  const paragraphs = cleanText ? cleanText.split(/\n\s*\n/).filter((p) => p.trim().length > 0) : [];
  const paragraphCount = paragraphs.length;

  const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : '0';
  const estReadingTimeMinutes = Math.ceil(wordCount / 200);

  const handleLoadProjectBrief = () => {
    const proj = PROJECTS_DATA.find((p) => p.id === toolkitData.projectId);
    if (!proj) return;

    const combinedText = `
TITLE: ${proj.title}
CATEGORY: ${proj.category}
OBJECTIVE: ${proj.objective}
RESEARCH QUESTION: ${proj.researchQuestion}
DESCRIPTION: ${proj.description}

INSTRUCTIONS:
${proj.instructions.join('\n')}

DELIVERABLES:
${proj.deliverables.join('\n')}
    `.trim();

    handleTextChange(combinedText);
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Word & Text Analyzer</h2>
          <p className="text-xs text-[#64748b] mt-1">
            Analyze word metrics, sentence density, paragraph structure, and reading time for your project drafts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadProjectBrief}
          className="px-4 py-2 rounded-xl bg-[#063b2e] hover:bg-[#084234] text-[#f7faf8] hover:text-[#d6b45a] border border-[#0b8f6a]/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d6b45a]" />
          <span>Load Project Brief Text</span>
        </button>
      </div>

      {/* Real-time Metrics Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-[#063b2e]/60 border border-[#0b8f6a]/30 text-center">
          <span className="text-[10px] font-mono text-[#64748b] uppercase block">Words</span>
          <span className="text-xl font-bold text-[#d6b45a] mt-1 block">{wordCount.toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#063b2e]/60 border border-[#0b8f6a]/30 text-center">
          <span className="text-[10px] font-mono text-[#64748b] uppercase block">Characters</span>
          <span className="text-xl font-bold text-[#f7faf8] mt-1 block">{charCountWithSpaces.toLocaleString()}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#063b2e]/60 border border-[#0b8f6a]/30 text-center">
          <span className="text-[10px] font-mono text-[#64748b] uppercase block">Sentences</span>
          <span className="text-xl font-bold text-[#f7faf8] mt-1 block">{sentenceCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#063b2e]/60 border border-[#0b8f6a]/30 text-center">
          <span className="text-[10px] font-mono text-[#64748b] uppercase block">Paragraphs</span>
          <span className="text-xl font-bold text-[#f7faf8] mt-1 block">{paragraphCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#063b2e]/60 border border-[#0b8f6a]/30 text-center">
          <span className="text-[10px] font-mono text-[#64748b] uppercase block">Avg Words/Sent</span>
          <span className="text-xl font-bold text-[#0b8f6a] mt-1 block">{avgWordsPerSentence}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#063b2e]/60 border border-[#0b8f6a]/30 text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-[#64748b] uppercase block">Est Read Time</span>
          <span className="text-xl font-bold text-[#d6b45a] mt-1 block flex items-center justify-center gap-1">
            <Clock className="w-4 h-4 text-[#d6b45a]" />
            {estReadingTimeMinutes}m
          </span>
        </div>
      </div>

      {/* Text Area Input */}
      <div className="bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-2xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif font-bold text-[#f7faf8] flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#d6b45a]" />
            Project Text Input
          </span>

          <button
            type="button"
            onClick={() => handleTextChange('')}
            className="text-xs text-[#64748b] hover:text-white flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>

        <textarea
          rows={12}
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Paste or write your project draft text here to perform real-time structural analysis..."
          className="w-full bg-[#021f18] border border-[#0b8f6a]/40 rounded-xl p-4 text-xs font-mono text-[#f7faf8] leading-relaxed focus:outline-none focus:border-[#d6b45a]"
        />

        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748b]">
          <span>Chars without spaces: {charCountNoSpaces.toLocaleString()}</span>
          <span>Target academic sentence density: 15-25 words per sentence</span>
        </div>
      </div>
    </div>
  );
};
