import React from 'react';
import { Lock } from 'lucide-react';

interface ProjectNumberCardProps {
  number: number;
  onSelect: (number: number) => void;
  isSelected?: boolean;
}

export const ProjectNumberCard: React.FC<ProjectNumberCardProps> = ({
  number,
  onSelect,
  isSelected = false,
}) => {
  const formattedNum = number < 10 ? `0${number}` : `${number}`;

  return (
    <button
      type="button"
      onClick={() => onSelect(number)}
      aria-label={`Select project number ${formattedNum}`}
      className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/60 cursor-pointer ${
        isSelected
          ? 'bg-gradient-to-br from-emerald/40 to-deep-emerald border-gold shadow-gold-glow scale-105 z-10'
          : 'bg-obsidian/80 hover:bg-deep-emerald/60 border-gold/25 hover:border-gold/60 hover:-translate-y-1 hover:shadow-lg'
      }`}
    >
      {/* Tile Lock Icon */}
      <div className="w-7 h-7 rounded-lg bg-deep-emerald/80 border border-gold/30 flex items-center justify-center text-gold mb-2 group-hover:scale-110 group-hover:border-gold transition-all">
        <Lock className="w-3.5 h-3.5 text-gold shrink-0" />
      </div>

      {/* Number Display */}
      <span className="text-2xl sm:text-3xl font-black font-mono text-ivory tracking-wider group-hover:text-gold transition-colors">
        {formattedNum}
      </span>

      {/* Mystery Badge */}
      <span className="mt-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-sage/70 group-hover:text-mint transition-colors">
        RESTRICTED
      </span>
    </button>
  );
};
