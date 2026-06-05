/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NEIGHBORHOOD_LANDMARKS } from '../data';
import {
  MapPin,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Train,
  Compass,
  ArrowRight,
  Car,
  Clock
} from 'lucide-react';

const CategoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  all: Compass,
  shopping: ShoppingBag,
  medical: HeartPulse,
  education: GraduationCap,
  leisure: Compass,
  transit: Train
};

export default function Location() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'shopping' | 'medical' | 'education' | 'leisure' | 'transit'>('all');
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>('mark-klcc');

  const filteredLandmarks = NEIGHBORHOOD_LANDMARKS.filter(
    (mark) => selectedCategory === 'all' || mark.category === selectedCategory
  );

  const activeLandmark = NEIGHBORHOOD_LANDMARKS.find((m) => m.id === selectedLandmarkId) || NEIGHBORHOOD_LANDMARKS[0];

  return (
    <section id="location" className="py-24 bg-[#FCFCFA] border-b border-[#EBEBE6] relative">
      {/* Decorative background element */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#B2946E]/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16">
          <span className="text-[#B2946E] font-mono text-xs uppercase tracking-[0.25em] block mb-3 font-semibold">
            Premium Kuala Lumpur enclave
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight text-[#1C1C1B] mb-6">
            The Prestigious Embassy Row Property
          </h2>
          <div className="w-16 h-0.5 bg-[#B2946E]/60 mb-6 hidden md:block" />
          <p className="text-sm sm:text-base text-[#2D2D2A] font-sans font-normal leading-relaxed">
            Nestled along Jalan Nipah, just off the prominent diplomatic corridor of Jalan Ampang, D'Rapport Residences offers an unrivaled city address. Highly secure and exceptionally connected, the estate is situated moments from world-class healthcare centers, prestigious international academies, and rapid transit gateways.
          </p>
        </div>

        {/* Brand Filterable Grid Layout (No interactive map, just gorgeous and clean info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Filtering and lists (7 columns wider view) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono text-[#82827E] uppercase tracking-widest block font-bold">
                Filter Surrounding Landmarks
              </span>

              {/* High-contrast Category Filtering pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Places' },
                  { id: 'shopping', label: 'Retail & Grocery' },
                  { id: 'medical', label: 'Medical Facilities' },
                  { id: 'education', label: 'Elite Education' },
                  { id: 'transit', label: 'Transit Links' }
                ].map((pill) => {
                  const Icon = CategoryIconMap[pill.id] || Compass;
                  const isCur = selectedCategory === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => {
                        setSelectedCategory(pill.id as any);
                        const firstMatch = NEIGHBORHOOD_LANDMARKS.find((m) => pill.id === 'all' || m.category === pill.id);
                        if (firstMatch) setSelectedLandmarkId(firstMatch.id);
                      }}
                      className={`px-3.5 py-2 text-[10px] font-sans uppercase font-bold tracking-wider flex items-center gap-1.5 border rounded-none transition-all duration-200 cursor-pointer ${
                        isCur
                          ? 'bg-[#1C1C1B] border-[#1C1C1B] text-white'
                          : 'bg-white border-[#EBEBE6] text-[#575754] hover:text-[#1C1C1B] hover:border-[#B2946E] shadow-[0_2px_8px_rgba(28,28,27,0.01)]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{pill.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List Cards */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredLandmarks.map((mark) => {
                const isSelected = selectedLandmarkId === mark.id;
                return (
                  <button
                    key={mark.id}
                    onClick={() => setSelectedLandmarkId(mark.id)}
                    className={`w-full p-4 border rounded-none text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#B2946E] shadow-[0_4px_15px_rgba(178,148,110,0.1)] ring-1 ring-[#B2946E]/30'
                        : 'bg-[#FCFCFA]/40 border-[#EBEBE6] hover:border-[#B2946E]/50 hover:bg-white shadow-[0_2px_6px_rgba(28,28,27,0.01)]'
                    }`}
                  >
                    <div className="min-w-0 pr-4">
                      <h4 className={`text-xs font-sans font-bold transition-colors ${isSelected ? 'text-[#B2946E]' : 'text-[#1C1C1B]'}`}>
                        {mark.name}
                      </h4>
                      <p className="text-[11px] text-[#2D2D2A] font-sans mt-0.5 truncate max-w-sm sm:max-w-md lg:max-w-xs xl:max-w-sm font-medium">
                        {mark.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 font-mono text-[#1C1C1B]">
                      <div className="text-right whitespace-nowrap">
                        <span className={`block text-xs font-bold ${isSelected ? 'text-[#B2946E]' : 'text-[#1C1C1B]'}`}>
                          {mark.distanceKm} km
                        </span>
                        <span className="text-[9px] text-[#82827E] block">
                          {mark.travelTimeMin} mins
                        </span>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#B2946E] translate-x-1' : 'text-[#82827E]'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Active Highlight Card & Highways Bulletin (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-[#EBEBE6] p-5 shadow-[0_4px_25px_rgba(28,28,27,0.02)] rounded-none relative">
              <span className="text-[9px] font-mono text-[#B2946E] uppercase tracking-widest block mb-4 font-bold">
                Landmark Spotlight
              </span>

              <AnimatePresence mode="wait">
                {activeLandmark && (
                  <motion.div
                    key={activeLandmark.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[#EBEBE6] pb-3">
                      <div>
                        <h4 className="text-sm font-sans font-extrabold text-[#1C1C1B] uppercase tracking-wide">
                          {activeLandmark.name}
                        </h4>
                        <span className="text-[9px] font-mono text-[#82827E] uppercase block mt-1">
                          Category: {activeLandmark.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-sans text-amber-700 font-bold bg-[#B2946E]/15 border border-[#B2946E]/30 px-2.5 py-1 rounded-none uppercase select-none">
                        Elite Coordinate
                      </span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-[#2D2D2A] font-sans leading-relaxed font-normal">
                      {activeLandmark.description}
                    </p>
                    
                    <div className="flex gap-4 border-t border-[#EBEBE6] pt-4 font-sans text-xs">
                      <div className="flex items-center gap-1.5 text-[#2D2D2A] font-medium">
                        <Car className="w-4 h-4 text-[#B2946E]" />
                        <span><strong className="text-[#1C1C1B] font-bold">{activeLandmark.distanceKm} km</strong> distance</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 px-2.5 py-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{activeLandmark.travelTimeMin} Mins Drive</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Travel Summary Bulletins */}
            <div className="bg-[#FCFCFA] p-5 rounded-none border border-[#EBEBE6] shadow-[0_4px_15px_rgba(28,28,27,0.01)] space-y-4">
              <span className="text-[9px] font-mono text-[#B2946E] uppercase tracking-widest block font-bold border-b border-[#EBEBE6] pb-2">
                Rapid High-profile Corridors
              </span>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-[#B2946E] font-mono text-xs font-bold mt-0.5">01/</div>
                  <div>
                    <h5 className="text-xs font-sans font-bold text-[#1C1C1B]">AKLEH Highway Bypass</h5>
                    <p className="text-[11px] text-[#3B3B38] font-sans leading-relaxed mt-0.5 font-normal">
                      A direct, elevated toll-road bypass allowing residents to avoid local traffic signals and arrive at Suria KLCC and the Petronas Twin Towers in under 6 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-[#B2946E] font-mono text-xs font-bold mt-0.5">02/</div>
                  <div>
                    <h5 className="text-xs font-sans font-bold text-[#1C1C1B]">Pedestrian Promenade</h5>
                    <p className="text-[11px] text-[#3B3B38] font-sans leading-relaxed mt-0.5 font-normal">
                      Safe, secure, and comfortably shaded pathways connecting residents directly to Great Eastern Mall and Gleneagles Hospital in less than 5 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
