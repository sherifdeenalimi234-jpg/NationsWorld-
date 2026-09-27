import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Search,
  Lightbulb,
  TrendingUp,
  Award,
  Box,
  Users,
  Sparkles,
  BookOpen,
  Brain,
  Rocket,
  Shield,
  Layers,
  Globe
} from 'lucide-react';
import { NATIONSWORLD_TEAMS } from '../data/teams';

interface HomepageProps {
  onOpenPortal: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

const TYPEWRITER_STATEMENTS = [
  'We Research.',
  'We Innovate.',
  'We Develop.',
  'We Lead.',
  'We Produce.'
];

export const Homepage: React.FC<HomepageProps> = ({ onOpenPortal }) => {
  // Typewriter state
  const [statementIndex, setStatementIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = TYPEWRITER_STATEMENTS[statementIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFullText) {
      // Pause at full word
      typingSpeed = 2200;
    } else if (isDeleting && displayText === '') {
      // Move to next statement
      setIsDeleting(false);
      setStatementIndex((prev) => (prev + 1) % TYPEWRITER_STATEMENTS.length);
      typingSpeed = 300;
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
      } else {
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
      }

      if (!isDeleting && displayText === currentFullText) {
        setIsDeleting(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, statementIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-slate-50 text-nw-dark font-sans selection:bg-nw-soft selection:text-nw-deep">
      {/* 2. HERO SECTION */}
      <section id="hero" className="relative bg-gradient-to-b from-nw-dark via-[#0d2a1b] to-nw-dark text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-emerald-900/40">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#16834B_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-nw-green/20 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-8 shadow-inner">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            NATIONSWORLD INSTITUTIONAL PLATFORM
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            NATIONSWORLD OF <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-emerald-400">
              VISIONARY ADVANCEMENT
            </span>
          </h1>

          {/* Typewriter Animation */}
          <div className="mt-6 h-16 sm:h-20 flex items-center justify-center">
            <span className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold text-emerald-400 tracking-tight">
              {displayText}
              <span className="animate-pulse inline-block w-3 sm:w-4 h-7 sm:h-10 bg-emerald-400 ml-1.5 align-middle"></span>
            </span>
          </div>

          <p className="mt-2 text-base sm:text-xl font-bold text-emerald-200/90 tracking-wide">
            Building People. Advancing Ideas. Creating the Future.
          </p>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            NationsWorld is a multidisciplinary platform bringing together people, ideas and initiatives committed to learning, innovation, leadership, development and meaningful production.
          </p>

          {/* Hero Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wider uppercase transition border border-white/20 flex items-center justify-center gap-2.5 group shadow-lg"
            >
              <span>EXPLORE NATIONSWORLD</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-400" />
            </button>

            <button
              type="button"
              onClick={onOpenPortal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-nw-green hover:bg-emerald-600 text-white font-extrabold text-sm tracking-wider uppercase transition flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
            >
              <span>JOIN NATIONSWORLD</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. WHO WE ARE */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-nw-border">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-nw-green/5 rounded-bl-full pointer-events-none" />

            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-nw-green block mb-2">
                ABOUT NATIONSWORLD
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-nw-dark tracking-tight mb-6">
                WHO WE ARE
              </h2>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal mb-6">
                NationsWorld of Visionary Advancement is a multidisciplinary community dedicated to developing people, advancing ideas and creating pathways for meaningful contribution.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal mb-8">
                We bring together researchers, innovators, emerging leaders, creators and development-oriented individuals to learn, collaborate, build and contribute to a better future.
              </p>

              <button
                type="button"
                onClick={() => scrollToSection('philosophy')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-nw-dark text-white font-bold text-xs uppercase tracking-wider hover:bg-nw-green transition shadow-md group"
              >
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR AREAS OF FOCUS */}
      <section id="focus" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-nw-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-nw-green block mb-2">
              CORE AREAS OF FOCUS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nw-dark tracking-tight">
              WHAT WE DO
            </h2>
            <div className="w-16 h-1 bg-nw-green mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. RESEARCH */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-nw-green/40 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-6 group-hover:bg-nw-green group-hover:text-white transition-colors">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nw-dark mb-3 tracking-tight">
                RESEARCH
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Exploring questions, generating knowledge and understanding the issues that shape our world.
              </p>
            </div>

            {/* 2. INNOVATION */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-nw-green/40 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-6 group-hover:bg-nw-green group-hover:text-white transition-colors">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nw-dark mb-3 tracking-tight">
                INNOVATION
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Transforming ideas into new approaches, possibilities and solutions.
              </p>
            </div>

            {/* 3. DEVELOPMENT */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-nw-green/40 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-6 group-hover:bg-nw-green group-hover:text-white transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nw-dark mb-3 tracking-tight">
                DEVELOPMENT
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Developing people, communities, institutions and systems for sustainable advancement.
              </p>
            </div>

            {/* 4. LEADERSHIP */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-nw-green/40 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-6 group-hover:bg-nw-green group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nw-dark mb-3 tracking-tight">
                LEADERSHIP
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Preparing people to think critically, lead responsibly and contribute meaningfully.
              </p>
            </div>

            {/* 5. PRODUCTION */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-nw-green/40 hover:-translate-y-1 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center mb-6 group-hover:bg-nw-green group-hover:text-white transition-colors">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nw-dark mb-3 tracking-tight">
                PRODUCTION
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Turning knowledge, creativity and ideas into tangible products, projects, solutions and initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR PHILOSOPHY */}
      <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 bg-nw-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-emerald-950/40 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            OUR GUIDING PHILOSOPHY
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-10">
            ADVANCEMENT BEGINS WITH PEOPLE
          </h2>

          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative">
            <blockquote className="text-xl sm:text-3xl font-extrabold text-emerald-200 leading-snug tracking-tight space-y-3 font-serif italic">
              <p>“When people learn, they think differently.</p>
              <p>When they think differently, they create.</p>
              <p className="text-white">When they create, they can transform their communities.”</p>
            </blockquote>

            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-nw-green mx-auto my-8 rounded-full" />

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans not-italic">
              At NationsWorld, we believe that real and lasting societal transformation does not happen by accident. The development, mindset, and capacity of people form the indispensable foundation for all sustainable advancement.
            </p>
          </div>
        </div>
      </section>

      {/* 6. THE NATIONSWORLD PATHWAY */}
      <section id="pathway" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-nw-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-nw-green block mb-2">
              THE NATIONSWORLD PATHWAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-nw-dark tracking-tight">
              LEARN. THINK. CREATE. LEAD. CONTRIBUTE.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              A connected five-step visual journey designed for transformative growth and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-nw-green transition relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-nw-green font-mono block mb-3">01</span>
                <div className="w-9 h-9 rounded-lg bg-nw-soft text-nw-green flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-nw-dark mb-2">LEARN</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Acquire knowledge, skills and understanding.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-nw-green transition relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-nw-green font-mono block mb-3">02</span>
                <div className="w-9 h-9 rounded-lg bg-nw-soft text-nw-green flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-nw-dark mb-2">THINK</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Question, analyse and develop ideas.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-nw-green transition relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-nw-green font-mono block mb-3">03</span>
                <div className="w-9 h-9 rounded-lg bg-nw-soft text-nw-green flex items-center justify-center mb-4">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-nw-dark mb-2">CREATE</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Turn ideas into projects, products and solutions.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-nw-green transition relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-nw-green font-mono block mb-3">04</span>
                <div className="w-9 h-9 rounded-lg bg-nw-soft text-nw-green flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-nw-dark mb-2">LEAD</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Apply knowledge through responsible leadership.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-nw-green transition relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-nw-green font-mono block mb-3">05</span>
                <div className="w-9 h-9 rounded-lg bg-nw-soft text-nw-green flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-nw-dark mb-2">CONTRIBUTE</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Create meaningful value for people and society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROGRAMMES & INITIATIVES */}
      <section id="programmes" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-nw-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-nw-green block mb-2">
                PRACTICAL INITIATIVES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-nw-dark tracking-tight">
                PROGRAMMES & INITIATIVES
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md mt-2 md:mt-0">
              Interactive platforms designed to bridge knowledge, policy, and execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Programme: TPD */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-nw-green text-white text-[10px] font-extrabold uppercase tracking-widest rounded-bl-xl">
                FEATURED PROGRAMME
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-nw-soft text-nw-green flex items-center justify-center font-black text-lg mb-6">
                  TPD
                </div>

                <h3 className="text-2xl font-black text-nw-dark tracking-tight mb-2">
                  TPD — THE PRODUCTIVE DISCOURSE
                </h3>

                <p className="text-xs font-extrabold text-nw-green uppercase tracking-wider mb-4">
                  “A Week of Learning, Leadership, Reflection & Action.”
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  The Productive Discourse (TPD) is a flagship weekly session where researchers, emerging leaders, and practitioners gather to critique critical socio-economic themes, synthesize actionable insights, and convert theory into tangible initiatives.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenPortal}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-nw-dark hover:bg-nw-green text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 group-hover:bg-nw-green"
                >
                  <span>EXPLORE PROGRAMMES</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>

            {/* Modular Placeholder for Future Programmes */}
            <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950 text-white border border-emerald-900/50 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Layers className="w-3.5 h-3.5" />
                  EXPANDING HORIZONS
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-3">
                  UPCOMING INITIATIVES
                </h3>

                <p className="text-sm text-emerald-100/80 leading-relaxed mb-6">
                  NationsWorld is actively developing specialized masterclasses, research labs, policy hackathons, and regional innovation summits across our strategic institutes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-emerald-300 block mb-1">
                  Want to convene or propose an initiative?
                </span>
                <p className="text-xs text-gray-300">
                  Join NationsWorld as a member or partner to participate directly in programme creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TEAMS & INSTITUTES */}
      <section id="teams" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-nw-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-nw-green block mb-2">
              SPECIALIZED TEAMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nw-dark tracking-tight">
              OUR TEAMS & INSTITUTES
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              NationsWorld operates through specialized teams and institutes designed to transform our areas of focus into practical programmes, initiatives and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NATIONSWORLD_TEAMS.map((team) => (
              <div
                key={team.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-nw-green hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-nw-soft text-nw-green text-[10px] font-extrabold uppercase tracking-wide">
                      {team.category}
                    </span>
                    {team.acronym && (
                      <span className="text-xs font-mono font-bold text-gray-400">
                        {team.acronym}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-nw-dark mb-2 leading-snug">
                    {team.name}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {team.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onOpenPortal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-nw-green hover:bg-nw-hover text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md group"
            >
              <span>EXPLORE TEAMS & INSTITUTES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 8.5 PRODUCTION SECTION */}
      <section id="production" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-nw-border">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-nw-dark to-emerald-950 text-white border border-emerald-900 shadow-xl relative overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
                TANGIBLE OUTPUTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
                PRODUCTION AT NATIONSWORLD
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                Ideas without execution remain abstract. Production is our core commitment to turning research, creativity, and knowledge into practical, real-world solutions, policy papers, technology prototypes, and community developments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase mb-1">Knowledge & Policy Papers</h4>
                  <p className="text-xs text-gray-300">Actionable research papers and strategic frameworks addressing critical challenges.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase mb-1">Community Solutions</h4>
                  <p className="text-xs text-gray-300">High-impact development projects implemented through multidisciplinary teams.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenPortal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-nw-green hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg group"
              >
                <span>PARTICIPATE IN PRODUCTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MEMBERSHIP / JOIN NATIONSWORLD */}
      <section id="membership" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-nw-border">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-nw-green/10 rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10 text-center mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block mb-3">
                MEMBERSHIP INVITATION
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
                BECOME PART OF NATIONSWORLD
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-6 font-normal">
                NationsWorld is built around people who are willing to learn, think, create, lead and contribute.
              </p>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-10 max-w-2xl mx-auto">
                Whether you are a student, researcher, innovator, emerging leader, creator or development-oriented individual, NationsWorld provides a community through which you can grow and contribute.
              </p>

              <button
                type="button"
                onClick={onOpenPortal}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-nw-green hover:bg-emerald-600 text-white font-extrabold text-base tracking-wider uppercase transition shadow-2xl hover:scale-105 group"
              >
                <span>APPLY FOR MEMBERSHIP</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL STATEMENT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-nw-dark via-emerald-950 to-nw-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-emerald-300 mb-8 font-mono">
            “THE FUTURE IS NOT SIMPLY WAITED FOR. <br className="hidden sm:inline" />
            IT IS LEARNED, IMAGINED, BUILT AND LED.”
          </h2>

          <div className="w-24 h-1 bg-nw-green mx-auto mb-8 rounded-full" />

          <p className="text-xs sm:text-sm font-extrabold tracking-widest text-emerald-400 uppercase">
            NATIONSWORLD OF VISIONARY ADVANCEMENT
          </p>
        </div>
      </section>
    </div>
  );
};
