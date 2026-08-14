import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TeamsOverview } from './components/TeamsOverview';
import { HowItWorks } from './components/HowItWorks';
import { ApplicationForm } from './components/ApplicationForm';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const scrollToApplication = () => {
    const el = document.getElementById('application-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-nw-dark selection:bg-nw-soft selection:text-nw-deep">
      <Navbar onApplyClick={scrollToApplication} />

      <main className="flex-1">
        <Hero onStartApplication={scrollToApplication} />

        <div className="py-4">
          <ApplicationForm />
        </div>

        <HowItWorks />
        <TeamsOverview />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
