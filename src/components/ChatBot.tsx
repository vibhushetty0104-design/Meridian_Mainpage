import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  Calendar,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  AlertTriangle,
  HeartPulse,
  Building2,
  Info
} from 'lucide-react';
import { DiseaseId } from '../types';

export type MeridbotPose =
  | 'wave'
  | 'idle'
  | 'blink'
  | 'present'
  | 'thinking'
  | 'happy'
  | 'standing-happy';

const MERIDBOT_POSES: Record<MeridbotPose, string> = {
  wave: '/Designassets/meridbot/meridbot-wave.png',
  idle: '/Designassets/meridbot/meridbot-idle.png',
  blink: '/Designassets/meridbot/meridbot-blink.png',
  present: '/Designassets/meridbot/meridbot-present.png',
  thinking: '/Designassets/meridbot/meridbot-thinking.png',
  happy: '/Designassets/meridbot/meridbot-happy.png',
  'standing-happy': '/Designassets/meridbot/meridbot-standing-happy.png',
};

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  isEmergency?: boolean;
  actionType?: 'booking' | 'link' | 'call';
  actionData?: {
    diseaseId?: DiseaseId;
    url?: string;
    title?: string;
    phoneNumber?: string;
  };
}

interface ChatBotProps {
  onOpenBooking: (diseaseId?: DiseaseId) => void;
  onNavigate: (route: string) => void;
}

const SUGGESTED_QUESTIONS = [
  'What does Meridian Vascular do?',
  'What are varicose veins?',
  'What is Deep Vein Thrombosis?',
  'What is Peripheral Artery Disease?',
  'What are the symptoms of diabetic ulcers?',
  'What is the difference between varicose veins and DVT?',
  'What treatment options are available?',
  'How can I schedule a consultation?'
];

