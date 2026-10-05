export type ToolkitCategory = 'ALL' | 'RESEARCH' | 'WRITING' | 'ANALYSIS' | 'FIELDWORK' | 'PROJECT MANAGEMENT';

export type ToolId =
  | 'research-planner'
  | 'research-question-builder'
  | 'literature-matrix'
  | 'source-manager'
  | 'citation-tool'
  | 'outline-builder'
  | 'data-lab'
  | 'survey-builder'
  | 'text-analyzer'
  | 'checklist';

export interface ToolMeta {
  id: ToolId;
  name: string;
  category: ToolkitCategory;
  shortDescription: string;
  iconName: string;
}

// 1. Research Planner
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'NOT STARTED' | 'IN PROGRESS' | 'COMPLETED';

export interface ResearchPlannerTask {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
}

export interface ResearchPlan {
  projectGoal: string;
  researchQuestion: string;
  keyObjectives: string;
  researchAreas: string;
  importantConcepts: string;
  expectedEvidence: string;
  targetAudience: string;
  plannedOutput: string;
  tasks: ResearchPlannerTask[];
}

// 2. Research Question Builder
export interface ResearchQuestionInputs {
  topic: string;
  context: string;
  targetPopulation: string;
  locationSetting: string;
  mainIssue: string;
}

export interface ResearchQuestionItem {
  id: string;
  questionText: string;
  patternTemplate: string;
  selected: boolean;
  savedAt: string;
}

// 3. Literature Review Matrix
export interface LiteratureMatrixItem {
  id: string;
  author: string;
  year: string;
  title: string;
  sourceType: string;
  researchQuestion: string;
  method: string;
  keyFindings: string;
  keyArgument: string;
  limitations: string;
  relevance: string;
  urlDoi: string;
  notes: string;
}

// 4. Source Manager
export type SourceType =
  | 'Journal Article'
  | 'Book'
  | 'Report'
  | 'Government Publication'
  | 'Organization'
  | 'Website'
  | 'Dataset'
  | 'News'
  | 'Other';

export type CredibilityRating = 'High' | 'Medium' | 'Needs Verification';

export interface SourceItem {
  id: string;
  title: string;
  author: string;
  year: string;
  publication: string;
  sourceType: SourceType;
  url: string;
  doi: string;
  notes: string;
  credibility: CredibilityRating;
  verified: boolean;
}

// 5. Citation & Reference Tool
export type CitationStyle = 'APA 7' | 'MLA 9' | 'Chicago';
export type CitationSourceType = 'Website' | 'Journal article' | 'Book' | 'Report';

export interface CitationItem {
  id: string;
  style: CitationStyle;
  sourceType: CitationSourceType;
  author: string;
  title: string;
  year: string;
  publisherJournal: string;
  url: string;
  doi: string;
  formattedCitation: string;
  savedAt: string;
}

// 6. Project Outline Builder
export interface OutlineSection {
  id: string;
  number: number;
  title: string;
  notes: string;
  isCustom?: boolean;
}

// 7. Data Lab
export interface DataLabRow {
  [key: string]: string | number;
}

export interface DataLabState {
  datasetName: string;
  headers: string[];
  rows: DataLabRow[];
  selectedValueColumn: string;
  selectedCategoryColumn: string;
  chartType: 'bar' | 'line' | 'pie';
}

// 8. Survey Builder
export type SurveyQuestionType =
  | 'Short Answer'
  | 'Long Answer'
  | 'Multiple Choice'
  | 'Checkboxes'
  | 'Yes/No'
  | 'Rating Scale';

export interface SurveyQuestion {
  id: string;
  text: string;
  type: SurveyQuestionType;
  options?: string[];
  required: boolean;
}

export interface SurveyState {
  title: string;
  description: string;
  questions: SurveyQuestion[];
}

// 9. Word & Text Analyzer
export interface TextAnalysisState {
  sourceText: string;
  lastAnalyzedAt?: string;
}

// 10. Project Checklist
export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  isDefault?: boolean;
}

// Complete Project Toolkit Data State
export interface ProjectToolkitData {
  cycleId: string;
  projectId: string;
  lastSavedAt?: string;
  researchPlan: ResearchPlan;
  researchQuestions: ResearchQuestionItem[];
  literatureMatrix: LiteratureMatrixItem[];
  sources: SourceItem[];
  citations: CitationItem[];
  outline: OutlineSection[];
  dataLab: DataLabState;
  survey: SurveyState;
  textAnalysis: TextAnalysisState;
  checklist: ChecklistItem[];
}

// Backup file structure
export interface ToolkitBackupFile {
  nationsWorldBackup: boolean;
  version: string;
  exportedAt: string;
  cycleId: string;
  projectId: string;
  data: ProjectToolkitData;
}
