import React from 'react';
import { FormInput, FileDown, Send, UserCheck, Shield } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Complete Application',
      description: 'Fill out the multi-step online form detailing your background, team selection, and motivation.',
      icon: FormInput,
    },
    {
      num: '02',
      title: 'Generate & Download PDF',
      description: 'Review your details and generate a reference-coded membership application document in PDF format.',
      icon: FileDown,
    },
    {
      num: '03',
      title: 'Submit via WhatsApp',
      description: 'Tap "Submit via WhatsApp", attach your downloaded PDF document, and send it to official Secretariat.',
      icon: Send,
    },
    {
      num: '04',
      title: 'Administrative Review',
      description: 'The Secretariat reviews your application. Upon approval, you will receive your official Member ID.',
      icon: UserCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-deep-emerald/30 to-obsidian border-b border-gold/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-gold block mb-2">
            STATIC-FIRST WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory tracking-tight">
            How The Application Process Works
          </h2>
          <p className="text-sm sm:text-base text-sage mt-2">
            NationsWorld operates a client-first, secure membership submission model. No account creation required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="glass-panel glass-panel-hover p-6 rounded-2xl relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald/20 border border-gold/30 text-mint flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-xl font-black font-mono text-gold/40">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-ivory mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-sage leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Static-First Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-deep-emerald/50 border border-gold/30 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald text-white flex items-center justify-center shrink-0 shadow-md border border-gold/30">
            <Shield className="w-6 h-6 text-gold" />
          </div>
          <div className="text-xs sm:text-sm text-ivory">
            <h4 className="font-bold text-gold text-sm">Data Privacy & Security Guarantee</h4>
            <p className="text-sage mt-0.5">
              Your application data remains completely private in your browser until you choose to download and send the PDF to NationsWorld. We do not store your data on external databases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
