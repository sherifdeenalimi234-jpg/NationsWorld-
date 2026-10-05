import { PROJECT_CYCLE } from '../data/projectsData';

const STORAGE_KEY = 'projectRoomAssignment';

export const DEFAULT_DECLARATION_TEXT =
  "I acknowledge that the project assigned to me is my responsibility. I agree to approach the project with honesty, originality, intellectual discipline and respect for credible sources. I understand that I am responsible for researching, developing and presenting my work to the required standard and within the applicable project timeline.";

export interface ParticipantDeclaration {
  accepted: boolean;
  fullName: string;
  contact: string;
  acceptedAt: string;
  declarationText: string;
}

export interface StoredAssignment {
  cycleId: string;
  projectId: string;
  projectNumber: number;
  assignedAt: string;
  status: 'assigned';
  declarationAccepted?: boolean;
  declaration?: ParticipantDeclaration;
}

export interface ProjectMaterialItem {
  id: string;
  title: string;
  category: string;
  source: string;
  content: string;
  savedAt: string;
}

export interface ProjectDataOutput {
  id: string;
  title: string;
  type: string;
  summary: string;
  data: any;
  savedAt: string;
}

export function getProjectMaterials(cycleId?: string, projectId?: string): ProjectMaterialItem[] {
  try {
    const key = `project_materials_${cycleId || PROJECT_CYCLE}_${projectId || 'general'}`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getProjectDataOutputs(cycleId?: string, projectId?: string): ProjectDataOutput[] {
  try {
    const key = `project_data_outputs_${cycleId || PROJECT_CYCLE}_${projectId || 'general'}`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getStoredAssignment(): StoredAssignment | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw) as StoredAssignment;

    if (!data || typeof data !== 'object') {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (data.cycleId !== PROJECT_CYCLE) {
      console.info(`Project cycle changed from ${data.cycleId} to ${PROJECT_CYCLE}. Resetting assignment.`);
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (!data.projectId || !data.projectNumber || data.status !== 'assigned') {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (data.declaration) {
      if (!data.declaration.declarationText) {
        data.declaration.declarationText = DEFAULT_DECLARATION_TEXT;
      }
    }

    return data;
  } catch (err) {
    console.error('Error reading project room assignment from storage:', err);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore fallback error
    }
    return null;
  }
}

export function saveAssignment(projectNumber: number, projectId: string): StoredAssignment | null {
  try {
    const record: StoredAssignment = {
      cycleId: PROJECT_CYCLE,
      projectId,
      projectNumber,
      assignedAt: new Date().toISOString(),
      status: 'assigned',
      declarationAccepted: false,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    return record;
  } catch (err) {
    console.error('Error saving project room assignment:', err);
    return null;
  }
}

export function saveDeclaration(
  fullName: string,
  contact: string,
  customText?: string
): StoredAssignment | null {
  try {
    const existing = getStoredAssignment();
    if (!existing) return null;

    const declarationText = customText?.trim() || DEFAULT_DECLARATION_TEXT;

    const updated: StoredAssignment = {
      ...existing,
      declarationAccepted: true,
      declaration: {
        accepted: true,
        fullName,
        contact,
        acceptedAt: existing.declaration?.acceptedAt || new Date().toISOString(),
        declarationText,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving declaration:', err);
    return null;
  }
}

export function clearAssignment(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing project room assignment:', err);
  }
}
