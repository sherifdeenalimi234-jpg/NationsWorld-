import jsPDF from 'jspdf';
import type { ProjectProductionSettings } from '../types/projectProduction';
import type { CitationItem, LiteratureMatrixItem, DataLabState } from '../types/toolkit';
import {
  PDF_COLORS,
  drawPDFBorder,
  drawPDFWatermark,
  drawPDFHeader,
  drawPDFMetadata,
  drawPDFSectionHeader,
  drawPDFFooter,
} from './pdfSystem';

export interface ProjectPdfInput {
  settings: ProjectProductionSettings;
  projectTitle: string;
  projectNumber: string;
  sections: Array<{ id: string; title: string; content: string }>;
  citations: CitationItem[];
  literatureMatrix: LiteratureMatrixItem[];
  dataLab?: DataLabState;
}

export function generateProjectPDF(input: ProjectPdfInput): jsPDF {
  const { settings, projectTitle, projectNumber, sections, citations, literatureMatrix, dataLab } = input;

  const isLandscape = settings.orientation === 'landscape';
  const doc = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: settings.pageSize.toLowerCase() === 'letter' ? 'letter' : 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  if (settings.watermark) drawPDFWatermark(doc, isLandscape);
  drawPDFBorder(doc);
  drawPDFHeader(doc);

  let yPos = 45;

  // Document Type & Category Tag
  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.setDrawColor(...PDF_COLORS.emerald);
  doc.setLineWidth(0.4);
  doc.rect(margin, yPos, contentWidth, 10, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(
    `${(settings.projectCategory || 'GENERAL RESEARCH').toUpperCase()} • ${(settings.documentType || 'RESEARCH REPORT').toUpperCase()}`,
    margin + 4,
    yPos + 6.5
  );

  yPos += 18;

  // Cover Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...PDF_COLORS.forestGreen);

  const cleanTitle = projectTitle || settings.documentTitle || 'NationsWorld Research Project';
  const splitTitle = doc.splitTextToSize(cleanTitle.toUpperCase(), contentWidth - 4);
  doc.text(splitTitle, margin, yPos);

  yPos += splitTitle.length * 9 + 8;

  // Gold Divider
  doc.setFillColor(...PDF_COLORS.gold);
  doc.rect(margin, yPos, 45, 1.5, 'F');
  yPos += 12;

  // Project Information Box
  doc.setFillColor(...PDF_COLORS.warmWhite);
  doc.setDrawColor(...PDF_COLORS.borderGray);
  doc.setLineWidth(0.4);

  const boxHeight = 60;
  doc.rect(margin, yPos, contentWidth, boxHeight, 'FD');

  // Left Emerald accent border
  doc.setFillColor(...PDF_COLORS.forestGreen);
  doc.rect(margin, yPos, 3, boxHeight, 'F');

  let boxY = yPos + 10;
  const labelX = margin + 8;
  const valX = margin + 55;

  const drawCoverMetaRow = (label: string, val: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...PDF_COLORS.mutedText);
    doc.text(label.toUpperCase(), labelX, boxY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...PDF_COLORS.darkSlate);
    doc.text(val || 'N/A', valX, boxY);
    boxY += 10;
  };

  drawCoverMetaRow('Project Number:', `PROJECT ${projectNumber || settings.projectNumber || 'P01'}`);
  drawCoverMetaRow('Author / Fellow:', settings.participantName || 'NationsWorld Fellow');
  drawCoverMetaRow('Institution:', settings.organization || 'NationsWorld of Visionary Advancement');
  drawCoverMetaRow('Production Date:', settings.date || new Date().toLocaleDateString('en-GB'));
  drawCoverMetaRow('Document Ref:', settings.referenceNumber || `NW-${projectNumber}`);

  yPos += boxHeight + 20;

  // Official Institutional Seal
  const sealX = pageWidth / 2;
  const sealY = pageHeight - 45;

  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.setLineWidth(1.0);
  doc.circle(sealX, sealY, 15, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('NATIONSWORLD', sealX, sealY - 3, { align: 'center' });
  doc.text('OFFICIAL', sealX, sealY + 1, { align: 'center' });
  doc.text('PRODUCTION', sealX, sealY + 5, { align: 'center' });

  // Draw Footer for Cover
  if (settings.pageNumbers) {
    drawPDFFooter(doc, 1, 1, settings.referenceNumber);
  }

  // ==========================================
  // PAGE 2: TABLE OF CONTENTS (IF ENABLED)
  // ==========================================
  if (settings.tableOfContents) {
    doc.addPage();
    if (settings.watermark) drawPDFWatermark(doc, isLandscape);
    drawPDFBorder(doc);
    let tocY = drawPDFHeader(doc);

    tocY = drawPDFMetadata(doc, {
      docType: 'TABLE OF CONTENTS',
      refNo: settings.referenceNumber,
      date: settings.date,
      yPos: tocY,
    });

    tocY = drawPDFSectionHeader(doc, 'TABLE OF CONTENTS', tocY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);

    let secIndex = 1;

    sections.forEach((sec) => {
      if (tocY > pageHeight - 30) {
        doc.addPage();
        if (settings.watermark) drawPDFWatermark(doc, isLandscape);
        drawPDFBorder(doc);
        tocY = margin + 12;
      }

      const secTitle = `${secIndex}. ${sec.title}`;
      doc.setTextColor(...PDF_COLORS.forestGreen);
      doc.text(secTitle, margin + 4, tocY);

      // Dotted leader lines
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...PDF_COLORS.mutedText);
      const dotsXStart = margin + 8 + doc.getTextWidth(secTitle);
      const dotsXEnd = pageWidth - margin - 15;

      if (dotsXEnd > dotsXStart + 10) {
        let dots = '';
        for (let i = 0; i < Math.floor((dotsXEnd - dotsXStart) / 2.5); i++) {
          dots += '.';
        }
        doc.text(dots, dotsXStart + 2, tocY);
      }

      secIndex++;
      tocY += 8;
    });

    if (settings.includeLiteratureNotes && literatureMatrix.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...PDF_COLORS.forestGreen);
      doc.text(`${secIndex}. Research & Literature Review Matrix`, margin + 4, tocY);
      secIndex++;
      tocY += 8;
    }

    if (dataLab && dataLab.rows && dataLab.rows.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...PDF_COLORS.forestGreen);
      doc.text(`${secIndex}. Quantitative Data Analysis`, margin + 4, tocY);
      secIndex++;
      tocY += 8;
    }

    if (citations.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...PDF_COLORS.forestGreen);
      doc.text(`${secIndex}. References & Bibliography`, margin + 4, tocY);
      tocY += 8;
    }
  }

  // ==========================================
  // DOCUMENT BODY SECTIONS
  // ==========================================
  let sectionNumber = 1;

  sections.forEach((sec) => {
    doc.addPage();
    if (settings.watermark) drawPDFWatermark(doc, isLandscape);
    drawPDFBorder(doc);
    let secY = drawPDFHeader(doc);

    secY = drawPDFSectionHeader(doc, `SECTION ${sectionNumber}: ${sec.title}`, secY);
    sectionNumber++;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...PDF_COLORS.charcoal);

    // Strip HTML tags & sanitize paragraphs
    const rawText = (sec.content || '').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<[^>]*>/g, '');
    const paragraphs = rawText.split('\n');

    if (!rawText.trim()) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(...PDF_COLORS.mutedText);
      doc.text('[Section content pending completion]', margin + 4, secY + 4);
    } else {
      paragraphs.forEach((p) => {
        const cleanP = p.trim();
        if (!cleanP) {
          secY += 3;
          return;
        }

        const isHeading = cleanP.startsWith('#') || cleanP.startsWith('###');
        const formattedP = cleanP.replace(/^#+\s*/, '');

        if (isHeading) {
          if (secY > pageHeight - 30) {
            doc.addPage();
            if (settings.watermark) drawPDFWatermark(doc, isLandscape);
            drawPDFBorder(doc);
            secY = margin + 12;
          }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10.5);
          doc.setTextColor(...PDF_COLORS.forestGreen);
          doc.text(formattedP, margin + 2, secY);
          secY += 6;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(...PDF_COLORS.charcoal);
          return;
        }

        const splitP = doc.splitTextToSize(formattedP, contentWidth - 4);
        for (let i = 0; i < splitP.length; i++) {
          if (secY > pageHeight - 25) {
            doc.addPage();
            if (settings.watermark) drawPDFWatermark(doc, isLandscape);
            drawPDFBorder(doc);
            secY = margin + 12;
          }
          doc.text(splitP[i], margin + 2, secY);
          secY += 5;
        }
        secY += 3;
      });
    }
  });

  // ==========================================
  // OPTIONAL: LITERATURE REVIEW MATRIX INCLUSION
  // ==========================================
  if (settings.includeLiteratureNotes && literatureMatrix.length > 0) {
    doc.addPage();
    if (settings.watermark) drawPDFWatermark(doc, isLandscape);
    drawPDFBorder(doc);
    let litY = drawPDFHeader(doc);

    litY = drawPDFSectionHeader(doc, 'RESEARCH EVIDENCE & LITERATURE REVIEW MATRIX', litY);

    literatureMatrix.forEach((item, idx) => {
      if (litY > pageHeight - 40) {
        doc.addPage();
        if (settings.watermark) drawPDFWatermark(doc, isLandscape);
        drawPDFBorder(doc);
        litY = margin + 12;
      }

      doc.setFillColor(...PDF_COLORS.softGreen);
      doc.rect(margin, litY, contentWidth, 6, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...PDF_COLORS.forestGreen);
      doc.text(`SOURCE ${idx + 1}: ${item.author} (${item.year}) — ${item.title}`, margin + 3, litY + 4.5);

      litY += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...PDF_COLORS.charcoal);

      const text = `Key Findings: ${item.keyFindings || 'N/A'}\nRelevance: ${item.relevance || 'N/A'}`;
      const splitText = doc.splitTextToSize(text, contentWidth - 6);

      for (let i = 0; i < splitText.length; i++) {
        if (litY > pageHeight - 25) {
          doc.addPage();
          if (settings.watermark) drawPDFWatermark(doc, isLandscape);
          drawPDFBorder(doc);
          litY = margin + 12;
        }
        doc.text(splitText[i], margin + 3, litY);
        litY += 4.5;
      }
      litY += 6;
    });
  }

  // ==========================================
  // OPTIONAL: DATA LAB SUMMARY INCLUSION
  // ==========================================
  if (dataLab && dataLab.rows && dataLab.rows.length > 0) {
    doc.addPage();
    if (settings.watermark) drawPDFWatermark(doc, isLandscape);
    drawPDFBorder(doc);
    let dataY = drawPDFHeader(doc);

    dataY = drawPDFSectionHeader(doc, `DATA LAB ANALYSIS: ${dataLab.datasetName || 'Project Dataset'}`, dataY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...PDF_COLORS.darkSlate);
    doc.text(`Dataset Summary (${dataLab.rows.length} Data Points Analyzed)`, margin + 2, dataY);
    dataY += 6;

    // Table Header
    doc.setFillColor(...PDF_COLORS.forestGreen);
    doc.rect(margin, dataY, contentWidth, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);

    const headers = dataLab.headers || ['Category', 'Value'];
    const colWidth = contentWidth / Math.min(headers.length, 4);

    headers.slice(0, 4).forEach((h, idx) => {
      doc.text(h.toUpperCase(), margin + idx * colWidth + 3, dataY + 5);
    });

    dataY += 9;

    // Table Rows
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...PDF_COLORS.charcoal);

    dataLab.rows.slice(0, 15).forEach((row, rowIdx) => {
      if (dataY > pageHeight - 25) {
        doc.addPage();
        if (settings.watermark) drawPDFWatermark(doc, isLandscape);
        drawPDFBorder(doc);
        dataY = margin + 12;
      }

      if (rowIdx % 2 === 0) {
        doc.setFillColor(245, 248, 246);
        doc.rect(margin, dataY - 1, contentWidth, 5.5, 'F');
      }

      headers.slice(0, 4).forEach((h, colIdx) => {
        const val = String(row[h] ?? '');
        doc.text(val, margin + colIdx * colWidth + 3, dataY + 3.5);
      });

      dataY += 6;
    });

    dataY += 6;
  }

  // ==========================================
  // REFERENCES SECTION
  // ==========================================
  if (citations && citations.length > 0) {
    doc.addPage();
    if (settings.watermark) drawPDFWatermark(doc, isLandscape);
    drawPDFBorder(doc);
    let refY = drawPDFHeader(doc);

    refY = drawPDFSectionHeader(doc, `REFERENCES (${settings.citationStyle || 'APA 7'})`, refY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...PDF_COLORS.charcoal);

    citations.forEach((c, idx) => {
      if (refY > pageHeight - 30) {
        doc.addPage();
        if (settings.watermark) drawPDFWatermark(doc, isLandscape);
        drawPDFBorder(doc);
        refY = margin + 12;
      }

      const formattedCitation = formatCitationString(c, settings.citationStyle);
      const splitRef = doc.splitTextToSize(`${idx + 1}. ${formattedCitation}`, contentWidth - 4);

      for (let i = 0; i < splitRef.length; i++) {
        if (refY > pageHeight - 25) {
          doc.addPage();
          if (settings.watermark) drawPDFWatermark(doc, isLandscape);
          drawPDFBorder(doc);
          refY = margin + 12;
        }
        doc.text(splitRef[i], margin + 2, refY);
        refY += 4.8;
      }
      refY += 3;
    });
  }

  // Update total pages in footers across all generated pages
  if (settings.pageNumbers) {
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      drawPDFFooter(doc, i, totalPages, settings.referenceNumber);
    }
  }

  return doc;
}

export function downloadProjectPDF(input: ProjectPdfInput): void {
  const doc = generateProjectPDF(input);
  const cleanTitle = (input.projectTitle || input.settings.documentTitle || 'Project').replace(/[^a-zA-Z0-9_-]/g, '_');
  const cleanName = (input.settings.participantName || 'Fellow').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `NationsWorld_Project_${input.projectNumber}_${cleanName}_${cleanTitle}.pdf`;
  doc.save(fileName);
}

function formatCitationString(c: CitationItem, style: string): string {
  if (c.formattedCitation) return c.formattedCitation;

  const author = c.author ? c.author.trim() : 'Unknown Author';
  const year = c.year ? `(${c.year})` : '(n.d.)';
  const title = c.title ? c.title.trim() : 'Untitled Work';
  const pub = c.publisherJournal ? `${c.publisherJournal}.` : '';

  if (style === 'MLA 9') {
    return `${author}. "${title}." ${pub} ${c.year || ''}.`;
  }

  if (style === 'Chicago') {
    return `${author}. "${title}." ${pub} ${c.year || ''}.`;
  }

  // Default APA 7
  return `${author} ${year}. ${title}. ${pub}`;
}
