/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facility, SuiteLayout, NeighborhoodLandmark } from './types';

export const COMPLETED_YEAR = 2020;
export const TOTAL_ACRES = '9.12 Acres';
export const TOTAL_UNITS = 1099;
export const LOW_DENSITY_RATIO = '120 units per acre';
export const DEV_PARTNER = "TSLAW Land (formerly D'Rapport Residences by Acmar Group)";

export const FACILITIES: Facility[] = [
  {
    id: 'fac-gym',
    category: 'sports',
    name: '11,000 sq ft Gym Oasis',
    description: 'One of Kuala Lumpur’s largest private condominium gymnasiums, featuring world-class weight and cardio suites overlooking the main pool deck.',
    iconName: 'Dumbbell',
    highlight: 'Technogym Equipped'
  },
  {
    id: 'fac-badminton',
    category: 'sports',
    name: 'Indoor Badminton Arena',
    description: 'Two premium wooden-floor badminton courts enclosed in a double-volume high-clearance sport hall.',
    iconName: 'Award',
    highlight: '2 Courts, Fully Air-conditioned'
  },
  {
    id: 'fac-squash',
    category: 'sports',
    name: 'Squash & Basketball Courts',
    description: 'A professional squash glass court paired with a modern half-court basketball arena for high-intensity indoor gaming.',
    iconName: 'Target',
    highlight: 'Glass-back Courts'
  },
  {
    id: 'fac-pool',
    category: 'leisure',
    name: 'Resort Olympic Lap Pool',
    description: 'A spectacular 50-meter lap pool flanked by an extensive sun deck, tropical cabanas, lounging pavilions, and a heated outdoor jacuzzi.',
    iconName: 'Droplet',
    highlight: 'Resort Club Feel'
  },
  {
    id: 'fac-sky',
    category: 'wellness',
    name: '38th Floor Sky Gardens',
    description: 'Stunning elevated sky decks atop all five residential towers, offering 360-degree unobstructed panoramas of the iconic KL Skyline.',
    iconName: 'Compass',
    highlight: 'Unmatched KL City Centre Vistas'
  },
  {
    id: 'fac-cinema',
    category: 'leisure',
    name: 'Private Cinema Screening',
    description: 'An intimate, luxury 20-seater gold-class private screening room with premium Dolby Atmos sound systems for movies and presentations.',
    iconName: 'Tv',
    highlight: 'Reservable for Hosts'
  },
  {
    id: 'fac-karaoke',
    category: 'leisure',
    name: 'Karaoke & Audio Suites',
    description: 'Sound-insulated karaoke lounge rooms equipped with state-of-the-art sound systems for private family events or social nights.',
    iconName: 'Mic',
    highlight: '3 Private Soundproof Suites'
  },
  {
    id: 'fac-walk',
    category: 'family',
    name: 'Elevated Canopy Forest Walk',
    description: 'A beautifully landscaped woodland walk winding through the 9.12-acre estate with elevated walkways and serene reading pavilions.',
    iconName: 'Trees',
    highlight: 'Lush Green Spaces'
  },
  {
    id: 'fac-kids',
    category: 'family',
    name: 'Indoor Play & Learning Hub',
    description: 'A safe, modern kid’s sanctuary with climbing structures, interactive gaming spaces, an adjacent quiet library, and parent lounge.',
    iconName: 'Smile',
    highlight: 'Child-safe & Monitored'
  }
];

