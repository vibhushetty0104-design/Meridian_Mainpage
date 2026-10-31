import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  ShieldCheck,
  HeartPulse,
  Calendar,
  Users,
  PhoneCall,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Smartphone,
  Ear,
  FileText,
  UserCheck,
  Receipt,
  Lock,
  Scale,
  Award,
  MessageSquare,
  Stethoscope,
  ClipboardList,
  CreditCard,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { DiseaseId } from '../types';

interface AboutUsSectionProps {
  onOpenBooking: (diseaseId?: DiseaseId) => void;
  onNavigate?: (path: string) => void;
  isStandalonePage?: boolean;
}

const ABOUT_TITLE = 'ABOUT US';

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  onOpenBooking,
  onNavigate,
  isStandalonePage = false
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef<boolean>(false);

  const [displayedTitle, setDisplayedTitle] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [hasStartedAnimation, setHasStartedAnimation] = useState<boolean>(false);

  useEffect(() => {
    // If user prefers reduced motion, render text immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedTitle(ABOUT_TITLE);
      setIsTypingComplete(true);
      setHasStartedAnimation(true);
      hasTriggeredRef.current = true;
      return;
    }

    // If on standalone /about page, start typing right away
    if (isStandalonePage) {
      startTypingAnimation();
      return;
    }

    // IntersectionObserver triggers typing once when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          observer.disconnect();
          startTypingAnimation();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isStandalonePage]);

  const startTypingAnimation = () => {
    setHasStartedAnimation(true);
    let currentIndex = 0;
    const totalLength = ABOUT_TITLE.length;

    const intervalId = setInterval(() => {
      currentIndex += 1;
      setDisplayedTitle(ABOUT_TITLE.slice(0, currentIndex));

      if (currentIndex >= totalLength) {
        clearInterval(intervalId);
        setIsTypingComplete(true);
      }
    }, 75); // ~75ms per character gives a sophisticated 600ms editorial reveal
  };

  return (
    <div id="about" ref={sectionRef} className="w-full scroll-mt-20">
      
      {/* -----------------------------------------------------------------
          SECTION A — Company Introduction & Editorial Heritage
          Canvas: Pale Sage (#E4ECE6)
          ----------------------------------------------------------------- */}
      <section className="w-full bg-[#E4ECE6] py-20 sm:py-28 border-b border-[#D9E1DB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 
            Visual Introduction: Large Editorial "ABOUT US" with Progressive Typing Animation
          */}
          <div className="mb-10 sm:mb-14 text-left border-b border-[#D9E1DB] pb-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#0B4036] bg-white px-4 py-1.5 rounded-full border border-[#D9E1DB] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#CE5B40]" />
              <span>Meridian Vascular · Clinical Heritage &amp; Operating Model</span>
            </div>

            {/* Prominent Large Editorial ABOUT US Heading */}
            <div className="flex items-center">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-extrabold text-[#0B4036] tracking-tight leading-none uppercase select-none">
                {hasStartedAnimation ? displayedTitle : ''}
                {/* Subtle Terracotta Typing Cursor */}
                {!isTypingComplete && hasStartedAnimation && (
                  <span className="inline-block w-1.5 sm:w-2 h-10 sm:h-16 lg:h-20 bg-[#CE5B40] ml-2 animate-pulse align-baseline rounded-full" />
                )}
              </h1>
            </div>

            <p className="text-xs sm:text-sm font-mono text-[#788780] tracking-wide">
              Center of Excellence in Outpatient Surgical Navigation &amp; Care Coordination
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative (7 Cols) */}
            <div className="lg:col-span-7 space-y-7 text-left">
              
              {/* Core Statement Heading with Smooth Fade-Up Reveal */}
              <h2
                className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0B4036] tracking-tight leading-[1.16] text-balance transition-all duration-700 ease-out ${
                  hasStartedAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Elevating Outpatient Vascular &amp; Surgical Care Through Clinical Precision.
              </h2>

              {/* Supporting Text */}
              <p
                className={`text-base sm:text-lg text-[#42534E] leading-relaxed font-sans transition-all duration-700 delay-150 ease-out ${
                  hasStartedAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Meridian Vascular was established as a specialized clinical platform dedicated to resolving patient uncertainty in vascular and elective surgical health. We combine rigorous duplex ultrasound diagnostics with advanced, minimally invasive modalities including endovenous radial laser ablation (EVLA), medical adhesive therapy (VenaSeal), and high-definition laparoscopic surgery.
              </p>

              {/* Verified Clinical Pillars reveal progressively */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 transition-all duration-700 delay-300 ease-out ${
                  hasStartedAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="p-5 rounded-2xl bg-white border border-[#D9E1DB] shadow-xs space-y-2 hover:border-[#8DAA9D] transition-colors">
                  <div className="flex items-center gap-2 font-serif font-bold text-[#0B4036] text-base">
                    <ShieldCheck className="w-5 h-5 text-[#0B4036] shrink-0" />
                    <span>Evidence-Guided Protocols</span>
                  </div>
                  <p className="text-xs text-[#42534E] font-sans leading-relaxed">
                    Care protocols utilizing 1470nm radial laser fibers, non-thermal adhesives, and 4K laparoscopic imaging systems.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#D9E1DB] shadow-xs space-y-2 hover:border-[#8DAA9D] transition-colors">
                  <div className="flex items-center gap-2 font-serif font-bold text-[#0B4036] text-base">
                    <HeartPulse className="w-5 h-5 text-[#CE5B40] shrink-0" />
                    <span>Patient-First Philosophy</span>
                  </div>
                  <p className="text-xs text-[#42534E] font-sans leading-relaxed">
                    Transparent treatment options, clear Doppler threshold explanations, and personalized daycare recovery pathways.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`pt-2 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-400 ease-out ${
                  hasStartedAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="tap-tactile min-h-[48px] px-8 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-colors shadow-[0_4px_16px_rgba(169,71,47,0.35)] cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Specialist Appointment</span>
                </button>

                <a
                  href="#sustainable-business"
                  className="tap-tactile min-h-[48px] px-7 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold text-[#0B4036] bg-white hover:bg-[#FAF8F4] border border-[#D9E1DB] transition-colors flex items-center gap-2"
                >
                  <span>Our Operating Model</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CE5B40]" />
                </a>
              </div>
            </div>

            {/* Right Facility Image — Fades and Moves Gently into Position */}
            <div
              className={`lg:col-span-5 relative transition-all duration-1000 ease-out ${
                hasStartedAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#D9E1DB] shadow-2xl bg-white group">
                <img
                  src="/assets/photos/clinical-consultation.jpg"
                  alt="Meridian Vascular clinical consultation facility"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/about_us_facility.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072E27]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10.5px] font-mono uppercase tracking-widest text-emerald-300 block mb-1">
                    Accredited Care Suites
                  </span>
                  <p className="font-serif text-base font-semibold leading-snug">
                    Comprehensive Vascular Examination &amp; Duplex Doppler Facilities
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION B — Building a Sustainable Healthcare Business
          Canvas: Warm Sand / Soft Ivory (#FAF8F4)
          ----------------------------------------------------------------- */}
      <section id="sustainable-business" className="w-full bg-[#FAF8F4] py-20 sm:py-28 border-b border-[#D9E1DB] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl text-left space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#A9472F] bg-white px-3.5 py-1 rounded-full border border-[#D9E1DB]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Operational Discipline &amp; Stewardship</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B4036] tracking-tight">
              Building a Sustainable Healthcare Business
            </h2>
            
            <p className="text-sm sm:text-base text-[#42534E] font-sans leading-relaxed">
              A healthcare company must balance patient service with operational discipline and financial sustainability. Our approach is to develop a business model that can grow through dependable hospital relationships, efficient coordination, professional service standards, and a clear understanding of patient requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left 4 Strategic Focus Cards (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              
              <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs space-y-3 hover:border-[#8DAA9D] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                  <Building2 className="w-5 h-5 text-[#0B4036]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Building the Right Partnerships
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Cultivating dependable relationships with accredited hospital partners, daycare surgical centers, and diagnostic facilities that share our dedication to patient safety.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs space-y-3 hover:border-[#8DAA9D] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                  <FileCheck2 className="w-5 h-5 text-[#0B4036]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Establishing Standard Operating Procedures
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Institutionalizing rigorous clinical and administrative SOPs across consultation scheduling, pre-authorization, admission paperwork, and post-discharge reviews.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs space-y-3 hover:border-[#8DAA9D] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#CE5B40]">
                  <Users className="w-5 h-5 text-[#CE5B40]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Developing a Reliable Service Team
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Empowering trained healthcare coordinators who handle patient interactions with empathy, clinical clarity, prompt responsiveness, and respect for privacy.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs space-y-3 hover:border-[#8DAA9D] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                  <Smartphone className="w-5 h-5 text-[#0B4036]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Appropriate Healthcare Technology
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Using secure, appropriate digital technology to organize patient enquiries, consultation slots, insurance pre-authorization documents, and recovery tracking.
                </p>
              </div>

            </div>

            {/* Right Supporting Visual & Long-term Direction Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#D9E1DB] shadow-md bg-white group">
                <img
                  src="/assets/photos/care-journey-reception.jpg"
                  alt="Meridian Vascular coordinated hospital care desk"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/about_us_facility.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072E27]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="font-mono uppercase tracking-wider text-emerald-300 font-semibold block text-[10px]">
                    Institutional Coordination
                  </span>
                  <p className="font-serif text-sm font-bold">
                    Dependable Hospital Relationships &amp; Professional Service Standards
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs space-y-3">
                <h4 className="font-serif text-base font-bold text-[#0B4036]">
                  Our Long-Term Direction
                </h4>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  As the business develops, we will evaluate opportunities to expand our geographical presence, strengthen our specialist network, and introduce additional surgical and diagnostic services based on demonstrated clinical demand.
                </p>
                <div className="pt-2 border-t border-[#D9E1DB]">
                  <p className="text-[11.5px] font-mono text-[#0B4036] font-medium leading-relaxed italic">
                    &ldquo;We believe that sustainable growth in healthcare comes from delivering value consistently and building credibility over time.&rdquo;
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION C — The Patient Comes First
          Canvas: Warm Ivory (#F7F5EF)
          ----------------------------------------------------------------- */}
      <section id="patient-first" className="w-full bg-[#F7F5EF] py-20 sm:py-28 border-b border-[#D9E1DB] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl text-left space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#CE5B40] bg-white px-3.5 py-1 rounded-full border border-[#D9E1DB]">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Ethical Care Principles</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B4036] tracking-tight">
              The Patient Comes First
            </h2>

            <p className="text-sm sm:text-base text-[#42534E] font-sans leading-relaxed">
              Every patient has a different requirement. Some patients know exactly which specialist they want to consult, while others are unsure about where to begin. We want to make it easier for patients to understand their available options without creating unnecessary pressure or confusion.
            </p>
          </div>

          {/* 8 Practical Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            
            {/* Principle 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                    <Ear className="w-5 h-5 text-[#0B4036]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#788780] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D9E1DB]">
                    01
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Attentive Listening
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Listen carefully to the patient&apos;s individual requirements, medical background, and unique concerns before suggesting practical next steps.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D9E1DB] text-[10.5px] font-mono text-[#0B4036] font-semibold">
                Patient-Led Intake
              </div>
            </div>

            {/* Principle 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                    <FileText className="w-5 h-5 text-[#0B4036]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#788780] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D9E1DB]">
                    02
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Service Clarity
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Provide clear, objective information about available surgical services, diagnostics, and facility capabilities without medical jargon.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D9E1DB] text-[10.5px] font-mono text-[#0B4036] font-semibold">
                Clear Information
              </div>
            </div>

            {/* Principle 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                    <UserCheck className="w-5 h-5 text-[#0B4036]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#788780] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D9E1DB]">
                    03
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Respect for Choice
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Respect the patient&apos;s independent choice of doctor, surgical specialist, and preferred hospital facility without pressure.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D9E1DB] text-[10.5px] font-mono text-[#0B4036] font-semibold">
                Doctor &amp; Hospital Choice
              </div>
            </div>

            {/* Principle 4 */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#CE5B40]">
                    <Receipt className="w-5 h-5 text-[#CE5B40]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#788780] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D9E1DB]">
                    04
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Financial Transparency
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Communicate costs, hospital estimates, and administrative requirements as transparently and comprehensively as possible prior to admission.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D9E1DB] text-[10.5px] font-mono text-[#0B4036] font-semibold">
                Transparent Estimates
              </div>
            </div>

            {/* Principle 5 */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                    <Lock className="w-5 h-5 text-[#0B4036]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#788780] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D9E1DB]">
                    05
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Data &amp; Privacy Protection
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Protect personal, financial, and medical information with strict confidentiality and controlled digital documentation handling.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D9E1DB] text-[10.5px] font-mono text-[#0B4036] font-semibold">
                Rigorous Confidentiality
              </div>
            </div>

            {/* Principle 6 */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#CE5B40]">
                    <Scale className="w-5 h-5 text-[#CE5B40]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#788780] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D9E1DB]">
                    06
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Honest Clinical Boundaries
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Avoid making promises or commercial guarantees about surgical outcomes, acknowledging biological variation and medical reality.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D9E1DB] text-[10.5px] font-mono text-[#0B4036] font-semibold">
                Zero Outcome Promises
              </div>
            </div>

            {/* Principle 7 */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                    <Award className="w-5 h-5 text-[#0B4036]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#788780] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D9E1DB]">
                    07
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Encouraging Second Opinions
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Encourage patients to seek appropriate medical opinions and consult multiple qualified specialists before undergoing elective surgery.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D9E1DB] text-[10.5px] font-mono text-[#0B4036] font-semibold">
                Informed Decision Making
              </div>
            </div>

            {/* Principle 8 */}
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                    <MessageSquare className="w-5 h-5 text-[#0B4036]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#788780] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#D9E1DB]">
                    08
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B4036]">
                  Continuous Communication
                </h3>
                <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                  Maintain responsive, proactive communication throughout consultation scheduling, admission coordination, and recovery check-ins.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D9E1DB] text-[10.5px] font-mono text-[#0B4036] font-semibold">
                End-to-End Coordination
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION D — Our Core Business Focus
          Canvas: Pale Sage (#E4ECE6)
          ----------------------------------------------------------------- */}
      <section id="core-business" className="w-full bg-[#E4ECE6] py-20 sm:py-28 border-b border-[#D9E1DB] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl text-left space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#0B4036] bg-white px-3.5 py-1 rounded-full border border-[#D9E1DB]">
              <Stethoscope className="w-3.5 h-3.5 text-[#CE5B40]" />
              <span>Surgical Services &amp; Coordination Scope</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B4036] tracking-tight">
              Our Core Business Focus
            </h2>

            <p className="text-sm sm:text-base text-[#42534E] font-sans leading-relaxed">
              Our principal focus is surgical healthcare and the services surrounding it. Depending on the nature of our hospital and medical partnerships, our activities encompass dedicated assistance across every operational phase of the patient care journey.
            </p>
          </div>

          {/* 6 Core Service Cards in Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                  <Stethoscope className="w-5 h-5 text-[#0B4036]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B4036]">
                  Surgical Consultation &amp; Coordination
                </h3>
                <p className="text-xs sm:text-[13px] text-[#42534E] leading-relaxed font-sans">
                  Helping patients arrange consultations with appropriate specialists and understand the clinical and diagnostic steps involved in seeking a qualified surgical opinion.
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9E1DB] flex items-center gap-2 text-xs font-mono text-[#0B4036]">
                <CheckCircle2 className="w-4 h-4 text-[#CE5B40] shrink-0" />
                <span>Specialist Access &amp; Triage</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                  <Building2 className="w-5 h-5 text-[#0B4036]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B4036]">
                  Hospital Identification &amp; Coordination
                </h3>
                <p className="text-xs sm:text-[13px] text-[#42534E] leading-relaxed font-sans">
                  Assisting patients in identifying suitable healthcare facilities based on their clinical requirements, geographical location, preferences, and available treatment options.
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9E1DB] flex items-center gap-2 text-xs font-mono text-[#0B4036]">
                <CheckCircle2 className="w-4 h-4 text-[#CE5B40] shrink-0" />
                <span>Facility Matching &amp; Logistics</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                  <ClipboardList className="w-5 h-5 text-[#0B4036]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B4036]">
                  Treatment Planning Support
                </h3>
                <p className="text-xs sm:text-[13px] text-[#42534E] leading-relaxed font-sans">
                  Helping patients coordinate consultations, investigations, clinical documentation, hospital admission, and other practical requirements as advised by their treating medical team.
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9E1DB] flex items-center gap-2 text-xs font-mono text-[#0B4036]">
                <CheckCircle2 className="w-4 h-4 text-[#CE5B40] shrink-0" />
                <span>Diagnostic &amp; Care Pathway</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#CE5B40]">
                  <CreditCard className="w-5 h-5 text-[#CE5B40]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B4036]">
                  Cost &amp; Financial Coordination
                </h3>
                <p className="text-xs sm:text-[13px] text-[#42534E] leading-relaxed font-sans">
                  Facilitating access to available treatment estimates and helping patients understand insurance administrative aspects, cashless facilities, and payment procedures, subject to hospital and insurer policies.
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9E1DB] flex items-center gap-2 text-xs font-mono text-[#0B4036]">
                <CheckCircle2 className="w-4 h-4 text-[#CE5B40] shrink-0" />
                <span>Insurance Pre-Authorization</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                  <Clock className="w-5 h-5 text-[#0B4036]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B4036]">
                  Pre-Operative Assistance
                </h3>
                <p className="text-xs sm:text-[13px] text-[#42534E] leading-relaxed font-sans">
                  Supporting patients with appointment schedules, medical documentation, preoperative diagnostic tests prescribed by their doctors, and hospital admission formalities.
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9E1DB] flex items-center gap-2 text-xs font-mono text-[#0B4036]">
                <CheckCircle2 className="w-4 h-4 text-[#CE5B40] shrink-0" />
                <span>Pre-Admission Readiness</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#D9E1DB] shadow-xs hover:shadow-md hover:border-[#8DAA9D] transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036]">
                  <Activity className="w-5 h-5 text-[#0B4036]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B4036]">
                  Post-Operative Coordination
                </h3>
                <p className="text-xs sm:text-[13px] text-[#42534E] leading-relaxed font-sans">
                  Helping patients arrange follow-up appointments, obtain discharge instructions from their treating team, and coordinate recommended rehabilitation or home-care services where available.
                </p>
              </div>
              <div className="pt-4 border-t border-[#D9E1DB] flex items-center gap-2 text-xs font-mono text-[#0B4036]">
                <CheckCircle2 className="w-4 h-4 text-[#CE5B40] shrink-0" />
                <span>Discharge &amp; Recovery Support</span>
              </div>
            </div>

          </div>

          {/* Important Medical Clarification Callout */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#D9E1DB] shadow-xs text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FBEFEF] border border-[#7B2434]/20 flex items-center justify-center text-[#7B2434] shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 text-[#7B2434]" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-sm sm:text-base font-bold text-[#0B4036]">
                  Important Clinical Clarification
                </h4>
                <p className="text-xs sm:text-[13px] text-[#42534E] leading-relaxed font-sans">
                  Our role is to support the healthcare navigation process and improve operational coordination. Medical decisions, surgical recommendations, diagnostic interpretations, and clinical treatment remain the independent professional responsibility of qualified, licensed healthcare professionals. Services depend on actual hospital and specialist partnerships in respective regions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION E — Distinctive Corporate Closing Statement & CTA Banner
          Canvas: Deep Forest Green (#0B4036)
          ----------------------------------------------------------------- */}
      <section className="w-full bg-[#0B4036] text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#07372F] rounded-3xl p-8 sm:p-14 border border-white/15 shadow-2xl relative overflow-hidden text-center sm:text-left">
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="space-y-4 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-semibold text-emerald-300 border border-white/15">
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>The Meridian Vascular Commitment</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
                  &ldquo;Healthcare coordination should make the patient journey clearer, more informed, and easier to navigate.&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-[#8DAA9D] font-sans leading-relaxed">
                  Whether you are seeking a specialized second surgical opinion, preparing for an elective day-care procedure, or verifying insurance coverage, our coordination desk is here to assist.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="tap-tactile min-h-[48px] px-8 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-all shadow-[0_4px_16px_rgba(169,71,47,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Consultation</span>
                </button>
                
                <a
                  href="tel:1800-MERIDIAN"
                  className="tap-tactile min-h-[48px] px-7 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-300" />
                  <span>Call 1800-MERIDIAN</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
