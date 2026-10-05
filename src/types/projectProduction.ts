export type DocumentProductionType =
  | 'Research Report'
  | 'Policy Brief'
  | 'Project Report'
  | 'Research Proposal'
  | 'Project Paper';

export type CitationStyleOption = 'APA 7' | 'MLA 9' | 'Chicago';
export type PageSizeOption = 'A4' | 'Letter';
export type PageOrientationOption = 'portrait' | 'landscape';
export type DocumentProductionState = 'DRAFT' | 'FINAL';

export interface ProjectProductionSettings {
  documentTitle: string;
  participantName: string;
  organization: string;
  projectNumber: string;
  projectCategory: string;
  date: string;
  documentType: DocumentProductionType;

  // Formatting settings
  pageSize: PageSizeOption;
  orientation: PageOrientationOption;
  citationStyle: CitationStyleOption;
  watermark: boolean;
  tableOfContents: boolean;
  pageNumbers: boolean;

  // Content inclusions
  includeLiteratureNotes: boolean;
  selectedChartIds: string[];
  selectedTableIds: string[];

  // Metadata & versioning
  productionState: DocumentProductionState;
  version: number;
  lastGeneratedAt?: string;
  referenceNumber: string;
}

export interface SectionReadinessStatus {
  id: string;
  title: string;
  wordCount: number;
  isComplete: boolean;
  isRequired: boolean;
}

export interface ProjectReadinessCheck {
  isAssigned: boolean;
  isDeclarationConfirmed: boolean;
  hasTitle: boolean;
  hasSections: boolean;
  hasResearchMaterials: boolean;
  sectionsStatus: SectionReadinessStatus[];
  overallProgress: number;
  isFullyReady: boolean;
}
