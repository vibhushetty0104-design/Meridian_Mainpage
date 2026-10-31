import React from 'react';
import { ShieldCheck, HeartPulse, Sparkles, Building2, PhoneCall, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { DiseaseId } from '../types';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (diseaseId?: DiseaseId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#072E27] text-white border-t border-white/10">
      {/* Trust & Care Standards Ribbon */}
      <div className="border-b border-white/10 bg-[#0B4036]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-400 shadow-2xs shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-semibold text-white">Clinical Evidence Standards</p>
              <p className="text-xs text-[#8DAA9D]">Laser, duplex Doppler &amp; keyhole protocols</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-400 shadow-2xs shrink-0">
              <Building2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-semibold text-white">Specialized Surgical Suites</p>
              <p className="text-xs text-[#8DAA9D]">Ultra-sterile daycare interventional theaters</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-400 shadow-2xs shrink-0">
              <HeartPulse className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-semibold text-white">Rapid Day-Care Recovery</p>
              <p className="text-xs text-[#8DAA9D]">Same-day walking and swift return to daily life</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#CE5B40] shadow-2xs shrink-0">
              <Sparkles className="w-5 h-5 text-[#CE5B40]" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-semibold text-white">Dedicated TPA Support</p>
              <p className="text-xs text-[#8DAA9D]">Coordinated insurance pre-authorization desk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand & Purpose (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#103D35] border border-white/20 shadow-2xs">
              <svg viewBox="0 0 26 26" fill="none" className="h-5 w-5">
                <path d="M6 4C6 4 8 10 13 13C18 16 20 22 20 22" stroke="#E4ECE6" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="6" cy="4" r="2" fill="#CE5B40" />
                <circle cx="20" cy="22" r="2" fill="#CE5B40" />
              </svg>
            </span>
            <span className="font-serif text-xl font-bold text-white tracking-tight">Meridian Vascular</span>
          </div>

          <p className="text-xs sm:text-[13px] leading-relaxed text-[#8DAA9D] max-w-sm">
            Meridian Vascular is a specialized center of excellence delivering patient-first vascular navigation, endovascular therapies, duplex ultrasound evaluations, and precision day-care procedures.
          </p>

          <div className="pt-2 flex items-center gap-2.5 text-xs text-white font-medium">
            <PhoneCall className="w-4 h-4 text-[#CE5B40] shrink-0" />
            <span>Clinical Consultation Desk:</span>
            <span className="font-mono font-bold text-emerald-300">1800-MERIDIAN</span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-colors shadow-sm cursor-pointer"
            >
              Request Consultation
            </button>
          </div>
        </div>

        {/* Clinical Vascular & Venous Services */}
        <div>
          <p className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            Vascular &amp; Venous
          </p>
          <ul className="space-y-2.5 text-xs text-[#8DAA9D] font-sans">
            <li>
              <a
                href="https://vericosemicrosite.vercel.app/#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1 font-semibold text-emerald-300 transition-colors"
              >
                <span>Varicose Veins (Portal)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#CE5B40]" />
              </a>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/services/deep-vein-thrombosis')}
                className="hover:text-white transition-colors text-left"
              >
                Deep Vein Thrombosis (DVT)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/services/peripheral-artery-disease')}
                className="hover:text-white transition-colors text-left"
              >
                Peripheral Artery Disease (PAD)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/services/wound-care')}
                className="hover:text-white transition-colors text-left"
              >
                Diabetic Ulcer &amp; Wound Care
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/services/lymphedema')}
                className="hover:text-white transition-colors text-left"
              >
                Lymphedema &amp; Edema Care
              </button>
            </li>
          </ul>
        </div>

        {/* Day-Care Surgical Care */}
        <div>
          <p className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            Day-Care Surgical
          </p>
          <ul className="space-y-2.5 text-xs text-[#8DAA9D] font-sans">
            <li>
              <button
                onClick={() => onNavigate('/services/piles')}
                className="hover:text-white transition-colors text-left"
              >
                Laser Proctology &amp; Piles
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/services/gallbladder-stones')}
                className="hover:text-white transition-colors text-left"
              >
                3D Keyhole Gallbladder
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/services/hernia')}
                className="hover:text-white transition-colors text-left"
              >
                Laparoscopic Hernia Repair
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/services/thyroid-ablation')}
                className="hover:text-white transition-colors text-left"
              >
                Thyroid Radiofrequency RFA
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/services/kidney-stones')}
                className="hover:text-white transition-colors text-left"
              >
                Laser Endourology (RIRS)
              </button>
            </li>
          </ul>
        </div>

        {/* Organization & Legal */}
        <div>
          <p className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            Organization
          </p>
          <ul className="space-y-2.5 text-xs text-[#8DAA9D] font-sans">
            <li>
              <button
                onClick={() => {
                  onNavigate('/');
                  setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="hover:text-white transition-colors text-left"
              >
                About Meridian Vascular
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('/');
                  setTimeout(() => document.getElementById('specialists')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="hover:text-white transition-colors text-left"
              >
                Specialist Faculty
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('/');
                  setTimeout(() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="hover:text-white transition-colors text-left"
              >
                Care Journey &amp; TPA
              </button>
            </li>
            <li>
              <span className="text-[#8DAA9D]/80">Privacy &amp; Data Ethics</span>
            </li>
            <li>
              <span className="text-[#8DAA9D]/80">Clinical Governance</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Medical Disclaimer Banner */}
      <div className="bg-[#04231E] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[11px] text-[#8DAA9D]">
          <AlertTriangle className="w-4 h-4 text-[#CE5B40] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-white">Medical Notice:</strong> Information published on the Meridian Vascular main website and affiliated portals is strictly educational and intended for patient orientation and clinical discovery. It does not replace individualized clinical examination or direct vascular ultrasound evaluation. In case of sudden unilateral leg pain, acute shortness of breath, or emergency chest symptoms, please call emergency services immediately.
          </p>
        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div className="border-t border-white/5 bg-[#031D18] py-6 text-center text-xs font-mono text-[#8DAA9D]">
        <p>© {new Date().getFullYear()} Meridian Vascular Healthcare. All clinical rights reserved.</p>
      </div>
    </footer>
  );
};
