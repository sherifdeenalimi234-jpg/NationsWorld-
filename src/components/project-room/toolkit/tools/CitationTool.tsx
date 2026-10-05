import React, { useState } from 'react';
import type {
  ProjectToolkitData,
  CitationItem,
  CitationStyle,
  CitationSourceType,
} from '../../../../types/toolkit';
import { Quote, Copy, Check, Bookmark, Trash2, AlertCircle } from 'lucide-react';

interface CitationToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

export const CitationTool: React.FC<CitationToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const citations = toolkitData.citations || [];

  const [style, setStyle] = useState<CitationStyle>('APA 7');
  const [sourceType, setSourceType] = useState<CitationSourceType>('Journal article');

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [publisherJournal, setPublisherJournal] = useState('');
  const [url, setUrl] = useState('');
  const [doi, setDoi] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Formatter logic
  const generateFormattedCitation = (): string => {
    const a = author.trim() || 'Author, A.';
    const t = title.trim() || 'Untitled Document';
    const y = year.trim() || 'n.d.';
    const p = publisherJournal.trim();
    const link = doi.trim() ? `https://doi.org/${doi.trim()}` : url.trim();

    if (style === 'APA 7') {
      let res = `${a} (${y}). ${t}.`;
      if (p) res += ` ${p}.`;
      if (link) res += ` ${link}`;
      return res;
    } else if (style === 'MLA 9') {
      let res = `${a}. "${t}."`;
      if (p) res += ` ${p},`;
      res += ` ${y}.`;
      if (link) res += ` ${link}`;
      return res;
    } else {
      // Chicago
      let res = `${a}. "${t}."`;
      if (p) res += ` ${p}`;
      res += ` (${y}).`;
      if (link) res += ` ${link}`;
      return res;
    }
  };

  const currentFormatted = generateFormattedCitation();

  const handleCopyCurrent = () => {
    navigator.clipboard.writeText(currentFormatted);
    setCopiedId('current');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveCitation = () => {
    if (!title.trim() && !author.trim()) return;

    const newCitation: CitationItem = {
      id: `cit-${Date.now()}`,
      style,
      sourceType,
      author,
      title,
      year,
      publisherJournal,
      url,
      doi,
      formattedCitation: currentFormatted,
      savedAt: new Date().toISOString(),
    };

    onUpdateToolkitData({
      ...toolkitData,
      citations: [newCitation, ...citations],
    });
  };

  const handleDeleteCitation = (id: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      citations: citations.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Citation & Reference Tool</h2>
        <p className="text-xs text-[#64748b] mt-1">
          Generate formatted citations for your project references list in APA 7, MLA 9, or Chicago style.
        </p>
      </div>

      {/* Review Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-[#04271e] border border-[#d6b45a]/30 text-xs text-[#d6b45a] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#d6b45a] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#f7faf8] block mb-0.5">Reference Verification Notice</span>
          Review generated references against the original source before submission.
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-6 space-y-4 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Citation Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as CitationStyle)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none"
            >
              <option value="APA 7">APA 7th Edition</option>
              <option value="MLA 9">MLA 9th Edition</option>
              <option value="Chicago">Chicago Manual of Style</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Source Type</label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as CitationSourceType)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8] focus:outline-none"
            >
              <option value="Journal article">Journal article</option>
              <option value="Book">Book</option>
              <option value="Report">Report / Government Publication</option>
              <option value="Website">Website</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Author(s)</label>
            <input
              type="text"
              placeholder="e.g. Smith, J. A. or NationsWorld Research"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Year</label>
            <input
              type="text"
              placeholder="e.g. 2026"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Title *</label>
          <input
            type="text"
            placeholder="Title of paper, book, or report"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">Publisher / Journal</label>
            <input
              type="text"
              placeholder="e.g. Oxford University Press"
              value={publisherJournal}
              onChange={(e) => setPublisherJournal(e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono font-bold text-[#64748b] uppercase">DOI</label>
            <input
              type="text"
              placeholder="10.1000/182"
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
            />
          </div>
        </div>

        {/* Live Preview & Actions */}
        <div className="pt-4 border-t border-[#0b8f6a]/20 space-y-3">
          <span className="text-[10px] font-mono font-bold text-[#d6b45a] uppercase block">
            Generated {style} Citation Preview:
          </span>

          <div className="p-4 rounded-xl bg-[#021f18] border border-[#0b8f6a]/40 text-xs font-serif text-[#f7faf8] leading-relaxed select-all">
            {currentFormatted}
          </div>

          <div className="flex items-center gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={handleCopyCurrent}
              className="px-4 py-2 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#f7faf8] border border-[#0b8f6a]/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedId === 'current' ? <Check className="w-3.5 h-3.5 text-[#0b8f6a]" /> : <Copy className="w-3.5 h-3.5 text-[#d6b45a]" />}
              <span>{copiedId === 'current' ? 'Copied' : 'Copy Citation'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveCitation}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Add to References</span>
            </button>
          </div>
        </div>
      </div>

      {/* Saved References Bibliography */}
      {citations.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#0b8f6a]/20">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-[#f7faf8] flex items-center gap-2">
              <Quote className="w-4 h-4 text-[#d6b45a]" />
              Saved Bibliography References ({citations.length})
            </h3>
          </div>

          <div className="space-y-3">
            {citations.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-[#063b2e]/60 border border-[#0b8f6a]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-[#0b8f6a] transition"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold uppercase bg-[#0b8f6a]/20 text-[#0b8f6a] px-2 py-0.5 rounded">
                      {c.style}
                    </span>
                    <span className="text-[9px] font-mono text-[#64748b]">
                      {c.sourceType}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-[#f7faf8] leading-relaxed">{c.formattedCitation}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(c.formattedCitation);
                      setCopiedId(c.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="p-1.5 text-[#64748b] hover:text-[#d6b45a] transition cursor-pointer"
                    title="Copy"
                  >
                    {copiedId === c.id ? <Check className="w-3.5 h-3.5 text-[#0b8f6a]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCitation(c.id)}
                    className="p-1.5 text-[#64748b] hover:text-red-400 transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
