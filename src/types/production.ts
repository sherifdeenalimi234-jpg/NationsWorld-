export type DocumentCategory = 'letters' | 'reports' | 'organizational' | 'certificates';

export type DocumentTypeId =
  // Letters
  | 'official-letter'
  | 'invitation-letter'
  | 'appreciation-letter'
  | 'congratulatory-letter'
  | 'appointment-letter'
  | 'partnership-letter'
  | 'sponsorship-letter'
  // Reports
  | 'general-report'
  | 'programme-report'
  | 'event-report'
  | 'project-report'
  // Organizational
  | 'proposal'
  | 'memo'
  | 'notice'
  | 'statement'
  | 'meeting-document'
  // Certificates
  | 'participation-certificate'
  | 'appreciation-certificate'
  | 'achievement-certificate'
  | 'programme-certificate';

export interface DocumentTypeOption {
  id: DocumentTypeId;
  category: DocumentCategory;
  title: string;
  description: string;
  codePrefix: string; // e.g. NW-LET, NW-RPT, NW-ORG, NW-CRT
}

export interface LetterFormData {
  recipientName: string;
  recipientPosition: string;
  organization: string;
  address: string;
  subject: string;
  content: string; // Rich text or multiline text
  preparedBy: string;
  position: string;
  signatureImage?: string; // Base64 data URL
}

export interface ReportFormData {
  reportTitle: string;
  programmeOrProject: string;
  location: string;
  preparedBy: string;
  position: string;
  executiveSummary: string;
  introduction: string;
  objectives: string;
  activities: string;
  participants: string;
  outcomes: string;
  challenges: string;
  recommendations: string;
  conclusion: string;
  attachmentsNotes: string;
}

export interface OrganizationalFormData {
  documentTitle: string;
  targetAudience: string;
  preparedBy: string;
  position: string;
  summary: string;
  mainBody: string;
  actionItems: string;
  signatureImage?: string;
}

export interface CertificateFormData {
  recipientName: string;
  programmeOrEvent: string;
  achievementTitle: string; // e.g., "for outstanding contribution as Guest Speaker"
  issueDate: string;
  certificateNumber: string;
  authorizedSignatoryName: string;
  authorizedSignatoryTitle: string;
  signatureImage?: string;
}

export type DocumentFormData =
  | LetterFormData
  | ReportFormData
  | OrganizationalFormData
  | CertificateFormData;

export interface DocumentDraft {
  id: string; // Unique UUID/hash
  documentType: DocumentTypeId;
  category: DocumentCategory;
  title: string;
  referenceNumber: string;
  formData: DocumentFormData;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  templateVersion: string;
}

export interface TemplateDefinition {
  id: DocumentTypeId;
  category: DocumentCategory;
  title: string;
  description: string;
  codePrefix: string;
  defaultFormData: DocumentFormData;
}
