import type { TemplateDefinition, DocumentCategory } from '../types/production';

export const PRODUCTION_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'official-letter',
    category: 'letters',
    title: 'Official Letter',
    description: 'Standard institutional letterhead for formal NationsWorld communications.',
    codePrefix: 'NW-LET',
    defaultFormData: {
      recipientName: 'Dr. Jane Doe',
      recipientPosition: 'Executive Director',
      organization: 'Global Policy Institute',
      address: '12 Innovation Way, Victoria Island, Lagos, Nigeria',
      subject: 'FORMAL COMMUNIQUÉ ON STRATEGIC COLLABORATION',
      content: 'We write on behalf of NationsWorld of Visionary Advancement to formally initiate discussions regarding strategic collaboration in sustainable development research and leadership capacity initiatives.\n\nNationsWorld is committed to fostering multidisciplinary research and practical solutions across Africa and globally. We look forward to exploring impactful synergies between our institutions.',
      preparedBy: 'Amb. Emmanuel Okafor',
      position: 'Head of Secretariat, NationsWorld'
    }
  },
  {
    id: 'invitation-letter',
    category: 'letters',
    title: 'Invitation Letter',
    description: 'Formal invitation for guest speakers, dignitaries, or programme participants.',
    codePrefix: 'NW-LET',
    defaultFormData: {
      recipientName: 'Prof. Abubakar Sani',
      recipientPosition: 'Senior Fellow',
      organization: 'Center for Development Studies',
      address: 'Abuja, Federal Capital Territory, Nigeria',
      subject: 'INVITATION TO SERVE AS KEYNOTE SPEAKER — TPD SESSION',
      content: 'It is our distinct honor to invite you as a Keynote Speaker for our upcoming session of The Productive Discourse (TPD).\n\nYour distinguished work in economic research and visionary leadership aligns perfectly with NationsWorld\'s mission of building people and advancing ideas.',
      preparedBy: 'Secretariat Committee',
      position: 'NationsWorld Programmes Directorate'
    }
  },
  {
    id: 'appreciation-letter',
    category: 'letters',
    title: 'Appreciation Letter',
    description: 'Official letter expressing gratitude for contributions or partnership.',
    codePrefix: 'NW-LET',
    defaultFormData: {
      recipientName: 'Ms. Clara Vance',
      recipientPosition: 'Lead Innovation Advisor',
      organization: 'NextGen Tech Hub',
      address: 'Nairobi, Kenya',
      subject: 'LETTER OF APPRECIATION FOR REMARKABLE CONTRIBUTION',
      content: 'On behalf of NationsWorld of Visionary Advancement, we express our profound gratitude for your exceptional presentation during our recent multidisciplinary summit.\n\nYour insights have inspired our emerging researchers and innovators immensely.',
      preparedBy: 'NationsWorld Leadership Board',
      position: 'NationsWorld Secretariat'
    }
  },
  {
    id: 'congratulatory-letter',
    category: 'letters',
    title: 'Congratulatory Letter',
    description: 'Formal congratulations on achievements, appointments, or awards.',
    codePrefix: 'NW-LET',
    defaultFormData: {
      recipientName: 'Dr. Marcus Sterling',
      recipientPosition: 'Recipient',
      organization: 'African Research Network',
      address: 'Accra, Ghana',
      subject: 'CONGRATULATIONS ON YOUR PRESTIGIOUS APPOINTMENT',
      content: 'NationsWorld extends its warmest congratulations on your recent appointment. We celebrate your dedication to visionary leadership and human capital advancement.',
      preparedBy: 'Executive Secretariat',
      position: 'NationsWorld of Visionary Advancement'
    }
  },
  {
    id: 'appointment-letter',
    category: 'letters',
    title: 'Appointment Letter',
    description: 'Formal letter appointing members, team leads, or fellows to roles.',
    codePrefix: 'NW-LET',
    defaultFormData: {
      recipientName: 'Amina Bello',
      recipientPosition: 'Senior Research Fellow',
      organization: 'NASDI Institute',
      address: 'NationsWorld Network',
      subject: 'OFFICIAL APPOINTMENT AS RESEARCH TEAM LEAD',
      content: 'We are pleased to formally confirm your appointment as Research Team Lead within the NationsWorld Affairs of Sustainable Development Institute (NASDI).\n\nWe trust that your experience and commitment will advance our mission of building people and transforming communities.',
      preparedBy: 'NationsWorld Directorate',
      position: 'Office of the Executive President'
    }
  },
  {
    id: 'partnership-letter',
    category: 'letters',
    title: 'Partnership Letter',
    description: 'Proposal or confirmation of institutional partnership and MoU.',
    codePrefix: 'NW-LET',
    defaultFormData: {
      recipientName: 'The Board of Directors',
      recipientPosition: 'Executive Council',
      organization: 'Horizon Development Foundation',
      address: 'Kigali, Rwanda',
      subject: 'PROPOSAL FOR INSTITUTIONAL PARTNERSHIP FRAMEWORK',
      content: 'NationsWorld of Visionary Advancement presents this formal proposal to establish an institutional partnership focused on joint research, youth leadership, and technology initiatives.',
      preparedBy: 'Strategic Partnerships Directorate',
      position: 'NationsWorld Affairs'
    }
  },
  {
    id: 'sponsorship-letter',
    category: 'letters',
    title: 'Sponsorship Letter',
    description: 'Formal letter requesting or confirming initiative sponsorship.',
    codePrefix: 'NW-LET',
    defaultFormData: {
      recipientName: 'Chief Executive Officer',
      recipientPosition: 'Corporate Social Responsibility Division',
      organization: 'Apex Energy & Tech Corp',
      address: 'Lagos, Nigeria',
      subject: 'SPONSORSHIP PROPOSAL — NATIONSWORLD INNOVATION SUMMIT',
      content: 'We write to invite your esteemed organization to partner as a Lead Sponsor for the upcoming NationsWorld Visionary Innovation Summit.\n\nYour partnership will directly support high-impact projects and capacity development for visionary youth across the continent.',
      preparedBy: 'Sponsorship & Resource Committee',
      position: 'NationsWorld Secretariat'
    }
  },

  {
    id: 'general-report',
    category: 'reports',
    title: 'General Report',
    description: 'Standard multi-page institutional report for research, policy, or progress.',
    codePrefix: 'NW-RPT',
    defaultFormData: {
      reportTitle: 'SUSTAINABLE HUMAN CAPITAL & POLICY REPORT',
      programmeOrProject: 'NationsWorld Institutional Advancement Index',
      location: 'NationsWorld Secretariat, Online',
      preparedBy: 'Research & Policy Directorate',
      position: 'Senior Research Team',
      executiveSummary: 'This report provides a comprehensive review of multidisciplinary human capital initiatives and policy developments executed across NationsWorld teams over the current quarter.',
      introduction: 'Human advancement requires structured research, systematic learning, and intentional capacity building. NationsWorld operates across 15 specialized teams to drive sustainable progress.',
      objectives: '1. Evaluate capacity development outcomes.\n2. Measure research output quality.\n3. Formulate actionable policy recommendations.',
      activities: 'Key activities included weekly sessions of The Productive Discourse (TPD), research working group meetings, policy paper drafts, and regional youth engagement workshops.',
      participants: 'Over 250 researchers, emerging leaders, innovators, and policy practitioners across 12 countries.',
      outcomes: 'Successfully published 4 strategic briefs, trained 120 young leaders, and initiated 3 cross-institute collaborative initiatives.',
      challenges: 'Primary challenges included cross-border coordination across multiple time zones and funding constraints for field implementation.',
      recommendations: 'Expand digital infrastructure, establish localized chapter hubs, and enhance institutional partnership networks.',
      conclusion: 'NationsWorld remains dedicated to its foundational philosophy: when people learn, they think differently, create, and transform their communities.',
      attachmentsNotes: 'Annex A: Participant Breakdown; Annex B: Policy Brief Executive Summaries.'
    }
  },
  {
    id: 'programme-report',
    category: 'reports',
    title: 'Programme Report',
    description: 'Detailed report on executed programmes, workshops, or bootcamps.',
    codePrefix: 'NW-RPT',
    defaultFormData: {
      reportTitle: 'THE PRODUCTIVE DISCOURSE (TPD) QUARTERLY REPORT',
      programmeOrProject: 'TPD Weekly Leadership Series',
      location: 'Virtual Portal',
      preparedBy: 'TPD Executive Committee',
      position: 'Programme Coordinator',
      executiveSummary: 'A summary of 12 weekly sessions covering economic development, technology ethics, public health, and climate resilience.',
      introduction: 'TPD serves as NationsWorld\'s premier weekly platform for learning, reflection, and actionable discourse.',
      objectives: 'To stimulate critical thinking, foster cross-disciplinary collaboration, and generate practical ideas.',
      activities: '12 virtual keynote lectures, 6 panel sessions, and 4 policy ideation labs.',
      participants: 'Aggregate attendance of 850 participants across all sessions.',
      outcomes: 'Generated 5 actionable project concepts now undergoing development.',
      challenges: 'Intermittent internet connectivity in some regional delegate centers.',
      recommendations: 'Record and archive all sessions for asynchronous learning access.',
      conclusion: 'TPD continues to prove itself as a vital engine for visionary growth.',
      attachmentsNotes: 'Session attendance logs and presenter slide decks.'
    }
  },
  {
    id: 'event-report',
    category: 'reports',
    title: 'Event Report',
    description: 'Post-event evaluation and summary report.',
    codePrefix: 'NW-RPT',
    defaultFormData: {
      reportTitle: 'NATIONSWORLD YOUTH LEADERSHIP SUMMIT REPORT',
      programmeOrProject: 'Annual Visionary Summit',
      location: 'Main Auditorium & Online Stream',
      preparedBy: 'Summit Organizing Committee',
      position: 'Event Lead',
      executiveSummary: 'Comprehensive overview of the annual summit bringing together emerging leaders and researchers.',
      introduction: 'The summit addressed the theme: Building People. Advancing Ideas. Creating the Future.',
      objectives: 'Empower youth leaders, showcase innovative prototypes, and build international networks.',
      activities: 'Opening plenary, 4 breakout panel sessions, innovation pitch showcase, and networking reception.',
      participants: '320 in-person delegates and over 1,200 online live stream viewers.',
      outcomes: 'Awarded 3 innovation seed grants and launched the NationsWorld Mentorship Circle.',
      challenges: 'Venue capacity limitations due to higher-than-expected turnout.',
      recommendations: 'Secure a larger physical venue for the next edition and expand hybrid streaming features.',
      conclusion: 'The summit reinforced NationsWorld\'s position as a premier catalyst for youth advancement.',
      attachmentsNotes: 'Event photographs, media coverage links, and delegate feedback surveys.'
    }
  },
  {
    id: 'project-report',
    category: 'reports',
    title: 'Project Report',
    description: 'Report tracking milestone execution and outcomes of specific projects.',
    codePrefix: 'NW-RPT',
    defaultFormData: {
      reportTitle: 'COMMUNITY HEALTH ACCELERATOR PROJECT REPORT',
      programmeOrProject: 'Health & Public Health Team Initiative',
      location: 'Sub-Saharan Field Stations',
      preparedBy: 'Project Management Office',
      position: 'Field Director',
      executiveSummary: 'Progress report on the pilot deployment of community health awareness toolkits.',
      introduction: 'Initiated to enhance public health literacy and community resilience.',
      objectives: 'Train 50 community health champions and distribute 1,000 health literacy guides.',
      activities: 'Curriculum creation, workshop training, field distribution, and impact evaluation.',
      participants: '55 trained health champions across 4 local government districts.',
      outcomes: 'Directly reached 2,400 community residents with preventive health information.',
      challenges: 'Logistical transport across rural terrain during rainy season.',
      recommendations: 'Partner with local transport cooperatives for smoother distribution.',
      conclusion: 'The pilot project successfully met and exceeded its core performance metrics.',
      attachmentsNotes: 'Field survey metrics and champion certification records.'
    }
  },

  {
    id: 'proposal',
    category: 'organizational',
    title: 'Proposal Document',
    description: 'Formal project or initiative proposal.',
    codePrefix: 'NW-ORG',
    defaultFormData: {
      documentTitle: 'PROPOSAL FOR NATIONSWORLD INNOVATION LAB HUB',
      targetAudience: 'NATIONSWORLD BOARD & PARTNERS',
      preparedBy: 'Technology & Digital Transformation Team',
      position: 'Innovation Lead',
      summary: 'A proposal to establish a physical and virtual incubator lab for prototyping social technology solutions.',
      mainBody: 'Background:\nNationsWorld researchers and creators require structured technical infrastructure to build digital tools.\n\nProject Scope:\n1. Open-source software development environment.\n2. Policy research data repository.\n3. Prototype mentorship program.',
      actionItems: '1. Approve initial budget allocation.\n2. Confirm technical advisor roster.\n3. Launch call for builder applications.',
      signatureImage: ''
    }
  },
  {
    id: 'memo',
    category: 'organizational',
    title: 'Internal Memorandum',
    description: 'Official internal memo for policy or directive updates.',
    codePrefix: 'NW-ORG',
    defaultFormData: {
      documentTitle: 'MEMORANDUM: UPDATED RESEARCH & PUBLICATION GUIDELINES',
      targetAudience: 'ALL TEAMS, INSTITUTES & MEMBERS',
      preparedBy: 'Office of the Executive Secretariat',
      position: 'Head of Operations',
      summary: 'Guidance on document formatting, reference generation, and publishing standards across NationsWorld.',
      mainBody: 'Effective immediately, all official working papers, policy briefs, and event reports generated within NationsWorld must utilize the official Production Hub templates and reference formatting.\n\nThis ensures unified institutional quality and data integrity across all global chapters.',
      actionItems: 'Team leads are instructed to verify that all upcoming publications adhere to this directive.',
      signatureImage: ''
    }
  },
  {
    id: 'notice',
    category: 'organizational',
    title: 'Public Notice',
    description: 'Formal announcement or official public notice.',
    codePrefix: 'NW-ORG',
    defaultFormData: {
      documentTitle: 'PUBLIC NOTICE: MEMBERSHIP APPLICATION CYCLE OPENING',
      targetAudience: 'PUBLIC & PROSPECTIVE APPLICANTS',
      preparedBy: 'Membership & Accreditation Council',
      position: 'Chief Registrar',
      summary: 'Official notification regarding the opening of Stage 1 Membership Applications for the new academic cycle.',
      mainBody: 'NationsWorld of Visionary Advancement hereby announces that applications for Stage 1 prospective membership are officially open.\n\nApplicants from research, innovation, leadership, and development backgrounds are invited to apply through the official online portal.',
      actionItems: 'Interested candidates should visit the NationsWorld Membership Portal to complete their application.',
      signatureImage: ''
    }
  },
  {
    id: 'statement',
    category: 'organizational',
    title: 'Official Statement',
    description: 'Institutional press release or policy position statement.',
    codePrefix: 'NW-ORG',
    defaultFormData: {
      documentTitle: 'STATEMENT ON YOUTH INNOVATION AND SUSTAINABLE DEVELOPMENT',
      targetAudience: 'MEDIA & DEVELOPMENT PARTNERS',
      preparedBy: 'Media, Communications & Public Affairs Team',
      position: 'Director of Public Affairs',
      summary: 'NationsWorld reaffirms its commitment to youth-led research and evidence-based policy.',
      mainBody: 'NationsWorld of Visionary Advancement emphasizes that sustainable advancement is impossible without investing in human potential.\n\nWe call upon global institutions to prioritize youth involvement in policy formulation, climate action, and digital innovation.',
      actionItems: 'NationsWorld will publish its annual Visionary Advancement Index next month.',
      signatureImage: ''
    }
  },
  {
    id: 'meeting-document',
    category: 'organizational',
    title: 'Meeting Minutes / Document',
    description: 'Official record of executive board or team meeting proceedings.',
    codePrefix: 'NW-ORG',
    defaultFormData: {
      documentTitle: 'EXECUTIVE COUNCIL MEETING MINUTES',
      targetAudience: 'EXECUTIVE COUNCIL MEMBERS',
      preparedBy: 'Secretariat General',
      position: 'Recording Secretary',
      summary: 'Record of proceedings, resolutions, and action items from the 4th Quarter Strategic Planning Meeting.',
      mainBody: 'Present: Executive President, Vice Presidents, Directors of Institutes, Secretariat Team.\n\nAgenda:\n1. Review of annual programme milestones.\n2. Approval of Production Hub launch.\n3. Regional expansion plans.',
      actionItems: '1. Production Hub finalized for immediate deployment.\n2. Regional chapters in Ghana and Kenya to be chartered by Q1.',
      signatureImage: ''
    }
  },

  {
    id: 'participation-certificate',
    category: 'certificates',
    title: 'Participation Certificate',
    description: 'Certificate awarded for active participation in a NationsWorld programme.',
    codePrefix: 'NW-CRT',
    defaultFormData: {
      recipientName: 'David O. Adeleke',
      programmeOrEvent: 'The Productive Discourse (TPD) Masterclass Series',
      achievementTitle: 'for active participation and valuable contributions during the intensive 6-week visionary leadership discourse.',
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      certificateNumber: 'NW-CRT-2026-PART-0102',
      authorizedSignatoryName: 'Amb. Emmanuel Okafor',
      authorizedSignatoryTitle: 'Executive President, NationsWorld'
    }
  },
  {
    id: 'appreciation-certificate',
    category: 'certificates',
    title: 'Appreciation Certificate',
    description: 'Certificate recognizing outstanding service, keynote delivery, or partnership.',
    codePrefix: 'NW-CRT',
    defaultFormData: {
      recipientName: 'Dr. Sarah Jenkins',
      programmeOrEvent: 'NationsWorld Global Research Symposium',
      achievementTitle: 'in profound appreciation for serving as Keynote Speaker and advancing multidisciplinary research excellence.',
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      certificateNumber: 'NW-CRT-2026-APP-0482',
      authorizedSignatoryName: 'Prof. Abubakar Sani',
      authorizedSignatoryTitle: 'Head of Academic Board, NASDI'
    }
  },
  {
    id: 'achievement-certificate',
    category: 'certificates',
    title: 'Achievement Certificate',
    description: 'Certificate for project completion, innovation award, or honor.',
    codePrefix: 'NW-CRT',
    defaultFormData: {
      recipientName: 'Michael K. Mensah',
      programmeOrEvent: 'Visionary Innovation Challenge 2026',
      achievementTitle: 'for winning 1st Place in Sustainable Agritech Innovation with the Smart Agri-Net Project.',
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      certificateNumber: 'NW-CRT-2026-ACH-0911',
      authorizedSignatoryName: 'Clara Vance',
      authorizedSignatoryTitle: 'Director of Innovation & Production'
    }
  },
  {
    id: 'programme-certificate',
    category: 'certificates',
    title: 'Programme Certificate',
    description: 'Formal certificate for completing a fellowship, institute track, or course.',
    codePrefix: 'NW-CRT',
    defaultFormData: {
      recipientName: 'Blessing C. Nwachukwu',
      programmeOrEvent: 'NASDI Sustainable Policy & Research Fellowship',
      achievementTitle: 'having successfully fulfilled all requirements, published research papers, and demonstrated leadership excellence.',
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      certificateNumber: 'NW-CRT-2026-PRG-0055',
      authorizedSignatoryName: 'Amb. Emmanuel Okafor',
      authorizedSignatoryTitle: 'Executive Director, NationsWorld'
    }
  }
];

export function getTemplateById(id: string): TemplateDefinition | undefined {
  return PRODUCTION_TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: DocumentCategory): TemplateDefinition[] {
  return PRODUCTION_TEMPLATES.filter((t) => t.category === category);
}
