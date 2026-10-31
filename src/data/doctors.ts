import { Doctor, DiseaseId } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-aditi-sharma',
    name: 'Dr. Aditi Sharma',
    qualifications: 'MBBS, MS (Gen Surg), FVVS (Germany)',
    specialty: 'Senior Endovascular & Vascular Surgeon',
    experienceYears: 16,
    surgeriesCount: 0,
    hospital: 'Meridian Center of Vascular Excellence',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    rating: 0,
    consultationFee: 'First Evaluation Available',
    diseasesCovered: [
      'varicose-veins',
      'deep-vein-thrombosis',
      'peripheral-artery-disease',
      'wound-care',
      'lymphedema',
      'vascular-diagnostics'
    ],
    imageUrl: '/images/dr_aditi_sharma.jpg'
  },
  {
    id: 'dr-rajesh-nair',
    name: 'Dr. Rajesh Nair',
    qualifications: 'MBBS, MS, Fellowship in Laser Proctology (Austria)',
    specialty: 'Lead Proctologist & Sphincter Specialist',
    experienceYears: 18,
    surgeriesCount: 0,
    hospital: 'Meridian Surgical Care Institute',
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    rating: 0,
    consultationFee: 'First Evaluation Available',
    diseasesCovered: ['piles'],
    imageUrl: '/images/dr_rajesh_nair.jpg'
  },
  {
    id: 'dr-meera-venkatesh',
    name: 'Dr. Meera Venkatesh',
    qualifications: 'MBBS, MS, FMAS, FIAGES (Robotics & Keyhole)',
    specialty: 'Chief Laparoscopic & GI Surgeon',
    experienceYears: 15,
    surgeriesCount: 0,
    hospital: 'Meridian Advanced Laparoscopy Pavilion',
    availableDays: ['Tue', 'Wed', 'Fri', 'Sat'],
    rating: 0,
    consultationFee: 'First Evaluation Available',
    diseasesCovered: ['gallbladder-stones', 'hernia'],
    imageUrl: '/images/dr_meera_venkatesh.jpg'
  },
  {
    id: 'dr-siddharth-mehta',
    name: 'Dr. Siddharth Mehta',
    qualifications: 'MBBS, MS, MCh (Urology), DNB',
    specialty: 'Director of Laser Endourology & RIRS',
    experienceYears: 20,
    surgeriesCount: 0,
    hospital: 'Meridian Renal Laser Center',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    rating: 0,
    consultationFee: 'First Evaluation Available',
    diseasesCovered: ['kidney-stones'],
    imageUrl: '/images/dr_siddharth_mehta.jpg'
  },
  {
    id: 'dr-kavita-menon',
    name: 'Dr. Kavita Menon',
    qualifications: 'MBBS, MD, Fellowship Interventional Radiology & Thyroid RFA (Seoul)',
    specialty: 'Interventional Endocrine Radiologist',
    experienceYears: 14,
    surgeriesCount: 0,
    hospital: 'Meridian Scarless Endocrine Clinic',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    rating: 0,
    consultationFee: 'First Evaluation Available',
    diseasesCovered: ['thyroid-ablation'],
    imageUrl: '/images/dr_kavita_menon.jpg'
  }
];

export const getDoctorsForDisease = (diseaseId: DiseaseId | string): Doctor[] => {
  return DOCTORS.filter((d) => d.diseasesCovered.includes(diseaseId as DiseaseId));
};
