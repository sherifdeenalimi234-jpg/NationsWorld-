import jsPDF from 'jspdf';
import {
  PDF_COLORS,
  drawPDFBorder,
  drawPDFWatermark,
  drawPDFHeader,
  drawPDFFooter,
} from './pdfSystem';
import { DEFAULT_DECLARATION_TEXT } from './projectRoomStorage';

export interface DeclarationPdfInput {
  fullName: string;
  contact: string;
  projectTitle: string;
  projectNumber: number;
  cycleId: string;
  acceptedAt: string;
  declarationText?: string;
}

export function sanitizeFileNamePart(text: string): string {
  const sanitized = text
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return sanitized || 'Participant';
}

export function formatProjectNumber(num: number): string {
  return `P${num < 10 ? `0${num}` : `${num}`}`;
}

export function generateDeclarationPDF(input: DeclarationPdfInput): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // 1. Watermark & Border
  drawPDFWatermark(doc);
  drawPDFBorder(doc);

  // 2. Header
  let yPos = drawPDFHeader(doc);

  // 3. Document Category / Banner
  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.setDrawColor(...PDF_COLORS.emerald);
  doc.setLineWidth(0.4);
  doc.rect(margin, yPos, contentWidth, 10, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('PROJECT ROOM • PARTICIPANT COMMITMENT', margin + 4, yPos + 6.5);

  yPos += 18;

  // 4. Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('PARTICIPANT PROJECT DECLARATION', margin, yPos);

  yPos += 7;

  // Gold Divider
  doc.setFillColor(...PDF_COLORS.gold);
  doc.rect(margin, yPos, 40, 1.2, 'F');

  yPos += 10;

  // 5. Metadata Box (Participant & Project Info)
  doc.setFillColor(...PDF_COLORS.warmWhite);
  doc.setDrawColor(...PDF_COLORS.borderGray);
  doc.setLineWidth(0.4);

  const formattedProjNum = formatProjectNumber(input.projectNumber);
  const formattedAcceptedDate = input.acceptedAt
    ? new Date(input.acceptedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const formattedGenDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const boxHeight = 52;
  doc.rect(margin, yPos, contentWidth, boxHeight, 'FD');

  // Left Emerald Accent Bar
  doc.setFillColor(...PDF_COLORS.forestGreen);
  doc.rect(margin, yPos, 3, boxHeight, 'F');

  let boxY = yPos + 8;
  const col1X = margin + 8;
  const val1X = margin + 45;
  const col2X = margin + 100;
  const val2X = margin + 135;

  const drawRow = (label1: string, val1: string, label2?: string, val2?: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...PDF_COLORS.mutedText);
    doc.text(label1.toUpperCase(), col1X, boxY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...PDF_COLORS.darkSlate);
    doc.text(val1 || 'N/A', val1X, boxY);

    if (label2 && val2) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...PDF_COLORS.mutedText);
      doc.text(label2.toUpperCase(), col2X, boxY);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...PDF_COLORS.darkSlate);
      doc.text(val2, val2X, boxY);
    }

    boxY += 8;
  };

  drawRow('Participant Name:', input.fullName, 'Document Type:', 'Participant Declaration');
  drawRow('Contact:', input.contact, 'Project Number:', formattedProjNum);
  drawRow('Assigned Project:', input.projectTitle, 'Project Cycle:', input.cycleId || '2026-OCTOBER');
  drawRow('Declaration Date:', formattedAcceptedDate, 'Status:', 'Confirmed');
  drawRow('Version:', '1', 'Generated:', formattedGenDate);

  yPos += boxHeight + 14;

  // 6. Declaration Content Section Header
  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.rect(margin, yPos, contentWidth, 7, 'F');
  doc.setFillColor(...PDF_COLORS.emerald);
  doc.rect(margin, yPos, 2, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('OFFICIAL DECLARATION STATEMENT', margin + 5, yPos + 5);

  yPos += 12;

  // Declaration Quote Box
  doc.setFillColor(243, 248, 245);
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.setLineWidth(0.4);

  const exactText = input.declarationText || DEFAULT_DECLARATION_TEXT;
  const splitText = doc.splitTextToSize(`"${exactText}"`, contentWidth - 12);
  const quoteBoxHeight = splitText.length * 6 + 12;

  doc.rect(margin, yPos, contentWidth, quoteBoxHeight, 'FD');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...PDF_COLORS.charcoal);
  doc.text(splitText, margin + 6, yPos + 8);

  yPos += quoteBoxHeight + 18;

  // 7. Electronic Signature / Acknowledgement Block
  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.setDrawColor(...PDF_COLORS.emerald);
  doc.setLineWidth(0.3);
  doc.rect(margin, yPos, contentWidth, 38, 'FD');

  let sigY = yPos + 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('ELECTRONIC ACKNOWLEDGEMENT & SIGNATURE', margin + 6, sigY);

  sigY += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.mutedText);
  doc.text('Participant:', margin + 6, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.darkSlate);
  doc.text(input.fullName, margin + 45, sigY);

  sigY += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.mutedText);
  doc.text('Digital Acknowledgement:', margin + 6, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.emerald);
  doc.text('Electronically acknowledged', margin + 45, sigY);

  sigY += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.mutedText);
  doc.text('Date Accepted:', margin + 6, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.darkSlate);
  doc.text(formattedAcceptedDate, margin + 45, sigY);

  yPos += 48;

  // 8. Institutional Seal
  const sealX = pageWidth / 2;
  const sealY = pageHeight - 42;

  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.setLineWidth(1.0);
  doc.circle(sealX, sealY, 13, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('NATIONSWORLD', sealX, sealY - 3, { align: 'center' });
  doc.text('DECLARATION', sealX, sealY + 1, { align: 'center' });
  doc.text('CONFIRMED', sealX, sealY + 5, { align: 'center' });

  // 9. Footer
  const refNo = `${formattedProjNum}-DECLARATION`;
  drawPDFFooter(doc, 1, 1, refNo);

  return doc;
}

export function downloadDeclarationPDF(input: DeclarationPdfInput): void {
  const doc = generateDeclarationPDF(input);
  const formattedNum = input.projectNumber < 10 ? `0${input.projectNumber}` : `${input.projectNumber}`;
  const cleanName = sanitizeFileNamePart(input.fullName || 'Participant');
  const fileName = `NationsWorld_Project_${formattedNum}_Declaration_${cleanName}.pdf`;
  doc.save(fileName);
}
