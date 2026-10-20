export type UserRole = 'SUPER_ADMIN' | 'PARTICIPANT' | 'REVIEWER';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  positionId?: string;
  positionIds?: string[]; // Supports single user holding multiple assigned leadership offices (e.g. ONIYE MARY holding Chief of Staff & Spokesperson)
  departmentId?: string;
  mustChangePassword?: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  createdAt: string;
  lastLoginAt?: string;
}

export interface LeadershipPosition {
  id: string;
  title: string;
  officeholder: string;
  isVacant: boolean;
  description: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface EvidenceDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string; // Base64 data URL
  includeInPdf: boolean;
  uploadedAt: string;
}

export type ScaleRating = '1' | '2' | '3' | '4' | '5' | 'N/A';

export interface AssessmentSectionA {
  fullName: string;
  email: string;
  phone?: string;
  positionId: string;
  departmentId?: string;
  educationalBackground: string;
  professionalExperience: string;
  areasOfInterest: string;
  previousLeadership: string;
  certifications: string;
}

export interface AssessmentSectionB {
  nasdiPurpose: string;
  sdg4Knowledge: string;
  educationalDevelopment: string;
  assignedResponsibilities: string;
  departmentObjectives: string;
  professionalPrinciples: string;
}

export interface AssessmentSectionC {
  officialResponsibilities: string;
  institutionalAccountability: string;
  teamworkUnderstanding: string;
  inclusionAndEqualOpp: string;
  educationalChallenges: string;
  organisationalCommunication: string;
  ethicalConduct: string;
}

export interface CompetencyItem {
  rating: ScaleRating;
  explanation?: string;
}

export interface AssessmentSectionD {
  communication: CompetencyItem;
  professionalWriting: CompetencyItem;
  digitalLiteracy: CompetencyItem;
  research: CompetencyItem;
  criticalThinking: CompetencyItem;
  problemSolving: CompetencyItem;
  publicSpeaking: CompetencyItem;
  teamwork: CompetencyItem;
  timeManagement: CompetencyItem;
  projectPlanning: CompetencyItem;
  responsibleAI: CompetencyItem;
  dataHandling: CompetencyItem;
}

export interface AssessmentSectionE {
  previousProjects: string;
  leadershipExperience: string;
  volunteerWork: string;
  educationalInitiatives: string;
  communityEngagement: string;
  practicalExperience: string;
  evidenceSummary: string;
}

export interface AssessmentSectionF {
  workIndependently: CompetencyItem;
  completeAssignedTasks: CompetencyItem;
  meetDeadlines: CompetencyItem;
  collaborateEffectively: CompetencyItem;
  handleResponsibilities: CompetencyItem;
  solvePracticalProblems: CompetencyItem;
  learnNewSkills: CompetencyItem;
  applyKnowledge: CompetencyItem;
}

export interface AssessmentSectionG {
  integrity: CompetencyItem;
  confidentiality: CompetencyItem;
  resourceUse: CompetencyItem;
  respectForOthers: CompetencyItem;
  professionalBoundaries: CompetencyItem;
  safeguardingAwareness: CompetencyItem;
  conflictResolution: CompetencyItem;
  accountability: CompetencyItem;
}

export interface AssessmentSectionH {
  qualityEducation: string;
  inclusiveEducation: string;
  equalOpportunities: string;
  teacherDevelopment: string;
  studentDevelopment: string;
  educationalTech: string;
  communityParticipation: string;
  educationalResearch: string;
  improvingLearningOutcomes: string;
}

export interface AssessmentSectionI {
  strongestAbilities: string;
  areasRequiringImprovement: string;
  trainingNeeded: string;
  professionalSkillsToDevelop: string;
  contributionsToNASDI: string;
  shortTermGoals: string;
  longTermGoals: string;
  timeCommitmentHours: string;
}

export interface RoleSpecificResponse {
  questionId: string;
  questionText: string;
  response: string;
  rating?: ScaleRating;
}

export interface AssessmentSubmission {
  id: string;
  refNo: string;
  userId: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'REVISION_REQUESTED' | 'APPROVED' | 'REVIEWED';
  version: number;
  sectionA: AssessmentSectionA;
  sectionB: AssessmentSectionB;
  sectionC: AssessmentSectionC;
  sectionD: AssessmentSectionD;
  sectionE: AssessmentSectionE;
  sectionF: AssessmentSectionF;
  sectionG: AssessmentSectionG;
  sectionH: AssessmentSectionH;
  sectionI: AssessmentSectionI;
  sectionJ: RoleSpecificResponse[];
  evidenceDocuments: EvidenceDocument[];
  reviewerComments?: string;
  reviewerRecommendations?: string;
  reviewDecisionDate?: string;
  reviewerId?: string;
  reviewerName?: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  details: string;
}

