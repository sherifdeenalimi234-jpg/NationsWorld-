import jsPDF from 'jspdf';

export interface PDFColorPalette {
  forestGreen: [number, number, number];
  deepEmerald: [number, number, number];
  emerald: [number, number, number];
  mint: [number, number, number];
  gold: [number, number, number];
  warmWhite: [number, number, number];
  softGreen: [number, number, number];
  charcoal: [number, number, number];
  darkSlate: [number, number, number];
  mutedText: [number, number, number];
  borderGray: [number, number, number];
}

export const PDF_COLORS: PDFColorPalette = {
  forestGreen: [6, 59, 46],      // #063B2E
  deepEmerald: [11, 61, 46],     // #0B3D2E
  emerald: [18, 168, 117],       // #12A875
  mint: [141, 224, 190],         // #8DE0BE
  gold: [214, 181, 109],         // #D6B56D
  warmWhite: [250, 250, 248],    // #FAFAF8
  softGreen: [234, 247, 239],    // #EAF7EF
  charcoal: [55, 65, 81],        // #374151
  darkSlate: [30, 41, 59],       // #1E293B
  mutedText: [100, 116, 139],    // #64748B
  borderGray: [226, 232, 240],   // #E2E8F0
};

/**
 * Draw a subtle professional page border with gold corner accents
 */
export function drawPDFBorder(doc: jsPDF): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const inset = 6;

  // Thin outer emerald border
  doc.setDrawColor(...PDF_COLORS.emerald);
  doc.setLineWidth(0.3);
  doc.rect(inset, inset, pageWidth - inset * 2, pageHeight - inset * 2);

  // Small gold corner accents
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.setLineWidth(0.6);
  const arm = 6;

  // Top-Left
  doc.line(inset, inset, inset + arm, inset);
  doc.line(inset, inset, inset, inset + arm);

  // Top-Right
  doc.line(pageWidth - inset, inset, pageWidth - inset - arm, inset);
  doc.line(pageWidth - inset, inset, pageWidth - inset, inset + arm);

  // Bottom-Left
  doc.line(inset, pageHeight - inset, inset + arm, pageHeight - inset);
  doc.line(inset, pageHeight - inset, inset, pageHeight - inset - arm);

  // Bottom-Right
  doc.line(pageWidth - inset, pageHeight - inset, pageWidth - inset - arm, pageHeight - inset);
  doc.line(pageWidth - inset, pageHeight - inset, pageWidth - inset, pageHeight - inset - arm);
}

/**
 * Draw a subtle background watermark logo and brand title (opacity ~6%)
 */
export function drawPDFWatermark(doc: jsPDF, isLandscape = false): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;
  const centerY = pageHeight / 2;

  // Extremely subtle security watermark opacity (approx 3.5%)
  try {
    if ((doc as any).GState) {
      const gs = new (doc as any).GState({ opacity: 0.035 });
      doc.setGState(gs);
    }
  } catch {
    // fallback
  }

  // Very light, desaturated green/sage for subtle security-like watermark
  const desaturatedStroke: [number, number, number] = [180, 205, 195];
  const desaturatedFill: [number, number, number] = [245, 249, 246];
  const desaturatedText: [number, number, number] = [130, 155, 145];

  // Faint, extremely thin circle security emblem
  doc.setDrawColor(...desaturatedStroke);
  doc.setFillColor(...desaturatedFill);
  doc.setLineWidth(0.2);
  doc.circle(centerX, centerY, isLandscape ? 38 : 48, 'FD');
  doc.circle(centerX, centerY, isLandscape ? 30 : 38, 'S');

  // Unobtrusive diagonal brand watermark text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(isLandscape ? 18 : 22);
  doc.setTextColor(...desaturatedText);
  doc.text('NATIONSWORLD OF VISIONARY ADVANCEMENT', centerX, centerY - 2, {
    align: 'center',
    angle: isLandscape ? 15 : 30,
  });

  doc.setFontSize(isLandscape ? 10 : 11);
  doc.text('OFFICIAL INSTITUTIONAL DOCUMENT', centerX, centerY + 8, {
    align: 'center',
    angle: isLandscape ? 15 : 30,
  });

  // Reset opacity state
  try {
    if ((doc as any).GState) {
      const gsReset = new (doc as any).GState({ opacity: 1.0 });
      doc.setGState(gsReset);
    }
  } catch {
    // fallback
  }

  doc.setTextColor(...PDF_COLORS.charcoal);
}

/**
 * Draw reusable Header bar with NationsWorld identity and gold divider
 */
