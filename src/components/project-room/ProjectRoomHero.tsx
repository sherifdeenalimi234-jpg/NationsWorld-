import React from 'react';
import { Lock } from 'lucide-react';

export const ProjectRoomHero: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-deep-emerald/60 border border-gold/30 text-gold text-[11px] font-mono font-bold tracking-widest uppercase shadow-sm">
        <Lock className="w-3.5 h-3.5 text-gold shrink-0" />
        <span>NATIONSWORLD • RESTRICTED WORKSPACE</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ivory tracking-tight leading-tight">
        Project Room
      </h1>

      {/* Supporting Headline */}
      <p className="text-lg sm:text-xl font-bold text-gold tracking-wide">
        Choose. Research. Build. Contribute.
      </p>

      {/* Supporting Paragraph */}
      <p className="text-xs sm:text-sm text-sage leading-relaxed max-w-2xl mx-auto">
        A private workspace for NationsWorld participants working on research, development, leadership, innovation and other assigned projects.
      </p>
    </div>
  );
};