export interface PortalSettings {
  logoDataUrl: string | null;
  instituteFullName: string;
  parentOrganisation: string;
  programTitle: string;
  primaryAlignment: string;
  inactivityTimeoutMinutes: number;
  maxFailedLogins: number;
  lockoutMinutes: number;
}

// Default Data Constants
export const DEFAULT_LEADERSHIP_POSITIONS: LeadershipPosition[] = [
  {
    id: 'pos-1',
    title: 'Team Lead',
    officeholder: 'Sherifdeen Titilope Alimi',
    isVacant: false,
    description: 'Strategic leadership, decision-making, planning, coordination, and overall institute accountability.',
  },
  {
    id: 'pos-2',
    title: 'Deputy Team Lead',
    officeholder: 'Bello Hajara',
    isVacant: false,
    description: 'Team coordination, departmental support, delegation, implementation, and progress tracking.',
  },
  {
    id: 'pos-3',
    title: 'Second Deputy Team Lead',
    officeholder: 'Samuel Adebisi',
    isVacant: false,
    description: 'Operational coordination, cross-departmental alignment, and execution support.',
  },
  {
    id: 'pos-4',
    title: 'Chief of Staff',
    officeholder: 'ONIYE MARY',
    isVacant: false,
    description: 'Leadership coordination, meeting follow-up, task tracking, scheduling, and implementation support.',
  },
  {
    id: 'pos-5',
    title: 'Secretary',
    officeholder: 'Afolashade Islamia',
    isVacant: false,
    description: 'Documentation, correspondence, recordkeeping, meeting minutes, and information management.',
  },
  {
    id: 'pos-6',
    title: 'Financial Secretary',
    officeholder: 'Tijani Eniola',
    isVacant: false,
    description: 'Financial documentation, budgeting basics, transaction records, accountability, and financial reporting.',
  },
  {
    id: 'pos-7',
    title: 'Assistant Team Lead on Press Release and Publication',
    officeholder: 'Grace',
    isVacant: false,
    description: 'Professional writing, editing, press releases, publication planning, media communication, and content accuracy.',
  },
  {
    id: 'pos-8',
    title: 'Male SDG 4 Spokesperson',
    officeholder: 'KENNY OSEWA',
    isVacant: false,
    description: 'Public speaking, educational advocacy, stakeholder engagement, and representing NASDI educational objectives.',
  },
  {
    id: 'pos-9',
    title: 'Female SDG 4 Spokesperson',
    officeholder: 'ONIYE MARY',
    isVacant: false,
    description: 'Public speaking, educational advocacy, stakeholder engagement, and representing NASDI educational objectives.',
  },
];

export const DEFAULT_DEPARTMENTS: Department[] = [
  {
    id: 'dept-1',
    name: 'Department of Educational Research and Policy',
    description: 'Conducting evidence-based educational research, policy analysis, and formulation of learning enhancement strategies.',
  },
  {
    id: 'dept-2',
    name: 'Department of Quality Teaching and Learning',
    description: 'Developing curriculum frameworks, pedagogical standards, and quality metrics for effective education.',
  },
  {
    id: 'dept-3',
    name: 'Department of Inclusive Education and Equal Opportunities',
    description: 'Ensuring accessible, equitable, and non-discriminatory educational pathways for underrepresented communities.',
  },
  {
    id: 'dept-4',
    name: 'Department of Digital Education and Innovation',
    description: 'Spearheading edtech integration, digital literacy, e-learning platforms, and innovative classroom solutions.',
  },
  {
    id: 'dept-5',
    name: 'Department of Teacher and Student Development',
    description: 'Fostering educator capacity building, mentorship, student leadership, and holistic skill development.',
  },
  {
    id: 'dept-6',
    name: 'Department of Educational Advocacy and Community Engagement',
    description: 'Building public awareness, community grassroots mobilization, and policy advocacy for SDG 4.',
  },
  {
    id: 'dept-7',
    name: 'Department of Partnerships, Projects, Monitoring and Evaluation',
    description: 'Managing institutional alliances, grant projects, impact evaluation metrics, and institutional reporting.',
  },
];

