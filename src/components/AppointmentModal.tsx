import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Video,
  Building,
  FileText,
  Copy,
  Download,
  ArrowLeft
} from 'lucide-react';
import { DiseaseId, AppointmentBooking } from '../types';
import { DISEASES } from '../data/diseases';
import { DOCTORS, getDoctorsForDisease } from '../data/doctors';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDiseaseId?: DiseaseId;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDiseaseId
}) => {
  const [selectedDisease, setSelectedDisease] = useState<DiseaseId>(
    preselectedDiseaseId || 'varicose-veins'
  );
  const [consultType, setConsultType] = useState<'in-clinic' | 'video' | 'second-opinion'>('in-clinic');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  
  // Patient form state
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('New York / Metro Central');
  const [hasInsurance, setHasInsurance] = useState(true);
  const [insuranceProvider, setInsuranceProvider] = useState('BlueCross / Aetna / Cigna');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Synchronize disease changes
  useEffect(() => {
    if (preselectedDiseaseId) {
      setSelectedDisease(preselectedDiseaseId);
    }
  }, [preselectedDiseaseId]);

  // Update available doctor when disease changes
  useEffect(() => {
    const docs = getDoctorsForDisease(selectedDisease);
    if (docs.length > 0) {
      setSelectedDoctorId(docs[0].id);
    } else if (DOCTORS.length > 0) {
      setSelectedDoctorId(DOCTORS[0].id);
    }
  }, [selectedDisease]);

  // Handle Escape key to seamlessly close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Generate next 7 days
  const dateOptions = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthStr = d.toLocaleDateString('en-US', { month: 'short' });
      const dateNum = d.getDate();
      const isoString = d.toISOString().split('T')[0];
      return {
        iso: isoString,
        day: dayStr,
        label: `${dayStr}, ${monthStr} ${dateNum}`,
        isTomorrow: i === 0
      };
    });
  }, []);

  useEffect(() => {
    if (dateOptions.length > 0 && !selectedDate) {
      setSelectedDate(dateOptions[0].iso);
    }
  }, [dateOptions, selectedDate]);

  const timeSlots = [
    '09:30 AM',
    '10:30 AM',
    '11:45 AM',
    '02:15 PM',
    '03:45 PM',
    '05:00 PM',
    '06:15 PM'
  ];

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) errs.patientName = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Please provide a contact phone number';
    } else if (!/^[0-9+\s\-()]{7,}$/.test(phone)) {
      errs.phone = 'Enter a valid telephone number';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Valid email address required for appointment slip';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking: AppointmentBooking = {
        id: `CP-${Math.floor(10000 + Math.random() * 90000)}`,
        patientName,
        phone,
        email,
        city,
        diseaseId: selectedDisease,
        consultationType: consultType,
        doctorId: selectedDoctorId,
        date: selectedDate,
        timeSlot: selectedTime,
        hasInsurance,
        insuranceProvider: hasInsurance ? insuranceProvider : undefined,
        additionalNotes,
        createdAt: new Date().toLocaleTimeString()
      };
      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
    }, 700);
  };

  const handleCopyId = () => {
    if (confirmedBooking) {
      navigator.clipboard?.writeText(confirmedBooking.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleDownloadSlip = () => {
    if (!confirmedBooking) return;
    const slipText = `
=============================================
MERIDIAN VASCULAR HEALTHCARE — CONSULTATION APPOINTMENT
=============================================
Appointment ID: ${confirmedBooking.id}
Patient Name:   ${confirmedBooking.patientName}
Condition:      ${DISEASES[confirmedBooking.diseaseId]?.name} (${DISEASES[confirmedBooking.diseaseId]?.medicalTerm})
Specialist:     ${DOCTORS.find(d => d.id === confirmedBooking.doctorId)?.name || 'Chief Surgeon'}
Type:           ${confirmedBooking.consultationType.toUpperCase()}
Date:           ${confirmedBooking.date}
Time Slot:      ${confirmedBooking.timeSlot}
Hospital:       ${DOCTORS.find(d => d.id === confirmedBooking.doctorId)?.hospital || 'Meridian Center of Vascular Excellence'}
Cashless Ins:   ${confirmedBooking.hasInsurance ? confirmedBooking.insuranceProvider : 'Self-Pay / Direct'}
Status:         CONFIRMED (Demo Interaction)
=============================================
Preparation:
1. Please arrive 15 minutes prior to scheduled slot.
2. Carry past ultrasound, Doppler, or blood reports.
3. Keep valid ID and Insurance e-card ready.
=============================================
    `.trim();

    const blob = new Blob([slipText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Meridian_Appointment_${confirmedBooking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header with Back button and Close X */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 active:scale-95 rounded-lg shadow-2xs transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>Back</span>
            </button>
            <div>
              <span className="text-[11px] font-semibold text-mv-forest uppercase tracking-wider block">
                Meridian Clinical Care
              </span>
              <h2 className="font-serif text-base sm:text-lg font-bold text-mv-forest tracking-tight leading-snug">
                {confirmedBooking ? 'Appointment Confirmation' : 'Schedule Specialist Consultation'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-mv-pale border border-mv-forest/20 text-mv-forest rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-mv-forest" />
              </div>
              <h3 className="font-serif text-xl font-bold text-mv-forest">
                Consultation Successfully Reserved
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your priority slot has been reserved. A care coordinator will send SMS reminders and driving/teleconsult directions.
              </p>
            </div>

            {/* Booking Summary Ticket */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Booking ID</span>
                  <div className="font-mono text-base font-bold text-slate-900 tracking-tight">
                    {confirmedBooking.id}
                  </div>
                </div>
                <button
                  onClick={handleCopyId}
                  className="flex items-center gap-1 text-xs text-teal-700 hover:text-teal-800 font-medium bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Patient Name</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Condition</span>
                  <span className="font-semibold text-slate-800">
                    {DISEASES[confirmedBooking.diseaseId]?.name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Consultation Mode</span>
                  <span className="font-semibold text-teal-700 capitalize">
                    {confirmedBooking.consultationType.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Date & Time</span>
                  <span className="font-semibold text-slate-800">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block mb-0.5">Super-Specialist</span>
                  <span className="font-semibold text-slate-900">
                    {currentDoctor.name} ({currentDoctor.qualifications})
                  </span>
                  <span className="text-slate-500 block text-[11px]">{currentDoctor.hospital}</span>
                </div>
              </div>
            </div>

            {/* Checklist guidance */}
            <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-900 space-y-1">
              <span className="font-semibold block">Pre-Consultation Instructions:</span>
              <p className="text-teal-800 text-[11px] leading-relaxed">
                Please bring any recent Doppler ultrasounds, CT scans, or laboratory reports. Our insurance desk is available on-site for immediate cashless pre-authorization.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleDownloadSlip}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download Summary Slip</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-mv-cta hover:bg-mv-cta-press transition-colors shadow-sm"
              >
                Return to Clinic
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Demo Interaction · No real medical data is transmitted or stored.
            </p>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Condition Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                1. Select Condition / Specialty
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(DISEASES).map((d) => {
                  const isSelected = selectedDisease === d.id;
                  return (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setSelectedDisease(d.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-semibold shadow-2xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="block truncate">{d.name}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{d.specialty}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Consultation Mode */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                2. Consultation Mode
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'in-clinic', label: 'In-Clinic', sub: 'Physical Exam', icon: Building },
                  { id: 'video', label: 'Video Call', sub: 'HD Teleconsult', icon: Video },
                  { id: 'second-opinion', label: 'Report Review', sub: 'Expert Opinion', icon: FileText }
                ].map((mode) => {
                  const isSelected = consultType === mode.id;
                  const Icon = mode.icon;
                  return (
                    <button
                      type="button"
                      key={mode.id}
                      onClick={() => setConsultType(mode.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/70 text-teal-900'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                      <div className="text-xs font-semibold">{mode.label}</div>
                      <div className="text-[10px] text-slate-400">{mode.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specialist & Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  3. Lead Super-Specialist
                </label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                >
                  {DOCTORS.map((doc) => {
                    const isSpecialist = doc.diseasesCovered.includes(selectedDisease);
                    return (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} {isSpecialist ? '★ (Dedicated Specialist)' : ''} — {doc.experienceYears}+ yrs
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Center / Location
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                >
                  <option value="New York / Manhattan Surgical Center">New York / Manhattan Surgical Pavilion</option>
                  <option value="San Francisco / Bay Area Endovascular Clinic">San Francisco / Bay Area Endovascular Clinic</option>
                  <option value="Chicago / Metro Minimally Invasive Center">Chicago / Metro Minimally Invasive Center</option>
                  <option value="London / Harley Street Surgical Center">London / Harley Street Surgical Suite</option>
                  <option value="Singapore / Mount Elizabeth Medical Center">Singapore / Mount Elizabeth Medical Center</option>
                </select>
              </div>
            </div>

            {/* Date and Time Strip */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700">
                  4. Preferred Date & Time
                </label>
                <span className="text-[11px] text-teal-700 font-medium">Free slot cancellation</span>
              </div>
              
              {/* Date Scroll */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                {dateOptions.map((item) => {
                  const isSelected = selectedDate === item.iso;
                  return (
                    <button
                      type="button"
                      key={item.iso}
                      onClick={() => setSelectedDate(item.iso)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600 text-white shadow-2xs font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-[10px] uppercase opacity-75">{item.day}</span>
                      <span className="block text-xs font-bold">{item.iso.split('-')[2]}</span>
                      {item.isTomorrow && (
                        <span className={`block text-[9px] ${isSelected ? 'text-teal-100' : 'text-teal-600 font-medium'}`}>
                          Tomorrow
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="flex flex-wrap gap-1.5">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Patient Personal Information */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <label className="block text-xs font-semibold text-slate-700">
                5. Patient Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
                        errors.patientName ? 'border-red-400' : 'border-slate-200 focus:border-teal-600'
                      }`}
                    />
                  </div>
                  {errors.patientName && (
                    <span className="text-[10px] text-red-500 mt-1 block">{errors.patientName}</span>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="Mobile Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
                        errors.phone ? 'border-red-400' : 'border-slate-200 focus:border-teal-600'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Email Address (for appointment pass) *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 ${
                      errors.email ? 'border-red-400' : 'border-slate-200 focus:border-teal-600'
                    }`}
                  />
                </div>
                {errors.email && (
                  <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>
                )}
              </div>

              {/* Insurance toggle */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-800">Check Cashless Health Insurance Eligibility</span>
                    <span className="block text-[11px] text-slate-500">
                      We coordinate 100% cashless pre-authorization with leading insurers.
                    </span>
                  </div>
                </label>

                {hasInsurance && (
                  <input
                    type="text"
                    placeholder="Enter Insurance Provider (e.g. Star Health, BlueCross, Cigna, HDFC Ergo)"
                    value={insuranceProvider}
                    onChange={(e) => setInsuranceProvider(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                  />
                )}
              </div>
            </div>

            {/* Submit Bar with Explicit Back Button */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                <span className="text-emerald-700 font-semibold block">Complimentary First Evaluation</span>
                <span>Zero obligation · Instant confirmation</span>
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 sm:w-auto py-2.5 px-5 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 active:scale-95 transition-all shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial py-2.5 px-6 rounded-full text-xs font-semibold text-white bg-mv-cta hover:bg-mv-cta-press active:scale-95 transition-all shadow-md disabled:opacity-50 whitespace-nowrap text-center cursor-pointer"
                >
                  {isSubmitting ? 'Confirming Slot...' : 'Confirm Priority Appointment'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
