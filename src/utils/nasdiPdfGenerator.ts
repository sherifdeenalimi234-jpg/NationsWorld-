import jsPDF from 'jspdf';
import {
  type AssessmentSubmission,
  getLeadershipPositions,
  getDepartments,
  getPortalSettings,
  type ScaleRating,
} from '../services/nasdiStorage';

export const NASDI_PDF_COLORS = {
  purpleDark: [76, 29, 149] as [number, number, number],    // #4C1D95
  purplePrimary: [109, 40, 217] as [number, number, number], // #6D28D9
  purpleLight: [243, 232, 255] as [number, number, number],  // #F3E8FF
  goldAccent: [217, 119, 6] as [number, number, number],     // #D97706
  emeraldAccent: [16, 185, 129] as [number, number, number],// #10B981
  darkSlate: [30, 41, 59] as [number, number, number],      // #1E293B
  charcoal: [55, 65, 81] as [number, number, number],        // #374151
  mutedText: [100, 116, 139] as [number, number, number],   // #64748B
  softGray: [248, 250, 252] as [number, number, number],     // #F8FAFC
  borderGray: [226, 232, 240] as [number, number, number],   // #E2E8F0
};

export const RATING_SCALE_LABELS: Record<ScaleRating, string> = {
  '1': '1 — BEGINNER (Limited experience; needs foundational training)',
  '2': '2 — BASIC (Has some knowledge but requires guidance)',
  '3': '3 — COMPETENT (Can perform familiar tasks independently)',
  '4': '4 — PROFICIENT (Performs tasks effectively and consistently)',
  '5': '5 — ADVANCED (Can manage complex tasks and support others)',
  'N/A': 'N/A — Not Applicable',
};

export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_') || 'Participant';
}

function checkAddPage(doc: jsPDF, currentY: number, neededHeight: number, margin = 15): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (currentY + neededHeight > pageHeight - margin - 15) {
    doc.addPage();
    drawNASDIPageBorderAndWatermark(doc);
    return margin + 18;
  }
  return currentY;
}

function drawNASDIPageBorderAndWatermark(doc: jsPDF): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const inset = 6;

  // Thin outer border
  doc.setDrawColor(...NASDI_PDF_COLORS.purplePrimary);
  doc.setLineWidth(0.3);
  doc.rect(inset, inset, pageWidth - inset * 2, pageHeight - inset * 2);

  // Gold corners
  doc.setDrawColor(...NASDI_PDF_COLORS.goldAccent);
  doc.setLineWidth(0.6);
  const arm = 5;
  doc.line(inset, inset, inset + arm, inset);
  doc.line(inset, inset, inset, inset + arm);
  doc.line(pageWidth - inset, inset, pageWidth - inset - arm, inset);
  doc.line(pageWidth - inset, inset, pageWidth - inset, inset + arm);
  doc.line(inset, pageHeight - inset, inset + arm, pageHeight - inset);
  doc.line(inset, pageHeight - inset, inset, pageHeight - inset - arm);
  doc.line(pageWidth - inset, pageHeight - inset, pageWidth - inset - arm, pageHeight - inset);
  doc.line(pageWidth - inset, pageHeight - inset, pageWidth - inset, pageHeight - inset - arm);
}

function drawHeaderBanner(doc: jsPDF): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const settings = getPortalSettings();

  doc.setFillColor(...NASDI_PDF_COLORS.purpleDark);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(...NASDI_PDF_COLORS.goldAccent);
  doc.rect(15, 6, 8, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('NASDI', 19, 11.5, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  const instituteTitle = settings.instituteFullName;
  const splitTitle = doc.splitTextToSize(instituteTitle, pageWidth - 60);
  doc.text(splitTitle[0] || 'NASDI', 26, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...NASDI_PDF_COLORS.purpleLight);
  doc.text(`Parent Org: ${settings.parentOrganisation} | ${settings.primaryAlignment}`, 26, 17);

  doc.setFillColor(...NASDI_PDF_COLORS.goldAccent);
  doc.rect(0, 28, pageWidth, 1.2, 'F');

  return 36;
}

function drawRunningFooter(doc: jsPDF, refNo: string): void {
  const totalPages = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...NASDI_PDF_COLORS.borderGray);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...NASDI_PDF_COLORS.mutedText);
    doc.text(
      `NASDI Human Capital Assessment Report | Ref: ${refNo} | Confidential`,
      margin,
      pageHeight - 6
    );

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NASDI_PDF_COLORS.purpleDark);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  }
}

