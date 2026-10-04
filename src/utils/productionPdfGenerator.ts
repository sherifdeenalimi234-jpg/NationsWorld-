import jsPDF from 'jspdf';
import type {
  DocumentDraft,
  LetterFormData,
  ReportFormData,
  OrganizationalFormData,
  CertificateFormData,
} from '../types/production';
import {
  PDF_COLORS,
  drawPDFBorder,
  drawPDFWatermark,
  drawPDFHeader,
  drawPDFMetadata,
  drawPDFTitle,
  drawPDFSectionHeader,
  drawPDFSignature,
  drawPDFFooter,
} from './pdfSystem';

export function generateProductionPDF(draft: DocumentDraft): jsPDF {
  const isCertificate = draft.category === 'certificates';

  const doc = new jsPDF({
    orientation: isCertificate ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  if (isCertificate) {
    renderCertificatePDF(doc, draft);
  } else if (draft.category === 'letters') {
    renderLetterPDF(doc, draft);
  } else if (draft.category === 'reports') {
    renderReportPDF(doc, draft);
  } else {
    renderOrganizationalPDF(doc, draft);
  }

  return doc;
}

export function downloadProductionPDF(draft: DocumentDraft): void {
  const doc = generateProductionPDF(draft);
  const cleanTitle = draft.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `NationsWorld_${cleanTitle}_${draft.referenceNumber}.pdf`;
  doc.save(fileName);
}

function renderLetterPDF(doc: jsPDF, draft: DocumentDraft): void {
  const data = draft.formData as LetterFormData;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  drawPDFWatermark(doc);
  drawPDFBorder(doc);
  let yPos = drawPDFHeader(doc);

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Metadata Block
  yPos = drawPDFMetadata(doc, {
    docType: 'OFFICIAL COMMUNIQUÉ',
    refNo: draft.referenceNumber,
    date: formattedDate,
    recipient: data.recipientName || 'Recipient Name',
    recipientPosition: data.recipientPosition,
    organization: data.organization,
    yPos: yPos,
  });

  // Subject / Title Line
  if (data.subject) {
    yPos = drawPDFTitle(doc, `SUBJECT: ${data.subject}`, yPos);
  }

  // Content Paragraphs
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.charcoal);

  const paragraphs = (data.content || '').split('\n');
  paragraphs.forEach((p) => {
    if (!p.trim()) {
      yPos += 4;
      return;
    }

    // Support simple Markdown formatting
    const isHeading = p.trim().startsWith('###');
    const isBullet = p.trim().startsWith('•') || p.trim().startsWith('-');
    const cleanText = p.replace(/^###\s*/, '').replace(/^[•-]\s*/, '');

    if (isHeading) {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        drawPDFWatermark(doc);
        drawPDFBorder(doc);
        yPos = margin + 10;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...PDF_COLORS.forestGreen);
      doc.text(cleanText, margin, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...PDF_COLORS.charcoal);
      return;
    }

    const indent = isBullet ? margin + 4 : margin;
    const bulletPrefix = isBullet ? '• ' : '';
    const splitP = doc.splitTextToSize(bulletPrefix + cleanText, contentWidth - (isBullet ? 4 : 0));

    for (let i = 0; i < splitP.length; i++) {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        drawPDFWatermark(doc);
        drawPDFBorder(doc);
        yPos = margin + 10;
      }
      doc.text(splitP[i], indent, yPos);
      yPos += 5;
    }
    yPos += 3;
  });

  yPos += 6;

  // Signature Block
  drawPDFSignature(doc, {
    name: data.preparedBy || 'NationsWorld Representative',
    position: data.position || 'Secretariat Representative',
    signatureImage: data.signatureImage,
    yPos: yPos,
    pageHeight: pageHeight,
    margin: margin,
  });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawPDFFooter(doc, i, totalPages, draft.referenceNumber);
  }
}

