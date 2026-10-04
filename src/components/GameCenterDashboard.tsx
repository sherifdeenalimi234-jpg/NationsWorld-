import React, { useState, useEffect } from 'react';
import {
  GAMES_LIST,
  GAME_CATEGORIES,
  ALL_ACHIEVEMENTS,
  NATIONSWORLD_QUESTIONS,
  NIGERIA_QUESTIONS,
  type GameMeta,
} from '../data/gamesData';
import {
  loadUserGameProfile,
  getPlayerLevel,
  getTodaysChallenge,
  resetGameProgress,
  type UserGameProfile,
} from '../services/gameStorage';

// Game Play components
import { DecisionRoomGame } from './games/DecisionRoomGame';
import { PatternBreakerGame } from './games/PatternBreakerGame';
import { SixtySecondGame } from './games/SixtySecondGame';
import { MemoryGridGame } from './games/MemoryGridGame';
import { QuizRunnerGame } from './games/QuizRunnerGame';
import { GovernanceChallengeGame } from './games/GovernanceChallengeGame';
import { ResearchDetectiveGame } from './games/ResearchDetectiveGame';
import { DataOrFactGame } from './games/DataOrFactGame';
import { SimulationGame } from './games/SimulationGame';

import {
  Sparkles,
  Compass,
  Trophy,
  Brain,
  Zap,
  Globe,
  MapPin,
  Scale,
  Microscope,
  BarChart3,
  CheckCircle2,
  Lightbulb,
  Leaf,
  Layers,
  ArrowRight,
  Clock,
  Shield,
  Search,
  BookOpen,
  Award,
  Footprints,
  Play,
  RotateCcw,
  Star,
  Check,
  Grid,
  Timer
} from 'lucide-react';

interface GameCenterDashboardProps {
  initialCategory?: string;
  activeGameId?: string | null;
  onSelectGame?: (gameId: string | null) => void;
}

