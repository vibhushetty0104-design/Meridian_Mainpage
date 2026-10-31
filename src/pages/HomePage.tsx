import React, { useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Stethoscope,
  HeartPulse,
  Users,
  Building2,
  Calendar,
  PhoneCall,
  Activity,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { PORTAL_MODULES } from '../data/portalData';
import { DOCTORS } from '../data/doctors';
import { DiseaseId } from '../types';
import { AboutUsSection } from '../components/AboutUsSection';
import { FloatingDiseaseGrid } from '../components/FloatingDiseaseGrid';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (diseaseId?: DiseaseId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Guarantee video restarts from frame 0 upon page refresh and autoplays muted
  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.currentTime = 0;
      const playPromise = heroVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully if browser autoplay policy restricts video
        });
      }
    }
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      
      {/* -------------------------------------------------------------
          1. HERO SECTION — Deep Forest Green Anchor with Background Video
          (Background Video used EXCLUSIVELY in the Hero Section)
          ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#0B4036] text-[#F7F5EF] pt-12 sm:pt-18 pb-16 sm:pb-24 border-b border-white/10">
        
        {/* Dedicated Background Media & Anatomical Video Container — No Static Image Flash */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#0B4036]" aria-hidden="true">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-105 opacity-80"
            style={{ filter: 'brightness(0.92) contrast(1.10)' }}
          >
            <source src="/Designassets/Video-assets/hero-anatomy.mp4" type="video/mp4" />
            <source src="/Designassets/Video-assets/download (1).mp4" type="video/mp4" />
          </video>
          
          {/* Subtle Directional Gradient Scrims: High anatomical visibility with crisp typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#072E27]/85 via-[#0B4036]/60 to-[#072E27]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B4036] via-transparent to-[#072E27]/45" />
        </div>

        {/* Expansive Hero Content Container */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Editorial Headline & Actions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Kicker Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#E4ECE6] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#CE5B40] animate-pulse" />
                <span className="font-mono uppercase tracking-[0.12em] font-semibold">
                  Meridian Vascular · Center of Excellence
                </span>
              </div>

              {/* Editorial Title */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.14] text-balance">
                Precision Vascular &amp; Surgical Care.{' '}
                <span className="text-[#CE5B40] block sm:inline">
                  Grounded in Clinical Certainty.
                </span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-[#E4ECE6] leading-relaxed font-sans max-w-2xl">
                Specialized in duplex ultrasound diagnostics, daycare endovenous laser solutions, and minimally invasive keyhole procedures. Designed for patient comfort, transparent clinical guidance, and swift recovery.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="tap-tactile min-h-[50px] px-8 py-3.5 rounded-full text-[14px] font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-all shadow-[0_4px_16px_rgba(169,71,47,0.35)] hover:shadow-[0_6px_20px_rgba(169,71,47,0.50)] flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Schedule Specialist Consultation</span>
                </button>

                <a
                  href="#services"
                  className="tap-tactile min-h-[50px] px-7 py-3.5 rounded-full text-[14px] font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all backdrop-blur-sm flex items-center justify-center gap-2 text-center cursor-pointer"
                >
                  <span>Explore Treatments &amp; Services</span>
                  <ArrowRight className="w-4 h-4 text-[#8DAA9D]" />
                </a>
              </div>

              {/* Varicose Veins Microsite Quick Link */}
              <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-xs font-mono text-[#8DAA9D]">
                <span>Looking for Varicose Veins CEAP &amp; Doppler Guide?</span>
                <a
                  href="https://vericosemicrosite.vercel.app/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#CE5B40] font-semibold underline underline-offset-4 inline-flex items-center gap-1 transition-colors group"
                >
                  <span>Visit Dedicated Microsite</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#CE5B40] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Clinical Orientation Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/20 bg-[#103D35]/90 p-6 sm:p-8 backdrop-blur-md shadow-[0_16px_36px_rgba(4,35,30,0.5)] space-y-5">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#8DAA9D] block">
                      Clinical Department Focus
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                      Care Navigation &amp; Triage
                    </h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-left">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-white font-medium text-xs mt-0.5">
                      <Activity className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Standing Duplex Doppler</p>
                      <p className="text-[#8DAA9D] text-[11.5px] mt-0.5">
                        Reflux quantification (&gt;500ms threshold) for accurate anatomical assessment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-left">
                    <div className="w-8 h-8 rounded-lg bg-[#A9472F] text-white flex items-center justify-center shrink-0 font-medium text-xs mt-0.5">
                      <Stethoscope className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Daycare Minimally Invasive Surgery</p>
                      <p className="text-[#8DAA9D] text-[11.5px] mt-0.5">
                        1470nm radial laser and 3D keyhole techniques with same-day walking recovery.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-left">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/80 text-white flex items-center justify-center shrink-0 font-medium text-xs mt-0.5">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Coordinated TPA Pre-Authorization</p>
                      <p className="text-[#8DAA9D] text-[11.5px] mt-0.5">
                        Dedicated insurance assistance and itemized cost transparency prior to admission.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenBooking()}
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Evaluation Slot</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CE5B40]" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* -------------------------------------------------------------
          2. FACTUAL TRUST INDICATORS (Warm Ivory Background with Crisp White Cards)
          ------------------------------------------------------------- */}
      <section className="w-full bg-[#F7F5EF] text-[#17241F] py-12 sm:py-16 border-b border-[#D9E1DB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-[#D9E1DB] text-left shadow-xs hover:shadow-md transition-shadow space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036] mb-2">
                <Clock className="w-5 h-5 text-[#0B4036]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#0B4036]">Day-Care Modalities</h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Procedures performed with local or regional anesthesia, enabling patients to walk and return home same-day.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D9E1DB] text-left shadow-xs hover:shadow-md transition-shadow space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036] mb-2">
                <ShieldCheck className="w-5 h-5 text-[#0B4036]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#0B4036]">Evidence-Based Thresholds</h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Clinical pathways guided by validated diagnostic criteria, CEAP classification, and Doppler duplex standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D9E1DB] text-left shadow-xs hover:shadow-md transition-shadow space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#0B4036] mb-2">
                <Users className="w-5 h-5 text-[#0B4036]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#0B4036]">Attending Specialists</h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Evaluations and surgeries conducted directly by board-certified vascular, colorectal, and GI specialists.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D9E1DB] text-left shadow-xs hover:shadow-md transition-shadow space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] flex items-center justify-center text-[#CE5B40] mb-2">
                <Sparkles className="w-5 h-5 text-[#CE5B40]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#0B4036]">Coordinated TPA Desk</h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Dedicated pre-authorization support with major corporate insurers and itemized treatment cost clarity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. FLAGSHIP DESTINATION: VARICOSE VEINS DEDICATED MICROSITE
             (Contrasting Forest Green Centerpiece on Warm Ivory Canvas)
          ------------------------------------------------------------- */}
      <section className="w-full bg-[#F7F5EF] py-14 sm:py-20 border-b border-[#D9E1DB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B4036] text-[#F7F5EF] rounded-3xl border border-white/20 p-6 sm:p-12 shadow-xl relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Visual Column (5 Cols) featuring Freely Floating Anatomical Illustration */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-white/20 bg-[#072E27] shadow-lg group">
                  <img
                    src="/images/varicose_veins.webp"
                    alt="Varicose veins lower limb venous circulation"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072E27] via-[#072E27]/40 to-transparent pointer-events-none" />

                  {/* Centered Freely Floating Transparent Anatomical Artwork */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none">
                    <img
                      src="/Designassets/icons/varicoseveins-removebg-preview.png"
                      alt="Varicose veins vascular anatomy"
                      className="h-44 sm:h-52 w-auto object-contain animate-float-anatomy-1 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Overlaid Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#0B4036]/90 border border-white/20 text-white backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>DEDICATED MICROSITE</span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white text-xs font-mono flex items-center justify-between">
                    <span>CEAP Staging C0–C6</span>
                    <span className="text-[#8DAA9D]">Standing Doppler Guide</span>
                  </div>
                </div>
              </div>

              {/* Content Column (7 Cols) */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono font-semibold text-[#E4ECE6] border border-white/15">
                  <span>Vascular Health · Flagship Patient Portal</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  Varicose Veins &amp; Venous Disease
                </h2>

                <p className="text-sm sm:text-base text-[#E4ECE6] leading-relaxed font-sans">
                  Venous reflux occurs when valve leaflets in the saphenous veins fail, resulting in blood pooling against gravity. Meridian Vascular maintains a dedicated patient portal providing step-by-step CEAP degree assessment, standing Doppler ultrasound report decoding (&gt;500ms reflux thresholds), and modern endovenous treatment comparisons (EVLA laser, VenaSeal adhesive, radiofrequency).
                </p>

                {/* Verified Feature Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/15">
                    CEAP C0–C6 Staging Continuum
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/15">
                    Standing Doppler Reflux (&gt;500ms)
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/15">
                    EVLA 1470nm Laser &amp; VenaSeal
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/15">
                    Daycare Walking Protocol
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href="https://vericosemicrosite.vercel.app/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-tactile min-h-[46px] px-7 py-3 rounded-full text-xs sm:text-[13px] font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-all shadow-[0_4px_16px_rgba(169,71,47,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Visit Dedicated Varicose Veins Portal</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onOpenBooking('varicose-veins')}
                    className="tap-tactile min-h-[46px] px-6 py-3 rounded-full text-xs sm:text-[13px] font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors text-center cursor-pointer"
                  >
                    Schedule Specialist Evaluation
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. TREATMENTS & SERVICES DISCOVERY PANEL
          (Freely Floating Anatomical Disease Illustrations)
          ------------------------------------------------------------- */}
      <FloatingDiseaseGrid
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />

      {/* -------------------------------------------------------------
          5. ABOUT MERIDIAN VASCULAR (Expanded Corporate Identity Showcase with Typing Animation)
          ------------------------------------------------------------- */}
      <AboutUsSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
      />

      {/* -------------------------------------------------------------
          6. SPECIALIST CLINICAL FACULTY (Warm Ivory Canvas with White Cards)
          ------------------------------------------------------------- */}
      <section id="specialists" className="w-full bg-[#F7F5EF] py-16 sm:py-24 border-b border-[#D9E1DB] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 text-left border-b border-[#D9E1DB] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#CE5B40] uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Specialist Clinical Faculty</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B4036] tracking-tight">
                Meet Our Specialist Surgeons &amp; Clinicians
              </h2>
              <p className="text-xs sm:text-sm text-[#42534E] font-sans">
                Our multidisciplinary faculty comprises seasoned surgeons and interventional radiologists with international fellowship credentials.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#788780] shrink-0">
              <span>Verified Credentials</span>
              <span>·</span>
              <span>Attending Faculty</span>
            </div>
          </div>

          {/* Doctors Grid in Crisp White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-[#D9E1DB] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  {/* Doctor Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-18 h-18 rounded-2xl overflow-hidden border border-[#D9E1DB] bg-[#FAF8F4] shrink-0">
                      <img
                        src={doc.imageUrl}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B4036] leading-snug">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#CE5B40] mt-0.5">
                        {doc.specialty}
                      </p>
                      <p className="text-[11px] font-mono text-[#788780] mt-1 leading-snug">
                        {doc.qualifications}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#D9E1DB] space-y-1.5 text-xs">
                    <span className="text-[#42534E] block text-[11px]">
                      Department: <strong className="text-[#0B4036] font-medium">{doc.hospital}</strong>
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#17241F] font-mono">
                      <span className="text-[#788780]">Consultation Days:</span>
                      <span className="font-semibold text-[#0B4036]">{doc.availableDays.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <div className="pt-5 mt-4 border-t border-[#D9E1DB]">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(doc.diseasesCovered[0] as DiseaseId)}
                    className="tap-tactile w-full py-3 px-4 rounded-full text-xs font-semibold text-[#0B4036] bg-[#E4ECE6] hover:bg-[#D6DDD8] border border-[#D9E1DB] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#CE5B40]" />
                    <span>Book Consultation with {doc.name.split(' ')[1]}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          7. PATIENT CARE JOURNEY (Pale Sage Background with Connected Cards)
          ------------------------------------------------------------- */}
      <section id="journey" className="w-full bg-[#E4ECE6] py-16 sm:py-24 border-b border-[#D9E1DB] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl text-left space-y-2 mb-10 border-b border-[#D9E1DB] pb-6">
            <span className="text-xs font-mono font-semibold text-[#A9472F] uppercase tracking-wider block">
              Step-by-Step Experience
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B4036] tracking-tight">
              The Meridian Patient Pathway
            </h2>
            <p className="text-xs sm:text-sm text-[#42534E] font-sans">
              From your initial inquiry through daycare discharge and recovery, our pathway is structured for clinical clarity and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative text-left">
            
            <div className="bg-white rounded-2xl p-5 border border-[#D9E1DB] shadow-xs space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0B4036] text-white font-mono text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-serif font-bold text-[#0B4036] text-base">
                Explore Condition
              </h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Review clinical symptoms, staging guidelines, or access our dedicated educational guides.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#D9E1DB] shadow-xs space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0B4036] text-white font-mono text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-serif font-bold text-[#0B4036] text-base">
                Request Consult
              </h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Select your preferred specialist and choose between in-person clinic visits or video review.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#D9E1DB] shadow-xs space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0B4036] text-white font-mono text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-serif font-bold text-[#0B4036] text-base">
                Clinical Scan
              </h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Point-of-care duplex ultrasound or diagnostics to measure exact anatomical metrics.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#D9E1DB] shadow-xs space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0B4036] text-white font-mono text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h3 className="font-serif font-bold text-[#0B4036] text-base">
                Daycare Procedure
              </h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Minimally invasive keyhole or catheter procedure with same-day walking and discharge.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#D9E1DB] shadow-xs space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#A9472F] text-white font-mono text-xs font-bold flex items-center justify-center">
                5
              </span>
              <h3 className="font-serif font-bold text-[#0B4036] text-base">
                Structured Follow-Up
              </h3>
              <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                Post-procedure coordination, recovery tracking, and scheduled surveillance scans.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          8. CASHLESS INSURANCE & CARE DESK (Warm Ivory Background with Crisp White Card)
          ------------------------------------------------------------- */}
      <section className="w-full bg-[#FAF8F4] py-16 sm:py-24 border-b border-[#D9E1DB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#D9E1DB] p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#D9E1DB] shadow-md bg-[#FAF8F4]">
                  <img
                    src="/assets/photos/insurance-tpa-desk.jpg"
                    alt="Meridian Vascular insurance TPA desk coordination"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/about_us_facility.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072E27]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 left-4 right-4 text-white text-xs">
                    <span className="font-mono font-bold block">Dedicated Insurance Desk</span>
                    <span className="text-[#8DAA9D] text-[11px]">Paperless TPA Pre-Authorization</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E4ECE6] text-xs font-mono font-semibold text-[#0B4036] border border-[#D9E1DB]">
                  <span>Coordinated TPA &amp; Cashless Assistance</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B4036]">
                  Transparent Pre-Authorization &amp; Financial Clarity.
                </h2>

                <p className="text-xs sm:text-sm text-[#42534E] leading-relaxed font-sans">
                  Navigating health insurance should never add to patient anxiety. Our on-site care coordinators handle pre-authorizations with corporate policies and insurance providers, providing clear, itemized fee breakdowns prior to daycare admission.
                </p>

                <div className="space-y-2 pt-1 text-xs text-[#42534E] font-sans">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-[#CE5B40] shrink-0" />
                    <span>Assistance with cashless pre-authorization documentation for major TPAs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-[#CE5B40] shrink-0" />
                    <span>Itemized cost estimates provided prior to procedure scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-[#CE5B40] shrink-0" />
                    <span>Guidance on policy documentation and waiting period requirements</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenBooking()}
                    className="tap-tactile px-7 py-3.5 rounded-full text-xs font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-colors shadow-[0_4px_16px_rgba(169,71,47,0.35)] cursor-pointer"
                  >
                    Verify Insurance Eligibility
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          9. DIRECT PATIENT ASSISTANCE BANNER (#contact)
             (Deep Forest Green Landmark CTA Band)
          ------------------------------------------------------------- */}
      <section id="contact" className="w-full bg-[#0B4036] text-white py-16 sm:py-24 border-b border-white/10 scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#072E27] text-white rounded-3xl p-8 sm:p-14 border border-white/15 shadow-2xl relative overflow-hidden text-left">
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest block">
                  Direct Patient Assistance
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-balance text-white">
                  Have questions about your condition or prior ultrasound reports?
                </h2>
                <p className="text-xs sm:text-sm text-[#8DAA9D] font-sans leading-relaxed">
                  Connect with our clinical desk for appointment availability, second opinions, or guidance on our specialized daycare pathways.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="tap-tactile min-h-[48px] px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-all shadow-[0_4px_16px_rgba(169,71,47,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
                
                <a
                  href="tel:1800-MERIDIAN"
                  className="tap-tactile min-h-[48px] px-7 py-3.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all flex items-center justify-center gap-2"
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
