/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facility, SuiteLayout, NeighborhoodLandmark } from './types';

export const COMPLETED_YEAR = 2020;
export const TOTAL_ACRES = '9.12 Acres';
export const TOTAL_UNITS = 1099;
export const LOW_DENSITY_RATIO = '120 units per acre';
export const DEV_PARTNER = 'Acmar Group';

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
    highlight: 'Unmatched KLCC Vistas'
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
    id: 'layout-a',
    typeName: 'Type A (The Executive)',
    sizeSqFt: 1100,
    sizeSqM: 102,
    bedrooms: 2,
    bathrooms: 2,
    utilityOrMaid: false,
    description: 'Designed for young professionals and elite expats. A perfect balance of compact efficiency and luxury, featuring dual bedroom suites with walk-in wardrobes.',
    startingPriceRM: 980000,
    keyFeature: 'Ideal executive layout with premium garden views and parallel dining flow.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1-6Op8469FKUIuGp_EzFGhyh_3ktHyI2U' // Type A1 floorplan
  },
  {
    id: 'layout-b',
    typeName: 'Type B (The Contemporary)',
    sizeSqFt: 1610,
    sizeSqM: 149,
    bedrooms: 3,
    bathrooms: 3,
    utilityOrMaid: true,
    description: 'An elegant mid-sized family suite featuring a large master suite, two secondary bedrooms, an expansive gourmet dry kitchen, and a helper’s quarter with separate access.',
    startingPriceRM: 1450000,
    keyFeature: 'L-shaped living-dining zone paired with a generous 8-meter panoramic balcony.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1Atw5pPIXn05BIssKDhSZ8gtutcalqGlE' // Type B floorplan
  },
  {
    id: 'layout-c',
    typeName: 'Type C (The Grand Residence)',
    sizeSqFt: 1900,
    sizeSqM: 176,
    bedrooms: 3,
    bathrooms: 4,
    utilityOrMaid: true,
    description: 'An ultra-spacious prestigious corner residence. Comprises three massive suite-bedrooms plus a customized family family/study area and full gourmet wet & dry culinary stations.',
    startingPriceRM: 1720000,
    keyFeature: 'Double corner glass frontage highlighting full-height views of the city as you enter.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1jm4TrMLirimtiz8hW2smV6RTHl80SRe3' // Type C floorplan
  },
  {
    id: 'layout-d',
    typeName: 'Type D (The Embassy Elite)',
    sizeSqFt: 2238,
    sizeSqM: 208,
    bedrooms: 4,
    bathrooms: 5,
    utilityOrMaid: true,
    description: 'A massive bespoke sanctuary engineered for multi-generational living. Features a dual-key option or super-suite configuration with unparalleled grandeur and double living areas.',
    startingPriceRM: 2050000,
    keyFeature: 'Breathtaking dual-aspect windows, private foyer entry, and dual premier suites.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1rW2qEl6-JzCFlWz9q71ffEgQR2e7RBKa' // Type A2 (represented suite plan)
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
    description: 'High-speed light rail transit station, taking you straight to KLCC (3 stops) or connecting to KL Sentral and Airport Express within minutes.'
  },
  {
    id: 'mark-klcc',
    category: 'shopping',
    name: 'KLCC & Petronas Twin Towers',
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
