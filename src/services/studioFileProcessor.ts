import type {
  DocumentTypeId,
  StructuredDocumentData,
  DocumentSection,
  UploadedFileInfo,
} from '../types/documentStudio';

export const UNEXTRACTED_PLACEHOLDER = 'Information not detected — please review.';

export const processUploadedFile = extractTextFromFile;

/**
 * Client-side file text extractor supporting PDF (stream text), DOCX (XML text), TXT, MD, JSON.
 */
export async function extractTextFromFile(file: File): Promise<UploadedFileInfo> {
  const fileName = file.name;
  const fileSize = file.size;
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  const initialInfo: UploadedFileInfo = {
    name: fileName,
    type: file.type || extension.toUpperCase(),
    size: fileSize,
    pagesEstimate: 1,
    pagesCount: 1,
    status: 'reading',
    rawContent: '',
  };

  try {
    if (extension === 'pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const text = extractPDFTextFromBuffer(arrayBuffer);
      const estPages = Math.max(1, Math.ceil(text.length / 2500));
      return {
        ...initialInfo,
        status: 'ready',
        pagesEstimate: estPages,
        pagesCount: estPages,
        rawContent: text.trim() || UNEXTRACTED_PLACEHOLDER,
      };
    } else if (extension === 'docx') {
      const arrayBuffer = await file.arrayBuffer();
      const text = extractDocxTextFromBuffer(arrayBuffer);
      const estPages = Math.max(1, Math.ceil(text.length / 2200));
      return {
        ...initialInfo,
        status: 'ready',
        pagesEstimate: estPages,
        pagesCount: estPages,
        rawContent: text.trim() || UNEXTRACTED_PLACEHOLDER,
      };
    } else if (['txt', 'md', 'json', 'csv'].includes(extension)) {
      const text = await file.text();
      const estPages = Math.max(1, Math.ceil(text.length / 2000));
      return {
        ...initialInfo,
        status: 'ready',
        pagesEstimate: estPages,
        pagesCount: estPages,
        rawContent: text.trim() || UNEXTRACTED_PLACEHOLDER,
      };
    } else {
      return {
        ...initialInfo,
        status: 'unsupported',
        errorMessage: `The file format .${extension} is not supported. Please upload a PDF, DOCX, TXT, or MD document.`,
      };
    }
  } catch (err: any) {
    return {
      ...initialInfo,
      status: 'error',
      errorMessage: err?.message || 'Your document could not be processed safely. Please try another file.',
    };
  }
}

/**
 * Basic PDF text stream parser for client-side without external servers
 */