export function drawPDFHeader(doc: jsPDF): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  // Header background bar in Forest Green
  doc.setFillColor(...PDF_COLORS.forestGreen);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gold emblem box on top left
  doc.setFillColor(...PDF_COLORS.gold);
  doc.rect(margin, 6, 8, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('NW', margin + 4, 11.5, { align: 'center' });

  // Organization Main Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('NATIONSWORLD OF VISIONARY ADVANCEMENT', margin + 11, 11.5);

  // Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...PDF_COLORS.mint);
  doc.text('RESEARCH • INNOVATION • DEVELOPMENT • LEADERSHIP • PRODUCTION', margin + 11, 17);

  // Website & Office subtitle right aligned
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(240, 240, 240);
  doc.text('Official Secretariat Document • www.nationsworld.org', pageWidth - margin, 22, { align: 'right' });

  // Gold accent divider line
  doc.setFillColor(...PDF_COLORS.gold);
  doc.rect(0, 28, pageWidth, 1.2, 'F');

  return 36;
}

/**
 * Draw metadata container box
 */
export function drawPDFMetadata(
  doc: jsPDF,
  options: {
    docType: string;
    refNo: string;
    date: string;
    recipient?: string;
    recipientPosition?: string;
    organization?: string;
    status?: string;
    yPos: number;
  }
): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = options.yPos;

  // Soft green background box
  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.setDrawColor(...PDF_COLORS.emerald);
  doc.setLineWidth(0.3);

  const boxHeight = options.recipient ? 28 : 22;
  doc.rect(margin, y, contentWidth, boxHeight, 'FD');

  // Emerald left accent bar
  doc.setFillColor(...PDF_COLORS.emerald);
  doc.rect(margin, y, 2.5, boxHeight, 'F');

  // Document Type Header inside box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(options.docType.toUpperCase(), margin + 6, y + 6);

  // Right Aligned Ref No & Date
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(`Ref No: ${options.refNo}`, pageWidth - margin - 4, y + 6, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...PDF_COLORS.mutedText);
  doc.text(`Date: ${options.date}`, pageWidth - margin - 4, y + 11, { align: 'right' });

  if (options.status) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PDF_COLORS.forestGreen);
    doc.text(`Status: ${options.status}`, margin + 6, y + 12);
  }

  if (options.recipient) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...PDF_COLORS.darkSlate);
    const recText = `TO: ${options.recipient}${options.recipientPosition ? ' (' + options.recipientPosition + ')' : ''}${options.organization ? ' - ' + options.organization : ''}`;
    const splitRec = doc.splitTextToSize(recText, contentWidth - 12);
    doc.text(splitRec, margin + 6, y + 18);
  }

  return y + boxHeight + 8;
}

/**
 * Draw prominent Subject Line / Document Title
 */
export function drawPDFTitle(doc: jsPDF, title: string, yPos: number): number {
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  // Title Box
  doc.setFillColor(243, 248, 245);
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.setLineWidth(0.4);

  const splitTitle = doc.splitTextToSize(title.toUpperCase(), contentWidth - 8);
  const h = splitTitle.length * 5 + 6;

  doc.rect(margin, yPos, contentWidth, h, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(splitTitle, margin + 4, yPos + 5.5);

  return yPos + h + 8;
}

/**
 * Draw Section Header with soft green background and emerald left border
 */
export function drawPDFSectionHeader(doc: jsPDF, title: string, yPos: number): number {
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.rect(margin, yPos, contentWidth, 7, 'F');

  doc.setFillColor(...PDF_COLORS.emerald);
  doc.rect(margin, yPos, 2, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(title.toUpperCase(), margin + 5, yPos + 5);

  return yPos + 10;
}

/**
 * Draw Signature Section
 */
export function drawPDFSignature(
  doc: jsPDF,
  options: {
    name: string;
    position: string;
    organization?: string;
    signatureImage?: string;
    yPos: number;
    pageHeight: number;
    margin: number;
  }
): number {
  let y = options.yPos;
  const margin = options.margin;

  if (y > options.pageHeight - 45) {
    doc.addPage();
    y = margin + 12;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.charcoal);
  doc.text('Yours faithfully,', margin, y);
  y += 6;

  if (options.signatureImage) {
    try {
      doc.addImage(options.signatureImage, 'PNG', margin, y, 35, 14);
      y += 16;
    } catch (e) {
      y += 10;
    }
  } else {
    y += 10;
  }

  doc.setDrawColor(...PDF_COLORS.emerald);
  doc.setLineWidth(0.4);
  doc.line(margin, y, margin + 55, y);
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(options.name || 'NationsWorld Official', margin, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.mutedText);
  doc.text(options.position || 'NationsWorld Representative', margin, y);
  if (options.organization) {
    y += 4;
    doc.text(options.organization, margin, y);
  }

  return y + 8;
}

/**
 * Draw consistent footer across pages
 */
export function drawPDFFooter(
  doc: jsPDF,
  pageNum: number,
  totalPages: number,
  refNo: string
): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  doc.setPage(pageNum);

  // Thin top divider line in Gold/Emerald
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.setLineWidth(0.4);
  doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...PDF_COLORS.mutedText);

  // Left side brand & ref
  doc.text(
    `NationsWorld of Visionary Advancement | Ref: ${refNo || 'N/A'} | Official Document`,
    margin,
    pageHeight - 8
  );

  // Right side page number
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(
    `Page ${pageNum} of ${totalPages}`,
    pageWidth - margin,
    pageHeight - 8,
    { align: 'right' }
  );
}
