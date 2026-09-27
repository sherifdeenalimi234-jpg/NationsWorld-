import type { DocumentTypeId } from '../types/production';

export function generateDocumentReference(documentType: DocumentTypeId): string {
  let prefix = 'DOC';

  if (documentType.includes('letter')) {
    prefix = 'LET';
  } else if (documentType.includes('report')) {
    prefix = 'RPT';
  } else if (documentType.includes('certificate')) {
    prefix = 'CRT';
  } else if (
    documentType === 'proposal' ||
    documentType === 'memo' ||
    documentType === 'notice' ||
    documentType === 'statement' ||
    documentType === 'meeting-document'
  ) {
    prefix = 'ORG';
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomCode = '';
  for (let i = 0; i < 4; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `NW-${prefix}-${dateStr}-${randomCode}`;
}
