import React, { useState, useEffect, useRef } from 'react';
import { ProjectRoomHero } from './ProjectRoomHero';
import { ProjectAccessCard } from './ProjectAccessCard';
import { ProjectRoomDashboard } from './ProjectRoomDashboard';
import { ProjectNumberGrid } from './ProjectNumberGrid';
import { ProjectConfirmation } from './ProjectConfirmation';
import { AssignmentReveal } from './AssignmentReveal';
import { ProjectDeclaration } from './ProjectDeclaration';
import { ProjectBriefModal } from './ProjectBriefModal';
import { WorkspacePlaceholderModal } from './WorkspacePlaceholderModal';
import { ProjectJourney } from './ProjectJourney';

import { ToolkitHeader } from './toolkit/ToolkitHeader';
import { ToolkitDashboard } from './toolkit/ToolkitDashboard';

import { ResearchPlannerTool } from './toolkit/tools/ResearchPlannerTool';
import { ResearchQuestionBuilderTool } from './toolkit/tools/ResearchQuestionBuilderTool';
import { LiteratureMatrixTool } from './toolkit/tools/LiteratureMatrixTool';
import { SourceManagerTool } from './toolkit/tools/SourceManagerTool';
import { CitationTool } from './toolkit/tools/CitationTool';
import { ProjectOutlineBuilderTool } from './toolkit/tools/ProjectOutlineBuilderTool';
import { DataLabTool } from './toolkit/tools/DataLabTool';
import { SurveyBuilderTool } from './toolkit/tools/SurveyBuilderTool';
import { TextAnalyzerTool } from './toolkit/tools/TextAnalyzerTool';
import { ProjectChecklistTool } from './toolkit/tools/ProjectChecklistTool';

import { getProjectByNumber, getProjectById, PROJECT_CYCLE } from '../../data/projectsData';
import type { ProjectSlot } from '../../data/projectsData';
import type { StoredAssignment } from '../../utils/projectRoomStorage';
import {
  getStoredAssignment,
  saveAssignment,
  clearAssignment
} from '../../utils/projectRoomStorage';

import type { ToolId, ProjectToolkitData } from '../../types/toolkit';
import { getStoredToolkit, saveToolkit } from '../../utils/toolkitStorage';

