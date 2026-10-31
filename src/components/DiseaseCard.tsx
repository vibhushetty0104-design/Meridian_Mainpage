import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DiseaseData } from '../types';

interface DiseaseCardProps {
  disease: DiseaseData;
  onSelect: (route: string) => void;
  onQuickBook: (id: DiseaseData['id']) => void;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({
  disease,
  onSelect,
  onQuickBook
}) => {
  // Render authentic clinical visuals
  const renderVisual = () => {
    switch (disease.id) {
      case 'piles':
        return (
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src="/images/piles_patient.jpg"
              alt="Hemorrhoids and piles discomfort symptoms"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span className="font-semibold text-rose-200">Clinical Presentation</span>
              <span className="text-[10px] text-white/95 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded font-medium">
                Acute Discomfort
              </span>
            </div>
          </div>
        );
      case 'gallbladder-stones':
        return (
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src="/images/gallbladder_stones.webp"
              alt="Gallbladder stone symptoms and acute biliary colic"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span className="font-semibold text-amber-200">Clinical Presentation</span>
              <span className="text-[10px] text-white/95 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded font-medium">
                Biliary Colic
              </span>
            </div>
          </div>
        );
      case 'hernia':
        return (
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src="/images/hernia_repair.webp"
              alt="Lower abdominal muscle strain and hernia bulge discomfort"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span className="font-semibold text-emerald-200">Clinical Presentation</span>
              <span className="text-[10px] text-white/95 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded font-medium">
                Groin & Wall Strain
              </span>
            </div>
          </div>
        );
      case 'thyroid-ablation':
        return (
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src="/images/thyroid_ablation.jpg"
              alt="Woman touching throat tonsils and thyroid nodule discomfort"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span className="font-semibold text-cyan-200">Clinical Presentation</span>
              <span className="text-[10px] text-white/95 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded font-medium">
                Throat & Swallowing Strain
              </span>
            </div>
          </div>
        );
      case 'kidney-stones':
        return (
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src="/images/kidney_stones.webp"
              alt="Symptoms of kidney stones and acute flank renal colic"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span className="font-semibold text-sky-200">Clinical Presentation</span>
              <span className="text-[10px] text-white/95 bg-sky-950/80 border border-sky-500/40 px-2 py-0.5 rounded font-medium">
                Renal Colic & Flank Pain
              </span>
            </div>
          </div>
        );
      case 'varicose-veins':
        return (
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src="/images/varicose_veins.webp"
              alt="Varicose veins on leg and chronic venous insufficiency"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span className="font-semibold text-teal-200">Clinical Presentation</span>
              <span className="text-[10px] text-white/95 bg-teal-950/80 border border-teal-500/40 px-2 py-0.5 rounded font-medium">
                Venous Reflux & Bulge
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onSelect(disease.route)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-lg hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Decorative Top Accent Strip */}
      <div className={`h-1 w-full ${disease.accentBg}`} />

      {/* Card Header & Metadata */}
      <div className="p-6 sm:p-7 space-y-4">
        {/* Unboxed Metadata: Discipline Rule */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="text-teal-700 font-semibold">{disease.specialty}</span>
          <span aria-hidden="true">·</span>
          <span>{disease.stats[0]?.value}</span>
          <span aria-hidden="true">·</span>
          <span>Daycare</span>
        </div>

        {/* Primary Title */}
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
            {disease.name}
          </h3>
          <p className="text-xs font-mono text-slate-400">
            {disease.medicalTerm}
          </p>
        </div>

        {/* Visual Graphic Theater */}
        <div className="w-full h-36 rounded-xl border border-slate-100/80 flex items-center justify-center relative overflow-hidden transition-colors p-0 bg-slate-900 shadow-2xs">
          <div className="w-full h-full">
            {renderVisual()}
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {disease.summary}
        </p>

        {/* Core Advantages List */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100">
          {disease.overviewPoints.slice(0, 2).map((pt, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 leading-snug">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <span className="line-clamp-1">{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 group-hover:text-teal-700 transition-colors group-hover:translate-x-0.5 duration-200">
          <span>Explore Clinic & Care</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickBook(disease.id);
          }}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 rounded-lg shadow-2xs transition-all active:scale-95"
        >
          Book Slot
        </button>
      </div>
    </div>
  );
};
