import type {
  ProjectToolkitData,
  OutlineSection,
  ToolkitBackupFile,
} from '../types/toolkit';

export const DEFAULT_OUTLINE_SECTIONS: Omit<OutlineSection, 'id'>[] = [
  { number: 1, title: '1. Introduction', notes: '' },
  { number: 2, title: '2. Background', notes: '' },
  { number: 3, title: '3. Problem Statement', notes: '' },
  { number: 4, title: '4. Objectives', notes: '' },
  { number: 5, title: '5. Research Questions', notes: '' },
  { number: 6, title: '6. Literature Review', notes: '' },
  { number: 7, title: '7. Methodology', notes: '' },
  { number: 8, title: '8. Findings / Analysis', notes: '' },
  { number: 9, title: '9. Discussion', notes: '' },
  { number: 10, title: '10. Conclusion', notes: '' },
  { number: 11, title: '11. Recommendations', notes: '' },
  { number: 12, title: '12. References', notes: '' },
];

export const DEFAULT_CHECKLIST_ITEMS: string[] = [
  'Understand project brief',
  'Define research question',
  'Create research plan',
  'Gather credible sources',
  'Review literature',
  'Develop methodology',
  'Conduct analysis',
  'Write findings',
  'Develop conclusions',
  'Prepare recommendations',
  'Review references',
  'Proofread project',
  'Prepare final submission',
];

export function getStorageKey(cycleId: string, projectId: string): string {
  return `nationsWorld_projectToolkit_${cycleId}_${projectId}`;
}

export function createInitialToolkitData(cycleId: string, projectId: string): ProjectToolkitData {
  return {
    cycleId,
    projectId,
    lastSavedAt: new Date().toISOString(),
    researchPlan: {
      projectGoal: '',
      researchQuestion: '',
      keyObjectives: '',
      researchAreas: '',
      importantConcepts: '',
      expectedEvidence: '',
      targetAudience: '',
      plannedOutput: '',
      tasks: [
        {
          id: 'task-1',
          name: 'Review assigned project brief & objectives',
          description: 'Thoroughly analyze the problem statement and scope.',
          priority: 'HIGH',
          status: 'COMPLETED',
        },
        {
          id: 'task-2',
          name: 'Develop central research question',
          description: 'Formulate a precise, answerable question.',
          priority: 'HIGH',
          status: 'IN PROGRESS',
        },
      ],
    },
    researchQuestions: [],
    literatureMatrix: [],
    sources: [],
    citations: [],
    outline: DEFAULT_OUTLINE_SECTIONS.map((sec, idx) => ({
      id: `sec-${idx + 1}`,
      number: sec.number,
      title: sec.title,
      notes: sec.notes,
      isCustom: false,
    })),
    dataLab: {
      datasetName: 'Sample Financial / Impact Metrics',
      headers: ['Category', 'Value', 'Growth (%)'],
      rows: [
        { Category: 'District A', Value: 120, 'Growth (%)': 12.5 },
        { Category: 'District B', Value: 240, 'Growth (%)': 18.2 },
        { Category: 'District C', Value: 180, 'Growth (%)': 8.7 },
        { Category: 'District D', Value: 310, 'Growth (%)': 22.4 },
      ],
      selectedValueColumn: 'Value',
      selectedCategoryColumn: 'Category',
      chartType: 'bar',
    },
    survey: {
      title: 'Stakeholder Assessment Survey',
      description: 'Gathering field insights and stakeholder perspectives for project research.',
      questions: [
        {
          id: 'q-1',
          text: 'What is your primary area of involvement in this sector?',
          type: 'Multiple Choice',
          options: ['Public Administration', 'Private Enterprise', 'Academic / Research', 'Civil Society'],
          required: true,
        },
        {
          id: 'q-2',
          text: 'Rate the severity of current operational bottlenecks (1-5):',
          type: 'Rating Scale',
          options: ['1', '2', '3', '4', '5'],
          required: true,
        },
      ],
    },
    textAnalysis: {
      sourceText: '',
      lastAnalyzedAt: undefined,
    },
    checklist: DEFAULT_CHECKLIST_ITEMS.map((text, idx) => ({
      id: `chk-${idx + 1}`,
      text,
      completed: idx === 0, // First item pre-checked as assigned
      isDefault: true,
    })),
  };
}

