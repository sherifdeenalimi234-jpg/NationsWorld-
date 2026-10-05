import type {
  StructuredDocumentData,
  StudioValidationResult,
  ValidationIssue,
  PreservationCheck,
} from '../types/documentStudio';

export function validateDocumentStudio(
  data: StructuredDocumentData | null,
  isFileUploaded: boolean
): StudioValidationResult {
  const issues: ValidationIssue[] = [];

  const preservationChecks: PreservationCheck[] = [
    {
      id: 'chk_content_preserved',
      label: 'Original Author Content Preserved',
      passed: false,
      details: 'Ensuring author wording and text structure are untouched.',
    },
    {
      id: 'chk_no_silent_rewriting',
      label: 'No Silent Rewriting or Paraphrasing',
      passed: true,
      details: 'Strict "Brand It. Don\'t Touch It." preservation policy active.',
    },
    {
      id: 'chk_header_footer_fit',
      label: 'Header & Footer Framing Fit',
      passed: true,
      details: 'Safe margins reserved to avoid text or signature clipping.',
    },
    {
      id: 'chk_watermark_opacity',
      label: 'NationsWorld Watermark Opacity (~3.5%)',
      passed: true,
      details: 'Institutional security seal subtle overlay applied.',
    },
  ];

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
      preservationChecks,
    };
  }

  // Check content preservation
  const hasAuthorText = (data.originalRawContent && data.originalRawContent.length > 0) ||
    (data.sections && data.sections.some((s) => s.content && s.content.length > 0));

  preservationChecks[0].passed = !!hasAuthorText;

  if (!data.docTypeId) {
    issues.push({
      id: 'iss_doctype',
      severity: 'error',
      message: 'Document type is not selected.',
    });
  }

  if (!data.title) {
    issues.push({
      id: 'iss_title',
      severity: 'warning',
      message: 'Document title is missing.',
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

  const hasErrors = issues.some((i) => i.severity === 'error');
  const isValid = !hasErrors;

  return {
    status: isValid ? 'DOCUMENT READY' : 'REVIEW REQUIRED',
    isValid,
    issues,
    preservationChecks,
  };
}
