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
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { useAdmin } from './context/AdminContext';
import { Settings } from 'lucide-react';

export default function App() {
  const { settings, setIsAdminOpen, isAdminSession } = useAdmin();

  // Dynamic SEO & AI-SEO Synchronization
  useEffect(() => {
    const seoTitle = settings.seo.title || "Cappella Embassy Kuala Lumpur | Luxury Suites Ampang Hilir";
    const seoDesc = settings.seo.description || "Discover Cappella Embassy (formerly D'Rapport Residences), Kuala Lumpur's premier low-density luxury condominium in the prestigious Embassy Row of Ampang Hilir.";
    const seoKeywords = settings.seo.keywords || "Cappella Embassy, D'Rapport Residences, Ampang Hilir, Kuala Lumpur Luxury Condo, Embassy Row Property";
    const logoUrl = "https://lh3.googleusercontent.com/d/1Vl3T3BzDlKwmKbW3PM4VXxP27Op-cSlm";

    // 1. Sync Page Document Title
    document.title = seoTitle;

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
    if (!existingDesc) {
      existingDesc = document.createElement('meta');
      existingDesc.setAttribute('name', 'description');
      document.head.appendChild(existingDesc);
    }
    existingDesc.setAttribute('content', seoDesc);

    // 4. Sync Meta Keywords
    let existingKeywords = document.querySelector('meta[name="keywords"]');
    if (!existingKeywords) {
      existingKeywords = document.createElement('meta');
      existingKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(existingKeywords);
    }
    existingKeywords.setAttribute('content', seoKeywords);

    // 5. Sync Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', seoTitle);

    // 6. Sync Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', seoDesc);

    // 7. Sync Open Graph Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', logoUrl);

    // 8. Sync Twitter Title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', seoTitle);

    // 9. Sync Twitter Description
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', seoDesc);

    // 10. Sync Schema.org JSON-LD dynamic generation
    let schemaScript = document.getElementById('seo-schema-jsonld') as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'seo-schema-jsonld');
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      "name": "Cappella Embassy",
      "alternateName": "D'Rapport Residences",
      "description": seoDesc,
      "url": window.location.origin,
      "logo": logoUrl,
      "image": logoUrl,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jalan Nipah, Off Jalan Ampang",
        "addressLocality": "Ampang Hilir",
        "addressRegion": "Kuala Lumpur",
        "postalCode": "55000",
        "addressCountry": "MY"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "3.1585",
        "longitude": "101.7371"
      },
      "telephone": settings.contact.phone || "+60126579508",
      "priceRange": "RM 980,000 - RM 2,120,000",
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "11,000 sq ft Gym Oasis",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Indoor Badminton Arena",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Squash & Basketball Courts",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Resort Olympic Lap Pool",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "38th Floor Sky Gardens with KLCC Vistas",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Private Cinema Screening",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Elevated Canopy Forest Walk",
          "value": true
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(schemaData, null, 2);
  }, [settings.seo, settings.contact]);

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
        <FAQ />
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
