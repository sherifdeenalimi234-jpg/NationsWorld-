import React from 'react';
import { NATIONSWORLD_TEAMS } from '../data/teams';
import { Layers, Info } from 'lucide-react';

export const TeamsOverview: React.FC = () => {
  return (
    <section id="teams" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-nw-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-nw-green">
            DISCIPLINARY STRUCTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-nw-dark mt-1">
            NationsWorld Institutes & Teams
          </h2>
          <p className="text-sm sm:text-base text-nw-muted mt-2">
            Prospective members select one primary team to spearhead research, policy formulation, and collaborative projects.
          </p>
        </div>

        {/* Special NASDI Structural Rule Callout */}
        <div className="mb-8 p-4 bg-nw-soft rounded-2xl border border-nw-green/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-nw-green shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-nw-dark">
            <strong className="font-bold text-nw-deep">NASDI Governance Structure:</strong> Members admitted into NASDI (NationsWorld Affairs of Sustainable Development Institute) are automatically part of the Research & Innovation Team under the current NationsWorld structure.
          </div>
        </div>

        {/* 15 Teams Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NATIONSWORLD_TEAMS.map((team, idx) => (
            <div
              key={team.id}
              className="p-5 rounded-2xl border border-nw-border bg-gray-50/50 hover:bg-nw-soft/40 hover:border-nw-green/40 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-nw-deep text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-nw-border text-nw-muted">
                    {team.category}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-nw-dark flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-nw-green shrink-0" />
                  {team.name}
                </h3>
                <p className="text-xs text-nw-muted mt-2 leading-relaxed">
                  {team.description}
                </p>
              </div>

              {team.id === 'nasdi' && (
                <div className="mt-3 pt-2 border-t border-emerald-200 text-[11px] text-nw-deep font-semibold">
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
