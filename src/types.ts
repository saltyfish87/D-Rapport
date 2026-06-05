/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Facility {
  id: string;
  category: 'sports' | 'leisure' | 'wellness' | 'family';
  name: string;
  description: string;
  iconName: string;
  highlight?: string;
}

export interface SuiteLayout {
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
}

export interface NeighborhoodLandmark {
  id: string;
  category: 'shopping' | 'medical' | 'education' | 'leisure' | 'transit';
  name: string;
  distanceKm: number;
  travelTimeMin: number;
  description: string;
}

export interface InquiryLead {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredLayoutId: string;
  sizeCategory: string;
  countryCode: string;
  createdAt: string;
}
