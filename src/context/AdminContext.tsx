/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUITE_LAYOUTS } from '../data';

export function transformGoogleDriveUrl(url: string | null | undefined): string {
  if (!url) return '';
  let cleaned = url.trim().replace(/^"|"$/g, '');
  if (/^[a-zA-Z0-9_-]{33}$/.test(cleaned) && (cleaned.startsWith('1') || cleaned.startsWith('0'))) {
    return `https://lh3.googleusercontent.com/d/${cleaned}`;
  }
  if (cleaned.includes('drive.google.com') || cleaned.includes('docs.google.com')) {
    const fileIdMatch = cleaned.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || cleaned.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }
  return cleaned;
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
    bedrooms: number;
    bathrooms: number;
    description: string;
    startingPriceRM: number;
    keyFeature: string;
    imageUrl?: string;
  }[];
}

const DEFAULT_SETTINGS: AdminSettings = {
  hero: {
    title: "An Oasis of Grandeur in Ampang Hilir",
    subtitle: "Ready for Occupancy · Elite Enclave",
    description: "A prestigious low-density residential masterpiece sitting on 9.12 prime acres of key Embassy Row territory. Just 3.5km from KLCC, combining estate-sized suites and an unparalleled 200,000 sq ft of private amenities.",
    imageUrl: "https://lh3.googleusercontent.com/d/1li36_e-kW3TxgxxzzhRkPa9rA96iJ8yQ", // Google Drive direct Facade image
    buttonPrimaryText: "Register for private view",
    buttonSecondaryText: "Explore development"
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
    suiteSizes: "1.1–2.2k",
    suiteSizesLabel: "Suite Sizes (sq ft)",
    suiteSizesDesc: "Generous, family-focused layouts"
  },
  seo: {
    title: "D'Rapport Residences | Luxury Condominiums Ampang Hilir, Kuala Lumpur",
    description: "Discover D'Rapport Residences in elite Ampang Hilir, Kuala Lumpur. Premium resort-style living across 9.12 prime acres with world-class facilities and panoramic city views.",
    keywords: "D'Rapport Residences, Ampang Hilir Condominium, Kuala Lumpur Luxury Condo, Embassy Row Property, Acmar Group, Malaysia Real Estate, KLCC Suites",
    googleVerification: "google-site-verification-placeholder-code"
  },
  contact: {
    phone: "+60 12-657 9508",
    email: "inquiry@drapportresidences.com",
    address: "Jalan Nipah, Off Jalan Ampang, 55000 Kuala Lumpur, Malaysia.",
    developer: "ACMAR Development",
    subsidiary: "Perkasa Sukma Sdn Bhd"
  },
  overview: {
    tagline: "Elite Architectural Vision",
    title: "Low-Density Serenity Just Minutes From KL City Centre",
    description: "D’Rapport Residences stands out for its well-balanced lifestyle offering, combining generous, estate-sized interior spaces with an extensive range of facilities designed for everyday comfort and recreation. It is an exclusive haven nestled gracefully within the high-class Ampang Hilir neighborhood.",
    imageUrl: "https://lh3.googleusercontent.com/d/1cXFbZHInlsEgmVRWeXxBj4muHwKuFkqz" // Google Drive direct Modern Contemporary interior
  },
  gallery: {
    images: [
      {
        id: "gal-1",
        title: "Grand Entrance Portal & Facade Showcase",
        category: "Exterior & Grounds",
        url: "https://lh3.googleusercontent.com/d/1li36_e-kW3TxgxxzzhRkPa9rA96iJ8yQ"
      },
      {
        id: "gal-2",
        title: "Expansive Multi-Tier Lifestyle Facilities Deck",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1mI3cP2NSlYRDhS5_u7WEuM6aQIS__Fr1"
      },
      {
        id: "gal-3",
        title: "Lush Manicured Gardens & Canopy Walkways",
        category: "Lush Greenery",
        url: "https://lh3.googleusercontent.com/d/1VqUK8zTL77Tz8rjDV3ePTT4ERiNPZwY6"
      },
      {
        id: "gal-4",
        title: "Resort-Style Olympic-Length Swimming Pool",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1WaGGwwKnM2d3vWhvuDW-n-hYXCbQl61w"
      },
      {
        id: "gal-5",
        title: "Light-Filled Private Gym & Fitness Studio",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1q-7ZN5HiK8DXOnTD7KRJPicFsSe5HmKb"
      },
      {
        id: "gal-6",
        title: "Indoor Golf Putting Range & Simulators",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1y5VtmBHvvbWYEgcvxqm5efEPODQ7ieuu"
      },
      {
        id: "gal-7",
        title: "Modern Contemporary Private Living Hall",
        category: "Exquisite Interiors",
        url: "https://lh3.googleusercontent.com/d/1cXFbZHInlsEgmVRWeXxBj4muHwKuFkqz"
      },
      {
        id: "gal-8",
        title: "Exquisite Master Retreat with Minimalist Lines",
        category: "Exquisite Interiors",
        url: "https://lh3.googleusercontent.com/d/1HJBYYr6obe2-pTb3K3x9_LPwyvhJE43a"
      },
      {
        id: "gal-9",
        title: "Warm Organic Modern Muji Shared Lounge",
        category: "Exquisite Interiors",
        url: "https://lh3.googleusercontent.com/d/1zX7Uu5ZreyiIZ_cfTsHTyIvyZ0ZSig06"
      },
      {
        id: "gal-10",
        title: "High-Ceiling Dual Dining and Culinary Lounge",
        category: "Exquisite Interiors",
        url: "https://lh3.googleusercontent.com/d/1SkOQvZFNqED9gcHkJHZyogjUiQ8slldf"
      },
      {
        id: "gal-11",
        title: "Airy Scandinavian Style Suite Quiet Corner",
        category: "Exquisite Interiors",
        url: "https://lh3.googleusercontent.com/d/1L1dBEZ7gnp_FGQAwB18QsGAfCE7VnmcC"
      },
      {
        id: "gal-12",
        title: "Minutes to Mandarin Oriental & Petronas Twin Towers",
        category: "Exterior & Grounds",
        url: "https://lh3.googleusercontent.com/d/1lOrTc1cFQOa5Y8M9htEdyRN3LL5Eq-nW"
      },
      {
        id: "gal-13",
        title: "Double-Volume Grand Multipurpose Clubhouse Hall",
        category: "Amenities",
        url: "https://lh3.googleusercontent.com/d/1nTEobHvR_ZbHWHhlnb_Mont4kDl94mZN"
      }
    ]
  },
  suiteLayouts: SUITE_LAYOUTS.map(ly => ({
    id: ly.id,
    typeName: ly.typeName,
    sizeSqFt: ly.sizeSqFt,
    bedrooms: ly.bedrooms,
    bathrooms: ly.bathrooms,
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
        
        // Auto-heal/backfill suiteLayouts with new default fields like imageUrl
        const rawLayouts = parsed.suiteLayouts || DEFAULT_SETTINGS.suiteLayouts;
        const healedLayouts = rawLayouts.map((ly: any) => {
          const matchedDefault = DEFAULT_SETTINGS.suiteLayouts.find((d) => d.id === ly.id);
          return {
            ...matchedDefault,
            ...ly,
            imageUrl: ly.imageUrl || (matchedDefault ? matchedDefault.imageUrl : '')
          };
        });

        // Auto-heal/upgrad gallery with high-res drive images for anyway holding old unsplash or legacy references
        const savedGallery = parsed.gallery || DEFAULT_SETTINGS.gallery;
        const healedGalleryImages = savedGallery.images.map((img: any) => {
          const matchedDefault = DEFAULT_SETTINGS.gallery.images.find((d) => d.id === img.id);
          if (img.url && (img.url.includes('unsplash.com') || img.url === 'default') && matchedDefault) {
            return {
              ...img,
              url: matchedDefault.url
            };
          }
          return {
            ...matchedDefault,
            ...img
          };
        });

        // Ensure newly added default gallery images (like gal-13) are appended if missing entirely
        DEFAULT_SETTINGS.gallery.images.forEach((defaultImg) => {
          const exists = healedGalleryImages.some((img: any) => img.id === defaultImg.id);
          if (!exists) {
            healedGalleryImages.push(defaultImg);
          }
        });

        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          hero: { ...DEFAULT_SETTINGS.hero, ...parsed.hero },
          metrics: { ...DEFAULT_SETTINGS.metrics, ...parsed.metrics },
          seo: { ...DEFAULT_SETTINGS.seo, ...parsed.seo },
          contact: { ...DEFAULT_SETTINGS.contact, ...parsed.contact },
          overview: { ...DEFAULT_SETTINGS.overview, ...parsed.overview },
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
  const [isAdminSession, setIsAdminSession] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get('admin');
      const editorParam = params.get('editor');
      if (adminParam === 'false' || editorParam === 'false') {
        localStorage.removeItem('drapport_is_admin_session');
        setIsAdminSession(false);
      } else if (adminParam === 'true' || editorParam === 'true' || params.get('concierge') === 'true') {
        localStorage.setItem('drapport_is_admin_session', 'true');
        setIsAdminSession(true);
      } else {
        setIsAdminSession(localStorage.getItem('drapport_is_admin_session') === 'true');
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
