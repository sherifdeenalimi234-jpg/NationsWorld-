import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveAssignment,
  saveDeclaration,
  getStoredAssignment,
  DEFAULT_DECLARATION_TEXT,
} from './projectRoomStorage';
import {
  sanitizeFileNamePart,
  formatProjectNumber,
  generateDeclarationPDF,
} from './declarationPdfGenerator';

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

describe('Declaration Storage & PDF Generator Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Declaration Persistence', () => {
    it('stores declaration details accurately and retains default declaration text', () => {
      saveAssignment(7, 'proj-climate-resilience');
      const saved = saveDeclaration('Jane Doe', 'jane@example.com');

      expect(saved).not.toBeNull();
      expect(saved?.declarationAccepted).toBe(true);
      expect(saved?.declaration?.fullName).toBe('Jane Doe');
      expect(saved?.declaration?.contact).toBe('jane@example.com');
      expect(saved?.declaration?.declarationText).toBe(DEFAULT_DECLARATION_TEXT);

      const reloaded = getStoredAssignment();
      expect(reloaded?.declaration?.declarationText).toBe(DEFAULT_DECLARATION_TEXT);
    });

    it('preserves exact custom declaration text if provided', () => {
      saveAssignment(12, 'proj-[#12]');
      const customText = 'I acknowledge that the project assigned to me is my responsibility and commit to high standards.';
      saveDeclaration('John Smith', 'john@example.com', customText);

      const reloaded = getStoredAssignment();
      expect(reloaded?.declaration?.declarationText).toBe(customText);
    });
  });

  describe('Filename & Project Number Helpers', () => {
    it('sanitizes participant names for professional filenames', () => {
      expect(sanitizeFileNamePart('John Doe')).toBe('John_Doe');
      expect(sanitizeFileNamePart('Dr. Alice O\'Connor & Co.')).toBe('Dr_Alice_O_Connor_Co');
      expect(sanitizeFileNamePart('   Mary-Jane   ')).toBe('Mary-Jane');
    });

    it('formats project numbers with P prefix and padded digits', () => {
      expect(formatProjectNumber(7)).toBe('P07');
      expect(formatProjectNumber(1)).toBe('P01');
      expect(formatProjectNumber(15)).toBe('P15');
    });
  });

  describe('PDF Generation Engine', () => {
    it('generates a valid jsPDF document for Participant Declaration', () => {
      const pdf = generateDeclarationPDF({
        fullName: 'Jane Doe',
        contact: 'jane@example.com',
        projectTitle: 'Global Renewable Energy Strategy',
        projectNumber: 7,
        cycleId: '2026-OCTOBER',
        acceptedAt: new Date().toISOString(),
        declarationText: DEFAULT_DECLARATION_TEXT,
      });

      expect(pdf).toBeDefined();
      expect(pdf.getNumberOfPages()).toBeGreaterThanOrEqual(1);
    });
  });
});
