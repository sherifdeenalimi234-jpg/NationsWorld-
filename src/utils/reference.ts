import type { ApplicationFormData } from '../types';

export const OFFICIAL_WHATSAPP_NUMBER = '+2347073180242';
export const WHATSAPP_RAW_NUMBER = '2347073180242';
export const WHATSAPP_BASE_URL = 'https://wa.me/2347073180242';

export const INITIAL_FORM_DATA: ApplicationFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  preferredName: '',
  email: '',
  whatsapp: '',
  country: 'Nigeria',
  state: '',
  city: '',
  profilePhoto: null,

  currentStatus: '',
  institution: '',
  fieldOfStudy: '',
  highestEducation: '',
  skills: [],

  primaryTeam: '',
  secondaryTeam: '',

  whyMember: '',
  areaOfInterest: '',
  skillsContribution: '',
  gainOrDevelop: '',
  communityProblem: '',
  previousExperienceAreas: [],
  workedOnProject: null,
  projectExperienceDetails: '',
  portfolioUrl: '',

  howHeard: '',
  participatedBefore: null,
  pastProgrammeName: '',
  participationTypes: [],
  declarationAccurate: false,
  declarationReview: false,

  appReference: null,
  generatedAt: null,
};

export function generateApplicationReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  const charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomCode = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomCode += charset[randomIndex];
  }

  return `NWA-${dateStr}-${randomCode}`;
}

const LOCAL_STORAGE_KEY = 'nationsworld_membership_app_v1';

export function saveApplicationToLocalStorage(data: ApplicationFormData, currentStep: number): void {
  try {
    const payload = {
      formData: data,
      currentStep,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save draft to localStorage:', err);
  }
}

export function loadApplicationFromLocalStorage(): { formData: ApplicationFormData; currentStep: number } | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.formData) {
      return {
        formData: { ...INITIAL_FORM_DATA, ...parsed.formData },
        currentStep: typeof parsed.currentStep === 'number' ? parsed.currentStep : 1
      };
    }
  } catch (err) {
    console.error('Failed to load draft from localStorage:', err);
  }
  return null;
}

export function clearApplicationLocalStorage(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear localStorage:', err);
  }
}

export function generateWhatsAppLink(reference: string): string {
  const message = `NationsWorld Membership Application\nApplication Reference: ${reference}\n\nI am submitting my completed membership application for review.`;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppMessageText(reference: string): string {
  return `NationsWorld Membership Application\nApplication Reference: ${reference}\n\nI am submitting my completed membership application for review.`;
}
