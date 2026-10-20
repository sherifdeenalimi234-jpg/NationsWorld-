import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, AlertCircle, Key, RefreshCw, UserCheck, BookOpen } from 'lucide-react';
import { loginUser, changePassword, type AuthResult, type UserAccount } from '../../services/nasdiStorage';

interface NASDILoginProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const NASDILogin: React.FC<NASDILoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forced password change state
  const [mustChangePass, setMustChangePass] = useState(false);
  const [pendingUser, setPendingUser] = useState<UserAccount | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passChangeError, setPassChangeError] = useState<string | null>(null);

  // Password reset dialog
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result: AuthResult = await loginUser(email, password);

      if (!result.success || !result.user) {
        setError(result.error || 'Login failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      if (result.mustChangePassword) {
        setPendingUser(result.user);
        setMustChangePass(true);
        setLoading(false);
        return;
      }

      onLoginSuccess(result.user);
    } catch (err) {
      setError('An unexpected system error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeError(null);

    if (!pendingUser) return;

    if (newPassword.length < 6) {
      setPassChangeError('The new password must be at least 6 characters in length.');
      return;
    }

    if (newPassword === 'Sherifdeen') {
      setPassChangeError('Please choose a new password that differs from the initial setup password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassChangeError('New password and confirmation password do not match.');
      return;
    }

    setLoading(true);
    const result = await changePassword(pendingUser.id, newPassword);
    setLoading(false);

    if (result.success) {
      onLoginSuccess({ ...pendingUser, mustChangePassword: false });
    } else {
      setPassChangeError(result.error || 'Failed to update password.');
    }
  };

  const handleQuickDemoFill = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 bg-purple-950/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl text-white animate-fadeIn">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-0.5 shadow-lg border border-purple-400/30 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-amber-300" />
        </div>
        <span className="block text-[10px] font-bold tracking-[0.25em] text-amber-400 uppercase">
          SDG 4 QUALITY EDUCATION
        </span>
        <h2 className="text-lg font-extrabold text-white mt-1 leading-snug">
          NATIONS WORLD AFFAIRS OF SUSTAINABLE DEVELOPMENT INSTITUTE
        </h2>
        <p className="text-xs text-purple-200/80 mt-1">
          Human Capital Development & Assessment Portal
        </p>
      </div>

      {!mustChangePass ? (
        <>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1.5 uppercase tracking-wider">
                Official Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sherifdeen@nasdi.org"
                  className="w-full pl-10 pr-4 py-2.5 bg-purple-900/40 border border-purple-400/30 rounded-xl text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-[11px] text-amber-300 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-purple-900/40 border border-purple-400/30 rounded-xl text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Secure Portal Login</span>
                </>
              )}
            </button>
          </form>

          {/* Institutional Quick Fill Role Selectors */}
          <div className="mt-6 pt-5 border-t border-purple-500/20">
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-amber-300 mb-2">
              AUTHORISED TEAM ROLE SELECTORS:
            </span>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('sherifdeen@nasdi.org', 'Sherifdeen')}
                className="p-2.5 rounded-lg bg-purple-900/30 hover:bg-purple-900/60 border border-purple-400/20 text-left flex items-center justify-between group transition"
              >
                <div>
                  <span className="font-bold text-amber-300 block">Super Administrator</span>
                  <span className="text-[10px] text-purple-200/70 font-mono">sherifdeen@nasdi.org</span>
                </div>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-1 rounded font-mono font-bold">
                  Autofill Super Admin
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoFill('reviewer@nasdi.org', 'Reviewer2026!')}
                className="p-2.5 rounded-lg bg-purple-900/30 hover:bg-purple-900/60 border border-purple-400/20 text-left flex items-center justify-between group transition"
              >
                <div>
                  <span className="font-bold text-emerald-300 block">Assessment Reviewer</span>
                  <span className="text-[10px] text-purple-200/70 font-mono">reviewer@nasdi.org</span>
                </div>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-1 rounded font-mono font-bold">
                  Autofill Reviewer
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoFill('bello@nasdi.org', 'Participant2026!')}
                className="p-2.5 rounded-lg bg-purple-900/30 hover:bg-purple-900/60 border border-purple-400/20 text-left flex items-center justify-between group transition"
              >
                <div>
                  <span className="font-bold text-sky-300 block">Deputy Team Lead (Participant)</span>
                  <span className="text-[10px] text-purple-200/70 font-mono">bello@nasdi.org</span>
                </div>
                <span className="text-[10px] bg-sky-400/20 text-sky-300 px-2 py-1 rounded font-mono font-bold">
                  Autofill Participant
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Forced Password Update Form for Temporary Password */
        <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
            <Key className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-300">Mandatory Initial Password Update</span>
              <p className="mt-0.5 text-[11px] leading-relaxed">
                You are logging in with the initial setup password (<code className="bg-purple-900/60 px-1 py-0.5 rounded text-amber-300 font-mono">Sherifdeen</code>). As required by NASDI security policies, you must establish a new private password before continuing.
              </p>
            </div>
          </div>

          {passChangeError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{passChangeError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-purple-200 mb-1.5 uppercase tracking-wider">
              New Private Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 bg-purple-900/40 border border-purple-400/30 rounded-xl text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-purple-200 mb-1.5 uppercase tracking-wider">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-10 pr-4 py-2.5 bg-purple-900/40 border border-purple-400/30 rounded-xl text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <UserCheck className="w-4 h-4 text-slate-950" />
            )}
            <span>Update Password & Proceed</span>
          </button>
        </form>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-purple-950 border border-purple-500/40 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Key className="w-4 h-4" />
                Password Reset Instructions
              </h3>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="text-purple-300 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-purple-200/90 leading-relaxed">
              If you have lost your credentials, please enter your registered NASDI official email below to request a password reset or contact the Super Administrator (<code className="text-amber-300">sherifdeen@nasdi.org</code>).
            </p>

            {resetSuccessMsg ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs rounded-xl">
                {resetSuccessMsg}
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your official email address"
                  className="w-full px-4 py-2.5 bg-purple-900/50 border border-purple-400/30 rounded-xl text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-amber-400"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (resetEmail) {
                      setResetSuccessMsg(`A reset notification request has been logged for ${resetEmail}. If authorized, the Super Administrator will issue a temporary reset key.`);
                    }
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded-xl transition"
                >
                  Send Reset Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
