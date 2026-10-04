import React, { useState } from 'react';
import { INNOVATION_CHALLENGES, CLIMATE_SCENARIOS, type InnovationChallenge, type ClimateMissionScenario } from '../../data/gamesData';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { Lightbulb, Leaf, CheckCircle2, ArrowRight } from 'lucide-react';

interface SimulationGameProps {
  mode: 'innovation-lab' | 'climate-mission';
  onExit: () => void;
  onViewProgress?: () => void;
}

export const SimulationGame: React.FC<SimulationGameProps> = ({ mode, onExit, onViewProgress }) => {
  const [innovationData] = useState<InnovationChallenge>(INNOVATION_CHALLENGES[0]);
  const [climateData] = useState<ClimateMissionScenario>(CLIMATE_SCENARIOS[0]);

  const [selectedApproachId, setSelectedApproachId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalXp, setFinalXp] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!selectedApproachId || isSubmitted) return;

    setIsSubmitted(true);

    if (mode === 'innovation-lab') {
      const approach = innovationData.approaches.find((a) => a.id === selectedApproachId);
      if (approach) {
        const totalScore = Math.round(
          (approach.creativityScore + approach.feasibilityScore + approach.impactScore + approach.scalabilityScore) * 2.5
        );
        setScore(totalScore);

        const earnedXp = 450;
        const result = recordGameCompletion({
          gameId: 'innovation-lab',
          earnedXp,
          score: totalScore,
          skillsImpact: { creativity: 18, criticalThinking: 10 }
        });

        setFinalXp(earnedXp);
        setUnlockedAchievements(result.newlyUnlockedAchievements);
      }
    } else {
      const choice = climateData.choices.find((c) => c.id === selectedApproachId);
      if (choice) {
        const totalScore = Math.round(
          (choice.impacts.environmentalHealth + choice.impacts.communityWelfare + choice.impacts.economicActivity) * 10
        );
        setScore(totalScore);

        const earnedXp = 400;
        const result = recordGameCompletion({
          gameId: 'climate-mission',
          earnedXp,
          score: totalScore,
          skillsImpact: { creativity: 10, decisionMaking: 12 }
        });

        setFinalXp(earnedXp);
        setUnlockedAchievements(result.newlyUnlockedAchievements);
      }
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <GameResultsScreen
        gameTitle={mode === 'innovation-lab' ? 'INNOVATION LAB' : 'CLIMATE MISSION'}
        score={score}
        xpEarned={finalXp}
        summaryText={
          mode === 'innovation-lab'
            ? 'Tested community innovation framework with constraint evaluation.'
            : 'Completed environmental management policy simulation.'
        }
        skillsPracticed={
          mode === 'innovation-lab'
            ? ['Creativity', 'Feasibility', 'Scalability']
            : ['Environmental Awareness', 'Sustainability', 'Systems Thinking']
        }
        newAchievements={unlockedAchievements}
        onPlayAgain={() => {
          setSelectedApproachId(null);
          setIsSubmitted(false);
          setScore(0);
          setIsFinished(false);
        }}
        onBackToCenter={onExit}
        onViewProgress={onViewProgress}
      />
    );
  }

  if (mode === 'innovation-lab') {
    const selectedApproach = innovationData.approaches.find((a) => a.id === selectedApproachId);
    return (
      <div className="min-h-[80vh] flex flex-col bg-obsidian text-ivory">
        <GameHeader
          title="Innovation Lab"
          categoryLabel="CREATIVE PROBLEM SOLVING"
          score={score}
          onExit={onExit}
        />

        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-deep-emerald/70 to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-3">
              <span className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-gold" />
                {innovationData.title}
              </span>
              <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-sans">
                {innovationData.problem}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {innovationData.constraints.map((c) => (
                  <span key={c} className="text-[10px] font-mono font-bold bg-black/40 border border-gold/20 text-gold px-2.5 py-1 rounded">
                    Constraint: {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block">
                SELECT AN INNOVATIVE SOLUTION MODEL:
              </span>
              {innovationData.approaches.map((app) => {
                const isSelected = selectedApproachId === app.id;
                let btnClass = 'bg-white/5 border-gold/20 hover:border-gold/60 text-ivory';
                if (isSelected) {
                  btnClass = 'bg-deep-emerald border-gold text-gold ring-2 ring-gold/40';
                }

                return (
                  <button
                    key={app.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => setSelectedApproachId(app.id)}
                    className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 shadow-md space-y-2 focus:outline-none ${btnClass}`}
                  >
                    <span className="font-bold text-sm sm:text-base block">{app.title}</span>
                    <p className="text-xs text-sage leading-relaxed">{app.description}</p>
                  </button>
                );
              })}
            </div>

            {isSubmitted && selectedApproach && (
              <div className="p-5 bg-emerald/20 border border-emerald/50 rounded-xl space-y-3 text-mint animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm text-gold">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                  <span>SIMULATION EVALUATION</span>
                </div>
                <p className="text-xs text-ivory leading-relaxed">{selectedApproach.feedback}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 bg-obsidian/60 border border-gold/20 rounded">
                    <span className="text-sage block">Creativity:</span>
                    <span className="text-gold font-bold">{selectedApproach.creativityScore}%</span>
                  </div>
                  <div className="p-2 bg-obsidian/60 border border-gold/20 rounded">
                    <span className="text-sage block">Feasibility:</span>
                    <span className="text-mint font-bold">{selectedApproach.feasibilityScore}%</span>
                  </div>
                  <div className="p-2 bg-obsidian/60 border border-gold/20 rounded">
                    <span className="text-sage block">Impact:</span>
                    <span className="text-blue-300 font-bold">{selectedApproach.impactScore}%</span>
                  </div>
                  <div className="p-2 bg-obsidian/60 border border-gold/20 rounded">
                    <span className="text-sage block">Scalability:</span>
                    <span className="text-purple-300 font-bold">{selectedApproach.scalabilityScore}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6">
            {!isSubmitted ? (
              <button
                type="button"
                disabled={!selectedApproachId}
                onClick={handleSubmit}
                className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider border shadow-lg transition ${
                  selectedApproachId
                    ? 'bg-emerald hover:bg-emerald-600 border-gold text-white'
                    : 'bg-white/5 border-white/10 text-sage/50 cursor-not-allowed'
                }`}
              >
                TEST SOLUTION SIMULATION
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>VIEW RESULTS & XP BREAKDOWN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  // CLIMATE MISSION MODE
  const selectedChoice = climateData.choices.find((c) => c.id === selectedApproachId);
  return (
    <div className="min-h-[80vh] flex flex-col bg-obsidian text-ivory">
      <GameHeader
        title="Climate Mission"
        categoryLabel="SUSTAINABILITY SIMULATION"
        score={score}
        onExit={onExit}
      />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-deep-emerald/70 to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald" />
              REGION: {climateData.region} — {climateData.challengeTitle}
            </span>
            <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-sans">
              {climateData.description}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-wider block">
              CHOOSE ENVIRONMENTAL POLICY DIRECTION:
            </span>
            {climateData.choices.map((ch) => {
              const isSelected = selectedApproachId === ch.id;
              let btnClass = 'bg-white/5 border-gold/20 hover:border-gold/60 text-ivory';
              if (isSelected) {
                btnClass = 'bg-deep-emerald border-gold text-gold ring-2 ring-gold/40';
              }

              return (
                <button
                  key={ch.id}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => setSelectedApproachId(ch.id)}
                  className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 shadow-md space-y-2 focus:outline-none ${btnClass}`}
                >
                  <span className="font-bold text-sm sm:text-base block">{ch.title}</span>
                  <p className="text-xs text-sage leading-relaxed">{ch.description}</p>
                </button>
              );
            })}
          </div>

          {isSubmitted && selectedChoice && (
            <div className="p-5 bg-emerald/20 border border-emerald/50 rounded-xl space-y-3 text-mint animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-sm text-gold">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span>ENVIRONMENTAL & COMMUNITY IMPACT</span>
              </div>
              <p className="text-xs text-ivory leading-relaxed">{selectedChoice.feedback}</p>
            </div>
          )}
        </div>

        <div className="pt-6">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={!selectedApproachId}
              onClick={handleSubmit}
              className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider border shadow-lg transition ${
                selectedApproachId
                  ? 'bg-emerald hover:bg-emerald-600 border-gold text-white'
                  : 'bg-white/5 border-white/10 text-sage/50 cursor-not-allowed'
              }`}
            >
              EXECUTE ECOLOGICAL INTERVENTION
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>VIEW RESULTS & XP BREAKDOWN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
