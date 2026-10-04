import React, { useState, useEffect, useRef } from 'react';
import { ProjectRoomHero } from './ProjectRoomHero';
import { ProjectAccessCard } from './ProjectAccessCard';
import { ProjectRoomDashboard } from './ProjectRoomDashboard';
import { ProjectNumberGrid } from './ProjectNumberGrid';
import { ProjectConfirmation } from './ProjectConfirmation';
import { AssignmentReveal } from './AssignmentReveal';
import { ProjectBriefModal } from './ProjectBriefModal';
import { ProjectJourney } from './ProjectJourney';

import { getProjectByNumber, getProjectById } from '../../data/projectsData';
import type { ProjectSlot } from '../../data/projectsData';
import { getStoredAssignment, saveAssignment, clearAssignment } from '../../utils/projectRoomStorage';

export const ProjectRoomPage: React.FC = () => {
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [assignedProject, setAssignedProject] = useState<ProjectSlot | null>(null);
  const [pendingNumber, setPendingNumber] = useState<number | null>(null);
  const [justRevealedProject, setJustRevealedProject] = useState<ProjectSlot | null>(null);
  const [isBriefOpen, setIsBriefOpen] = useState(false);

  const selectionGridRef = useRef<HTMLDivElement>(null);

  // Initialize stored assignment from localStorage safely
  useEffect(() => {
    const stored = getStoredAssignment();
    if (stored) {
      const proj = getProjectById(stored.projectId) || getProjectByNumber(stored.projectNumber);
      if (proj) {
        setAssignedProject(proj);
      } else {
        // Handle unknown ID
        clearAssignment();
      }
    }
  }, []);

  // Handle number click in grid
  const handleSelectNumber = (num: number) => {
    setPendingNumber(num);
  };

  // Handle confirmation
  const handleConfirmAssignment = (num: number) => {
    setPendingNumber(null);
    const proj = getProjectByNumber(num);
    if (!proj) return;

    saveAssignment(proj.number, proj.id);
    setAssignedProject(proj);
    setJustRevealedProject(proj);

    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Handle Dev Reset
  const handleDevReset = () => {
    clearAssignment();
    setAssignedProject(null);
    setJustRevealedProject(null);
    setPendingNumber(null);
    setIsBriefOpen(false);
  };

  const handleScrollToSelection = () => {
    selectionGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle radial gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-gradient from-deep-emerald/25 via-obsidian/40 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-radial-gradient from-emerald/10 via-obsidian/20 to-transparent blur-3xl rounded-full" />

        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(214, 181, 109, 0.4) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Faint geometric decorative lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.04] stroke-gold"
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
          <div className="animate-fadeIn">
            {/* Restricted Access Screen */}
            <ProjectRoomHero />
            <ProjectAccessCard onAccessSuccess={() => setIsAccessGranted(true)} />
            <ProjectJourney />
          </div>
        ) : (
          <div className="animate-fadeIn space-y-12">
            {/* Main Dashboard */}
            <ProjectRoomDashboard
              assignedProject={assignedProject}
              onOpenBrief={() => setIsBriefOpen(true)}
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
                  setIsBriefOpen(true);
                }}
              />
            )}

            {/* Selection Grid (Shown if no project assigned yet) */}
            {!assignedProject && (
              <div ref={selectionGridRef} className="pt-4 border-t border-gold/20">
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
        />
      )}
    </div>
  );
};

export default ProjectRoomPage;