export const GameCenterDashboard: React.FC<GameCenterDashboardProps> = ({
  initialCategory = 'all',
  activeGameId: externalActiveGameId = null,
  onSelectGame,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'think' | 'know' | 'lead' | 'research' | 'create' | 'progress'>(
    initialCategory === 'progress' ? 'progress' : 'home'
  );

  const [activeGameId, setActiveGameId] = useState<string | null>(externalActiveGameId);
  const [selectedGameDetails, setSelectedGameDetails] = useState<GameMeta | null>(null);
  const [profile, setProfile] = useState<UserGameProfile>(loadUserGameProfile());

  useEffect(() => {
    setActiveGameId(externalActiveGameId);
  }, [externalActiveGameId]);

  const refreshProfile = () => {
    setProfile(loadUserGameProfile());
  };

  const handleLaunchGame = (gameId: string) => {
    setActiveGameId(gameId);
    setSelectedGameDetails(null);
    if (onSelectGame) onSelectGame(gameId);
  };

  const handleExitGame = () => {
    setActiveGameId(null);
    refreshProfile();
    if (onSelectGame) onSelectGame(null);
  };

  // Icon Map Helper
  const renderGameIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-gold" />;
      case 'Grid':
        return <Grid className="w-6 h-6 text-mint" />;
      case 'Timer':
        return <Timer className="w-6 h-6 text-yellow-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-purple-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-400" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-emerald" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-gold" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-teal-300" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-sky-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-emerald" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-amber-300" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-emerald" />;
      default:
        return <Sparkles className="w-6 h-6 text-gold" />;
    }
  };

  const renderAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-5 h-5 text-gold" />;
      case 'Brain': return <Brain className="w-5 h-5 text-mint" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'Search': return <Search className="w-5 h-5 text-teal-300" />;
      case 'Award': return <Award className="w-5 h-5 text-gold" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-purple-400" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-gold" />;
      default: return <Star className="w-5 h-5 text-gold" />;
    }
  };

  // Flagship Game
  const flagshipGame = GAMES_LIST.find((g) => g.isFlagship) || GAMES_LIST[0];
  const todaysChallenge = getTodaysChallenge();
  const dailyGameMeta = GAMES_LIST.find((g) => g.id === todaysChallenge.gameId) || GAMES_LIST[0];

  // Active player level
  const playerLevel = getPlayerLevel(profile.xp);

  // Filter games based on current active category tab
  const displayedGames = GAMES_LIST.filter((g) => {
    if (activeTab === 'home') return true;
    if (activeTab === 'progress') return false;
    return g.category === activeTab;
  });

  // Render specific active game view
  if (activeGameId) {
    switch (activeGameId) {
      case 'decision-room':
        return <DecisionRoomGame onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case 'pattern-breaker':
        return <PatternBreakerGame onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case '60-second-challenge':
        return <SixtySecondGame onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case 'memory-grid':
        return <MemoryGridGame onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case 'nationsworld-challenge':
        return (
          <QuizRunnerGame
            gameId="nationsworld-challenge"
            gameTitle="NATIONSWORLD CHALLENGE"
            categoryLabel="GLOBAL KNOWLEDGE"
            questions={NATIONSWORLD_QUESTIONS}
            skillTags={['Global Awareness', 'General Knowledge', 'World History']}
            onExit={handleExitGame}
            onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }}
          />
        );
      case 'nigeria-challenge':
        return (
          <QuizRunnerGame
            gameId="nigeria-challenge"
            gameTitle="NIGERIA CHALLENGE"
            categoryLabel="REGIONAL & AFRICAN KNOWLEDGE"
            questions={NIGERIA_QUESTIONS}
            skillTags={['African History', 'Governance', 'Civics']}
            onExit={handleExitGame}
            onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }}
          />
        );
      case 'governance-challenge':
        return <GovernanceChallengeGame onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case 'research-detective':
        return <ResearchDetectiveGame onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case 'data-detective':
        return <DataOrFactGame mode="data-detective" onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case 'fact-or-claim':
        return <DataOrFactGame mode="fact-or-claim" onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case 'innovation-lab':
        return <SimulationGame mode="innovation-lab" onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      case 'climate-mission':
        return <SimulationGame mode="climate-mission" onExit={handleExitGame} onViewProgress={() => { handleExitGame(); setActiveTab('progress'); }} />;
      default:
        setActiveGameId(null);
    }
  }

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-20 pb-16 selection:bg-emerald/30">
      {/* 1. Sub-Header Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-obsidian/90 backdrop-blur-md border-b border-gold/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-3 gap-2 no-scrollbar">
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition border ${
                  activeTab === 'home'
                    ? 'bg-emerald text-white border-gold shadow-md'
                    : 'bg-white/5 border-transparent text-sage hover:text-ivory hover:bg-white/10'
                }`}
              >
                All Games
              </button>

              {GAME_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition border shrink-0 ${
                    activeTab === cat.id
                      ? 'bg-emerald text-white border-gold shadow-md'
                      : 'bg-white/5 border-transparent text-sage hover:text-ivory hover:bg-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setActiveTab('progress')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition border flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'progress'
                    ? 'bg-gold text-obsidian border-white shadow-md'
                    : 'bg-gold/15 border-gold/30 text-gold hover:bg-gold/25'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>My Progress</span>
              </button>
            </div>

            {/* Quick Player Bar */}
            <div className="hidden lg:flex items-center gap-3 shrink-0 pl-4 border-l border-gold/20 font-mono text-xs">
              <div className="bg-deep-emerald/60 px-3 py-1.5 rounded-lg border border-gold/30 text-gold font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{profile.xp} XP</span>
              </div>
              <div className="bg-deep-emerald/60 px-3 py-1.5 rounded-lg border border-gold/30 text-mint font-bold">
                Lvl {playerLevel.level}: {playerLevel.title}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab !== 'progress' ? (
          <>
            {/* HERO SECTION (shown on Home tab) */}
            {activeTab === 'home' && (
              <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-deep-emerald/90 via-obsidian to-obsidian border border-gold/30 p-6 sm:p-12 mb-10 shadow-2xl">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-3xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    NATIONSWORLD PREMIUM GAME CENTER
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold text-ivory tracking-tight leading-none font-sans">
                    PLAY. THINK. DECIDE. LEARN.
                  </h1>

                  <p className="text-sm sm:text-lg text-sage/90 leading-relaxed font-sans max-w-2xl">
                    Challenge your mind, test your knowledge, strengthen your decision-making and discover how you think through institutional simulation and rapid logic.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const gameGrid = document.getElementById('game-grid-section');
                        if (gameGrid) gameGrid.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-8 py-4 rounded-xl bg-emerald hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/30 shadow-xl transition flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>EXPLORE GAMES</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLaunchGame(todaysChallenge.gameId)}
                      className="px-8 py-4 rounded-xl bg-deep-emerald/80 hover:bg-deep-emerald text-gold font-extrabold text-xs uppercase tracking-wider border border-gold/40 shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-gold" />
                      <span>DAILY CHALLENGE (+100 XP)</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* FLAGSHIP EXPERIENCE CARD (THE DECISION ROOM) */}
            {activeTab === 'home' && (
              <section className="mb-12">
                <div className="bg-gradient-to-r from-deep-emerald/90 via-obsidian to-deep-emerald/90 border-2 border-gold/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <span className="bg-gold text-obsidian px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-extrabold tracking-widest uppercase shadow-md flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      {flagshipGame.badge}
                    </span>
                  </div>

                  <div className="max-w-3xl space-y-4">
                    <span className="text-xs font-bold text-gold uppercase tracking-[0.25em] block">
                      {flagshipGame.categoryLabel}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory tracking-tight">
                      {flagshipGame.title}
                    </h2>
                    <p className="text-sm sm:text-base text-sage leading-relaxed max-w-2xl">
                      {flagshipGame.description}
                    </p>

                    {/* Statistics & Metadata */}
                    <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-mint">
                      <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-gold/20">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span>Time: {flagshipGame.estimatedTime}</span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-gold/20">
                        <Brain className="w-3.5 h-3.5 text-gold" />
                        <span>Difficulty: {flagshipGame.difficulty}</span>
                      </div>

                      {profile.bestScores[flagshipGame.id] ? (
                        <div className="flex items-center gap-1.5 bg-gold/20 text-gold px-3 py-1.5 rounded-lg border border-gold/40 font-bold">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>Best: {profile.bestScores[flagshipGame.id]} XP</span>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {flagshipGame.skillTags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-emerald/20 text-mint border border-emerald/40 text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleLaunchGame(flagshipGame.id)}
                        className="px-8 py-4 rounded-xl bg-gold hover:bg-gold/90 text-obsidian font-extrabold text-xs uppercase tracking-wider border border-white/30 shadow-xl transition flex items-center justify-center gap-2"
                      >
                        <Compass className="w-4 h-4 text-obsidian" />
                        <span>ENTER THE DECISION ROOM</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedGameDetails(flagshipGame)}
                        className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-ivory font-bold text-xs uppercase tracking-wider border border-white/20 transition text-center"
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* DAILY CHALLENGE BANNER */}
            {activeTab === 'home' && (
              <section className="mb-10 bg-gradient-to-r from-gold/15 via-obsidian to-emerald/15 border border-gold/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-gold/20 border border-gold/40 text-gold shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold font-mono">TODAY'S CHALLENGE</span>
                      <span className="text-[10px] bg-emerald/30 text-mint font-bold px-2 py-0.5 rounded font-mono">+100 XP REWARD</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-ivory mt-0.5">{dailyGameMeta.title}</h3>
                    <p className="text-xs text-sage">{dailyGameMeta.description}</p>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  {profile.dailyChallenge.lastCompletedDate === todaysChallenge.dateStr ? (
                    <div className="flex items-center gap-2 bg-emerald/30 text-mint border border-emerald px-4 py-3 rounded-xl font-bold text-xs">
                      <Check className="w-4 h-4 text-emerald" />
                      <span>COMPLETED TODAY</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleLaunchGame(todaysChallenge.gameId)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/30 transition shadow-md flex items-center justify-center gap-2"
                    >
                      <span>PLAY DAILY CHALLENGE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* GAME GRID SECTION */}
            <section id="game-grid-section" className="space-y-6">
              <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-ivory uppercase tracking-tight">
                    {activeTab === 'home' ? 'ALL GAME CHALLENGES' : `${activeTab.toUpperCase()} GAMES`}
                  </h2>
                  <p className="text-xs text-sage mt-1">
                    {activeTab === 'home'
                      ? 'Select any game challenge below to play and earn XP.'
                      : GAME_CATEGORIES.find((c) => c.id === activeTab)?.purpose}
                  </p>
                </div>
                <span className="text-xs font-mono text-gold font-bold bg-deep-emerald/60 px-3 py-1.5 rounded-lg border border-gold/20">
                  {displayedGames.length} Available
                </span>
              </div>

              {/* Game Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedGames.map((game) => {
                  const isCompleted = !!profile.completedGames[game.id];
                  const bestScore = profile.bestScores[game.id];

                  return (
                    <div
                      key={game.id}
                      className="bg-deep-emerald/40 hover:bg-deep-emerald/70 border border-gold/25 hover:border-gold/60 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:-translate-y-1 flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        {/* Top Icon & Badge */}
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-xl bg-obsidian/80 border border-gold/30 group-hover:scale-105 transition-transform">
                            {renderGameIcon(game.iconName)}
                          </div>
                          <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded border border-gold/20">
                            {game.category.toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-extrabold text-ivory group-hover:text-mint transition-colors">
                            {game.title}
                          </h3>
                          <p className="text-xs text-sage mt-1.5 line-clamp-2 leading-relaxed">
                            {game.description}
                          </p>
                        </div>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {game.skillTags.map((tag) => (
                            <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-sage font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Difficulty & Time & Best Score */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-sage pt-2 border-t border-gold/15">
                          <div className="flex items-center gap-3">
                            <span>Diff: <strong className="text-ivory">{game.difficulty}</strong></span>
                            <span>Time: <strong className="text-ivory">{game.estimatedTime}</strong></span>
                          </div>
                          {bestScore !== undefined && (
                            <span className="text-gold font-bold">Best: {bestScore} XP</span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Play Button */}
                      <div className="pt-6">
                        <button
                          type="button"
                          onClick={() => handleLaunchGame(game.id)}
                          className="w-full py-3 rounded-xl bg-emerald hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/30 shadow-md transition flex items-center justify-center gap-2 group-hover:border-gold"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isCompleted ? 'PLAY AGAIN' : 'PLAY NOW'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          /* 3. MY PROGRESS DASHBOARD TAB */
          <section className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
            {/* Player Level & XP Banner */}
            <div className="bg-gradient-to-r from-deep-emerald via-obsidian to-deep-emerald border border-gold/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/20 pb-6">
                <div>
                  <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] block">
                    NATIONSWORLD PLAYER DASHBOARD
                  </span>
                  <h1 className="text-3xl font-extrabold text-ivory mt-1">MY GAME PROGRESS</h1>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset your local game scores and progress?')) {
                      resetGameProgress();
                      refreshProfile();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-semibold transition flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Progress</span>
                </button>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-gold/20">
                  <span className="block text-[10px] font-bold text-sage uppercase">TOTAL XP</span>
                  <span className="text-2xl font-extrabold text-mint mt-1 block font-mono">{profile.xp}</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-gold/20">
                  <span className="block text-[10px] font-bold text-sage uppercase">PLAYER LEVEL</span>
                  <span className="text-2xl font-extrabold text-gold mt-1 block font-mono">Lvl {playerLevel.level} ({playerLevel.title})</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-gold/20">
                  <span className="block text-[10px] font-bold text-sage uppercase">GAMES PLAYED</span>
                  <span className="text-2xl font-extrabold text-ivory mt-1 block font-mono">{profile.gamesPlayed}</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-gold/20">
                  <span className="block text-[10px] font-bold text-sage uppercase">DAILY STREAK</span>
                  <span className="text-2xl font-extrabold text-yellow-400 mt-1 block font-mono">🔥 {profile.streak} Days</span>
                </div>
              </div>

              {/* Level Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono text-sage">
                  <span>Level {playerLevel.level} Progress</span>
                  <span>{profile.xp} / {playerLevel.nextThreshold} XP</span>
                </div>
                <div className="w-full bg-obsidian h-3 rounded-full overflow-hidden border border-gold/30">
                  <div
                    className="bg-gradient-to-r from-emerald via-gold to-mint h-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          ((profile.xp - playerLevel.currentThreshold) /
                            (playerLevel.nextThreshold - playerLevel.currentThreshold)) *
                            100
                        )
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Game-Based Skill Indicators */}
            <div className="bg-deep-emerald/40 border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-extrabold text-ivory uppercase tracking-tight">
                  GAME-BASED SKILL INDICATORS
                </h3>
                <p className="text-xs text-sage mt-1">
                  Dynamic performance metrics updated through gameplay scenarios and challenge completions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-ivory mb-1">
                    <span>Critical Thinking & Logic</span>
                    <span className="text-mint font-mono">{profile.skills.criticalThinking}%</span>
                  </div>
                  <div className="w-full bg-obsidian h-2.5 rounded-full overflow-hidden border border-gold/20">
                    <div className="bg-emerald h-full rounded-full transition-all duration-500" style={{ width: `${profile.skills.criticalThinking}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-ivory mb-1">
                    <span>Leadership & Governance</span>
                    <span className="text-gold font-mono">{profile.skills.leadership}%</span>
                  </div>
                  <div className="w-full bg-obsidian h-2.5 rounded-full overflow-hidden border border-gold/20">
                    <div className="bg-gold h-full rounded-full transition-all duration-500" style={{ width: `${profile.skills.leadership}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-ivory mb-1">
                    <span>Research Literacy & Evidence</span>
                    <span className="text-teal-300 font-mono">{profile.skills.research}%</span>
                  </div>
                  <div className="w-full bg-obsidian h-2.5 rounded-full overflow-hidden border border-gold/20">
                    <div className="bg-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${profile.skills.research}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-ivory mb-1">
                    <span>General & Regional Knowledge</span>
                    <span className="text-blue-300 font-mono">{profile.skills.knowledge}%</span>
                  </div>
                  <div className="w-full bg-obsidian h-2.5 rounded-full overflow-hidden border border-gold/20">
                    <div className="bg-blue-400 h-full rounded-full transition-all duration-500" style={{ width: `${profile.skills.knowledge}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-ivory mb-1">
                    <span>Innovation & Creativity</span>
                    <span className="text-amber-300 font-mono">{profile.skills.creativity}%</span>
                  </div>
                  <div className="w-full bg-obsidian h-2.5 rounded-full overflow-hidden border border-gold/20">
                    <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${profile.skills.creativity}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-ivory mb-1">
                    <span>Strategic Decision Making</span>
                    <span className="text-purple-300 font-mono">{profile.skills.decisionMaking}%</span>
                  </div>
                  <div className="w-full bg-obsidian h-2.5 rounded-full overflow-hidden border border-gold/20">
                    <div className="bg-purple-400 h-full rounded-full transition-all duration-500" style={{ width: `${profile.skills.decisionMaking}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="bg-deep-emerald/40 border border-gold/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-ivory uppercase tracking-tight">
                    ACHIEVEMENT BADGES
                  </h3>
                  <p className="text-xs text-sage mt-1">
                    Earn milestone achievements by completing game categories and setting high scores.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-gold bg-black/40 px-3 py-1.5 rounded-lg border border-gold/20">
                  {profile.achievements.length} / {ALL_ACHIEVEMENTS.length} Unlocked
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ALL_ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = profile.achievements.includes(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        isUnlocked
                          ? 'bg-deep-emerald/90 border-gold/50 shadow-md text-ivory'
                          : 'bg-white/5 border-white/10 opacity-50 grayscale text-sage'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg border shrink-0 ${
                          isUnlocked ? 'bg-emerald/30 border-gold text-gold' : 'bg-black/40 border-white/10 text-sage'
                        }`}>
                          {renderAchievementIcon(ach.icon)}
                        </div>
                        <div>
                          <span className="font-extrabold text-xs block text-ivory">{ach.title}</span>
                          <p className="text-[10px] text-sage mt-0.5 line-clamp-2 leading-tight">{ach.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 4. Game Details Modal */}
      {selectedGameDetails && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedGameDetails(null)}
        >
          <div
            className="bg-gradient-to-b from-deep-emerald via-obsidian to-obsidian border border-gold/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-obsidian border border-gold/30">
                  {renderGameIcon(selectedGameDetails.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">
                    {selectedGameDetails.categoryLabel}
                  </span>
                  <h3 className="text-lg font-extrabold text-ivory">{selectedGameDetails.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGameDetails(null)}
                className="text-sage hover:text-ivory font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-sage leading-relaxed">
              {selectedGameDetails.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-white/5 border border-gold/20 rounded-xl">
                <span className="text-sage block text-[10px] uppercase font-bold">ESTIMATED TIME</span>
                <span className="text-gold font-bold text-sm mt-0.5 block">{selectedGameDetails.estimatedTime}</span>
              </div>
              <div className="p-3 bg-white/5 border border-gold/20 rounded-xl">
                <span className="text-sage block text-[10px] uppercase font-bold">DIFFICULTY</span>
                <span className="text-mint font-bold text-sm mt-0.5 block">{selectedGameDetails.difficulty}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gold uppercase tracking-wider block">SKILLS DEVELOPED</span>
              <div className="flex flex-wrap gap-2">
                {selectedGameDetails.skillTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-deep-emerald text-mint border border-emerald/40 text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => handleLaunchGame(selectedGameDetails.id)}
                className="flex-1 py-3.5 rounded-xl bg-emerald hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/30 shadow-lg transition"
              >
                LAUNCH GAME NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
