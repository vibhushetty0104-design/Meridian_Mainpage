import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react';
import { DiseaseId } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (diseaseId?: DiseaseId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer if window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = (hashOrPath: string) => {
    setMobileMenuOpen(false);
    if (hashOrPath.startsWith('#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById(hashOrPath.replace('#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(hashOrPath.replace('#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    onNavigate(hashOrPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B4036]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(4,35,30,0.4)] transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleLinkClick('/')}
          className="group flex min-h-[44px] items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 text-left"
          aria-label="Meridian Vascular Home"
        >
          <span
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#103D35] border border-white/20 transition-transform duration-200 group-hover:scale-105 shadow-sm shrink-0"
            aria-hidden="true"
          >
            <svg viewBox="0 0 26 26" fill="none" className="h-5 w-5 sm:h-5.5 sm:w-5.5">
              <path
                d="M6 4C6 4 8 10 13 13C18 16 20 22 20 22"
                stroke="#E4ECE6"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle cx="6" cy="4" r="2" fill="#CE5B40" />
              <circle cx="20" cy="22" r="2" fill="#CE5B40" />
            </svg>
          </span>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-[18px] sm:text-[20px] font-bold leading-tight text-white tracking-tight group-hover:text-[#CE5B40] transition-colors">
              Meridian Vascular
            </span>
            <span className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-[0.12em] text-[#8DAA9D] leading-tight mt-0.5">
              Precision Care &amp; Navigation
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 text-[14px] font-medium text-white/80">
          <button
            onClick={() => handleLinkClick('/')}
            className={`min-h-[42px] px-4 py-2 rounded-full transition-all ${
              currentPath === '/' ? 'text-white bg-white/15 font-bold shadow-2xs' : 'hover:text-white hover:bg-white/10'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleLinkClick('#services')}
            className="min-h-[42px] px-4 py-2 rounded-full hover:text-white hover:bg-white/10 transition-all"
          >
            Treatments &amp; Services
          </button>

          <button
            onClick={() => handleLinkClick('#specialists')}
            className="min-h-[42px] px-4 py-2 rounded-full hover:text-white hover:bg-white/10 transition-all"
          >
            Our Specialists
          </button>

          <button
            onClick={() => handleLinkClick('#about')}
            className="min-h-[42px] px-4 py-2 rounded-full hover:text-white hover:bg-white/10 transition-all"
          >
            About
          </button>

          <button
            onClick={() => handleLinkClick('#journey')}
            className="min-h-[42px] px-4 py-2 rounded-full hover:text-white hover:bg-white/10 transition-all"
          >
            Patient Journey
          </button>

          <button
            onClick={() => handleLinkClick('#contact')}
            className="min-h-[42px] px-4 py-2 rounded-full hover:text-white hover:bg-white/10 transition-all"
          >
            Contact
          </button>

          {/* Varicose Veins Microsite Gateway Pill */}
          <a
            href="https://vericosemicrosite.vercel.app/#"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[42px] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-white bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all shadow-2xs ml-2"
            title="Open dedicated Varicose Veins microsite in new tab"
          >
            <span>Varicose Veins Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#CE5B40]" />
          </a>
        </nav>

        {/* Right CTA / Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="tap-tactile min-h-[44px] px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-all shadow-[0_4px_16px_rgba(169,71,47,0.35)] hover:shadow-[0_6px_20px_rgba(169,71,47,0.50)] flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE5B40] focus-visible:ring-offset-2"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Schedule Consultation</span>
            <span className="sm:hidden">Consult</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-white hover:bg-white/10 border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/15 bg-[#103D35] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => handleLinkClick('/')}
              className={`min-h-[44px] w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentPath === '/' ? 'text-white bg-white/20 font-bold' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('#services')}
              className="min-h-[44px] w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
            >
              Treatments &amp; Services
            </button>
            <button
              onClick={() => handleLinkClick('#specialists')}
              className="min-h-[44px] w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
            >
              Our Specialists
            </button>
            <button
              onClick={() => handleLinkClick('#about')}
              className="min-h-[44px] w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
            >
              About Meridian
            </button>
            <button
              onClick={() => handleLinkClick('#journey')}
              className="min-h-[44px] w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
            >
              Patient Care Journey
            </button>
            <button
              onClick={() => handleLinkClick('#contact')}
              className="min-h-[44px] w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
            >
              Contact &amp; Emergency
            </button>
          </nav>

          <div className="pt-2 border-t border-white/15 flex flex-col gap-2">
            <a
              href="https://vericosemicrosite.vercel.app/#"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono font-medium text-white bg-white/10 border border-white/20 shadow-2xs"
            >
              <span>Varicose Veins Dedicated Portal</span>
              <ArrowUpRight className="w-4 h-4 text-[#CE5B40]" />
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="min-h-[44px] w-full px-4 py-3 rounded-full text-xs font-semibold text-white bg-[#A9472F] hover:bg-[#8E3A26] transition-colors text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Specialist Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
