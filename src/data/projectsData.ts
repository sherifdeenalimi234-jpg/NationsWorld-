export const PROJECT_CYCLE = '2026-OCTOBER';

// Development Mode flag - set to true during testing/debugging to show reset controls
export const DEV_MODE = true;

export interface ProjectSlot {
  id: string;
  number: number;
  title: string;
  category: string;
  type: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Executive';
  duration: string;
  description: string;
  objective: string;
  researchQuestion: string;
  instructions: string[];
  deliverables: string[];
}

export const PROJECTS_DATA: ProjectSlot[] = [
  {
    id: 'P01',
    number: 1,
    title: 'AI Governance & Ethics Frameworks in Emerging Public Sectors',
    category: 'Governance & Technology',
    type: 'Policy Research Paper',
    difficulty: 'Advanced',
    duration: '10–14 days',
    description: 'Investigating institutional strategies for deploying artificial intelligence in public administration while safeguarding citizen privacy and equity.',
    objective: 'Formulate an actionable governance blueprint for public sector AI integration.',
    researchQuestion: 'How can developing public institutions balance rapid AI adoption with transparent, equitable policy governance?',
    instructions: [
      'Conduct a comparative literature analysis of global AI governance standards.',
      'Assess regulatory challenges in low-resource administrative environments.',
      'Draft policy recommendations tailored to institutional oversight.'
    ],
    deliverables: ['Policy Briefing Document (PDF/DOCX)', 'Executive Summary Matrix']
  },
  {
    id: 'P02',
    number: 2,
    title: 'Sustainable Rural Microgrid Infrastructure & Financial Models',
    category: 'Sustainable Development',
    type: 'Feasibility & Strategy Report',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Analyzing scalable microgrid models and community financing structures for off-grid rural electrification.',
    objective: 'Design a self-sustaining financial framework for off-grid renewable energy projects.',
    researchQuestion: 'Which economic models ensure long-term maintenance and financial viability for rural microgrids?',
    instructions: [
      'Evaluate existing decentralized energy case studies across developing regions.',
      'Model capital expenditure vs. community-based subscription models.',
      'Synthesize risk mitigation guidelines for local operators.'
    ],
    deliverables: ['Energy Strategy Report', 'Financial Viability Model']
  },
  {
    id: 'P03',
    number: 3,
    title: 'Youth Skills Alignment for the Modern African Knowledge Economy',
    category: 'Youth Development & Education',
    type: 'Strategic Whitepaper',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Examining curriculum reform and industry partnerships needed to bridge the gap between academic output and emerging technology careers.',
    objective: 'Propose a national framework for vocational-technical skill modernization.',
    researchQuestion: 'How can educational curricula be dynamically realigned with high-growth technology sectors?',
    instructions: [
      'Map industry skill demand metrics against current tertiary learning outcomes.',
      'Identify critical gap areas in digital literacy and specialized technical skills.',
      'Draft institutional recommendations for university-industry partnerships.'
    ],
    deliverables: ['Human Capital Whitepaper', 'Curriculum Reform Roadmap']
  },
  {
    id: 'P04',
    number: 4,
    title: 'Digital ID Systems & Inclusive Financial Access in Developing Nations',
    category: 'Public Policy',
    type: 'Research & Policy Brief',
    difficulty: 'Advanced',
    duration: '10–14 days',
    description: 'Evaluating sovereign digital identity architectures and their impact on unbanked population inclusion.',
    objective: 'Provide policy guidance on secure digital ID implementation for economic inclusion.',
    researchQuestion: 'What privacy mechanisms and biometric standards maximize financial inclusion without expanding digital surveillance risks?',
    instructions: [
      'Analyze national identity infrastructure rollouts across global emerging markets.',
      'Evaluate cybersecurity risks, data sovereignty, and interoperability.',
      'Synthesize structural safeguards for marginalized demographics.'
    ],
    deliverables: ['Digital Policy Paper', 'Implementation Guideline Checklist']
  },
  {
    id: 'P05',
    number: 5,
    title: 'Urban Water Resilience & Climate Adaptation in Coastal Cities',
    category: 'Environment',
    type: 'Environmental Strategy Plan',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Developing urban planning strategies to mitigate flood vulnerability and secure potable water supply in coastal metropolises.',
    objective: 'Create an integrated coastal urban water management framework.',
    researchQuestion: 'How can rapidly expanding coastal cities retrofit infrastructure to withstand rising sea levels and intense precipitation?',
    instructions: [
      'Review hydrological climate models and municipal infrastructure vulnerability.',
      'Analyze nature-based solutions alongside heavy engineering interventions.',
      'Outline priority investment areas for municipal water authorities.'
    ],
    deliverables: ['Urban Resilience Strategy Report', 'Action Framework']
  },
  {
    id: 'P06',
    number: 6,
    title: 'Institutional Capacity Building in Sub-National Governance',
    category: 'Governance',
    type: 'Institutional Assessment Report',
    difficulty: 'Advanced',
    duration: '10–14 days',
    description: 'Strengthening local government financial management, public accountability, and administrative decentralization.',
    objective: 'Draft a reform blueprint for municipal governance and fiscal decentralization.',
    researchQuestion: 'What institutional mechanisms improve revenue generation and service delivery at local government levels?',
    instructions: [
      'Assess current legislative and administrative bottlenecks in local governance.',
      'Review successful fiscal decentralization models in comparable jurisdictions.',
      'Design capacity-building modules for municipal administrators.'
    ],
    deliverables: ['Governance Reform Blueprint', 'Capacity Assessment Framework']
  },
  {
    id: 'P07',
    number: 7,
    title: 'Cross-Border Agricultural Value Chain & Trade Optimization',
    category: 'Innovation & Trade',
    type: 'Economic Analysis Paper',
    difficulty: 'Advanced',
    duration: '10–14 days',
    description: 'Optimizing regional agricultural corridors through digital customs clearance, cold storage logistics, and trade policy harmonization.',
    objective: 'Develop an integrated strategy for reducing post-harvest losses and trade friction across borders.',
    researchQuestion: 'How can regional trade agreements leverage digital supply chains to accelerate intra-continental food security?',
    instructions: [
      'Analyze non-tariff trade barriers affecting agricultural logistics.',
      'Assess cold-chain infrastructure deficits and technology solutions.',
      'Formulate policy recommendations for regional trade corridors.'
    ],
    deliverables: ['Trade Corridor Assessment', 'Logistics Policy Brief']
  },
  {
    id: 'P08',
    number: 8,
    title: 'Community Health Worker Networks & Primary Care Scalability',
    category: 'Community Development',
    type: 'Public Health Action Plan',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Evaluating mobile health (mHealth) tools and decentralized training models to expand primary healthcare delivery in remote districts.',
    objective: 'Formulate an operational roadmap for scaling community health worker capacity.',
    researchQuestion: 'How can digital point-of-care tools enhance diagnostic accuracy and retention among rural healthcare extension officers?',
    instructions: [
      'Survey mHealth adoption rates and workflow bottlenecks in primary care.',
      'Formulate standardized training protocols for community health teams.',
      'Draft scalability guidelines for public health ministries.'
    ],
    deliverables: ['Health Strategy Plan', 'mHealth Deployment Guide']
  },
  {
    id: 'P09',
    number: 9,
    title: 'Transformative Leadership in Higher Education Institutions',
    category: 'Leadership & Education',
    type: 'Leadership Case Study Analysis',
    difficulty: 'Executive',
    duration: '10–14 days',
    description: 'Analyzing institutional leadership strategies that foster research innovation, academic integrity, and commercial technology transfer.',
    objective: 'Develop a university governance model for research commercialization.',
    researchQuestion: 'What leadership behaviors and institutional structures accelerate academic transition into market-relevant innovation?',
    instructions: [
      'Evaluate top-performing university incubator frameworks.',
      'Identify key administrative barriers to academic entrepreneurship.',
      'Construct a strategic leadership roadmap for university vice-chancellors.'
    ],
    deliverables: ['Academic Leadership Framework', 'Incubator Strategy Brief']
  },
  {
    id: 'P10',
    number: 10,
    title: 'Circular Economy Strategies for Municipal Solid Waste Management',
    category: 'Sustainable Development',
    type: 'Sustainability Assessment',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Designing closed-loop waste recovery, organic composting, and plastics recycling models for rapidly growing urban centers.',
    objective: 'Formulate a municipal circular waste transition strategy.',
    researchQuestion: 'How can informal waste sector networks be formalized and integrated into municipal circular economic systems?',
    instructions: [
      'Examine waste generation metrics and informal collection supply chains.',
      'Develop incentive models for material sorting and processing at source.',
      'Draft municipal waste policy recommendations.'
    ],
    deliverables: ['Circular Economy Blueprint', 'Waste Integration Plan']
  },
  {
    id: 'P11',
    number: 11,
    title: 'Fintech Regulation & Consumer Protection in High-Growth Economies',
    category: 'Public Policy & Innovation',
    type: 'Regulatory Policy Document',
    difficulty: 'Advanced',
    duration: '10–14 days',
    description: 'Balancing financial technology innovation (BNPL, micro-lending, digital wallets) with robust consumer data protection and debt prevention.',
    objective: 'Propose a balanced regulatory sandbox model for fintech expansion.',
    researchQuestion: 'How can regulatory authorities protect retail consumers from predatory digital lending while preserving fintech venture growth?',
    instructions: [
      'Review regulatory sandbox frameworks from global central banks.',
      'Analyze systemic credit risks in algorithmically driven micro-loans.',
      'Formulate consumer disclosure standards and interest rate transparency rules.'
    ],
    deliverables: ['Fintech Regulation Paper', 'Sandbox Guidelines']
  },
  {
    id: 'P12',
    number: 12,
    title: 'Early Childhood Development & Cognitive Investment Frameworks',
    category: 'Human Capital Development',
    type: 'Social Policy Blueprint',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Investigating public investment models in early childhood nutrition, pre-primary education, and parental support programs.',
    objective: 'Design an integrated early childhood intervention model for local governments.',
    researchQuestion: 'What structural interventions yield the highest long-term cognitive and socio-economic returns in underserved communities?',
    instructions: [
      'Synthesize economic evidence on early childhood interventions.',
      'Assess current community-based early learning centers.',
      'Formulate multi-sectoral public funding recommendations.'
    ],
    deliverables: ['Social Policy Brief', 'Investment Impact Model']
  },
  {
    id: 'P13',
    number: 13,
    title: 'Smart Cities & Data-Driven Municipal Infrastructure Optimization',
    category: 'Technology',
    type: 'Technical Strategy Report',
    difficulty: 'Advanced',
    duration: '10–14 days',
    description: 'Deploying IoT sensor networks, traffic management algorithms, and energy-efficient public lighting in mid-sized urban centers.',
    objective: 'Formulate a smart city deployment roadmap suited to developing infrastructure.',
    researchQuestion: 'How can cities leverage low-cost IoT networks to optimize public utility performance under constrained municipal budgets?',
    instructions: [
      'Evaluate open-source IoT architecture for municipal asset monitoring.',
      'Map data governance and cybersecurity standards for smart urban grids.',
      'Draft a phased implementation matrix for city engineers.'
    ],
    deliverables: ['Smart City Technical Strategy', 'IoT Deployment Matrix']
  },
  {
    id: 'P14',
    number: 14,
    title: 'Civic Technology Platforms for Transparent Public Procurement',
    category: 'Governance & Technology',
    type: 'Governance Innovation Whitepaper',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Leveraging open-data standards and blockchain tracking to eliminate corruption in municipal and national tender processes.',
    objective: 'Propose an open-contracting e-procurement model for public tenders.',
    researchQuestion: 'How can open contracting data standards enhance public trust and reduce budget leaks in government procurement?',
    instructions: [
      'Analyze international Open Contracting Data Standard (OCDS) deployments.',
      'Identify key vulnerabilities in traditional paper-based procurement.',
      'Draft technical specifications for citizen audit dashboards.'
    ],
    deliverables: ['e-Procurement Innovation Brief', 'Civic Audit Architecture']
  },
  {
    id: 'P15',
    number: 15,
    title: 'Renewable Energy Industrialization & Local Manufacturing Policies',
    category: 'Sustainable Development & Policy',
    type: 'Industrial Policy Paper',
    difficulty: 'Executive',
    duration: '10–14 days',
    description: 'Evaluating local content requirements and incentive frameworks to build domestic solar panel and battery assembly capabilities.',
    objective: 'Design a national green industrial policy for renewable technology manufacturing.',
    researchQuestion: 'What policy levers enable emerging markets to transition from technology importers to domestic producers of renewable components?',
    instructions: [
      'Assess global clean technology supply chains and raw material dependencies.',
      'Review tariff incentives, tax credits, and special economic zones.',
      'Outline actionable policy guidelines for trade and industry ministries.'
    ],
    deliverables: ['Green Industrial Policy Paper', 'Local Component Strategy']
  },
  {
    id: 'P16',
    number: 16,
    title: 'Women in STEM Leadership & Entrepreneurship Acceleration',
    category: 'Leadership & Human Capital',
    type: 'Strategic Program Proposal',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Creating systemic support structures, venture funding pipelines, and mentorship networks for female technology leaders.',
    objective: 'Develop an institutional acceleration model for women-led technical ventures.',
    researchQuestion: 'Which structural capital mechanisms most effectively reduce venture funding disparities for women technical founders?',
    instructions: [
      'Analyze demographic data in venture capital allocation and STEM academia.',
      'Review model incubator programs supporting underrepresented founders.',
      'Construct a comprehensive accelerator program blueprint.'
    ],
    deliverables: ['STEM Acceleration Strategy', 'Venture Pipeline Model']
  },
  {
    id: 'P17',
    number: 17,
    title: 'Climate Risk Insurance & Micro-Protection for Smallholder Farmers',
    category: 'Environment & Public Policy',
    type: 'Financial Protection Report',
    difficulty: 'Advanced',
    duration: '10–14 days',
    description: 'Designing index-based weather micro-insurance and satellite-monitored compensation schemes for vulnerable agricultural communities.',
    objective: 'Formulate an equitable parametric micro-insurance framework for smallholder agriculture.',
    researchQuestion: 'How can satellite remote-sensing data reduce moral hazard and verification costs in agricultural insurance?',
    instructions: [
      'Evaluate parametric insurance models in climate-vulnerable agricultural zones.',
      'Analyze mobile payment integration for rapid insurance payout distribution.',
      'Synthesize public-private partnership guidelines for agricultural ministries.'
    ],
    deliverables: ['Parametric Insurance Blueprint', 'Payout Mechanism Guideline']
  },
  {
    id: 'P18',
    number: 18,
    title: 'Re-Engineering Technical & Vocational Education (TVET) Systems',
    category: 'Education & Youth Development',
    type: 'Educational Reform Whitepaper',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Modernizing TVET institutions with modern apprenticeship pathways, digital certifications, and adaptive learning tools.',
    objective: 'Formulate a national strategy for TVET system modernization and prestige enhancement.',
    researchQuestion: 'How can vocational education overcome social stigma and deliver high-value technical competencies for modern industries?',
    instructions: [
      'Examine successful dual-education vocational models (e.g., German/Swiss systems).',
      'Assess digital learning tools suitable for technical skill instruction.',
      'Draft institutional recommendations for national TVET boards.'
    ],
    deliverables: ['TVET Modernization Paper', 'Apprenticeship Framework']
  },
  {
    id: 'P19',
    number: 19,
    title: 'Cybersecurity Infrastructure & National Critical Asset Defense',
    category: 'Technology & Governance',
    type: 'Cybersecurity Policy Strategy',
    difficulty: 'Executive',
    duration: '10–14 days',
    description: 'Formulating national cybersecurity protocols for power grids, telecommunications networks, and banking clearinghouses.',
    objective: 'Design a national critical infrastructure protection (CIP) cybersecurity policy.',
    researchQuestion: 'What threat-sharing mechanisms and incident response architectures best protect sovereign digital assets from ransomware and state actors?',
    instructions: [
      'Review international cybersecurity frameworks (NIST, ISO 27001).',
      'Assess current vulnerability exposure across critical utility networks.',
      'Formulate a national Computer Emergency Response Team (CERT) operational structure.'
    ],
    deliverables: ['National CIP Cybersecurity Paper', 'CERT Operational Matrix']
  },
  {
    id: 'P20',
    number: 20,
    title: 'Decentralized Social Housing & Inclusive Urban Regeneration',
    category: 'Community Development',
    type: 'Urban Housing Strategy',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Investigating modular construction, land-trust financing, and community tenancy management to address acute urban housing deficits.',
    objective: 'Develop an affordable urban housing development framework for municipal authorities.',
    researchQuestion: 'How can community land trusts prevent gentrification and ensure permanent housing affordability in growing metropolitan areas?',
    instructions: [
      'Review land tenure legislation and modular housing technologies.',
      'Analyze public-private housing delivery models.',
      'Draft municipal housing policy recommendations.'
    ],
    deliverables: ['Housing Strategy Report', 'Land-Trust Operational Guide']
  },
  {
    id: 'P21',
    number: 21,
    title: 'E-Governance & Digital Public Service Delivery Optimization',
    category: 'Governance & Public Policy',
    type: 'Public Sector Digital Strategy',
    difficulty: 'Advanced',
    duration: '10–14 days',
    description: 'Transitioning municipal and ministry paper processes to single-window digital citizen portals (permits, licensing, vital statistics).',
    objective: 'Formulate a single-window digital public service delivery roadmap.',
    researchQuestion: 'What service design principles maximize digital government portal adoption across citizens with varying digital literacy?',
    instructions: [
      'Evaluate global e-governance leaders (e.g., Estonia, Singapore).',
      'Map workflow friction in traditional civil registry and business licensing.',
      'Synthesize user-centric design principles for civil service IT departments.'
    ],
    deliverables: ['e-Governance Strategy Paper', 'Digital Portal Blueprint']
  },
  {
    id: 'P22',
    number: 22,
    title: 'Indigenous Knowledge Preservation & Sustainable Biodiversity Trade',
    category: 'Environment & Innovation',
    type: 'Bioeconomy Policy Paper',
    difficulty: 'Intermediate',
    duration: '7–10 days',
    description: 'Protecting traditional botanical knowledge through intellectual property frameworks and ethical commercial bio-prospecting agreements.',
    objective: 'Develop a national framework for ethical bio-prospecting and benefit sharing.',
    researchQuestion: 'How can Nagoya Protocol compliance protect indigenous rights while enabling commercial pharmaceutical and cosmetic innovation?',
    instructions: [
      'Review international biodiversity and fair benefit-sharing treaties.',
      'Identify legal gaps in traditional knowledge IP protection.',
      'Draft community consent guidelines for commercial bioprospectors.'
    ],
    deliverables: ['Bioeconomy Policy Brief', 'Benefit-Sharing Guidelines']
  },
  {
    id: 'P23',
    number: 23,
    title: 'Crisis Communications & Institutional Leadership in Pandemics',
    category: 'Leadership & Public Policy',
    type: 'Executive Leadership Strategy',
    difficulty: 'Executive',
    duration: '10–14 days',
    description: 'Analyzing institutional leadership during public health emergencies, countering misinformation, and maintaining public trust.',
    objective: 'Formulate a crisis leadership and risk communication protocol for public agencies.',
    researchQuestion: 'What communication strategies effectively counter digital health misinformation while maintaining institutional authority?',
    instructions: [
      'Analyze communication case studies from recent global emergency responses.',
      'Evaluate social media monitoring tools and rapid-response verification protocols.',
      'Construct a comprehensive crisis communications playbook for health leaders.'
    ],
    deliverables: ['Crisis Leadership Framework', 'Risk Communication Playbook']
  },
  {
    id: 'P24',
    number: 24,
    title: 'Regional Supply Chain Resilience & Critical Infrastructure Security',
    category: 'Innovation & Governance',
    type: 'Supply Chain Strategy Paper',
    difficulty: 'Executive',
    duration: '10–14 days',
    description: 'Mitigating maritime port congestion, border bottlenecks, and fuel supply shocks through strategic reserves and multi-modal logistics.',
    objective: 'Design a national supply chain risk mitigation and strategic reserve plan.',
    researchQuestion: 'How can developing trade hubs build buffer resilience against global geopolitical and maritime logistics disruptions?',
    instructions: [
      'Model critical supply chain vulnerabilities across primary import/export hubs.',
      'Analyze multi-modal freight backup strategies (rail, road, maritime).',
      'Formulate strategic reserve policy recommendations for national security councils.'
    ],
    deliverables: ['Supply Chain Resilience Strategy', 'Strategic Reserve Guidelines']
  }
];

export function getProjectByNumber(num: number): ProjectSlot | undefined {
  return PROJECTS_DATA.find((p) => p.number === num);
}

export function getProjectById(id: string): ProjectSlot | undefined {
  return PROJECTS_DATA.find((p) => p.id === id);
}
