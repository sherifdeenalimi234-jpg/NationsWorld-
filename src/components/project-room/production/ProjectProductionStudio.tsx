import React, { useState, useEffect } from 'react';
import type { ProjectProductionSettings, ProjectReadinessCheck } from '../../../types/projectProduction';
import type { ProjectToolkitData } from '../../../types/toolkit';
import {
  loadProjectProductionSettings,
  saveProjectProductionSettings,
  computeProjectReadiness,
} from '../../../utils/projectProductionStorage';
import { getStoredToolkit } from '../../../utils/toolkitStorage';
import { downloadProjectPDF } from '../../../utils/projectPdfGenerator';
import { ProductionSettingsPanel } from './ProductionSettingsPanel';
import { DocumentPreviewArea } from './DocumentPreviewArea';
import { ReadinessCheckModal } from './ReadinessCheckModal';
import { FinalConfirmationModal } from './FinalConfirmationModal';
import {
  ArrowLeft,
  Download,
  FileCheck,
  Check,
  Sparkles,
  Layers,
  Edit3,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface ProjectProductionStudioProps {
  cycleId: string;
  projectId: string;
  projectTitle: string;
  projectNumber: string;
  sections: Array<{ id: string; title: string; content: string; isRequired?: boolean }>;
  onBackToWorkspace: () => void;
  onBackToProjectRoom: () => void;
}

export const ProjectProductionStudio: React.FC<ProjectProductionStudioProps> = ({
  cycleId,
  projectId,
  projectTitle,
  projectNumber,
  sections,
  onBackToWorkspace,
  onBackToProjectRoom,
}) => {
  const [settings, setSettings] = useState<ProjectProductionSettings>(() =>
    loadProjectProductionSettings(cycleId, projectId, projectTitle, '', 'General Research')
  );

  const [toolkit, setToolkit] = useState<ProjectToolkitData>(() =>
    getStoredToolkit(cycleId, projectId)
  );

  const [readiness, setReadiness] = useState<ProjectReadinessCheck>(() =>
    computeProjectReadiness(cycleId, projectId, projectTitle, sections)
  );

  const [showReadinessModal, setShowReadinessModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('Saved');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sync state on load
  useEffect(() => {
    const loaded = loadProjectProductionSettings(cycleId, projectId, projectTitle, '', 'General Research');
    setSettings(loaded);
    setToolkit(getStoredToolkit(cycleId, projectId));
    setReadiness(computeProjectReadiness(cycleId, projectId, projectTitle, sections));
  }, [cycleId, projectId, projectTitle, sections]);

  // Handle settings update & autosave
  const handleUpdateSettings = (updated: ProjectProductionSettings) => {
    setSettings(updated);
    setSaveStatus('Saving...');
    const ok = saveProjectProductionSettings(cycleId, projectId, updated);
    if (ok) {
      setTimeout(() => {
        setSaveStatus(`Saved (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
      }, 300);
    }
  };

  const handleDownloadPDF = () => {
    downloadProjectPDF({
      settings,
      projectTitle,
      projectNumber,
      sections,
      citations: toolkit.citations,
      literatureMatrix: toolkit.literatureMatrix,
      dataLab: toolkit.dataLab,
    });

    // Update last generated metadata
    const updated: ProjectProductionSettings = {
      ...settings,
      lastGeneratedAt: new Date().toISOString(),
    };
    handleUpdateSettings(updated);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleConfirmFinal = () => {
    const updated: ProjectProductionSettings = {
      ...settings,
      productionState: 'FINAL',
      version: settings.version + 1,
      lastGeneratedAt: new Date().toISOString(),
    };
    handleUpdateSettings(updated);
    setShowFinalModal(false);

    // Download PDF automatically
    downloadProjectPDF({
      settings: updated,
      projectTitle,
      projectNumber,
      sections,
      citations: toolkit.citations,
      literatureMatrix: toolkit.literatureMatrix,
      dataLab: toolkit.dataLab,
    });

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#1E293B] pb-20 font-sans">
      {/* READINESS MODAL */}
      {showReadinessModal && (
        <ReadinessCheckModal
          readiness={readiness}
          onReturnToWorkspace={onBackToWorkspace}
          onContinueAnyway={() => setShowReadinessModal(false)}
        />
      )}

      {/* FINAL CONFIRMATION MODAL */}
      {showFinalModal && (
        <FinalConfirmationModal
          onConfirm={handleConfirmFinal}
          onCancel={() => setShowFinalModal(false)}
        />
      )}

      {/* TOP HEADER & BREADCRUMBS */}
      <div className="bg-[#063B2E] text-white border-b border-emerald-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8DE0BE]">
            <button
              type="button"
              onClick={onBackToProjectRoom}
              className="hover:underline text-white"
            >
              Project Room
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={onBackToWorkspace}
              className="hover:underline text-white"
            >
              Project {projectNumber}
            </button>
            <span>/</span>
            <span className="text-[#D6B45A] font-extrabold uppercase">
              Production Studio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-emerald-200 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#0B8F6A]" />
              {saveStatus}
            </span>

            <button
              type="button"
              onClick={onBackToWorkspace}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs tracking-wider uppercase transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Workspace</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* BANNER HEADER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#063B2E] via-[#0B3D2E] to-[#063B2E] text-white shadow-xl relative overflow-hidden border border-emerald-900/50 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#0B8F6A] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  PROJECT {projectNumber} PRODUCTION
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-[#D6B45A] text-[10px] font-mono font-bold">
                  STATE: {settings.productionState} (v{settings.version}.0)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                PRODUCTION STUDIO
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                Transform your research workspace into a published, institutional-grade NationsWorld project document.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowReadinessModal(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-emerald-200 font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#D6B45A]" />
                <span>Readiness Status ({readiness.overallProgress}%)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="px-5 py-2.5 rounded-xl bg-[#D6B45A] hover:bg-[#c4a24a] text-[#063B2E] font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              {settings.productionState === 'DRAFT' && (
                <button
                  type="button"
                  onClick={() => setShowFinalModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#0B8F6A] hover:bg-[#097858] text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Generate Final Document</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SUCCESS ALERT */}
        {downloadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-[#063B2E] text-xs font-bold mb-6 flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0B8F6A]" />
              Your document is ready and downloading.
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">
              Ref: {settings.referenceNumber}
            </span>
          </div>
        )}

        {/* MAIN STUDIO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: SETTINGS PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <ProductionSettingsPanel
              settings={settings}
              onChangeSettings={handleUpdateSettings}
            />

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#063B2E]">
                <Clock className="w-4 h-4 text-[#0B8F6A]" />
                <span>PRODUCTION METADATA</span>
              </div>
              <div className="text-xs space-y-1 text-[#64748B] font-mono">
                <div>Version: <span className="text-[#063B2E] font-bold">v{settings.version}.0</span></div>
                <div>Status: <span className="text-[#063B2E] font-bold">{settings.productionState}</span></div>
                <div>Last Generated: <span className="text-[#063B2E] font-bold">{settings.lastGeneratedAt ? new Date(settings.lastGeneratedAt).toLocaleString() : 'Not generated yet'}</span></div>
              </div>
            </div>
          </div>

          {/* RIGHT: PREVIEW & ACTIONS */}
          <div className="lg:col-span-7 space-y-6 flex flex-col">
            <DocumentPreviewArea
              settings={settings}
              projectTitle={projectTitle}
              projectNumber={projectNumber}
              sections={sections}
              citations={toolkit.citations}
              literatureMatrix={toolkit.literatureMatrix}
            />

            {/* QUICK ACTIONS BAR */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBackToWorkspace}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#063B2E] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4 text-[#0B8F6A]" />
                <span>Edit Project Workspace</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="px-5 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#0B3D2E] text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#8DE0BE]" />
                  <span>Download PDF Document</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950 text-white border border-emerald-900 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-emerald-300 block mb-0.5">Local Production Security</span>
                <p className="text-emerald-100 leading-relaxed">
                  Your document rendering and PDF file generation happen entirely inside your web browser. No project content is stored on remote servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
