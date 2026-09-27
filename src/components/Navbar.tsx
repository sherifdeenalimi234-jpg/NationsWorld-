import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeView: 'home' | 'portal';
  onNavigate: (view: 'home' | 'portal', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [membershipExpanded, setMembershipExpanded] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'portal', sectionId?: string) => {
    setIsOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-nw-dark/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-nw-dark border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo + Brand Name */}
        <button
          type="button"
          onClick={() => handleNavClick('home', 'hero')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-nw-green to-emerald-600 text-white flex items-center justify-center font-extrabold shadow-md group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-100" />
          </div>
          <div>
            <span className="block text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400">
              NATIONSWORLD
            </span>
            <span className="block text-xs sm:text-sm font-extrabold text-white tracking-tight leading-tight mt-0.5">
              OF VISIONARY ADVANCEMENT
            </span>
          </div>
        </button>

        {/* Right: Hamburger Menu Trigger */}
        <div className="flex items-center gap-3">
          {activeView === 'portal' && (
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-emerald-200 transition"
            >
              ← Back to Main Site
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-2 border border-white/15 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline text-emerald-300">
              Menu
            </span>
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Hamburger Menu Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end transition-opacity animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-nw-dark h-full shadow-2xl border-l border-white/10 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-nw-green flex items-center justify-center text-white">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
                    NATIONSWORLD
                  </span>
                  <span className="block text-xs font-extrabold text-white">
                    NAVIGATION MENU
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-1.5 flex-1 overflow-y-auto">
              <button
                type="button"
                onClick={() => handleNavClick('home', 'hero')}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
              >
                <span>Home</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'about')}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
              >
                <span>About</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'teams')}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
              >
                <span>Teams & Institutes</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'programmes')}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
              >
                <span>Programmes & Initiatives</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'how-it-works')}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
              >
                <span>How It Works</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'production')}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
              >
                <span>Production</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'faq')}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
              >
                <span>FAQ</span>
              </button>

              {/* Membership Nested Accordion */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 my-2 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMembershipExpanded(!membershipExpanded)}
                  className="w-full text-left px-4 py-3.5 text-base font-bold text-emerald-300 hover:text-white flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Membership
                  </span>
                  {membershipExpanded ? (
                    <ChevronDown className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-emerald-400" />
                  )}
                </button>

                {membershipExpanded && (
                  <div className="px-3 pb-3 space-y-1.5 pl-6 border-t border-emerald-500/20 pt-2">
                    <button
                      type="button"
                      onClick={() => handleNavClick('portal')}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-between ${
                        activeView === 'portal'
                          ? 'bg-nw-green text-white font-bold'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>→ Membership Portal</span>
                      {activeView === 'portal' && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-mono">ACTIVE</span>}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('portal', 'application-section')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-emerald-300 hover:text-white hover:bg-emerald-800/40 transition flex items-center justify-between"
                    >
                      <span>→ Apply for Membership</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'contact')}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition flex items-center justify-between"
              >
                <span>Contact</span>
              </button>
            </nav>

            {/* Drawer Footer CTA */}
            <div className="p-6 border-t border-white/10 bg-black/30 space-y-3">
              <button
                type="button"
                onClick={() => handleNavClick('portal', 'application-section')}
                className="w-full py-3.5 rounded-xl bg-nw-green hover:bg-nw-hover text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition"
              >
                <span>OPEN MEMBERSHIP PORTAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-gray-400">
                NationsWorld of Visionary Advancement &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
