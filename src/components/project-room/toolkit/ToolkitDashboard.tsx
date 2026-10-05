import React, { useState } from 'react';
import {
  Search,
  Compass,
  HelpCircle,
  Table,
  Database,
  Quote,
  ListTree,
  BarChart3,
  ClipboardCheck,
  FileSpreadsheet,
  CheckSquare,
  Download,
  Upload,
  AlertTriangle,
  ArrowRight,
  Wrench,
} from 'lucide-react';
import type { ToolId, ToolkitCategory, ProjectToolkitData } from '../../../types/toolkit';
import { exportToolkitBackup, validateAndParseBackup } from '../../../utils/toolkitStorage';

interface ToolkitDashboardProps {
  projectId: string;
  projectNumber?: number;
  toolkitData: ProjectToolkitData;
  onSelectTool: (toolId: ToolId) => void;
  onRestoreBackup: (restoredData: ProjectToolkitData) => void;
}

interface ToolDefinition {
  id: ToolId;
  name: string;
  category: ToolkitCategory;
  description: string;
  icon: React.FC<{ className?: string }>;
  accentColor: string;
}

const TOOLS: ToolDefinition[] = [
  {
    id: 'research-planner',
    name: 'Research Planner',
    category: 'RESEARCH',
    description: 'Convert your assigned project into a structured research plan with objectives, areas, and tasks.',
    icon: Compass,
    accentColor: '#0b8f6a',
  },
  {
    id: 'research-question-builder',
    name: 'Research Question Builder',
    category: 'RESEARCH',
    description: 'Develop clear, high-impact research questions using structured template patterns.',
    icon: HelpCircle,
    accentColor: '#d6b45a',
  },
  {
    id: 'literature-matrix',
    name: 'Literature Review Matrix',
    category: 'RESEARCH',
    description: 'Analyze, compare, and organize academic and policy sources in a matrix format.',
    icon: Table,
    accentColor: '#0b8f6a',
  },
  {
    id: 'source-manager',
    name: 'Source Manager',
    category: 'RESEARCH',
    description: 'Track, rate, and verify academic sources with credibility ratings and verification tags.',
    icon: Database,
    accentColor: '#d6b45a',
  },
  {
    id: 'citation-tool',
    name: 'Citation & Reference Tool',
    category: 'WRITING',
    description: 'Generate formatted APA 7, MLA 9, and Chicago citations for your project reference list.',
    icon: Quote,
    accentColor: '#0b8f6a',
  },
  {
    id: 'outline-builder',
    name: 'Project Outline Builder',
    category: 'WRITING',
    description: 'Structure and reorder academic sections, add section notes, and apply to your workspace.',
    icon: ListTree,
    accentColor: '#d6b45a',
  },
  {
    id: 'data-lab',
    name: 'Data Lab',
    category: 'ANALYSIS',
    description: 'Perform client-side quantitative analysis, statistical summaries, and dynamic SVG charts.',
    icon: BarChart3,
    accentColor: '#0b8f6a',
  },
  {
    id: 'survey-builder',
    name: 'Survey Builder',
    category: 'FIELDWORK',
    description: 'Design field survey questionnaires with multiple question types and instant preview mode.',
    icon: ClipboardCheck,
    accentColor: '#d6b45a',
  },
  {
    id: 'text-analyzer',
    name: 'Word & Text Analyzer',
    category: 'WRITING',
    description: 'Analyze word count, sentence length, paragraph structure, and estimated reading time.',
    icon: FileSpreadsheet,
    accentColor: '#0b8f6a',
  },
  {
    id: 'checklist',
    name: 'Project Checklist',
    category: 'PROJECT MANAGEMENT',
    description: 'Track key research milestones, methodological steps, and final submission readiness.',
    icon: CheckSquare,
    accentColor: '#d6b45a',
  },
];

const CATEGORIES: ToolkitCategory[] = [
  'ALL',
  'RESEARCH',
  'WRITING',
  'ANALYSIS',
  'FIELDWORK',
  'PROJECT MANAGEMENT',
];

