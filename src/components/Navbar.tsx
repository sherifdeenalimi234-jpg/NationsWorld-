import React, { useState } from 'react';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onApplyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-nw-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-nw-green text-white flex items-center justify-center font-extrabold text-xl shadow-xs group-hover:bg-nw-deep transition">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-nw-green">
              NATIONSWORLD
            </span>
            <span className="block text-sm sm:text-base font-extrabold text-nw-dark tracking-tight leading-none mt-0.5">
              OF VISIONARY ADVANCEMENT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-nw-dark">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="hover:text-nw-green transition"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('teams')}
            className="hover:text-nw-green transition"
          >
            Teams
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-nw-green transition"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="hover:text-nw-green transition"
          >
            FAQ
          </button>
        </nav>

        {/* Desktop Primary CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onApplyClick}
            className="px-5 py-2.5 rounded-xl bg-nw-green hover:bg-nw-hover text-white font-bold text-xs sm:text-sm transition shadow-sm flex items-center gap-2 group"
          >
            <span>APPLY FOR MEMBERSHIP</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-nw-dark hover:bg-gray-100 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-nw-border px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="block w-full text-left py-2 text-sm font-semibold text-nw-dark hover:text-nw-green"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('teams')}
            className="block w-full text-left py-2 text-sm font-semibold text-nw-dark hover:text-nw-green"
          >
            Teams & Institutes
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm font-semibold text-nw-dark hover:text-nw-green"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm font-semibold text-nw-dark hover:text-nw-green"
          >
            FAQ
          </button>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onApplyClick();
              }}
              className="w-full py-3 rounded-xl bg-nw-green text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <span>APPLY FOR MEMBERSHIP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
