import React from 'react';
import { Shield, Sparkles, CheckCircle, ArrowRight, Award } from 'lucide-react';

interface HeroProps {
  onStartApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartApplication }) => {
  return (
    <div id="about" className="bg-gradient-to-b from-emerald-950 via-nw-deep to-nw-dark text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#16834B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Institutional Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold uppercase tracking-widest mb-6">
          <Award className="w-4 h-4 text-emerald-400" />
          NationsWorld Membership Portal — Stage 1
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          NATIONSWORLD OF <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-emerald-200">
            VISIONARY ADVANCEMENT
          </span>
        </h1>

        <p className="mt-4 text-emerald-100 text-xs sm:text-sm uppercase tracking-widest font-bold">
          Research • Innovation • Development • Leadership • Impact
        </p>

        {/* Introduction Paragraph */}
        <p className="mt-6 text-sm sm:text-base lg:text-lg text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
          Welcome to the official Stage 1 Membership Application Portal. NationsWorld is a global multidisciplinary collective dedicated to empowering researchers, innovators, policy practitioners, and strategic thinkers driving sustainable advancement across Africa and beyond.
        </p>

        {/* Key Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8 text-left">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              Institutional Standard
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Rigorous screening and review process for all prospective members.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              15 Strategic Teams
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Multidisciplinary institutes ranging from NASDI to Tech, Health, and Governance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Instant PDF Generation
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Generates a formal document with reference ID ready for WhatsApp submission.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onStartApplication}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-nw-green hover:bg-emerald-600 text-white font-extrabold text-base transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group"
          >
            <span>BEGIN STAGE 1 APPLICATION</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