export const SUITE_LAYOUTS: SuiteLayout[] = [
  {
    id: 'layout-d1',
    typeName: 'Type A1 (The Embassy Family)',
    sizeSqFt: 2260,
    sizeSqM: 210,
    bedrooms: 3,
    bathrooms: 4,
    utilityOrMaid: true,
    description: 'A massive bespoke sanctuary engineered for multi-generational living. Features a grand layout with 3+1 bedrooms, 4+1 bathrooms, double living areas, and a private entrance foyer.',
    startingPriceRM: 2050000,
    keyFeature: 'Breathtaking dual-aspect windows, private foyer entry, and dual premier suites.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1eT99BECIDOlxsdCDx5-OlmWTCkDP95xU'
  },
  {
    id: 'layout-d2',
    typeName: 'Type A2 (The Embassy Grand)',
    sizeSqFt: 2260,
    sizeSqM: 210,
    bedrooms: 3,
    bathrooms: 4,
    utilityOrMaid: true,
    description: 'A premier high-rise layout with a triple-aspect living salon, 3+1 bedroom configuration, 4+1 bathrooms, extra wide wet kitchen pantry, and dual master suites looking over the skyline.',
    startingPriceRM: 2080000,
    keyFeature: 'Bespoke triple-aspect corner lounge with expansive dry bar and butler pantry.',
    imageUrl: 'https://lh3.googleusercontent.com/d/131uhGIPx_U7F_32B8ogokAOQvrEzFVQF'
  },
  {
    id: 'layout-d3',
    typeName: 'Type A3 (The Embassy Duplex)',
    sizeSqFt: 2260,
    sizeSqM: 210,
    bedrooms: 3,
    bathrooms: 4,
    utilityOrMaid: true,
    description: 'An exclusive multi-generational layout with optional split-entrance configurations, 3+1 bedrooms, 4+1 bathrooms, and a master lounge lobby.',
    startingPriceRM: 2120000,
    keyFeature: 'Exclusive dual-key private lobby option, ideal for multi-generation co-living.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1qRZJ5c5nJZwtSOYfZHqNq_s2q3a1DBvX'
  },
  {
    id: 'layout-c',
    typeName: 'Type B (The Grand Residence)',
    sizeSqFt: 1927,
    sizeSqM: 179,
    bedrooms: 3,
    bathrooms: 4,
    utilityOrMaid: true,
    description: 'An ultra-spacious prestigious corner residence. Comprises three massive suite-bedrooms plus a customized family/study area and full gourmet wet & dry culinary stations.',
    startingPriceRM: 1720000,
    keyFeature: 'Double corner glass frontage highlighting full-height views of the city as you enter.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1x1MS6K-mDXSlDq5Q3nQeMkAgIQy1u2EQ'
  },
  {
    id: 'layout-b',
    typeName: 'Type C (The Contemporary)',
    sizeSqFt: 1626,
    sizeSqM: 151,
    bedrooms: 3,
    bathrooms: 3,
    utilityOrMaid: true,
    description: 'An elegant mid-sized family suite featuring a large master suite, two secondary bedrooms, an expansive gourmet dry kitchen, and a helper’s quarter with separate access.',
    startingPriceRM: 1450000,
    keyFeature: 'L-shaped living-dining zone paired with a generous 8-meter panoramic balcony.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1LOboWWIpv4ZAKP7sTdzWfmjscoNEBDQu'
  },
  {
    id: 'layout-a2',
    typeName: 'Type D1 (The Executive Pro)',
    sizeSqFt: 1152,
    sizeSqM: 107,
    bedrooms: 2,
    bathrooms: 2,
    utilityOrMaid: false,
    description: 'An upgraded executive suite with wider dining views, parallel bedroom portals, and premium walk-in closet configurations.',
    startingPriceRM: 995000,
    keyFeature: 'Splendid parallel view with private balcony and modern island kitchen.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1yS8G7WjwIklEQ1tg_ecttlrYWx9sYVpI'
  },
  {
    id: 'layout-a1',
    typeName: 'Type D2 (The Executive)',
    sizeSqFt: 1108,
    sizeSqM: 103,
    bedrooms: 2,
    bathrooms: 2,
    utilityOrMaid: false,
    description: 'Designed for young professionals and elite expats. A perfect balance of compact efficiency and luxury, featuring dual bedroom suites with walk-in wardrobes.',
    startingPriceRM: 980000,
    keyFeature: 'Ideal executive layout with premium garden views and parallel dining flow.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1m02UDoSszh_ugZU1f8t1ZIOpDvO1LnvY'
  }
];

