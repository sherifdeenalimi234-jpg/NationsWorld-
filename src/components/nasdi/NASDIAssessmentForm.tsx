import React, { useState, useEffect } from 'react';
import {
  Save,
  FileDown,
  Eye,
  Send,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  FileText,
  Clock,
  BookOpen,
} from 'lucide-react';
import {
  type UserAccount,
  type AssessmentSubmission,
  type EvidenceDocument,
  type ScaleRating,
  getLeadershipPositions,
  getDepartments,
  getDraftSubmission,
  saveDraftSubmission,
  submitAssessment,
  createDefaultSectionA,
  createDefaultSectionB,
  createDefaultSectionC,
  createDefaultSectionD,
  createDefaultSectionE,
  createDefaultSectionF,
  createDefaultSectionG,
  createDefaultSectionH,
  createDefaultSectionI,
} from '../../services/nasdiStorage';
import { downloadNASDIAssessmentPDF } from '../../utils/nasdiPdfGenerator';

interface NASDIAssessmentFormProps {
  currentUser: UserAccount;
  existingSubmission?: AssessmentSubmission | null;
  onSubmissionSuccess?: (submission: AssessmentSubmission) => void;
}

const SECTION_KEYS = [
  { id: 'A', title: 'A. Personal Profile' },
  { id: 'B', title: 'B. Knowledge' },
  { id: 'C', title: 'C. Understanding' },
  { id: 'D', title: 'D. Skills' },
  { id: 'E', title: 'E. Experience' },
  { id: 'F', title: 'F. Capability' },
  { id: 'G', title: 'G. Ethics & Accountability' },
  { id: 'H', title: 'H. SDG 4 & Educational Dev' },
  { id: 'I', title: 'I. Development Plan' },
  { id: 'J', title: 'J. Role Competencies' },
  { id: 'K', title: 'K. Upload Evidence' },
];

const RATING_OPTIONS: { value: ScaleRating; label: string; desc: string }[] = [
  { value: '1', label: '1 — BEGINNER', desc: 'Limited experience; needs foundational training.' },
  { value: '2', label: '2 — BASIC', desc: 'Has some knowledge but requires guidance.' },
  { value: '3', label: '3 — COMPETENT', desc: 'Can perform familiar tasks independently.' },
  { value: '4', label: '4 — PROFICIENT', desc: 'Performs tasks effectively and consistently.' },
  { value: '5', label: '5 — ADVANCED', desc: 'Can manage complex tasks and support others.' },
  { value: 'N/A', label: 'N/A', desc: 'Not Applicable to current role.' },
];

function getRoleSpecificQuestions(positionTitle: string): { id: string; text: string }[] {
  const title = (positionTitle || '').toLowerCase();

  if (title.includes('team lead') && !title.includes('deputy') && !title.includes('assistant')) {
    return [
      { id: 'q1', text: '1. How do you formulate long-term strategic vision and ensure overall NASDI institutional accountability?' },
      { id: 'q2', text: '2. Describe your approach to executive decision-making during high-stakes institutional deadlines.' },
      { id: 'q3', text: '3. How do you coordinate cross-departmental operations and promote leadership growth among team members?' },
    ];
  } else if (title.includes('deputy')) {
    return [
      { id: 'q1', text: '1. How do you support executive leadership in delegating tasks and tracking departmental progress?' },
      { id: 'q2', text: '2. Describe your strategy for supporting department heads and resolving operational bottlenecks.' },
      { id: 'q3', text: '3. What measures do you take to monitor task implementation across NASDI initiatives?' },
    ];
  } else if (title.includes('chief of staff')) {
    return [
      { id: 'q1', text: '1. How do you manage executive scheduling, meeting follow-ups, and action item tracking?' },
      { id: 'q2', text: '2. Describe your system for coordinating leadership communication and priority monitoring.' },
    ];
  } else if (title.includes('secretary') && !title.includes('financial')) {
    return [
      { id: 'q1', text: '1. Outline your system for maintaining official correspondence, meeting minutes, and document archives.' },
      { id: 'q2', text: '2. How do you ensure prompt dissemination of official notices and record integrity?' },
    ];
  } else if (title.includes('financial secretary')) {
    return [
      { id: 'q1', text: '1. How do you maintain transparent financial documentation, transaction logs, and budget tracking?' },
      { id: 'q2', text: '2. Describe your controls for ensuring resource accountability and financial reporting accuracy.' },
    ];
  } else if (title.includes('press release') || title.includes('publication')) {
    return [
      { id: 'q1', text: '1. Detail your process for drafting, editing, and verifying accuracy in official press releases and publications.' },
      { id: 'q2', text: '2. How do you manage media communications and maintain NASDI brand consistency in public releases?' },
    ];
  } else if (title.includes('spokesperson')) {
    return [
      { id: 'q1', text: '1. How do you articulate SDG 4 objectives and advocate for quality education in public speaking engagements?' },
      { id: 'q2', text: '2. Describe your approach to stakeholder engagement and representing NASDI values in external media.' },
    ];
  }

  return [
    { id: 'q1', text: '1. How do your specific professional competencies align with your assigned responsibilities at NASDI?' },
    { id: 'q2', text: '2. What contributions do you plan to make to advance your department objectives this term?' },
  ];
}

