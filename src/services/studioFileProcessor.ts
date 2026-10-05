import type {
  DocumentTypeId,
  StructuredDocumentData,
  DocumentSection,
  UploadedFileInfo,
  BrandingConfig,
} from '../types/documentStudio';

export const UNEXTRACTED_PLACEHOLDER = 'Information not detected — please review.';

export const processUploadedFile = extractTextFromFile;

/**
 * Checks if raw text contains existing NationsWorld institutional branding elements.
 */
export function detectExistingNationsWorldBranding(text: string): boolean {
  if (!text) return false;
  const upper = text.toUpperCase();
  return (
    upper.includes('NATIONSWORLD') ||
    upper.includes('VISIONARY ADVANCEMENT') ||
    upper.includes('NWA-202')
  );
}

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
    hasExistingNationsWorldBranding: false,
  };

  try {
    let extractedText = '';

    if (extension === 'pdf') {
      const arrayBuffer = await file.arrayBuffer();
      extractedText = extractPDFTextFromBuffer(arrayBuffer);
    } else if (extension === 'docx') {
      const arrayBuffer = await file.arrayBuffer();
      extractedText = extractDocxTextFromBuffer(arrayBuffer);
    } else if (['txt', 'md', 'json', 'csv'].includes(extension)) {
      extractedText = await file.text();
    } else {
      return {
        ...initialInfo,
        status: 'unsupported',
        errorMessage: `The file format .${extension} is not supported. Please upload a PDF, DOCX, TXT, or MD document.`,
      };
    }

    const trimmed = extractedText.trim();
    const estPages = Math.max(1, Math.ceil(trimmed.length / 2200));
    const hasBranding = detectExistingNationsWorldBranding(trimmed);

    return {
      ...initialInfo,
      status: 'ready',
      pagesEstimate: estPages,
      pagesCount: estPages,
      rawContent: trimmed || UNEXTRACTED_PLACEHOLDER,
      hasExistingNationsWorldBranding: hasBranding,
    };
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
 * Preservation-First Document Structuring Engine
 * Retains exact author wording as source of truth. Does NOT rewrite or summarize author content.
 */
export function buildStructuredDocument(
  rawText: string,
  docType: DocumentTypeId,
  cycleId?: string,
  projectId?: string,
  existingConfig?: Partial<BrandingConfig>
): StructuredDocumentData {
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);

  const dateMatch = rawText.match(/\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|[A-Z][a-z]+\s+\d{1,2},\s+\d{4})\b/);
  const refMatch = rawText.match(/\b(NWA|REF|NOVA)[-/\w\d]+\b/i);

  const defaultRef = refMatch ? refMatch[0] : `NWA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const defaultDate = dateMatch ? dateMatch[0] : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  let title = lines[0] || 'NationsWorld Branded Document';
  if (title.length > 90) {
    title = title.substring(0, 90) + '...';
  }

  const hasBranding = detectExistingNationsWorldBranding(rawText);

  const defaultConfig: BrandingConfig = {
    mode: 'brand-only',
    preserveOriginalLayout: true,
    applyWatermark: true,
    addHeader: !hasBranding,
    addFooter: !hasBranding,
    addPageNumbers: true,
    detectedExistingBranding: hasBranding,
    existingBrandingChoice: hasBranding ? 'keep-existing' : 'apply-new',
    ...existingConfig,
  };

  // Build section preserving author text as single or structured blocks
  const sections: DocumentSection[] = [
    {
      id: 'sec_author_content',
      heading: 'Author Document Content',
      content: rawText,
      type: 'text',
      required: true,
    },
  ];

  return {
    id: 'doc_' + Date.now(),
    docTypeId: docType,
    title,
    date: defaultDate,
    referenceNumber: defaultRef,
    recipient: extractRecipient(lines) || '',
    recipientName: extractRecipient(lines) || '',
    author: 'Document Author',
    salutation: 'Dear Distinguished Reader,',
    subject: title,
    bodyText: rawText,
    originalRawContent: rawText,
    sections,
    brandingConfig: defaultConfig,
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
