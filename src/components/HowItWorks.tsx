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
    <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-nw-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-nw-green">
            STATIC-FIRST WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-nw-dark mt-1">
            How The Application Process Works
          </h2>
          <p className="text-sm sm:text-base text-nw-muted mt-2">
            NationsWorld operates a client-first, secure membership submission model. No account creation required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-nw-border shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black font-mono text-nw-muted/40">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-nw-dark mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-nw-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Static-First Callout */}
        <div className="mt-10 p-5 bg-white rounded-2xl border border-nw-border flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-nw-green flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div className="text-xs sm:text-sm text-nw-dark">
            <h4 className="font-bold text-nw-deep text-sm">Data Privacy & Security Guarantee</h4>
            <p className="text-nw-muted mt-0.5">
              Your application data remains completely private in your browser until you choose to download and send the PDF to NationsWorld. We do not store your data on external databases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
