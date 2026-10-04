import React, { useState, useEffect } from 'react';
import { SIXTY_SECOND_ITEMS } from '../../data/gamesData';
import { recordGameCompletion } from '../../services/gameStorage';
import { GameHeader, GameResultsScreen } from './GameHeader';
import { Zap, Check, X } from 'lucide-react';

interface SixtySecondProps {
  onExit: () => void;
  onViewProgress?: () => void;
}

export const SixtySecondGame: React.FC<SixtySecondProps> = ({ onExit, onViewProgress }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [items] = useState(SIXTY_SECOND_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalXp, setFinalXp] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    let timer: any = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleFinishGame();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleAnswer = (userChoice: boolean) => {
    if (!isActive) return;

    const currentItem = items[currentIndex % items.length];
    const isCorrect = userChoice === currentItem.answer;

    if (isCorrect) {
      const bonus = streak * 15;
      setScore((prev) => prev + 50 + bonus);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleFinishGame = () => {
    setIsActive(false);
    const totalAnswered = currentIndex;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const earnedXp = Math.max(100, score);

    const result = recordGameCompletion({
      gameId: '60-second-challenge',
      earnedXp,
      score,
      accuracyPercent: accuracy,
      skillsImpact: { criticalThinking: 6, decisionMaking: 8 }
    });

    setFinalXp(earnedXp);
    setUnlockedAchievements(result.newlyUnlockedAchievements);
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <GameResultsScreen
        gameTitle="60-SECOND CHALLENGE"
        score={score}
        xpEarned={finalXp}
        accuracyPercent={currentIndex > 0 ? Math.round((correctCount / currentIndex) * 100) : 0}
        summaryText={`Answered ${correctCount} challenges correctly in 60 seconds!`}
        skillsPracticed={['Mental Agility', 'Speed', 'Focus']}
        newAchievements={unlockedAchievements}
        onPlayAgain={() => {
          setTimeLeft(60);
          setIsActive(false);
          setCurrentIndex(0);
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

  const currentItem = items[currentIndex % items.length];

  return (
    <div className="min-h-[80vh] flex flex-col bg-obsidian text-ivory">
      <GameHeader
        title="60-Second Challenge"
        categoryLabel="RAPID REASONING"
        timeRemaining={timeLeft}
        score={score}
        onExit={onExit}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
        {!isActive && currentIndex === 0 ? (
          <div className="bg-gradient-to-b from-deep-emerald/80 to-obsidian border border-gold/30 rounded-2xl p-8 text-center space-y-6 shadow-2xl my-auto">
            <div className="inline-flex p-4 rounded-2xl bg-gold/20 border border-gold/40 text-gold shadow-lg">
              <Zap className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-ivory">READY FOR RAPID REASONING?</h2>
              <p className="text-xs text-sage mt-2 leading-relaxed max-w-md mx-auto">
                You have 60 seconds to evaluate as many statements as possible. Answer True or False with speed and precision.
              </p>
            </div>
            <button
              type="button"
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald hover:bg-emerald-600 text-white font-extrabold text-sm uppercase tracking-wider border border-gold/40 shadow-xl transition"
            >
              START 60s CLOCK
            </button>
          </div>
        ) : (
          <div className="space-y-6 my-auto">
            <div className="flex items-center justify-between text-xs font-mono text-sage">
              <span className="bg-deep-emerald/50 border border-gold/20 px-3 py-1 rounded-full text-gold">
                Category: {currentItem.type}
              </span>
              {streak > 1 && (
                <span className="text-mint font-bold animate-pulse">
                  ⚡ {streak}x Speed Streak!
                </span>
              )}
            </div>

            <div className="bg-gradient-to-br from-deep-emerald/70 via-obsidian to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-10 text-center shadow-xl min-h-[200px] flex items-center justify-center">
              <p className="text-xl sm:text-2xl font-extrabold text-ivory leading-relaxed">
                {currentItem.question}
              </p>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                type="button"
                onClick={() => handleAnswer(true)}
                className="py-6 rounded-xl bg-emerald/20 hover:bg-emerald/30 border border-emerald/50 hover:border-emerald text-mint font-extrabold text-lg sm:text-xl flex items-center justify-center gap-2 shadow-lg transition focus:outline-none"
              >
                <Check className="w-6 h-6 text-emerald" />
                <span>TRUE</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnswer(false)}
                className="py-6 rounded-xl bg-red-950/30 hover:bg-red-950/50 border border-red-500/40 hover:border-red-500 text-red-300 font-extrabold text-lg sm:text-xl flex items-center justify-center gap-2 shadow-lg transition focus:outline-none"
              >
                <X className="w-6 h-6 text-red-400" />
                <span>FALSE</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
