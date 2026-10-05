import { describe, it, expect } from 'vitest';
import { buildStructuredDocument } from './studioFileProcessor';
import { validateDocumentStudio } from '../utils/documentStudioValidator';
import { generateStudioFileName } from '../utils/documentStudioPdfGenerator';

describe('Document Studio Services', () => {
  it('builds structured letter document without fabricating facts', () => {
    const raw = 'Official Letter Heading\nSubject: Project Expansion\nTo: Director of Governance\nBody content here';
    const structured = buildStructuredDocument(raw, 'official-letter');

    expect(structured.docTypeId).toBe('official-letter');
    expect(structured.recipient).toContain('Director of Governance');
  });

  it('validates incomplete document correctly', () => {
    const res = validateDocumentStudio(null, false);
    expect(res.isValid).toBe(false);
    expect(res.status).toBe('REVIEW REQUIRED');
  });

  it('generates sanitized filename', () => {
    const fn = generateStudioFileName({
      id: 'doc_123',
      docTypeId: 'policy-brief',
      title: 'Global Energy Policy 2026!',
      date: 'Oct 2026',
      referenceNumber: 'NWA-2026-1234',
      sections: [],
    });

    expect(fn).toBe('NationsWorld_policy-brief_Global_Energy_Policy_2026_.pdf');
  });
});