export const NASDIAssessmentForm: React.FC<NASDIAssessmentFormProps> = ({
  currentUser,
  existingSubmission,
  onSubmissionSuccess,
}) => {
  const [activeSection, setActiveSection] = useState(0);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Position & Department lookup lists
  const positions = getLeadershipPositions();
  const departments = getDepartments();

  // Form State
  const [formData, setFormData] = useState<Partial<AssessmentSubmission>>(() => {
    const draft = existingSubmission || getDraftSubmission(currentUser.id);
    if (draft) return draft;

    const assignedPos = positions.find((p) => p.id === currentUser.positionId);
    const assignedDept = departments.find((d) => d.id === currentUser.departmentId);

    const defaultA = createDefaultSectionA();
    defaultA.fullName = currentUser.fullName;
    defaultA.email = currentUser.email;
    if (assignedPos) defaultA.positionId = assignedPos.id;
    if (assignedDept) defaultA.departmentId = assignedDept.id;

    return {
      userId: currentUser.id,
      sectionA: defaultA,
      sectionB: createDefaultSectionB(),
      sectionC: createDefaultSectionC(),
      sectionD: createDefaultSectionD(),
      sectionE: createDefaultSectionE(),
      sectionF: createDefaultSectionF(),
      sectionG: createDefaultSectionG(),
      sectionH: createDefaultSectionH(),
      sectionI: createDefaultSectionI(),
      sectionJ: [],
      evidenceDocuments: [],
    };
  });

  // Auto-Save Draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.status !== 'SUBMITTED' && formData.status !== 'APPROVED') {
        saveDraftSubmission({ ...formData, userId: currentUser.id });
        setLastSavedTime(new Date().toLocaleTimeString());
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [formData, currentUser.id]);

  const handleManualSaveDraft = () => {
    const saved = saveDraftSubmission({ ...formData, userId: currentUser.id });
    setFormData(saved);
    setLastSavedTime(new Date().toLocaleTimeString());
    setNotification({ type: 'success', message: 'Draft saved successfully.' });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sectionA?.fullName || !formData.sectionA?.email) {
      setNotification({ type: 'error', message: 'Please complete Section A profile details before submitting.' });
      return;
    }

    const finalSub = submitAssessment({ ...formData, userId: currentUser.id });
    setFormData(finalSub);
    setNotification({ type: 'success', message: 'Assessment submitted successfully! Official PDF generated.' });
    if (onSubmissionSuccess) onSubmissionSuccess(finalSub);
  };

  // Section Navigation & Progress
  const progressPercent = Math.round(((activeSection + 1) / SECTION_KEYS.length) * 100);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setNotification({ type: 'error', message: `File ${file.name} exceeds 5MB size limit.` });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const docObj: EvidenceDocument = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl,
          includeInPdf: file.type.startsWith('image/'),
          uploadedAt: new Date().toISOString(),
        };

        setFormData((prev) => ({
          ...prev,
          evidenceDocuments: [...(prev.evidenceDocuments || []), docObj],
        }));
      };
      reader.readAsDataURL(file);
    });

    setNotification({ type: 'success', message: 'Supporting evidence document(s) uploaded successfully.' });
    setTimeout(() => setNotification(null), 3000);
  };

  const removeDocument = (docId: string) => {
    setFormData((prev) => ({
      ...prev,
      evidenceDocuments: (prev.evidenceDocuments || []).filter((d) => d.id !== docId),
    }));
  };

  const toggleIncludeInPdf = (docId: string) => {
    setFormData((prev) => ({
      ...prev,
      evidenceDocuments: (prev.evidenceDocuments || []).map((d) =>
        d.id === docId ? { ...d, includeInPdf: !d.includeInPdf } : d
      ),
    }));
  };

  // Dynamic Questions for Section J based on current user position
  const currentPos = positions.find((p) => p.id === formData.sectionA?.positionId);
  const roleQuestions = getRoleSpecificQuestions(currentPos ? currentPos.title : '');

  return (
    <div className="max-w-5xl mx-auto my-6 p-4 sm:p-6 bg-slate-900 border border-purple-500/20 rounded-2xl shadow-2xl text-white">
      {/* Header Bar & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-amber-400/20 text-amber-300 font-extrabold px-2 py-0.5 rounded border border-amber-400/30 font-mono uppercase">
              NASDI ASSESSMENT SYSTEM
            </span>
            {lastSavedTime && (
              <span className="text-[10px] text-purple-300/70 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-purple-400" />
                Draft saved {lastSavedTime}
              </span>
            )}
          </div>
          <h2 className="text-lg font-extrabold text-white mt-1">
            Human Capital Capability Assessment
          </h2>
          <p className="text-xs text-purple-200/70">
            {currentUser.fullName} ({currentPos ? currentPos.title : 'Participant'})
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleManualSaveDraft}
            className="px-3 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/80 border border-purple-400/30 text-purple-200 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Save className="w-3.5 h-3.5 text-amber-400" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => {
              downloadNASDIAssessmentPDF(formData as AssessmentSubmission);
              setNotification({ type: 'success', message: 'Report preview generated.' });
            }}
            className="px-3 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/80 border border-purple-400/30 text-purple-200 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => downloadNASDIAssessmentPDF(formData as AssessmentSubmission)}
            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition shadow-md"
          >
            <FileDown className="w-3.5 h-3.5 text-slate-950" />
            <span>Generate & Download PDF</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`mt-4 p-3 rounded-xl border text-xs flex items-center gap-2.5 animate-fadeIn ${
            notification.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Progress Bar & Section Selector */}
      <div className="my-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-purple-200">
          <span>Completion Progress ({SECTION_KEYS[activeSection].title})</span>
          <span className="font-mono text-amber-300">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-purple-950 border border-purple-500/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Section Tabs Horizontal Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {SECTION_KEYS.map((sec, idx) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(idx)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition border ${
                activeSection === idx
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                  : 'bg-purple-950/60 hover:bg-purple-900/50 text-purple-200 border-purple-500/20'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* FORM CONTENT SECTIONS */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION A: PROFILE */}
        {activeSection === 0 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-purple-500/20 pb-2">
              <BookOpen className="w-4 h-4" />
              Section A: Personal and Professional Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.sectionA?.fullName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sectionA: { ...formData.sectionA!, fullName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.sectionA?.email || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sectionA: { ...formData.sectionA!, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Assigned NASDI Leadership Position</label>
                <select
                  value={formData.sectionA?.positionId || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sectionA: { ...formData.sectionA!, positionId: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                >
                  <option value="">-- Select Position --</option>
                  {positions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.officeholder})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Department Assignment</label>
                <select
                  value={formData.sectionA?.departmentId || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sectionA: { ...formData.sectionA!, departmentId: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                >
                  <option value="">-- General / Unassigned --</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">Educational Background</label>
              <textarea
                rows={2}
                value={formData.sectionA?.educationalBackground || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionA: { ...formData.sectionA!, educationalBackground: e.target.value },
                  })
                }
                placeholder="Degree(s), institutions, discipline, specializations..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">Relevant Professional Experience</label>
              <textarea
                rows={2}
                value={formData.sectionA?.professionalExperience || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionA: { ...formData.sectionA!, professionalExperience: e.target.value },
                  })
                }
                placeholder="Summary of career history, educational management, policy development..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Areas of Special Interest</label>
                <input
                  type="text"
                  value={formData.sectionA?.areasOfInterest || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sectionA: { ...formData.sectionA!, areasOfInterest: e.target.value },
                    })
                  }
                  placeholder="e.g. Curriculum Design, EdTech, Teacher Capacity"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Training and Certifications</label>
                <input
                  type="text"
                  value={formData.sectionA?.certifications || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sectionA: { ...formData.sectionA!, certifications: e.target.value },
                    })
                  }
                  placeholder="e.g. Certified Pedagogy Specialist, PMP"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION B: KNOWLEDGE */}
        {activeSection === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-purple-500/20 pb-2">
              <BookOpen className="w-4 h-4" />
              Section B: Knowledge & Mandate Assessment
            </h3>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">1. Understanding of NASDI Purpose and Mandate</label>
              <textarea
                rows={2}
                value={formData.sectionB?.nasdiPurpose || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionB: { ...formData.sectionB!, nasdiPurpose: e.target.value },
                  })
                }
                placeholder="Explain NASDI's core mandate within NationsWorld of Visionary Advancement..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">2. Knowledge of SDG 4 and Quality Education Principles</label>
              <textarea
                rows={2}
                value={formData.sectionB?.sdg4Knowledge || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionB: { ...formData.sectionB!, sdg4Knowledge: e.target.value },
                  })
                }
                placeholder="Describe key SDG 4 targets, equitable access, quality pedagogy..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">3. Assigned Responsibilities & Department Objectives</label>
              <textarea
                rows={2}
                value={formData.sectionB?.assignedResponsibilities || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionB: { ...formData.sectionB!, assignedResponsibilities: e.target.value },
                  })
                }
                placeholder="Outline your primary duties and departmental alignment..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* SECTION C: UNDERSTANDING */}
        {activeSection === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Section C: Institutional & Ethical Understanding
            </h3>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">1. Official Responsibilities Scope</label>
              <textarea
                rows={2}
                value={formData.sectionC?.officialResponsibilities || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionC: { ...formData.sectionC!, officialResponsibilities: e.target.value },
                  })
                }
                placeholder="Define your official duties and scope of authority..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">2. Institutional Accountability & Standards</label>
              <textarea
                rows={2}
                value={formData.sectionC?.institutionalAccountability || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionC: { ...formData.sectionC!, institutionalAccountability: e.target.value },
                  })
                }
                placeholder="How do you maintain accountability and institutional standards?"
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">3. Teamwork, Inclusion & Organisational Communication</label>
              <textarea
                rows={2}
                value={formData.sectionC?.teamworkUnderstanding || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionC: { ...formData.sectionC!, teamworkUnderstanding: e.target.value },
                  })
                }
                placeholder="Detail your understanding of inclusive teamwork and formal communication..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* SECTION D: SKILLS */}
        {activeSection === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Section D: Skills & Competency Five-Point Scale
            </h3>

            <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-400/30 text-xs text-purple-200 space-y-1">
              <span className="font-bold text-amber-300 block">STANDARD RATING SCALE:</span>
              <p>1: Beginner | 2: Basic | 3: Competent | 4: Proficient | 5: Advanced | N/A: Not Applicable</p>
            </div>

            {[
              { key: 'communication', title: '1. Communication Skills' },
              { key: 'professionalWriting', title: '2. Professional Writing & Editing' },
              { key: 'digitalLiteracy', title: '3. Digital Literacy & Tech Proficiency' },
              { key: 'research', title: '4. Research & Evidence Analysis' },
              { key: 'criticalThinking', title: '5. Critical Thinking & Problem Solving' },
              { key: 'publicSpeaking', title: '6. Public Speaking & Advocacy' },
              { key: 'teamwork', title: '7. Teamwork & Collaboration' },
              { key: 'responsibleAI', title: '8. Responsible Use of AI Tools' },
            ].map((comp) => {
              const currentItem = (formData.sectionD as any)?.[comp.key] || { rating: '3', explanation: '' };

              return (
                <div key={comp.key} className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-amber-300">{comp.title}</span>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {RATING_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            sectionD: {
                              ...formData.sectionD!,
                              [comp.key]: { ...currentItem, rating: opt.value },
                            },
                          })
                        }
                        className={`p-2 rounded-lg text-xs font-extrabold border transition text-center ${
                          currentItem.rating === opt.value
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-purple-950/40 text-purple-200 border-purple-500/20 hover:bg-purple-900/40'
                        }`}
                      >
                        {opt.value}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={currentItem.explanation || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sectionD: {
                          ...formData.sectionD!,
                          [comp.key]: { ...currentItem, explanation: e.target.value },
                        },
                      })
                    }
                    placeholder="Provide evidence or elaboration..."
                    className="w-full px-3 py-1.5 bg-slate-900 border border-purple-500/30 rounded-lg text-xs text-white"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* SECTION E: EXPERIENCE */}
        {activeSection === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Section E: Experience & Practical Demonstration
            </h3>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">Previous Projects & Leadership Roles</label>
              <textarea
                rows={2}
                value={formData.sectionE?.previousProjects || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionE: { ...formData.sectionE!, previousProjects: e.target.value },
                  })
                }
                placeholder="Highlight key past projects and leadership positions..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">Volunteer Work & Educational Initiatives</label>
              <textarea
                rows={2}
                value={formData.sectionE?.volunteerWork || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionE: { ...formData.sectionE!, volunteerWork: e.target.value },
                  })
                }
                placeholder="Community initiatives, volunteer projects, student engagement..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* SECTION F: CAPABILITY */}
        {activeSection === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Section F: Capability Ratings
            </h3>

            {[
              { key: 'workIndependently', title: '1. Work Independently' },
              { key: 'completeAssignedTasks', title: '2. Complete Assigned Tasks' },
              { key: 'meetDeadlines', title: '3. Meet Deadlines & Timelines' },
              { key: 'collaborateEffectively', title: '4. Collaborate Effectively' },
              { key: 'handleResponsibilities', title: '5. Handle Responsibilities' },
              { key: 'solvePracticalProblems', title: '6. Solve Practical Problems' },
              { key: 'learnNewSkills', title: '7. Learn New Skills Quickly' },
              { key: 'applyKnowledge', title: '8. Apply Knowledge in Real Situations' },
            ].map((cap) => {
              const currentItem = (formData.sectionF as any)?.[cap.key] || { rating: '3', explanation: '' };

              return (
                <div key={cap.key} className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-amber-300">{cap.title}</span>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {RATING_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            sectionF: {
                              ...formData.sectionF!,
                              [cap.key]: { ...currentItem, rating: opt.value },
                            },
                          })
                        }
                        className={`p-2 rounded-lg text-xs font-extrabold border transition text-center ${
                          currentItem.rating === opt.value
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-purple-950/40 text-purple-200 border-purple-500/20 hover:bg-purple-900/40'
                        }`}
                      >
                        {opt.value}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={currentItem.explanation || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sectionF: {
                          ...formData.sectionF!,
                          [cap.key]: { ...currentItem, explanation: e.target.value },
                        },
                      })
                    }
                    placeholder="Elaboration or practical examples..."
                    className="w-full px-3 py-1.5 bg-slate-900 border border-purple-500/30 rounded-lg text-xs text-white"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* SECTION G: ETHICS & ACCOUNTABILITY */}
        {activeSection === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Section G: Ethics & Accountability Ratings
            </h3>

            {[
              { key: 'integrity', title: '1. Professional Integrity' },
              { key: 'confidentiality', title: '2. Information Confidentiality' },
              { key: 'resourceUse', title: '3. Responsible Use of Resources' },
              { key: 'respectForOthers', title: '4. Respect & Inclusion for All' },
              { key: 'professionalBoundaries', title: '5. Professional Boundaries' },
              { key: 'safeguardingAwareness', title: '6. Safeguarding Awareness' },
              { key: 'conflictResolution', title: '7. Constructive Conflict Resolution' },
              { key: 'accountability', title: '8. Personal & Team Accountability' },
            ].map((eth) => {
              const currentItem = (formData.sectionG as any)?.[eth.key] || { rating: '3', explanation: '' };

              return (
                <div key={eth.key} className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-amber-300">{eth.title}</span>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {RATING_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            sectionG: {
                              ...formData.sectionG!,
                              [eth.key]: { ...currentItem, rating: opt.value },
                            },
                          })
                        }
                        className={`p-2 rounded-lg text-xs font-extrabold border transition text-center ${
                          currentItem.rating === opt.value
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-purple-950/40 text-purple-200 border-purple-500/20 hover:bg-purple-900/40'
                        }`}
                      >
                        {opt.value}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={currentItem.explanation || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sectionG: {
                          ...formData.sectionG!,
                          [eth.key]: { ...currentItem, explanation: e.target.value },
                        },
                      })
                    }
                    placeholder="Ethical principles application details..."
                    className="w-full px-3 py-1.5 bg-slate-900 border border-purple-500/30 rounded-lg text-xs text-white"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* SECTION H: SDG 4 & EDUCATIONAL DEV */}
        {activeSection === 7 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Section H: SDG 4 & Educational Development
            </h3>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">Quality & Inclusive Education Strategies</label>
              <textarea
                rows={2}
                value={formData.sectionH?.qualityEducation || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionH: { ...formData.sectionH!, qualityEducation: e.target.value },
                  })
                }
                placeholder="How do you contribute to inclusive education and learning outcomes?"
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">Teacher & Student Development Initiatives</label>
              <textarea
                rows={2}
                value={formData.sectionH?.teacherDevelopment || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionH: { ...formData.sectionH!, teacherDevelopment: e.target.value },
                  })
                }
                placeholder="Capacity development for educators and learners..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* SECTION I: PERSONAL DEVELOPMENT PLAN */}
        {activeSection === 8 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Section I: Personal Development Plan (PDP)
            </h3>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">Strongest Core Abilities</label>
              <textarea
                rows={2}
                value={formData.sectionI?.strongestAbilities || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionI: { ...formData.sectionI!, strongestAbilities: e.target.value },
                  })
                }
                placeholder="What are your primary strengths and competencies?"
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1">Areas Requiring Growth & Training Needed</label>
              <textarea
                rows={2}
                value={formData.sectionI?.trainingNeeded || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sectionI: { ...formData.sectionI!, trainingNeeded: e.target.value },
                  })
                }
                placeholder="Specify target training or skills you wish to acquire..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Short-Term Goals (1-6 Months)</label>
                <input
                  type="text"
                  value={formData.sectionI?.shortTermGoals || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sectionI: { ...formData.sectionI!, shortTermGoals: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Long-Term Goals (1-2 Years)</label>
                <input
                  type="text"
                  value={formData.sectionI?.longTermGoals || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sectionI: { ...formData.sectionI!, longTermGoals: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION J: ROLE-SPECIFIC COMPETENCIES */}
        {activeSection === 9 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Section J: Role-Specific Competencies ({currentPos ? currentPos.title : 'General'})
            </h3>

            {roleQuestions.map((q) => {
              const existingJ = formData.sectionJ || [];
              const currentResp = existingJ.find((r) => r.questionId === q.id)?.response || '';

              return (
                <div key={q.id} className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl space-y-2">
                  <label className="block text-xs font-bold text-purple-200">{q.text}</label>
                  <textarea
                    rows={3}
                    value={currentResp}
                    onChange={(e) => {
                      const newResp = e.target.value;
                      const updatedJ = [...existingJ];
                      const index = updatedJ.findIndex((r) => r.questionId === q.id);
                      if (index >= 0) {
                        updatedJ[index].response = newResp;
                      } else {
                        updatedJ.push({ questionId: q.id, questionText: q.text, response: newResp });
                      }
                      setFormData({ ...formData, sectionJ: updatedJ });
                    }}
                    placeholder="Enter detailed role-specific response..."
                    className="w-full px-3.5 py-2 bg-slate-900 border border-purple-500/30 rounded-xl text-xs text-white"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* SECTION K: UPLOAD EVIDENCE */}
        {activeSection === 10 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-purple-500/20 pb-2 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Section K: Supporting Documents & Image Uploads
            </h3>

            <div className="p-6 border-2 border-dashed border-purple-400/40 rounded-2xl text-center bg-purple-950/20 hover:bg-purple-950/40 transition">
              <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-white mb-1">
                Drag and drop certificates, research docs, or work samples
              </p>
              <p className="text-[11px] text-purple-300/70 mb-3">
                Allowed formats: PDF, PNG, JPG, WEBP (Max size: 5MB)
              </p>

              <label className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl cursor-pointer transition">
                <span>Select Supporting Files</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Uploaded Documents List */}
            {formData.evidenceDocuments && formData.evidenceDocuments.length > 0 && (
              <div className="space-y-2 mt-4">
                <span className="block text-xs font-bold text-purple-200 uppercase">
                  Uploaded Evidence ({formData.evidenceDocuments.length}):
                </span>

                {formData.evidenceDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 bg-slate-950 border border-purple-500/20 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {doc.type.startsWith('image/') ? (
                        <img src={doc.dataUrl} alt={doc.name} className="w-10 h-10 object-cover rounded-lg border border-purple-400/30" />
                      ) : (
                        <FileText className="w-8 h-8 text-amber-400 shrink-0" />
                      )}

                      <div className="truncate">
                        <span className="block text-xs font-bold text-white truncate">{doc.name}</span>
                        <span className="block text-[10px] text-purple-300/70">
                          {(doc.size / 1024).toFixed(1)} KB • {doc.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {doc.type.startsWith('image/') && (
                        <label className="flex items-center gap-1.5 text-[11px] text-purple-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={doc.includeInPdf}
                            onChange={() => toggleIncludeInPdf(doc.id)}
                            className="rounded border-purple-400 text-amber-500 focus:ring-amber-400"
                          />
                          <span>Embed in PDF Report</span>
                        </label>
                      )}

                      <button
                        type="button"
                        onClick={() => removeDocument(doc.id)}
                        className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation Bottom Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-purple-500/20">
          <button
            type="button"
            disabled={activeSection === 0}
            onClick={() => setActiveSection((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 text-xs font-bold flex items-center gap-1 disabled:opacity-30 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Section</span>
          </button>

          {activeSection < SECTION_KEYS.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveSection((prev) => Math.min(SECTION_KEYS.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1 transition"
            >
              <span>Next Section</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-lg transition"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>Final Assessment Submission</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
