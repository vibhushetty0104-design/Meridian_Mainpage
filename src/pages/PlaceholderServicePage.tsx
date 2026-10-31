import React from 'react';
import { ArrowLeft, Calendar, ShieldCheck, Stethoscope } from 'lucide-react';
import { DiseaseId } from '../types';

export interface ServicePlaceholderInfo {
  id: string;
  slug: string;
  name: string;
  medicalCategory: string;
  department: string;
  preselectedDiseaseId?: DiseaseId;
}

export const SERVICE_PLACEHOLDERS: Record<string, ServicePlaceholderInfo> = {
  'deep-vein-thrombosis': {
    id: 'deep-vein-thrombosis',
    slug: '/services/deep-vein-thrombosis',
    name: 'Deep Vein Thrombosis (DVT)',
    medicalCategory: 'Vascular & Venous Thromboembolism',
    department: 'Department of Vascular Medicine & Anticoagulation'
  },
  'peripheral-artery-disease': {
    id: 'peripheral-artery-disease',
    slug: '/services/peripheral-artery-disease',
    name: 'Peripheral Artery Disease (PAD)',
    medicalCategory: 'Arterial Occlusive Disease & Claudication',
    department: 'Department of Endovascular & Peripheral Interventions'
  },
  'wound-care': {
    id: 'wound-care',
    slug: '/services/wound-care',
    name: 'Diabetic Ulcer & Advanced Wound Care',
    medicalCategory: 'Chronic Wound Management & Offloading',
    department: 'Department of Wound Care & Tissue Regeneration'
  },
  'lymphedema': {
    id: 'lymphedema',
    slug: '/services/lymphedema',
    name: 'Lymphedema & Edema',
    medicalCategory: 'Lymphatic Insufficiency & Fluid Dynamics',
    department: 'Department of Lymphatic Medicine'
  },
  'piles': {
    id: 'piles',
    slug: '/services/piles',
    name: 'Laser Proctology & Piles',
    medicalCategory: 'Colorectal & Anorectal Care',
    department: 'Department of Minimally Invasive Proctology',
    preselectedDiseaseId: 'piles'
  },
  'gallbladder-stones': {
    id: 'gallbladder-stones',
    slug: '/services/gallbladder-stones',
    name: 'Gallbladder Stones',
    medicalCategory: 'Hepatobiliary & Laparoscopy',
    department: 'Department of Laparoscopic & GI Surgery',
    preselectedDiseaseId: 'gallbladder-stones'
  },
  'hernia': {
    id: 'hernia',
    slug: '/services/hernia',
    name: 'Hernia Repair',
    medicalCategory: 'Abdominal Wall Reconstruction',
    department: 'Department of Laparoscopic Hernia Surgery',
    preselectedDiseaseId: 'hernia'
  },
  'thyroid-ablation': {
    id: 'thyroid-ablation',
    slug: '/services/thyroid-ablation',
    name: 'Thyroid Ablation',
    medicalCategory: 'Interventional Endocrine Radiology',
    department: 'Department of Image-Guided Endocrine Ablation',
    preselectedDiseaseId: 'thyroid-ablation'
  },
  'kidney-stones': {
    id: 'kidney-stones',
    slug: '/services/kidney-stones',
    name: 'Kidney Stones',
    medicalCategory: 'Endourology & Laser Lithotripsy',
    department: 'Department of Laser Endourology',
    preselectedDiseaseId: 'kidney-stones'
  },
  'vascular-diagnostics': {
    id: 'vascular-diagnostics',
    slug: '/services/vascular-diagnostics',
    name: 'Vascular Diagnostics & Duplex Ultrasound',
    medicalCategory: 'Non-Invasive Vascular Hemodynamics',
    department: 'Department of Diagnostic Vascular Ultrasound & Hemodynamics'
  }
};

interface PlaceholderServicePageProps {
  serviceKey: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (diseaseId?: DiseaseId) => void;
}

export const PlaceholderServicePage: React.FC<PlaceholderServicePageProps> = ({
  serviceKey,
  onNavigate,
  onOpenBooking
}) => {
  const service = SERVICE_PLACEHOLDERS[serviceKey] || {
    id: serviceKey,
    slug: `/services/${serviceKey}`,
    name: serviceKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    medicalCategory: 'Clinical Specialty Care',
    department: 'Clinical Department Information'
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto w-full">
      <div className="space-y-8">
        {/* Breadcrumb / Back Link */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#788780] hover:text-[#0B4036] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Meridian Main Homepage</span>
        </button>

        {/* Minimal Clinical Service Header */}
        <div className="border-b border-[#D9E1DB] pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E4ECE6] text-xs font-mono font-semibold text-[#0B4036] border border-[#D9E1DB]">
            <Stethoscope className="w-3.5 h-3.5 text-[#CE5B40]" />
            <span>{service.medicalCategory}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B4036] tracking-tight">
            {service.name}
          </h1>

          <p className="text-sm font-mono text-[#788780]">
            {service.department} · Service Directory Route: <code className="text-[#0B4036] font-bold bg-[#E4ECE6] px-2 py-0.5 rounded">{service.slug}</code>
          </p>
        </div>

        {/* Quiet, Minimal Informational Card */}
        <div className="bg-white text-[#17241F] rounded-3xl border border-[#D9E1DB] p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E4ECE6] border border-[#D6DDD8] flex items-center justify-center shrink-0 text-[#0B4036]">
              <ShieldCheck className="w-6 h-6 text-[#0B4036]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-[#0B4036]">
                Clinical Service Information Desk
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5952] leading-relaxed font-sans">
                Detailed clinical atlas documentation, diagnostic protocols, and patient guidance modules for this department are currently being prepared under clinical review. For immediate patient evaluation, report review, or specialist consultation scheduling, please reach out to our front desk.
              </p>
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="pt-4 border-t border-[#D6DDD8] flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onOpenBooking(service.preselectedDiseaseId)}
              className="tap-tactile w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-all shadow-[0_4px_16px_rgba(169,71,47,0.35)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Inquire / Schedule Specialist Consultation</span>
            </button>
            <button
              onClick={() => onNavigate('/#services')}
              className="tap-tactile w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold text-[#0B4036] bg-white hover:bg-[#E4ECE6] border border-[#D6DDD8] transition-colors cursor-pointer text-center"
            >
              Browse All Services
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12 text-center text-xs font-mono text-[#788780]">
        Meridian Vascular Clinical Network · Dedicated Service Record
      </div>
    </div>
  );
};
