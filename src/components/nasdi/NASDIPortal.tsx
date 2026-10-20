import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import {
  type UserAccount,
  getCurrentSessionUser,
  logoutUser,
  getSubmissionByUserId,
} from '../../services/nasdiStorage';
import { NASDILogin } from './NASDILogin';
import { NASDIAssessmentForm } from './NASDIAssessmentForm';
import { NASDIAdminDashboard } from './NASDIAdminDashboard';

export const NASDIPortal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentSessionUser());
  const [activeTab, setActiveTab] = useState<'assessment' | 'admin'>('assessment');
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());

  // Session Inactivity Auto Logout (15 minutes)
  useEffect(() => {
    const handleActivity = () => setLastActivityTime(Date.now());
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    const interval = setInterval(() => {
      if (currentUser && Date.now() - lastActivityTime > 15 * 60 * 1000) {
        logoutUser();
        setCurrentUser(null);
        alert('Session expired due to 15 minutes of inactivity. Please log in again.');
      }
    }, 30000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearInterval(interval);
    };
  }, [currentUser, lastActivityTime]);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const userSubmission = currentUser ? getSubmissionByUserId(currentUser.id) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-36 sm:pt-40 pb-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-amber-300 font-sans">
      {/* Top Institute Header Banner */}
      <div className="max-w-7xl mx-auto mb-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-xl shrink-0">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                SDG 4 QUALITY EDUCATION
              </span>
              <span className="text-[10px] bg-purple-900/80 text-purple-200 border border-purple-400/30 px-2 py-0.5 rounded font-mono font-bold">
                NASDI PORTAL
              </span>
            </div>
            <h1 className="text-sm sm:text-lg font-extrabold text-white tracking-tight leading-tight mt-0.5">
              NATIONS WORLD AFFAIRS OF SUSTAINABLE DEVELOPMENT INSTITUTE (NASDI)
            </h1>
            <p className="text-[11px] text-purple-200/80">
              Human Capital Development and Assessment Programme • NationsWorld of Visionary Advancement
            </p>
          </div>
        </div>

        {/* Authenticated User Status Header */}
        {currentUser && (
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-purple-500/20">
            <div className="bg-purple-900/40 border border-purple-400/30 px-3 py-1.5 rounded-xl text-left">
              <span className="block text-[10px] text-purple-300 uppercase tracking-wider font-mono">
                {currentUser.role}
              </span>
              <span className="block text-xs font-bold text-amber-300 truncate max-w-[180px]">
                {currentUser.fullName}
              </span>
            </div>

            {(currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'REVIEWER') && (
              <div className="flex items-center gap-1.5 bg-slate-900 border border-purple-500/30 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('assessment')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'assessment' ? 'bg-amber-500 text-slate-950 shadow' : 'text-purple-200 hover:text-white'
                  }`}
                >
                  Assessment Form
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    activeTab === 'admin' ? 'bg-amber-500 text-slate-950 shadow' : 'text-purple-200 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Hub</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-200 hover:text-white border border-rose-500/30 transition flex items-center gap-1.5 text-xs font-bold shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* PORTAL MAIN CONTENT */}
      {!currentUser ? (
        <NASDILogin onLoginSuccess={(usr) => setCurrentUser(usr)} />
      ) : activeTab === 'admin' && (currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'REVIEWER') ? (
        <NASDIAdminDashboard currentUser={currentUser} />
      ) : (
        <NASDIAssessmentForm currentUser={currentUser} existingSubmission={userSubmission} />
      )}
    </div>
  );
};
