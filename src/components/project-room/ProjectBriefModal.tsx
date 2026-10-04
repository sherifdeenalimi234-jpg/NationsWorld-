import React from 'react';
import type { ProjectSlot } from '../../data/projectsData';
import { ProjectBriefView } from './ProjectBriefView';
import { X } from 'lucide-react';

interface ProjectBriefModalProps {
  project: ProjectSlot;
  onClose: () => void;
  onBeginProject: () => void;
}

export const ProjectBriefModal: React.FC<ProjectBriefModalProps> = ({
  project,
  onClose,
  onBeginProject,
}) => {
  return (
    <div className="fixed inset-0 z-[110] bg-[#021f18]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
      <div className="w-full max-w-4xl my-auto relative max-h-[92vh] overflow-y-auto rounded-3xl custom-scrollbar shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#04271e]/90 hover:bg-[#084234] border border-[#0b8f6a]/30 text-[#64748b] hover:text-white transition-all shadow-lg focus:outline-none cursor-pointer"
          aria-label="Close brief"
        >
          <X className="w-5 h-5 text-[#d6b45a]" />
        </button>

        <ProjectBriefView
          project={project}
          onBeginProject={() => {
            onClose();
            onBeginProject();
          }}
          isModal={true}
        />
      </div>
    </div>
  );
};