function renderSectionHeader(doc: jsPDF, title: string, y: number): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  y = checkAddPage(doc, y, 12);

  doc.setFillColor(...NASDI_PDF_COLORS.purpleLight);
  doc.rect(margin, y, contentWidth, 7, 'F');

  doc.setFillColor(...NASDI_PDF_COLORS.purplePrimary);
  doc.rect(margin, y, 2.5, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...NASDI_PDF_COLORS.purpleDark);
  doc.text(title.toUpperCase(), margin + 6, y + 5);

  return y + 10;
}

function renderFieldRow(doc: jsPDF, label: string, value: string, y: number): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const displayVal = value && value.trim() ? value.trim() : 'N/A';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...NASDI_PDF_COLORS.mutedText);
  doc.text(label.toUpperCase(), margin, y);

  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...NASDI_PDF_COLORS.darkSlate);
  const splitText = doc.splitTextToSize(displayVal, contentWidth);

  y = checkAddPage(doc, y, splitText.length * 4.5 + 4);

  doc.text(splitText, margin, y);
  return y + splitText.length * 4.5 + 4;
}

function renderCompetencyTable(
  doc: jsPDF,
  title: string,
  items: Array<{ name: string; rating: ScaleRating; explanation?: string }>,
  startY: number
): number {
  let y = renderSectionHeader(doc, title, startY);
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const colWidths = [50, 35, contentWidth - 85];

  // Table Header
  y = checkAddPage(doc, y, 8);
  doc.setFillColor(...NASDI_PDF_COLORS.purpleDark);
  doc.rect(margin, y, contentWidth, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('COMPETENCY AREA', margin + 3, y + 4.2);
  doc.text('SELF-RATING', margin + colWidths[0] + 3, y + 4.2);
  doc.text('EXPLANATION / EVIDENCE', margin + colWidths[0] + colWidths[1] + 3, y + 4.2);

  y += 6;

  items.forEach((item, index) => {
    const labelText = item.name;
    const ratingText = RATING_SCALE_LABELS[item.rating] || item.rating;
    const expText = item.explanation && item.explanation.trim() ? item.explanation.trim() : 'No additional details provided.';

    const splitLabel = doc.splitTextToSize(labelText, colWidths[0] - 6);
    const splitRating = doc.splitTextToSize(ratingText, colWidths[1] - 6);
    const splitExp = doc.splitTextToSize(expText, colWidths[2] - 6);

    const maxLines = Math.max(splitLabel.length, splitRating.length, splitExp.length);
    const rowHeight = maxLines * 4 + 4;

    y = checkAddPage(doc, y, rowHeight);

    // Row zebra background
    if (index % 2 === 0) {
      doc.setFillColor(...NASDI_PDF_COLORS.softGray);
      doc.rect(margin, y, contentWidth, rowHeight, 'F');
    }

    doc.setDrawColor(...NASDI_PDF_COLORS.borderGray);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, rowHeight, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...NASDI_PDF_COLORS.purpleDark);
    doc.text(splitLabel, margin + 3, y + 4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...NASDI_PDF_COLORS.charcoal);
    doc.text(splitRating, margin + colWidths[0] + 3, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...NASDI_PDF_COLORS.charcoal);
    doc.text(splitExp, margin + colWidths[0] + colWidths[1] + 3, y + 4);

    y += rowHeight;
  });

  return y + 6;
}

