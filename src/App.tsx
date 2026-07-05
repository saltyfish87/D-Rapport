/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Facilities from './components/Facilities';
import Layouts from './components/Layouts';
import FacilitiesPlan from './components/FacilitiesPlan';
import Location from './components/Location';
import Gallery from './components/Gallery';
import Registration from './components/Registration';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { useAdmin } from './context/AdminContext';
import { Settings } from 'lucide-react';

export default function App() {
  const { settings, setIsAdminOpen, isAdminSession } = useAdmin();

  // Dynamic SEO Synchronization
  useEffect(() => {
    // 1. Sync Page Document Title
    document.title = settings.seo.title || "Cappella Embassy | Official Ampang Hilir Enclave";

    // 2. Sync Google Site Verification tag
    let existingVerify = document.querySelector('meta[name="google-site-verification"]');
    if (settings.seo.googleVerification) {
      if (!existingVerify) {
        existingVerify = document.createElement('meta');
        existingVerify.setAttribute('name', 'google-site-verification');
        document.head.appendChild(existingVerify);
      }
      existingVerify.setAttribute('content', settings.seo.googleVerification);
    } else if (existingVerify) {
      existingVerify.remove();
    }

    // 3. Sync Meta Description
    let existingDesc = document.querySelector('meta[name="description"]');
    if (settings.seo.description) {
      if (!existingDesc) {
        existingDesc = document.createElement('meta');
        existingDesc.setAttribute('name', 'description');
        document.head.appendChild(existingDesc);
      }
      existingDesc.setAttribute('content', settings.seo.description);
    }

    // 4. Sync Meta Keywords
    let existingKeywords = document.querySelector('meta[name="keywords"]');
    if (settings.seo.keywords) {
      if (!existingKeywords) {
        existingKeywords = document.createElement('meta');
        existingKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(existingKeywords);
      }
      existingKeywords.setAttribute('content', settings.seo.keywords);
    }
  }, [settings.seo]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1A1A] selection:bg-[#B2946E]/30 selection:text-black overflow-x-hidden antialiased">
      {/* Premium Luxury Sticky Header */}
      <Navbar />

      <main>
        {/* Dramatic Immersive Visual Showcase Banner */}
        <Hero />

        {/* Vision & Low Density Core Benefits Block */}
        <Overview />

        {/* Key Features: 200,000 Sq Ft Resort Facilities Matrix */}
        <Facilities />

        {/* Location Amenities: Embassy District Accessibility Map Node Explorer */}
        <Location />

        {/* Executive Suites Diagrams & Investment Calculator */}
        <Layouts />

        {/* Level 2 Facilities Masterplan/Pelan */}
        <FacilitiesPlan />

        {/* Visual Experience Gallery */}
        <Gallery />

        {/* CTA: VIP Lead Intake Form */}
        <Registration />
      </main>

      {/* Corporate Disclaimer & Legal Declarations Footer */}
      <Footer />

      {/* Slide-over Control Panel Overlay */}
      {isAdminSession && <AdminPanel />}

      {/* Floating Concierge Action Trigger (Cleanly Placed & Responsive) */}
      {isAdminSession && (
        <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="bg-[#1A1A1A] hover:bg-[#B2946E] text-white px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(178,148,110,0.2)] transition-all duration-300 flex items-center gap-2 border border-[#B2946E]/30 text-[10px] font-mono tracking-widest font-bold uppercase rounded-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Settings className="w-3.5 h-3.5 animate-spin-slow text-[#B2946E]" />
            <span>Concierge Editor</span>
          </button>
        </div>
      )}
    </div>
  );
}
