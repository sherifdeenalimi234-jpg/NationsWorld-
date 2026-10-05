import jsPDF from 'jspdf';
import type { StructuredDocumentData } from '../types/documentStudio';
import {
  drawPDFHeader,
  drawPDFFooter,
  drawPDFWatermark,
  drawPDFTitle,
  drawPDFBorder,
} from './pdfSystem';

export function sanitizeFileName(raw: string): string {
  return raw
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 60);
}

export function generateStudioFileName(data: StructuredDocumentData): string {
  const cleanTitle = sanitizeFileName(data.title || 'Document');
  const typeStr = sanitizeFileName(data.docTypeId || 'Official');
  return `NationsWorld_${typeStr}_${cleanTitle}.pdf`;
}

export function generateStudioPDF(data: StructuredDocumentData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  const cfg = data.brandingConfig || {
    mode: 'brand-only',
    preserveOriginalLayout: true,
    applyWatermark: true,
    addHeader: true,
    addFooter: true,
    addPageNumbers: true,
  };

  // 1. Decorative border
  drawPDFBorder(doc);

  // 2. Watermark if enabled
  if (cfg.applyWatermark) {
    drawPDFWatermark(doc);
  }

  // 3. Official Header if enabled
  let currentY = 15;
  if (cfg.addHeader) {
    currentY = drawPDFHeader(doc);
  }

  // 4. Document Title
  currentY = drawPDFTitle(doc, data.title || 'NationsWorld Document', currentY);

  // 5. Render Author Content
  const rawTextToRender = data.originalRawContent || data.bodyText ||
    (data.sections && data.sections.map((s) => `${s.heading}\n${s.content}`).join('\n\n')) ||
    'Author document content.';

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81); // #374151

  const bodyLines = doc.splitTextToSize(rawTextToRender, contentWidth);
  bodyLines.forEach((line: string) => {
    if (currentY > pageHeight - 30) {
      doc.addPage();
      drawPDFBorder(doc);
      if (cfg.applyWatermark) drawPDFWatermark(doc);
      currentY = cfg.addHeader ? drawPDFHeader(doc) : 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);
    }
    doc.text(line, margin, currentY);
    currentY += 5;
  });

  // Footer across pages
  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    if (cfg.addFooter) {
      drawPDFFooter(doc, page, totalPages, data.referenceNumber);
    }
  }

  return doc;
}

export function downloadStudioPDF(data: StructuredDocumentData): void {
  const pdfDoc = generateStudioPDF(data);
  const fileName = generateStudioFileName(data);
  pdfDoc.save(fileName);
}
