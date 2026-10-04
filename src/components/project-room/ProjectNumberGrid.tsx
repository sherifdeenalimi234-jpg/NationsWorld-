import React from 'react';
import { ProjectNumberCard } from './ProjectNumberCard';
import { PROJECTS_DATA } from '../../data/projectsData';
import { HelpCircle, AlertTriangle } from 'lucide-react';

interface ProjectNumberGridProps {
  onSelectNumber: (num: number) => void;
  selectedNumber?: number | null;
}

export const ProjectNumberGrid: React.FC<ProjectNumberGridProps> = ({
  onSelectNumber,
  selectedNumber = null,
}) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Selection Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-deep-emerald/80 border border-gold/30 text-gold text-[11px] font-mono font-bold tracking-widest uppercase">
          <HelpCircle className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>PROJECT ALLOCATION</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-ivory tracking-tight">
          Choose Your Project
        </h2>

        <p className="text-xs sm:text-sm text-gold font-medium max-w-2xl mx-auto">
          Select one project number. Your project topic will remain hidden until your selection is confirmed.
        </p>

        {/* Warning Callout Box */}
        <div className="max-w-xl mx-auto p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-center gap-2.5 mt-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-[11px] sm:text-xs">
            Choose carefully. Once assigned, your selection cannot be changed during the current project cycle.
          </span>
        </div>
      </div>

      {/* Grid of 24 Project Numbers */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 pt-2">
        {PROJECTS_DATA.map((project) => (
          <ProjectNumberCard
            key={project.id}
            number={project.number}
            onSelect={onSelectNumber}
            isSelected={selectedNumber === project.number}
          />
        ))}
      </div>
    </div>
  );
};
