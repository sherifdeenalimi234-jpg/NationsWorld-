import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  initializeNASDIStorage,
  saveDraftSubmission,
  submitAssessment,
} from '../services/nasdiStorage';
import { generateNASDIAssessmentPDF } from './nasdiPdfGenerator';

// Mock localStorage for node test environment
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

describe('NASDI PDF Report Generator', () => {
  beforeEach(async () => {
    localStorage.clear();
    await initializeNASDIStorage();
  });

  it('should generate a valid jsPDF instance for a submitted assessment report', () => {
    const draft = saveDraftSubmission({
      userId: 'usr-bello-1',
      sectionA: {
        fullName: 'Bello Hajara',
        email: 'bello@nasdi.org',
        positionId: 'pos-2',
        educationalBackground: 'Master of Education',
        professionalExperience: '8 years in educational research',
        areasOfInterest: 'Curriculum development',
        previousLeadership: 'Deputy Lead',
        certifications: 'Pedagogical Lead Certificate',
      },
      sectionB: {
        nasdiPurpose: 'Promote quality education and human capital development',
        sdg4Knowledge: 'SDG 4 Quality Education targets',
        educationalDevelopment: 'High pedagogical standards',
        assignedResponsibilities: 'Team coordination and implementation',
        departmentObjectives: 'Research & Policy enhancement',
        professionalPrinciples: 'Ethical conduct & transparency',
      },
    });

    const sub = submitAssessment({ ...draft, userId: 'usr-bello-1' });

    const doc = generateNASDIAssessmentPDF(sub);

    expect(doc).toBeDefined();
    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(2);
  });
});
