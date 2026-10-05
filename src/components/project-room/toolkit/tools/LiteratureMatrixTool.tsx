import React, { useState } from 'react';
import type { ProjectToolkitData, LiteratureMatrixItem } from '../../../../types/toolkit';
import { Plus, Trash2, Edit3, Search, Filter, ArrowUpDown, Table as TableIcon, LayoutList, ExternalLink, X, Save } from 'lucide-react';

interface LiteratureMatrixToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

export const LiteratureMatrixTool: React.FC<LiteratureMatrixToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const items = toolkitData.literatureMatrix || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'author' | 'year' | 'title'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<LiteratureMatrixItem, 'id'>>({
    author: '',
    year: '',
    title: '',
    sourceType: 'Journal Article',
    researchQuestion: '',
    method: '',
    keyFindings: '',
    keyArgument: '',
    limitations: '',
    relevance: '',
    urlDoi: '',
    notes: '',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      author: '',
      year: new Date().getFullYear().toString(),
      title: '',
      sourceType: 'Journal Article',
      researchQuestion: '',
      method: '',
      keyFindings: '',
      keyArgument: '',
      limitations: '',
      relevance: '',
      urlDoi: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: LiteratureMatrixItem) => {
    setEditingId(item.id);
    setFormData({
      author: item.author,
      year: item.year,
      title: item.title,
      sourceType: item.sourceType,
      researchQuestion: item.researchQuestion,
      method: item.method,
      keyFindings: item.keyFindings,
      keyArgument: item.keyArgument,
      limitations: item.limitations,
      relevance: item.relevance,
      urlDoi: item.urlDoi,
      notes: item.notes,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() && !formData.author.trim()) return;

    let updatedList: LiteratureMatrixItem[];
    if (editingId) {
      updatedList = items.map((it) => (it.id === editingId ? { ...formData, id: editingId } : it));
    } else {
      const newItem: LiteratureMatrixItem = {
        ...formData,
        id: `lit-${Date.now()}`,
      };
      updatedList = [newItem, ...items];
    }

    onUpdateToolkitData({
      ...toolkitData,
      literatureMatrix: updatedList,
    });

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      literatureMatrix: items.filter((it) => it.id !== id),
    });
  };

  // Filter and sort items
  const filteredItems = items
    .filter((it) => {
      const q = searchQuery.toLowerCase();
      return (
        !q ||
        it.author.toLowerCase().includes(q) ||
        it.title.toLowerCase().includes(q) ||
        it.keyFindings.toLowerCase().includes(q) ||
        it.sourceType.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      let compA = a[sortField] || '';
      let compB = b[sortField] || '';
      if (sortOrder === 'desc') {
        return compB.localeCompare(compA);
      }
      return compA.localeCompare(compB);
    });

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Literature Review Matrix</h2>
          <p className="text-xs text-[#64748b] mt-1">
            Compare academic literature, methodologies, key arguments, and limitations in a structured matrix format.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 text-[#d6b45a]" />
          <span>Add Literature Source</span>
        </button>
      </div>

      {/* Filter & View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search authors, titles, findings..."
            className="w-full bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#f7faf8] placeholder-[#64748b] focus:outline-none focus:border-[#0b8f6a]"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 bg-[#063b2e] border border-[#0b8f6a]/30 rounded-xl px-3 py-1.5 text-xs text-[#64748b]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#d6b45a]" />
            <span>Sort:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="bg-transparent text-[#f7faf8] font-mono focus:outline-none"
            >
              <option value="year" className="bg-[#021f18]">Year</option>
              <option value="author" className="bg-[#021f18]">Author</option>
              <option value="title" className="bg-[#021f18]">Title</option>
            </select>
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="text-[#d6b45a] font-bold uppercase hover:underline ml-1 cursor-pointer"
            >
              {sortOrder}
            </button>
          </div>

          <div className="flex items-center bg-[#063b2e] border border-[#0b8f6a]/30 rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'table' ? 'bg-[#0b8f6a] text-white' : 'text-[#64748b] hover:text-white'
              }`}
              title="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'cards' ? 'bg-[#0b8f6a] text-white' : 'text-[#64748b] hover:text-white'
              }`}
              title="Cards View"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#063b2e]/40 border border-[#0b8f6a]/20 rounded-2xl p-8 text-center space-y-3">
          <Filter className="w-8 h-8 text-[#64748b] mx-auto" />
          <h3 className="text-base font-serif font-bold text-[#f7faf8]">No Literature Sources Found</h3>
          <p className="text-xs text-[#64748b]">
            {items.length === 0
              ? 'Your literature matrix is empty. Click "Add Literature Source" to begin organizing papers.'
              : 'No matrix entries match your search filter.'}
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* Responsive Horizontally Scrollable Table */
        <div className="bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left text-xs border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-[#021f18] border-b border-[#0b8f6a]/30 text-[#d6b45a] font-mono text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 font-bold">Author & Year</th>
                  <th className="p-3.5 font-bold">Title & Type</th>
                  <th className="p-3.5 font-bold">Research Question</th>
                  <th className="p-3.5 font-bold">Method</th>
                  <th className="p-3.5 font-bold">Key Findings</th>
                  <th className="p-3.5 font-bold">Key Argument</th>
                  <th className="p-3.5 font-bold">Limitations</th>
                  <th className="p-3.5 font-bold">Relevance & Notes</th>
                  <th className="p-3.5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0b8f6a]/15 text-[#f7faf8]">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#04271e]/80 transition">
                    <td className="p-3.5 align-top">
                      <div className="font-bold text-[#f7faf8]">{item.author || 'N/A'}</div>
                      <div className="text-[10px] font-mono text-[#d6b45a]">{item.year || 'N/A'}</div>
                    </td>
                    <td className="p-3.5 align-top max-w-[200px]">
                      <div className="font-serif font-bold text-[#f7faf8] line-clamp-2">{item.title}</div>
                      <span className="text-[9px] font-mono bg-[#0b8f6a]/20 text-[#0b8f6a] px-1.5 py-0.5 rounded inline-block mt-1">
                        {item.sourceType}
                      </span>
                    </td>
                    <td className="p-3.5 align-top max-w-[180px] text-[#64748b]">
                      <p className="line-clamp-3">{item.researchQuestion || '-'}</p>
                    </td>
                    <td className="p-3.5 align-top max-w-[150px] text-[#64748b]">
                      <p className="line-clamp-3">{item.method || '-'}</p>
                    </td>
                    <td className="p-3.5 align-top max-w-[200px] text-[#f7faf8]">
                      <p className="line-clamp-3">{item.keyFindings || '-'}</p>
                    </td>
                    <td className="p-3.5 align-top max-w-[180px] text-[#64748b]">
                      <p className="line-clamp-3">{item.keyArgument || '-'}</p>
                    </td>
                    <td className="p-3.5 align-top max-w-[150px] text-[#64748b]">
                      <p className="line-clamp-3">{item.limitations || '-'}</p>
                    </td>
                    <td className="p-3.5 align-top max-w-[180px]">
                      <div className="text-[11px] text-[#d6b45a] line-clamp-2">{item.relevance || '-'}</div>
                      {item.urlDoi && (
                        <a
                          href={item.urlDoi.startsWith('http') ? item.urlDoi : `https://${item.urlDoi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-[#0b8f6a] hover:underline flex items-center gap-1 mt-1 truncate"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span>URL/DOI</span>
                        </a>
                      )}
                    </td>
                    <td className="p-3.5 align-top text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1 text-[#64748b] hover:text-[#d6b45a] transition"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-[#64748b] hover:text-red-400 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Mobile/Stacked Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-2xl p-5 shadow-md space-y-3 hover:border-[#0b8f6a] transition"
            >
              <div className="flex items-start justify-between gap-2 border-b border-[#0b8f6a]/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#d6b45a] uppercase block font-bold">
                    {item.author} ({item.year})
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#f7faf8] mt-0.5">{item.title}</h3>
                </div>
                <span className="text-[9px] font-mono bg-[#0b8f6a]/20 text-[#0b8f6a] px-2 py-0.5 rounded font-bold uppercase shrink-0">
                  {item.sourceType}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#64748b]">
                <div>
                  <span className="font-mono text-[10px] text-[#d6b45a] uppercase block">Key Findings:</span>
                  <p className="text-[#f7faf8] mt-0.5">{item.keyFindings || '-'}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#d6b45a] uppercase block">Method:</span>
                  <p className="mt-0.5">{item.method || '-'}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#d6b45a] uppercase block">Key Argument:</span>
                  <p className="mt-0.5">{item.keyArgument || '-'}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#d6b45a] uppercase block">Relevance:</span>
                  <p className="text-[#d6b45a] mt-0.5">{item.relevance || '-'}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#0b8f6a]/20 flex items-center justify-between">
                {item.urlDoi ? (
                  <a
                    href={item.urlDoi.startsWith('http') ? item.urlDoi : `https://${item.urlDoi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#0b8f6a] hover:underline flex items-center gap-1 font-mono"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View DOI/URL</span>
                  </a>
                ) : (
                  <span className="text-[10px] text-[#64748b] font-mono">No URL</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-[#64748b] hover:text-[#d6b45a] transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-[#64748b] hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Literature Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[130] bg-[#021f18]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#063b2e] border border-[#0b8f6a]/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#0b8f6a]/20 pb-3">
              <h3 className="text-lg font-serif font-bold text-[#f7faf8]">
                {editingId ? 'Edit Literature Matrix Source' : 'Add Literature Matrix Source'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#64748b] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Author(s)</label>
                <input
                  type="text"
                  placeholder="e.g. Smith & Patel"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Year</label>
                <input
                  type="text"
                  placeholder="e.g. 2024"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Source Type</label>
                <input
                  type="text"
                  placeholder="e.g. Journal Article"
                  value={formData.sourceType}
                  onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Title</label>
              <input
                type="text"
                placeholder="Full paper or publication title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Research Question</label>
                <textarea
                  rows={2}
                  placeholder="Paper's core research question..."
                  value={formData.researchQuestion}
                  onChange={(e) => setFormData({ ...formData, researchQuestion: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Method / Approach</label>
                <textarea
                  rows={2}
                  placeholder="Qualitative case study, econometric regression..."
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Key Findings</label>
                <textarea
                  rows={2}
                  placeholder="Empirical results and findings..."
                  value={formData.keyFindings}
                  onChange={(e) => setFormData({ ...formData, keyFindings: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Key Argument</label>
                <textarea
                  rows={2}
                  placeholder="Central theoretical argument..."
                  value={formData.keyArgument}
                  onChange={(e) => setFormData({ ...formData, keyArgument: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Limitations</label>
                <textarea
                  rows={2}
                  placeholder="Methodological gaps or limitations..."
                  value={formData.limitations}
                  onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Relevance to Your Project</label>
                <textarea
                  rows={2}
                  placeholder="How this source directly supports your analysis..."
                  value={formData.relevance}
                  onChange={(e) => setFormData({ ...formData, relevance: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">URL / DOI</label>
                <input
                  type="text"
                  placeholder="https://doi.org/10..."
                  value={formData.urlDoi}
                  onChange={(e) => setFormData({ ...formData, urlDoi: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-[#64748b] uppercase">Notes</label>
                <input
                  type="text"
                  placeholder="Additional observations..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                />
              </div>
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
                <span>Save Literature Source</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