export function getStoredToolkit(cycleId: string, projectId: string): ProjectToolkitData {
  try {
    const key = getStorageKey(cycleId, projectId);
    const raw = localStorage.getItem(key);
    if (!raw) {
      return createInitialToolkitData(cycleId, projectId);
    }

    const data = JSON.parse(raw) as ProjectToolkitData;

    // Project data separation check: strictly validate cycleId & projectId
    if (!data || data.cycleId !== cycleId || data.projectId !== projectId) {
      console.warn(`Stored toolkit mismatched cycle/project (${data?.cycleId}/${data?.projectId} vs ${cycleId}/${projectId}). Returning clean initial state.`);
      return createInitialToolkitData(cycleId, projectId);
    }

    // Ensure all required fields exist
    const fallback = createInitialToolkitData(cycleId, projectId);
    return {
      cycleId: data.cycleId || cycleId,
      projectId: data.projectId || projectId,
      lastSavedAt: data.lastSavedAt || new Date().toISOString(),
      researchPlan: data.researchPlan || fallback.researchPlan,
      researchQuestions: Array.isArray(data.researchQuestions) ? data.researchQuestions : [],
      literatureMatrix: Array.isArray(data.literatureMatrix) ? data.literatureMatrix : [],
      sources: Array.isArray(data.sources) ? data.sources : [],
      citations: Array.isArray(data.citations) ? data.citations : [],
      outline: Array.isArray(data.outline) && data.outline.length > 0 ? data.outline : fallback.outline,
      dataLab: data.dataLab || fallback.dataLab,
      survey: data.survey || fallback.survey,
      textAnalysis: data.textAnalysis || fallback.textAnalysis,
      checklist: Array.isArray(data.checklist) && data.checklist.length > 0 ? data.checklist : fallback.checklist,
    };
  } catch (err) {
    console.error('Error reading toolkit data from localStorage:', err);
    return createInitialToolkitData(cycleId, projectId);
  }
}

export function saveToolkit(data: ProjectToolkitData): boolean {
  try {
    if (!data.cycleId || !data.projectId) {
      console.error('Cannot save toolkit without cycleId and projectId');
      return false;
    }
    const key = getStorageKey(data.cycleId, data.projectId);
    const dataToSave: ProjectToolkitData = {
      ...data,
      lastSavedAt: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(dataToSave));
    return true;
  } catch (err) {
    console.error('Error saving toolkit to localStorage:', err);
    return false;
  }
}

export function exportToolkitBackup(data: ProjectToolkitData): void {
  try {
    const backupObj: ToolkitBackupFile = {
      nationsWorldBackup: true,
      version: '1.0',
      exportedAt: new Date().toISOString(),
      cycleId: data.cycleId,
      projectId: data.projectId,
      data,
    };

    const jsonStr = JSON.stringify(backupObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NationsWorld_Project_${data.projectId}_Toolkit_Backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error exporting toolkit backup:', err);
  }
}

export function validateAndParseBackup(
  jsonString: string,
  currentCycleId: string,
  currentProjectId: string
): { success: boolean; data?: ProjectToolkitData; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);

    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: "The selected file isn't a valid JSON document." };
    }

    if (!parsed.nationsWorldBackup || !parsed.data) {
      return {
        success: false,
        error: "We couldn't import this file because it isn't a valid NationsWorld project backup.",
      };
    }

    const backupData = parsed.data as ProjectToolkitData;

    if (!backupData.projectId || !backupData.cycleId) {
      return {
        success: false,
        error: 'The backup file is missing required project identification metadata.',
      };
    }

    if (backupData.projectId !== currentProjectId) {
      return {
        success: false,
        error: `This backup belongs to Project ${backupData.projectId}, but your current active assignment is Project ${currentProjectId}. Access denied to prevent data mixing.`,
      };
    }

    // Adapt to current active cycle and project
    const sanitizedData: ProjectToolkitData = {
      ...backupData,
      cycleId: currentCycleId,
      projectId: currentProjectId,
      lastSavedAt: new Date().toISOString(),
    };

    return { success: true, data: sanitizedData };
  } catch {
    return {
      success: false,
      error: 'Failed to parse file. Please ensure you uploaded a valid NationsWorld JSON backup file.',
    };
  }
}
