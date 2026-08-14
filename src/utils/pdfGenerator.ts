import jsPDF from 'jspdf';
import type { ApplicationFormData } from '../types';
import { NATIONSWORLD_TEAMS } from '../data/teams';

export function generateApplicationPDF(data: ApplicationFormData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let yPos = margin;

  const getTeamName = (id: string) => {
    if (!id) return 'None selected';
    const team = NATIONSWORLD_TEAMS.find(t => t.id === id);
    return team ? team.name : id;
  };

  const formattedDate = data.generatedAt
    ? new Date(data.generatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

  const drawHeader = () => {
    doc.setFillColor(22, 131, 75); // #16834B
    doc.rect(0, 0, pageWidth, 24, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('NATIONSWORLD OF VISIONARY ADVANCEMENT', margin, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Research • Innovation • Development • Leadership • Impact', margin, 18);

    yPos = 32;
  };

  const drawFooter = (pageNumber: number, totalPages: number) => {
    doc.setPage(pageNumber);
    doc.setDrawColor(217, 228, 221);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(101, 115, 107);
    doc.text(
      `NationsWorld Membership Application | Ref: ${data.appReference || 'N/A'}`,
      margin,
      pageHeight - 7
    );
    doc.text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 7,
      { align: 'right' }
    );
  };

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 18) {
      doc.addPage();
      yPos = margin + 10;
    }
  };

  const renderSectionHeader = (title: string) => {
    checkPageBreak(12);
    doc.setFillColor(234, 247, 239); // Soft green #EAF7EF
    doc.rect(margin, yPos, contentWidth, 7, 'F');

    doc.setDrawColor(22, 131, 75);
    doc.setLineWidth(0.8);
    doc.line(margin, yPos, margin, yPos + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(11, 93, 54); // Deep green #0B5D36
    doc.text(title.toUpperCase(), margin + 3, yPos + 5);

    yPos += 10;
  };

  const renderFieldRow = (label: string, value: string, fullWidth = false) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(101, 115, 107);

    const valStr = value || 'N/A';

    if (fullWidth) {
      const splitVal = doc.splitTextToSize(valStr, contentWidth - 4);
      const rowHeight = splitVal.length * 4.2 + 5;
      checkPageBreak(rowHeight + 2);

      doc.text(label, margin + 2, yPos);
      yPos += 4;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(23, 33, 27);
      doc.text(splitVal, margin + 2, yPos);
      yPos += splitVal.length * 4.2 + 3;
    } else {
      checkPageBreak(6);
      doc.text(`${label}:`, margin + 2, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(23, 33, 27);
      const splitVal = doc.splitTextToSize(valStr, contentWidth - 50);
      doc.text(splitVal, margin + 48, yPos);
      yPos += Math.max(splitVal.length * 4.2, 5);
    }
  };

  // --- Page 1 Start ---
  drawHeader();

  // Application Header Badge Box
  doc.setDrawColor(22, 131, 75);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPos, contentWidth, 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(22, 131, 75);
  doc.text('STAGE 1 MEMBERSHIP APPLICATION', margin + 4, yPos + 7);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(101, 115, 107);
  doc.text(`Application Status: `, margin + 4, yPos + 14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 93, 54);
  doc.text('PROSPECTIVE MEMBER', margin + 34, yPos + 14);

  // Reference Code Badge
  doc.setFillColor(234, 247, 239);
  doc.rect(pageWidth - margin - 65, yPos + 3, 61, 16, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(101, 115, 107);
  doc.text('APPLICATION REF:', pageWidth - margin - 62, yPos + 8);
  doc.setFontSize(10);
  doc.setTextColor(22, 131, 75);
  doc.text(data.appReference || 'N/A', pageWidth - margin - 62, yPos + 14);

  yPos += 27;

  // Date Row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(101, 115, 107);
  doc.text(`Submission Date: ${formattedDate}`, margin + 2, yPos);
  yPos += 6;

  // Add photo if provided
  if (data.profilePhoto) {
    try {
      doc.addImage(data.profilePhoto, 'JPEG', pageWidth - margin - 25, yPos - 4, 25, 25);
    } catch (e) {
      console.warn('Could not embed photo in PDF:', e);
    }
  }

  // Section 1: Personal Information
  renderSectionHeader('1. Personal Information');
  const fullName = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`.trim();
  renderFieldRow('Full Name', fullName);
  if (data.preferredName) {
    renderFieldRow('Preferred Name', data.preferredName);
  }
  renderFieldRow('Email Address', data.email);
  renderFieldRow('WhatsApp Number', data.whatsapp);
  renderFieldRow('Location', `${data.city ? data.city + ', ' : ''}${data.state ? data.state + ', ' : ''}${data.country}`);

  yPos += 2;

  // Section 2: Education & Professional Profile
  renderSectionHeader('2. Education & Professional Profile');
  renderFieldRow('Current Status', data.currentStatus);
  renderFieldRow('Institution / Org', data.institution);
  renderFieldRow('Field of Study / Profession', data.fieldOfStudy);
  renderFieldRow('Highest Level of Education', data.highestEducation);
  renderFieldRow('Relevant Skills', data.skills.length > 0 ? data.skills.join(', ') : 'None specified');

  yPos += 2;

  // Section 3: NationsWorld Placement
  renderSectionHeader('3. NationsWorld Placement & Team Interest');
  renderFieldRow('Primary Team', getTeamName(data.primaryTeam));
  renderFieldRow('Secondary Area', getTeamName(data.secondaryTeam));

  if (data.primaryTeam === 'nasdi' || data.secondaryTeam === 'nasdi') {
    checkPageBreak(10);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(101, 115, 107);
    doc.text(
      'Note: Members admitted into NASDI are automatically part of the Research & Innovation Team under the current NationsWorld structure.',
      margin + 2,
      yPos
    );
    yPos += 6;
  }

  yPos += 2;

  // Section 4: Purpose & Motivation
  renderSectionHeader('4. Purpose & Motivation');
  renderFieldRow('Why do you want to become a member?', data.whyMember, true);
  renderFieldRow('Area of work/research interest:', data.areaOfInterest, true);
  renderFieldRow('Skills & experience you can contribute:', data.skillsContribution, true);
  renderFieldRow('What you hope to gain or develop:', data.gainOrDevelop, true);
  renderFieldRow('Community/global problem you wish to solve:', data.communityProblem, true);

  yPos += 2;

  // Section 5: Previous Experience & Background
  renderSectionHeader('5. Experience & Background');
  renderFieldRow('Previous Experience Areas', data.previousExperienceAreas.length > 0 ? data.previousExperienceAreas.join(', ') : 'None selected');
  renderFieldRow('Worked on previous project/initiative?', data.workedOnProject === true ? 'Yes' : 'No');
  if (data.workedOnProject && data.projectExperienceDetails) {
    renderFieldRow('Project Experience Details', data.projectExperienceDetails, true);
  }
  if (data.portfolioUrl) {
    renderFieldRow('Portfolio / Work Link', data.portfolioUrl);
  }

  yPos += 2;

  // Section 6: Participation Interests
  renderSectionHeader('6. Participation & Referral');
  renderFieldRow('How did you hear about NationsWorld?', data.howHeard);
  renderFieldRow('Participated in prior programme?', data.participatedBefore === true ? `Yes (${data.pastProgrammeName || 'N/A'})` : 'No');
  renderFieldRow('Types of Participation', data.participationTypes.length > 0 ? data.participationTypes.join(', ') : 'None specified');

  yPos += 2;

  // Section 7: Declaration
  renderSectionHeader('7. Applicant Declaration');
  checkPageBreak(25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(23, 33, 27);
  const declText =
    'I confirm that the information provided in this application is accurate and complete to the best of my knowledge. ' +
    'I understand that submission of this application does not automatically constitute membership of NationsWorld. ' +
    'I agree to comply with applicable NationsWorld membership policies, code of conduct and programme requirements if admitted.';
  const splitDecl = doc.splitTextToSize(declText, contentWidth - 4);
  doc.text(splitDecl, margin + 2, yPos);
  yPos += splitDecl.length * 3.8 + 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`Applicant Name: ${fullName}`, margin + 2, yPos);
  doc.text(`Reference: ${data.appReference}`, margin + (contentWidth / 2), yPos);
  yPos += 5;
  doc.text(`Declaration Date: ${formattedDate}`, margin + 2, yPos);
  doc.text(`Status: DECLARATION CONFIRMED`, margin + (contentWidth / 2), yPos);

  yPos += 10;

  // Section 8: Administrative Use Only
  checkPageBreak(35);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(217, 228, 221);
  doc.rect(margin, yPos, contentWidth, 32, 'FD');

  doc.setFillColor(22, 131, 75);
  doc.rect(margin, yPos, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ADMINISTRATIVE USE ONLY (NationsWorld Secretariat)', margin + 3, yPos + 4.2);

  yPos += 9;
  doc.setFontSize(8);
  doc.setTextColor(101, 115, 107);

  doc.text(`Application Reference: ${data.appReference || 'N/A'}`, margin + 3, yPos);
  doc.text('Screening Status: SUBMITTED', margin + (contentWidth / 2) + 2, yPos);
  yPos += 5;

  doc.text('Reviewer: _________________________', margin + 3, yPos);
  doc.text('Screening Date: ___________________', margin + (contentWidth / 2) + 2, yPos);
  yPos += 5;

  doc.text('Decision: [  ] Approved  [  ] Pending  [  ] Declined', margin + 3, yPos);
  doc.text('Assigned Grade: ___________________', margin + (contentWidth / 2) + 2, yPos);
  yPos += 5;

  doc.text('Assigned Team: _____________________', margin + 3, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 93, 54);
  doc.text('Member ID: [ To be assigned after approval ]', margin + (contentWidth / 2) + 2, yPos);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    drawFooter(i, totalPages);
  }

  const fileName = `NationsWorld_Membership_Application_${data.appReference || 'Draft'}.pdf`;
  doc.save(fileName);
}
