import { PROJECT_CYCLE } from '../data/projectsData';

const STORAGE_KEY = 'projectRoomAssignment';

export interface ParticipantDeclaration {
  accepted: boolean;
  fullName: string;
  contact: string;
  acceptedAt: string;
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

export function getStoredAssignment(): StoredAssignment | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw) as StoredAssignment;

    // Validate object structure
    if (!data || typeof data !== 'object') {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    // Check if the assignment belongs to the current active project cycle
    if (data.cycleId !== PROJECT_CYCLE) {
      console.info(`Project cycle changed from ${data.cycleId} to ${PROJECT_CYCLE}. Resetting assignment.`);
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (!data.projectId || !data.projectNumber || data.status !== 'assigned') {
      localStorage.removeItem(STORAGE_KEY);
      return null;
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

export function saveDeclaration(fullName: string, contact: string): StoredAssignment | null {
  try {
    const existing = getStoredAssignment();
    if (!existing) return null;

    const updated: StoredAssignment = {
      ...existing,
      declarationAccepted: true,
      declaration: {
        accepted: true,
        fullName,
        contact,
        acceptedAt: new Date().toISOString(),
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
