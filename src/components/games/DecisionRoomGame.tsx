import React, { useState } from 'react';
import { DECISION_SCENARIOS } from '../../data/gamesData';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { Shield, Sparkles, Building2, Users, HeartPulse, GraduationCap } from 'lucide-react';

interface DecisionRoomProps {
  onExit: () => void;
  onViewProgress?: () => void;
}

export const DecisionRoomGame: React.FC<DecisionRoomProps> = ({ onExit, onViewProgress }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [budget, setBudget] = useState(DECISION_SCENARIOS[0].initialBudget);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isChosen, setIsChosen] = useState(false);

  // Profile metric trackers
  const [metrics, setMetrics] = useState({
    education: 50,
    healthcare: 50,
    infrastructure: 50,
    employment: 50,
    trust: 50,
    environment: 50,
    risk: 50,
  });

  const [isFinished, setIsFinished] = useState(false);
  const [finalXp, setFinalXp] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const scenario = DECISION_SCENARIOS[currentScenarioIndex];

  const handleSelectOption = (optId: string) => {
    if (isChosen) return;
    setSelectedOptionId(optId);
  };

  const handleConfirmDecision = () => {
    if (!selectedOptionId || isChosen) return;

    const chosenOption = scenario.options.find((o) => o.id === selectedOptionId);
    if (!chosenOption) return;

    setIsChosen(true);

    // Apply cost
    setBudget((prev) => Math.max(0, prev - chosenOption.cost));

    // Update metrics
    setMetrics((prev) => ({
      education: Math.min(100, Math.max(0, prev.education + (chosenOption.impacts.education || 0))),
      healthcare: Math.min(100, Math.max(0, prev.healthcare + (chosenOption.impacts.healthcare || 0))),
      infrastructure: Math.min(100, Math.max(0, prev.infrastructure + (chosenOption.impacts.infrastructure || 0))),
      employment: Math.min(100, Math.max(0, prev.employment + (chosenOption.impacts.employment || 0))),
      trust: Math.min(100, Math.max(0, prev.trust + (chosenOption.impacts.trust || 0))),
      environment: Math.min(100, Math.max(0, prev.environment + (chosenOption.impacts.environment || 0))),
      risk: Math.min(100, Math.max(0, prev.risk + (chosenOption.impacts.risk || 0))),
    }));
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < DECISION_SCENARIOS.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsChosen(false);
    } else {
      // Calculate leadership profile
      const earnedXp = 500;
      const result = recordGameCompletion({
        gameId: 'decision-room',
        earnedXp,
        score: Math.round(metrics.trust * 10 + metrics.employment * 5),
        skillsImpact: { leadership: 15, decisionMaking: 15, criticalThinking: 10 }
      });

      setFinalXp(earnedXp);
      setUnlockedAchievements(result.newlyUnlockedAchievements);
      setIsFinished(true);
    }
  };

  // Determine leadership style
  const getLeadershipStyle = () => {
    if (metrics.trust >= 75 && metrics.healthcare >= 65) return 'Community-First Leader';
    if (metrics.employment >= 70 && metrics.education >= 65) return 'Strategic Builder';
    if (metrics.risk <= 45 && metrics.trust >= 65) return 'Pragmatic Risk Manager';
    if (metrics.environment >= 65) return 'Visionary Sustainability Catalyst';
    return 'Balanced Decision Maker';
  };

  if (isFinished) {
    const style = getLeadershipStyle();
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
        <div className="bg-gradient-to-b from-deep-emerald/90 via-obsidian to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold flex items-center justify-center gap-1.5">
              <Shield className="w-4 h-4 text-gold" />
              FLAGSHIP EXPERIENCE COMPLETE
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-ivory">YOUR LEADERSHIP PROFILE</h1>
            <p className="text-xs sm:text-sm text-sage">
              Evaluated across stakeholder trust, budget prudence, risk management, and long-term community impact.
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-obsidian/80 border border-gold/40 rounded-xl p-6 text-center shadow-inner space-y-3">
            <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">IDENTIFIED LEADERSHIP STYLE</span>
            <h2 className="text-2xl font-extrabold text-mint">{style}</h2>
            <p className="text-xs text-ivory/80 max-w-lg mx-auto">
              You demonstrate key institutional judgment by navigating complex social trade-offs with systematic resource allocation and public interest prioritization.
            </p>
          </div>

          {/* Metrics Radar Bars */}
          <div className="space-y-4 bg-white/5 border border-gold/20 p-5 rounded-xl">
            <h3 className="text-xs font-bold uppercase text-gold tracking-wider">STRATEGIC INDICATORS</h3>

            <div className="space-y-3 text-xs font-semibold">
              <div>
                <div className="flex justify-between text-ivory mb-1">
                  <span>Public Trust & Sentiment</span>
                  <span className="text-gold font-bold">{metrics.trust}%</span>
                </div>
                <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full rounded-full transition-all duration-500" style={{ width: `${metrics.trust}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-ivory mb-1">
                  <span>Education & Human Capacity</span>
                  <span className="text-mint font-bold">{metrics.education}%</span>
                </div>
                <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald h-full rounded-full transition-all duration-500" style={{ width: `${metrics.education}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-ivory mb-1">
                  <span>Healthcare Security</span>
                  <span className="text-blue-400 font-bold">{metrics.healthcare}%</span>
                </div>
                <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.healthcare}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-ivory mb-1">
                  <span>Employment & Micro-Economy</span>
                  <span className="text-purple-400 font-bold">{metrics.employment}%</span>
                </div>
                <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${metrics.employment}%` }} />
                </div>
              </div>
            </div>
          </div>

          <GameResultsScreen
            gameTitle="THE DECISION ROOM"
            score={Math.round(metrics.trust * 10 + metrics.employment * 5)}
            xpEarned={finalXp}
            summaryText={`Completed all scenario decisions with ₦${budget.toLocaleString()} capital remaining.`}
            skillsPracticed={['Leadership', 'Decision Making', 'Strategy']}
            newAchievements={unlockedAchievements}
            onPlayAgain={() => {
              setCurrentScenarioIndex(0);
              setBudget(DECISION_SCENARIOS[0].initialBudget);
              setSelectedOptionId(null);
              setIsChosen(false);
              setMetrics({ education: 50, healthcare: 50, infrastructure: 50, employment: 50, trust: 50, environment: 50, risk: 50 });
              setIsFinished(false);
            }}
            onBackToCenter={onExit}
            onViewProgress={onViewProgress}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col bg-obsidian text-ivory">
      <GameHeader
        title="The Decision Room"
        categoryLabel="FLAGSHIP LEADERSHIP SIMULATION"
        currentStep={currentScenarioIndex + 1}
        totalSteps={DECISION_SCENARIOS.length}
        onExit={onExit}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Dashboard Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-deep-emerald/50 border border-gold/30 rounded-xl flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-gold shrink-0" />
              <div>
                <span className="block text-[9px] font-bold uppercase text-sage">AVAILABLE BUDGET</span>
                <span className="text-sm font-extrabold text-gold font-mono">₦{budget.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-deep-emerald/50 border border-gold/30 rounded-xl flex items-center gap-2.5">
              <Users className="w-4 h-4 text-mint shrink-0" />
              <div>
                <span className="block text-[9px] font-bold uppercase text-sage">PUBLIC TRUST</span>
                <span className="text-sm font-extrabold text-mint font-mono">{metrics.trust}%</span>
              </div>
            </div>

            <div className="p-3 bg-deep-emerald/50 border border-gold/30 rounded-xl flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="block text-[9px] font-bold uppercase text-sage">EDUCATION INDEX</span>
                <span className="text-sm font-extrabold text-blue-300 font-mono">{metrics.education}</span>
              </div>
            </div>

            <div className="p-3 bg-deep-emerald/50 border border-gold/30 rounded-xl flex items-center gap-2.5">
              <HeartPulse className="w-4 h-4 text-pink-400 shrink-0" />
              <div>
                <span className="block text-[9px] font-bold uppercase text-sage">HEALTHCARE INDEX</span>
                <span className="text-sm font-extrabold text-pink-300 font-mono">{metrics.healthcare}</span>
              </div>
            </div>
          </div>

          {/* Scenario Description */}
          <div className="bg-gradient-to-br from-deep-emerald/80 to-obsidian border border-gold/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block">
              {scenario.title}
            </span>
            <p className="text-sm sm:text-base text-ivory/90 leading-relaxed font-sans">
              {scenario.context}
            </p>
          </div>

          {/* Scenario Options */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-wider block">
              CHOOSE YOUR STRATEGIC INTERVENTION:
            </span>
            {scenario.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnClass = 'bg-white/5 border-gold/20 hover:border-gold/60 text-ivory';
              if (isSelected) {
                btnClass = 'bg-deep-emerald border-gold text-gold ring-2 ring-gold/40';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isChosen}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 shadow-md space-y-2 focus:outline-none ${btnClass}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-ivory">{opt.label}</span>
                    <span className="text-xs font-mono font-bold text-gold bg-black/40 px-2.5 py-1 rounded border border-gold/30">
                      Cost: ₦{opt.cost.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-sage leading-relaxed">{opt.description}</p>
                </button>
              );
            })}
          </div>

          {/* Consequence Box */}
          {isChosen && selectedOptionId && (
            <div className="bg-emerald/20 border border-emerald/50 rounded-xl p-5 text-mint space-y-2 animate-fadeIn shadow-lg">
              <span className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold" />
                CONSEQUENCES & PUBLIC IMPACT
              </span>
              <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed">
                {scenario.options.find((o) => o.id === selectedOptionId)?.consequenceText}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-6">
          {!isChosen ? (
            <button
              type="button"
              disabled={!selectedOptionId}
              onClick={handleConfirmDecision}
              className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider border shadow-lg transition ${
                selectedOptionId
                  ? 'bg-emerald hover:bg-emerald-600 border-gold text-white'
                  : 'bg-white/5 border-white/10 text-sage/50 cursor-not-allowed'
              }`}
            >
              EXECUTE DECISION
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextScenario}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition"
            >
              {currentScenarioIndex < DECISION_SCENARIOS.length - 1 ? 'PROCEED TO NEXT SCENARIO' : 'VIEW LEADERSHIP EVALUATION'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
