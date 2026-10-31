/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { ChatBot } from './components/ChatBot';
import { HomePage } from './pages/HomePage';
import { PlaceholderServicePage, SERVICE_PLACEHOLDERS } from './pages/PlaceholderServicePage';
import { MedAtlasHubPage } from './pages/MedAtlasHubPage';
import { AboutPage } from './pages/AboutPage';
import { DiseaseId } from './types';

function normalizePath(raw: string): string {
  if (!raw) return '/';
  let path = raw.trim();

  // If full URL was passed
  try {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const u = new URL(path);
      path = u.pathname + (u.hash ? u.hash : '');
    }
  } catch {}

  // If hash router format (e.g. #/services/piles or #services or /#/services/piles)
  if (path.includes('#')) {
    const after = path.split('#')[1];
    if (after) {
      path = after.startsWith('/') ? after : '/' + after;
    }
  }

  // Strip query string
  path = path.split('?')[0];

  // Strip trailing slashes
  if (path.length > 1 && path.endsWith('/')) {
    path = path.replace(/\/+$/, '');
  }

  return path || '/';
}

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  
  if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#/') {
    return normalizePath(window.location.hash);
  }
  return normalizePath(window.location.pathname || '/');
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [isBookingOpen, setIsBookingOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.search.includes('book') || window.location.hash.includes('book');
  });
  const [bookingPreselectedDisease, setBookingPreselectedDisease] = useState<DiseaseId | undefined>(undefined);

  // Sync with browser navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = getInitialPath();
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleNavigate = useCallback((path: string) => {
    const target = normalizePath(path);

    // If target is varicose veins microsite or varicose route
    if (target === '/varicose-veins' || target === '/services/varicose-veins') {
      window.open('https://vericosemicrosite.vercel.app/#', '_blank', 'noopener,noreferrer');
      return;
    }

    if (target !== currentPath) {
      if (typeof window !== 'undefined') {
        try {
          window.history.pushState({}, '', target);
        } catch {
          try {
            window.location.hash = target;
          } catch {}
        }
      }
      setCurrentPath(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPath]);

  const handleOpenBooking = (diseaseId?: DiseaseId) => {
    setBookingPreselectedDisease(diseaseId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  // Determine which page to render based on currentPath
  const renderCurrentView = () => {
    const cleanKey = currentPath.replace(/^\//, '').replace(/\/$/, '').toLowerCase();

    // Check if cleanKey matches any placeholder service route
    // Matches /services/deep-vein-thrombosis, /services/piles, or direct /piles
    const serviceSlug = cleanKey.startsWith('services/') ? cleanKey.replace('services/', '') : cleanKey;

    if (SERVICE_PLACEHOLDERS[serviceSlug]) {
      return (
        <PlaceholderServicePage
          serviceKey={serviceSlug}
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
        />
      );
    }

    // About Us Dedicated Route
    if (cleanKey === 'about' || cleanKey === 'about-us') {
      return (
        <AboutPage
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
        />
      );
    }

    // Atlas Hub Route
    if (cleanKey === 'atlas' || cleanKey === 'clinical-atlas') {
      return (
        <div className="pt-4">
          <MedAtlasHubPage onOpenBooking={() => handleOpenBooking()} />
        </div>
      );
    }

    // Default: Main Meridian Vascular Homepage
    return (
      <HomePage
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#17241F] selection:bg-[#CE5B40]/30 selection:text-[#0B4036]">
      {/* Meridian Vascular Unified Header */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Meridian Vascular Unified Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Floating Meridbot Clinical Companion */}
      <ChatBot
        onOpenBooking={handleOpenBooking}
        onNavigate={handleNavigate}
      />

      {/* Consultation Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedDiseaseId={bookingPreselectedDisease}
      />
    </div>
  );
}
