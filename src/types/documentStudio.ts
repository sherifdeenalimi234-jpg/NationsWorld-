export type StudioStep = 'upload' | 'doctype' | 'configure' | 'review' | 'generate';

export const UNEXTRACTED_PLACEHOLDER = 'Information not detected — please review.';

export type DocumentTypeId =
  | 'official-letter'
  | 'appointment-letter'
  | 'invitation-letter'
  | 'certificate'
  | 'report'
  | 'research-report'
  | 'research-proposal'
  | 'policy-brief'
  | 'project-report'
  | 'memo'
  | 'press-release'
  | 'official-notice'
  | 'recommendation-letter'
  | 'other';

export interface DocumentTypeOption {
  id: DocumentTypeId;
  name: string;
  description: string;
  iconName: string;
  category: string;
}

export type DocumentTypeInfo = DocumentTypeOption;

export interface TransformationOption {
  id: string;
  label: string;
  description: string;
  applicableDocTypes?: (DocumentTypeId | string)[];
  applicableTypes?: (DocumentTypeId | string)[];
  defaultChecked?: boolean;
}

export interface DocumentSection {
  id: string;
  key?: string;
  title?: string;
  heading: string;
  content: string;
  type: 'text' | 'table' | 'bullets' | 'key-value';
  required?: boolean;
}

export interface StructuredDocumentData {
  id: string;
  docTypeId: DocumentTypeId;
  title: string;
  date: string;
  referenceNumber: string;
  recipient?: string;
  recipientName?: string;
  author?: string;
  address?: string;
  salutation?: string;
  subject?: string;
  bodyText?: string;
  closing?: string;
  signatureBlock?: string;
  authorParticipant?: string;
  executiveSummary?: string;
  sections: DocumentSection[];
  cycleId?: string;
  projectId?: string;
  projectNumber?: string;
}

export interface UploadedFileInfo {
  name: string;
  type: string;
  size: number;
  pagesEstimate?: number;
  pagesCount?: number;
  status: 'uploading' | 'reading' | 'processing' | 'ready' | 'unsupported' | 'error';
  errorMessage?: string;
  rawContent: string;
}

export interface ValidationIssue {
  id: string;
  severity: 'error' | 'warning';
  message: string;
  field?: string;
}

export interface StudioValidationResult {
  status: 'DOCUMENT READY' | 'REVIEW REQUIRED';
  isValid: boolean;
  issues: ValidationIssue[];
}

export interface StudioVersionRecord {
  id: string;
  version: number;
  generatedAt: string;
  documentTitle: string;
  docTypeId: DocumentTypeId;
  referenceNumber: string;
  pdfFileName: string;
  documentData: StructuredDocumentData;
}
