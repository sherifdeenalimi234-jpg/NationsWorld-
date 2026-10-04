import React, { useState } from 'react';
import { ProjectRoomHero } from './ProjectRoomHero';
import { ProjectAccessCard } from './ProjectAccessCard';
import { ProjectRoomDashboard } from './ProjectRoomDashboard';
import { ProjectJourney } from './ProjectJourney';

export const ProjectRoomPage: React.FC = () => {
  const [isAccessGranted, setIsAccessGranted] = useState(false);

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
            {/* Landing Hero */}
            <ProjectRoomHero />

            {/* Access Card */}
            <ProjectAccessCard onAccessSuccess={() => setIsAccessGranted(true)} />

            {/* Journey Preview on restricted landing page */}
            <ProjectJourney />
          </div>
        ) : (
          <div className="animate-fadeIn space-y-10">
            {/* Dashboard after access granted */}
            <ProjectRoomDashboard onLockWorkspace={() => setIsAccessGranted(false)} />

            {/* System Progression Journey */}
            <ProjectJourney />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRoomPage;
