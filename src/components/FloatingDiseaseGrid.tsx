import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Calendar, Sparkles } from 'lucide-react';
import { DiseaseId } from '../types';

export interface DiseaseIllustrationItem {
  id: string;
  name: string;
  illustrationUrl: string;
  description: string;
  url: string;
  isExternal?: boolean;
  preselectedDiseaseId?: DiseaseId;
  floatClass: string;
}

export const DISEASE_ILLUSTRATIONS: DiseaseIllustrationItem[] = [
  {
    id: 'varicose-veins',
    name: 'Varicose Veins',
    illustrationUrl: '/Designassets/icons/varicoseveins-removebg-preview.png',
    description: 'Valve failure in saphenous veins causing painful pooling and enlarged vessels. Managed with 1470nm EVLA laser & non-thermal VenaSeal.',
    url: 'https://vericosemicrosite.vercel.app/#',
    isExternal: true,
    preselectedDiseaseId: 'varicose-veins',
    floatClass: 'animate-float-anatomy-1'
  },
  {
    id: 'deep-vein-thrombosis',
    name: 'Deep Vein Thrombosis',
    illustrationUrl: '/Designassets/icons/dvt-removebg-preview.png',
    description: 'Acute thrombus formation in deep leg veins causing sudden swelling and heaviness. Diagnosed with duplex Doppler and managed with targeted anticoagulation.',
    url: '/services/deep-vein-thrombosis',
    floatClass: 'animate-float-anatomy-2'
  },
  {
    id: 'peripheral-artery-disease',
    name: 'Peripheral Artery Disease',
    illustrationUrl: '/Designassets/icons/pad-removebg-preview.png',
    description: 'Arterial plaque and vessel narrowing causing calf cramping upon walking (claudication). Evaluated via ankle-brachial index and catheter angioplasty.',
    url: '/services/peripheral-artery-disease',
    floatClass: 'animate-float-anatomy-3'
  },
  {
    id: 'diabetic-ulcer',
    name: 'Diabetic Ulcer',
    illustrationUrl: '/Designassets/icons/diabeticulcer-removebg-preview.png',
    description: 'Chronic lower extremity wound compromised by peripheral neuropathy and ischemia. Managed with biomechanical offloading and microvascular restoration.',
    url: '/services/wound-care',
    floatClass: 'animate-float-anatomy-4'
  },
  {
    id: 'lymphedema',
    name: 'Lymphedema & Edema',
    illustrationUrl: '/Designassets/icons/lymphedemaedema-removebg-preview.png',
    description: 'Lymphatic fluid retention and tissue swelling in limbs. Treated through personalized complex decongestive therapy and graduated compression.',
    url: '/services/lymphedema',
    floatClass: 'animate-float-anatomy-1'
  },
  {
    id: 'piles',
    name: 'Laser Proctology & Piles',
    illustrationUrl: '/Designassets/icons/piles-removebg-preview.png',
    description: 'Symptomatic internal or external hemorrhoids and anal fissures. Resolved using sphincter-sparing 1470nm diode laser ablation with same-day return home.',
    url: '/services/piles',
    preselectedDiseaseId: 'piles',
    floatClass: 'animate-float-anatomy-2'
  },
  {
    id: 'gallbladder-stones',
    name: 'Gallbladder Stones',
    illustrationUrl: '/Designassets/icons/gallbladder-removebg-preview.png',
    description: 'Gallbladder calculi triggering biliary colic and inflammation. Removed safely via 3D keyhole laparoscopic cholecystectomy in a daycare protocol.',
    url: '/services/gallbladder-stones',
    preselectedDiseaseId: 'gallbladder-stones',
    floatClass: 'animate-float-anatomy-3'
  },
  {
    id: 'hernia',
    name: 'Hernia Repair',
    illustrationUrl: '/Designassets/icons/hernia-removebg-preview.png',
    description: 'Abdominal wall muscular defect (inguinal or umbilical). Repaired with tension-free anatomical 3D contoured mesh and minimally invasive laparoscopy.',
    url: '/services/hernia',
    preselectedDiseaseId: 'hernia',
    floatClass: 'animate-float-anatomy-4'
  },
  {
    id: 'thyroid-ablation',
    name: 'Thyroid Ablation',
    illustrationUrl: '/Designassets/icons/thyroidablation-removebg-preview.png',
    description: 'Benign symptomatic thyroid nodules causing neck fullness or swallowing issues. Treated without neck scars using ultrasound-guided radiofrequency ablation (RFA).',
    url: '/services/thyroid-ablation',
    preselectedDiseaseId: 'thyroid-ablation',
    floatClass: 'animate-float-anatomy-1'
  },
  {
    id: 'kidney-stones',
    name: 'Kidney Stones',
    illustrationUrl: '/Designassets/icons/kidneystones-removebg-preview.png',
    description: 'Calculi obstructing the renal pelvis or ureter. Vaporized with precision holmium laser lithotripsy via flexible digital ureteroscopy (RIRS).',
    url: '/services/kidney-stones',
    preselectedDiseaseId: 'kidney-stones',
    floatClass: 'animate-float-anatomy-2'
  },
  {
    id: 'vascular-diagnostics',
    name: 'Vascular Diagnostics',
    illustrationUrl: '/Designassets/icons/vasculardiagnostics-removebg-preview.png',
    description: 'Standing point-of-care duplex ultrasound, anatomical mapping, venous reflux quantification (>500ms criteria), and arterial hemodynamics.',
    url: '/services/vascular-diagnostics',
    floatClass: 'animate-float-anatomy-3'
  }
];

