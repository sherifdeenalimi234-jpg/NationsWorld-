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
  Globe,
  CheckCircle2
} from 'lucide-react';
import { NATIONSWORLD_TEAMS } from '../data/teams';
import heroImage from '../assets/hero.png';

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

export const Homepage: React.FC<HomepageProps> = ({ onOpenPortal, onNavigateToSection }) => {
  const [statementIndex, setStatementIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = TYPEWRITER_STATEMENTS[statementIndex];
    let typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && displayText === currentFullText) {
      typingSpeed = 2200;
    } else if (isDeleting && displayText === '') {
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
    if (id === 'production' && onNavigateToSection) {
      onNavigateToSection('production');
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-obsidian text-ivory font-sans selection:bg-emerald/30 selection:text-gold overflow-x-hidden">
      {/* 2. HERO SECTION - FULL-BLEED HERO IMAGE BACKGROUND */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gold/20 overflow-hidden bg-obsidian"
      >
        {/* Full-Bleed Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-scale duration-1000 scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Sophisticated Layered Gradient Overlay (Obsidian / Dark Emerald / Radial glow) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-obsidian/90 via-obsidian/85 to-obsidian" />
        <div className="absolute inset-0 z-0 bg-radial from-deep-emerald/50 via-obsidian/80 to-obsidian opacity-90" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald/15 via-transparent to-transparent pointer-events-none" />

        {/* Subtle Ambient Grain / Noise */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#D6B56D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Hero Main Content Box */}
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full py-6">
          {/* Small Institutional Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-deep-emerald/90 border border-gold/40 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-xl backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>NATIONSWORLD INSTITUTIONAL PLATFORM</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ivory leading-[1.15] max-w-4xl mx-auto">
            NATIONSWORLD OF <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-mint">
              VISIONARY ADVANCEMENT
            </span>
          </h1>

          {/* Typewriter Animation Statement */}
          <div className="mt-6 min-h-[56px] sm:min-h-[72px] flex items-center justify-center px-2">
            <span className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold text-mint tracking-tight break-words max-w-full">
              {displayText}
              <span className="animate-pulse inline-block w-2.5 sm:w-3.5 h-6 sm:h-9 bg-gold ml-1.5 align-middle"></span>
            </span>
          </div>

          {/* Supporting Statement */}
          <p className="mt-3 text-base sm:text-xl font-bold text-gold tracking-wide">
            Building People. Advancing Ideas. Creating the Future.
          </p>

          {/* Supporting Paragraph */}
          <p className="mt-6 text-sm sm:text-base lg:text-lg text-sage max-w-3xl mx-auto leading-relaxed font-normal">
            NationsWorld is a multidisciplinary platform bringing together people, ideas and initiatives committed to learning, innovation, leadership, development and meaningful production.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-deep-emerald/70 hover:bg-deep-emerald text-ivory font-bold text-xs tracking-[0.15em] uppercase transition duration-300 border border-gold/30 hover:border-gold backdrop-blur-md flex items-center justify-center gap-3 shadow-xl group"
            >
              <span>EXPLORE NATIONSWORLD</span>
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenPortal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald via-emerald-600 to-deep-emerald hover:brightness-110 text-ivory font-extrabold text-xs tracking-[0.15em] uppercase transition duration-300 border border-gold/40 flex items-center justify-center gap-3 shadow-2xl hover:shadow-emerald/20 hover:scale-[1.02] group"
            >
              <span>JOIN NATIONSWORLD</span>
              <ArrowRight className="w-4 h-4 text-ivory group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. WHO WE ARE */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-deep-emerald/20 to-obsidian border-b border-gold/20">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-deep-emerald/40 border border-gold/30 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald/10 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-tr-full pointer-events-none" />

            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block mb-3">
                ABOUT NATIONSWORLD
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory tracking-tight mb-6">
                WHO WE ARE
              </h2>

              <p className="text-base sm:text-lg text-sage leading-relaxed font-normal mb-6">
                NationsWorld of Visionary Advancement is a multidisciplinary community dedicated to developing people, advancing ideas and creating pathways for meaningful contribution.
              </p>

              <p className="text-base sm:text-lg text-sage leading-relaxed font-normal mb-8">
                We bring together researchers, innovators, emerging leaders, creators and development-oriented individuals to learn, collaborate, build and contribute to a better future.
              </p>

              <button
                type="button"
                onClick={() => scrollToSection('philosophy')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald/20 hover:bg-emerald/30 text-mint font-bold text-xs uppercase tracking-wider transition border border-gold/30 hover:border-gold shadow-md group"
              >
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR AREAS OF FOCUS */}
      <section id="focus" className="py-24 px-4 sm:px-6 lg:px-8 bg-obsidian border-b border-gold/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block mb-3">
              CORE AREAS OF FOCUS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ivory tracking-tight">
              WHAT WE DO
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-emerald/20 transition-all">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory mb-3 tracking-tight group-hover:text-gold transition-colors">
                RESEARCH
              </h3>
              <p className="text-sm text-sage leading-relaxed">
                Exploring questions, generating knowledge and understanding the issues that shape our world.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-emerald/20 transition-all">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory mb-3 tracking-tight group-hover:text-gold transition-colors">
                INNOVATION
              </h3>
              <p className="text-sm text-sage leading-relaxed">
                Transforming ideas into new approaches, possibilities and solutions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-emerald/20 transition-all">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory mb-3 tracking-tight group-hover:text-gold transition-colors">
                DEVELOPMENT
              </h3>
              <p className="text-sm text-sage leading-relaxed">
                Developing people, communities, institutions and systems for sustainable advancement.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-emerald/20 transition-all">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory mb-3 tracking-tight group-hover:text-gold transition-colors">
                LEADERSHIP
              </h3>
              <p className="text-sm text-sage leading-relaxed">
                Preparing people to think critically, lead responsibly and contribute meaningfully.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 shadow-xl hover:-translate-y-1 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-emerald/20 transition-all">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory mb-3 tracking-tight group-hover:text-gold transition-colors">
                PRODUCTION
              </h3>
              <p className="text-sm text-sage leading-relaxed">
                Turning knowledge, creativity and ideas into tangible products, projects, solutions and initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR PHILOSOPHY */}
      <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-deep-emerald/40 via-obsidian to-obsidian relative overflow-hidden border-b border-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-deep-emerald border border-gold/30 text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            OUR GUIDING PHILOSOPHY
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory tracking-tight uppercase mb-10">
            ADVANCEMENT BEGINS WITH PEOPLE
          </h2>

          <div className="p-8 sm:p-12 rounded-3xl bg-deep-emerald/30 border border-gold/30 backdrop-blur-md shadow-2xl relative">
            <blockquote className="text-xl sm:text-3xl font-bold text-gold-light leading-relaxed tracking-tight space-y-3 font-serif italic">
              <p>“When people learn, they think differently.</p>
              <p>When they think differently, they create.</p>
              <p className="text-ivory">When they create, they can transform their communities.”</p>
            </blockquote>

            <div className="w-20 h-0.5 bg-gold mx-auto my-8" />

            <p className="text-sm sm:text-base text-sage max-w-2xl mx-auto leading-relaxed font-sans not-italic">
              At NationsWorld, we believe that real and lasting societal transformation does not happen by accident. The development, mindset, and capacity of people form the indispensable foundation for all sustainable advancement.
            </p>
          </div>
        </div>
      </section>

      {/* 6. THE NATIONSWORLD PATHWAY */}
      <section id="pathway" className="py-24 px-4 sm:px-6 lg:px-8 bg-obsidian border-b border-gold/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block mb-3">
              THE NATIONSWORLD PATHWAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory tracking-tight">
              LEARN. THINK. CREATE. LEAD. CONTRIBUTE.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sage">
              A connected five-step visual journey designed for transformative growth and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            <div className="p-6 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 transition duration-300 relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-gold font-mono block mb-3">01</span>
                <div className="w-9 h-9 rounded-lg bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-ivory mb-2 group-hover:text-gold transition-colors">LEARN</h3>
                <p className="text-xs text-sage leading-relaxed">
                  Acquire knowledge, skills and understanding.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 transition duration-300 relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-gold font-mono block mb-3">02</span>
                <div className="w-9 h-9 rounded-lg bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-ivory mb-2 group-hover:text-gold transition-colors">THINK</h3>
                <p className="text-xs text-sage leading-relaxed">
                  Question, analyse and develop ideas.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 transition duration-300 relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-gold font-mono block mb-3">03</span>
                <div className="w-9 h-9 rounded-lg bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-4">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-ivory mb-2 group-hover:text-gold transition-colors">CREATE</h3>
                <p className="text-xs text-sage leading-relaxed">
                  Turn ideas into projects, products and solutions.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 transition duration-300 relative flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black text-gold font-mono block mb-3">04</span>
                <div className="w-9 h-9 rounded-lg bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-ivory mb-2 group-hover:text-gold transition-colors">LEAD</h3>
                <p className="text-xs text-sage leading-relaxed">
                  Apply knowledge through responsible leadership.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 transition duration-300 relative flex flex-col justify-between group sm:col-span-2 lg:col-span-1">
              <div>
                <span className="text-3xl font-black text-gold font-mono block mb-3">05</span>
                <div className="w-9 h-9 rounded-lg bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-ivory mb-2 group-hover:text-gold transition-colors">CONTRIBUTE</h3>
                <p className="text-xs text-sage leading-relaxed">
                  Create meaningful value for people and society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROGRAMMES & INITIATIVES */}
      <section id="programmes" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-deep-emerald/20 to-obsidian border-b border-gold/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block mb-3">
                PRACTICAL INITIATIVES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ivory tracking-tight">
                PROGRAMMES & INITIATIVES
              </h2>
            </div>
            <p className="text-sm text-sage max-w-md mt-2 md:mt-0">
              Interactive platforms designed to bridge knowledge, policy, and execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-deep-emerald/40 border border-gold/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-gold text-obsidian text-[10px] font-extrabold uppercase tracking-widest rounded-bl-xl shadow-md">
                FEATURED PROGRAMME
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-deep-emerald border border-gold/30 text-gold flex items-center justify-center font-black text-lg mb-6">
                  TPD
                </div>

                <h3 className="text-2xl font-black text-ivory tracking-tight mb-2">
                  TPD — THE PRODUCTIVE DISCOURSE
                </h3>

                <p className="text-xs font-extrabold text-gold uppercase tracking-wider mb-4">
                  “A Week of Learning, Leadership, Reflection & Action.”
                </p>

                <p className="text-sm text-sage leading-relaxed mb-8">
                  The Productive Discourse (TPD) is a flagship weekly session where researchers, emerging leaders, and practitioners gather to critique critical socio-economic themes, synthesize actionable insights, and convert theory into tangible initiatives.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenPortal}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald/20 hover:bg-emerald text-mint hover:text-ivory font-bold text-xs uppercase tracking-wider transition border border-gold/30 flex items-center justify-center gap-2 group shadow-lg"
                >
                  <span>EXPLORE PROGRAMMES</span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:text-ivory" />
                </button>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-obsidian border border-gold/30 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep-emerald border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Layers className="w-3.5 h-3.5" />
                  EXPANDING HORIZONS
                </div>

                <h3 className="text-2xl font-black text-ivory tracking-tight mb-3">
                  UPCOMING INITIATIVES
                </h3>

                <p className="text-sm text-sage leading-relaxed mb-6">
                  NationsWorld is actively developing specialized masterclasses, research labs, policy hackathons, and regional innovation summits across our strategic institutes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-deep-emerald/40 border border-gold/20">
                <span className="text-xs font-bold text-gold block mb-1">
                  Want to convene or propose an initiative?
                </span>
                <p className="text-xs text-sage">
                  Join NationsWorld as a member or partner to participate directly in programme creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TEAMS & INSTITUTES */}
      <section id="teams" className="py-24 px-4 sm:px-6 lg:px-8 bg-obsidian border-b border-gold/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block mb-3">
              SPECIALIZED TEAMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ivory tracking-tight">
              OUR TEAMS & INSTITUTES
            </h2>
            <p className="mt-4 text-sm sm:text-base text-sage leading-relaxed">
              NationsWorld operates through specialized teams and institutes designed to transform our areas of focus into practical programmes, initiatives and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NATIONSWORLD_TEAMS.map((team) => (
              <div
                key={team.id}
                className="p-6 rounded-2xl bg-deep-emerald/30 border border-gold/20 hover:border-gold/50 transition duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-deep-emerald text-gold text-[10px] font-extrabold uppercase tracking-wide border border-gold/30">
                      {team.category}
                    </span>
                    {team.acronym && (
                      <span className="text-xs font-mono font-bold text-gold/70">
                        {team.acronym}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-ivory mb-2 leading-snug">
                    {team.name}
                  </h3>

                  <p className="text-xs text-sage leading-relaxed mb-4">
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald to-emerald-600 hover:brightness-110 text-ivory font-extrabold text-xs uppercase tracking-wider transition border border-gold/30 shadow-xl group"
            >
              <span>EXPLORE TEAMS & INSTITUTES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
            </button>
          </div>
        </div>
      </section>

      {/* 8.5 PRODUCTION SECTION */}
      <section id="production" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-deep-emerald/30 to-obsidian border-b border-gold/20">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-deep-emerald/50 text-ivory border border-gold/40 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="max-w-3xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block mb-3">
                DIGITAL SECRETARIAT & DOCUMENT OFFICE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory tracking-tight mb-6">
                PRODUCTION AT NATIONSWORLD
              </h2>

              <p className="text-sm sm:text-base text-sage leading-relaxed mb-6">
                Ideas without execution remain abstract. Production is our core commitment to turning research, creativity, and knowledge into practical, real-world solutions, official documents, policy papers, and certificates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="p-4 rounded-xl bg-obsidian/60 border border-gold/20">
                  <h4 className="text-xs font-bold text-gold uppercase mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                    Production Hub Access
                  </h4>
                  <p className="text-xs text-sage">Create, edit, save local drafts, and generate officially branded PDF documents in your browser.</p>
                </div>
                <div className="p-4 rounded-xl bg-obsidian/60 border border-gold/20">
                  <h4 className="text-xs font-bold text-gold uppercase mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                    Database-Free Privacy
                  </h4>
                  <p className="text-xs text-sage">Complete client-side document processing with LocalStorage and portable `.json` draft exports.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('production')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald hover:bg-emerald-600 text-ivory font-bold text-xs uppercase tracking-wider transition border border-gold/40 shadow-xl group"
              >
                <span>OPEN PRODUCTION HUB</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MEMBERSHIP / JOIN NATIONSWORLD */}
      <section id="membership" className="py-24 px-4 sm:px-6 lg:px-8 bg-obsidian border-b border-gold/20">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-deep-emerald/60 to-obsidian text-ivory shadow-2xl relative overflow-hidden border border-gold/40">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald/10 rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10 text-center mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold block mb-3">
                MEMBERSHIP INVITATION
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight mb-6">
                BECOME PART OF NATIONSWORLD
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-sage leading-relaxed mb-6 font-normal">
                NationsWorld is built around people who are willing to learn, think, create, lead and contribute.
              </p>

              <p className="text-sm sm:text-base text-mint/90 leading-relaxed mb-10 max-w-2xl mx-auto">
                Whether you are a student, researcher, innovator, emerging leader, creator or development-oriented individual, NationsWorld provides a community through which you can grow and contribute.
              </p>

              <button
                type="button"
                onClick={onOpenPortal}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald via-emerald-600 to-deep-emerald hover:brightness-110 text-ivory font-extrabold text-sm tracking-[0.15em] uppercase transition shadow-2xl hover:scale-105 border border-gold/40 group"
              >
                <span>APPLY FOR MEMBERSHIP</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-gold" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL STATEMENT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-obsidian via-deep-emerald/30 to-obsidian text-ivory text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-ivory to-gold mb-8 font-mono">
            “THE FUTURE IS NOT SIMPLY WAITED FOR. <br className="hidden sm:inline" />
            IT IS LEARNED, IMAGINED, BUILT AND LED.”
          </h2>

          <div className="w-24 h-0.5 bg-gold mx-auto mb-8" />

          <p className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-gold uppercase">
            NATIONSWORLD OF VISIONARY ADVANCEMENT
          </p>
        </div>
      </section>
    </div>
  );
};