export const DEFAULT_PORTAL_SETTINGS: PortalSettings = {
  logoDataUrl: null,
  instituteFullName: 'NATIONS WORLD AFFAIRS OF SUSTAINABLE DEVELOPMENT INSTITUTE (NASDI)',
  parentOrganisation: 'NationsWorld of Visionary Advancement',
  programTitle: 'NASDI Human Capital Development and Assessment Programme',
  primaryAlignment: 'United Nations Sustainable Development Goal 4 (SDG 4): Quality Education',
  inactivityTimeoutMinutes: 15,
  maxFailedLogins: 5,
  lockoutMinutes: 15,
};

// Cryptographic helpers
export async function hashPassword(password: string, salt: string): Promise<string> {
  const text = password + ':' + salt;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simple hash for environments without Web Crypto API
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'fallback_' + Math.abs(hash).toString(16);
}

export function generateSalt(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'nasdi_users_v1',
  POSITIONS: 'nasdi_positions_v1',
  DEPARTMENTS: 'nasdi_departments_v1',
  SUBMISSIONS: 'nasdi_submissions_v1',
  DRAFTS: 'nasdi_drafts_v1',
  SETTINGS: 'nasdi_settings_v1',
  AUDIT_LOGS: 'nasdi_audit_logs_v1',
  CURRENT_USER: 'nasdi_current_user_v1',
  LOGIN_ATTEMPTS: 'nasdi_login_attempts_v1',
};