interface FloatingDiseaseGridProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (diseaseId?: DiseaseId) => void;
}

export const FloatingDiseaseGrid: React.FC<FloatingDiseaseGridProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  // Track active item for mobile tap-to-expand
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const handleItemClick = (item: DiseaseIllustrationItem) => {
    if (item.isExternal) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      return;
    }
    onNavigate(item.url);
  };

  const toggleMobileExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveItemId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="w-full bg-[#FAF8F4] py-20 sm:py-28 border-b border-[#D9E1DB] scroll-mt-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#A9472F] uppercase tracking-wider bg-white px-4 py-1.5 rounded-full border border-[#D9E1DB] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#CE5B40]" />
            <span>Specialized Clinical Anatomy &amp; Services</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B4036] tracking-tight">
            Explore Medical Conditions &amp; Specialties
          </h2>

          <p className="text-sm sm:text-base text-[#42534E] font-sans leading-relaxed">
            Hover over or tap any anatomical illustration to reveal diagnostic criteria, treatment options, and specialized daycare procedures.
          </p>
        </div>

        {/* Freely Floating Anatomical Grid — No rectangular card boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-12 sm:gap-x-10 sm:gap-y-16 items-start justify-items-center">
          {DISEASE_ILLUSTRATIONS.map((item) => {
            const isExpandedOnMobile = activeItemId === item.id;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col items-center text-center cursor-pointer select-none max-w-[260px] w-full"
                onClick={() => handleItemClick(item)}
              >
                {/* Freely Floating Transparent Anatomical Artwork */}
                <div className="relative flex items-center justify-center p-2 mb-3">
                  <div
                    className={`${item.floatClass} transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center`}
                  >
                    <img
                      src={item.illustrationUrl}
                      alt={item.name}
                      className="h-28 sm:h-36 md:h-40 w-auto max-w-[170px] sm:max-w-[200px] object-contain drop-shadow-[0_12px_22px_rgba(11,64,54,0.18)] group-hover:drop-shadow-[0_16px_30px_rgba(206,91,64,0.30)] transition-all duration-500 pointer-events-none"
                      onError={(e) => {
                        // Fallback in case of secondary naming variant
                        if (item.id === 'thyroid-ablation') {
                          (e.currentTarget as HTMLImageElement).src = '/Designassets/icons/thyroidablamation-removebg-preview.png';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Disease / Service Name (Always Visible) */}
                <div className="space-y-1 z-10">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0B4036] group-hover:text-[#A9472F] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  {item.isExternal && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#CE5B40] font-semibold">
                      <span>Dedicated Portal</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Mobile Tap-To-Toggle Hint Indicator */}
                <button
                  type="button"
                  onClick={(e) => toggleMobileExpand(item.id, e)}
                  className="sm:hidden mt-1.5 text-[11px] font-mono text-[#788780] hover:text-[#0B4036] underline underline-offset-2"
                  aria-expanded={isExpandedOnMobile}
                  aria-label={`Toggle details for ${item.name}`}
                >
                  {isExpandedOnMobile ? 'Hide details' : 'View overview'}
                </button>

                {/* Desktop Hover & Mobile Expanded Floating Description Card */}
                <div
                  className={`
                    transition-all duration-300 ease-out z-20
                    ${
                      isExpandedOnMobile
                        ? 'opacity-100 translate-y-0 pointer-events-auto block mt-3'
                        : 'opacity-0 translate-y-2 pointer-events-none hidden sm:block sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:pointer-events-auto sm:absolute sm:top-[calc(100%+8px)] sm:left-1/2 sm:-translate-x-1/2 sm:w-[280px]'
                    }
                  `}
                >
                  <div className="p-4 rounded-2xl bg-white border border-[#D9E1DB] shadow-[0_12px_28px_rgba(7,46,39,0.14)] text-left space-y-2.5">
                    <p className="text-xs text-[#42534E] leading-relaxed font-sans">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-[#D9E1DB] flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4036] hover:text-[#A9472F]">
                        <span>{item.isExternal ? 'Visit Portal' : 'Learn More'}</span>
                        {item.isExternal ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#CE5B40]" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-[#0B4036]" />
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking(item.preselectedDiseaseId);
                        }}
                        className="px-2.5 py-1 rounded-md text-[10.5px] font-mono font-medium text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-colors shrink-0 flex items-center gap-1"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