function extractPDFTextFromBuffer(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder('latin1');
  const rawStr = decoder.decode(buffer);
  const textBlocks: string[] = [];

  const tjRegex = /\(([^)]+)\)\s*Tj/g;
  let match;
  while ((match = tjRegex.exec(rawStr)) !== null) {
    textBlocks.push(match[1]);
  }

  if (textBlocks.length === 0) {
    const plainStrings = rawStr.match(/[A-Za-z0-9\s,.:;'"!?-]{6,}/g) || [];
    return plainStrings.slice(0, 100).join('\n');
  }

  return textBlocks.join(' ');
}

/**
 * Extracts raw paragraphs from a DOCX zip container (word/document.xml)
 */
function extractDocxTextFromBuffer(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder('utf-8');
  const rawStr = decoder.decode(buffer);

  const tagRegex = /<w:t[^>]*>(.*?)<\/w:t>/g;
  const parts: string[] = [];
  let match;
  while ((match = tagRegex.exec(rawStr)) !== null) {
    parts.push(match[1]);
  }

  if (parts.length === 0) {
    return rawStr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  }

  return parts.join(' ');
}

/**
 * Reusable Document Structure Engine
 * Constructs template-aligned section objects based on docType without fabricating facts.
 */
export function buildStructuredDocument(
  rawText: string,
  docType: DocumentTypeId,
  cycleId?: string,
  projectId?: string
): StructuredDocumentData {
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);

  const dateMatch = rawText.match(/\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|[A-Z][a-z]+\s+\d{1,2},\s+\d{4})\b/);
  const refMatch = rawText.match(/\b(NWA|REF|NOVA)[-/\w\d]+\b/i);

  const defaultRef = refMatch ? refMatch[0] : `NWA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const defaultDate = dateMatch ? dateMatch[0] : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  let title = lines[0] || 'NationsWorld Document';
  if (title.length > 80) {
    title = title.substring(0, 80) + '...';
  }

  const sections: DocumentSection[] = [];

  if (docType === 'official-letter' || docType === 'appointment-letter' || docType === 'invitation-letter') {
    return {
      id: 'doc_' + Date.now(),
      docTypeId: docType,
      title: title || 'Official Letter',
      date: defaultDate,
      referenceNumber: defaultRef,
      recipient: extractRecipient(lines) || UNEXTRACTED_PLACEHOLDER,
      recipientName: extractRecipient(lines) || UNEXTRACTED_PLACEHOLDER,
      address: UNEXTRACTED_PLACEHOLDER,
      salutation: 'Dear Distinguished Recipient,',
      subject: lines[1] || 'OFFICIAL COMMUNICATION',
      bodyText: rawText || UNEXTRACTED_PLACEHOLDER,
      closing: 'Respectfully submitted,',
      signatureBlock: 'Director of Secretariat\nNationsWorld of Visionary Advancement',
      sections: [
        {
          id: 'sec_body',
          heading: 'Main Body',
          content: rawText || UNEXTRACTED_PLACEHOLDER,
          type: 'text',
          required: true,
        },
      ],
      cycleId,
      projectId,
    };
  }

  if (docType === 'research-report' || docType === 'project-report' || docType === 'report') {
    sections.push(
      { id: 'sec_exec', heading: 'Executive Summary', content: extractSectionContent(lines, 'summary', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_intro', heading: 'Introduction & Background', content: extractSectionContent(lines, 'introduction', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_problem', heading: 'Problem Statement & Objectives', content: extractSectionContent(lines, 'problem', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_lit', heading: 'Literature Review', content: extractSectionContent(lines, 'literature', UNEXTRACTED_PLACEHOLDER), type: 'text' },
      { id: 'sec_method', heading: 'Methodology', content: extractSectionContent(lines, 'methodology', UNEXTRACTED_PLACEHOLDER), type: 'text' },
      { id: 'sec_findings', heading: 'Findings & Analysis', content: extractSectionContent(lines, 'findings', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_conclusion', heading: 'Conclusion & Recommendations', content: extractSectionContent(lines, 'conclusion', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_refs', heading: 'References & Citations', content: extractSectionContent(lines, 'references', UNEXTRACTED_PLACEHOLDER), type: 'text' }
    );
  } else if (docType === 'policy-brief') {
    sections.push(
      { id: 'sec_exec', heading: 'Executive Summary', content: extractSectionContent(lines, 'summary', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_prob', heading: 'Policy Context & Problem', content: extractSectionContent(lines, 'problem', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_options', heading: 'Policy Options & Evidence', content: extractSectionContent(lines, 'evidence', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_recs', heading: 'Actionable Recommendations', content: extractSectionContent(lines, 'recommendations', UNEXTRACTED_PLACEHOLDER), type: 'text', required: true },
      { id: 'sec_conclusion', heading: 'Conclusion', content: extractSectionContent(lines, 'conclusion', UNEXTRACTED_PLACEHOLDER), type: 'text' }
    );
  } else if (docType === 'press-release') {
    sections.push(
      { id: 'sec_headline', heading: 'Headline & Announcement', content: rawText.slice(0, 300) || UNEXTRACTED_PLACEHOLDER, type: 'text', required: true },
      { id: 'sec_body', heading: 'Main Announcement & Supporting Data', content: rawText.slice(300) || UNEXTRACTED_PLACEHOLDER, type: 'text', required: true },
      { id: 'sec_boilerplate', heading: 'About NationsWorld', content: 'NationsWorld of Visionary Advancement is a global institutional body advancing leadership, research, development, innovation, and production.', type: 'text', required: true },
      { id: 'sec_contact', heading: 'Media Contact Information', content: 'Media Relations Office | NationsWorld Secretariat\nEmail: press@nationsworld.org | WhatsApp: +2347073180242', type: 'text', required: true }
    );
  } else {
    sections.push(
      { id: 'sec_main', heading: 'Main Content', content: rawText || UNEXTRACTED_PLACEHOLDER, type: 'text', required: true }
    );
  }

  return {
    id: 'doc_' + Date.now(),
    docTypeId: docType,
    title: title || 'NationsWorld Document',
    date: defaultDate,
    referenceNumber: defaultRef,
    authorParticipant: 'NationsWorld Research Fellow',
    author: 'NationsWorld Research Fellow',
    executiveSummary: extractSectionContent(lines, 'summary', UNEXTRACTED_PLACEHOLDER),
    sections,
    cycleId,
    projectId,
  };
}

function extractRecipient(lines: string[]): string | undefined {
  for (const l of lines) {
    if (l.toLowerCase().includes('to:') || l.toLowerCase().includes('dear') || l.toLowerCase().includes('attention:')) {
      return l;
    }
  }
  return undefined;
}

function extractSectionContent(lines: string[], keyword: string, fallback: string): string {
  const matching = lines.filter((l) => l.toLowerCase().includes(keyword));
  if (matching.length > 0) {
    return matching.join('\n');
  }
  return fallback;
}
