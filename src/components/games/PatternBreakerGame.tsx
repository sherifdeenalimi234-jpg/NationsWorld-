import React, { useState } from 'react';
import { PATTERN_QUESTIONS, type PatternQuestion } from '../../data/gamesData';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { CheckCircle2, XCircle, ArrowRight, Brain } from 'lucide-react';

interface PatternBreakerProps {
  onExit: () => void;
  onViewProgress?: () => void;
}

export const PatternBreakerGame: React.FC<PatternBreakerProps> = ({ onExit, onViewProgress }) => {
  const [questions] = useState<PatternQuestion[]>(PATTERN_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalXp, setFinalXp] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      const streakBonus = streak * 25;
      const questionXp = 100 + streakBonus;
      setScore((prev) => prev + questionXp);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Complete game
      const accuracy = Math.round((correctCount / questions.length) * 100);
      const earnedXp = Math.max(100, score);

      const result = recordGameCompletion({
        gameId: 'pattern-breaker',
        earnedXp,
        score,
        accuracyPercent: accuracy,
        skillsImpact: { criticalThinking: 8, decisionMaking: 4 }
      });

      setFinalXp(earnedXp);
      setUnlockedAchievements(result.newlyUnlockedAchievements);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <GameResultsScreen
        gameTitle="PATTERN BREAKER"
        score={score}
        xpEarned={finalXp}
        accuracyPercent={Math.round((correctCount / questions.length) * 100)}
        summaryText={`Completed ${correctCount} of ${questions.length} pattern sequences correctly.`}
        skillsPracticed={['Pattern Recognition', 'Logic', 'Agility']}
        newAchievements={unlockedAchievements}
        onPlayAgain={() => {
          setCurrentIndex(0);
          setSelectedOption(null);
          setIsSubmitted(false);
          setScore(0);
          setCorrectCount(0);
          setStreak(0);
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
        title="Pattern Breaker"
        categoryLabel="LOGIC & REASONING"
        currentStep={currentIndex + 1}
        totalSteps={questions.length}
        score={score}
        onExit={onExit}
      />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
        {/* Sequence Card */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-sage">
            <span className="flex items-center gap-1.5 bg-deep-emerald/50 border border-gold/20 px-3 py-1 rounded-full text-gold">
              <Brain className="w-3.5 h-3.5" />
              Difficulty: {currentQ.difficulty}
            </span>
            {streak > 1 && (
              <span className="text-mint font-bold animate-pulse">
                🔥 {streak}x Streak Bonus Active!
              </span>
            )}
          </div>

          <div className="bg-gradient-to-br from-deep-emerald/70 to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-10 text-center shadow-xl">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-3">
              SEQUENCE CHALLENGE
            </span>
            <div className="text-2xl sm:text-4xl font-extrabold font-mono text-ivory tracking-wide py-4 bg-obsidian/60 rounded-xl border border-gold/20 shadow-inner">
              {currentQ.sequence}
            </div>
            <p className="text-xs text-sage mt-4">
              Analyze the logical rule and choose the missing sequence term.
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {currentQ.options.map((opt, idx) => {
              let btnClass = 'bg-white/5 border-gold/20 hover:border-gold/60 text-ivory';
              if (selectedOption === idx) {
                btnClass = 'bg-deep-emerald border-gold text-gold ring-2 ring-gold/40';
              }
              if (isSubmitted) {
                if (idx === currentQ.correctIndex) {
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
                  className={`p-4 sm:p-5 rounded-xl border font-mono font-bold text-lg sm:text-xl transition-all duration-200 text-center shadow-md focus:outline-none ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Reasoning Explanation Box */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-xl border text-sm space-y-2 animate-fadeIn ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald/15 border-emerald/40 text-mint'
                  : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                    <span>✓ CORRECT ANALYSIS</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>✕ INCORRECT</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed">
                {currentQ.explanation}
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
              SUBMIT ANSWER
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>{currentIndex < questions.length - 1 ? 'NEXT PATTERN' : 'VIEW RESULTS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
