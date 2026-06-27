/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NEIGHBORHOOD_LANDMARKS } from '../data';
import {
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
    <section id="location" className="py-24 bg-white border-b border-[#EBEBE6] relative overflow-hidden">
      {/* Decorative background subtle glow */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#00CFC8]/5 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#2AE8D8]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-dotted-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[#008B85] font-mono text-xs uppercase tracking-[0.3em] block mb-3 font-bold">
            Premium Kuala Lumpur enclave
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tighter text-stone-900 mb-6">
            The Prestigious Embassy Row Address
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] mb-6" />
          <p className="text-base text-stone-850 font-sans font-normal leading-relaxed">
            Situated along Jalan Nipah, just off Jalan Ampang, D'Rapport Residences offers an elite Embassy Row address. Highly secure and exceptionally connected, the estate is moments from premium medical centers, prestigious international academies, and rapid transit.
          </p>
        </div>

        {/* Brand Filterable Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Filtering and lists (7 columns for plenty of space) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block font-bold">
                Filter Surrounding Landmarks
              </span>

              {/* High-contrast Category Filtering pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Places' },
                  { id: 'shopping', label: 'Retail' },
                  { id: 'medical', label: 'Medical' },
                  { id: 'education', label: 'Elite School' },
                  { id: 'transit', label: 'Transit' }
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
                      className={`px-3.5 py-2 text-[10px] font-sans uppercase font-black tracking-wider flex items-center gap-1.5 border rounded-none transition-all duration-300 cursor-pointer ${
                        isCur
                          ? 'bg-[#00CFC8] border-[#00CFC8] text-neutral-900 font-extrabold shadow-[0_2px_8px_rgba(0,207,200,0.2)]'
                          : 'bg-white border-[#EBEBE6] text-stone-600 hover:text-stone-900 hover:border-[#00CFC8]/40 shadow-sm'
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
                        ? 'bg-white border-[#00CFC8] shadow-[0_4px_15px_rgba(0,207,200,0.08)] ring-1 ring-[#00CFC8]/30'
                        : 'bg-white border-[#EBEBE6] hover:border-stone-300 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="min-w-0 pr-4">
                      <h4 className={`text-xs font-sans font-extrabold transition-colors ${isSelected ? 'text-[#008B85]' : 'text-stone-900'}`}>
                        {mark.name}
                      </h4>
                      <p className="text-[11px] text-stone-700 font-sans mt-0.5 truncate max-w-sm sm:max-w-md lg:max-w-xs xl:max-w-sm font-normal">
                        {mark.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 font-mono text-stone-900">
                      <div className="text-right whitespace-nowrap">
                        <span className={`block text-xs font-bold ${isSelected ? 'text-[#008B85]' : 'text-stone-900'}`}>
                          {mark.distanceKm} km
                        </span>
                        <span className="text-[9px] text-stone-500 block">
                          {mark.travelTimeMin} mins
                        </span>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#008B85] translate-x-1' : 'text-stone-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Active Highlight Card & Highways Bulletin (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-[#EBEBE6] p-6 shadow-sm rounded-none relative">
              <span className="text-[9px] font-mono text-[#008B85] uppercase tracking-widest block mb-4 font-bold">
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
                    <div className="flex flex-col gap-2 border-b border-[#EBEBE6] pb-4">
                      <h4 className="text-sm font-sans font-black text-stone-900 uppercase tracking-wider leading-snug">
                        {activeLandmark.name}
                      </h4>
                      <span className="text-[9px] font-mono text-stone-500 uppercase block">
                        Category: {activeLandmark.category}
                      </span>
                      <span className="text-[9px] font-sans text-neutral-900 font-bold bg-gradient-to-r from-[#00CFC8]/30 to-[#2AE8D8]/30 px-2.5 py-1 rounded-none uppercase select-none w-fit mt-1">
                        Elite Coordinate
                      </span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-stone-850 font-sans leading-relaxed font-normal">
                      {activeLandmark.description}
                    </p>
                    
                    <div className="flex flex-col gap-2.5 border-t border-[#EBEBE6] pt-4 font-sans text-xs text-stone-950">
                      <div className="flex items-center gap-2 text-stone-600">
                        <Car className="w-4 h-4 text-[#008B85]" />
                        <span><strong className="text-stone-900 font-extrabold">{activeLandmark.distanceKm} km</strong> distance</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#008B85] bg-[#00CFC8]/10 border border-[#00CFC8]/20 px-3 py-1.5 w-fit font-bold">
                        <Clock className="w-3.5 h-3.5 stroke-[2px]" />
                        <span>~{activeLandmark.travelTimeMin} Mins Drive</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Travel Summary Bulletins */}
            <div className="bg-white p-6 rounded-none border border-[#EBEBE6] shadow-sm space-y-4">
              <span className="text-[9px] font-mono text-[#008B85] uppercase tracking-widest block font-bold border-b border-[#EBEBE6] pb-2">
                Rapid High-profile Corridors
              </span>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-[#008B85] font-mono text-xs font-bold mt-0.5">01/</div>
                  <div>
                    <h5 className="text-xs font-sans font-black text-stone-900 uppercase">AKLEH Highway Bypass</h5>
                    <p className="text-[11px] text-stone-750 font-sans leading-relaxed mt-1 font-normal">
                      A direct, elevated toll-road bypass allowing residents to avoid local traffic signals and arrive at Suria KLCC and the Petronas Twin Towers in under 6 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-[#008B85] font-mono text-xs font-bold mt-0.5">02/</div>
                  <div>
                    <h5 className="text-xs font-sans font-black text-stone-900 uppercase">Pedestrian Promenade</h5>
                    <p className="text-[11px] text-stone-750 font-sans leading-relaxed mt-1 font-normal">
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
