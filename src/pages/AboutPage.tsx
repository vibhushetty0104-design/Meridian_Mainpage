import React from 'react';
import { ArrowLeft, Building2, Calendar, ShieldCheck } from 'lucide-react';
import { AboutUsSection } from '../components/AboutUsSection';
import { DiseaseId } from '../types';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (diseaseId?: DiseaseId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="w-full bg-[#F7F5EF] min-h-screen">
      {/* Top Breadcrumb & Minimal Corporate Page Header */}
      <div className="bg-[#0B4036] text-[#F7F5EF] pt-8 pb-12 border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#8DAA9D] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Main Homepage</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono font-semibold text-[#E4ECE6] border border-white/15">
                <Building2 className="w-3.5 h-3.5 text-[#CE5B40]" />
                <span>Corporate Identity &amp; Operating Philosophy</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                About Meridian Vascular
              </h1>
              <p className="text-sm sm:text-base text-[#E4ECE6] font-sans leading-relaxed">
                A patient-focused surgical healthcare coordination platform committed to professional standards, dependable hospital relationships, financial transparency, and sustainable growth.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onOpenBooking()}
                className="tap-tactile min-h-[46px] px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Expansive About Section */}
      <AboutUsSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
        isStandalonePage={true}
      />
    </div>
  );
};

