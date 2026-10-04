import React, { useState } from 'react';
import { RESEARCH_CASES } from '../../data/gamesData';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { Microscope, CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';

interface ResearchDetectiveProps {
  onExit: () => void;
  onViewProgress?: () => void;
}

export const ResearchDetectiveGame: React.FC<ResearchDetectiveProps> = ({ onExit, onViewProgress }) => {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalXp, setFinalXp] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const currentCase = RESEARCH_CASES[caseIndex];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedOption === currentCase.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 250);
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (caseIndex < RESEARCH_CASES.length - 1) {
      setCaseIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      const accuracy = Math.round((correctCount / RESEARCH_CASES.length) * 100);
      const earnedXp = Math.max(150, score);

      const result = recordGameCompletion({
        gameId: 'research-detective',
        earnedXp,
        score,
        accuracyPercent: accuracy,
        skillsImpact: { research: 18, criticalThinking: 12 }
      });

      setFinalXp(earnedXp);
      setUnlockedAchievements(result.newlyUnlockedAchievements);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <GameResultsScreen
        gameTitle="RESEARCH DETECTIVE"
        score={score}
        xpEarned={finalXp}
        accuracyPercent={Math.round((correctCount / RESEARCH_CASES.length) * 100)}
        summaryText={`Investigated ${correctCount} of ${RESEARCH_CASES.length} research cases correctly.`}
        skillsPracticed={['Evidence Evaluation', 'Scientific Literacy', 'Critical Analysis']}
        newAchievements={unlockedAchievements}
        onPlayAgain={() => {
          setCaseIndex(0);
          setSelectedOption(null);
          setIsSubmitted(false);
          setScore(0);
          setCorrectCount(0);
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
        title="Research Detective"
        categoryLabel="EVIDENCE & METHODOLOGY ANALYSIS"
        currentStep={caseIndex + 1}
        totalSteps={RESEARCH_CASES.length}
        score={score}
        onExit={onExit}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-deep-emerald/70 to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-1.5">
              <Microscope className="w-4 h-4 text-gold" />
              INVESTIGATION CASE #{caseIndex + 1}
            </span>
            <h3 className="text-lg font-bold text-ivory">{currentCase.claim}</h3>
            <p className="text-xs text-sage">{currentCase.context}</p>
          </div>

          {/* Studies Cards */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-gold uppercase tracking-wider block">
              SUBMITTED EVIDENCE STUDIES:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentCase.studies.map((st) => (
                <div key={st.id} className="p-4 rounded-xl bg-white/5 border border-gold/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-mint">{st.name}</span>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                      st.quality === 'High' ? 'bg-emerald/30 text-mint' : st.quality === 'Medium' ? 'bg-gold/30 text-gold' : 'bg-red-950/60 text-red-300'
                    }`}>
                      {st.quality} Quality
                    </span>
                  </div>
                  <div className="text-[11px] text-sage space-y-1">
                    <div><span className="text-ivory font-semibold">Sample Size:</span> {st.sampleSize}</div>
                    <div><span className="text-ivory font-semibold">Methodology:</span> {st.methodology}</div>
                    {st.finding && <div><span className="text-ivory font-semibold">Finding:</span> {st.finding}</div>}
                    {st.flaw && <div className="text-red-300"><span className="font-semibold">Identified Flaw:</span> {st.flaw}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-ivory flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold" />
              {currentCase.question}
            </h4>

            <div className="space-y-2">
              {currentCase.options.map((opt, idx) => {
                let btnClass = 'bg-white/5 border-gold/20 hover:border-gold/60 text-ivory';
                if (selectedOption === idx) {
                  btnClass = 'bg-deep-emerald border-gold text-gold ring-2 ring-gold/40';
                }
                if (isSubmitted) {
                  if (idx === currentCase.correctIndex) {
                    btnClass = 'bg-emerald/30 border-emerald text-mint font-bold';
                  } else if (selectedOption === idx) {
                    btnClass = 'bg-red-950/60 border-red-500 text-red-300';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md focus:outline-none ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-xl border text-sm space-y-2 animate-fadeIn ${
                selectedOption === currentCase.correctIndex
                  ? 'bg-emerald/15 border-emerald/40 text-mint'
                  : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedOption === currentCase.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                    <span>✓ SCIENTIFICALLY SOUND DECISION</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>✕ METHODOLOGICAL ERROR</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed">
                {currentCase.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-6">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider border shadow-lg transition ${
                selectedOption !== null
                  ? 'bg-emerald hover:bg-emerald-600 border-gold text-white'
                  : 'bg-white/5 border-white/10 text-sage/50 cursor-not-allowed'
              }`}
            >
              SUBMIT EVIDENCE ANALYSIS
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>{caseIndex < RESEARCH_CASES.length - 1 ? 'NEXT CASE FILE' : 'VIEW RESEARCH EVALUATION'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
