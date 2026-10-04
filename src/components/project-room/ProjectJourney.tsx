import React from 'react';
import { ArrowRight, Lock, Key, FilePlus, Search, PenTool, Cpu, Send } from 'lucide-react';

export const ProjectJourney: React.FC = () => {
  const steps = [
    {
      id: 'access',
      label: 'ACCESS',
      icon: Key,
      isActive: true,
      description: 'Authorized verification',
    },
    {
      id: 'assignment',
      label: 'PROJECT ASSIGNMENT',
      icon: FilePlus,
      isActive: false,
      description: 'Project topic & declaration',
    },
    {
      id: 'research',
      label: 'RESEARCH',
      icon: Search,
      isActive: false,
      description: 'Literature & data synthesis',
    },
    {
      id: 'workspace',
      label: 'WORKSPACE',
      icon: PenTool,
      isActive: false,
      description: 'Drafting & structured tools',
    },
    {
      id: 'production',
      label: 'PRODUCTION',
      icon: Cpu,
      isActive: false,
      description: 'Hub document generation',
    },
    {
      id: 'submission',
      label: 'SUBMISSION',
      icon: Send,
      isActive: false,
      description: 'Final secretariat submission',
    },
  ];

  return (
    <div className="mt-16 pt-12 border-t border-gold/20 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10 space-y-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-gold">
          SYSTEM PREVIEW
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-ivory tracking-tight">
          Your Project Journey
        </h3>
        <p className="text-xs text-sage max-w-lg mx-auto">
          An overview of the upcoming multi-stage NationsWorld Project Room workflow.
        </p>
      </div>

      {/* Journey Steps - Desktop Horizontal Flow / Mobile Vertical List */}
      <div className="hidden lg:grid grid-cols-6 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-[2px] bg-gradient-to-r from-gold/30 to-gold/10 z-0 pointer-events-none" />
              )}

              {/* Step Circle */}
              <div
                className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                  step.isActive
                    ? 'bg-gradient-to-br from-emerald to-deep-emerald text-gold border-gold shadow-gold-glow scale-110'
                    : 'bg-obsidian/80 text-sage/60 border-gold/20 opacity-70'
                }`}
              >
                <Icon className={`w-5 h-5 ${step.isActive ? 'text-gold' : 'text-sage/60'}`} />
              </div>

              {/* Badge */}
              <span
                className={`mt-3 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                  step.isActive
                    ? 'bg-emerald/30 text-mint border-emerald/50'
                    : 'bg-white/5 text-sage/60 border-white/10'
                }`}
              >
                {step.isActive ? 'ACTIVE' : 'FUTURE'}
              </span>

              {/* Step Label */}
              <h4
                className={`text-xs font-bold mt-2 tracking-tight ${
                  step.isActive ? 'text-ivory' : 'text-sage/60'
                }`}
              >
                {step.label}
              </h4>

              {/* Description */}
              <p className="text-[10px] text-sage/70 mt-1 leading-tight max-w-[130px]">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile & Tablet Vertical Steps */}
      <div className="lg:hidden space-y-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative">
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  step.isActive
                    ? 'bg-deep-emerald/50 border-gold/50 shadow-md'
                    : 'bg-obsidian/60 border-gold/15 opacity-85'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                      step.isActive
                        ? 'bg-emerald/30 text-gold border-gold/40'
                        : 'bg-white/5 text-sage/50 border-white/10'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${step.isActive ? 'text-gold' : 'text-sage/50'}`} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-ivory">{step.label}</span>
                      <span
                        className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                          step.isActive
                            ? 'bg-emerald/30 text-mint border-emerald/50'
                            : 'bg-white/5 text-sage/60 border-white/10'
                        }`}
                      >
                        {step.isActive ? 'ACTIVE' : 'FUTURE'}
                      </span>
                    </div>
                    <p className="text-[11px] text-sage mt-0.5">{step.description}</p>
                  </div>
                </div>

                {!step.isActive && <Lock className="w-4 h-4 text-sage/40 shrink-0" />}
                {step.isActive && <ArrowRight className="w-4 h-4 text-gold shrink-0" />}
              </div>

              {idx < steps.length - 1 && (
                <div className="w-[2px] h-3 bg-gold/20 mx-auto my-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
