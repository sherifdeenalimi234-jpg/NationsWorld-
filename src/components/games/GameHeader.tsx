import React from 'react';
import { ArrowLeft, RefreshCw, Trophy, Clock, Target, Sparkles, CheckCircle2 } from 'lucide-react';

interface GameHeaderProps {
  title: string;
  categoryLabel?: string;
  currentStep?: number;
  totalSteps?: number;
  timeRemaining?: number;
  score?: number;
  onExit: () => void;
  onRestart?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  title,
  categoryLabel,
  currentStep,
  totalSteps,
  timeRemaining,
  score,
  onExit,
  onRestart,
}) => {
  return (
    <div className="bg-obsidian/90 border-b border-gold/20 backdrop-blur-md sticky top-0 z-30 px-4 py-3 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Exit & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onExit}
            className="p-2 rounded-lg bg-deep-emerald/60 hover:bg-emerald text-gold hover:text-white transition border border-gold/30 shrink-0 focus:outline-none"
            aria-label="Exit Game"
            title="Exit to Game Center"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            {categoryLabel && (
              <span className="block text-[10px] font-bold text-gold uppercase tracking-widest truncate">
                {categoryLabel}
              </span>
            )}
            <h2 className="text-sm sm:text-base font-extrabold text-ivory truncate">{title}</h2>
          </div>
        </div>

        {/* Center: Progress / Timer */}
        <div className="flex items-center gap-4 text-xs font-mono">
          {currentStep !== undefined && totalSteps !== undefined && (
            <div className="hidden sm:flex items-center gap-2 bg-deep-emerald/40 px-3 py-1.5 rounded-lg border border-gold/20">
              <Target className="w-3.5 h-3.5 text-mint" />
              <span className="text-sage">Progress:</span>
              <span className="text-gold font-bold">{currentStep} / {totalSteps}</span>
            </div>
          )}

          {timeRemaining !== undefined && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold ${
              timeRemaining <= 10
                ? 'bg-red-950/60 border-red-500/50 text-red-400 animate-pulse'
                : 'bg-deep-emerald/40 border-gold/20 text-gold'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timeRemaining}s</span>
            </div>
          )}

          {score !== undefined && (
            <div className="flex items-center gap-1.5 bg-deep-emerald/60 px-3 py-1.5 rounded-lg border border-gold/30 text-mint font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{score} XP</span>
            </div>
          )}

          {onRestart && (
            <button
              type="button"
              onClick={onRestart}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-sage hover:text-ivory border border-white/10 transition hidden sm:inline-flex"
              title="Restart Game"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      {currentStep !== undefined && totalSteps !== undefined && (
        <div className="w-full bg-deep-emerald/30 h-1 rounded-full mt-2 overflow-hidden max-w-5xl mx-auto sm:hidden">
          <div
            className="bg-emerald h-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

interface GameResultsScreenProps {
  gameTitle: string;
  score: number;
  xpEarned: number;
  accuracyPercent?: number;
  timeSpentStr?: string;
  customHeading?: string;
  summaryText?: string;
  skillsPracticed: string[];
  newAchievements?: string[];
  onPlayAgain: () => void;
  onBackToCenter: () => void;
  onViewProgress?: () => void;
}

export const GameResultsScreen: React.FC<GameResultsScreenProps> = ({
  gameTitle,
  score,
  xpEarned,
  accuracyPercent,
  timeSpentStr,
  customHeading = 'CHALLENGE COMPLETE',
  summaryText,
  skillsPracticed,
  newAchievements = [],
  onPlayAgain,
  onBackToCenter,
  onViewProgress,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      <div className="bg-gradient-to-b from-deep-emerald/90 via-obsidian to-obsidian border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        {/* Trophy Header */}
        <div className="inline-flex p-4 rounded-2xl bg-emerald/20 border border-gold/40 text-gold shadow-lg animate-bounce">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold block">
            {gameTitle}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory mt-1">
            {customHeading}
          </h1>
          {summaryText && (
            <p className="text-sm text-sage mt-2 max-w-md mx-auto">{summaryText}</p>
          )}
        </div>

        {/* Score & Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-gold/20">
            <span className="block text-[10px] font-bold uppercase text-sage">XP EARNED</span>
            <span className="text-xl sm:text-2xl font-extrabold text-mint mt-1 block">+{xpEarned}</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-gold/20">
            <span className="block text-[10px] font-bold uppercase text-sage">FINAL SCORE</span>
            <span className="text-xl sm:text-2xl font-extrabold text-gold mt-1 block">{score}</span>
          </div>

          {accuracyPercent !== undefined ? (
            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-gold/20 col-span-2 sm:col-span-1">
              <span className="block text-[10px] font-bold uppercase text-sage">ACCURACY</span>
              <span className="text-xl sm:text-2xl font-extrabold text-ivory mt-1 block">{accuracyPercent}%</span>
            </div>
          ) : timeSpentStr ? (
            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-gold/20 col-span-2 sm:col-span-1">
              <span className="block text-[10px] font-bold uppercase text-sage">TIME SPENT</span>
              <span className="text-xl sm:text-2xl font-extrabold text-ivory mt-1 block">{timeSpentStr}</span>
            </div>
          ) : null}
        </div>

        {/* Newly Unlocked Achievements Toast */}
        {newAchievements.length > 0 && (
          <div className="bg-gold/15 border border-gold/40 rounded-xl p-4 text-left space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" />
              NEW ACHIEVEMENT UNLOCKED!
            </span>
            <div className="text-xs text-ivory space-y-1">
              {newAchievements.map((ach) => (
                <div key={ach} className="font-semibold flex items-center gap-2 text-mint">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Practiced */}
        {skillsPracticed.length > 0 && (
          <div className="pt-2 border-t border-gold/20 text-left">
            <span className="text-[11px] font-bold uppercase text-gold tracking-widest block mb-2">
              SKILLS PRACTICED
            </span>
            <div className="flex flex-wrap gap-2">
              {skillsPracticed.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-deep-emerald/80 border border-emerald/40 text-xs font-semibold text-mint"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/30 shadow-lg transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>PLAY AGAIN</span>
          </button>

          <button
            type="button"
            onClick={onBackToCenter}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-ivory font-bold text-xs uppercase tracking-wider border border-white/20 transition"
          >
            GAME CENTER
          </button>

          {onViewProgress && (
            <button
              type="button"
              onClick={onViewProgress}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-deep-emerald/60 hover:bg-deep-emerald text-gold font-bold text-xs uppercase tracking-wider border border-gold/30 transition"
            >
              MY PROGRESS
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
