import type { StructuredDocumentData, StudioVersionRecord } from '../types/documentStudio';

const STUDIO_DRAFT_KEY = 'nova_document_studio_draft';
const STUDIO_HISTORY_KEY = 'nova_document_studio_history';

function getKey(baseKey: string, cycleId?: string, projectId?: string): string {
  if (cycleId && projectId) {
    return `${baseKey}_${cycleId}_${projectId}`;
  }
  return baseKey;
}

export function saveStudioDraft(
  data: StructuredDocumentData,
  cycleId?: string,
  projectId?: string
): void {
  try {
    const key = getKey(STUDIO_DRAFT_KEY, cycleId, projectId);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('LocalStorage save failed for studio draft', err);
  }
}

export function loadStudioDraft(
  cycleId?: string,
  projectId?: string
): StructuredDocumentData | null {
  try {
    const key = getKey(STUDIO_DRAFT_KEY, cycleId, projectId);
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as StructuredDocumentData;
  } catch (err) {
    console.warn('LocalStorage load failed for studio draft', err);
    return null;
  }
}

export function getStudioHistory(
  cycleId?: string,
  projectId?: string
): StudioVersionRecord[] {
  try {
    const key = getKey(STUDIO_HISTORY_KEY, cycleId, projectId);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as StudioVersionRecord[];
  } catch (err) {
    console.warn('LocalStorage load failed for studio history', err);
    return [];
  }
}

export function addStudioHistoryRecord(
  record: StudioVersionRecord,
  cycleId?: string,
  projectId?: string
): StudioVersionRecord[] {
  try {
    const history = getStudioHistory(cycleId, projectId);
    const updated = [record, ...history];
    const key = getKey(STUDIO_HISTORY_KEY, cycleId, projectId);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('LocalStorage save failed for studio history', err);
    return [];
  }
}

export function clearStudioHistory(
  cycleId?: string,
  projectId?: string
): void {
  try {
    const key = getKey(STUDIO_HISTORY_KEY, cycleId, projectId);
    localStorage.removeItem(key);
  } catch (err) {
    console.warn('Failed to clear studio history', err);
  }
}
