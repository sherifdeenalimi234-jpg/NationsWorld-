import type { DocumentDraft } from '../types/production';

const STORAGE_KEY = 'nationsworld_production_drafts_v1';

export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__nw_test_storage__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

export function getAllDrafts(): DocumentDraft[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load drafts from LocalStorage:', e);
    return [];
  }
}

export function saveDraft(draft: DocumentDraft): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    const existing = getAllDrafts();
    const index = existing.findIndex((d) => d.id === draft.id);

    const updatedDraft = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };

    if (index >= 0) {
      existing[index] = updatedDraft;
    } else {
      existing.unshift(updatedDraft);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return true;
  } catch (e) {
    console.error('Failed to save draft to LocalStorage:', e);
    return false;
  }
}

export function deleteDraft(id: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    const existing = getAllDrafts();
    const filtered = existing.filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Failed to delete draft:', e);
    return false;
  }
}

export function getDraftById(id: string): DocumentDraft | null {
  const drafts = getAllDrafts();
  return drafts.find((d) => d.id === id) || null;
}

export function duplicateDraft(id: string): DocumentDraft | null {
  const source = getDraftById(id);
  if (!source) return null;

  const newDraft: DocumentDraft = {
    ...source,
    id: 'draft_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: `${source.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveDraft(newDraft);
  return newDraft;
}

export function exportDraftToJson(draft: DocumentDraft): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draft, null, 2));
  const downloadAnchor = document.createElement('a');
  const cleanTitle = draft.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `NationsWorld_Draft_${cleanTitle}_${draft.referenceNumber}.json`;

  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseImportedJson(jsonString: string): DocumentDraft | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && parsed.documentType && parsed.formData) {
      const newDraft: DocumentDraft = {
        ...parsed,
        id: 'draft_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        updatedAt: new Date().toISOString(),
      };
      saveDraft(newDraft);
      return newDraft;
    }
    return null;
  } catch (e) {
    console.error('Failed to parse imported draft JSON:', e);
    return null;
  }
}