function renderReportPDF(doc: jsPDF, draft: DocumentDraft): void {
  const data = draft.formData as ReportFormData;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  drawPDFWatermark(doc);
  drawPDFBorder(doc);
  let yPos = drawPDFHeader(doc);

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Metadata Block
  yPos = drawPDFMetadata(doc, {
    docType: 'NATIONSWORLD REPORT',
    refNo: draft.referenceNumber,
    date: formattedDate,
    status: 'OFFICIAL PUBLICATION',
    yPos: yPos,
  });

  // Title
  yPos = drawPDFTitle(doc, data.reportTitle || 'NATIONSWORLD OFFICIAL REPORT', yPos);

  if (data.programmeOrProject || data.preparedBy) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...PDF_COLORS.mutedText);
    if (data.programmeOrProject) {
      doc.text(`Programme/Project: ${data.programmeOrProject}`, margin + 2, yPos);
    }
    if (data.preparedBy) {
      doc.text(`Prepared By: ${data.preparedBy}`, pageWidth - margin - 2, yPos, { align: 'right' });
    }
    yPos += 8;
  }

  const renderSection = (title: string, content: string) => {
    if (!content || !content.trim()) return;

    if (yPos > pageHeight - 35) {
      doc.addPage();
      drawPDFWatermark(doc);
      drawPDFBorder(doc);
      yPos = margin + 10;
    }

    yPos = drawPDFSectionHeader(doc, title, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...PDF_COLORS.charcoal);

    const splitContent = doc.splitTextToSize(content, contentWidth - 4);
    for (let i = 0; i < splitContent.length; i++) {
      if (yPos > pageHeight - 25) {
        doc.addPage();
        drawPDFWatermark(doc);
        drawPDFBorder(doc);
        yPos = margin + 10;
      }
      doc.text(splitContent[i], margin + 2, yPos);
      yPos += 4.8;
    }

    yPos += 6;
  };

  renderSection('1. Executive Summary', data.executiveSummary);
  renderSection('2. Introduction & Background', data.introduction);
  renderSection('3. Objectives', data.objectives);
  renderSection('4. Key Activities', data.activities);
  renderSection('5. Participants & Stakeholders', data.participants);
  renderSection('6. Outcomes & Key Metrics', data.outcomes);
  renderSection('7. Challenges & Mitigation', data.challenges);
  renderSection('8. Strategic Recommendations', data.recommendations);
  renderSection('9. Conclusion', data.conclusion);
  renderSection('10. Attachments & Notes', data.attachmentsNotes);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawPDFFooter(doc, i, totalPages, draft.referenceNumber);
  }
}

function renderOrganizationalPDF(doc: jsPDF, draft: DocumentDraft): void {
  const data = draft.formData as OrganizationalFormData;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  drawPDFWatermark(doc);
  drawPDFBorder(doc);
  let yPos = drawPDFHeader(doc);

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Metadata
  yPos = drawPDFMetadata(doc, {
    docType: 'ORGANIZATIONAL DOCUMENT',
    refNo: draft.referenceNumber,
    date: formattedDate,
    recipient: data.targetAudience ? `Target Audience: ${data.targetAudience}` : undefined,
    yPos: yPos,
  });

  // Title
  yPos = drawPDFTitle(doc, data.documentTitle || 'ORGANIZATIONAL COMMUNIQUÉ', yPos);

  const renderBlock = (label: string, text: string) => {
    if (!text || !text.trim()) return;
    if (yPos > pageHeight - 30) {
      doc.addPage();
      drawPDFWatermark(doc);
      drawPDFBorder(doc);
      yPos = margin + 10;
    }

    yPos = drawPDFSectionHeader(doc, label, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...PDF_COLORS.charcoal);

    const split = doc.splitTextToSize(text, contentWidth - 4);
    for (let i = 0; i < split.length; i++) {
      if (yPos > pageHeight - 25) {
        doc.addPage();
        drawPDFWatermark(doc);
        drawPDFBorder(doc);
        yPos = margin + 10;
      }
      doc.text(split[i], margin + 2, yPos);
      yPos += 4.8;
    }
    yPos += 6;
  };

  renderBlock('Summary / Overview', data.summary);
  renderBlock('Details / Content', data.mainBody);
  renderBlock('Action Items & Resolutions', data.actionItems);

  drawPDFSignature(doc, {
    name: data.preparedBy || 'Secretariat Representative',
    position: data.position || 'NationsWorld Official',
    signatureImage: data.signatureImage,
    yPos: yPos,
    pageHeight: pageHeight,
    margin: margin,
  });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawPDFFooter(doc, i, totalPages, draft.referenceNumber);
  }
}

