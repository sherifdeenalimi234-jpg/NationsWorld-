import React from 'react';
import { NATIONSWORLD_TEAMS } from '../data/teams';
import { Layers, Info } from 'lucide-react';

export const TeamsOverview: React.FC = () => {
  return (
    <section id="teams" className="py-20 px-4 sm:px-6 lg:px-8 bg-obsidian text-ivory border-b border-gold/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block mb-2">
            DISCIPLINARY STRUCTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory tracking-tight">
            NationsWorld Institutes & Teams
          </h2>
          <p className="text-sm sm:text-base text-sage mt-2">
            Prospective members select one primary team to spearhead research, policy formulation, and collaborative projects.
          </p>
        </div>

        {/* Special NASDI Structural Rule Callout */}
        <div className="mb-8 p-5 bg-deep-emerald/50 rounded-2xl border border-gold/30 flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-ivory">
            <strong className="font-bold text-gold">NASDI Governance Structure:</strong> Members admitted into NASDI (NationsWorld Affairs of Sustainable Development Institute) are automatically part of the Research & Innovation Team under the current NationsWorld structure.
          </div>
        </div>

        {/* 15 Teams Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NATIONSWORLD_TEAMS.map((team, idx) => (
            <div
              key={team.id}
              className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald/20 text-mint text-xs font-bold flex items-center justify-center border border-gold/20">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-obsidian border border-gold/20 text-sage">
                    {team.category}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-ivory flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-gold shrink-0" />
                  {team.name}
                </h3>
                <p className="text-xs text-sage mt-2 leading-relaxed">
                  {team.description}
                </p>
              </div>

              {team.id === 'nasdi' && (
                <div className="mt-3 pt-2 border-t border-gold/20 text-[11px] text-mint font-semibold">
                  * Auto-enrolled in Research & Innovation
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
