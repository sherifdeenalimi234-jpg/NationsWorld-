import { GAMES_LIST } from '../data/gamesData';

export interface GameSkillScores {
  criticalThinking: number;
  leadership: number;
  research: number;
  knowledge: number;
  creativity: number;
  decisionMaking: number;
}

export interface UserGameProfile {
  xp: number;
  gamesPlayed: number;
  achievements: string[];
  bestScores: Record<string, number>;
  completedGames: Record<string, boolean>;
  skills: GameSkillScores;
  dailyChallenge: {
    lastCompletedDate: string | null;
    currentStreak: number;
  };
  streak: number;
  lastPlayDate: string | null;
}

const STORAGE_KEY = 'novaGameProfile';

const DEFAULT_PROFILE: UserGameProfile = {
  xp: 0,
  gamesPlayed: 0,
  achievements: [],
  bestScores: {},
  completedGames: {},
  skills: {
    criticalThinking: 50,
    leadership: 50,
    research: 50,
    knowledge: 50,
    creativity: 50,
    decisionMaking: 50,
  },
  dailyChallenge: {
    lastCompletedDate: null,
    currentStreak: 0,
  },
  streak: 0,
  lastPlayDate: null,
};

let memoryProfile: UserGameProfile | null = null;

export function loadUserGameProfile(): UserGameProfile {
  if (memoryProfile) return memoryProfile;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      memoryProfile = {
        ...DEFAULT_PROFILE,
        ...parsed,
        skills: { ...DEFAULT_PROFILE.skills, ...parsed.skills },
        bestScores: { ...parsed.bestScores },
        completedGames: { ...parsed.completedGames },
        dailyChallenge: { ...DEFAULT_PROFILE.dailyChallenge, ...parsed.dailyChallenge },
      };
      return memoryProfile!;
    }
  } catch (e) {
    console.warn('localStorage is not accessible, using in-memory state fallback.', e);
  }

  memoryProfile = { ...DEFAULT_PROFILE };
  return memoryProfile;
}

export function saveUserGameProfile(profile: UserGameProfile): void {
  memoryProfile = profile;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save to localStorage.', e);
  }
}

export function getPlayerLevel(xp: number): { level: number; title: string; nextThreshold: number; currentThreshold: number } {
  const thresholds = [
    { level: 1, title: 'Explorer', xp: 0 },
    { level: 2, title: 'Thinker', xp: 250 },
    { level: 3, title: 'Challenger', xp: 600 },
    { level: 4, title: 'Strategist', xp: 1200 },
    { level: 5, title: 'Researcher', xp: 2000 },
    { level: 6, title: 'Pathfinder', xp: 3200 },
    { level: 7, title: 'Visionary', xp: 5000 },
  ];

  let current = thresholds[0];
  let next = thresholds[1];

  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i].xp) {
      current = thresholds[i];
      next = thresholds[i + 1] || thresholds[i];
    }
  }

  return {
    level: current.level,
    title: current.title,
    currentThreshold: current.xp,
    nextThreshold: next.xp === current.xp ? current.xp + 1000 : next.xp,
  };
}

/**
 * Deterministically get today's challenge game based on YYYY-MM-DD
 */
export function getTodaysChallenge(): { gameId: string; dateStr: string; bonusXp: number } {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  // Simple deterministic seed from date
  const dateNum = year * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const gameIndex = dateNum % GAMES_LIST.length;
  const gameId = GAMES_LIST[gameIndex].id;

  return {
    gameId,
    dateStr,
    bonusXp: 100,
  };
}

export interface GameCompletionResult {
  gameId: string;
  earnedXp: number;
  score: number;
  accuracyPercent?: number;
  skillsImpact?: Partial<GameSkillScores>;
  category?: string;
}

export function recordGameCompletion(result: GameCompletionResult): {
  profile: UserGameProfile;
  newlyUnlockedAchievements: string[];
  isDailyCompletedToday: boolean;
} {
  const profile = loadUserGameProfile();
  const todayStr = getTodaysChallenge().dateStr;
  const newlyUnlocked: string[] = [];

  // Update streak
  if (profile.lastPlayDate) {
    const lastDate = new Date(profile.lastPlayDate);
    const currentDate = new Date();
    const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      profile.streak += 1;
    } else if (diffDays > 1) {
      profile.streak = 1;
    }
  } else {
    profile.streak = 1;
  }
  profile.lastPlayDate = todayStr;

  // XP & Games Played
  profile.xp += result.earnedXp;
  profile.gamesPlayed += 1;
  profile.completedGames[result.gameId] = true;

  // Best score
  const prevBest = profile.bestScores[result.gameId] || 0;
  if (result.score > prevBest) {
    profile.bestScores[result.gameId] = result.score;
  }

  // Daily Challenge check
  const todaysChallenge = getTodaysChallenge();
  let isDailyCompletedToday = profile.dailyChallenge.lastCompletedDate === todayStr;
  if (!isDailyCompletedToday && result.gameId === todaysChallenge.gameId) {
    profile.dailyChallenge.lastCompletedDate = todayStr;
    profile.dailyChallenge.currentStreak += 1;
    profile.xp += todaysChallenge.bonusXp;
    isDailyCompletedToday = true;
  }

  // Skill indicators adjustment (capped 0-100)
  if (result.skillsImpact) {
    (Object.keys(result.skillsImpact) as (keyof GameSkillScores)[]).forEach((key) => {
      const delta = result.skillsImpact![key] || 0;
      profile.skills[key] = Math.min(100, Math.max(0, profile.skills[key] + delta));
    });
  }

  // Check achievements
  const unlock = (id: string) => {
    if (!profile.achievements.includes(id)) {
      profile.achievements.push(id);
      newlyUnlocked.push(id);
    }
  };

  // FIRST STEP
  if (profile.gamesPlayed >= 1) unlock('first_step');

  // CRITICAL THINKER (5 think category games)
  const thinkGames = ['pattern-breaker', '60-second-challenge', 'memory-grid'];
  const playedThinkCount = thinkGames.filter((g) => profile.completedGames[g]).length;
  if (playedThinkCount >= 2 || profile.gamesPlayed >= 5) unlock('critical_thinker');

  // KNOWLEDGE SEEKER (Score 80%+ in a knowledge challenge)
  if (result.accuracyPercent && result.accuracyPercent >= 80) unlock('knowledge_seeker');

  // RESEARCH DETECTIVE
  if (result.gameId === 'research-detective') unlock('research_detective');

  // EMERGING LEADER
  if (result.gameId === 'decision-room') unlock('emerging_leader');

  // SPEED SOLVER
  if (result.gameId === '60-second-challenge' && result.score >= 500) unlock('speed_solver');

  // GLOBAL MIND (played in at least 3 distinct categories)
  const categoriesPlayed = new Set<string>();
  Object.keys(profile.completedGames).forEach((gid) => {
    const meta = GAMES_LIST.find((g) => g.id === gid);
    if (meta) categoriesPlayed.add(meta.category);
  });
  if (categoriesPlayed.size >= 3) unlock('global_mind');

  // GAME MASTER (all 12 games completed)
  if (Object.keys(profile.completedGames).length >= GAMES_LIST.length) unlock('game_master');

  saveUserGameProfile(profile);

  return {
    profile,
    newlyUnlockedAchievements: newlyUnlocked,
    isDailyCompletedToday,
  };
}

export function resetGameProgress(): UserGameProfile {
  memoryProfile = { ...DEFAULT_PROFILE };
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear localStorage', e);
  }
  return memoryProfile;
}
