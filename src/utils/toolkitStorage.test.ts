import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createInitialToolkitData,
  getStoredToolkit,
  saveToolkit,
  validateAndParseBackup,
} from './toolkitStorage';

// Mock localStorage for node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('Toolkit Storage Manager', () => {
  const testCycleId = '2026-OCTOBER';
  const testProjectId = 'P07';

  beforeEach(() => {
    localStorage.clear();
  });

  it('creates initial toolkit data with defaults', () => {
    const data = createInitialToolkitData(testCycleId, testProjectId);
    expect(data.cycleId).toBe(testCycleId);
    expect(data.projectId).toBe(testProjectId);
    expect(data.outline.length).toBe(12);
    expect(data.checklist.length).toBe(13);
  });

  it('saves and retrieves toolkit data correctly', () => {
    const initial = createInitialToolkitData(testCycleId, testProjectId);
    initial.researchPlan.projectGoal = 'Test Goal Formulation';

    const saved = saveToolkit(initial);
    expect(saved).toBe(true);

    const retrieved = getStoredToolkit(testCycleId, testProjectId);
    expect(retrieved.researchPlan.projectGoal).toBe('Test Goal Formulation');
  });

  it('validates JSON backup files for current project', () => {
    const initial = createInitialToolkitData(testCycleId, testProjectId);
    const backupJson = JSON.stringify({
      nationsWorldBackup: true,
      version: '1.0',
      exportedAt: new Date().toISOString(),
      cycleId: testCycleId,
      projectId: testProjectId,
      data: initial,
    });

    const result = validateAndParseBackup(backupJson, testCycleId, testProjectId);
    expect(result.success).toBe(true);
    expect(result.data?.projectId).toBe(testProjectId);
  });

  it('rejects backup files for a different project to enforce project separation', () => {
    const otherProjectData = createInitialToolkitData(testCycleId, 'P08');
    const backupJson = JSON.stringify({
      nationsWorldBackup: true,
      version: '1.0',
      exportedAt: new Date().toISOString(),
      cycleId: testCycleId,
      projectId: 'P08',
      data: otherProjectData,
    });

    const result = validateAndParseBackup(backupJson, testCycleId, testProjectId);
    expect(result.success).toBe(false);
    expect(result.error).toContain('Project P08');
  });
});