export const NEIGHBORHOOD_LANDMARKS: NeighborhoodLandmark[] = [
  {
    id: 'mark-mall',
    category: 'shopping',
    name: 'Great Eastern Mall',
    distanceKm: 0.4,
    travelTimeMin: 2,
    description: 'Walking distance lifestyle mall featuring upscale bistros, premium Cold Storage supermarket, family medical clinic, and fitness hub.'
  },
  {
    id: 'mark-hospital',
    category: 'medical',
    name: 'Gleneagles Medical Centre',
    distanceKm: 0.5,
    travelTimeMin: 3,
    description: 'Malaysia’s premier international joint commission accredited private hospital, known for high-caliber medical expertise and elite service.'
  },
  {
    id: 'mark-iskl',
    category: 'education',
    name: 'International School of KL (ISKL)',
    distanceKm: 1.2,
    travelTimeMin: 5,
    description: 'Renowned ultra-modern campus offering top-tier American curriculum and international international baccalaureate programs for global families.'
  },
  {
    id: 'mark-sayfol',
    category: 'education',
    name: 'Sayfol International School',
    distanceKm: 1.8,
    travelTimeMin: 4,
    description: 'Famous London-based British curriculum academy hosting students from over 60 countries, situated right along Jalan Ampang.'
  },
  {
    id: 'mark-lrt',
    category: 'transit',
    name: 'Jelatek LRT Station',
    distanceKm: 1.0,
    travelTimeMin: 3,
    description: 'High-speed light rail transit station, taking you straight to KL City Centre (3 stops) or connecting to KL Sentral and Airport Express within minutes.'
  },
  {
    id: 'mark-klcc',
    category: 'shopping',
    name: 'Petronas Twin Towers',
    distanceKm: 3.5,
    travelTimeMin: 8,
    description: 'The golden heart of Kuala Lumpur. Experience high-end retail, Michelin restaurants, central park lakes, of course, the stunning twin skyscraper icons.'
  },
  {
    id: 'mark-golf',
    category: 'leisure',
    name: 'Royal Selangor Golf Club (RSGC)',
    distanceKm: 2.5,
    travelTimeMin: 6,
    description: 'Malaysia’s oldest, most prestigious 36-hole members-only golf club, providing lush evergreen backdrops for Ampang residents.'
  },
  {
    id: 'mark-embassy',
    category: 'transit',
    name: 'Embassy of the United States',
    distanceKm: 2.0,
    travelTimeMin: 5,
    description: 'Set on the safe, highly secured and tree-lined Embassy Row, housing foreign missions, high commissions, and consulate palaces.'
  }
];

/** FAQ shown near the bottom of the page and mirrored in the FAQPage schema (index.html). Facts from this file and the page copy. */
export interface FaqItem { question: string; answer: string }
export const FAQS: FaqItem[] = [
  { question: "Where is Cappella Embassy (formerly D'Rapport Residences) located?", answer: "Cappella Embassy is on Jalan Nipah, off Jalan Ampang, in Ampang Hilir, Kuala Lumpur (postcode 55000), the diplomatic enclave a short drive from KL City Centre and the Petronas Twin Towers, with international schools and the Royal Selangor Golf Club nearby." },
  { question: "Is Cappella Embassy completed?", answer: `Yes. The development was completed in ${COMPLETED_YEAR}, so units are ready for occupation rather than under construction.` },
  { question: "How large is the development and how many units are there?", answer: `The estate covers ${TOTAL_ACRES} with ${TOTAL_UNITS.toLocaleString()} units across five residential towers, about ${LOW_DENSITY_RATIO}.` },
  { question: "What unit sizes and layouts are available?", answer: "Layouts range from about 1,108 sq ft two-bedroom suites to 2,260 sq ft three-plus-one-bedroom family residences with four-plus-one bathrooms, including corner and dual-key configurations." },
  { question: "What are the prices at Cappella Embassy?", answer: "Indicative prices start from about RM 980,000 for the two-bedroom suites and go up to about RM 2,120,000 for the largest family layouts. Prices depend on the unit, floor and current availability; ask for the latest list." },
  { question: "What facilities does Cappella Embassy have?", answer: "Residents have an 11,000 sq ft gym, an indoor badminton arena, squash and basketball courts, a resort-style Olympic-length lap pool, sky gardens on the 38th floor with KL City Centre views, a private cinema and an elevated canopy forest walk through the 9.12-acre grounds." },
  { question: "Who developed Cappella Embassy?", answer: `The project is marketed under ${DEV_PARTNER}.` },
  { question: "How do I arrange a viewing?", answer: "Use the registration form on this page or WhatsApp +60 12-657 9508 to book a private viewing and receive the current price list and floor plans." }
];
