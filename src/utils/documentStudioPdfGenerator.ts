import jsPDF from 'jspdf';
import type { StructuredDocumentData } from '../types/documentStudio';
import {
  drawPDFHeader,
  drawPDFFooter,
  drawPDFWatermark,
  drawPDFTitle,
  drawPDFSignature,
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

  // 1. Decorative border
  drawPDFBorder(doc);

  // 2. Subtle Watermark
  drawPDFWatermark(doc);

  // 3. Official Header
  let currentY = drawPDFHeader(doc);

  // 4. Title
  currentY = drawPDFTitle(doc, data.title || 'NationsWorld Document', currentY);

  // 5. Letter specific or standard structured content
  if (['official-letter', 'appointment-letter', 'invitation-letter'].includes(data.docTypeId)) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 59, 46); // #063B2E
    doc.text(`TO: ${data.recipient || data.recipientName || 'Valued Recipient'}`, margin, currentY);
    currentY += 6;

    if (data.subject) {
      doc.text(`SUBJECT: ${data.subject.toUpperCase()}`, margin, currentY);
      currentY += 8;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);

    const bodyLines = doc.splitTextToSize(data.bodyText || '', contentWidth);
    bodyLines.forEach((line: string) => {
      if (currentY > pageHeight - 35) {
        doc.addPage();
        drawPDFBorder(doc);
        drawPDFWatermark(doc);
        currentY = drawPDFHeader(doc);
      }
      doc.text(line, margin, currentY);
      currentY += 5;
    });

    currentY += 10;
    if (data.closing) {
      doc.text(data.closing, margin, currentY);
      currentY += 6;
    }

    drawPDFSignature(doc, {
      name: data.signatureBlock || 'Secretariat Directorate',
      position: 'NationsWorld Representative',
      organization: 'NationsWorld of Visionary Advancement',
      yPos: currentY,
      pageHeight,
      margin,
    });
  } else {
    // Report or structured document
    data.sections.forEach((sec) => {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        drawPDFBorder(doc);
        drawPDFWatermark(doc);
        currentY = drawPDFHeader(doc);
      }

      // Section Heading
      const secHeading = sec.heading || sec.title || 'Section';
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(6, 59, 46);
      doc.text(secHeading.toUpperCase(), margin, currentY);
      currentY += 6;

      // Section Content
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(55, 65, 81);

      const lines = doc.splitTextToSize(sec.content || '', contentWidth);
      lines.forEach((line: string) => {
        if (currentY > pageHeight - 30) {
          doc.addPage();
          drawPDFBorder(doc);
          drawPDFWatermark(doc);
          currentY = drawPDFHeader(doc);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(55, 65, 81);
        }
        doc.text(line, margin, currentY);
        currentY += 4.5;
      });

      currentY += 8;
    });
  }

  // Footer for all pages
  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    drawPDFFooter(doc, page, totalPages, data.referenceNumber);
  }

  return doc;
}

export function downloadStudioPDF(data: StructuredDocumentData): void {
  const pdfDoc = generateStudioPDF(data);
  const fileName = generateStudioFileName(data);
  pdfDoc.save(fileName);
}
