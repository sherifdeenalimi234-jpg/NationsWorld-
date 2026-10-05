import type {
  StructuredDocumentData,
  StudioValidationResult,
  ValidationIssue,
} from '../types/documentStudio';

export function validateDocumentStudio(
  data: StructuredDocumentData | null,
  isFileUploaded: boolean
): StudioValidationResult {
  const issues: ValidationIssue[] = [];

  if (!isFileUploaded) {
    issues.push({
      id: 'iss_file',
      severity: 'error',
      message: 'No document file uploaded or processed successfully.',
    });
  }

  if (!data) {
    return {
      status: 'REVIEW REQUIRED',
      isValid: false,
      issues,
    };
  }

  if (!data.docTypeId) {
    issues.push({
      id: 'iss_doctype',
      severity: 'error',
      message: 'Document type is not selected.',
    });
  }

  if (!data.title || data.title.includes('Information not detected')) {
    issues.push({
      id: 'iss_title',
      severity: 'warning',
      message: 'Document title is missing or unverified.',
      field: 'title',
    });
  }

  if (!data.referenceNumber) {
    issues.push({
      id: 'iss_ref',
      severity: 'warning',
      message: 'Reference number is missing.',
      field: 'referenceNumber',
    });
  }

  if (['official-letter', 'appointment-letter', 'invitation-letter'].includes(data.docTypeId)) {
    if (!data.recipient || data.recipient.includes('Information not detected')) {
      issues.push({
        id: 'iss_recipient',
        severity: 'warning',
        message: 'Recipient name is missing or flagged for review.',
        field: 'recipient',
      });
    }
  }

  if (data.sections && data.sections.length > 0) {
    data.sections.forEach((sec, idx) => {
      if (sec.required && (!sec.content || sec.content.includes('Information not detected'))) {
        issues.push({
          id: `iss_sec_${sec.id}`,
          severity: 'warning',
          message: `Required section "${sec.heading}" contains unverified or missing content.`,
          field: `section_${idx}`,
        });
      }
    });
  }

  const hasErrors = issues.some((i) => i.severity === 'error');
  const isValid = !hasErrors;

  return {
    status: isValid ? 'DOCUMENT READY' : 'REVIEW REQUIRED',
    isValid,
    issues,
  };
}
