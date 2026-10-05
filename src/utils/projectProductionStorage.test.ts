import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getDefaultProductionSettings,
  saveProjectProductionSettings,
  loadProjectProductionSettings,
  computeProjectReadiness,
} from './projectProductionStorage';

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

describe('projectProductionStorage', () => {
  const cycleId = '2026-OCTOBER';
  const projectId = 'P07';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should generate default production settings', () => {
    const defaults = getDefaultProductionSettings(projectId, 'Cross-Border Agricultural Value Chain', 'Test Fellow');
    expect(defaults.projectNumber).toBe('P07');
    expect(defaults.documentTitle).toBe('Cross-Border Agricultural Value Chain');
    expect(defaults.participantName).toBe('Test Fellow');
    expect(defaults.pageSize).toBe('A4');
    expect(defaults.citationStyle).toBe('APA 7');
    expect(defaults.productionState).toBe('DRAFT');
    expect(defaults.version).toBe(1);
  });

  it('should save and load settings isolated by cycleId and projectId', () => {
    const defaults = getDefaultProductionSettings(projectId, 'Cross-Border Agricultural Value Chain');
    const updated = {
      ...defaults,
      documentTitle: 'Updated Trade Corridor Strategy',
      citationStyle: 'MLA 9' as const,
      version: 2,
    };

    const saved = saveProjectProductionSettings(cycleId, projectId, updated);
    expect(saved).toBe(true);

    const loaded = loadProjectProductionSettings(cycleId, projectId);
    expect(loaded.documentTitle).toBe('Updated Trade Corridor Strategy');
    expect(loaded.citationStyle).toBe('MLA 9');
    expect(loaded.version).toBe(2);

    // Mismatched project ID should return clean defaults
    const loadedOther = loadProjectProductionSettings(cycleId, 'P08');
    expect(loadedOther.documentTitle).not.toBe('Updated Trade Corridor Strategy');
  });

  it('should compute readiness status accurately', () => {
    const sections = [
      { id: 'sec-1', title: '1. Introduction', content: 'This is a long comprehensive introduction text containing well over twenty words to satisfy the section readiness threshold check properly for testing purposes.', isRequired: true },
      { id: 'sec-2', title: '2. Background', content: '', isRequired: true },
    ];

    const readiness = computeProjectReadiness(cycleId, projectId, 'Test Project', sections);

    expect(readiness.hasTitle).toBe(true);
    expect(readiness.hasSections).toBe(true);
    expect(readiness.sectionsStatus.length).toBe(2);
    expect(readiness.sectionsStatus[0].isComplete).toBe(true);
    expect(readiness.sectionsStatus[1].isComplete).toBe(false);
    expect(readiness.overallProgress).toBe(50);
  });
});
