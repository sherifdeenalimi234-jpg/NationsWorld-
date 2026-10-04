import jsPDF from 'jspdf';
import type { ApplicationFormData } from '../types';
import { NATIONSWORLD_TEAMS } from '../data/teams';
import {
  PDF_COLORS,
  drawPDFBorder,
  drawPDFWatermark,
  drawPDFHeader,
  drawPDFMetadata,
  drawPDFSectionHeader,
  drawPDFFooter,
} from './pdfSystem';

export function generateApplicationPDF(data: ApplicationFormData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const getTeamName = (id: string) => {
    if (!id) return 'None selected';
    const team = NATIONSWORLD_TEAMS.find((t) => t.id === id);
    return team ? team.name : id;
  };

  const formattedDate = data.generatedAt
    ? new Date(data.generatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 20) {
      doc.addPage();
      drawPDFWatermark(doc);
      drawPDFBorder(doc);
      yPos = margin + 8;
    }
  };

  const renderFieldRow = (label: string, value: string, fullWidth = false) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...PDF_COLORS.forestGreen);

    const valStr = value || 'N/A';

    if (fullWidth) {
      const splitVal = doc.splitTextToSize(valStr, contentWidth - 4);
      const rowHeight = splitVal.length * 4.2 + 6;
      checkPageBreak(rowHeight + 2);

      doc.text(label, margin + 2, yPos);
      yPos += 4.5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...PDF_COLORS.charcoal);
      doc.text(splitVal, margin + 2, yPos);
      yPos += splitVal.length * 4.2 + 3.5;
    } else {
      checkPageBreak(6);
      doc.text(`${label}:`, margin + 2, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...PDF_COLORS.charcoal);
      const splitVal = doc.splitTextToSize(valStr, contentWidth - 52);
      doc.text(splitVal, margin + 50, yPos);
      yPos += Math.max(splitVal.length * 4.2, 5.5);
    }
  };

  // --- Page 1 Initialization ---
  drawPDFWatermark(doc);
  drawPDFBorder(doc);
  let yPos = drawPDFHeader(doc);

  // Metadata Box
  yPos = drawPDFMetadata(doc, {
    docType: 'Stage 1 Membership Application',
    refNo: data.appReference || 'NWA-PENDING',
    date: formattedDate,
    status: 'PROSPECTIVE MEMBER',
    yPos: yPos,
  });

  // Profile Photo embedding if available
  if (data.profilePhoto) {
    try {
      doc.addImage(data.profilePhoto, 'JPEG', pageWidth - margin - 26, yPos - 3, 24, 24);
    } catch (e) {
      console.warn('Could not embed photo in PDF:', e);
    }
  }

  // Section 1: Personal Information
  yPos = drawPDFSectionHeader(doc, '1. Personal Information', yPos);
  const fullName = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`.trim();
  renderFieldRow('Full Name', fullName);
  if (data.preferredName) {
    renderFieldRow('Preferred Name', data.preferredName);
  }
  renderFieldRow('Email Address', data.email);
  renderFieldRow('WhatsApp Number', data.whatsapp);
  renderFieldRow('Location', `${data.city ? data.city + ', ' : ''}${data.state ? data.state + ', ' : ''}${data.country}`);

  yPos += 3;

  // Section 2: Education & Professional Profile
  yPos = drawPDFSectionHeader(doc, '2. Education & Professional Profile', yPos);
  renderFieldRow('Current Status', data.currentStatus);
  renderFieldRow('Institution / Org', data.institution);
  renderFieldRow('Field of Study / Profession', data.fieldOfStudy);
  renderFieldRow('Highest Education Level', data.highestEducation);
  renderFieldRow('Relevant Skills', data.skills.length > 0 ? data.skills.join(', ') : 'None specified');

  yPos += 3;

  // Section 3: NationsWorld Placement
  yPos = drawPDFSectionHeader(doc, '3. NationsWorld Placement & Team Interest', yPos);
  renderFieldRow('Primary Team', getTeamName(data.primaryTeam));
  renderFieldRow('Secondary Area', getTeamName(data.secondaryTeam));

  if (data.primaryTeam === 'nasdi' || data.secondaryTeam === 'nasdi') {
    checkPageBreak(10);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...PDF_COLORS.mutedText);
    doc.text(
      '* Note: Members admitted into NASDI are automatically part of the Research & Innovation Team.',
      margin + 2,
      yPos
    );
    yPos += 6;
  }

  yPos += 3;

  // Section 4: Purpose & Motivation
  yPos = drawPDFSectionHeader(doc, '4. Purpose & Motivation', yPos);
  renderFieldRow('Why do you want to become a member?', data.whyMember, true);
  renderFieldRow('Area of work/research interest:', data.areaOfInterest, true);
  renderFieldRow('Skills & experience you can contribute:', data.skillsContribution, true);
  renderFieldRow('What you hope to gain or develop:', data.gainOrDevelop, true);
  renderFieldRow('Community/global problem you wish to solve:', data.communityProblem, true);

  yPos += 3;

  // Section 5: Experience & Background
  yPos = drawPDFSectionHeader(doc, '5. Experience & Background', yPos);
  renderFieldRow('Previous Experience Areas', data.previousExperienceAreas.length > 0 ? data.previousExperienceAreas.join(', ') : 'None selected');
  renderFieldRow('Worked on previous project/initiative?', data.workedOnProject === true ? 'Yes' : 'No');
  if (data.workedOnProject && data.projectExperienceDetails) {
    renderFieldRow('Project Experience Details', data.projectExperienceDetails, true);
  }
  if (data.portfolioUrl) {
    renderFieldRow('Portfolio / Work Link', data.portfolioUrl);
  }

  yPos += 3;

  // Section 6: Participation & Referral
  yPos = drawPDFSectionHeader(doc, '6. Participation & Referral', yPos);
  renderFieldRow('How did you hear about NationsWorld?', data.howHeard);
  renderFieldRow('Participated in prior programme?', data.participatedBefore === true ? `Yes (${data.pastProgrammeName || 'N/A'})` : 'No');
  renderFieldRow('Types of Participation', data.participationTypes.length > 0 ? data.participationTypes.join(', ') : 'None specified');

  yPos += 3;

  // Section 7: Declaration
  yPos = drawPDFSectionHeader(doc, '7. Applicant Declaration', yPos);
  checkPageBreak(25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...PDF_COLORS.charcoal);
  const declText =
    'I confirm that the information provided in this application is accurate and complete to the best of my knowledge. ' +
    'I understand that submission of this application does not automatically constitute membership of NationsWorld. ' +
    'I agree to comply with applicable NationsWorld membership policies, code of conduct and programme requirements if admitted.';
  const splitDecl = doc.splitTextToSize(declText, contentWidth - 4);
  doc.text(splitDecl, margin + 2, yPos);
  yPos += splitDecl.length * 3.8 + 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text(`Applicant Name: ${fullName}`, margin + 2, yPos);
  doc.text(`Reference: ${data.appReference || 'N/A'}`, margin + contentWidth / 2, yPos);
  yPos += 5;
  doc.text(`Declaration Date: ${formattedDate}`, margin + 2, yPos);
  doc.text(`Status: DECLARATION CONFIRMED`, margin + contentWidth / 2, yPos);

  yPos += 10;

  // Section 8: Administrative Use Only Box
  checkPageBreak(36);
  doc.setFillColor(...PDF_COLORS.warmWhite);
  doc.setDrawColor(...PDF_COLORS.gold);
  doc.setLineWidth(0.4);
  doc.rect(margin, yPos, contentWidth, 32, 'FD');

  doc.setFillColor(...PDF_COLORS.forestGreen);
  doc.rect(margin, yPos, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ADMINISTRATIVE USE ONLY (NationsWorld Secretariat)', margin + 3, yPos + 4.2);

  yPos += 9;
  doc.setFontSize(8);
  doc.setTextColor(...PDF_COLORS.mutedText);

  doc.text(`Application Reference: ${data.appReference || 'N/A'}`, margin + 3, yPos);
  doc.text('Screening Status: SUBMITTED', margin + contentWidth / 2 + 2, yPos);
  yPos += 5;

  doc.text('Reviewer: _________________________', margin + 3, yPos);
  doc.text('Screening Date: ___________________', margin + contentWidth / 2 + 2, yPos);
  yPos += 5;

  doc.text('Decision: [  ] Approved  [  ] Pending  [  ] Declined', margin + 3, yPos);
  doc.text('Assigned Grade: ___________________', margin + contentWidth / 2 + 2, yPos);
  yPos += 5;

  doc.text('Assigned Team: _____________________', margin + 3, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...PDF_COLORS.forestGreen);
  doc.text('Member ID: [ To be assigned after approval ]', margin + contentWidth / 2 + 2, yPos);

  // Apply footers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawPDFFooter(doc, i, totalPages, data.appReference || 'NWA-DRAFT');
  }

  const fileName = `NationsWorld_Membership_Application_${data.appReference || 'Draft'}.pdf`;
  doc.save(fileName);
}
