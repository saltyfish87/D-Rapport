/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUITE_LAYOUTS } from '../data';

export function transformGoogleDriveUrl(url: string | null | undefined): string {
  if (!url) return '';
  let cleaned = url.trim().replace(/^"|"$/g, '');
  let base = cleaned;
  if (/^[a-zA-Z0-9_-]{33}$/.test(cleaned) && (cleaned.startsWith('1') || cleaned.startsWith('0'))) {
    base = `https://lh3.googleusercontent.com/d/${cleaned}`;
  } else if (cleaned.includes('drive.google.com') || cleaned.includes('docs.google.com')) {
    const fileIdMatch = cleaned.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || cleaned.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      base = `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }
  
  // If it is a googleusercontent link, append highly optimized webp & sizing parameters (=w1600-rw)
  if (base.includes('lh3.googleusercontent.com/d/')) {
    // Prevent double-appending if already present
    if (!base.includes('=')) {
      return `${base}=w1600-rw`;
    }
  }
  return base;
}

export interface AdminSettings {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string; // Dynamic URL or 'default'
    buttonPrimaryText: string;
    buttonSecondaryText: string;
  };
  metrics: {
    proximity: string;
    proximityLabel: string;
    proximityDesc: string;
    landSprawl: string;
    landSprawlLabel: string;
    landSprawlDesc: string;
    gatherSpace: string;
    gatherSpaceLabel: string;
    gatherSpaceDesc: string;
    suiteSizes: string;
    suiteSizesLabel: string;
    suiteSizesDesc: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    googleVerification: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    developer: string;
    subsidiary: string;
    formspreeId: string;
  };
  overview: {
    tagline: string;
    title: string;
    description: string;
    imageUrl: string; // Dynamic URL or 'default'
  };
  gallery: {
    images: {
      id: string;
      title: string;
      category: string;
      url: string;
    }[];
  };
  suiteLayouts: {
    id: string;
    typeName: string;
    sizeSqFt: number;
    sizeSqM: number;
    bedrooms: number;
    bathrooms: number;
    utilityOrMaid: boolean;
    description: string;
    startingPriceRM: number;
    keyFeature: string;
    imageUrl?: string;
  }[];
}

const DEFAULT_SETTINGS: AdminSettings = {
  hero: {
    title: "Cappella Embassy",
    subtitle: "Ready for Occupancy · Elite Enclave",
    description: "A prestigious low-density residential masterpiece sitting on 9.12 prime acres of key Embassy Row territory. Estate-sized suites paired with 200,000 sq ft of private lifestyle club amenities.",
    imageUrl: "https://lh3.googleusercontent.com/d/1Vl3T3BzDlKwmKbW3PM4VXxP27Op-cSlm", // FACADE.jpeg
    buttonPrimaryText: "Book Private Tour",
    buttonSecondaryText: "Explore Suites"
  },
  metrics: {
    proximity: "3.5",
    proximityLabel: "Unique Proximity",
    proximityDesc: "Central CBD Access via Ampang Bypass",
    landSprawl: "9.12",
    landSprawlLabel: "Land Sprawls (Acres)",
    landSprawlDesc: "Expansive low-density grounds",
    gatherSpace: "200k",
    gatherSpaceLabel: "Elite Gather Space",
    gatherSpaceDesc: "Pure lifestyle & sports deck",
    suiteSizes: "1.1–2.26k",
    suiteSizesLabel: "Suite Sizes (sq ft)",
    suiteSizesDesc: "Generous, family-focused layouts"
  },
  seo: {
    title: "Cappella Embassy | Luxury Condominiums Ampang Hilir, Kuala Lumpur",
    description: "Discover Cappella Embassy in elite Ampang Hilir, Kuala Lumpur. Premium resort-style living across 9.12 prime acres with world-class facilities and panoramic city views.",
    keywords: "Cappella Embassy, D'Rapport Residences, Ampang Hilir Condominium, Kuala Lumpur Luxury Condo, Embassy Row Property, TSLAW Land, Acmar Group, Malaysia Real Estate, KL City Centre Suites",
    googleVerification: "google-site-verification-placeholder-code"
  },
  contact: {
    phone: "+60 12-657 9508",
    email: "inquiry@drapportresidences.com",
    address: "Jalan Nipah, Off Jalan Ampang, 55000 Kuala Lumpur, Malaysia.",
    developer: "TSLAW Land (formerly D'Rapport Residences by Acmar Group)",
    subsidiary: "Perkasa Sukma Sdn Bhd",
    formspreeId: "saltyfish1987@gmail.com"
  },
  overview: {
    tagline: "Elite Architectural Vision",
    title: "Low-Density Serenity in the Diplomatic District",
    description: "Cappella Embassy fuses grand architecture with elite security and a lush park oasis. An exclusive haven nestled gracefully within the high-class Ampang Hilir neighborhood, designed for everyday comfort and privacy.",
    imageUrl: "https://lh3.googleusercontent.com/d/12UUAYn-aDch2q0O-1zs1lTjDV-coWuNU" // FAMILY ROOM.jpeg
  },
  gallery: {
    images: [
      {
        id: "gal-1",
        title: "Grand Entrance Portal & Facade Showcase",
        category: "Exterior & Grounds",
        url: "https://lh3.googleusercontent.com/d/1Vl3T3BzDlKwmKbW3PM4VXxP27Op-cSlm"
      },
      {
        id: "gal-2",
        title: "Comprehensive Level 2 Facilities Masterplan",
        category: "Facilities Plan",
        url: "https://lh3.googleusercontent.com/d/1-oP4vHq6lc0ODSgTxWhs2pGrG3xG64V7"
      },
      {
        id: "gal-3",
        title: "Double-Volume Family Living Suites",
        category: "Exquisite Interiors",
        url: "https://lh3.googleusercontent.com/d/12UUAYn-aDch2q0O-1zs1lTjDV-coWuNU"
      },
      {
        id: "gal-4",
        title: "Professional Putting & Golf Simulator",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1kV90DxZcFXzzRwEQo68tWCNFRh1ujLkq"
      },
      {
        id: "gal-5",
        title: "High-Performance Training Gymnasium",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1zeEdVHqSiMXJCKJsGzc-q6JsB1Gz2OYX"
      },
      {
        id: "gal-6",
        title: "Soundproof Karaoke & Music Lounge",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1K__O-XlK7UAoNZKBjW3obWXspi0U7N1H"
      },
      {
        id: "gal-7",
        title: "Double-Volume Multipurpose Clubhouse Hall",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1DrsW-5RIOGEoIzmwFavj6-PaG5trmLin"
      },
      {
        id: "gal-8",
        title: "Teal Water Pools & Overhanging Pavilions",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1PuuEW6pWUUp_Tt8NchanJL-Xr_XYVNl4"
      },
      {
        id: "gal-9",
        title: "Rooftop Sky Bar & Social Lounge",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1JWHzQrfnsbxIILxt5SRB7DPBdjdLRnP_"
      },
      {
        id: "gal-10",
        title: "Warm Organic Modern Social Lounge",
        category: "Exquisite Interiors",
        url: "https://lh3.googleusercontent.com/d/1GDAsdmnfqPQ3d1tVdKEgekSx9qzGoI6a"
      },
      {
        id: "gal-11",
        title: "Strategic Location Map & Transport Junctions",
        category: "Location",
        url: "https://lh3.googleusercontent.com/d/1YY_mgXog-4mAJTybU4PrVPt4NU8DsVLu"
      },
      {
        id: "gal-12",
        title: "Suite Type D2 Floorplan (1,108 sq ft)",
        category: "Suite Floorplans",
        url: "https://lh3.googleusercontent.com/d/1m02UDoSszh_ugZU1f8t1ZIOpDvO1LnvY"
      },
      {
        id: "gal-13",
        title: "Suite Type D1 Floorplan (1,152 sq ft)",
        category: "Suite Floorplans",
        url: "https://lh3.googleusercontent.com/d/1yS8G7WjwIklEQ1tg_ecttlrYWx9sYVpI"
      },
      {
        id: "gal-14",
        title: "Suite Type C Floorplan (1,626 sq ft)",
        category: "Suite Floorplans",
        url: "https://lh3.googleusercontent.com/d/1LOboWWIpv4ZAKP7sTdzWfmjscoNEBDQu"
      },
      {
        id: "gal-15",
        title: "Suite Type B Floorplan (1,927 sq ft)",
        category: "Suite Floorplans",
        url: "https://lh3.googleusercontent.com/d/1x1MS6K-mDXSlDq5Q3nQeMkAgIQy1u2EQ"
      },
      {
        id: "gal-16",
        title: "Suite Type A1 Floorplan (2,260 sq ft)",
        category: "Suite Floorplans",
        url: "https://lh3.googleusercontent.com/d/1eT99BECIDOlxsdCDx5-OlmWTCkDP95xU"
      },
      {
        id: "gal-17",
        title: "Suite Type A2 Floorplan (2,260 sq ft)",
        category: "Suite Floorplans",
        url: "https://lh3.googleusercontent.com/d/131uhGIPx_U7F_32B8ogokAOQvrEzFVQF"
      },
      {
        id: "gal-18",
        title: "Suite Type A3 Floorplan (2,260 sq ft)",
        category: "Suite Floorplans",
        url: "https://lh3.googleusercontent.com/d/1qRZJ5c5nJZwtSOYfZHqNq_s2q3a1DBvX"
      }
    ]
  },
  suiteLayouts: SUITE_LAYOUTS.map(ly => ({
    id: ly.id,
    typeName: ly.typeName,
    sizeSqFt: ly.sizeSqFt,
    sizeSqM: ly.sizeSqM,
    bedrooms: ly.bedrooms,
    bathrooms: ly.bathrooms,
    utilityOrMaid: ly.utilityOrMaid,
    description: ly.description,
    startingPriceRM: ly.startingPriceRM,
    keyFeature: ly.keyFeature,
    imageUrl: ly.imageUrl
  }))
};

interface AdminContextProps {
  settings: AdminSettings;
  updateSettings: (newSettings: AdminSettings) => void;
  resetSettings: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (isOpen: boolean) => void;
  isAdminSession: boolean;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AdminSettings>(() => {
    try {
      const stored = localStorage.getItem('drapport_admin_settings');
      if (stored) {
        // Merge stored values with default values, ensuring absolute compatibility
        const parsed = JSON.parse(stored);
        
        // Auto-heal/backfill suiteLayouts to guarantee all 7 are present and merged with saved overrides
        const healedLayouts = DEFAULT_SETTINGS.suiteLayouts.map((defaultLy) => {
          const storedLy = (parsed.suiteLayouts || []).find((ly: any) => ly.id === defaultLy.id);
          if (!storedLy) return defaultLy;

          // Check if the stored layout has outdated metadata (sizes, type names, bedrooms, bathrooms)
          const isOutdated = 
            storedLy.sizeSqFt !== defaultLy.sizeSqFt || 
            storedLy.typeName !== defaultLy.typeName || 
            storedLy.bedrooms !== defaultLy.bedrooms ||
            storedLy.bathrooms !== defaultLy.bathrooms ||
            storedLy.sizeSqM !== defaultLy.sizeSqM ||
            storedLy.utilityOrMaid !== defaultLy.utilityOrMaid;

          if (isOutdated) {
            return defaultLy;
          }

          return {
            ...defaultLy,
            ...storedLy,
            imageUrl: defaultLy.imageUrl
          };
        });

        // Force-sync gallery with default settings to guarantee all stale/old unsplash images are removed and synced perfectly with Google Drive
        const healedGalleryImages = [...DEFAULT_SETTINGS.gallery.images];

        const heroData = { ...DEFAULT_SETTINGS.hero, ...parsed.hero };
        if (heroData.title === "An Oasis of Grandeur in Ampang Hilir" || heroData.title === "D'Rapport Residences") {
          heroData.title = "Cappella Embassy";
        }

        const seoData = { ...DEFAULT_SETTINGS.seo, ...parsed.seo };
        if (seoData.title && seoData.title.includes("D'Rapport Residences")) {
          seoData.title = seoData.title.replace(/D'Rapport Residences/g, "Cappella Embassy");
        }
        if (seoData.description && seoData.description.includes("D'Rapport Residences")) {
          seoData.description = seoData.description.replace(/D'Rapport Residences/g, "Cappella Embassy");
        }

        const contactData = { ...DEFAULT_SETTINGS.contact, ...parsed.contact };
        if (contactData.developer === "ACMAR Development" || (contactData.developer && contactData.developer.includes("ACMAR"))) {
          contactData.developer = "TSLAW Land (formerly D'Rapport Residences by Acmar Group)";
        }

        const overviewData = { ...DEFAULT_SETTINGS.overview, ...parsed.overview };
        if (overviewData.description && (overviewData.description.includes("D’Rapport Residences") || overviewData.description.includes("D'Rapport Residences"))) {
          overviewData.description = overviewData.description.replace(/D’Rapport Residences|D'Rapport Residences/g, "Cappella Embassy");
        }

        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          hero: heroData,
          metrics: { ...DEFAULT_SETTINGS.metrics, ...parsed.metrics },
          seo: seoData,
          contact: contactData,
          overview: overviewData,
          suiteLayouts: healedLayouts,
          gallery: {
            ...DEFAULT_SETTINGS.gallery,
            ...parsed.gallery,
            images: healedGalleryImages
          }
        };
      }
    } catch (e) {
      console.error("Failed to load admin settings", e);
    }
    return DEFAULT_SETTINGS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminSession, setIsAdminSession] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      // Development/Preview is defined as localhost, 127.0.0.1, or containing 'ais-dev-'
      const isDevPreview = hostname === 'localhost' || 
                           hostname === '127.0.0.1' || 
                           hostname.startsWith('localhost:') || 
                           hostname.includes('ais-dev-');
      
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get('admin');
      const editorParam = params.get('editor');
      const conciergeParam = params.get('concierge');
      
      if (isDevPreview) {
        // Always enable the admin concierge editor in development previews
        setIsAdminSession(true);
      } else {
        // Public/Shared/Production view: hide by default unless explicitly toggled by URL query params or persisted localStorage
        if (adminParam === 'false' || editorParam === 'false' || conciergeParam === 'false') {
          localStorage.removeItem('drapport_is_admin_session');
          setIsAdminSession(false);
        } else if (adminParam === 'true' || editorParam === 'true' || conciergeParam === 'true') {
          localStorage.setItem('drapport_is_admin_session', 'true');
          setIsAdminSession(true);
        } else {
          // Fallback to localStorage, otherwise false (hidden from public view)
          setIsAdminSession(localStorage.getItem('drapport_is_admin_session') === 'true');
        }
      }
    }
  }, []);

  // Sync settings to localStorage and update document HTML SEO tags dynamically
  useEffect(() => {
    localStorage.setItem('drapport_admin_settings', JSON.stringify(settings));

    // Update Page Title
    if (settings.seo.title) {
      document.title = settings.seo.title;
    }

    // Update Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', settings.seo.description);

    // Update Meta Keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', settings.seo.keywords);

    // Update Google Verification Meta
    let gVerifMeta = document.querySelector('meta[name="google-site-verification"]');
    if (!gVerifMeta) {
      gVerifMeta = document.createElement('meta');
      gVerifMeta.setAttribute('name', 'google-site-verification');
      document.head.appendChild(gVerifMeta);
    }
    gVerifMeta.setAttribute('content', settings.seo.googleVerification);
  }, [settings]);

  const updateSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <AdminContext.Provider value={{ settings, updateSettings, resetSettings, isAdminOpen, setIsAdminOpen, isAdminSession }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
