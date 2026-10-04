import React, { useState } from 'react';
import { DATA_DETECTIVE_QUESTIONS, FACT_CLAIM_ITEMS, type DataDetectiveQuestion, type FactClaimItem } from '../../data/gamesData';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { BarChart3, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface DataOrFactGameProps {
  mode: 'data-detective' | 'fact-or-claim';
  onExit: () => void;
  onViewProgress?: () => void;
}

export const DataOrFactGame: React.FC<DataOrFactGameProps> = ({ mode, onExit, onViewProgress }) => {
  const [dataQuestions] = useState<DataDetectiveQuestion[]>(DATA_DETECTIVE_QUESTIONS);
  const [factItems] = useState<FactClaimItem[]>(FACT_CLAIM_ITEMS);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // For data detective
  const [selectedBool, setSelectedBool] = useState<boolean | null>(null); // For fact or claim
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalXp, setFinalXp] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const totalSteps = mode === 'data-detective' ? dataQuestions.length : factItems.length;

  const handleSelectDataOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSelectFactBool = (val: boolean) => {
    if (isSubmitted) return;
    setSelectedBool(val);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    if (mode === 'data-detective') {
      if (selectedOption === null) return;
      setIsSubmitted(true);
      const isCorrect = selectedOption === dataQuestions[currentIndex].correctIndex;
      if (isCorrect) {
        setScore((prev) => prev + 200);
        setCorrectCount((prev) => prev + 1);
      }
    } else {
      if (selectedBool === null) return;
      setIsSubmitted(true);
      const isCorrect = selectedBool === factItems[currentIndex].isFact;
      if (isCorrect) {
        setScore((prev) => prev + 100);
        setCorrectCount((prev) => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSelectedBool(null);
      setIsSubmitted(false);
    } else {
      const accuracy = Math.round((correctCount / totalSteps) * 100);
      const earnedXp = Math.max(100, score);

      const result = recordGameCompletion({
        gameId: mode === 'data-detective' ? 'data-detective' : 'fact-or-claim',
        earnedXp,
        score,
        accuracyPercent: accuracy,
        skillsImpact: mode === 'data-detective' ? { research: 15, criticalThinking: 10 } : { research: 10, criticalThinking: 8 }
      });

      setFinalXp(earnedXp);
      setUnlockedAchievements(result.newlyUnlockedAchievements);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <GameResultsScreen
        gameTitle={mode === 'data-detective' ? 'DATA DETECTIVE' : 'FACT OR CLAIM'}
        score={score}
        xpEarned={finalXp}
        accuracyPercent={Math.round((correctCount / totalSteps) * 100)}
        summaryText={`Successfully evaluated ${correctCount} of ${totalSteps} challenges.`}
        skillsPracticed={
          mode === 'data-detective'
            ? ['Data Analysis', 'Graph Literacy', 'Reasoning']
            : ['Media Literacy', 'Intellectual Caution', 'Verification']
        }
        newAchievements={unlockedAchievements}
        onPlayAgain={() => {
          setCurrentIndex(0);
          setSelectedOption(null);
          setSelectedBool(null);
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

  if (mode === 'data-detective') {
    const q = dataQuestions[currentIndex];
    return (
      <div className="min-h-[80vh] flex flex-col bg-obsidian text-ivory">
        <GameHeader
          title="Data Detective"
          categoryLabel="DATA INTERPRETATION & CHARTS"
          currentStep={currentIndex + 1}
          totalSteps={totalSteps}
          score={score}
          onExit={onExit}
        />

        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-deep-emerald/70 to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
              <span className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-gold" />
                {q.title}
              </span>
              <p className="text-xs sm:text-sm text-sage font-mono bg-obsidian/80 p-4 rounded-xl border border-gold/20">
                {q.dataSummary}
              </p>

              {/* Simple Visual Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {q.dataPoints.map((dp) => (
                  <div key={dp.label} className="p-3 bg-white/5 border border-gold/15 rounded-xl text-center">
                    <span className="block text-[10px] text-sage font-bold uppercase">{dp.label}</span>
                    <span className="text-sm font-extrabold text-mint font-mono mt-0.5 block">{dp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm sm:text-base font-bold text-ivory flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-gold" />
                {q.question}
              </h4>

              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  let btnClass = 'bg-white/5 border-gold/20 hover:border-gold/60 text-ivory';
                  if (selectedOption === idx) {
                    btnClass = 'bg-deep-emerald border-gold text-gold ring-2 ring-gold/40';
                  }
                  if (isSubmitted) {
                    if (idx === q.correctIndex) {
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
                      onClick={() => handleSelectDataOption(idx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md focus:outline-none ${btnClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {isSubmitted && (
              <div
                className={`p-4 rounded-xl border text-sm space-y-2 animate-fadeIn ${
                  selectedOption === q.correctIndex
                    ? 'bg-emerald/15 border-emerald/40 text-mint'
                    : 'bg-red-950/40 border-red-500/40 text-red-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {selectedOption === q.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                      <span>✓ VALID DATA INTERPRETATION</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>✕ STATISTICAL MISINTERPRETATION</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed">{q.explanation}</p>
              </div>
            )}
          </div>

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
                SUBMIT ANALYSIS
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>{currentIndex < totalSteps - 1 ? 'NEXT DATASET' : 'VIEW RESULTS'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  // FACT OR CLAIM MODE
  const f = factItems[currentIndex];
  return (
    <div className="min-h-[80vh] flex flex-col bg-obsidian text-ivory">
      <GameHeader
        title="Fact or Claim"
        categoryLabel="MEDIA & RESEARCH LITERACY"
        currentStep={currentIndex + 1}
        totalSteps={totalSteps}
        score={score}
        onExit={onExit}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
        <div className="space-y-6 my-auto">
          <div className="flex items-center justify-between text-xs font-mono text-sage">
            <span className="bg-deep-emerald/50 border border-gold/20 px-3 py-1 rounded-full text-gold">
              Category: {f.category}
            </span>
            <span className="text-mint font-bold">Statement {currentIndex + 1} of {totalSteps}</span>
          </div>

          <div className="bg-gradient-to-br from-deep-emerald/70 via-obsidian to-obsidian border border-gold/30 rounded-2xl p-8 text-center shadow-xl min-h-[180px] flex items-center justify-center">
            <p className="text-lg sm:text-xl font-extrabold text-ivory leading-relaxed">
              "{f.statement}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              disabled={isSubmitted}
              onClick={() => handleSelectFactBool(true)}
              className={`py-5 rounded-xl border font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 transition focus:outline-none ${
                selectedBool === true
                  ? 'bg-emerald border-gold text-white ring-2 ring-gold/40'
                  : 'bg-emerald/20 border-emerald/40 hover:bg-emerald/30 text-mint'
              }`}
            >
              ✓ EMPIRICAL FACT
            </button>

            <button
              type="button"
              disabled={isSubmitted}
              onClick={() => handleSelectFactBool(false)}
              className={`py-5 rounded-xl border font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 transition focus:outline-none ${
                selectedBool === false
                  ? 'bg-gold border-white text-obsidian ring-2 ring-gold/40'
                  : 'bg-gold/20 border-gold/40 hover:bg-gold/30 text-gold'
              }`}
            >
              ⚠ UNPROVEN CLAIM
            </button>
          </div>

          {isSubmitted && (
            <div
              className={`p-4 rounded-xl border text-sm space-y-2 animate-fadeIn ${
                selectedBool === f.isFact
                  ? 'bg-emerald/15 border-emerald/40 text-mint'
                  : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedBool === f.isFact ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                    <span>✓ CORRECT EVALUATION</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>✕ MISCLASSIFIED</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed">{f.explanation}</p>
            </div>
          )}
        </div>

        <div className="pt-6">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={selectedBool === null}
              onClick={handleSubmit}
              className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider border shadow-lg transition ${
                selectedBool !== null
                  ? 'bg-emerald hover:bg-emerald-600 border-gold text-white'
                  : 'bg-white/5 border-white/10 text-sage/50 cursor-not-allowed'
              }`}
            >
              CLASSIFY STATEMENT
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>{currentIndex < totalSteps - 1 ? 'NEXT STATEMENT' : 'VIEW RESULTS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
