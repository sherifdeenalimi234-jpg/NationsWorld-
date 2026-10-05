import React, { useState } from 'react';
import type { ProjectToolkitData, SourceItem, SourceType, CredibilityRating } from '../../../../types/toolkit';
import { Plus, Trash2, Edit3, Search, ShieldCheck, ShieldAlert, CheckSquare, ExternalLink, X, Save } from 'lucide-react';

interface SourceManagerToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

const SOURCE_TYPES: SourceType[] = [
  'Journal Article',
  'Book',
  'Report',
  'Government Publication',
  'Organization',
  'Website',
  'Dataset',
  'News',
  'Other',
];

export const SourceManagerTool: React.FC<SourceManagerToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const sources = toolkitData.sources || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCredibility, setFilterCredibility] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<SourceItem, 'id'>>({
    title: '',
    author: '',
    year: new Date().getFullYear().toString(),
    publication: '',
    sourceType: 'Journal Article',
    url: '',
    doi: '',
    notes: '',
    credibility: 'High',
    verified: false,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      author: '',
      year: new Date().getFullYear().toString(),
      publication: '',
      sourceType: 'Journal Article',
      url: '',
      doi: '',
      notes: '',
      credibility: 'High',
      verified: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: SourceItem) => {
    setEditingId(s.id);
    setFormData({
      title: s.title,
      author: s.author,
      year: s.year,
      publication: s.publication,
      sourceType: s.sourceType,
      url: s.url,
      doi: s.doi,
      notes: s.notes,
      credibility: s.credibility,
      verified: s.verified,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;

    let updatedList: SourceItem[];
    if (editingId) {
      updatedList = sources.map((s) => (s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      const newSource: SourceItem = {
        ...formData,
        id: `src-${Date.now()}`,
      };
      updatedList = [newSource, ...sources];
    }

    onUpdateToolkitData({
      ...toolkitData,
      sources: updatedList,
    });

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      sources: sources.filter((s) => s.id !== id),
    });
  };

  const handleToggleVerified = (id: string) => {
    const updated = sources.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s));
    onUpdateToolkitData({
      ...toolkitData,
      sources: updated,
    });
  };

  const filteredSources = sources.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q) ||
      s.publication.toLowerCase().includes(q);

    const matchesCred = filterCredibility === 'ALL' || s.credibility === filterCredibility;
    const matchesType = filterType === 'ALL' || s.sourceType === filterType;

    return matchesSearch && matchesCred && matchesType;
  });

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Source Manager</h2>
          <p className="text-xs text-[#64748b] mt-1">
            Track, rate, and verify research sources, academic publications, government reports, and empirical datasets.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 text-[#d6b45a]" />
          <span>Add Source</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, authors, publications..."
            className="w-full bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#f7faf8] placeholder-[#64748b] focus:outline-none focus:border-[#0b8f6a]"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          <select
            value={filterCredibility}
            onChange={(e) => setFilterCredibility(e.target.value)}
            className="bg-[#063b2e] border border-[#0b8f6a]/30 rounded-xl px-3 py-2 text-xs text-[#f7faf8] focus:outline-none"
          >
            <option value="ALL">Credibility: ALL</option>
            <option value="High">Credibility: High</option>
            <option value="Medium">Credibility: Medium</option>
            <option value="Needs Verification">Needs Verification</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#063b2e] border border-[#0b8f6a]/30 rounded-xl px-3 py-2 text-xs text-[#f7faf8] focus:outline-none"
          >
            <option value="ALL">Source Type: ALL</option>
            {SOURCE_TYPES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sources Grid */}
      {filteredSources.length === 0 ? (
        <div className="bg-[#063b2e]/40 border border-[#0b8f6a]/20 rounded-2xl p-8 text-center space-y-3">
          <Search className="w-8 h-8 text-[#64748b] mx-auto" />
          <h3 className="text-base font-serif font-bold text-[#f7faf8]">No Sources Found</h3>
          <p className="text-xs text-[#64748b]">
            {sources.length === 0
              ? 'No sources added yet. Click "Add Source" to save research references.'
              : 'No sources match your current filter parameters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSources.map((s) => (
            <div
              key={s.id}
              className="bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4 hover:border-[#0b8f6a]/60 transition group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0b8f6a] bg-[#0b8f6a]/20 px-2 py-0.5 rounded">
                    {s.sourceType}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Credibility Tag */}
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 ${
                        s.credibility === 'High'
                          ? 'bg-[#0b8f6a]/20 text-[#0b8f6a] border border-[#0b8f6a]/30'
                          : s.credibility === 'Medium'
                          ? 'bg-[#d6b45a]/20 text-[#d6b45a] border border-[#d6b45a]/30'
                          : 'bg-red-950/60 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {s.credibility === 'High' ? (
                        <ShieldCheck className="w-3 h-3" />
                      ) : (
                        <ShieldAlert className="w-3 h-3" />
                      )}
                      <span>{s.credibility}</span>
                    </span>

                    {/* Verified Checkbox */}
                    <button
                      type="button"
                      onClick={() => handleToggleVerified(s.id)}
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 border transition cursor-pointer ${
                        s.verified
                          ? 'bg-[#0b8f6a] text-white border-[#0b8f6a]'
                          : 'bg-white/5 text-[#64748b] border-white/10 hover:border-[#d6b45a]'
                      }`}
                    >
                      <CheckSquare className="w-3 h-3" />
                      <span>{s.verified ? 'Verified' : 'Unverified'}</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-serif font-bold text-[#f7faf8] group-hover:text-[#d6b45a] transition-colors leading-tight">
                  {s.title}
                </h3>

                <p className="text-xs text-[#64748b] font-mono">
                  {s.author || 'Unknown Author'} ({s.year || 'n.d.'})
                  {s.publication && ` • ${s.publication}`}
                </p>

                {s.notes && <p className="text-xs text-[#64748b] leading-relaxed italic">{s.notes}</p>}
              </div>

              <div className="pt-3 border-t border-[#0b8f6a]/20 flex items-center justify-between">
                {s.url || s.doi ? (
                  <a
                    href={(s.url || s.doi).startsWith('http') ? s.url || s.doi : `https://${s.url || s.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#0b8f6a] hover:underline flex items-center gap-1 font-mono truncate max-w-[200px]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span>{s.doi ? `DOI: ${s.doi}` : 'Visit Source URL'}</span>
                  </a>
                ) : (
                  <span className="text-[10px] text-[#64748b] font-mono">No direct link</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(s)}
                    className="p-1.5 text-[#64748b] hover:text-[#d6b45a] transition cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s.id)}
                    className="p-1.5 text-[#64748b] hover:text-red-400 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Source Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[130] bg-[#021f18]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#063b2e] border border-[#0b8f6a]/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#0b8f6a]/20 pb-3">
              <h3 className="text-lg font-serif font-bold text-[#f7faf8]">
                {editingId ? 'Edit Source Record' : 'Add Source Record'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#64748b] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Source Title *</label>
              <input
                type="text"
                placeholder="Title of publication, report, or paper"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Author / Creator</label>
                <input
                  type="text"
                  placeholder="Author name or institution"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Year</label>
                <input
                  type="text"
                  placeholder="Publication year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Publication / Journal</label>
                <input
                  type="text"
                  placeholder="e.g. Journal of Public Policy"
                  value={formData.publication}
                  onChange={(e) => setFormData({ ...formData, publication: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Source Type</label>
                <select
                  value={formData.sourceType}
                  onChange={(e) => setFormData({ ...formData, sourceType: e.target.value as SourceType })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
                >
                  {SOURCE_TYPES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Credibility Rating</label>
                <select
                  value={formData.credibility}
                  onChange={(e) => setFormData({ ...formData, credibility: e.target.value as CredibilityRating })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
                >
                  <option value="High">High Credibility</option>
                  <option value="Medium">Medium Credibility</option>
                  <option value="Needs Verification">Needs Verification</option>
                </select>
              </div>

              <div className="space-y-1 flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="accent-[#0b8f6a] w-4 h-4"
                  />
                  <span className="text-xs text-[#f7faf8] font-medium">Verified Source</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">DOI</label>
                <input
                  type="text"
                  placeholder="e.g. 10.1016/j..."
                  value={formData.doi}
                  onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Notes</label>
              <textarea
                rows={2}
                placeholder="Key takeaways or quotes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2.5 text-xs text-[#f7faf8]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs text-[#64748b]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-[#0b8f6a] hover:bg-[#0d9d75] text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Source</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
