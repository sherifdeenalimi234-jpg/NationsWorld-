import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, ArrowRight, Sparkles, Lock } from 'lucide-react';

interface NavbarProps {
  activeView: 'home' | 'portal' | 'production' | 'games' | 'project-room';
  onNavigate: (view: 'home' | 'portal' | 'production' | 'games' | 'project-room', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [membershipExpanded, setMembershipExpanded] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scrolling when hamburger drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (view: 'home' | 'portal' | 'production' | 'games' | 'project-room', sectionId?: string) => {
    setIsOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian/90 backdrop-blur-md border-b border-gold/20 py-3 shadow-glass-dark'
            : 'bg-obsidian/70 backdrop-blur-sm border-b border-gold/15 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo & Name */}
          <button
            type="button"
            onClick={() => handleNavClick('home', 'hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-deep-emerald to-emerald text-white flex items-center justify-center font-extrabold shadow-md border border-gold/30 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            </div>
            <div>
              <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gold">
                NATIONSWORLD
              </span>
              <span className="block text-xs sm:text-sm font-extrabold text-ivory tracking-tight leading-tight mt-0.5 group-hover:text-mint transition-colors">
                OF VISIONARY ADVANCEMENT
              </span>
            </div>
          </button>

          {/* Right: Actions & Hamburger Trigger */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Quick Link to Project Room */}
            <button
              type="button"
              onClick={() => handleNavClick('project-room')}
              className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                activeView === 'project-room'
                  ? 'bg-emerald text-white border-gold shadow-md'
                  : 'bg-deep-emerald/40 hover:bg-deep-emerald text-gold border-gold/30'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Project Room</span>
            </button>

            {activeView !== 'home' && (
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-deep-emerald/50 hover:bg-deep-emerald text-xs font-semibold text-gold border border-gold/30 transition"
              >
                ← Public Homepage
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-deep-emerald text-white hover:bg-emerald transition flex items-center gap-2 shadow-md border border-gold/30 focus:outline-none group shrink-0"
              aria-label="Toggle navigation menu"
            >
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline text-gold group-hover:text-white transition-colors">
                Menu
              </span>
              {isOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6 text-gold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Navigation Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-obsidian/80 backdrop-blur-md flex justify-end transition-opacity animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-gradient-to-b from-obsidian via-deep-emerald to-obsidian text-ivory h-full shadow-2xl border-l border-gold/30 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-gold/20 flex items-center justify-between bg-obsidian/60 sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald/20 border border-gold/30 flex items-center justify-center text-gold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gold tracking-[0.2em] uppercase">
                    NATIONSWORLD
                  </span>
                  <span className="block text-xs font-extrabold text-ivory">
                    INSTITUTIONAL NAVIGATION
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-white/10 border border-white/15 text-ivory hover:bg-white/20 transition focus:outline-none"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-gold" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-2 flex-1 overflow-y-auto">
              <button
                type="button"
                onClick={() => handleNavClick('home', 'hero')}
                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-ivory/90 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20 transition flex items-center justify-between group"
              >
                <span>Home</span>
                <span className="text-xs text-sage group-hover:text-gold font-mono">01</span>
              </button>

              {/* PROJECT ROOM ROUTE IN DRAWER */}
              <button
                type="button"
                onClick={() => handleNavClick('project-room')}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold transition flex items-center justify-between border ${
                  activeView === 'project-room'
                    ? 'bg-emerald text-white border-gold shadow-lg'
                    : 'bg-deep-emerald/50 border-gold/40 text-ivory hover:text-gold hover:bg-deep-emerald'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-gold shrink-0" />
                  <span>Project Room</span>
                  <span className="text-[10px] bg-gold/20 text-gold border border-gold/40 px-2 py-0.5 rounded font-mono font-bold">
                    RESTRICTED
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'about')}
                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-ivory/90 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20 transition flex items-center justify-between group"
              >
                <span>About</span>
                <span className="text-xs text-sage group-hover:text-gold font-mono">02</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'teams')}
                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-ivory/90 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20 transition flex items-center justify-between group"
              >
                <span>Teams & Institutes</span>
                <span className="text-xs text-sage group-hover:text-gold font-mono">03</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'programmes')}
                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-ivory/90 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20 transition flex items-center justify-between group"
              >
                <span>Programmes & Initiatives</span>
                <span className="text-xs text-sage group-hover:text-gold font-mono">04</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'pathway')}
                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-ivory/90 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20 transition flex items-center justify-between group"
              >
                <span>How It Works</span>
                <span className="text-xs text-sage group-hover:text-gold font-mono">05</span>
              </button>

