import React from 'react';
import { Globe, MessageSquare, ShieldAlert } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER } from '../utils/reference';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nw-dark text-white pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t-4 border-nw-green">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-800 pb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-nw-green text-white flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight">
                NATIONSWORLD OF VISIONARY ADVANCEMENT
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 uppercase font-semibold tracking-wider">
              Research • Innovation • Development • Leadership • Impact
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Stage 1 Membership Application Portal. Institutional platform for research and visionary development across Africa and globally.
            </p>
          </div>

          {/* Official Secretariat Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
              OFFICIAL SECRETARIAT CONTACT
            </h4>
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
              <span className="text-xs text-gray-400 block">Official Membership WhatsApp:</span>
              <div className="flex items-center gap-2 font-bold font-mono text-emerald-300 text-sm">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                {OFFICIAL_WHATSAPP_NUMBER}
              </div>
              <p className="text-[11px] text-gray-400">
                Official Membership Channel — Strictly for application PDF submissions and official inquiries.
              </p>
            </div>
          </div>

          {/* Privacy & Data Minimisation Notice */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              PRIVACY & DATA NOTICE
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
              Information submitted through this application is intended solely for NationsWorld membership administration and review. Applicants should provide only information necessary for the application process.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>
            &copy; {new Date().getFullYear()} NationsWorld of Visionary Advancement. All rights reserved.
          </p>

          <p className="text-gray-400 text-[11px]">
            Static-First Architecture • Client-Side Document Processing
          </p>
        </div>
      </div>
    </footer>
  );
};
