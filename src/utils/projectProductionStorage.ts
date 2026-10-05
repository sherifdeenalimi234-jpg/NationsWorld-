import type {
  ProjectProductionSettings,
  ProjectReadinessCheck,
  SectionReadinessStatus,
} from '../types/projectProduction';
import { getStoredAssignment } from './projectRoomStorage';
import { getStoredToolkit } from './toolkitStorage';

export function getProductionStorageKey(cycleId: string, projectId: string): string {
  return `nationsWorld_projectProduction_${cycleId}_${projectId}`;
}

export function getDefaultProductionSettings(
  projectId: string,
  defaultTitle = '',
  participantName = '',
  projectCategory = 'General Research'
): ProjectProductionSettings {
  const assignment = getStoredAssignment();
  const name = participantName || assignment?.declaration?.fullName || 'NationsWorld Fellow';
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    documentTitle: defaultTitle || 'Untitled Research Project',
    participantName: name,
    organization: 'NationsWorld of Visionary Advancement',
    projectNumber: projectId,
    projectCategory: projectCategory,
    date: formattedDate,
    documentType: 'Research Report',

    pageSize: 'A4',
    orientation: 'portrait',
    citationStyle: 'APA 7',
    watermark: true,
    tableOfContents: true,
    pageNumbers: true,

    includeLiteratureNotes: false,
    selectedChartIds: [],
    selectedTableIds: [],

    productionState: 'DRAFT',
    version: 1,
    referenceNumber: `NW-PROD-${projectId}-${Date.now().toString().slice(-4)}`,
  };
}

export function loadProjectProductionSettings(
  cycleId: string,
  projectId: string,
  defaultTitle = '',
  participantName = '',
  projectCategory = 'General Research'
): ProjectProductionSettings {
  if (!cycleId || !projectId) {
    return getDefaultProductionSettings(projectId, defaultTitle, participantName, projectCategory);
  }

  const key = getProductionStorageKey(cycleId, projectId);
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return getDefaultProductionSettings(projectId, defaultTitle, participantName, projectCategory);
    }
    const parsed = JSON.parse(raw) as ProjectProductionSettings;
    return {
      ...getDefaultProductionSettings(projectId, defaultTitle, participantName, projectCategory),
      ...parsed,
    };
  } catch (err) {
    console.error('Error loading project production settings:', err);
    return getDefaultProductionSettings(projectId, defaultTitle, participantName, projectCategory);
  }
}

export function saveProjectProductionSettings(
  cycleId: string,
  projectId: string,
  settings: ProjectProductionSettings
): boolean {
  if (!cycleId || !projectId) return false;
  const key = getProductionStorageKey(cycleId, projectId);
  try {
    localStorage.setItem(key, JSON.stringify(settings));
    return true;
  } catch (err) {
    console.error('Error saving project production settings:', err);
    return false;
  }
}

export function computeProjectReadiness(
  cycleId: string,
  projectId: string,
  projectTitle: string,
  sections: Array<{ id: string; title: string; isRequired?: boolean; content?: string }>
): ProjectReadinessCheck {
  const assignment = getStoredAssignment();
  const isAssigned = !!assignment && assignment.projectId === projectId;
  const isDeclarationConfirmed = !!assignment?.declarationAccepted;
  const hasTitle = !!projectTitle && projectTitle.trim().length > 0;
  const hasSections = sections.length > 0;

  const toolkit = getStoredToolkit(cycleId, projectId);
  const hasResearchMaterials =
    toolkit.literatureMatrix.length > 0 ||
    toolkit.sources.length > 0 ||
    toolkit.citations.length > 0 ||
    toolkit.researchQuestions.length > 0;

  let totalSections = sections.length;
  let completedSections = 0;

  const sectionsStatus: SectionReadinessStatus[] = sections.map((sec) => {
    const text = sec.content ? sec.content.replace(/<[^>]*>/g, '').trim() : '';
    const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const isComplete = wordCount > 20; // threshold for completed section
    if (isComplete) completedSections++;

    return {
      id: sec.id,
      title: sec.title,
      wordCount,
      isComplete,
      isRequired: sec.isRequired ?? true,
    };
  });

  const overallProgress = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
  const requiredIncomplete = sectionsStatus.some((s) => s.isRequired && !s.isComplete);

  const isFullyReady =
    isAssigned &&
    isDeclarationConfirmed &&
    hasTitle &&
    hasSections &&
    !requiredIncomplete;

  return {
    isAssigned,
    isDeclarationConfirmed,
    hasTitle,
    hasSections,
    hasResearchMaterials,
    sectionsStatus,
    overallProgress,
    isFullyReady,
  };
}
