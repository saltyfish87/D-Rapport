import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NEIGHBORHOOD_LANDMARKS } from '../data';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
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
  const { settings } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'shopping' | 'medical' | 'education' | 'leisure' | 'transit'>('all');
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>('mark-klcc');

  const locationImageObj = settings?.gallery?.images?.find(img => img.category.toLowerCase() === 'location') || settings?.gallery?.images?.find(img => img.id === 'gal-11');
  const locationImgUrl = locationImageObj ? transformGoogleDriveUrl(locationImageObj.url) : "https://lh3.googleusercontent.com/d/1YY_mgXog-4mAJTybU4PrVPt4NU8DsVLu";

  const filteredLandmarks = NEIGHBORHOOD_LANDMARKS.filter(
    (mark) => selectedCategory === 'all' || mark.category === selectedCategory
  );

  const activeLandmark = NEIGHBORHOOD_LANDMARKS.find((m) => m.id === selectedLandmarkId) || NEIGHBORHOOD_LANDMARKS[0];

  return (
    <section id="location" className="py-24 bg-[#F8F7F4] relative overflow-hidden border-b border-editorial-faint">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase block mb-3 font-bold">
            Premium Kuala Lumpur enclave
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6 leading-[1.1]">
            The Prestigious Embassy Row Address
          </h2>
          <p className="text-base text-[#1A1A1A]/70 font-sans leading-relaxed font-normal">
            Located along Jalan Nipah just off Jalan Ampang. A highly secure, exceptionally connected location just moments from premium clinics, elite international academies, and rapid transit.
          </p>
        </div>

        {/* Brand Filterable Grid Layout - Map takes 8 columns, description takes 4 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Large Map & Active Landmark Spotlight (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Enlarged Map Container */}
            <span className="text-[#1A1A1A]/50 text-[10px] font-mono font-bold tracking-wider uppercase block">
              Official Enclave Location Map
            </span>
            <div className="bg-[#FAF9F6] p-2 border border-editorial-faint rounded-none shadow-md">
              <div className="relative overflow-hidden aspect-[1.6/1] w-full bg-white rounded-none border border-editorial-faint">
                <img
                  src={locationImgUrl}
                  alt="Cappella Embassy Premium Enclave Location Map"
                  className="w-full h-full object-cover filter brightness-[0.98] sepia-[0.10] contrast-[1.03] hover:scale-[1.01] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#1A1A1A] text-white font-mono text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-none font-bold border border-[#B2946E]/30 shadow-md">
                  Official Enclave Map
                </div>
              </div>
            </div>

            {/* Landmark Spotlight Row */}
            <div className="bg-[#FAF9F6] border border-editorial-faint p-6 shadow-none rounded-none relative">
              <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase block mb-3 font-bold">
                Landmark Spotlight
              </span>

              <AnimatePresence mode="wait">
                {activeLandmark && (
                  <motion.div
                    key={activeLandmark.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    <div className="md:col-span-7 space-y-2">
                      <h4 className="text-base font-serif text-[#1A1A1A] leading-snug">
                        {activeLandmark.name}
                      </h4>
                      <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed font-normal">
                        {activeLandmark.description}
                      </p>
                    </div>
                    
                    <div className="md:col-span-5 flex md:flex-col gap-2 justify-start md:justify-center items-start border-t md:border-t-0 md:border-l border-editorial-faint pt-4 md:pt-0 md:pl-6 font-mono text-xs">
                      <div className="flex items-center gap-2 text-[#1A1A1A]/60 uppercase text-[9px] tracking-wider font-bold">
                        <Car className="w-4 h-4 text-[#B2946E]" />
                        <span><strong className="text-[#1A1A1A] font-bold">{activeLandmark.distanceKm} km</strong> distance</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#1A1A1A] bg-[#F8F7F4] border border-editorial-faint px-2.5 py-1 w-fit font-bold rounded-none uppercase text-[9px] tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-[#B2946E]" />
                        <span>~{activeLandmark.travelTimeMin} Mins Drive</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Landmark Filters & Compact Lists (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col gap-3">
              <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.15em] uppercase block mb-1 font-bold">
                Filter Places
              </span>

              {/* High-contrast Category Filtering pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'shopping', label: 'Retail' },
                  { id: 'medical', label: 'Medical' },
                  { id: 'education', label: 'School' },
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
                      className={`px-2.5 py-1.5 text-[9px] font-mono tracking-widest uppercase font-bold flex items-center gap-1 rounded-none transition-all duration-200 cursor-pointer border ${
                        isCur
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-transparent text-[#1A1A1A]/60 border-editorial-faint hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{pill.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summarized Landmark List */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredLandmarks.map((mark) => {
                const isSelected = selectedLandmarkId === mark.id;
                return (
                  <button
                    key={mark.id}
                    onClick={() => setSelectedLandmarkId(mark.id)}
                    className={`w-full p-3 border rounded-none text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF9F6] border-[#B2946E] shadow-none ring-1 ring-[#B2946E]/10'
                        : 'bg-transparent border-editorial-faint hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                    }`}
                  >
                    <div className="min-w-0 pr-3">
                      <h4 className={`text-[10px] font-mono uppercase tracking-widest font-bold transition-colors ${isSelected ? 'text-[#B2946E]' : 'text-[#1A1A1A]'}`}>
                        {mark.name}
                      </h4>
                      <p className="text-[10px] text-[#1A1A1A]/50 font-sans mt-0.5 truncate max-w-[160px] font-normal">
                        {mark.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[#1A1A1A] shrink-0">
                      <div className="text-right whitespace-nowrap">
                        <span className={`block text-xs font-mono font-bold ${isSelected ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/80'}`}>
                          {mark.distanceKm} km
                        </span>
                      </div>
                      <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? 'text-[#B2946E] translate-x-0.5' : 'text-[#1A1A1A]/30'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
