import React from 'react';
import type { DocumentTypeId, DocumentTypeInfo } from '../../../types/documentStudio';
import {
  Mail,
  UserCheck,
  CalendarCheck,
  Award,
  FileSpreadsheet,
  FileText,
  Lightbulb,
  FileCheck2,
  FolderKanban,
  Send,
  Megaphone,
  Bell,
  ThumbsUp,
  Files,
  Check,
} from 'lucide-react';

export const DOCUMENT_TYPE_DEFINITIONS: DocumentTypeInfo[] = [
  {
    id: 'official-letter',
    name: 'Official Letter',
    description: 'Formal Secretariat communication, partnership letters, and official communiqués.',
    category: 'Letters',
    iconName: 'Mail',
  },
  {
    id: 'appointment-letter',
    name: 'Appointment Letter',
    description: 'Formal role designation, fellow appointment, and institutional commission.',
    category: 'Letters',
    iconName: 'UserCheck',
  },
  {
    id: 'invitation-letter',
    name: 'Invitation Letter',
    description: 'Official invitation to summit, conference, research panel, or programme.',
    category: 'Letters',
    iconName: 'CalendarCheck',
  },
  {
    id: 'certificate',
    name: 'Certificate',
    description: 'Certificate of recognition, fellowship achievement, or appreciation.',
    category: 'Certificates',
    iconName: 'Award',
  },
  {
    id: 'report',
    name: 'General Report',
    description: 'Multi-page activity, event, or institutional operational report.',
    category: 'Reports',
    iconName: 'FileSpreadsheet',
  },
  {
    id: 'research-report',
    name: 'Research Report',
    description: 'In-depth scholarly or policy research report with methodology and findings.',
    category: 'Reports',
    iconName: 'FileText',
  },
  {
    id: 'research-proposal',
    name: 'Research Proposal',
    description: 'Structured proposal outlining research objectives, literature, and methodology.',
    category: 'Reports',
    iconName: 'Lightbulb',
  },
  {
    id: 'policy-brief',
    name: 'Policy Brief',
    description: 'Concise policy analysis with executive summary, evidence, and recommendations.',
    category: 'Reports',
    iconName: 'FileCheck2',
  },
  {
    id: 'project-report',
    name: 'Project Report',
    description: 'Comprehensive Project Room cycle report and implementation metrics.',
    category: 'Reports',
    iconName: 'FolderKanban',
  },
  {
    id: 'memo',
    name: 'Memo (Memorandum)',
    description: 'Internal secretariat briefing, directive, or decision note.',
    category: 'Organizational',
    iconName: 'Send',
  },
  {
    id: 'press-release',
    name: 'Press Release',
    description: 'Official public announcement or media communiqué.',
    category: 'Organizational',
    iconName: 'Megaphone',
  },
  {
    id: 'official-notice',
    name: 'Official Notice',
    description: 'Public directive, policy update, or administrative announcement.',
    category: 'Organizational',
    iconName: 'Bell',
  },
  {
    id: 'recommendation-letter',
    name: 'Recommendation Letter',
    description: 'Official letter of endorsement and recommendation.',
    category: 'Letters',
    iconName: 'ThumbsUp',
  },
  {
    id: 'other',
    name: 'Other Document',
    description: 'Custom NationsWorld institutional document or publication.',
    category: 'General',
    iconName: 'Files',
  },
];

const renderIcon = (id: string) => {
  switch (id) {
    case 'official-letter': return <Mail className="w-5 h-5" />;
    case 'appointment-letter': return <UserCheck className="w-5 h-5" />;
    case 'invitation-letter': return <CalendarCheck className="w-5 h-5" />;
    case 'certificate': return <Award className="w-5 h-5" />;
    case 'report': return <FileSpreadsheet className="w-5 h-5" />;
    case 'research-report': return <FileText className="w-5 h-5" />;
    case 'research-proposal': return <Lightbulb className="w-5 h-5" />;
    case 'policy-brief': return <FileCheck2 className="w-5 h-5" />;
    case 'project-report': return <FolderKanban className="w-5 h-5" />;
    case 'memo': return <Send className="w-5 h-5" />;
    case 'press-release': return <Megaphone className="w-5 h-5" />;
    case 'official-notice': return <Bell className="w-5 h-5" />;
    case 'recommendation-letter': return <ThumbsUp className="w-5 h-5" />;
    case 'other': default: return <Files className="w-5 h-5" />;
  }
};

interface DocumentTypeSelectorProps {
  selectedTypeId: DocumentTypeId | null;
  onSelectType: (typeId: DocumentTypeId) => void;
}

export const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  selectedTypeId,
  onSelectType,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-sans">
      <div className="mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-[#12A875] block mb-1">
          02 TARGET DOCUMENT TYPE
        </span>
        <h2 className="text-2xl font-black text-[#063B2E] tracking-tight">
          What do you want this document to become?
        </h2>
        <p className="text-xs sm:text-sm text-[#374151] mt-1 font-medium">
          Select the NationsWorld document format best suited for your content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOCUMENT_TYPE_DEFINITIONS.map((docType) => {
          const isSelected = selectedTypeId === docType.id;
          return (
            <div
              key={docType.id}
              onClick={() => onSelectType(docType.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group relative ${
                isSelected
                  ? 'border-[#12A875] bg-emerald-50/70 shadow-md ring-2 ring-[#12A875]/20'
                  : 'border-slate-200 bg-white hover:border-[#12A875] hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#063B2E] text-white'
                        : 'bg-emerald-100 text-[#063B2E] group-hover:bg-[#063B2E] group-hover:text-white'
                    }`}
                  >
                    {renderIcon(docType.id)}
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-100 text-[#64748B]">
                    {docType.category}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-[#063B2E] mb-1 group-hover:text-[#12A875] transition-colors">
                  {docType.name}
                </h3>
                <p className="text-xs text-[#374151] leading-relaxed font-medium">
                  {docType.description}
                </p>
              </div>

              {isSelected && (
                <div className="mt-4 pt-2 border-t border-emerald-200 flex items-center gap-1.5 text-xs font-black text-[#12A875]">
                  <Check className="w-4 h-4" />
                  <span>Selected Target Format</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
