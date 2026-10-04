export type ViewType = 'home' | 'portal' | 'production' | 'games';

export interface NOVAContext {
  currentView: ViewType;
  currentSection?: string;
  activeFilter?: string;
}

export type NOVAActionType = 'navigate' | 'filter' | 'back' | 'none';

export interface NOVAAction {
  type: NOVAActionType;
  destination?: {
    view: ViewType;
    sectionId?: string;
    filter?: string;
  };
}

export interface NOVAExecutionResult {
  intent: string;
  confidence: number;
  action: NOVAAction;
  response: string;
  suggestions?: string[];
}

interface IntentDefinition {
  id: string;
  primaryConfirmation: string;
  destination: {
    view: ViewType;
    sectionId?: string;
    filter?: string;
  };
  exactPhrases: string[];
  keywords: string[];
  boostTokens?: string[];
}

const DEFAULT_SUGGESTIONS = [
  'Game Center',
  'Decision Room',
  'Programs',
  'Resources',
  'Membership',
  'Application'
];

/**
 * Normalizes user input for matching:
 * - lowercase
 * - trim
 * - remove unnecessary punctuation
 * - standardize common variations (programme -> program, centre -> center)
 */
export function normalizeInput(input: string): string {
  let text = input.toLowerCase().trim();
  text = text.replace(/[^\w\s]/g, ' ');
  text = text.replace(/\bprogrammes\b/g, 'programs');
  text = text.replace(/\bprogramme\b/g, 'program');
  text = text.replace(/\bcentre\b/g, 'center');
  text = text.replace(/\bwhats\b/g, 'what is');
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

const INTENT_DEFINITIONS: IntentDefinition[] = [
  {
    id: 'home',
    primaryConfirmation: 'Taking you to the homepage...',
    destination: { view: 'home', sectionId: 'hero' },
    exactPhrases: [
      'home',
      'homepage',
      'take me home',
      'go home',
      'go to home',
      'go to the homepage',
      'back to home',
      'main page',
      'landing page',
      'public homepage'
    ],
    keywords: ['home', 'homepage', 'landing']
  },
  {
    id: 'leadership_programs',
    primaryConfirmation: 'Showing Leadership programmes...',
    destination: { view: 'home', sectionId: 'programmes', filter: 'Leadership' },
    exactPhrases: [
      'show me leadership programmes',
      'show me leadership programs',
      'leadership programs',
      'leadership programmes',
      'show me leadership',
      'leadership initiatives',
      'leadership'
    ],
    keywords: ['leadership'],
    boostTokens: ['leadership']
  },
  {
    id: 'research_programs',
    primaryConfirmation: 'Showing Research programmes...',
    destination: { view: 'home', sectionId: 'programmes', filter: 'Research' },
    exactPhrases: [
      'show me research programmes',
      'show me research programs',
      'research programs',
      'research programmes',
      'show me research',
      'research initiatives',
      'research'
    ],
    keywords: ['research'],
    boostTokens: ['research']
  },
  {
    id: 'tpd',
    primaryConfirmation: 'Opening details for The Productive Discourse (TPD)...',
    destination: { view: 'home', sectionId: 'programmes', filter: 'TPD' },
    exactPhrases: [
      'take me to tpd',
      'tell me about tpd',
      'tell me about the productive discourse',
      'show me tpd',
      'open tpd',
      'tpd',
      'productive discourse',
      'the productive discourse'
    ],
    keywords: ['tpd', 'productive discourse']
  },
  {
    id: 'programs',
    primaryConfirmation: 'Taking you to Programmes & Initiatives...',
    destination: { view: 'home', sectionId: 'programmes', filter: 'all' },
    exactPhrases: [
      'programs',
      'programmes',
      'open programs',
      'show me programs',
      'show me the programmes',
      'take me to the programs page',
      'take me to programs',
      'i want to see your programmes',
      'where can i find your programmes',
      'what programmes do you offer',
      'show programmes',
      'initiatives',
      'our programs'
    ],
    keywords: ['program', 'programs', 'initiative', 'initiatives', 'offering', 'offerings']
  },
  {
    id: 'events',
    primaryConfirmation: 'Taking you to upcoming events and initiatives...',
    destination: { view: 'home', sectionId: 'programmes', filter: 'all' },
    exactPhrases: [
      'show me events',
      'whats happening',
      'what is happening',
      'take me to upcoming events',
      'upcoming events',
      'events',
      'show events',
      'conferences',
      'workshops'
    ],
    keywords: ['event', 'events', 'happening', 'upcoming', 'conference', 'workshop']
  },
  {
    id: 'resources',
    primaryConfirmation: 'Opening Resources and Production Hub...',
    destination: { view: 'production' },
    exactPhrases: [
      'open resources',
      'show me your resources',
      'take me to the resource centre',
      'take me to the resource center',
      'resources',
      'resource center',
      'resource centre',
      'documents',
      'policy papers',
      'publications'
    ],
    keywords: ['resource', 'resources', 'center', 'documents', 'publications', 'library']
  },
  {
    id: 'application',
    primaryConfirmation: 'Opening the Membership Application Form...',
    destination: { view: 'portal', sectionId: 'application-section' },
    exactPhrases: [
      'take me to the application',
      'i want to apply',
      'open the application form',
      'apply now',
      'application form',
      'application',
      'apply for membership',
      'start application',
      'submit application'
    ],
    keywords: ['apply', 'application', 'form']
  },
  {
    id: 'membership',
    primaryConfirmation: 'Taking you to the Membership Portal...',
    destination: { view: 'portal', sectionId: 'portal' },
    exactPhrases: [
      'how do i join',
      'how can i join nationsworld',
      'show me membership',
      'take me to the membership page',
      'membership',
      'join nationsworld',
      'join us',
      'membership portal',
      'become a member',
      'how to join'
    ],
    keywords: ['membership', 'join', 'member']
  },
  {
    id: 'about',
    primaryConfirmation: 'Navigating to About NationsWorld...',
    destination: { view: 'home', sectionId: 'about' },
    exactPhrases: [
      'about us',
      'about',
      'who we are',
      'tell me about nationsworld',
      'learn about us',
      'our story',
      'background'
    ],
    keywords: ['about', 'who']
  },
  {
    id: 'teams',
    primaryConfirmation: 'Taking you to Teams & Institutes...',
    destination: { view: 'home', sectionId: 'teams' },
    exactPhrases: [
      'teams',
      'institutes',
      'teams and institutes',
      'show teams',
      'nasdi',
      'our institutes',
      'departments'
    ],
    keywords: ['team', 'teams', 'institute', 'institutes', 'nasdi', 'department']
  },
  {
    id: 'contact',
    primaryConfirmation: 'Taking you to Contact & Secretariat details...',
    destination: { view: 'home', sectionId: 'contact' },
    exactPhrases: [
      'take me to the contact page',
      'contact us',
      'contact',
      'reach out',
      'get in touch',
      'whatsapp',
      'secretariat contact',
      'phone',
      'email'
    ],
    keywords: ['contact', 'whatsapp', 'secretariat', 'reach', 'touch']
  },
  {
    id: 'faq',
    primaryConfirmation: 'Taking you to Frequently Asked Questions...',
    destination: { view: 'portal', sectionId: 'faq' },
    exactPhrases: [
      'faq',
      'faqs',
      'frequently asked questions',
      'questions',
      'help',
      'support'
    ],
    keywords: ['faq', 'faqs', 'question', 'questions', 'help']
  },
  {
    id: 'game_center',
    primaryConfirmation: 'Taking you to the NationsWorld Game Center...',
    destination: { view: 'games' },
    exactPhrases: [
      'game center',
      'game centre',
      'take me to the game center',
      'show me games',
      'play games',
      'games',
      'open games',
      'interactive platform',
      'challenge center'
    ],
    keywords: ['game', 'games', 'play', 'challenge']
  },
  {
    id: 'decision_room',
    primaryConfirmation: 'Starting The Decision Room flagship experience...',
    destination: { view: 'games', filter: 'decision-room' },
    exactPhrases: [
      'start the decision room',
      'the decision room',
      'open decision room',
      'decision room',
      'leadership simulation',
      'leadership game'
    ],
    keywords: ['decision', 'room', 'simulation']
  },
  {
    id: 'game_progress',
    primaryConfirmation: 'Opening your Game Center progress and skill profile...',
    destination: { view: 'games', filter: 'progress' },
    exactPhrases: [
      'show me my game progress',
      'my progress',
      'game progress',
      'my xp',
      'my badges',
      'my achievements',
      'show my score'
    ],
    keywords: ['progress', 'xp', 'score', 'badges', 'achievements']
  },
  {
    id: 'daily_challenge',
    primaryConfirmation: 'Opening today\'s Game Center challenge...',
    destination: { view: 'games', filter: 'daily' },
    exactPhrases: [
      'what is todays challenge',
      'whats todays challenge',
      'daily challenge',
      'today challenge',
      'todays game'
    ],
    keywords: ['daily', 'today']
  },
  {
    id: 'research_game',
    primaryConfirmation: 'Opening research literacy challenges...',
    destination: { view: 'games', filter: 'research-detective' },
    exactPhrases: [
      'give me a research game',
      'research game',
      'research detective',
      'fact or claim'
    ],
    keywords: ['research', 'detective', 'evidence']
  },
  {
    id: 'production',
    primaryConfirmation: 'Opening the Production Hub (Office)...',
    destination: { view: 'production' },
    exactPhrases: [
      'production',
      'production hub',
      'document office',
      'digital secretariat',
      'office',
      'generate pdf',
      'drafts'
    ],
    keywords: ['production', 'secretariat', 'office', 'pdf', 'drafts']
  },
  {
    id: 'pathway',
    primaryConfirmation: 'Navigating to The NationsWorld Pathway...',
    destination: { view: 'home', sectionId: 'pathway' },
    exactPhrases: [
      'how it works',
      'pathway',
      'the pathway',
      'nationsworld pathway',
      'our process',
      'learn think create lead contribute'
    ],
    keywords: ['pathway', 'process', 'steps', 'journey']
  },
  {
    id: 'back',
    primaryConfirmation: 'Going back to your previous location...',
    destination: { view: 'home' },
    exactPhrases: [
      'go back',
      'back',
      'previous page',
      'return'
    ],
    keywords: ['back', 'previous', 'return']
  }
];

/**
 * Score input against intent definitions.
 */
function scoreIntent(normalizedInput: string, def: IntentDefinition, context?: NOVAContext): number {
  let score = 0;

  // 1. Exact phrase match
  for (const phrase of def.exactPhrases) {
    const normPhrase = normalizeInput(phrase);
    if (normalizedInput === normPhrase) {
      return 1.0;
    }
    if (normalizedInput.includes(normPhrase) || normPhrase.includes(normalizedInput)) {
      score = Math.max(score, 0.85);
    }
  }

  // 2. Keyword / token matching
  const inputTokens = normalizedInput.split(' ').filter(Boolean);

  if (def.keywords) {
    let keywordHits = 0;
    for (const kw of def.keywords) {
      if (inputTokens.includes(kw) || normalizedInput.includes(kw)) {
        keywordHits++;
      }
    }
    if (keywordHits > 0) {
      const keywordRatio = keywordHits / def.keywords.length;
      score = Math.max(score, 0.4 + keywordRatio * 0.4);
    }
  }

  // 3. Boost tokens check: if boost token exists (e.g. 'leadership') AND query contains 'program' or 'show', boost score
  if (def.boostTokens && def.boostTokens.length > 0) {
    const hasBoostToken = def.boostTokens.some(token => normalizedInput.includes(token));
    if (hasBoostToken && (normalizedInput.includes('program') || normalizedInput.includes('show') || inputTokens.length <= 3)) {
      score = Math.max(score, 0.9);
    }
  }

  // 4. Context awareness boost
  if (context) {
    if (def.id === 'leadership_programs' || def.id === 'research_programs' || def.id === 'tpd') {
      if (context.currentSection === 'programmes' || context.currentView === 'home') {
        if (inputTokens.includes('leadership') && def.id === 'leadership_programs') score += 0.15;
        if (inputTokens.includes('research') && def.id === 'research_programs') score += 0.15;
        if (inputTokens.includes('tpd') && def.id === 'tpd') score += 0.15;
      }
    }
  }

  return Math.min(score, 1.0);
}

/**
 * Main AI-ready abstraction for processing NOVA commands.
 * Receives natural-language query and context, returns structured decision and execution payload.
 */
export async function processNOVACommand(
  userInput: string,
  context?: NOVAContext
): Promise<NOVAExecutionResult> {
  const normalized = normalizeInput(userInput);

  if (!normalized) {
    return {
      intent: 'unknown',
      confidence: 0,
      action: { type: 'none' },
      response: "Please enter or speak a navigation command (e.g. 'Take me to Programs' or 'Open Application').",
      suggestions: DEFAULT_SUGGESTIONS
    };
  }

  let bestDef: IntentDefinition | null = null;
  let maxScore = 0;

  for (const def of INTENT_DEFINITIONS) {
    const s = scoreIntent(normalized, def, context);
    if (s > maxScore) {
      maxScore = s;
      bestDef = def;
    }
  }

  // Confidence threshold: 0.35
  if (maxScore < 0.35 || !bestDef) {
    return {
      intent: 'unknown',
      confidence: maxScore,
      action: { type: 'none' },
      response: "I'm not sure where you want to go. You can ask me to open Programs, Events, Resources, Membership, the Application, or another available section.",
      suggestions: DEFAULT_SUGGESTIONS
    };
  }

  const actionType: NOVAActionType = bestDef.id === 'back' ? 'back' : 'navigate';

  return {
    intent: bestDef.id,
    confidence: maxScore,
    action: {
      type: actionType,
      destination: bestDef.destination
    },
    response: bestDef.primaryConfirmation
  };
}
