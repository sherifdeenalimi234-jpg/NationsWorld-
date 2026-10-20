import React, { useState } from 'react';
import {
  Users,
  FileCheck,
  FileText,
  Clock,
  Search,
  Download,
  Edit,
  UserPlus,
  Shield,
  Settings,
  List,
} from 'lucide-react';
import {
  type UserAccount,
  type AssessmentSubmission,
  type LeadershipPosition,
  type Department,
  type PortalSettings,
  type AuditRecord,
  getAllUserAccounts,
  getAllSubmissions,
  getLeadershipPositions,
  getDepartments,
  getPortalSettings,
  getAuditLogs,
  createUserAccount,
  updateLeadershipPosition,
  updatePortalSettings,
  reviewAssessmentSubmission,
} from '../../services/nasdiStorage';
import { downloadNASDIAssessmentPDF } from '../../utils/nasdiPdfGenerator';

interface NASDIAdminDashboardProps {
  currentUser: UserAccount;
}

export const NASDIAdminDashboard: React.FC<NASDIAdminDashboardProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'users' | 'leadership' | 'branding' | 'audit'>('submissions');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal States
  const [selectedSubmission, setSelectedSubmission] = useState<AssessmentSubmission | null>(null);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewRecommendations, setReviewRecommendations] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'APPROVED' | 'REVISION_REQUESTED' | 'REVIEWED'>('APPROVED');

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'PARTICIPANT' | 'REVIEWER' | 'SUPER_ADMIN'>('PARTICIPANT');

  const [editingPosition, setEditingPosition] = useState<LeadershipPosition | null>(null);
  const [posOfficeholder, setPosOfficeholder] = useState('');
  const [posIsVacant, setPosIsVacant] = useState(false);

  // Load Data
  const [users] = useState<UserAccount[]>(() => getAllUserAccounts());
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>(() => getAllSubmissions());
  const [positions, setPositions] = useState<LeadershipPosition[]>(() => getLeadershipPositions());
  const [departments] = useState<Department[]>(() => getDepartments());
  const [portalSettings, setPortalSettingsState] = useState<PortalSettings>(() => getPortalSettings());
  const [auditLogs] = useState<AuditRecord[]>(() => getAuditLogs());

  const refreshData = () => {
    setSubmissions(getAllSubmissions());
    setPositions(getLeadershipPositions());
    setPortalSettingsState(getPortalSettings());
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.sectionA.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.refNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalUsers = users.length;
  const activeUserCount = users.filter((u) => u.status === 'ACTIVE').length;
  const totalSubmissions = submissions.length;
  const pendingReviewCount = submissions.filter((s) => s.status === 'SUBMITTED' || s.status === 'UNDER_REVIEW').length;
  const approvedCount = submissions.filter((s) => s.status === 'APPROVED' || s.status === 'REVIEWED').length;

  // Review Submission Action
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    reviewAssessmentSubmission(currentUser, selectedSubmission.id, {
      comments: reviewComments,
      recommendations: reviewRecommendations,
      decision: reviewDecision,
    });

    setSelectedSubmission(null);
    refreshData();
  };

  // Create User Action
  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createUserAccount(currentUser, {
      fullName: newUserName,
      email: newUserEmail,
      role: newUserRole,
    });

    if (res.success) {
      setShowCreateUserModal(false);
      setNewUserName('');
      setNewUserEmail('');
      refreshData();
    } else {
      alert(res.error || 'Failed to create user');
    }
  };

  // Update Position Action
  const handleUpdatePositionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPosition) return;

    updateLeadershipPosition(currentUser, editingPosition.id, {
      officeholder: posOfficeholder,
      isVacant: posIsVacant,
    });

    setEditingPosition(null);
    refreshData();
  };

  // Logo Upload Action
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      updatePortalSettings(currentUser, { logoDataUrl: dataUrl });
      refreshData();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto my-6 p-4 sm:p-6 bg-slate-900 border border-purple-500/20 rounded-2xl shadow-2xl text-white space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
        <div>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded border border-amber-400/30 uppercase tracking-widest font-mono">
            SUPER ADMINISTRATOR DASHBOARD
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">
            NASDI Portal Executive Control Hub
          </h2>
          <p className="text-xs text-purple-200/70">
            Authenticated: {currentUser.fullName} ({currentUser.role})
          </p>
        </div>

        {currentUser.role === 'SUPER_ADMIN' && (
          <button
            type="button"
            onClick={() => setShowCreateUserModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
          >
            <UserPlus className="w-4 h-4 text-slate-950" />
            <span>Create Account</span>
          </button>
        )}
      </div>

      {/* METRIC COUNTERS OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-purple-950/40 border border-purple-500/20 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-purple-300">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Accounts</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-white font-mono">{totalUsers}</span>
          <span className="block text-[10px] text-emerald-400 font-medium">{activeUserCount} Active</span>
        </div>

        <div className="p-4 bg-purple-950/40 border border-purple-500/20 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-purple-300">
            <span className="text-[11px] font-bold uppercase tracking-wider">Submissions</span>
            <FileText className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-2xl font-extrabold text-white font-mono">{totalSubmissions}</span>
          <span className="block text-[10px] text-purple-300/70 font-medium">Recorded Submissions</span>
        </div>

        <div className="p-4 bg-purple-950/40 border border-purple-500/20 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-purple-300">
            <span className="text-[11px] font-bold uppercase tracking-wider">Awaiting Review</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-amber-400 font-mono">{pendingReviewCount}</span>
          <span className="block text-[10px] text-amber-300/70 font-medium">Action Required</span>
        </div>

        <div className="p-4 bg-purple-950/40 border border-purple-500/20 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-purple-300">
            <span className="text-[11px] font-bold uppercase tracking-wider">Approved Reports</span>
            <FileCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono">{approvedCount}</span>
          <span className="block text-[10px] text-emerald-300/70 font-medium">Completed Reviews</span>
        </div>
      </div>

      {/* ADMIN TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-purple-500/20 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
            activeTab === 'submissions'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
              : 'bg-purple-950/40 text-purple-200 border-purple-500/20 hover:bg-purple-900/40'
          }`}
        >
          <List className="w-4 h-4" />
          <span>Submissions Register</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
            activeTab === 'users'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
              : 'bg-purple-950/40 text-purple-200 border-purple-500/20 hover:bg-purple-900/40'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('leadership')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
            activeTab === 'leadership'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
              : 'bg-purple-950/40 text-purple-200 border-purple-500/20 hover:bg-purple-900/40'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Leadership Structure</span>
        </button>

        {currentUser.role === 'SUPER_ADMIN' && (
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
              activeTab === 'branding'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                : 'bg-purple-950/40 text-purple-200 border-purple-500/20 hover:bg-purple-900/40'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Document & Logo Config</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
            activeTab === 'audit'
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
              : 'bg-purple-950/40 text-purple-200 border-purple-500/20 hover:bg-purple-900/40'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Audit Records</span>
        </button>
      </div>

      {/* TAB 1: SUBMISSIONS REGISTER */}
      {activeTab === 'submissions' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by participant name or reference number..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white placeholder-purple-300/40"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted (Pending)</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="REVISION_REQUESTED">Revision Requested</option>
              <option value="APPROVED">Approved</option>
            </select>
          </div>

          {/* Submissions Table */}
          <div className="overflow-x-auto rounded-xl border border-purple-500/20 bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-950/80 text-amber-300 font-bold border-b border-purple-500/20">
                <tr>
                  <th className="p-3">Ref No</th>
                  <th className="p-3">Participant</th>
                  <th className="p-3">Position</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-purple-300/60">
                      No assessment submissions match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-purple-900/20 transition">
                      <td className="p-3 font-mono font-bold text-amber-300">{sub.refNo}</td>
                      <td className="p-3 font-bold text-white">{sub.sectionA.fullName}</td>
                      <td className="p-3 text-purple-200">
                        {positions.find((p) => p.id === sub.sectionA.positionId)?.title || 'Participant'}
                      </td>
                      <td className="p-3 text-purple-300/80 font-mono">
                        {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString('en-GB') : 'Draft'}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            sub.status === 'APPROVED'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : sub.status === 'REVISION_REQUESTED'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSubmission(sub);
                            setReviewComments(sub.reviewerComments || '');
                            setReviewRecommendations(sub.reviewerRecommendations || '');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-200 text-[11px] font-bold border border-purple-400/30 transition"
                        >
                          Review & Comment
                        </button>

                        <button
                          type="button"
                          onClick={() => downloadNASDIAssessmentPDF(sub)}
                          className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                          title="Download PDF Report"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: USER ACCOUNTS */}
      {activeTab === 'users' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="overflow-x-auto rounded-xl border border-purple-500/20 bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-950/80 text-amber-300 font-bold border-b border-purple-500/20">
                <tr>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {users.map((usr) => (
                  <tr key={usr.id} className="hover:bg-purple-900/20 transition">
                    <td className="p-3 font-bold text-white">{usr.fullName}</td>
                    <td className="p-3 font-mono text-purple-200">{usr.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-900/80 text-amber-300 border border-purple-400/30 font-mono">
                        {usr.role}
                      </span>
                    </td>
                    <td className="p-3 text-purple-300">
                      {departments.find((d) => d.id === usr.departmentId)?.name || 'General'}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                        {usr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LEADERSHIP STRUCTURE */}
      {activeTab === 'leadership' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 bg-purple-950/40 rounded-xl border border-purple-500/20 text-xs text-purple-200">
            <span className="font-bold text-amber-300 block mb-1">NASDI OFFICIAL LEADERSHIP STRUCTURE (9 POSITIONS)</span>
            <p>
              Only appointed officeholders are assigned official assessments. Vacant positions remain marked vacant until formal appointments are recorded by the Super Administrator.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {positions.map((pos, idx) => (
              <div key={pos.id} className="p-4 bg-slate-950 border border-purple-500/20 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-400 uppercase font-mono">
                    Position #{idx + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      pos.isVacant ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {pos.isVacant ? 'Vacant' : 'Occupied'}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-amber-300">{pos.title}</h4>
                <p className="text-xs text-white font-semibold">{pos.officeholder}</p>
                <p className="text-[11px] text-purple-200/70 line-clamp-2">{pos.description}</p>

                {currentUser.role === 'SUPER_ADMIN' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPosition(pos);
                      setPosOfficeholder(pos.isVacant ? '' : pos.officeholder);
                      setPosIsVacant(pos.isVacant);
                    }}
                    className="w-full mt-2 py-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-900/80 border border-purple-400/30 text-purple-200 text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3 h-3 text-amber-400" />
                    <span>Edit Officeholder</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BRANDING & SETTINGS */}
      {activeTab === 'branding' && currentUser.role === 'SUPER_ADMIN' && (
        <div className="space-y-4 animate-fadeIn p-4 bg-slate-950 rounded-xl border border-purple-500/20">
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Portal Branding & Official Settings
          </h3>

          <div>
            <label className="block text-xs font-bold text-purple-200 mb-1">Official Institute Name</label>
            <input
              type="text"
              readOnly
              value={portalSettings.instituteFullName}
              className="w-full px-3.5 py-2.5 bg-purple-950/60 border border-purple-500/30 rounded-xl text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-purple-200 mb-1">NASDI Official Logo Config</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="text-xs text-purple-200"
            />
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT RECORDS */}
      {activeTab === 'audit' && (
        <div className="space-y-2 animate-fadeIn">
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
            System Audit Log Records ({auditLogs.length})
          </h3>

          <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-2.5 bg-slate-950 border border-purple-500/20 rounded-lg text-xs flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-amber-300 mr-2">[{log.action}]</span>
                  <span className="text-white">{log.details}</span>
                  <span className="text-purple-300/60 text-[10px] block font-mono">
                    Actor: {log.actorName} ({log.actorRole})
                  </span>
                </div>
                <span className="text-[10px] text-purple-300/60 font-mono whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString('en-GB')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT POSITION MODAL */}
      {editingPosition && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Edit Officeholder: {editingPosition.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPosition(null)}
                className="text-purple-300 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdatePositionSubmit} className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-purple-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={posIsVacant}
                  onChange={(e) => setPosIsVacant(e.target.checked)}
                  className="rounded border-purple-400 text-amber-500 focus:ring-amber-400"
                />
                <span>Mark Position as Vacant</span>
              </label>

              {!posIsVacant && (
                <div>
                  <label className="block text-xs font-bold text-purple-200 mb-1">Appointed Officeholder Name</label>
                  <input
                    type="text"
                    required
                    value={posOfficeholder}
                    onChange={(e) => setPosOfficeholder(e.target.value)}
                    placeholder="e.g. Samuel Adebisi"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl uppercase tracking-wider transition"
              >
                Save Position Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REVIEW SUBMISSION MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div>
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Reviewing Report: {selectedSubmission.refNo}
                </h3>
                <p className="text-xs text-purple-200/70">
                  Participant: {selectedSubmission.sectionA.fullName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="text-purple-300 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Review Decision Status</label>
                <select
                  value={reviewDecision}
                  onChange={(e: any) => setReviewDecision(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                >
                  <option value="APPROVED">Approved (Verified & Recorded)</option>
                  <option value="REVISION_REQUESTED">Revision Requested (Return to Participant)</option>
                  <option value="REVIEWED">Reviewed (Evaluated with Notes)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Reviewer Comments & Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  placeholder="Enter detailed review comments..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Development Recommendations</label>
                <textarea
                  rows={3}
                  value={reviewRecommendations}
                  onChange={(e) => setReviewRecommendations(e.target.value)}
                  placeholder="Targeted training or capability recommendations..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-200 text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl transition"
                >
                  Save Review Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE USER MODAL */}
      {showCreateUserModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Create Individual User Account
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateUserModal(false)}
                className="text-purple-300 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Samuel Adebisi"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="name@nasdi.org"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-200 mb-1">System Role</label>
                <select
                  value={newUserRole}
                  onChange={(e: any) => setNewUserRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-xs text-white"
                >
                  <option value="PARTICIPANT">Assessment Participant</option>
                  <option value="REVIEWER">Assessment Reviewer</option>
                  <option value="SUPER_ADMIN">Super Administrator</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl uppercase tracking-wider transition"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