export const ToolkitDashboard: React.FC<ToolkitDashboardProps> = ({
  projectId,
  projectNumber,
  toolkitData,
  onSelectTool,
  onRestoreBackup,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolkitCategory>('ALL');

  // Backup restore state
  const [restoreError, setRestoreError] = useState<string | null>(null);
  const [pendingRestoreData, setPendingRestoreData] = useState<ProjectToolkitData | null>(null);
  const [isConfirmingRestore, setIsConfirmingRestore] = useState(false);

  const formattedNum = projectNumber
    ? projectNumber < 10
      ? `0${projectNumber}`
      : `${projectNumber}`
    : projectId;

  // Filter tools based on category and search query
  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'ALL' || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = validateAndParseBackup(content, toolkitData.cycleId, toolkitData.projectId);

      if (!res.success || !res.data) {
        setRestoreError(res.error || 'Failed to parse project backup file.');
        setIsConfirmingRestore(false);
      } else {
        setRestoreError(null);
        setPendingRestoreData(res.data);
        setIsConfirmingRestore(true);
      }
    };
    reader.readAsText(file);
    // Clear input value so same file can be selected again
    e.target.value = '';
  };

  const handleConfirmRestore = () => {
    if (pendingRestoreData) {
      onRestoreBackup(pendingRestoreData);
      setPendingRestoreData(null);
      setIsConfirmingRestore(false);
    }
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Dashboard Title & Hero Header */}
      <div className="bg-gradient-to-r from-[#063b2e] via-[#084234] to-[#063b2e] border border-[#0b8f6a]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0b8f6a]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d6b45a]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b8f6a]/20 border border-[#0b8f6a]/40 text-[#d6b45a] text-xs font-mono font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              NATIONSWORLD PROJECT TOOLKIT
            </span>
            <span className="text-[11px] font-mono font-bold uppercase text-[#0b8f6a] bg-[#0b8f6a]/10 border border-[#0b8f6a]/30 px-2.5 py-0.5 rounded-full">
              PROJECT {formattedNum}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif text-[#f7faf8] tracking-tight">
            Research smarter. Organize better. Build stronger work.
          </h1>

          <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
            Practical client-side research, analytical, and writing tools designed to support your project workflow.
          </p>

          {/* Backup & Restore Action Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => exportToolkitBackup(toolkitData)}
              className="px-4 py-2 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#f7faf8] hover:text-[#d6b45a] border border-[#0b8f6a]/30 text-xs font-medium transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#d6b45a]" />
              <span>Export Toolkit Backup</span>
            </button>

            <label className="px-4 py-2 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#64748b] hover:text-[#f7faf8] border border-[#0b8f6a]/30 text-xs font-medium transition flex items-center gap-2 cursor-pointer shadow-sm">
              <Upload className="w-3.5 h-3.5 text-[#0b8f6a]" />
              <span>Restore Toolkit Backup</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Restore Error Alert */}
      {restoreError && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{restoreError}</span>
          </div>
          <button
            type="button"
            onClick={() => setRestoreError(null)}
            className="text-red-400 hover:text-white text-xs font-bold underline cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Restore Confirmation Modal */}
      {isConfirmingRestore && pendingRestoreData && (
        <div className="fixed inset-0 z-[130] bg-[#021f18]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#063b2e] border border-[#0b8f6a]/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#d6b45a]/20 border border-[#d6b45a]/40 flex items-center justify-center text-[#d6b45a]">
              <Upload className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-[#f7faf8]">Restore Toolkit Backup?</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                This will overwrite your current toolkit data for Project {formattedNum} with the imported file state.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#021f18] border border-[#0b8f6a]/20 text-[11px] font-mono text-[#64748b] space-y-1">
              <div>Project: {pendingRestoreData.projectId}</div>
              <div>Cycle: {pendingRestoreData.cycleId}</div>
              <div>Backup Date: {new Date(pendingRestoreData.lastSavedAt || '').toLocaleDateString()}</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsConfirmingRestore(false);
                  setPendingRestoreData(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#64748b] hover:text-[#f7faf8] border border-[#0b8f6a]/30 text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestore}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#0b8f6a] to-[#086a4e] hover:from-[#0d9d75] hover:to-[#0a7a5a] text-white text-xs font-bold transition cursor-pointer shadow-md"
              >
                Confirm Restore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar & Category Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search toolkit..."
              className="w-full bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#f7faf8] placeholder-[#64748b] focus:outline-none focus:border-[#0b8f6a] focus:ring-1 focus:ring-[#0b8f6a] transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748b] hover:text-[#f7faf8]"
              >
                ✕
              </button>
            )}
          </div>

          <span className="text-xs text-[#64748b] font-mono font-medium self-end sm:self-center">
            Showing {filteredTools.length} of {TOOLS.length} tools
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0b8f6a] text-white shadow-md'
                  : 'bg-[#063b2e]/60 hover:bg-[#063b2e] text-[#64748b] hover:text-[#f7faf8] border border-[#0b8f6a]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Cards Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const IconComp = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-6 shadow-lg hover:border-[#0b8f6a]/60 hover:shadow-[#0b8f6a]/10 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#04271e] border border-[#0b8f6a]/30 flex items-center justify-center text-[#d6b45a] group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5 text-[#d6b45a]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748b] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-serif font-bold text-[#f7faf8] group-hover:text-[#d6b45a] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-[#64748b] leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#0b8f6a]/15 mt-6">
                  <button
                    type="button"
                    onClick={() => onSelectTool(tool.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#021f18] hover:bg-[#0b8f6a] text-[#f7faf8] hover:text-white border border-[#0b8f6a]/30 hover:border-[#0b8f6a] text-xs font-bold tracking-wide transition flex items-center justify-between cursor-pointer group-hover:border-[#0b8f6a]"
                  >
                    <span>Open Tool</span>
                    <ArrowRight className="w-4 h-4 text-[#d6b45a] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#063b2e]/40 border border-[#0b8f6a]/20 rounded-2xl p-8 text-center space-y-3">
          <Search className="w-8 h-8 text-[#64748b] mx-auto" />
          <h3 className="text-base font-serif font-bold text-[#f7faf8]">No Tools Found</h3>
          <p className="text-xs text-[#64748b]">
            No toolkit tools match your current search "{searchQuery}" in category "{selectedCategory}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="px-4 py-2 rounded-xl bg-[#0b8f6a] text-white text-xs font-bold transition hover:bg-[#0d9d75] cursor-pointer mt-2"
          >
            Reset Search & Filters
          </button>
        </div>
      )}
    </div>
  );
};
