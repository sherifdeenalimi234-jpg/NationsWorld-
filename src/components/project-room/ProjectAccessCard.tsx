import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, AlertCircle, KeyRound, Info } from 'lucide-react';

interface ProjectAccessCardProps {
  onAccessSuccess: () => void;
}

export const ProjectAccessCard: React.FC<ProjectAccessCardProps> = ({ onAccessSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmed = password.trim();

    if (!trimmed) {
      setErrorMsg('Please enter an access password.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Demo password check for Phase 1 frontend access experience
    // Accepts common sample passwords or non-empty password (unless explicitly 'wrong' or 'incorrect')
    if (trimmed.toLowerCase() === 'wrong' || trimmed.toLowerCase() === 'incorrect') {
      setErrorMsg('Access not recognized. Please check your password and try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onAccessSuccess();
    }, 400);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Access Card Outer Glass Container */}
      <div
        className={`bg-obsidian/85 backdrop-blur-xl border border-gold/35 rounded-3xl p-6 sm:p-8 shadow-glass-dark transition-all duration-300 relative overflow-hidden ${
          isShaking ? 'animate-bounce border-red-500/50' : ''
        }`}
      >
        {/* Subtle Ambient Light Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-gold/20">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-deep-emerald to-emerald/80 border border-gold/40 flex items-center justify-center text-gold shadow-md shrink-0">
            <ShieldCheck className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-ivory tracking-tight">
              Restricted Access
            </h2>
            <p className="text-xs text-sage font-medium mt-0.5">
              This workspace is reserved for authorized NationsWorld participants.
            </p>
          </div>
        </div>

        {/* Access Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Password Input Group */}
          <div>
            <label
              htmlFor="project-room-password"
              className="block text-xs font-bold text-gold uppercase tracking-wider mb-2 flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-gold" />
              <span>Enter Access Password</span>
            </label>

            <div className="relative">
              <input
                id="project-room-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Your access password"
                aria-describedby={errorMsg ? 'password-error' : 'password-notice'}
                aria-invalid={!!errorMsg}
                className={`w-full bg-deep-emerald/30 border text-sm text-ivory placeholder-sage/60 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 transition-all ${
                  errorMsg
                    ? 'border-red-500/70 focus:ring-red-500/40 bg-red-950/20'
                    : 'border-gold/30 focus:border-gold focus:ring-gold/20'
                }`}
                autoComplete="current-password"
              />

              {/* Show/Hide Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-sage hover:text-gold transition focus:outline-none focus:ring-1 focus:ring-gold/50"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gold" />
                ) : (
                  <Eye className="w-4 h-4 text-sage" />
                )}
              </button>
            </div>
          </div>

          {/* Polished Error State */}
          {errorMsg && (
            <div
              id="password-error"
              role="alert"
              className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-red-300">Access not recognized.</p>
                <p className="text-[11px] text-red-200/90">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald via-emerald-600 to-deep-emerald hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-widest border border-gold/40 shadow-xl transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <span>Verifying Access...</span>
              </span>
            ) : (
              <span>Access Project Room</span>
            )}
          </button>

          {/* Secondary Footer Label */}
          <div className="text-center pt-1">
            <p className="text-[11px] text-sage/80 font-mono tracking-wider">
              Authorized participants only.
            </p>
          </div>
        </form>
      </div>

      {/* Subtle Notice Below Card */}
      <div id="password-notice" className="mt-5 text-center px-4">
        <p className="text-[11px] text-sage/75 leading-relaxed flex items-center justify-center gap-1.5 max-w-sm mx-auto">
          <Info className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>
            Project Room access is intended for authorized NationsWorld participants. Do not share your access credentials.
          </span>
        </p>
      </div>
    </div>
  );
};
