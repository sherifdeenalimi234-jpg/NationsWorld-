import React, { useState } from 'react';
import { GOVERNANCE_SECTORS } from '../../data/gamesData';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { Scale, CheckCircle2 } from 'lucide-react';

interface GovernanceChallengeProps {
  onExit: () => void;
  onViewProgress?: () => void;
}

export const GovernanceChallengeGame: React.FC<GovernanceChallengeProps> = ({ onExit, onViewProgress }) => {
  const TOTAL_BUDGET = 100; // 100% or 100M
  const [allocations, setAllocations] = useState<Record<string, number>>({
    education: 20,
    healthcare: 20,
    infrastructure: 20,
    employment: 15,
    security: 15,
    socialProtection: 10,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalXp, setFinalXp] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);

  const handleSliderChange = (sectorId: string, val: number) => {
    if (isSubmitted) return;
    setAllocations((prev) => ({
      ...prev,
      [sectorId]: val,
    }));
  };

  const handleEvaluate = () => {
    if (totalAllocated !== TOTAL_BUDGET) return;

    setIsSubmitted(true);

    // Score based on how balanced allocations are within recommended sector min/max
    let evalScore = 100;
    GOVERNANCE_SECTORS.forEach((sec) => {
      const val = allocations[sec.id] || 0;
      if (val < sec.minAlloc) evalScore -= (sec.minAlloc - val) * 2;
      if (val > sec.maxAlloc) evalScore -= (val - sec.maxAlloc) * 2;
    });

    const finalScore = Math.max(200, evalScore * 8);
    setScore(finalScore);

    const earnedXp = 450;
    const result = recordGameCompletion({
      gameId: 'governance-challenge',
      earnedXp,
      score: finalScore,
      skillsImpact: { leadership: 12, decisionMaking: 12, criticalThinking: 8 }
    });

    setFinalXp(earnedXp);
    setUnlockedAchievements(result.newlyUnlockedAchievements);
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <GameResultsScreen
        gameTitle="GOVERNANCE CHALLENGE"
        score={score}
        xpEarned={finalXp}
        summaryText={`Balanced public allocation achieved with optimal civic sustainability score.`}
        skillsPracticed={['Budget Strategy', 'Policy Balance', 'Civic Impact']}
        newAchievements={unlockedAchievements}
        onPlayAgain={() => {
          setAllocations({
            education: 20,
            healthcare: 20,
            infrastructure: 20,
            employment: 15,
            security: 15,
            socialProtection: 10,
          });
          setIsSubmitted(false);
          setScore(0);
          setIsFinished(false);
        }}
        onBackToCenter={onExit}
        onViewProgress={onViewProgress}
      />
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col bg-obsidian text-ivory">
      <GameHeader
        title="Governance Challenge"
        categoryLabel="PUBLIC BUDGET ALLOCATION"
        score={score}
        onExit={onExit}
      />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-deep-emerald/70 to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-gold" />
              ANNUAL PUBLIC BUDGET EVALUATION
            </span>
            <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed">
              Distribute 100% of the national development budget across key civic sectors to ensure equitable human progress, public infrastructure, and security.
            </p>

            <div className="flex items-center justify-between p-3 bg-obsidian/80 border border-gold/20 rounded-xl mt-3">
              <span className="text-xs font-bold text-sage">TOTAL ALLOCATED:</span>
              <span className={`text-base font-extrabold font-mono ${
                totalAllocated === TOTAL_BUDGET
                  ? 'text-mint'
                  : totalAllocated > TOTAL_BUDGET
                  ? 'text-red-400'
                  : 'text-gold'
              }`}>
                {totalAllocated}% / {TOTAL_BUDGET}%
              </span>
            </div>
          </div>

          {/* Sectors Sliders */}
          <div className="space-y-4">
            {GOVERNANCE_SECTORS.map((sec) => {
              const currentVal = allocations[sec.id] || 0;
              return (
                <div key={sec.id} className="p-4 rounded-xl bg-white/5 border border-gold/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-ivory">{sec.name}</span>
                      <p className="text-[11px] text-sage">{sec.description}</p>
                    </div>
                    <span className="font-mono font-extrabold text-gold text-base shrink-0 bg-black/40 px-3 py-1 rounded border border-gold/30">
                      {currentVal}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={currentVal}
                    disabled={isSubmitted}
                    onChange={(e) => handleSliderChange(sec.id, parseInt(e.target.value) || 0)}
                    className="w-full accent-emerald h-2 bg-obsidian rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-sage font-mono">
                    <span>Recommended Range: {sec.minAlloc}% - {sec.maxAlloc}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {isSubmitted && (
            <div className="p-5 bg-emerald/20 border border-emerald/50 rounded-xl space-y-2 text-mint animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-sm text-gold">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span>BUDGET ALLOCATION EVALUATED!</span>
              </div>
              <p className="text-xs text-ivory leading-relaxed">
                Your budget distribution preserves strategic equilibrium between human capital (education/health) and economic drivers (infrastructure/employment).
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-6">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={totalAllocated !== TOTAL_BUDGET}
              onClick={handleEvaluate}
              className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider border shadow-lg transition ${
                totalAllocated === TOTAL_BUDGET
                  ? 'bg-emerald hover:bg-emerald-600 border-gold text-white'
                  : 'bg-white/5 border-white/10 text-sage/50 cursor-not-allowed'
              }`}
            >
              {totalAllocated === TOTAL_BUDGET ? 'SUBMIT BUDGET FOR CIVIC EVALUATION' : `ADJUST TO REACH EXACTLY 100% (${totalAllocated}%)`}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition"
            >
              VIEW RESULTS & XP BREAKDOWN
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
