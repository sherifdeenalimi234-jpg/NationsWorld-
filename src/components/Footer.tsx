import React from 'react';
import { Globe, MessageSquare, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER } from '../utils/reference';

interface FooterProps {
  onNavigate?: (view: 'home' | 'portal' | 'production', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (view: 'home' | 'portal' | 'production', sectionId?: string) => {
    if (onNavigate) {
      onNavigate(view, sectionId);
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-nw-dark text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-4 border-nw-green">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nw-green text-white flex items-center justify-center font-extrabold shadow-md">
                <Globe className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  NATIONSWORLD
                </span>
                <span className="block text-xs font-extrabold text-white tracking-tight">
                  OF VISIONARY ADVANCEMENT
                </span>
              </div>
            </div>

            <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest leading-snug">
              RESEARCH • INNOVATION • DEVELOPMENT • LEADERSHIP • PRODUCTION
            </p>

            <p className="text-xs text-gray-400 leading-relaxed">
              Multidisciplinary platform dedicated to developing people, advancing ideas and creating pathways for meaningful contribution across Africa and globally.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-300">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'about')}
                  className="hover:text-emerald-300 transition"
                >
                  • About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'teams')}
                  className="hover:text-emerald-300 transition"
                >
                  • Teams & Institutes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'programmes')}
                  className="hover:text-emerald-300 transition"
                >
                  • Programmes & Initiatives
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'pathway')}
                  className="hover:text-emerald-300 transition"
                >
                  • How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('production')}
                  className="text-emerald-300 font-bold hover:underline transition"
                >
                  • Production Hub
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('portal', 'faq')}
                  className="hover:text-emerald-300 transition"
                >
                  • FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('portal', 'application-section')}
                  className="text-emerald-300 font-bold hover:underline transition"
                >
                  • Membership Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'contact')}
                  className="hover:text-emerald-300 transition"
                >
                  • Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400">
              SECRETARIAT CONTACT
            </h4>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <span className="text-[11px] text-gray-400 block font-semibold">Official WhatsApp Submission:</span>
              <a
                href="https://wa.me/2347073180242"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono font-bold text-emerald-300 text-sm hover:underline"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                {OFFICIAL_WHATSAPP_NUMBER}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <p className="text-[11px] text-gray-400 leading-normal">
                Strictly for membership application submissions and official inquiries.
              </p>
            </div>
          </div>

          {/* Privacy & Social Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              PRIVACY & DATA
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/10">
              Draft documents and applications are processed directly in your browser with client-side security.
            </p>

            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                CONNECT WITH US
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/2347073180242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-nw-green text-white flex items-center justify-center transition text-xs font-bold"
                  aria-label="WhatsApp"
                >
                  WA
                </a>
                <span className="text-xs text-gray-400">NationsWorld Secretariat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} NationsWorld of Visionary Advancement. All rights reserved.
          </p>

          <p className="text-gray-400 text-[11px] font-mono">
            BUILDING PEOPLE • ADVANCING IDEAS • CREATING THE FUTURE
          </p>
        </div>
      </div>
    </footer>
  );
};
