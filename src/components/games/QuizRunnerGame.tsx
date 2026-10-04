import React, { useState } from 'react';
import type { QuizQuestion } from '../../data/gamesData';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizRunnerGameProps {
  gameId: 'nationsworld-challenge' | 'nigeria-challenge';
  gameTitle: string;
  categoryLabel: string;
  questions: QuizQuestion[];
  skillTags: string[];
  onExit: () => void;
  onViewProgress?: () => void;
}

export const QuizRunnerGame: React.FC<QuizRunnerGameProps> = ({
  gameId,
  gameTitle,
  categoryLabel,
  questions,
  skillTags,
  onExit,
  onViewProgress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
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
      setScore((prev) => prev + 100);
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      const accuracy = Math.round((correctCount / questions.length) * 100);
      const earnedXp = Math.max(100, score);

      const result = recordGameCompletion({
        gameId,
        earnedXp,
        score,
        accuracyPercent: accuracy,
        skillsImpact: { knowledge: 10, research: 5 }
      });

      setFinalXp(earnedXp);
      setUnlockedAchievements(result.newlyUnlockedAchievements);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <GameResultsScreen
        gameTitle={gameTitle}
        score={score}
        xpEarned={finalXp}
        accuracyPercent={Math.round((correctCount / questions.length) * 100)}
        summaryText={`Answered ${correctCount} of ${questions.length} questions correctly.`}
        skillsPracticed={skillTags}
        newAchievements={unlockedAchievements}
        onPlayAgain={() => {
          setCurrentIndex(0);
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
        title={gameTitle}
        categoryLabel={categoryLabel}
        currentStep={currentIndex + 1}
        totalSteps={questions.length}
        score={score}
        onExit={onExit}
      />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-sage">
            <span className="bg-deep-emerald/50 border border-gold/20 px-3 py-1 rounded-full text-gold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              Category: {currentQ.category || 'Knowledge'}
            </span>
            <span className="text-mint font-bold">Question {currentIndex + 1} of {questions.length}</span>
          </div>

          <div className="bg-gradient-to-br from-deep-emerald/70 to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-ivory leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const optionLetters = ['A', 'B', 'C', 'D'];
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
                  className={`w-full p-4 rounded-xl border text-left font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-4 shadow-md focus:outline-none ${btnClass}`}
                >
                  <span className="w-8 h-8 rounded-lg bg-black/40 border border-gold/30 flex items-center justify-center font-mono font-bold text-xs text-gold shrink-0">
                    {optionLetters[idx]}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
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
                    <span>✓ CORRECT (+100 XP)</span>
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
              CONFIRM ANSWER
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>{currentIndex < questions.length - 1 ? 'NEXT QUESTION' : 'VIEW RESULTS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
