import React from 'react';
import { ArrowLeft, LayoutGrid, CheckCircle2, RefreshCw } from 'lucide-react';
import type { ToolId } from '../../../types/toolkit';

interface ToolkitHeaderProps {
  projectId: string;
  projectNumber?: number;
  activeToolId: ToolId | null;
  activeToolName?: string;
  isAutosaving?: boolean;
  lastSavedAt?: string;
  onBackToDashboard: () => void;
  onBackToProject: () => void;
}

export const ToolkitHeader: React.FC<ToolkitHeaderProps> = ({
  projectId,
  projectNumber,
  activeToolId,
  activeToolName,
  isAutosaving = false,
  lastSavedAt,
  onBackToDashboard,
  onBackToProject,
}) => {
  const formattedNum = projectNumber
    ? projectNumber < 10
      ? `0${projectNumber}`
      : `${projectNumber}`
    : projectId;

  const formattedTime = lastSavedAt
    ? new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null;

  return (
    <div className="bg-[#063b2e]/90 border border-[#0b8f6a]/30 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md mb-8">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#0b8f6a]/20 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#64748b] flex-wrap">
          <button
            type="button"
            onClick={onBackToProject}
            className="hover:text-[#d6b45a] transition-colors cursor-pointer"
          >
            Project Room
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={onBackToProject}
            className="hover:text-[#d6b45a] transition-colors cursor-pointer text-[#f7faf8] font-bold"
          >
            Project {formattedNum}
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={onBackToDashboard}
            className={`hover:text-[#d6b45a] transition-colors cursor-pointer ${
              !activeToolId ? 'text-[#d6b45a] font-bold' : ''
            }`}
          >
            Project Toolkit
          </button>
          {activeToolId && activeToolName && (
            <>
              <span>/</span>
              <span className="text-[#d6b45a] font-bold">{activeToolName}</span>
            </>
          )}
        </div>

        {/* Autosave Indicator */}
        <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
          {isAutosaving ? (
            <span className="flex items-center gap-1.5 text-[#d6b45a] animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#0b8f6a]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved</span>
              {formattedTime && <span className="text-[#64748b] text-[10px]">({formattedTime})</span>}
            </span>
          )}
        </div>
      </div>

      {/* Navigation Buttons Row */}
      <div className="flex items-center justify-between pt-3 gap-3">
        <div className="flex items-center gap-2">
          {activeToolId ? (
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-3.5 py-1.5 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#f7faf8] hover:text-[#d6b45a] border border-[#0b8f6a]/30 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#d6b45a]" />
              <span>Back to Toolkit</span>
            </button>
          ) : null}

          <button
            type="button"
            onClick={onBackToProject}
            className="px-3.5 py-1.5 rounded-xl bg-[#021f18] hover:bg-[#04271e] text-[#64748b] hover:text-[#f7faf8] border border-[#0b8f6a]/30 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#0b8f6a]" />
            <span>Back to Project</span>
          </button>
        </div>

        <span className="text-[10px] font-mono uppercase tracking-wider text-[#d6b45a] bg-[#d6b45a]/10 border border-[#d6b45a]/30 px-2.5 py-1 rounded-full hidden sm:inline-block">
          Project {formattedNum} Toolkit
        </span>
      </div>
    </div>
  );
};
