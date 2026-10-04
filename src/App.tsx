import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Homepage } from './components/Homepage';
import { ProductionDashboard } from './components/production/ProductionDashboard';
import { GameCenterDashboard } from './components/GameCenterDashboard';
import { Hero } from './components/Hero';
import { TeamsOverview } from './components/TeamsOverview';
import { HowItWorks } from './components/HowItWorks';
import { ApplicationForm } from './components/ApplicationForm';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { NOVA } from './components/NOVA';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'portal' | 'production' | 'games'>('home');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const handleNavigate = (
    view: 'home' | 'portal' | 'production' | 'games',
    sectionId?: string,
    filter?: string
  ) => {
    if (view === 'games' && filter) {
      if (filter === 'decision-room' || filter === 'research-detective') {
        setActiveGameId(filter);
      } else {
        setActiveGameId(null);
      }
    } else {
      setActiveGameId(null);
    }

    setActiveView(view);

    if (filter) {
      setActiveFilter(filter);
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenPortal = (sectionId?: string) => {
    handleNavigate('portal', sectionId || 'application-section');
  };

  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-ivory selection:bg-emerald/30 selection:text-gold font-sans">
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activeView === 'home' && (
          <Homepage
            onOpenPortal={() => handleOpenPortal('application-section')}
            activeFilter={activeFilter}
            onFilterChange={(filter) => setActiveFilter(filter)}
            onNavigateToSection={(id: string) => {
              if (id === 'production') {
                handleNavigate('production');
              } else {
                handleNavigate('home', id);
              }
            }}
          />
        )}

        {activeView === 'games' && (
          <div>
            <GameCenterDashboard
              initialCategory={activeFilter}
              activeGameId={activeGameId}
              onSelectGame={(gid) => setActiveGameId(gid)}
            />
          </div>
        )}

        {activeView === 'production' && (
          <div className="pt-20">
            <ProductionDashboard />
          </div>
        )}

        {activeView === 'portal' && (
          <div className="animate-fadeIn">
            <div className="bg-deep-emerald border-b border-gold/20 text-gold text-center py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 pt-20">
              <span>NationsWorld Official Membership Portal</span>
              <button
                type="button"
                onClick={() => handleNavigate('home')}
                className="underline hover:text-ivory ml-2 transition-colors"
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

      {/* Floating NOVA Natural Language Intelligent Navigation Assistant */}
      <NOVA
        activeView={activeView}
        activeFilter={activeFilter}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default App;