// Helper: Local Storage wrapper
function getItem<T>(key: string, defaultValue: T): T {
  try {
    if (typeof localStorage === 'undefined') return defaultValue;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

// Initial Data Seeding
export async function initializeNASDIStorage(): Promise<void> {
  // 1. Settings
  const settings = getItem<PortalSettings | null>(STORAGE_KEYS.SETTINGS, null);
  if (!settings) {
    setItem(STORAGE_KEYS.SETTINGS, DEFAULT_PORTAL_SETTINGS);
  }

  // 2. Positions
  const positions = getItem<LeadershipPosition[] | null>(STORAGE_KEYS.POSITIONS, null);
  if (!positions || positions.length === 0) {
    setItem(STORAGE_KEYS.POSITIONS, DEFAULT_LEADERSHIP_POSITIONS);
  }

  // 3. Departments
  const departments = getItem<Department[] | null>(STORAGE_KEYS.DEPARTMENTS, null);
  if (!departments || departments.length === 0) {
    setItem(STORAGE_KEYS.DEPARTMENTS, DEFAULT_DEPARTMENTS);
  }

  // 4. Users Seeding
  const users = getItem<UserAccount[]>(STORAGE_KEYS.USERS, []);
  if (users.length === 0) {
    // Initial Super Admin with required password "Sherifdeen"
    const adminSalt = generateSalt();
    const adminHash = await hashPassword('Sherifdeen', adminSalt);

    const initialAdmin: UserAccount = {
      id: 'usr-admin-1',
      fullName: 'Sherifdeen Titilope Alimi',
      email: 'sherifdeen@nasdi.org',
      passwordHash: adminHash,
      salt: adminSalt,
      role: 'SUPER_ADMIN',
      positionId: 'pos-1', // Team Lead
      mustChangePassword: true, // MUST change temporary password after first login!
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    // Reviewer default user
    const revSalt = generateSalt();
    const revHash = await hashPassword('Reviewer2026!', revSalt);
    const initialReviewer: UserAccount = {
      id: 'usr-reviewer-1',
      fullName: 'NASDI Review Board',
      email: 'reviewer@nasdi.org',
      passwordHash: revHash,
      salt: revSalt,
      role: 'REVIEWER',
      mustChangePassword: false,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    // Participant accounts for appointed team leaders with initial password "Sherifdeen"
    const commonSalt = generateSalt();
    const commonHash = await hashPassword('Sherifdeen', commonSalt);

    const participantBello: UserAccount = {
      id: 'usr-bello-1',
      fullName: 'Bello Hajara',
      email: 'bello@nasdi.org',
      passwordHash: commonHash,
      salt: commonSalt,
      role: 'PARTICIPANT',
      positionId: 'pos-2',
      positionIds: ['pos-2'],
      departmentId: 'dept-1',
      mustChangePassword: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const participantAdebisi: UserAccount = {
      id: 'usr-adebisi-1',
      fullName: 'Samuel Adebisi',
      email: 'adebisi@nasdi.org',
      passwordHash: commonHash,
      salt: commonSalt,
      role: 'PARTICIPANT',
      positionId: 'pos-3',
      positionIds: ['pos-3'],
      departmentId: 'dept-2',
      mustChangePassword: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    // ONIYE MARY holds TWO separate offices under ONE individual user account
    const participantOniyeMary: UserAccount = {
      id: 'usr-oniyemary-1',
      fullName: 'ONIYE MARY',
      email: 'oniyemary@nasdi.org',
      passwordHash: commonHash,
      salt: commonSalt,
      role: 'PARTICIPANT',
      positionId: 'pos-4',
      positionIds: ['pos-4', 'pos-9'], // Chief of Staff AND Female SDG 4 Spokesperson
      departmentId: 'dept-6',
      mustChangePassword: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    // KENNY OSEWA - Male SDG 4 Spokesperson
    const participantKennyOsewa: UserAccount = {
      id: 'usr-kenny-1',
      fullName: 'KENNY OSEWA',
      email: 'kenny@nasdi.org',
      passwordHash: commonHash,
      salt: commonSalt,
      role: 'PARTICIPANT',
      positionId: 'pos-8',
      positionIds: ['pos-8'],
      departmentId: 'dept-6',
      mustChangePassword: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const participantAfolashade: UserAccount = {
      id: 'usr-afolashade-1',
      fullName: 'Afolashade Islamia',
      email: 'afolashade@nasdi.org',
      passwordHash: commonHash,
      salt: commonSalt,
      role: 'PARTICIPANT',
      positionId: 'pos-5',
      positionIds: ['pos-5'],
      departmentId: 'dept-1',
      mustChangePassword: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const participantTijani: UserAccount = {
      id: 'usr-tijani-1',
      fullName: 'Tijani Eniola',
      email: 'tijani@nasdi.org',
      passwordHash: commonHash,
      salt: commonSalt,
      role: 'PARTICIPANT',
      positionId: 'pos-6',
      positionIds: ['pos-6'],
      departmentId: 'dept-7',
      mustChangePassword: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const participantGrace: UserAccount = {
      id: 'usr-grace-1',
      fullName: 'Grace',
      email: 'grace@nasdi.org',
      passwordHash: commonHash,
      salt: commonSalt,
      role: 'PARTICIPANT',
      positionId: 'pos-7',
      positionIds: ['pos-7'],
      departmentId: 'dept-4',
      mustChangePassword: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const initialUsers = [
      initialAdmin,
      initialReviewer,
      participantBello,
      participantAdebisi,
      participantOniyeMary,
      participantKennyOsewa,
      participantAfolashade,
      participantTijani,
      participantGrace,
    ];
    setItem(STORAGE_KEYS.USERS, initialUsers);

    addAuditLog('SYSTEM_INIT', 'system', 'System', 'SUPER_ADMIN', 'Initialized default NASDI portal storage, positions, departments, and initial accounts');
  }
}

// User Authentication API
export interface AuthResult {
  success: boolean;
  user?: UserAccount;
  error?: string;
  mustChangePassword?: boolean;
  isLockedOut?: boolean;
}

export interface RateLimitStatus {
  failedAttempts: number;
  lockedUntil: number | null;
}

function getLoginRateLimit(email: string): RateLimitStatus {
  const attempts = getItem<Record<string, RateLimitStatus>>(STORAGE_KEYS.LOGIN_ATTEMPTS, {});
  return attempts[email.toLowerCase()] || { failedAttempts: 0, lockedUntil: null };
}

function recordFailedLogin(email: string): RateLimitStatus {
  const attempts = getItem<Record<string, RateLimitStatus>>(STORAGE_KEYS.LOGIN_ATTEMPTS, {});
  const key = email.toLowerCase();
  const current = attempts[key] || { failedAttempts: 0, lockedUntil: null };
  const settings = getPortalSettings();

  const newCount = current.failedAttempts + 1;
  let lockedUntil: number | null = current.lockedUntil;

  if (newCount >= settings.maxFailedLogins) {
    lockedUntil = Date.now() + settings.lockoutMinutes * 60 * 1000;
  }

  const updated = { failedAttempts: newCount, lockedUntil };
  attempts[key] = updated;
  setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, attempts);
  return updated;
}

function clearFailedLogin(email: string): void {
  const attempts = getItem<Record<string, RateLimitStatus>>(STORAGE_KEYS.LOGIN_ATTEMPTS, {});
  delete attempts[email.toLowerCase()];
  setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, attempts);
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  await initializeNASDIStorage();
  let rawInput = email.trim().toLowerCase();

  // Flexible Username/Surname Resolver
  // If user enters 'bello' -> 'bello@nasdi.org'
  if (!rawInput.includes('@')) {
    rawInput = `${rawInput}@nasdi.org`;
  }

  const cleanEmail = rawInput;

  // Rate Limiting Check
  const rateLimit = getLoginRateLimit(cleanEmail);
  if (rateLimit.lockedUntil && Date.now() < rateLimit.lockedUntil) {
    const remainingMinutes = Math.ceil((rateLimit.lockedUntil - Date.now()) / (1000 * 60));
    return {
      success: false,
      isLockedOut: true,
      error: `Account temporarily locked due to repeated failed attempts. Please try again in ${remainingMinutes} minute(s).`,
    };
  }

  const users = getItem<UserAccount[]>(STORAGE_KEYS.USERS, []);

  // Flexible account matching (by email prefix, surname, or full email)
  const namePrefix = cleanEmail.split('@')[0];
  let user = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    user = users.find((u) => {
      const uEmailPrefix = u.email.toLowerCase().split('@')[0];
      const nameParts = u.fullName.toLowerCase().split(' ');
      return uEmailPrefix === namePrefix || nameParts.some((part) => part === namePrefix);
    });
  }

  if (!user) {
    recordFailedLogin(cleanEmail);
    return { success: false, error: 'Invalid email address or password.' };
  }

  if (user.status === 'SUSPENDED' || user.status === 'INACTIVE') {
    return { success: false, error: `Account is ${user.status.toLowerCase()}. Please contact the administrator.` };
  }

  const passwordHash = await hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) {
    const rl = recordFailedLogin(cleanEmail);
    if (rl.lockedUntil && Date.now() < rl.lockedUntil) {
      return {
        success: false,
        isLockedOut: true,
        error: `Too many failed attempts. Account locked for ${getPortalSettings().lockoutMinutes} minutes.`,
      };
    }
    return { success: false, error: 'Invalid email address or password.' };
  }

  // Clear failed login count
  clearFailedLogin(cleanEmail);

  // Update last login
  user.lastLoginAt = new Date().toISOString();
  setItem(STORAGE_KEYS.USERS, users);

  // Set Current Session
  setItem(STORAGE_KEYS.CURRENT_USER, user);

  addAuditLog('USER_LOGIN', user.id, user.fullName, user.role, `Logged into NASDI portal`);

  return {
    success: true,
    user,
    mustChangePassword: user.mustChangePassword,
  };
}

export async function changePassword(userId: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const users = getItem<UserAccount[]>(STORAGE_KEYS.USERS, []);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return { success: false, error: 'User not found.' };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(newPassword, salt);

  users[index].salt = salt;
  users[index].passwordHash = passwordHash;
  users[index].mustChangePassword = false;

  setItem(STORAGE_KEYS.USERS, users);

  // Update session
  const currentUser = getCurrentSessionUser();
  if (currentUser && currentUser.id === userId) {
    currentUser.mustChangePassword = false;
    currentUser.salt = salt;
    currentUser.passwordHash = passwordHash;
    setItem(STORAGE_KEYS.CURRENT_USER, currentUser);
  }

  addAuditLog('PASSWORD_CHANGED', userId, users[index].fullName, users[index].role, 'Changed account password');

  return { success: true };
}

export function getCurrentSessionUser(): UserAccount | null {
  return getItem<UserAccount | null>(STORAGE_KEYS.CURRENT_USER, null);
}

export function logoutUser(): void {
  const user = getCurrentSessionUser();
  if (user) {
    addAuditLog('USER_LOGOUT', user.id, user.fullName, user.role, 'Logged out of NASDI portal');
  }
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// User Account Management API (Super Admin)
export function getAllUserAccounts(): UserAccount[] {
  return getItem<UserAccount[]>(STORAGE_KEYS.USERS, []);
}

export async function createUserAccount(
  actor: UserAccount,
  data: {
    fullName: string;
    email: string;
    role: UserRole;
    positionId?: string;
    departmentId?: string;
    initialPassword?: string;
  }
): Promise<{ success: boolean; user?: UserAccount; error?: string }> {
  if (actor.role !== 'SUPER_ADMIN') {
    return { success: false, error: 'Unauthorized: Only Super Administrators can create user accounts.' };
  }

  const users = getAllUserAccounts();
  const cleanEmail = data.email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An account with this email address already exists.' };
  }

  const password = data.initialPassword || 'Nasdi2026!';
  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  const newUser: UserAccount = {
    id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    fullName: data.fullName,
    email: cleanEmail,
    passwordHash,
    salt,
    role: data.role,
    positionId: data.positionId,
    departmentId: data.departmentId,
    mustChangePassword: true,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  setItem(STORAGE_KEYS.USERS, users);

  addAuditLog('USER_CREATED', actor.id, actor.fullName, actor.role, `Created account for ${newUser.fullName} (${newUser.role})`);

  return { success: true, user: newUser };
}

export function updateUserAccountStatus(
  actor: UserAccount,
  userId: string,
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'
): { success: boolean; error?: string } {
  if (actor.role !== 'SUPER_ADMIN') {
    return { success: false, error: 'Unauthorized: Only Super Administrators can update account statuses.' };
  }

  const users = getAllUserAccounts();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return { success: false, error: 'User account not found.' };

  users[index].status = status;
  setItem(STORAGE_KEYS.USERS, users);

  addAuditLog('USER_STATUS_UPDATED', actor.id, actor.fullName, actor.role, `Updated user ${users[index].fullName} status to ${status}`);

  return { success: true };
}

export function updateUserAssignments(
  actor: UserAccount,
  userId: string,
  assignments: { positionId?: string; departmentId?: string; role?: UserRole }
): { success: boolean; error?: string } {
  if (actor.role !== 'SUPER_ADMIN') {
    return { success: false, error: 'Unauthorized.' };
  }

  const users = getAllUserAccounts();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return { success: false, error: 'User account not found.' };

  if (assignments.positionId !== undefined) users[index].positionId = assignments.positionId;
  if (assignments.departmentId !== undefined) users[index].departmentId = assignments.departmentId;
  if (assignments.role !== undefined) users[index].role = assignments.role;

  setItem(STORAGE_KEYS.USERS, users);

  addAuditLog('USER_ASSIGNMENT_UPDATED', actor.id, actor.fullName, actor.role, `Updated assignments for ${users[index].fullName}`);

  return { success: true };
}

// Leadership & Department Management
export function getLeadershipPositions(): LeadershipPosition[] {
  return getItem<LeadershipPosition[]>(STORAGE_KEYS.POSITIONS, DEFAULT_LEADERSHIP_POSITIONS);
}

export function updateLeadershipPosition(
  actor: UserAccount,
  positionId: string,
  data: { officeholder: string; isVacant: boolean; description?: string }
): { success: boolean; error?: string } {
  if (actor.role !== 'SUPER_ADMIN') {
    return { success: false, error: 'Unauthorized: Only Super Administrators can update leadership positions.' };
  }

  const positions = getLeadershipPositions();
  const index = positions.findIndex((p) => p.id === positionId);
  if (index === -1) return { success: false, error: 'Position not found.' };

  positions[index].officeholder = data.isVacant ? 'Vacant' : data.officeholder;
  positions[index].isVacant = data.isVacant;
  if (data.description) positions[index].description = data.description;

  setItem(STORAGE_KEYS.POSITIONS, positions);

  addAuditLog('LEADERSHIP_UPDATED', actor.id, actor.fullName, actor.role, `Updated officeholder for ${positions[index].title} to ${positions[index].officeholder}`);

  return { success: true };
}

export function getDepartments(): Department[] {
  return getItem<Department[]>(STORAGE_KEYS.DEPARTMENTS, DEFAULT_DEPARTMENTS);
}

// Submissions & Drafts Management
export function getDraftSubmission(userId: string): AssessmentSubmission | null {
  const drafts = getItem<Record<string, AssessmentSubmission>>(STORAGE_KEYS.DRAFTS, {});
  return drafts[userId] || null;
}

export function saveDraftSubmission(submission: Partial<AssessmentSubmission> & { userId: string }): AssessmentSubmission {
  const drafts = getItem<Record<string, AssessmentSubmission>>(STORAGE_KEYS.DRAFTS, {});
  const existing = drafts[submission.userId] || null;

  const updated: AssessmentSubmission = {
    id: existing?.id || `sub-${Date.now()}`,
    refNo: existing?.refNo || `NASDI-HCDA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: submission.userId,
    status: 'DRAFT',
    version: (existing?.version || 0) + 1,
    sectionA: submission.sectionA || existing?.sectionA || createDefaultSectionA(),
    sectionB: submission.sectionB || existing?.sectionB || createDefaultSectionB(),
    sectionC: submission.sectionC || existing?.sectionC || createDefaultSectionC(),
    sectionD: submission.sectionD || existing?.sectionD || createDefaultSectionD(),
    sectionE: submission.sectionE || existing?.sectionE || createDefaultSectionE(),
    sectionF: submission.sectionF || existing?.sectionF || createDefaultSectionF(),
    sectionG: submission.sectionG || existing?.sectionG || createDefaultSectionG(),
    sectionH: submission.sectionH || existing?.sectionH || createDefaultSectionH(),
    sectionI: submission.sectionI || existing?.sectionI || createDefaultSectionI(),
    sectionJ: submission.sectionJ || existing?.sectionJ || [],
    evidenceDocuments: submission.evidenceDocuments || existing?.evidenceDocuments || [],
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  drafts[submission.userId] = updated;
  setItem(STORAGE_KEYS.DRAFTS, drafts);

  return updated;
}

export function submitAssessment(submissionData: Partial<AssessmentSubmission> & { userId: string }): AssessmentSubmission {
  const draft = saveDraftSubmission(submissionData);
  const submissions = getItem<AssessmentSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);

  const index = submissions.findIndex((s) => s.id === draft.id || s.userId === draft.userId);

  const finalSubmission: AssessmentSubmission = {
    ...draft,
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    submissions[index] = finalSubmission;
  } else {
    submissions.push(finalSubmission);
  }

  setItem(STORAGE_KEYS.SUBMISSIONS, submissions);

  // Clear draft
  const drafts = getItem<Record<string, AssessmentSubmission>>(STORAGE_KEYS.DRAFTS, {});
  delete drafts[submissionData.userId];
  setItem(STORAGE_KEYS.DRAFTS, drafts);

  const currentUser = getCurrentSessionUser();
  addAuditLog(
    'ASSESSMENT_SUBMITTED',
    submissionData.userId,
    currentUser?.fullName || 'Participant',
    currentUser?.role || 'PARTICIPANT',
    `Submitted assessment report (Ref: ${finalSubmission.refNo})`
  );

  return finalSubmission;
}

export function getAllSubmissions(): AssessmentSubmission[] {
  return getItem<AssessmentSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
}

export function getSubmissionByUserId(userId: string): AssessmentSubmission | null {
  const submissions = getAllSubmissions();
  return submissions.find((s) => s.userId === userId) || null;
}

export function getSubmissionById(id: string): AssessmentSubmission | null {
  const submissions = getAllSubmissions();
  return submissions.find((s) => s.id === id) || null;
}

export function reviewAssessmentSubmission(
  actor: UserAccount,
  submissionId: string,
  reviewData: {
    comments: string;
    recommendations: string;
    decision: 'APPROVED' | 'REVISION_REQUESTED' | 'REVIEWED';
  }
): { success: boolean; submission?: AssessmentSubmission; error?: string } {
  if (actor.role !== 'SUPER_ADMIN' && actor.role !== 'REVIEWER') {
    return { success: false, error: 'Unauthorized: Only Super Admin or Reviewers can review assessments.' };
  }

  const submissions = getAllSubmissions();
  const index = submissions.findIndex((s) => s.id === submissionId);

  if (index === -1) {
    return { success: false, error: 'Submission record not found.' };
  }

  submissions[index].status = reviewData.decision;
  submissions[index].reviewerComments = reviewData.comments;
  submissions[index].reviewerRecommendations = reviewData.recommendations;
  submissions[index].reviewDecisionDate = new Date().toISOString();
  submissions[index].reviewerId = actor.id;
  submissions[index].reviewerName = actor.fullName;
  submissions[index].updatedAt = new Date().toISOString();

  setItem(STORAGE_KEYS.SUBMISSIONS, submissions);

  addAuditLog(
    'ASSESSMENT_REVIEWED',
    actor.id,
    actor.fullName,
    actor.role,
    `Recorded decision '${reviewData.decision}' for submission ${submissions[index].refNo}`
  );

  return { success: true, submission: submissions[index] };
}

// Settings & Audit Logging
export function getPortalSettings(): PortalSettings {
  return getItem<PortalSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_PORTAL_SETTINGS);
}

export function updatePortalSettings(actor: UserAccount, settings: Partial<PortalSettings>): { success: boolean; error?: string } {
  if (actor.role !== 'SUPER_ADMIN') {
    return { success: false, error: 'Unauthorized.' };
  }

  const current = getPortalSettings();
  const updated = { ...current, ...settings };
  setItem(STORAGE_KEYS.SETTINGS, updated);

  addAuditLog('SETTINGS_UPDATED', actor.id, actor.fullName, actor.role, 'Updated portal document and logo configuration settings');

  return { success: true };
}

export function getAuditLogs(): AuditRecord[] {
  return getItem<AuditRecord[]>(STORAGE_KEYS.AUDIT_LOGS, []);
}

export function addAuditLog(action: string, actorId: string, actorName: string, actorRole: UserRole, details: string): void {
  const logs = getAuditLogs();
  const newRecord: AuditRecord = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
    actorId,
    actorName,
    actorRole,
    action,
    details,
  };
  logs.unshift(newRecord); // Most recent first
  // Keep last 200 logs
  if (logs.length > 200) logs.length = 200;
  setItem(STORAGE_KEYS.AUDIT_LOGS, logs);
}

// Default Section Object Creators
export function createDefaultSectionA(): AssessmentSectionA {
  return {
    fullName: '',
    email: '',
    phone: '',
    positionId: '',
    departmentId: '',
    educationalBackground: '',
    professionalExperience: '',
    areasOfInterest: '',
    previousLeadership: '',
    certifications: '',
  };
}

export function createDefaultSectionB(): AssessmentSectionB {
  return {
    nasdiPurpose: '',
    sdg4Knowledge: '',
    educationalDevelopment: '',
    assignedResponsibilities: '',
    departmentObjectives: '',
    professionalPrinciples: '',
  };
}

export function createDefaultSectionC(): AssessmentSectionC {
  return {
    officialResponsibilities: '',
    institutionalAccountability: '',
    teamworkUnderstanding: '',
    inclusionAndEqualOpp: '',
    educationalChallenges: '',
    organisationalCommunication: '',
    ethicalConduct: '',
  };
}

export function createDefaultSectionD(): AssessmentSectionD {
  return {
    communication: { rating: '3' },
    professionalWriting: { rating: '3' },
    digitalLiteracy: { rating: '3' },
    research: { rating: '3' },
    criticalThinking: { rating: '3' },
    problemSolving: { rating: '3' },
    publicSpeaking: { rating: '3' },
    teamwork: { rating: '3' },
    timeManagement: { rating: '3' },
    projectPlanning: { rating: '3' },
    responsibleAI: { rating: '3' },
    dataHandling: { rating: '3' },
  };
}

export function createDefaultSectionE(): AssessmentSectionE {
  return {
    previousProjects: '',
    leadershipExperience: '',
    volunteerWork: '',
    educationalInitiatives: '',
    communityEngagement: '',
    practicalExperience: '',
    evidenceSummary: '',
  };
}

export function createDefaultSectionF(): AssessmentSectionF {
  return {
    workIndependently: { rating: '3' },
    completeAssignedTasks: { rating: '3' },
    meetDeadlines: { rating: '3' },
    collaborateEffectively: { rating: '3' },
    handleResponsibilities: { rating: '3' },
    solvePracticalProblems: { rating: '3' },
    learnNewSkills: { rating: '3' },
    applyKnowledge: { rating: '3' },
  };
}

export function createDefaultSectionG(): AssessmentSectionG {
  return {
    integrity: { rating: '3' },
    confidentiality: { rating: '3' },
    resourceUse: { rating: '3' },
    respectForOthers: { rating: '3' },
    professionalBoundaries: { rating: '3' },
    safeguardingAwareness: { rating: '3' },
    conflictResolution: { rating: '3' },
    accountability: { rating: '3' },
  };
}

export function createDefaultSectionH(): AssessmentSectionH {
  return {
    qualityEducation: '',
    inclusiveEducation: '',
    equalOpportunities: '',
    teacherDevelopment: '',
    studentDevelopment: '',
    educationalTech: '',
    communityParticipation: '',
    educationalResearch: '',
    improvingLearningOutcomes: '',
  };
}

export function createDefaultSectionI(): AssessmentSectionI {
  return {
    strongestAbilities: '',
    areasRequiringImprovement: '',
    trainingNeeded: '',
    professionalSkillsToDevelop: '',
    contributionsToNASDI: '',
    shortTermGoals: '',
    longTermGoals: '',
    timeCommitmentHours: '',
  };
}
