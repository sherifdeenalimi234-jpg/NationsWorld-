import jsPDF from 'jspdf';
import type {
  DocumentDraft,
  LetterFormData,
  ReportFormData,
  OrganizationalFormData,
  CertificateFormData,
} from '../types/production';

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

function drawInstitutionalHeader(doc: jsPDF, pageWidth: number, margin: number): number {
  doc.setFillColor(22, 131, 75);
  doc.rect(0, 0, pageWidth, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('NATIONSWORLD OF VISIONARY ADVANCEMENT', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('RESEARCH • INNOVATION • DEVELOPMENT • LEADERSHIP • PRODUCTION', margin, 18);

  doc.setFontSize(7.5);
  doc.text('Official Digital Secretariat • www.nationsworld.org', margin, 22);

  return 34;
}

function drawInstitutionalFooter(doc: jsPDF, pageNum: number, totalPages: number, refNum: string): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  doc.setPage(pageNum);
  doc.setDrawColor(217, 228, 221);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(101, 115, 107);
  doc.text(
    `NationsWorld Production Hub | Ref: ${refNum} | Drafts Stored Locally`,
    margin,
    pageHeight - 8
  );
  doc.text(
    `Page ${pageNum} of ${totalPages}`,
    pageWidth - margin,
    pageHeight - 8,
    { align: 'right' }
  );
}

function renderLetterPDF(doc: jsPDF, draft: DocumentDraft): void {
  const data = draft.formData as LetterFormData;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let yPos = drawInstitutionalHeader(doc, pageWidth, margin);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(22, 131, 75);
  doc.text('OFFICIAL COMMUNIQUÉ', margin, yPos);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(101, 115, 107);
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Date: ${formattedDate}`, pageWidth - margin, yPos, { align: 'right' });
  yPos += 5;

  doc.text(`Ref No: ${draft.referenceNumber}`, pageWidth - margin, yPos, { align: 'right' });
  yPos += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(23, 33, 27);
  doc.text('TO:', margin, yPos);
  yPos += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(data.recipientName || 'Recipient Name', margin, yPos);
  yPos += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  if (data.recipientPosition) {
    doc.text(data.recipientPosition, margin, yPos);
    yPos += 4.5;
  }
  if (data.organization) {
    doc.text(data.organization, margin, yPos);
    yPos += 4.5;
  }
  if (data.address) {
    const splitAddr = doc.splitTextToSize(data.address, contentWidth / 2);
    doc.text(splitAddr, margin, yPos);
    yPos += splitAddr.length * 4.5;
  }

  yPos += 6;

  doc.setFillColor(234, 247, 239);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setDrawColor(22, 131, 75);
  doc.setLineWidth(0.8);
  doc.line(margin, yPos, margin, yPos + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(11, 93, 54);
  const subjectText = `SUBJECT: ${data.subject || 'OFFICIAL COMMUNIQUÉ'}`;
  doc.text(subjectText.toUpperCase(), margin + 3, yPos + 5.5);

  yPos += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(23, 33, 27);

  const paragraphs = (data.content || '').split('\n');
  paragraphs.forEach((p) => {
    if (!p.trim()) {
      yPos += 4;
      return;
    }
    const splitP = doc.splitTextToSize(p, contentWidth);
    for (let i = 0; i < splitP.length; i++) {
      if (yPos > pageHeight - 35) {
        doc.addPage();
        yPos = margin + 10;
      }
      doc.text(splitP[i], margin, yPos);
      yPos += 5;
    }
    yPos += 3;
  });

  yPos += 8;

  if (yPos > pageHeight - 45) {
    doc.addPage();
    yPos = margin + 10;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Yours faithfully,', margin, yPos);
  yPos += 6;

  if (data.signatureImage) {
    try {
      doc.addImage(data.signatureImage, 'PNG', margin, yPos, 35, 14);
      yPos += 16;
    } catch (e) {
      console.warn('Could not render signature image:', e);
      yPos += 10;
    }
  } else {
    yPos += 10;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(data.preparedBy || 'Prepared By', margin, yPos);
  yPos += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(101, 115, 107);
  doc.text(data.position || 'NationsWorld Representative', margin, yPos);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawInstitutionalFooter(doc, i, totalPages, draft.referenceNumber);
  }
}

function renderReportPDF(doc: jsPDF, draft: DocumentDraft): void {
  const data = draft.formData as ReportFormData;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let yPos = drawInstitutionalHeader(doc, pageWidth, margin);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(217, 228, 221);
  doc.rect(margin, yPos, contentWidth, 22, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(11, 93, 54);
  doc.text((data.reportTitle || 'NATIONSWORLD REPORT').toUpperCase(), margin + 4, yPos + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(101, 115, 107);
  doc.text(`Programme/Project: ${data.programmeOrProject || 'N/A'}`, margin + 4, yPos + 15);

  doc.setFont('helvetica', 'bold');
  doc.text(`REF: ${draft.referenceNumber}`, pageWidth - margin - 4, yPos + 15, { align: 'right' });

  yPos += 28;

  const renderSection = (title: string, content: string) => {
    if (!content || !content.trim()) return;

    if (yPos > pageHeight - 35) {
      doc.addPage();
      yPos = margin + 10;
    }

    doc.setFillColor(234, 247, 239);
    doc.rect(margin, yPos, contentWidth, 7, 'F');
    doc.setDrawColor(22, 131, 75);
    doc.setLineWidth(0.8);
    doc.line(margin, yPos, margin, yPos + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(11, 93, 54);
    doc.text(title.toUpperCase(), margin + 3, yPos + 5);

    yPos += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(23, 33, 27);

    const splitContent = doc.splitTextToSize(content, contentWidth - 4);
    for (let i = 0; i < splitContent.length; i++) {
      if (yPos > pageHeight - 25) {
        doc.addPage();
        yPos = margin + 10;
      }
      doc.text(splitContent[i], margin + 2, yPos);
      yPos += 4.5;
    }

    yPos += 5;
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
    drawInstitutionalFooter(doc, i, totalPages, draft.referenceNumber);
  }
}

function renderOrganizationalPDF(doc: jsPDF, draft: DocumentDraft): void {
  const data = draft.formData as OrganizationalFormData;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let yPos = drawInstitutionalHeader(doc, pageWidth, margin);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(11, 93, 54);
  doc.text((data.documentTitle || 'ORGANIZATIONAL DOCUMENT').toUpperCase(), margin, yPos);
  yPos += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(101, 115, 107);
  doc.text(`Target Audience: ${data.targetAudience || 'General'}`, margin, yPos);
  doc.text(`Ref No: ${draft.referenceNumber}`, pageWidth - margin, yPos, { align: 'right' });
  yPos += 8;

  const renderBlock = (label: string, text: string) => {
    if (!text) return;
    if (yPos > pageHeight - 30) {
      doc.addPage();
      yPos = margin + 10;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(22, 131, 75);
    doc.text(label.toUpperCase(), margin, yPos);
    yPos += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(23, 33, 27);

    const split = doc.splitTextToSize(text, contentWidth);
    for (let i = 0; i < split.length; i++) {
      if (yPos > pageHeight - 25) {
        doc.addPage();
        yPos = margin + 10;
      }
      doc.text(split[i], margin, yPos);
      yPos += 4.5;
    }
    yPos += 6;
  };

  renderBlock('Summary', data.summary);
  renderBlock('Details / Content', data.mainBody);
  renderBlock('Action Items', data.actionItems);

  if (data.signatureImage) {
    if (yPos > pageHeight - 35) {
      doc.addPage();
      yPos = margin + 10;
    }
    try {
      doc.addImage(data.signatureImage, 'PNG', margin, yPos, 35, 14);
      yPos += 16;
    } catch (e) {
      yPos += 10;
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`Prepared By: ${data.preparedBy || 'Secretariat'}`, margin, yPos);
  yPos += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(101, 115, 107);
  doc.text(data.position || 'NationsWorld Official', margin, yPos);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawInstitutionalFooter(doc, i, totalPages, draft.referenceNumber);
  }
}

function renderCertificatePDF(doc: jsPDF, draft: DocumentDraft): void {
  const data = draft.formData as CertificateFormData;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setLineWidth(2);
  doc.setDrawColor(22, 131, 75);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setLineWidth(0.5);
  doc.setDrawColor(11, 93, 54);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  doc.setFillColor(22, 131, 75);
  doc.rect(30, 22, pageWidth - 60, 12, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('NATIONSWORLD OF VISIONARY ADVANCEMENT', pageWidth / 2, 29.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(11, 93, 54);
  doc.text('CERTIFICATE OF RECOGNITION', pageWidth / 2, 54, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(101, 115, 107);
  doc.text('THIS CERTIFICATE IS PROUDLY PRESENTED TO', pageWidth / 2, 66, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(23, 33, 27);
  doc.text(data.recipientName || 'Recipient Name', pageWidth / 2, 82, { align: 'center' });

  doc.setLineWidth(0.8);
  doc.setDrawColor(22, 131, 75);
  doc.line(pageWidth / 2 - 60, 86, pageWidth / 2 + 60, 86);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);

  const splitAchievement = doc.splitTextToSize(
    data.achievementTitle || 'for outstanding contribution and dedication to excellence.',
    190
  );
  doc.text(splitAchievement, pageWidth / 2, 98, { align: 'center' });

  let yPos = 98 + splitAchievement.length * 6 + 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(11, 93, 54);
  doc.text((data.programmeOrEvent || 'NationsWorld Programme').toUpperCase(), pageWidth / 2, yPos, { align: 'center' });

  const footerY = 162;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(101, 115, 107);
  doc.text(`Issue Date: ${data.issueDate || 'Today'}`, 40, footerY);
  doc.text(`Cert Ref: ${data.certificateNumber || draft.referenceNumber}`, 40, footerY + 5);

  doc.setFillColor(234, 247, 239);
  doc.setDrawColor(22, 131, 75);
  doc.circle(pageWidth / 2, footerY - 5, 14, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(11, 93, 54);
  doc.text('OFFICIAL', pageWidth / 2, footerY - 7, { align: 'center' });
  doc.text('SEAL', pageWidth / 2, footerY - 3, { align: 'center' });

  if (data.signatureImage) {
    try {
      doc.addImage(data.signatureImage, 'PNG', pageWidth - 85, footerY - 20, 35, 14);
    } catch (e) {
      // ignore
    }
  }

  doc.setLineWidth(0.5);
  doc.setDrawColor(101, 115, 107);
  doc.line(pageWidth - 90, footerY - 2, pageWidth - 40, footerY - 2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(23, 33, 27);
  doc.text(data.authorizedSignatoryName || 'Authorized Signatory', pageWidth - 65, footerY + 3, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(101, 115, 107);
  doc.text(data.authorizedSignatoryTitle || 'NationsWorld Official', pageWidth - 65, footerY + 7.5, { align: 'center' });
}
