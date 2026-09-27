import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Homepage } from './components/Homepage';
import { Hero } from './components/Hero';
import { TeamsOverview } from './components/TeamsOverview';
import { HowItWorks } from './components/HowItWorks';
import { ApplicationForm } from './components/ApplicationForm';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'portal'>('home');

  const handleNavigate = (view: 'home' | 'portal', sectionId?: string) => {
    setActiveView(view);

    // If a specific section was targeted, scroll to it after state update
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'portal') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenPortal = (sectionId?: string) => {
    handleNavigate('portal', sectionId || 'application-section');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-nw-dark selection:bg-nw-soft selection:text-nw-deep">
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activeView === 'home' ? (
          <Homepage
            onOpenPortal={() => handleOpenPortal('application-section')}
            onNavigateToSection={(id) => handleNavigate('home', id)}
          />
        ) : (
          <div className="animate-fadeIn">
            <div className="bg-emerald-900 text-white text-center py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2">
              <span>NationsWorld Official Membership Portal</span>
              <button
                type="button"
                onClick={() => handleNavigate('home')}
                className="underline hover:text-emerald-200 ml-2"
              >
                Return to Public Homepage
              </button>
            </div>

            <Hero onStartApplication={() => handleOpenPortal('application-section')} />

            <div className="py-6">
              <ApplicationForm />
            </div>

            <HowItWorks />
            <TeamsOverview />
            <FAQSection />
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
