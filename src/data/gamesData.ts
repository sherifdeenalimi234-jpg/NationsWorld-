export interface GameMeta {
  id: string;
  title: string;
  category: 'think' | 'know' | 'lead' | 'research' | 'create';
  categoryLabel: string;
  description: string;
  badge?: string;
  difficulty: 'Easy' | 'Intermediate' | 'Hard';
  estimatedTime: string;
  skillTags: string[];
  iconName: string;
  isFlagship?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface PatternQuestion {
  id: string;
  sequence: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  type: 'number' | 'symbol' | 'shape' | 'logic';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizQuestion {
  id: string;
  category?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FactClaimItem {
  id: string;
  category: string;
  statement: string;
  isFact: boolean;
  explanation: string;
}

export interface DataDetectiveQuestion {
  id: string;
  title: string;
  dataSummary: string;
  dataPoints: { label: string; value: number | string }[];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ResearchDetectiveCase {
  id: string;
  claim: string;
  context: string;
  studies: {
    id: string;
    name: string;
    sampleSize: string;
    methodology: string;
    finding: string;
    flaw?: string;
    quality: 'High' | 'Medium' | 'Low';
  }[];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DecisionScenario {
  id: string;
  title: string;
  context: string;
  initialBudget: number;
  options: {
    id: string;
    label: string;
    description: string;
    cost: number;
    impacts: {
      education?: number;
      healthcare?: number;
      employment?: number;
      trust?: number;
      environment?: number;
      infrastructure?: number;
      risk?: number;
    };
    consequenceText: string;
  }[];
}

export interface GovernanceSector {
  id: string;
  name: string;
  description: string;
  minAlloc: number;
  maxAlloc: number;
}

export interface InnovationChallenge {
  id: string;
  title: string;
  problem: string;
  constraints: string[];
  approaches: {
    id: string;
    title: string;
    description: string;
    creativityScore: number;
    feasibilityScore: number;
    impactScore: number;
    scalabilityScore: number;
    feedback: string;
  }[];
}

export interface ClimateMissionScenario {
  id: string;
  region: string;
  challengeTitle: string;
  description: string;
  choices: {
    id: string;
    title: string;
    description: string;
    impacts: {
      environmentalHealth: number;
      communityWelfare: number;
      budget: number;
      economicActivity: number;
    };
    feedback: string;
  }[];
}

export const GAME_CATEGORIES = [
  { id: 'think', name: 'THINK', purpose: 'Critical thinking, logic, memory and mental agility.' },
  { id: 'know', name: 'KNOW', purpose: 'Knowledge and intellectual exploration.' },
  { id: 'lead', name: 'LEAD', purpose: 'Leadership, governance and decision-making.' },
  { id: 'research', name: 'RESEARCH', purpose: 'Research literacy, evidence evaluation and data interpretation.' },
  { id: 'create', name: 'CREATE', purpose: 'Innovation, creativity and environmental problem solving.' },
] as const;

export const GAMES_LIST: GameMeta[] = [
  {
    id: 'decision-room',
    title: 'THE DECISION ROOM',
    category: 'lead',
    categoryLabel: 'LEADERSHIP & GOVERNANCE',
    description: 'Step into difficult situations, make consequential decisions and discover your leadership profile.',
    badge: 'FLAGSHIP EXPERIENCE',
    difficulty: 'Intermediate',
    estimatedTime: '8–15 min',
    skillTags: ['Leadership', 'Decision Making', 'Strategy'],
    iconName: 'Compass',
    isFlagship: true
  },
  {
    id: 'pattern-breaker',
    title: 'PATTERN BREAKER',
    category: 'think',
    categoryLabel: 'LOGIC & REASONING',
    description: 'Identify hidden rules, complete sequences, and disrupt static thinking across logic and numbers.',
    difficulty: 'Easy',
    estimatedTime: '4–6 min',
    skillTags: ['Pattern Recognition', 'Logic', 'Agility'],
    iconName: 'Grid'
  },
  {
    id: '60-second-challenge',
    title: '60-SECOND CHALLENGE',
    category: 'think',
    categoryLabel: 'RAPID REASONING',
    description: 'A rapid-fire series of micro-challenges under the clock. Speed, precision, and focus.',
    difficulty: 'Intermediate',
    estimatedTime: '1 min',
    skillTags: ['Mental Agility', 'Speed', 'Focus'],
    iconName: 'Timer'
  },
  {
    id: 'memory-grid',
    title: 'MEMORY GRID',
    category: 'think',
    categoryLabel: 'VISUAL MEMORY',
    description: 'Observe spatial arrangements and recall symbol locations as grid dimensions expand.',
    difficulty: 'Intermediate',
    estimatedTime: '3–5 min',
    skillTags: ['Visual Memory', 'Spatial Recall', 'Focus'],
    iconName: 'Layers'
  },
  {
    id: 'nationsworld-challenge',
    title: 'NATIONSWORLD CHALLENGE',
    category: 'know',
    categoryLabel: 'GLOBAL KNOWLEDGE',
    description: 'Explore global affairs, science, technology, leadership, society, and sustainable development.',
    difficulty: 'Intermediate',
    estimatedTime: '5–10 min',
    skillTags: ['Global Awareness', 'General Knowledge', 'World History'],
    iconName: 'Globe'
  },
  {
    id: 'nigeria-challenge',
    title: 'NIGERIA CHALLENGE',
    category: 'know',
    categoryLabel: 'REGIONAL & AFRICAN KNOWLEDGE',
    description: 'Deep dive into Nigerian and African history, governance, geography, culture, and economy.',
    difficulty: 'Intermediate',
    estimatedTime: '5–10 min',
    skillTags: ['African History', 'Governance', 'Civics'],
    iconName: 'MapPin'
  },
  {
    id: 'governance-challenge',
    title: 'GOVERNANCE CHALLENGE',
    category: 'lead',
    categoryLabel: 'PUBLIC ALLOCATION',
    description: 'Allocate limited public resources across social priorities and evaluate civic trade-offs.',
    difficulty: 'Hard',
    estimatedTime: '6–10 min',
    skillTags: ['Budget Strategy', 'Policy Balance', 'Civic Impact'],
    iconName: 'Scale'
  },
  {
    id: 'research-detective',
    title: 'RESEARCH DETECTIVE',
    category: 'research',
    categoryLabel: 'EVIDENCE EVALUATION',
    description: 'Investigate scientific claims, identify methodology flaws, sample size biases, and correlation fallacies.',
    difficulty: 'Intermediate',
    estimatedTime: '5–8 min',
    skillTags: ['Evidence Evaluation', 'Scientific Literacy', 'Critical Analysis'],
    iconName: 'Microscope'
  },
  {
    id: 'data-detective',
    title: 'DATA DETECTIVE',
    category: 'research',
    categoryLabel: 'DATA INTERPRETATION',
    description: 'Examine datasets and charts to separate valid statistical trends from unfounded claims.',
    difficulty: 'Intermediate',
    estimatedTime: '5–8 min',
    skillTags: ['Data Analysis', 'Graph Literacy', 'Reasoning'],
    iconName: 'BarChart3'
  },
  {
    id: 'fact-or-claim',
    title: 'FACT OR CLAIM',
    category: 'research',
    categoryLabel: 'MEDIA LITERACY',
    description: 'Distinguish verified empirical statements from unproven assumptions across science and policy.',
    difficulty: 'Easy',
    estimatedTime: '3–5 min',
    skillTags: ['Media Literacy', 'Intellectual Caution', 'Verification'],
    iconName: 'CheckCircle2'
  },
  {
    id: 'innovation-lab',
    title: 'INNOVATION LAB',
    category: 'create',
    categoryLabel: 'PROBLEM SOLVING',
    description: 'Tackle real-world community issues with resource constraints and test creative solution models.',
    difficulty: 'Hard',
    estimatedTime: '7–12 min',
    skillTags: ['Creativity', 'Feasibility', 'Scalability'],
    iconName: 'Lightbulb'
  },
  {
    id: 'climate-mission',
    title: 'CLIMATE MISSION',
    category: 'create',
    categoryLabel: 'SUSTAINABILITY SIMULATION',
    description: 'Manage environmental health, waste, energy, and community welfare in an ecological simulation.',
    difficulty: 'Intermediate',
    estimatedTime: '6–10 min',
    skillTags: ['Environmental Awareness', 'Sustainability', 'Systems Thinking'],
    iconName: 'Leaf'
  }
];

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_step', title: 'FIRST STEP', description: 'Play your first NationsWorld game.', icon: 'Footprints' },
  { id: 'critical_thinker', title: 'CRITICAL THINKER', description: 'Complete 5 thinking challenges.', icon: 'Brain' },
  { id: 'knowledge_seeker', title: 'KNOWLEDGE SEEKER', description: 'Score 80%+ in a knowledge challenge.', icon: 'BookOpen' },
  { id: 'research_detective', title: 'RESEARCH DETECTIVE', description: 'Complete Research Detective.', icon: 'Search' },
  { id: 'emerging_leader', title: 'EMERGING LEADER', description: 'Complete The Decision Room.', icon: 'Award' },
  { id: 'speed_solver', title: 'SPEED SOLVER', description: 'Complete a 60-second challenge with a strong score.', icon: 'Zap' },
  { id: 'global_mind', title: 'GLOBAL MIND', description: 'Complete challenges from multiple categories.', icon: 'Compass' },
  { id: 'game_master', title: 'GAME MASTER', description: 'Complete all available games.', icon: 'Trophy' }
];

export const PATTERN_QUESTIONS: PatternQuestion[] = [
  {
    id: 'p1',
    sequence: '2 → 4 → 8 → 16 → ?',
    options: ['20', '24', '32', '36'],
    correctIndex: 2,
    explanation: 'Correct. Each number doubles (multiplied by 2). 16 × 2 = 32.',
    type: 'number',
    difficulty: 'Easy'
  },
  {
    id: 'p2',
    sequence: '3 → 7 → 15 → 31 → ?',
    options: ['63', '62', '47', '58'],
    correctIndex: 0,
    explanation: 'Correct. The rule is (x × 2) + 1. (31 × 2) + 1 = 63.',
    type: 'number',
    difficulty: 'Medium'
  },
  {
    id: 'p3',
    sequence: 'Alpha → Gamma → Epsilon → Eta → ?',
    options: ['Theta', 'Iota', 'Kappa', 'Zeta'],
    correctIndex: 1,
    explanation: 'Correct. Skips every second letter in the Greek alphabet (α, γ, ε, η, ι). The next is Iota.',
    type: 'logic',
    difficulty: 'Medium'
  },
  {
    id: 'p4',
    sequence: '▲ → ▶ → ▼ → ◀ → ?',
    options: ['▲', '▶', '▼', '◀'],
    correctIndex: 0,
    explanation: 'Correct. The triangle rotates 90° clockwise. After 360°, it returns to pointing upward (▲).',
    type: 'shape',
    difficulty: 'Easy'
  },
  {
    id: 'p5',
    sequence: '1 → 1 → 2 → 3 → 5 → 8 → ?',
    options: ['11', '12', '13', '15'],
    correctIndex: 2,
    explanation: 'Correct. Fibonacci sequence: each number is the sum of the previous two (5 + 8 = 13).',
    type: 'number',
    difficulty: 'Medium'
  },
  {
    id: 'p6',
    sequence: '100 → 95 → 85 → 70 → 50 → ?',
    options: ['25', '30', '35', '20'],
    correctIndex: 0,
    explanation: 'Correct. Differences increase by 5: -5, -10, -15, -20, so the next subtracts 25 (50 - 25 = 25).',
    type: 'number',
    difficulty: 'Hard'
  }
];

export const SIXTY_SECOND_ITEMS = [
  { question: 'Is 17 a prime number?', answer: true, type: 'Quick Math' },
  { question: 'Does correlation strictly prove causation?', answer: false, type: 'Logic' },
  { question: 'Is Abuja the official federal capital of Nigeria?', answer: true, type: 'Knowledge' },
  { question: 'Is 144 divisible by 12?', answer: true, type: 'Quick Math' },
  { question: 'Does sound travel faster in water than in air?', answer: true, type: 'Science' },
  { question: 'Is GDP the only metric needed to measure human development?', answer: false, type: 'Economics' },
  { question: 'Is 91 a prime number?', answer: false, type: 'Quick Math' }, // 7 * 13 = 91
  { question: 'Does renewable energy emit zero lifecycle carbon during solar panel manufacturing?', answer: false, type: 'Environment' },
  { question: 'Is the African Union headquartered in Addis Ababa?', answer: true, type: 'Knowledge' },
  { question: 'Is 2^5 equal to 32?', answer: true, type: 'Quick Math' },
  { question: 'Can an empirical study with a sample size of 5 be generalized to 100 million people?', answer: false, type: 'Research' },
  { question: 'Is Python an interpreted programming language?', answer: true, type: 'Tech' },
  { question: 'Is the Sahara Desert the largest warm desert on Earth?', answer: true, type: 'Geography' },
  { question: 'Is 15% of 200 equal to 30?', answer: true, type: 'Quick Math' }
];

export const NATIONSWORLD_QUESTIONS: QuizQuestion[] = [
  {
    id: 'nw1',
    category: 'World Affairs',
    question: 'What is the primary objective of the Sustainable Development Goals (SDGs) framework established by the UN?',
    options: [
      'To mandate a single global tax rate',
      'To provide 17 interconnected targets for peace, prosperity, and planetary health by 2030',
      'To regulate international maritime shipping protocols',
      'To limit scientific research funding exclusively to green tech'
    ],
    correctIndex: 1,
    explanation: 'The 17 SDGs adopted in 2015 set a global blueprint for economic growth, social inclusion, and environmental protection.'
  },
  {
    id: 'nw2',
    category: 'Science & Society',
    question: 'What is "peer review" in academic and institutional research literacy?',
    options: [
      'An informal social media poll about a paper',
      'Evaluation of work by independent experts in the same field before publication',
      'Proofreading a document for grammar errors only',
      'Automatic approval of research by government regulators'
    ],
    correctIndex: 1,
    explanation: 'Peer review ensures research quality, scientific rigor, methodology integrity, and accountability.'
  },
  {
    id: 'nw3',
    category: 'Leadership & Vision',
    question: 'What characterizes transformational leadership compared to transactional leadership?',
    options: [
      'Focusing purely on strict immediate reward and punishment rules',
      'Inspiring and empowering teams toward a shared long-term visionary purpose',
      'Avoiding decisions until complete unanimity is achieved',
      'Delegating all executive responsibility without oversight'
    ],
    correctIndex: 1,
    explanation: 'Transformational leaders motivate stakeholders through shared values, intellectual stimulation, and long-term capability building.'
  },
  {
    id: 'nw4',
    category: 'Technology & Future',
    question: 'In digital governance and data ethics, what does "data sovereignty" refer to?',
    options: [
      'The right of digital platforms to ownership of all user content',
      'The concept that data is subject to the laws and governance of the nation where it is collected',
      'Storing all world data in a single global cloud server',
      'Replacing human decision-making entirely with automated algorithms'
    ],
    correctIndex: 1,
    explanation: 'Data sovereignty addresses legal jurisdiction, privacy protections, and nation-state authority over digital information.'
  },
  {
    id: 'nw5',
    category: 'Environment',
    question: 'What is the "Circular Economy" model designed to achieve?',
    options: [
      'Continuous linear consumption where products are discarded after single use',
      'Eliminating waste and pollution by keeping products and materials in continuous regenerative use',
      'Banning all industrial manufacturing worldwide',
      'Subsidizing plastic production through municipal tariffs'
    ],
    correctIndex: 1,
    explanation: 'The circular economy focuses on repair, reuse, remanufacturing, and recycling to decouple economic growth from finite resource extraction.'
  }
];

export const NIGERIA_QUESTIONS: QuizQuestion[] = [
  {
    id: 'ng1',
    category: 'History & Civics',
    question: 'In what year did Nigeria officially adopt its current 1999 Constitution at the return to civilian democratic governance?',
    options: ['1960', '1979', '1999', '2007'],
    correctIndex: 2,
    explanation: 'The 1999 Constitution came into force on May 29, 1999, ushering in Nigeria’s Fourth Republic.'
  },
  {
    id: 'ng2',
    category: 'Geography & Economy',
    question: 'Which river confluence forms a major geographic landmark at Lokoja, Kogi State?',
    options: [
      'River Niger and River Benue',
      'River Kaduna and River Osun',
      'River Cross and River Imo',
      'River Ogun and River Benue'
    ],
    correctIndex: 0,
    explanation: 'The confluence of the River Niger and River Benue at Lokoja is a defining geographic feature of Nigeria.'
  },
  {
    id: 'ng3',
    category: 'Science & Development',
    question: 'Nigeria’s National Space Research and Development Agency (NASRDA) launched its Earth observation satellite (Sat-2) for which primary purpose?',
    options: [
      'Interplanetary deep space exploration',
      'Environmental monitoring, agricultural planning, mapping, and disaster management',
      'Commercial satellite television broadcast only',
      'Submarine cable repair tracking'
    ],
    correctIndex: 1,
    explanation: 'NigeriaSat-2 supports sustainable spatial planning, flood prediction, urban development, and crop yield forecasting.'
  },
  {
    id: 'ng4',
    category: 'Culture & Heritage',
    question: 'Which ancient civilization located in present-day Nigeria is famous for intricate terra-cotta sculptures dating back to 1500 BC?',
    options: ['Nok Culture', 'Benin Empire', 'Oyo Empire', 'Kanem-Bornu Empire'],
    correctIndex: 0,
    explanation: 'The Nok Culture produced some of West Africa’s earliest known refined figurative sculptures in terracotta.'
  },
  {
    id: 'ng5',
    category: 'Governance & Society',
    question: 'What is the structure of Nigeria’s National Assembly under the bi-cameral federal system?',
    options: [
      'House of Representatives and House of Chiefs',
      'The Senate and the House of Representatives',
      'Unicameral People’s Assembly',
      'Federal Council and Regional Governors Senate'
    ],
    correctIndex: 1,
    explanation: 'The National Assembly consists of 109 Senators and 360 members of the House of Representatives.'
  }
];

export const DECISION_SCENARIOS: DecisionScenario[] = [
  {
    id: 'scenario_1',
    title: 'Phase 1: Regional Development Priority',
    context: 'You have been appointed to lead a community development initiative with an initial capital allocation of ₦100,000,000. Neighboring districts face compounding challenges across youth unemployment, under-equipped schools, health clinics, and rural access roads.',
    initialBudget: 100000000,
    options: [
      {
        id: 'opt_edu',
        label: 'A — Education & Digital Learning Centers',
        description: 'Allocate ₦35,000,000 to modernize 10 public school labs and launch tech literacy programs.',
        cost: 35000000,
        impacts: { education: 22, trust: 10, employment: 8, risk: -5 },
        consequenceText: 'You prioritized long-term human capacity. Education indices jump +22 points and public trust rises as families see clear investment in youth. However, road conditions remain unaddressed.'
      },
      {
        id: 'opt_health',
        label: 'B — Primary Healthcare Infrastructure',
        description: 'Allocate ₦30,000,000 to refurbish 4 primary healthcare centers and secure essential diagnostic equipment.',
        cost: 30000000,
        impacts: { healthcare: 25, trust: 15, risk: -10 },
        consequenceText: 'Healthcare availability expands immediately. Maternal and primary care stats improve by +25 points. Local community sentiment is overwhelmingly positive.'
      },
      {
        id: 'opt_roads',
        label: 'C — Rural Access Roads & Transport',
        description: 'Allocate ₦40,000,000 to pave trade corridor feeder roads connecting rural farmers to urban markets.',
        cost: 40000000,
        impacts: { infrastructure: 24, employment: 14, trust: 8 },
        consequenceText: 'Market access improves dramatically for local food producers. Agricultural commerce grows, though educational technology demands persist.'
      },
      {
        id: 'opt_youth',
        label: 'D — Youth Entrepreneurship & Micro-Grants',
        description: 'Allocate ₦25,000,000 into a seed incubator for micro-enterprises and vocational skill grants.',
        cost: 25000000,
        impacts: { employment: 26, trust: 12, risk: 10 },
        consequenceText: 'Employment opportunities boom rapidly among young innovators (+26 points). A few venture risks fail, but overall local economic vitality spikes.'
      }
    ]
  },
  {
    id: 'scenario_2',
    title: 'Phase 2: Emergency Response & Resource Shift',
    context: 'A sudden seasonal flood threatens lower agricultural basins, risking crop loss and health advisories. Stakeholders urge rapid reallocation of remaining project funds.',
    initialBudget: 70000000,
    options: [
      {
        id: 'opt_relocate',
        label: 'A — Immediate Disaster Mitigation & Drainage Infrastructure',
        description: 'Deploy ₦20,000,000 for emergency drainage, flood walls, and temporary relief camps.',
        cost: 20000000,
        impacts: { healthcare: 12, infrastructure: 15, trust: 18, risk: -15 },
        consequenceText: 'Swift crisis action prevents severe disease outbreak and safeguards community lives (+18 Public Trust).'
      },
      {
        id: 'opt_resilience',
        label: 'B — Long-Term Climate Adaptation & Agricultural Insurance',
        description: 'Commit ₦25,000,000 to climate-resilient crop seeds, insurance safety nets, and farmer training.',
        cost: 25000000,
        impacts: { environment: 20, employment: 10, trust: 10 },
        consequenceText: 'Farmers adapt to changing climate cycles. Long-term environmental resilience increases (+20 points).'
      },
      {
        id: 'opt_balanced',
        label: 'C — Balanced Public-Private Risk Sharing Model',
        description: 'Partner with local private firms to co-fund disaster response and preserve municipal budget reserves.',
        cost: 15000000,
        impacts: { trust: 12, infrastructure: 10, risk: 5 },
        consequenceText: 'Maintains public capital reserves while demonstrating pragmatic multi-stakeholder collaboration.'
      }
    ]
  }
];

export const GOVERNANCE_SECTORS: GovernanceSector[] = [
  { id: 'education', name: 'Education & Research', description: 'Schools, teacher training, research grants, and digital learning.', minAlloc: 10, maxAlloc: 40 },
  { id: 'healthcare', name: 'Primary Healthcare', description: 'Hospitals, medical supplies, community health workers.', minAlloc: 10, maxAlloc: 40 },
  { id: 'infrastructure', name: 'Infrastructure & Power', description: 'Roads, clean energy grids, water systems, public transit.', minAlloc: 10, maxAlloc: 40 },
  { id: 'employment', name: 'Youth & Job Creation', description: 'Vocational training, startup grants, industrial hubs.', minAlloc: 5, maxAlloc: 30 },
  { id: 'security', name: 'Civic Security & Safety', description: 'Community policing, emergency response, justice systems.', minAlloc: 5, maxAlloc: 25 },
  { id: 'socialProtection', name: 'Social Protection & Welfare', description: 'Safety nets, elderly care, disability inclusion programs.', minAlloc: 5, maxAlloc: 25 }
];

export const RESEARCH_CASES: ResearchDetectiveCase[] = [
  {
    id: 'rc1',
    claim: 'Claim: "Students who sleep less than 5 hours per night achieve higher academic results because they study more."',
    context: 'A viral media article claims that reduced sleep correlates directly with higher exam scores.',
    studies: [
      {
        id: 'sA',
        name: 'Study A (Self-Reported Online Poll)',
        sampleSize: '20 participants',
        methodology: 'Online voluntary survey at a single cram school before finals.',
        finding: 'High scorers reported 4.5 hours sleep.',
        flaw: 'Extremely small sample size (N=20), selection bias, self-reporting error.',
        quality: 'Low'
      },
      {
        id: 'sB',
        name: 'Study B (Controlled Longitudinal Cohort)',
        sampleSize: '5,000 participants',
        methodology: 'Multi-university randomized tracking over 3 academic years with sleep monitors.',
        finding: 'Consistent 7–8 hours sleep correlated with +18% cognitive retention and higher GPA.',
        quality: 'High'
      },
      {
        id: 'sC',
        name: 'Study C (Focused Departmental Sample)',
        sampleSize: '150 medical residency students',
        methodology: 'Observational trial during acute night shifts.',
        finding: 'Short-term stress masked sleep deficit performance drops.',
        flaw: 'Confounding variable of high baseline medical entrance scores.',
        quality: 'Medium'
      }
    ],
    question: 'Which study provides the most scientifically reliable evidence regarding sleep and academic performance?',
    options: [
      'Study A — Because cram school students know their exact study routines best.',
      'Study B — Because it features a large randomized sample (5,000), longitudinal tracking, and objective metrics.',
      'Study C — Because medical residency students have the highest academic workload.',
      'All three studies carry equal scientific weight regardless of sample size.'
    ],
    correctIndex: 1,
    explanation: 'Study B uses a large representative sample size (N=5,000) with longitudinal observation, minimizing selection bias and confounding noise.'
  },
  {
    id: 'rc2',
    claim: 'Claim: "Eating organic produce completely eliminates all risks of chronic cardiovascular disease."',
    context: 'An advocacy blog cites a health survey to argue that organic diet alone prevents disease.',
    studies: [
      {
        id: 's1',
        name: 'Study X (Observational Survey)',
        sampleSize: '500 respondents',
        methodology: 'Survey of wealthy urban health club members.',
        finding: 'Organic buyers had fewer heart issues.',
        flaw: 'Confounding variable: Healthy user bias (they also exercise regularly and smoke less).',
        quality: 'Medium'
      },
      {
        id: 's2',
        name: 'Study Y (Systematic Review & Meta-Analysis)',
        sampleSize: '120,000 participants across 15 trials',
        methodology: 'Controlled meta-analysis accounting for diet, income, exercise, and genetics.',
        finding: 'Overall dietary pattern (fiber, vegetables, low processed food) matters far more than organic certification alone.',
        quality: 'High'
      }
    ],
    question: 'Why is Study X flawed when trying to prove that organic food directly causes lower cardiovascular disease?',
    options: [
      'It failed to use colorful charts',
      'Correlation vs. Causation error: participants had higher income and active lifestyles, which confound the health outcome',
      'Organic food cannot be measured scientifically',
      'The survey was conducted during daytime hours'
    ],
    correctIndex: 1,
    explanation: 'Healthy user bias and confounding factors mean correlation between buying organic food and heart health does not prove organic food was the direct cause.'
  }
];

export const DATA_DETECTIVE_QUESTIONS: DataDetectiveQuestion[] = [
  {
    id: 'dd1',
    title: 'Dataset: Solar Energy Adoption in Country X (2018–2024)',
    dataSummary: 'Installed Capacity (Megawatts): 2018 (120 MW), 2020 (350 MW), 2022 (890 MW), 2024 (2,100 MW). Total grid energy cost fell 22%.',
    dataPoints: [
      { label: '2018', value: '120 MW' },
      { label: '2020', value: '350 MW' },
      { label: '2022', value: '890 MW' },
      { label: '2024', value: '2,100 MW' }
    ],
    question: 'Based on the provided dataset, which conclusion is directly supported by the data?',
    options: [
      'Solar capacity experienced exponential growth over 6 years while energy costs decreased.',
      'Fossil fuel usage reached zero in 2024.',
      'Solar panels caused rain patterns to change.',
      'Hydroelectric power ceased operations in 2022.'
    ],
    correctIndex: 0,
    explanation: 'The numbers explicitly show capacity growing from 120 MW to 2,100 MW alongside a 22% drop in grid cost. Other claims are unstated assumptions.'
  },
  {
    id: 'dd2',
    title: 'Dataset: Youth Digital Literacy Program Completion vs. Employment Rate',
    dataSummary: 'District A (85% completion, 72% youth employment), District B (40% completion, 48% youth employment), District C (20% completion, 35% youth employment).',
    dataPoints: [
      { label: 'District A (85% completed)', value: '72% employed' },
      { label: 'District B (40% completed)', value: '48% employed' },
      { label: 'District C (20% completed)', value: '35% employed' }
    ],
    question: 'Which statement CANNOT be definitively concluded without further data?',
    options: [
      'Districts with higher digital literacy completion rates show higher youth employment.',
      'District A has a higher completion rate than District C.',
      'Digital literacy training was the single sole reason District A had higher employment (ignoring local factory presence).',
      'District B has a higher youth employment rate than District C.'
    ],
    correctIndex: 2,
    explanation: 'While there is a positive correlation, claiming it was the "single sole reason" ignores other regional economic factors like industrial infrastructure.'
  }
];

export const FACT_CLAIM_ITEMS: FactClaimItem[] = [
  {
    id: 'fc1',
    category: 'Research Literacy',
    statement: 'Correlation always means one variable directly causes another.',
    isFact: false,
    explanation: 'CLAIM (FALSE). Correlation indicates statistical association, not direct cause-and-effect. A third confounding variable may be responsible.'
  },
  {
    id: 'fc2',
    category: 'Science',
    statement: 'The Earth rotates on its axis from West to East, causing the Sun to appear to rise in the East.',
    isFact: true,
    explanation: 'FACT. This is an empirically verified astronomical fact describing planetary rotation.'
  },
  {
    id: 'fc3',
    category: 'Governance & Economics',
    statement: 'Increasing a nation’s money supply without corresponding production growth always leads to inflationary pressure.',
    isFact: true,
    explanation: 'FACT. Macroeconomic principle confirmed by monetary data: excess money chasing fixed goods lowers currency purchasing power.'
  },
  {
    id: 'fc4',
    category: 'Technology',
    statement: 'Artificial Intelligence systems possess conscious human emotions and self-awareness.',
    isFact: false,
    explanation: 'CLAIM (FALSE). Current AI systems are statistical pattern recognition and computation models without sentience or emotional consciousness.'
  },
  {
    id: 'fc5',
    category: 'Climate',
    statement: 'Deforestation reduces the planet’s natural carbon sequestration capacity.',
    isFact: true,
    explanation: 'FACT. Trees absorb carbon dioxide through photosynthesis; clearing forests directly reduces global carbon sink capability.'
  }
];

export const INNOVATION_CHALLENGES: InnovationChallenge[] = [
  {
    id: 'ic1',
    title: 'Community Digital Learning Access',
    problem: 'A peri-urban district with 15,000 youths faces high internet data costs, frequent power outages, and limited access to updated educational books.',
    constraints: ['Low municipal budget', 'Intermittent electricity', 'Variable mobile network coverage'],
    approaches: [
      {
        id: 'app1',
        title: 'Solar Micro-Hub with Offline Educational Content Mirror',
        description: 'Set up low-power solar stations equipped with local Wi-Fi content servers pre-loaded with open-access textbooks, video lectures, and coding tools accessible without active internet charges.',
        creativityScore: 90,
        feasibilityScore: 88,
        impactScore: 92,
        scalabilityScore: 94,
        feedback: 'Outstanding approach! Bypasses grid and data costs using local caching and clean solar power. Highly scalable across developing regions.'
      },
      {
        id: 'app2',
        title: 'Centralized Paid Fiber Internet Cybercafé',
        description: 'Build a single high-tech internet cafe requiring user subscription fees.',
        creativityScore: 45,
        feasibilityScore: 60,
        impactScore: 50,
        scalabilityScore: 40,
        feedback: 'Moderate feasibility, but subscription fees exclude low-income youths, failing the primary accessibility objective.'
      },
      {
        id: 'app3',
        title: 'Mobile Printed Textbook Delivery Van',
        description: 'Convert a truck into a mobile physical library delivering printed encyclopedias weekly.',
        creativityScore: 70,
        feasibilityScore: 65,
        impactScore: 68,
        scalabilityScore: 55,
        feedback: 'Good community goodwill, but physical book logistics scale slowly and incur ongoing fuel and maintenance overheads.'
      }
    ]
  }
];

export const CLIMATE_SCENARIOS: ClimateMissionScenario[] = [
  {
    id: 'cm1',
    region: 'Eko River Municipality',
    challengeTitle: 'Urban Waste Management & Coastal Flooding',
    description: 'Improper plastic disposal blocks city drainage channels, compounding seasonal flash flood risks and reducing public health standards.',
    choices: [
      {
        id: 'ch1',
        title: 'Community Circular Recycling Incentive + Bio-Drainage Restoration',
        description: 'Implement a household waste sorting reward system while dredging channels with natural mangrove buffer zones.',
        impacts: { environmentalHealth: 25, communityWelfare: 20, budget: -15, economicActivity: 15 },
        feedback: 'Excellent balance! Creates green recycling jobs, restores natural coastal defenses, and lowers flood risk.'
      },
      {
        id: 'ch2',
        title: 'Concrete Flood Wall Seawall Construction Only',
        description: 'Build massive concrete barriers around commercial hubs without addressing municipal plastic waste habits.',
        impacts: { environmentalHealth: 5, communityWelfare: 10, budget: -30, economicActivity: 10 },
        feedback: 'High financial cost. Protects prime commercial property temporarily, but ignores underlying pollution causing drainage clogs.'
      }
    ]
  }
];