export const ChatBot: React.FC<ChatBotProps> = ({ onOpenBooking, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.search.includes('meridbot') || window.location.hash.includes('meridbot');
  });

  const [isTeaserDismissed, setIsTeaserDismissed] = useState(false);
  const [activePose, setActivePose] = useState<MeridbotPose>('wave');
  const [isWiggling, setIsWiggling] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: "Hi, I'm **Meridbot**! 👋 I am your educational care guide for Meridian Vascular.\n\nI can help explain vascular conditions, surgical specialties, Doppler diagnostic reports, cashless insurance pre-authorization, or assist you in scheduling a consultation with our specialist faculty.\n\n*Important: I provide educational guidance and coordination assistance. Medical decisions, diagnoses, and treatments remain the responsibility of qualified healthcare professionals.*",
      timestamp: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
      setActivePose('happy');
      const timer = setTimeout(() => setActivePose('idle'), 2400);
      return () => clearTimeout(timer);
    } else {
      setActivePose('wave');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Periodic subtle eye-blink animation for mascot idle realism
  useEffect(() => {
    if (!isOpen) {
      const blinkInterval = setInterval(() => {
        setActivePose('blink');
        setTimeout(() => setActivePose('wave'), 220);
      }, 5500);
      return () => clearInterval(blinkInterval);
    }
  }, [isOpen]);

  const handleMascotClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 560);
    setIsOpen(true);
  };

  // Comprehensive Clinical Knowledge Engine
  const generateResponse = (raw: string): {
    text: string;
    isEmergency?: boolean;
    actionType?: Message['actionType'];
    actionData?: Message['actionData'];
    pose?: MeridbotPose;
  } => {
    const q = raw.toLowerCase().trim();

    // 0. EMERGENCY DETECTION SAFETY PROTOCOL
    if (
      q.includes('chest pain') ||
      q.includes('heart attack') ||
      q.includes('shortness of breath') ||
      q.includes('difficulty breathing') ||
      q.includes('coughing blood') ||
      q.includes('sudden loss of vision') ||
      q.includes('severe chest') ||
      (q.includes('sudden') && q.includes('leg pain') && q.includes('breath'))
    ) {
      return {
        isEmergency: true,
        pose: 'thinking',
        text: `⚠️ **EMERGENCY MEDICAL WARNING**\n\nYour symptoms may indicate a medical emergency (such as pulmonary embolism, acute coronary syndrome, or critical arterial ischemia).\n\n**Please seek immediate emergency care:**\n• Call local emergency services (e.g. 911 / 112 / 102) immediately.\n• Proceed to the nearest hospital emergency department.\n\n*Meridbot is an educational assistant and cannot diagnose or treat acute medical emergencies.*`,
        actionType: 'call',
        actionData: {
          title: 'Emergency Help: Call 1800-MERIDIAN',
          phoneNumber: '1800-MERIDIAN'
        }
      };
    }

    // 1. What does Meridian Vascular do?
    if (q.includes('what does meridian') || q.includes('who are you') || q.includes('about meridian') || q.includes('business model')) {
      return {
        pose: 'present',
        text: `### About Meridian Vascular 🏛️\n\nMeridian Vascular is a specialized **surgical healthcare coordination platform and center of excellence**.\n\nWe bridge patients with accredited surgical centers and senior specialists. Our clinical focus centers on:\n\n• **Duplex Doppler Diagnostics:** Precision standing ultrasound evaluation.\n• **Minimally Invasive Outpatient Care:** 1470nm radial laser ablation (EVLA), non-thermal VenaSeal adhesive, and 3D laparoscopic keyhole surgery.\n• **Patient Care Coordination:** Transparent insurance pre-authorization (TPA), hospital identification, and same-day recovery protocols.`,
        actionType: 'booking',
        actionData: {
          title: 'Schedule In-Clinic or Video Consultation'
        }
      };
    }

    // 2. Varicose Veins
    if (q.includes('varicose') || q.includes('venous') || q.includes('spider vein') || q.includes('saphenous') || q.includes('evla') || q.includes('venaseal')) {
      return {
        pose: 'present',
        text: `### Varicose Veins & Venous Disease 🦵\n\nVaricose veins occur when one-way valves in the saphenous veins fail, allowing blood to pool backwards against gravity.\n\n• **Common Symptoms:** Heaviness, aching, nocturnal cramps, bulging veins, ankle swelling, and hyperpigmentation.\n• **Key Diagnostic Test:** Standing Duplex Doppler scan to quantify reflux (>500ms threshold).\n• **Modern Daycare Solutions:** 1470nm EVLA radial laser and VenaSeal medical adhesive (no compression stockings required).\n• **Recovery:** 30–45 minute walk-in, walk-out procedure.\n\nMeridian maintains a dedicated **Varicose Veins Educational Microsite** featuring interactive CEAP staging (C0–C6) and Doppler report decoding.`,
        actionType: 'link',
        actionData: {
          title: 'Visit Dedicated Varicose Veins Portal ↗',
          url: 'https://vericosemicrosite.vercel.app/#'
        }
      };
    }

    // 3. Deep Vein Thrombosis (DVT)
    if (q.includes('dvt') || q.includes('deep vein') || q.includes('thrombosis') || q.includes('clot')) {
      return {
        pose: 'thinking',
        text: `### Deep Vein Thrombosis (DVT) 🩸\n\nDVT is a blood clot forming within the deep veins, commonly in the calf or thigh.\n\n• **Warning Signs:** Sudden unilateral leg swelling, warmth, redness, and acute calf tenderness.\n• **Clinical Urgency:** Untreated clots can travel to the lungs, causing Pulmonary Embolism (PE).\n• **Investigation:** Urgent Duplex Compression Ultrasound to visualize thrombus extent.\n• **Care Pathways:** Direct oral anticoagulants (DOACs), catheter-directed thrombolysis, and prescription compression therapy.`,
        actionType: 'booking',
        actionData: {
          diseaseId: 'deep-vein-thrombosis',
          title: 'Request Urgent DVT Consultation'
        }
      };
    }

    // 4. Difference between Varicose Veins and DVT
    if ((q.includes('difference') || q.includes('compare')) && (q.includes('varicose') || q.includes('dvt'))) {
      return {
        pose: 'present',
        text: `### Varicose Veins vs. Deep Vein Thrombosis (DVT) ⚖️\n\nWhile both affect lower limb veins, they are clinically distinct:\n\n• **Varicose Veins:** Affects the *superficial* venous system (saphenous veins). A chronic, progressive condition marked by visible bulging veins, dull aching, and heavy legs. Rarely life-threatening.\n• **Deep Vein Thrombosis (DVT):** Affects the *deep* muscular veins. An acute medical condition characterized by rapid, asymmetric swelling and deep calf pain. Carries a risk of pulmonary embolism if the clot dislodges.\n\nA **standing duplex ultrasound** definitively differentiates superficial reflux from deep vein occlusion.`,
        actionType: 'booking',
        actionData: {
          title: 'Schedule Duplex Ultrasound Evaluation'
        }
      };
    }

    // 5. Peripheral Artery Disease (PAD)
    if (q.includes('pad') || q.includes('peripheral') || q.includes('artery') || q.includes('arterial') || q.includes('claudication') || q.includes('cold feet')) {
      return {
        pose: 'present',
        text: `### Peripheral Artery Disease (PAD) 🏃\n\nPAD is caused by atherosclerotic narrowing of arteries supplying oxygenated blood to the legs.\n\n• **Classic Symptom:** *Intermittent claudication* — cramping calf or thigh pain during walking that subsides with rest.\n• **Advanced Warning:** Rest pain in the foot or toes and cool, pale skin.\n• **Assessment:** Ankle-Brachial Index (ABI) Doppler measurement and arterial duplex imaging.\n• **Treatments:** Structured walking therapy, medical therapy, and catheter balloon angioplasty or stenting.`,
        actionType: 'booking',
        actionData: {
          title: 'Book PAD / Circulation Evaluation'
        }
      };
    }

    // 6. Diabetic Ulcers & Wound Care
    if (q.includes('diabetic') || q.includes('ulcer') || q.includes('wound') || q.includes('foot sore') || q.includes('gangrene')) {
      return {
        pose: 'present',
        text: `### Diabetic Ulcer & Advanced Wound Care 🩹\n\nDiabetic ulcers stem from a combination of peripheral neuropathy (loss of protective sensation) and poor microvascular arterial blood flow.\n\n• **Clinical Protocol:** Thorough Wagner/University of Texas staging, vascular perfusion checks, and bacterial culture.\n• **Key Management Steps:** Biomechanical pressure offloading, specialized moisture-balanced dressings, and revascularization if arterial insufficiency exists.\n• **Prevention:** Daily foot inspections and early medical review of any unbroken blister or callus.`,
        actionType: 'booking',
        actionData: {
          title: 'Schedule Wound Care Evaluation'
        }
      };
    }

    // 7. Lymphedema & Edema
    if (q.includes('lymphedema') || q.includes('lymph') || q.includes('swelling') || q.includes('edema')) {
      return {
        pose: 'present',
        text: `### Lymphedema & Chronic Edema 🌊\n\nLymphedema is the accumulation of protein-rich lymphatic fluid in subcutaneous tissues due to impaired lymphatic drainage.\n\n• **Key Features:** Stemmer sign (inability to pinch skin fold at base of second toe), persistent non-pitting edema.\n• **Staging:** ISL Stages 0–3.\n• **Gold Standard Care:** Complex Decongestive Therapy (CDT), manual lymphatic drainage, skin hygiene, and multilayer graduated compression bandaging.`,
        actionType: 'booking',
        actionData: {
          title: 'Consult Lymphatic Specialist'
        }
      };
    }

    // 8. Laser Proctology & Piles (Hemorrhoids)
    if (q.includes('piles') || q.includes('hemorrhoid') || q.includes('fissure') || q.includes('fistula') || q.includes('proctology') || q.includes('bleeding')) {
      return {
        pose: 'present',
        text: `### Laser Proctology & Piles 🩺\n\nMeridian provides daycare laser solutions for anorectal conditions:\n\n• **Grades I–IV Hemorrhoids:** Treated with 1470nm diode Laser Hemorrhoidoplasty (LHP). The energy shrinks hemorrhoidal cushions without cutting mucosal tissue.\n• **Anal Fissures & Fistulas:** Laser closure and sphincter-sparing healing.\n• **Key Benefits:** Minimal post-operative pain, negligible blood loss, and same-day discharge with rapid resumption of daily work.`,
        actionType: 'booking',
        actionData: {
          diseaseId: 'piles',
          title: 'Book Confidential Proctology Slot'
        }
      };
    }

    // 9. Gallbladder Stones
    if (q.includes('gallbladder') || q.includes('gallstone') || q.includes('cholecystitis') || q.includes('biliary')) {
      return {
        pose: 'present',
        text: `### Gallbladder Stones (Cholelithiasis) 🪨\n\nGallstones can cause acute upper right abdominal pain, indigestion, and nausea, particularly after fatty meals.\n\n• **Definitive Treatment:** Laparoscopic Cholecystectomy (3D keyhole removal of the gallbladder).\n• **Procedure Details:** Done under general anesthesia using 3 to 4 tiny keyhole incisions.\n• **Daycare Pathway:** Rapid recovery with most patients walking comfortably same-day and returning home within 24 hours.`,
        actionType: 'booking',
        actionData: {
          diseaseId: 'gallbladder-stones',
          title: 'Schedule Gallbladder Evaluation'
        }
      };
    }

    // 10. Hernia Repair
    if (q.includes('hernia') || q.includes('groin bulge') || q.includes('umbilical') || q.includes('inguinal')) {
      return {
        pose: 'present',
        text: `### Hernia Repair (Inguinal & Umbilical) 🛡️\n\nA hernia develops when internal tissue or intestine protrudes through a defect in the surrounding abdominal wall.\n\n• **Surgical Approach:** Tension-free 3D contoured polypropylene mesh placement via minimally invasive laparoscopy (TEP/TAPP).\n• **Advantages:** Reduced recurrence rates, negligible scar visibility, and faster return to active sports and routine lifting.`,
        actionType: 'booking',
        actionData: {
          diseaseId: 'hernia',
          title: 'Consult Laparoscopic Hernia Surgeon'
        }
      };
    }

    // 11. Thyroid Ablation
    if (q.includes('thyroid') || q.includes('nodule') || q.includes('rfa')) {
      return {
        pose: 'present',
        text: `### Ultrasound-Guided Thyroid Radiofrequency Ablation (RFA) 🦋\n\nFor patients with benign, growing thyroid nodules causing throat tightness, cosmetic fullness, or difficulty swallowing:\n\n• **Scarless Technique:** A specialized needle electrode is guided into the nodule under real-time ultrasound, delivering thermal energy to induce volume shrinkage.\n• **Preserves Organ Function:** Normal thyroid tissue remains intact, avoiding lifelong hormone replacement therapy in most candidates.`,
        actionType: 'booking',
        actionData: {
          diseaseId: 'thyroid-ablation',
          title: 'Book Thyroid Ablation Consultation'
        }
      };
    }

    // 12. Kidney Stones
    if (q.includes('kidney') || q.includes('renal') || q.includes('lithotripsy') || q.includes('rirs') || q.includes('stone')) {
      return {
        pose: 'present',
        text: `### Kidney Stones & Laser Endourology (RIRS) 💎\n\nKidney stones cause intense flank pain, radiating groin discomfort, or hematuria (blood in urine).\n\n• **Laser Modality:** Retrograde Intrarenal Surgery (RIRS) with flexible digital ureteroscopy.\n• **Holmium Laser Dusting:** The laser pulverizes calculi into fine dust without surgical skin incisions.\n• **Outpatient Protocol:** Fast stenting, low discomfort, and swift daycare discharge.`,
        actionType: 'booking',
        actionData: {
          diseaseId: 'kidney-stones',
          title: 'Schedule Urology Evaluation'
        }
      };
    }

    // 13. Vascular Diagnostics
    if (q.includes('diagnostic') || q.includes('ultrasound') || q.includes('doppler') || q.includes('scan')) {
      return {
        pose: 'present',
        text: `### Vascular Diagnostics & Duplex Doppler 📡\n\nAccurate diagnostics are the foundation of clinical certainty at Meridian Vascular:\n\n• **Standing Duplex Doppler:** Evaluates superficial and deep venous reflux in anatomical standing posture.\n• **Reflux Quantification:** Verified threshold >500ms defines pathological valve incompetence.\n• **Arterial Hemodynamics:** Pulse volume recordings and ankle-brachial index (ABI) calculations.`,
        actionType: 'booking',
        actionData: {
          title: 'Schedule Diagnostic Doppler Scan'
        }
      };
    }

    // 14. Insurance & Cashless TPA Pre-Authorization
    if (q.includes('insurance') || q.includes('cashless') || q.includes('tpa') || q.includes('cost') || q.includes('price') || q.includes('payment')) {
      return {
        pose: 'happy',
        text: `### Coordinated TPA & Cashless Insurance Desk 💳\n\nNavigating healthcare financing should be completely transparent:\n\n• **Cashless Pre-Authorization:** We assist patients in liaising with leading corporate insurers and Third-Party Administrators (TPAs).\n• **Itemized Cost Clarity:** Clear estimates provided prior to any procedure scheduling.\n• **Documentation Assistance:** Our on-site care team coordinates clinical records, policy guidelines, and admission approvals.`,
        actionType: 'booking',
        actionData: {
          title: 'Verify Insurance Eligibility'
        }
      };
    }

    // 15. How to schedule a consultation / Appointment
    if (q.includes('schedule') || q.includes('appointment') || q.includes('consult') || q.includes('book') || q.includes('doctor')) {
      return {
        pose: 'happy',
        text: `### Scheduling a Specialist Consultation 🗓️\n\nScheduling an evaluation with Meridian Vascular is simple and structured:\n\n1. Click **Schedule Consultation** to select your condition, preferred doctor, and time slot.\n2. Choose between **In-Clinic Examination** or **Video Review** for prior ultrasound scans.\n3. Receive a digital appointment pass with instant front-desk confirmation.`,
        actionType: 'booking',
        actionData: {
          title: 'Open Consultation Booking Flow'
        }
      };
    }

    // Fallback general guidance
    return {
      pose: 'present',
      text: `### Meridian Vascular Care Desk 💬\n\nThank you for reaching out! Meridian Vascular provides specialized care across **11 vascular and surgical conditions**:\n\n• **Vascular & Venous:** Varicose Veins, Deep Vein Thrombosis (DVT), Peripheral Artery Disease (PAD), Diabetic Ulcer, Lymphedema, and Vascular Diagnostics.\n• **Daycare Surgical:** Laser Proctology & Piles, Gallbladder Stones, Laparoscopic Hernia Repair, Thyroid Ablation, and Laser Kidney Stone removal.\n\nWould you like more details on a specific condition, or help scheduling an appointment?`,
      actionType: 'booking',
      actionData: {
        title: 'Schedule Specialist Evaluation'
      }
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setActivePose('thinking');

    // Simulate natural response latency
    setTimeout(() => {
      const response = generateResponse(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: 'Just now',
        isEmergency: response.isEmergency,
        actionType: response.actionType,
        actionData: response.actionData
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      setActivePose(response.pose || 'idle');
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'bot',
        text: "Conversation refreshed. 👋 How can I help you today with your vascular or surgical care questions?",
        timestamp: 'Just now'
      }
    ]);
    setActivePose('wave');
  };

  return (
    <>
      {/* -------------------------------------------------------------
          1. FLOATING MASCOT & SPEECH TEASER (Visible when Chat is Closed)
          ------------------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-end gap-3 select-none">
          
          {/* Welcoming Speech Bubble Teaser (Dismissible) */}
          {!isTeaserDismissed && (
            <div
              onClick={handleMascotClick}
              className="hidden sm:flex items-center gap-2.5 bg-white border border-[#D9E1DB] px-4 py-2.5 rounded-2xl shadow-[0_10px_25px_rgba(11,64,54,0.14)] cursor-pointer hover:border-[#8DAA9D] transition-all duration-200 group max-w-[280px]"
            >
              <div className="flex-1 text-left">
                <p className="text-[11.5px] font-sans font-medium text-[#17241F] leading-tight">
                  Hi, I&apos;m <span className="font-bold text-[#0B4036]">Meridbot</span>! 👋 Need help with vascular or surgical symptoms?
                </p>
                <span className="text-[10px] font-mono text-[#CE5B40] font-semibold mt-0.5 block group-hover:underline">
                  Click to Ask Questions →
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTeaserDismissed(true);
                }}
                className="text-[#788780] hover:text-[#0B4036] p-0.5 rounded transition-colors"
                title="Dismiss greeting"
                aria-label="Dismiss greeting"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Floating Character & Dynamic Contact Shadow */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleMascotClick}
              className={`relative cursor-pointer focus:outline-none ${isWiggling ? 'animate-bot-wiggle' : 'animate-meridbot-float'}`}
              aria-label="Open Ask Meridbot Assistant"
              title="Ask Meridbot"
            >
              <img
                src={MERIDBOT_POSES[activePose] || MERIDBOT_POSES.wave}
                alt="Meridbot mascot"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_8px_18px_rgba(11,64,54,0.20)] hover:scale-105 transition-transform duration-200"
              />
              
              {/* Online Pulse Indicator */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
              </span>
            </button>

            {/* Mascot Contact Ground Shadow */}
            <div className="w-10 sm:w-12 h-2 bg-radial from-[#0B4036]/30 to-transparent rounded-full -mt-1 pointer-events-none animate-mascot-shadow" />
          </div>

        </div>
      )}

      {/* -------------------------------------------------------------
          2. EXPANDED DIALOGUE PANEL: "Ask Meridbot"
          ------------------------------------------------------------- */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="meridbot-title"
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:max-h-[660px] sm:h-[86vh] z-50 flex flex-col bg-[#FAF8F4] sm:rounded-3xl border border-[#D9E1DB] shadow-[0_20px_50px_rgba(7,46,39,0.30)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="bg-[#0B4036] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-sm border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={MERIDBOT_POSES[activePose] || MERIDBOT_POSES.idle}
                  alt="Meridbot avatar"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <h3 id="meridbot-title" className="font-serif text-base font-bold tracking-tight text-white">
                    Ask Meridbot
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Care Guide
                  </span>
                </div>
                <span className="text-[11px] text-[#8DAA9D] font-mono leading-none mt-0.5">
                  Meridian Vascular Clinical Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-lg text-[#8DAA9D] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#8DAA9D] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Assistant"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Safe Educational Notice Strip */}
          <div className="bg-[#E4ECE6] px-4 py-1.5 border-b border-[#D9E1DB] flex items-center gap-2 text-[11px] text-[#42534E]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B4036] shrink-0" />
            <span className="truncate">Educational assistant · Does not replace medical examination</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-4 text-xs leading-relaxed font-sans shadow-xs text-left ${
                      isBot
                        ? msg.isEmergency
                          ? 'bg-[#FBEFEF] text-[#7B2434] border border-[#7B2434]/30'
                          : 'bg-white text-[#17241F] border border-[#D9E1DB]'
                        : 'bg-[#0B4036] text-white'
                    }`}
                  >
                    {/* Bot Content with Markdown-style headings */}
                    <div className="space-y-2 whitespace-pre-line">
                      {msg.text}
                    </div>

                    {/* Interactive Action Triggers */}
                    {msg.actionType && (
                      <div className="mt-3 pt-3 border-t border-black/10">
                        {msg.actionType === 'link' && msg.actionData?.url && (
                          <a
                            href={msg.actionData.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#A9472F] hover:bg-[#8E3A26] text-white text-[11.5px] font-semibold transition-colors shadow-2xs"
                          >
                            <span>{msg.actionData.title || 'Explore Portal'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {msg.actionType === 'booking' && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsOpen(false);
                              onOpenBooking(msg.actionData?.diseaseId);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#A9472F] hover:bg-[#8E3A26] text-white text-[11.5px] font-semibold transition-colors shadow-2xs cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{msg.actionData?.title || 'Schedule Consultation'}</span>
                          </button>
                        )}

                        {msg.actionType === 'call' && (
                          <a
                            href={`tel:${msg.actionData?.phoneNumber || '1800-MERIDIAN'}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7B2434] hover:bg-[#5E1B27] text-white text-[11.5px] font-semibold transition-colors shadow-2xs"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>{msg.actionData?.title || 'Emergency Call'}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-[#788780] px-1 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-white border border-[#D9E1DB] rounded-2xl w-fit shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#0B4036]/40 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-[#0B4036]/70 animate-pulse delay-150" />
                <span className="w-2 h-2 rounded-full bg-[#0B4036] animate-pulse delay-300" />
                <span className="text-[11px] font-mono text-[#788780] ml-1">
                  Meridbot is retrieving clinical guidance...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="px-3 py-2 bg-[#F7F5EF] border-t border-[#D9E1DB] overflow-x-auto flex gap-1.5 scrollbar-none">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-mono text-[#0B4036] bg-white border border-[#D9E1DB] hover:border-[#8DAA9D] hover:bg-[#E4ECE6] transition-colors shrink-0 disabled:opacity-50 cursor-pointer shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box Area */}
          <div className="p-3 bg-[#FAF8F4] border-t border-[#D9E1DB]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about varicose veins, DVT, hernia, stones..."
                className="flex-1 px-4 py-2.5 text-xs rounded-full border border-[#D9E1DB] bg-white text-[#17241F] placeholder-[#788780]/70 focus:outline-none focus:border-[#0B4036] focus:ring-1 focus:ring-[#0B4036] transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-[#0B4036] hover:bg-[#07372F] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-2xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
