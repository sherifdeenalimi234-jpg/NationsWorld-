import React from 'react';
import { Globe, MessageSquare, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER } from '../utils/reference';

interface FooterProps {
  onNavigate?: (view: 'home' | 'portal' | 'production' | 'games', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (view: 'home' | 'portal' | 'production' | 'games', sectionId?: string) => {
    if (onNavigate) {
      onNavigate(view, sectionId);
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-obsidian text-ivory pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-gold/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gold/20 pb-12">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-emerald to-emerald text-ivory flex items-center justify-center font-extrabold border border-gold/30 shadow-md">
                <Globe className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                  NATIONSWORLD
                </span>
                <span className="block text-xs font-extrabold text-ivory tracking-tight">
                  OF VISIONARY ADVANCEMENT
                </span>
              </div>
            </div>

            <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] leading-snug">
              RESEARCH • INNOVATION • DEVELOPMENT • LEADERSHIP • PRODUCTION
            </p>

            <p className="text-xs text-sage leading-relaxed">
              Multidisciplinary platform dedicated to developing people, advancing ideas and creating pathways for meaningful contribution across Africa and globally.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-medium text-sage">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('games')}
                  className="text-gold font-bold hover:underline transition"
                >
                  • Game Center
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'about')}
                  className="hover:text-gold transition"
                >
                  • About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'teams')}
                  className="hover:text-gold transition"
                >
                  • Teams & Institutes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'programmes')}
                  className="hover:text-gold transition"
                >
                  • Programmes & Initiatives
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'pathway')}
                  className="hover:text-gold transition"
                >
                  • How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('production')}
                  className="text-mint font-bold hover:underline transition"
                >
                  • Production Hub (OFFICE)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('portal', 'faq')}
                  className="hover:text-gold transition"
                >
                  • FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('portal', 'application-section')}
                  className="text-gold font-bold hover:underline transition"
                >
                  • Membership Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('home', 'contact')}
                  className="hover:text-gold transition"
                >
                  • Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              SECRETARIAT CONTACT
            </h4>
            <div className="p-4 bg-deep-emerald/30 border border-gold/20 rounded-2xl space-y-2">
              <span className="text-[11px] text-sage block font-semibold">Official WhatsApp Submission:</span>
              <a
                href="https://wa.me/2347073180242"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono font-bold text-mint text-sm hover:underline"
              >
                <MessageSquare className="w-4 h-4 text-gold shrink-0" />
                {OFFICIAL_WHATSAPP_NUMBER}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <p className="text-[11px] text-sage leading-normal">
                Strictly for membership application submissions and official inquiries.
              </p>
            </div>
          </div>

          {/* Privacy & Social Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-gold" />
              PRIVACY & DATA
            </h4>
            <p className="text-xs text-sage leading-relaxed bg-deep-emerald/30 p-3.5 rounded-2xl border border-gold/20">
              Draft documents and applications are processed directly in your browser with client-side security.
            </p>

            <div>
              <span className="text-[11px] font-bold text-gold uppercase tracking-wider block mb-2">
                CONNECT WITH US
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/2347073180242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-deep-emerald border border-gold/30 hover:bg-emerald text-ivory flex items-center justify-center transition text-xs font-bold"
                  aria-label="WhatsApp"
                >
                  WA
                </a>
                <span className="text-xs text-sage">NationsWorld Secretariat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sage gap-4">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} NationsWorld of Visionary Advancement. All rights reserved.
          </p>

          <p className="text-gold text-[11px] font-mono tracking-wider">
            BUILDING PEOPLE • ADVANCING IDEAS • CREATING THE FUTURE
          </p>
        </div>
      </div>
    </footer>
  );
};