export const ProjectRoomPage: React.FC = () => {
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [assignment, setAssignment] = useState<StoredAssignment | null>(null);
  const [assignedProject, setAssignedProject] = useState<ProjectSlot | null>(null);
  const [pendingNumber, setPendingNumber] = useState<number | null>(null);
  const [justRevealedProject, setJustRevealedProject] = useState<ProjectSlot | null>(null);

  // Phase 5 Navigation & Toolkit state
  const [roomViewMode, setRoomViewMode] = useState<'dashboard' | 'toolkit'>('dashboard');
  const [activeToolId, setActiveToolId] = useState<ToolId | null>(null);
  const [toolkitData, setToolkitData] = useState<ProjectToolkitData | null>(null);
  const [isAutosavingToolkit, setIsAutosavingToolkit] = useState(false);

  // View states
  const [isDeclarationActive, setIsDeclarationActive] = useState(false);
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [isWorkspacePlaceholderOpen, setIsWorkspacePlaceholderOpen] = useState(false);

  const selectionGridRef = useRef<HTMLDivElement>(null);

  // Initialize stored assignment from localStorage safely
  useEffect(() => {
    const stored = getStoredAssignment();
    if (stored) {
      setAssignment(stored);
      const proj = getProjectById(stored.projectId) || getProjectByNumber(stored.projectNumber);
      if (proj) {
        setAssignedProject(proj);
        // Load stored toolkit for this assigned project
        const tk = getStoredToolkit(stored.cycleId || PROJECT_CYCLE, proj.id);
        setToolkitData(tk);
      } else {
        clearAssignment();
        setAssignment(null);
      }
    }
  }, []);

  // Update toolkit data state and save locally
  const handleUpdateToolkitData = (updatedData: ProjectToolkitData) => {
    setIsAutosavingToolkit(true);
    setToolkitData(updatedData);
    saveToolkit(updatedData);
    setTimeout(() => {
      setIsAutosavingToolkit(false);
    }, 300);
  };

  // Handle selection of project number from grid
  const handleSelectNumber = (num: number) => {
    setPendingNumber(num);
  };

  // Handle confirmation of assignment
  const handleConfirmAssignment = (num: number) => {
    setPendingNumber(null);
    const proj = getProjectByNumber(num);
    if (!proj) return;

    const newAssignment = saveAssignment(proj.number, proj.id);
    setAssignment(newAssignment);
    setAssignedProject(proj);
    setJustRevealedProject(proj);

    // Initialize toolkit for newly assigned project
    const tk = getStoredToolkit(PROJECT_CYCLE, proj.id);
    setToolkitData(tk);

    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Handle completion of Declaration form
  const handleDeclarationComplete = (updatedAssignment: StoredAssignment) => {
    setAssignment(updatedAssignment);
    setIsDeclarationActive(false);
    // Automatically open Project Brief after completing declaration
    setIsBriefOpen(true);
  };

  // Handle Dev Reset
  const handleDevReset = () => {
    clearAssignment();
    setAssignment(null);
    setAssignedProject(null);
    setJustRevealedProject(null);
    setPendingNumber(null);
    setIsDeclarationActive(false);
    setIsBriefOpen(false);
    setIsWorkspacePlaceholderOpen(false);
    setRoomViewMode('dashboard');
    setActiveToolId(null);
    setToolkitData(null);
  };

  const handleScrollToSelection = () => {
    selectionGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenToolkit = () => {
    setRoomViewMode('toolkit');
    setActiveToolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getToolTitle = (id: ToolId | null): string | undefined => {
    if (!id) return undefined;
    switch (id) {
      case 'research-planner':
        return 'Research Planner';
      case 'research-question-builder':
        return 'Research Question Builder';
      case 'literature-matrix':
        return 'Literature Review Matrix';
      case 'source-manager':
        return 'Source Manager';
      case 'citation-tool':
        return 'Citation & Reference Tool';
      case 'outline-builder':
        return 'Project Outline Builder';
      case 'data-lab':
        return 'Data Lab';
      case 'survey-builder':
        return 'Survey Builder';
      case 'text-analyzer':
        return 'Word & Text Analyzer';
      case 'checklist':
        return 'Project Checklist';
      default:
        return undefined;
    }
  };

  const activeToolName = getToolTitle(activeToolId);

  return (
    <div className="relative min-h-screen bg-[#021f18] text-[#f7faf8] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-gradient from-[#063b2e]/30 via-[#021f18]/40 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-radial-gradient from-[#0b8f6a]/10 via-[#021f18]/20 to-transparent blur-3xl rounded-full" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(214, 181, 109, 0.4) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.04] stroke-[#d6b45a]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="20%" x2="100%" y2="20%" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="0" y1="80%" x2="100%" y2="80%" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="15%" y1="0" x2="15%" y2="100%" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="85%" y1="0" x2="85%" y2="100%" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {!isAccessGranted ? (
          <div className="animate-fade-in">
            {/* Restricted Access Screen */}
            <ProjectRoomHero />
            <ProjectAccessCard onAccessSuccess={() => setIsAccessGranted(true)} />
            <ProjectJourney />
          </div>
        ) : isDeclarationActive && assignedProject ? (
          /* Participant Declaration View */
          <div className="animate-fade-in">
            <ProjectDeclaration
              project={assignedProject}
              onComplete={handleDeclarationComplete}
            />
          </div>
        ) : roomViewMode === 'toolkit' && assignedProject && toolkitData ? (
          /* Phase 5 Toolkit View */
          <div className="animate-fade-in space-y-6">
            <ToolkitHeader
              projectId={assignedProject.id}
              projectNumber={assignedProject.number}
              activeToolId={activeToolId}
              activeToolName={activeToolName}
              isAutosaving={isAutosavingToolkit}
              lastSavedAt={toolkitData.lastSavedAt}
              onBackToDashboard={() => setActiveToolId(null)}
              onBackToProject={() => setRoomViewMode('dashboard')}
            />

            {!activeToolId ? (
              <ToolkitDashboard
                projectId={assignedProject.id}
                projectNumber={assignedProject.number}
                toolkitData={toolkitData}
                onSelectTool={(tid) => {
                  setActiveToolId(tid);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onRestoreBackup={(restored) => handleUpdateToolkitData(restored)}
              />
            ) : (
              <div className="bg-[#063b2e]/40 border border-[#0b8f6a]/30 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
                {activeToolId === 'research-planner' && (
                  <ResearchPlannerTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'research-question-builder' && (
                  <ResearchQuestionBuilderTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'literature-matrix' && (
                  <LiteratureMatrixTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'source-manager' && (
                  <SourceManagerTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'citation-tool' && (
                  <CitationTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'outline-builder' && (
                  <ProjectOutlineBuilderTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'data-lab' && (
                  <DataLabTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'survey-builder' && (
                  <SurveyBuilderTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'text-analyzer' && (
                  <TextAnalyzerTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
                {activeToolId === 'checklist' && (
                  <ProjectChecklistTool toolkitData={toolkitData} onUpdateToolkitData={handleUpdateToolkitData} />
                )}
              </div>
            )}
          </div>
        ) : (
          /* Main Workspace Dashboard */
          <div className="animate-fade-in space-y-12">
            <ProjectRoomDashboard
              assignedProject={assignedProject}
              declarationAccepted={!!assignment?.declarationAccepted}
              onOpenBrief={() => setIsBriefOpen(true)}
              onOpenToolkit={handleOpenToolkit}
              onCompleteDeclaration={() => setIsDeclarationActive(true)}
              onScrollToSelection={handleScrollToSelection}
              onLockWorkspace={() => setIsAccessGranted(false)}
              onDevReset={handleDevReset}
            />

            {/* Just Revealed Animation view if just confirmed */}
            {justRevealedProject && (
              <AssignmentReveal
                project={justRevealedProject}
                onOpenBrief={() => {
                  setJustRevealedProject(null);
                  if (assignment?.declarationAccepted) {
                    setIsBriefOpen(true);
                  } else {
                    setIsDeclarationActive(true);
                  }
                }}
              />
            )}

            {/* Selection Grid (Shown if no project assigned yet) */}
            {!assignedProject && (
              <div ref={selectionGridRef} className="pt-4 border-t border-[#0b8f6a]/20">
                <ProjectNumberGrid onSelectNumber={handleSelectNumber} />
              </div>
            )}

            {/* Journey Pipeline */}
            <ProjectJourney />
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {pendingNumber !== null && (
        <ProjectConfirmation
          projectNumber={pendingNumber}
          onCancel={() => setPendingNumber(null)}
          onConfirm={handleConfirmAssignment}
        />
      )}

      {/* Full Project Brief Modal */}
      {isBriefOpen && assignedProject && (
        <ProjectBriefModal
          project={assignedProject}
          onClose={() => setIsBriefOpen(false)}
          onBeginProject={() => {
            setIsBriefOpen(false);
            setIsWorkspacePlaceholderOpen(true);
          }}
        />
      )}

      {/* Workspace Ready Placeholder Modal */}
      {isWorkspacePlaceholderOpen && (
        <WorkspacePlaceholderModal
          projectNumber={assignedProject?.number}
          onClose={() => setIsWorkspacePlaceholderOpen(false)}
          onOpenToolkit={handleOpenToolkit}
        />
      )}
    </div>
  );
};

export default ProjectRoomPage;