              {/* GAME CENTER ROUTE */}
              <button
                type="button"
                onClick={() => handleNavClick('games')}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold transition flex items-center justify-between border ${
                  activeView === 'games'
                    ? 'bg-emerald text-white border-gold shadow-lg'
                    : 'bg-white/5 border-gold/30 text-ivory hover:text-gold hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span>Game Center</span>
                  <span className="text-[10px] bg-gold/20 text-gold border border-gold/40 px-2 py-0.5 rounded font-mono font-bold">
                    PLAY & LEARN
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              {/* PRODUCTION HUB ROUTE */}
              <button
                type="button"
                onClick={() => handleNavClick('production')}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold transition flex items-center justify-between border ${
                  activeView === 'production'
                    ? 'bg-emerald text-white border-gold shadow-lg'
                    : 'bg-white/5 border-gold/30 text-ivory hover:text-gold hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span>Production Hub</span>
                  <span className="text-[10px] bg-gold/20 text-gold border border-gold/40 px-2 py-0.5 rounded font-mono font-bold">
                    OFFICE
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'faq')}
                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-ivory/90 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20 transition flex items-center justify-between group"
              >
                <span>FAQ</span>
                <span className="text-xs text-sage group-hover:text-gold font-mono">07</span>
              </button>

              {/* Membership Nested Accordion */}
              <div className="rounded-xl border border-gold/30 bg-obsidian/40 my-2 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMembershipExpanded(!membershipExpanded)}
                  className="w-full text-left px-4 py-3.5 text-sm font-bold text-gold hover:text-ivory flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                    Membership
                  </span>
                  {membershipExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gold" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gold" />
                  )}
                </button>

                {membershipExpanded && (
                  <div className="px-3 pb-3 space-y-1.5 pl-6 border-t border-gold/15 pt-2 bg-obsidian/50">
                    <button
                      type="button"
                      onClick={() => handleNavClick('portal')}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-between border ${
                        activeView === 'portal'
                          ? 'bg-emerald text-white border-emerald font-bold'
                          : 'text-sage hover:text-ivory hover:bg-white/5 border-transparent'
                      }`}
                    >
                      <span>Membership Portal</span>
                      {activeView === 'portal' && <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-white font-mono">ACTIVE</span>}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('portal', 'application-section')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold text-mint hover:text-gold hover:bg-white/5 transition flex items-center justify-between"
                    >
                      <span>Apply for Membership</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('home', 'contact')}
                className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-ivory/90 hover:text-gold hover:bg-white/5 border border-transparent hover:border-gold/20 transition flex items-center justify-between group"
              >
                <span>Contact</span>
                <span className="text-xs text-sage group-hover:text-gold font-mono">09</span>
              </button>
            </nav>

            {/* Drawer Footer CTA */}
            <div className="p-6 border-t border-gold/20 bg-obsidian/90 space-y-3 sticky bottom-0 z-10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => handleNavClick('production')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald via-emerald-600 to-deep-emerald hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider border border-gold/30 shadow-xl flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>OPEN PRODUCTION HUB</span>
              </button>
              <p className="text-[10px] text-center text-sage tracking-widest uppercase font-mono">
                NationsWorld of Visionary Advancement &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