export function generateNASDIAssessmentPDF(submission: AssessmentSubmission): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const positions = getLeadershipPositions();
  const departments = getDepartments();
  const settings = getPortalSettings();

  const primaryPos = positions.find((p) => p.id === submission.sectionA.positionId);

  // Collect all assigned leadership positions for multi-office appointments
  const allAssignedPositions = positions.filter((p) =>
    p.officeholder && submission.sectionA.fullName &&
    p.officeholder.toLowerCase().trim() === submission.sectionA.fullName.toLowerCase().trim()
  );

  const displayPositionTitle = allAssignedPositions.length > 0
    ? allAssignedPositions.map((p) => p.title).join(' & ')
    : primaryPos
    ? primaryPos.title
    : 'Unassigned Position';

  const assignedDept = departments.find((d) => d.id === submission.sectionA.departmentId);

  // PAGE 1: COVER PAGE
  drawNASDIPageBorderAndWatermark(doc);
  let yPos = drawHeaderBanner(doc);

  yPos += 10;

  // SDG 4 Banner Badge
  doc.setFillColor(...NASDI_PDF_COLORS.purpleLight);
  doc.setDrawColor(...NASDI_PDF_COLORS.purplePrimary);
  doc.setLineWidth(0.4);
  doc.rect(margin, yPos, contentWidth, 12, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...NASDI_PDF_COLORS.purpleDark);
  doc.text('PRIMARY ALIGNMENT: SDG 4 — QUALITY EDUCATION', margin + 5, yPos + 7.5);

  yPos += 20;

  // Main Report Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...NASDI_PDF_COLORS.purpleDark);
  doc.text('HUMAN CAPITAL DEVELOPMENT', margin, yPos);
  yPos += 7;
  doc.text('& ASSESSMENT REPORT', margin, yPos);

  yPos += 5;
  doc.setFillColor(...NASDI_PDF_COLORS.goldAccent);
  doc.rect(margin, yPos, 45, 1.5, 'F');

  yPos += 14;

  // Metadata Container Box
  doc.setFillColor(...NASDI_PDF_COLORS.softGray);
  doc.setDrawColor(...NASDI_PDF_COLORS.borderGray);
  doc.setLineWidth(0.4);
  const metaHeight = 58;
  doc.rect(margin, yPos, contentWidth, metaHeight, 'FD');

  doc.setFillColor(...NASDI_PDF_COLORS.purpleDark);
  doc.rect(margin, yPos, 3, metaHeight, 'F');

  let metaY = yPos + 8;
  const labelX = margin + 8;
  const valX = margin + 50;

  const renderMetaRow = (label: string, val: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...NASDI_PDF_COLORS.mutedText);
    doc.text(label.toUpperCase(), labelX, metaY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...NASDI_PDF_COLORS.darkSlate);
    doc.text(val || 'N/A', valX, metaY);
    metaY += 8;
  };

  renderMetaRow('Participant Name:', submission.sectionA.fullName || 'N/A');
  renderMetaRow('Official Position:', displayPositionTitle);
  renderMetaRow('Department:', assignedDept ? assignedDept.name : 'General Institutional');
  renderMetaRow('Reference Number:', submission.refNo);
  renderMetaRow('Assessment Date:', submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'));
  renderMetaRow('Report Status:', submission.status);

  yPos += metaHeight + 16;

  // Executive Summary Statement Box
  doc.setFillColor(252, 248, 255);
  doc.setDrawColor(...NASDI_PDF_COLORS.purplePrimary);
  doc.setLineWidth(0.3);
  doc.rect(margin, yPos, contentWidth, 32, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...NASDI_PDF_COLORS.purpleDark);
  doc.text('INSTITUTIONAL PURPOSE & SCOPE', margin + 5, yPos + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...NASDI_PDF_COLORS.charcoal);
  const execText = `This report contains the official self-assessment, professional capability disclosures, competency evaluations, and personal development plan submitted under the ${settings.programTitle}. It is designed to identify institutional strengths, target training requirements, and support continuous growth in alignment with SDG 4.`;
  const splitExec = doc.splitTextToSize(execText, contentWidth - 10);
  doc.text(splitExec, margin + 5, yPos + 13);

  // PAGE 2: PARTICIPANT PROFILE & OVERVIEW
  doc.addPage();
  drawNASDIPageBorderAndWatermark(doc);
  yPos = margin + 12;

  yPos = renderSectionHeader(doc, 'SECTION A: PERSONAL AND PROFESSIONAL PROFILE', yPos);
  yPos = renderFieldRow(doc, 'Full Name', submission.sectionA.fullName, yPos);
  yPos = renderFieldRow(doc, 'Email Address', submission.sectionA.email, yPos);
  if (submission.sectionA.phone) {
    yPos = renderFieldRow(doc, 'Contact Phone Number', submission.sectionA.phone, yPos);
  }
  yPos = renderFieldRow(doc, 'Assigned NASDI Position', displayPositionTitle, yPos);
  yPos = renderFieldRow(doc, 'Department', assignedDept ? assignedDept.name : 'General', yPos);
  yPos = renderFieldRow(doc, 'Educational Background', submission.sectionA.educationalBackground, yPos);
  yPos = renderFieldRow(doc, 'Relevant Professional Experience', submission.sectionA.professionalExperience, yPos);
  yPos = renderFieldRow(doc, 'Areas of Professional Interest', submission.sectionA.areasOfInterest, yPos);
  yPos = renderFieldRow(doc, 'Previous Leadership & Volunteer Experience', submission.sectionA.previousLeadership, yPos);
  yPos = renderFieldRow(doc, 'Training & Certifications', submission.sectionA.certifications, yPos);

  // SECTION B: KNOWLEDGE
  yPos = renderSectionHeader(doc, 'SECTION B: KNOWLEDGE & MANDATE UNDERSTANDING', yPos);
  yPos = renderFieldRow(doc, "Understanding of NASDI's Purpose and Mandate", submission.sectionB.nasdiPurpose, yPos);
  yPos = renderFieldRow(doc, 'Knowledge of SDG 4 and Quality Education Principles', submission.sectionB.sdg4Knowledge, yPos);
  yPos = renderFieldRow(doc, 'Educational Development Priorities', submission.sectionB.educationalDevelopment, yPos);
  yPos = renderFieldRow(doc, 'Assigned Responsibilities & Objectives', submission.sectionB.assignedResponsibilities, yPos);
  yPos = renderFieldRow(doc, "Departmental Objectives & Alignment", submission.sectionB.departmentObjectives, yPos);
  yPos = renderFieldRow(doc, 'Relevant Professional & Ethical Principles', submission.sectionB.professionalPrinciples, yPos);

  // SECTION C: UNDERSTANDING
  yPos = renderSectionHeader(doc, 'SECTION C: INSTITUTIONAL & ETHICAL UNDERSTANDING', yPos);
  yPos = renderFieldRow(doc, 'Official Responsibilities Scope', submission.sectionC.officialResponsibilities, yPos);
  yPos = renderFieldRow(doc, 'Institutional Accountability & Standards', submission.sectionC.institutionalAccountability, yPos);
  yPos = renderFieldRow(doc, 'Teamwork & Collaborative Dynamics', submission.sectionC.teamworkUnderstanding, yPos);
  yPos = renderFieldRow(doc, 'Inclusion & Equal Opportunities', submission.sectionC.inclusionAndEqualOpp, yPos);
  yPos = renderFieldRow(doc, 'Addressing Educational Challenges', submission.sectionC.educationalChallenges, yPos);
  yPos = renderFieldRow(doc, 'Organisational Communication Protocols', submission.sectionC.organisationalCommunication, yPos);
  yPos = renderFieldRow(doc, 'Ethical Conduct & Boundary Awareness', submission.sectionC.ethicalConduct, yPos);

  // SECTION D: SKILLS
  const sectionDItems = [
    { name: 'Communication', rating: submission.sectionD.communication.rating, explanation: submission.sectionD.communication.explanation },
    { name: 'Professional Writing', rating: submission.sectionD.professionalWriting.rating, explanation: submission.sectionD.professionalWriting.explanation },
    { name: 'Digital Literacy', rating: submission.sectionD.digitalLiteracy.rating, explanation: submission.sectionD.digitalLiteracy.explanation },
    { name: 'Research', rating: submission.sectionD.research.rating, explanation: submission.sectionD.research.explanation },
    { name: 'Critical Thinking', rating: submission.sectionD.criticalThinking.rating, explanation: submission.sectionD.criticalThinking.explanation },
    { name: 'Problem Solving', rating: submission.sectionD.problemSolving.rating, explanation: submission.sectionD.problemSolving.explanation },
    { name: 'Public Speaking', rating: submission.sectionD.publicSpeaking.rating, explanation: submission.sectionD.publicSpeaking.explanation },
    { name: 'Teamwork', rating: submission.sectionD.teamwork.rating, explanation: submission.sectionD.teamwork.explanation },
    { name: 'Time Management', rating: submission.sectionD.timeManagement.rating, explanation: submission.sectionD.timeManagement.explanation },
    { name: 'Project Planning', rating: submission.sectionD.projectPlanning.rating, explanation: submission.sectionD.projectPlanning.explanation },
    { name: 'Responsible Use of AI', rating: submission.sectionD.responsibleAI.rating, explanation: submission.sectionD.responsibleAI.explanation },
    { name: 'Data Handling & Reporting', rating: submission.sectionD.dataHandling.rating, explanation: submission.sectionD.dataHandling.explanation },
  ];
  yPos = renderCompetencyTable(doc, 'SECTION D: SKILLS & COMPETENCY RATING', sectionDItems, yPos);

  // SECTION E: EXPERIENCE
  yPos = renderSectionHeader(doc, 'SECTION E: EXPERIENCE AND PRACTICAL DEMONSTRATION', yPos);
  yPos = renderFieldRow(doc, 'Previous Key Projects', submission.sectionE.previousProjects, yPos);
  yPos = renderFieldRow(doc, 'Leadership Roles Held', submission.sectionE.leadershipExperience, yPos);
  yPos = renderFieldRow(doc, 'Volunteer & Community Work', submission.sectionE.volunteerWork, yPos);
  yPos = renderFieldRow(doc, 'Educational Initiatives', submission.sectionE.educationalInitiatives, yPos);
  yPos = renderFieldRow(doc, 'Community Engagement', submission.sectionE.communityEngagement, yPos);
  yPos = renderFieldRow(doc, 'Practical Experience Summary', submission.sectionE.practicalExperience, yPos);

  // SECTION F: CAPABILITY
  const sectionFItems = [
    { name: 'Work Independently', rating: submission.sectionF.workIndependently.rating, explanation: submission.sectionF.workIndependently.explanation },
    { name: 'Complete Assigned Tasks', rating: submission.sectionF.completeAssignedTasks.rating, explanation: submission.sectionF.completeAssignedTasks.explanation },
    { name: 'Meet Deadlines', rating: submission.sectionF.meetDeadlines.rating, explanation: submission.sectionF.meetDeadlines.explanation },
    { name: 'Collaborate Effectively', rating: submission.sectionF.collaborateEffectively.rating, explanation: submission.sectionF.collaborateEffectively.explanation },
    { name: 'Handle Responsibilities', rating: submission.sectionF.handleResponsibilities.rating, explanation: submission.sectionF.handleResponsibilities.explanation },
    { name: 'Solve Practical Problems', rating: submission.sectionF.solvePracticalProblems.rating, explanation: submission.sectionF.solvePracticalProblems.explanation },
    { name: 'Learn New Skills', rating: submission.sectionF.learnNewSkills.rating, explanation: submission.sectionF.learnNewSkills.explanation },
    { name: 'Apply Knowledge', rating: submission.sectionF.applyKnowledge.rating, explanation: submission.sectionF.applyKnowledge.explanation },
  ];
  yPos = renderCompetencyTable(doc, 'SECTION F: CAPABILITY ASSESSMENTS', sectionFItems, yPos);

  // SECTION G: ETHICS AND ACCOUNTABILITY
  const sectionGItems = [
    { name: 'Integrity', rating: submission.sectionG.integrity.rating, explanation: submission.sectionG.integrity.explanation },
    { name: 'Confidentiality', rating: submission.sectionG.confidentiality.rating, explanation: submission.sectionG.confidentiality.explanation },
    { name: 'Responsible Use of Resources', rating: submission.sectionG.resourceUse.rating, explanation: submission.sectionG.resourceUse.explanation },
    { name: 'Respect for Others', rating: submission.sectionG.respectForOthers.rating, explanation: submission.sectionG.respectForOthers.explanation },
    { name: 'Professional Boundaries', rating: submission.sectionG.professionalBoundaries.rating, explanation: submission.sectionG.professionalBoundaries.explanation },
    { name: 'Safeguarding Awareness', rating: submission.sectionG.safeguardingAwareness.rating, explanation: submission.sectionG.safeguardingAwareness.explanation },
    { name: 'Conflict Resolution', rating: submission.sectionG.conflictResolution.rating, explanation: submission.sectionG.conflictResolution.explanation },
    { name: 'Accountability', rating: submission.sectionG.accountability.rating, explanation: submission.sectionG.accountability.explanation },
  ];
  yPos = renderCompetencyTable(doc, 'SECTION G: ETHICS & ACCOUNTABILITY RATINGS', sectionGItems, yPos);

  // SECTION H: SDG 4 & EDUCATIONAL DEVELOPMENT
  yPos = renderSectionHeader(doc, 'SECTION H: SDG 4 & EDUCATIONAL DEVELOPMENT MANDATE', yPos);
  yPos = renderFieldRow(doc, 'Quality Education Imperative', submission.sectionH.qualityEducation, yPos);
  yPos = renderFieldRow(doc, 'Inclusive Education Strategies', submission.sectionH.inclusiveEducation, yPos);
  yPos = renderFieldRow(doc, 'Equal Opportunities Pathways', submission.sectionH.equalOpportunities, yPos);
  yPos = renderFieldRow(doc, 'Teacher Capacity Development', submission.sectionH.teacherDevelopment, yPos);
  yPos = renderFieldRow(doc, 'Student Support & Empowerment', submission.sectionH.studentDevelopment, yPos);
  yPos = renderFieldRow(doc, 'Educational Technology Integration', submission.sectionH.educationalTech, yPos);
  yPos = renderFieldRow(doc, 'Community Participation & Advocacy', submission.sectionH.communityParticipation, yPos);

  // SECTION I: PERSONAL DEVELOPMENT PLAN
  yPos = renderSectionHeader(doc, 'SECTION I: PERSONAL DEVELOPMENT PLAN (PDP)', yPos);
  yPos = renderFieldRow(doc, 'Strongest Key Abilities', submission.sectionI.strongestAbilities, yPos);
  yPos = renderFieldRow(doc, 'Areas Requiring Improvement', submission.sectionI.areasRequiringImprovement, yPos);
  yPos = renderFieldRow(doc, 'Recommended / Requested Training', submission.sectionI.trainingNeeded, yPos);
  yPos = renderFieldRow(doc, 'Target Professional Skills to Develop', submission.sectionI.professionalSkillsToDevelop, yPos);
  yPos = renderFieldRow(doc, 'Proposed Contributions to NASDI', submission.sectionI.contributionsToNASDI, yPos);
  yPos = renderFieldRow(doc, 'Short-Term Development Goals', submission.sectionI.shortTermGoals, yPos);
  yPos = renderFieldRow(doc, 'Long-Term Development Goals', submission.sectionI.longTermGoals, yPos);
  yPos = renderFieldRow(doc, 'Weekly Time Commitment (Hours)', submission.sectionI.timeCommitmentHours, yPos);

  // SECTION J: ROLE-SPECIFIC COMPETENCIES
  if (submission.sectionJ && submission.sectionJ.length > 0) {
    yPos = renderSectionHeader(doc, 'SECTION J: ROLE-SPECIFIC COMPETENCIES', yPos);
    submission.sectionJ.forEach((resp) => {
      yPos = renderFieldRow(doc, resp.questionText, resp.response, yPos);
    });
  }

  // UPLOADED EVIDENCE DOCUMENTS
  if (submission.evidenceDocuments && submission.evidenceDocuments.length > 0) {
    yPos = renderSectionHeader(doc, 'UPLOADED SUPPORTING EVIDENCE', yPos);
    submission.evidenceDocuments.forEach((docItem, idx) => {
      yPos = renderFieldRow(doc, `Evidence #${idx + 1}: ${docItem.name}`, `Type: ${docItem.type} | Size: ${(docItem.size / 1024).toFixed(1)} KB | Uploaded: ${new Date(docItem.uploadedAt).toLocaleDateString('en-GB')}`, yPos);

      // Embedded Image Preview if enabled
      if (docItem.includeInPdf && docItem.type.startsWith('image/')) {
        yPos = checkAddPage(doc, yPos, 45);
        try {
          doc.addImage(docItem.dataUrl, 'PNG', margin, yPos, 60, 35);
          yPos += 38;
        } catch (err) {
          console.warn('Could not embed image in PDF:', err);
        }
      }
    });
  }

  // FINAL SECTION: REVIEWER COMMENTS & DECISION SIGN-OFF
  yPos = renderSectionHeader(doc, 'REVIEWER EVALUATION & INSTITUTIONAL SIGN-OFF', yPos);

  yPos = checkAddPage(doc, yPos, 40);

  doc.setFillColor(...NASDI_PDF_COLORS.softGray);
  doc.setDrawColor(...NASDI_PDF_COLORS.borderGray);
  doc.setLineWidth(0.3);
  doc.rect(margin, yPos, contentWidth, 36, 'FD');

  let revY = yPos + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...NASDI_PDF_COLORS.purpleDark);
  doc.text('Review Decision & Status:', margin + 5, revY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...NASDI_PDF_COLORS.darkSlate);
  doc.text(submission.status, margin + 48, revY);

  revY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...NASDI_PDF_COLORS.mutedText);
  doc.text('Reviewer Comments:', margin + 5, revY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...NASDI_PDF_COLORS.charcoal);
  const revComments = submission.reviewerComments && submission.reviewerComments.trim() ? submission.reviewerComments.trim() : 'Awaiting reviewer comments and assessment decision.';
  const splitComments = doc.splitTextToSize(revComments, contentWidth - 52);
  doc.text(splitComments, margin + 48, revY);

  revY += Math.max(splitComments.length * 4, 8);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...NASDI_PDF_COLORS.mutedText);
  doc.text('Development Recommendations:', margin + 5, revY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...NASDI_PDF_COLORS.charcoal);
  const revRecs = submission.reviewerRecommendations && submission.reviewerRecommendations.trim() ? submission.reviewerRecommendations.trim() : 'Development recommendations to be assigned upon review.';
  const splitRecs = doc.splitTextToSize(revRecs, contentWidth - 52);
  doc.text(splitRecs, margin + 48, revY);

  yPos += 42;

  // Sign-off line
  yPos = checkAddPage(doc, yPos, 25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...NASDI_PDF_COLORS.purpleDark);
  doc.text('Authorized Reviewer / Board Approval:', margin, yPos);

  yPos += 8;
  doc.setDrawColor(...NASDI_PDF_COLORS.purpleDark);
  doc.setLineWidth(0.4);
  doc.line(margin, yPos, margin + 60, yPos);

  yPos += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...NASDI_PDF_COLORS.darkSlate);
  doc.text(submission.reviewerName || 'NASDI Assessment Review Board', margin, yPos);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...NASDI_PDF_COLORS.mutedText);
  doc.text(submission.reviewDecisionDate ? `Decision Date: ${new Date(submission.reviewDecisionDate).toLocaleDateString('en-GB')}` : 'Status: Pending Formal Review', margin, yPos + 4);

  // Apply running footer with page numbers and ref
  drawRunningFooter(doc, submission.refNo);

  return doc;
}

export function downloadNASDIAssessmentPDF(submission: AssessmentSubmission): void {
  const doc = generateNASDIAssessmentPDF(submission);
  const nameClean = sanitizeFileName(submission.sectionA.fullName || 'Participant');
  const fileName = `NASDI_Assessment_${submission.refNo}_${nameClean}.pdf`;
  doc.save(fileName);
}