function renderCertificatePDF(doc: jsPDF, draft: DocumentDraft): void {
  const data = draft.formData as CertificateFormData;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Watermark for landscape certificate
  drawPDFWatermark(doc, true);
  drawPDFBorder(doc);

  // Outer Gold Frame
  doc.setLineWidth(1.2);
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner Emerald Line
  doc.setLineWidth(0.5);
  doc.setDrawColor(...PDF_COLORS.forestGreen);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // Top Header Banner Box
  doc.setFillColor(...PDF_COLORS.forestGreen);
  doc.rect(30, 20, pageWidth - 60, 13, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...PDF_COLORS.gold);
  doc.text('NATIONSWORLD OF VISIONARY ADVANCEMENT', pageWidth / 2, 28, { align: 'center' });

  // Main Certificate Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('CERTIFICATE OF RECOGNITION', pageWidth / 2, 52, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.mutedText);
  doc.text('THIS CERTIFICATE IS PROUDLY PRESENTED TO', pageWidth / 2, 64, { align: 'center' });

  // Recipient Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...PDF_COLORS.darkSlate);
  doc.text(data.recipientName || 'Recipient Name', pageWidth / 2, 80, { align: 'center' });

  // Gold Divider Line
  doc.setLineWidth(0.8);
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.line(pageWidth / 2 - 60, 84, pageWidth / 2 + 60, 84);

  // Achievement Citation
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...PDF_COLORS.charcoal);

  const splitAchievement = doc.splitTextToSize(
    data.achievementTitle || 'for outstanding contribution and dedication to visionary advancement.',
    190
  );
  doc.text(splitAchievement, pageWidth / 2, 96, { align: 'center' });

  let yPos = 96 + splitAchievement.length * 6 + 4;

  // Programme Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text((data.programmeOrEvent || 'NationsWorld Initiative').toUpperCase(), pageWidth / 2, yPos, { align: 'center' });

  const footerY = 162;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.mutedText);
  doc.text(`Issue Date: ${data.issueDate || new Date().toLocaleDateString('en-GB')}`, 35, footerY);
  doc.text(`Cert Ref: ${data.certificateNumber || draft.referenceNumber}`, 35, footerY + 5);

  // Official Seal
  doc.setFillColor(...PDF_COLORS.softGreen);
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.setLineWidth(1.0);
  doc.circle(pageWidth / 2, footerY - 5, 14, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('OFFICIAL', pageWidth / 2, footerY - 7, { align: 'center' });
  doc.text('SEAL', pageWidth / 2, footerY - 3, { align: 'center' });

  // Signature
  if (data.signatureImage) {
    try {
      doc.addImage(data.signatureImage, 'PNG', pageWidth - 85, footerY - 20, 35, 14);
    } catch (e) {
      // ignore
    }
  }

  doc.setLineWidth(0.5);
  doc.setDrawColor(...PDF_COLORS.emerald);
  doc.line(pageWidth - 90, footerY - 2, pageWidth - 40, footerY - 2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(data.authorizedSignatoryName || 'Authorized Signatory', pageWidth - 65, footerY + 3, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...PDF_COLORS.mutedText);
  doc.text(data.authorizedSignatoryTitle || 'NationsWorld Official', pageWidth - 65, footerY + 7.5, { align: 'center' });

  drawPDFFooter(doc, 1, 1, draft.referenceNumber);
}
