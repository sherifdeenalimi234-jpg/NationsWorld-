export interface ApplicationFormData {
  // Step 01 - Personal
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  email: string;
  whatsapp: string;
  country: string;
  state: string;
  city: string;
  profilePhoto: string | null; // Base64 data URL

  // Step 02 - Education & Background
  currentStatus: string;
  institution: string;
  fieldOfStudy: string;
  highestEducation: string;
  skills: string[];

  // Step 03 - NationsWorld Interest
  primaryTeam: string;
  secondaryTeam: string;

  // Step 04 - Interest & Experience
  whyMember: string;
  areaOfInterest: string;
  skillsContribution: string;
  gainOrDevelop: string;
  communityProblem: string;
  previousExperienceAreas: string[];
  workedOnProject: boolean | null;
  projectExperienceDetails: string;
  portfolioUrl: string;

  // Step 05 - Participation & Declaration
  howHeard: string;
  participatedBefore: boolean | null;
  pastProgrammeName: string;
  participationTypes: string[];
  declarationAccurate: boolean;
  declarationReview: boolean;

  // Generated state
  appReference: string | null;
  generatedAt: string | null;
}

export type ValidationErrors = Record<string, string>;

export interface TeamOption {
  id: string;
  acronym?: string;
  name: string;
  description: string;
  category: string;
}
