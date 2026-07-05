import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import { Map, ZoomIn, Eye, X, Compass, Dumbbell, Droplet, Trees } from 'lucide-react';

export default function FacilitiesPlan() {
  const { settings } = useAdmin();
  const [isPlanEnlarged, setIsPlanEnlarged] = useState(false);

  // Locate the Facilities Plan image from gallery settings
  const planImgObj = settings?.gallery?.images?.find(
    (img) => img.category.toLowerCase() === 'facilities plan' || img.id === 'gal-2'
  );
  
  const planImgUrl = planImgObj 
    ? transformGoogleDriveUrl(planImgObj.url) 
    : "https://lh3.googleusercontent.com/d/1-oP4vHq6lc0ODSgTxWhs2pGrG3xG64V7";

  return (
    <section id="facilities-plan" className="py-24 bg-[#FAF9F6] relative border-b border-editorial-faint overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-3">
            Elite Leisure Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6 leading-[1.1]">
            Level 2 Private Club Masterplan
          </h2>
          <p className="text-base text-[#1A1A1A]/70 font-sans leading-relaxed font-normal">
            A comprehensive map of our massive <span className="text-[#1A1A1A] font-bold">200,000 sq ft private lifestyle deck</span>. Unrivaled premium amenities engineered on a single podium.
          </p>
        </div>

        {/* 2-Column Grid (Image vs. Description) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Summarized Description & Key Zones (4 columns) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#F8F7F4] border border-editorial-faint p-6 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-editorial-faint">
                <Map className="w-5 h-5 text-[#B2946E]" />
                <h3 className="font-mono uppercase text-xs tracking-widest font-bold text-[#1A1A1A]">
                  Deck Layout Overview
                </h3>
              </div>
              
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                The Level 2 Recreational Podium integrates elite sports arenas, deep water swimming pools, tranquil wellness sanctuaries, and interactive family zones into a singular fluid sanctuary.
              </p>

              {/* Zone mini cards */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint">
                    <Droplet className="w-4 h-4 text-[#B2946E]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">
                      1. Aquatic Oasis
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A]/60 font-sans mt-0.5">
                      Olympic 50m Lap Pool, heated Jacuzzis, water cabanas, and sunbathing decks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint">
                    <Dumbbell className="w-4 h-4 text-[#B2946E]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">
                      2. Athletics Arena
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A]/60 font-sans mt-0.5">
                      11,000 sq ft mega fitness gym, wooden badminton courts, and professional squash hall.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint">
                    <Trees className="w-4 h-4 text-[#B2946E]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">
                      3. Woodland & Trails
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A]/60 font-sans mt-0.5">
                      Lush outdoor elevated canopy walkways, tranquil gardens, and reading alcoves.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint">
                    <Compass className="w-4 h-4 text-[#B2946E]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">
                      4. Social Lounges
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A]/60 font-sans mt-0.5">
                      Soundproof karaoke suites, private cinema room, and grand clubhouse banqueting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-[#B2946E]/20 bg-[#FAF9F6] text-[11px] font-mono tracking-wide text-[#1A1A1A]/60 text-center">
              * Click the plan blueprint on the right to zoom and inspect individual zone numbers.
            </div>
          </div>

          {/* Right Column: Giant Masterplan Image Container (8 columns) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <span className="text-[#1A1A1A]/50 text-[10px] font-mono font-bold tracking-wider uppercase block">
              Level 2 Recreational masterplan / pelan
            </span>

            <div 
              onClick={() => setIsPlanEnlarged(true)}
              className="relative aspect-[1.4/1] w-full bg-[#1C1C1A] border border-editorial-faint rounded-none overflow-hidden flex items-center justify-center p-6 cursor-pointer group shadow-md"
              title="Click to enlarge masterplan"
            >
              {/* Grid backgrounds for architectural blueprint effect */}
              <div className="absolute inset-0 bg-[#121210] pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(rgba(178,148,110,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

              {/* Masterplan Image */}
              <img
                src={planImgUrl}
                alt="Cappella Embassy Level 2 Facilities Masterplan Pelan"
                className="max-h-[92%] max-w-[92%] object-contain transition-transform duration-700 hover:scale-[1.02] filter brightness-[0.95] contrast-[1.02]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Hover indicator overlay */}
              <div className="absolute bottom-5 right-5 flex items-center gap-1.5 bg-white text-[#1A1A1A] px-4 py-2 text-[10px] font-mono uppercase tracking-widest font-bold shadow-lg border border-editorial-faint group-hover:scale-105 transition-transform">
                <ZoomIn className="w-4 h-4 text-[#B2946E]" />
                <span>Zoom & Inspect Masterplan</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox / Enlargement modal overlay */}
      <AnimatePresence>
        {isPlanEnlarged && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlanEnlarged(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#F8F7F4] max-w-5xl w-full relative z-10 overflow-hidden border border-editorial-faint shadow-2xl rounded-none"
            >
              {/* Detailed Masterplan Image viewport */}
              <div className="relative aspect-[1.4/1] bg-[#121210] flex items-center justify-center overflow-hidden border-b border-editorial-faint p-4">
                <img
                  src={planImgUrl}
                  alt="Cappella Embassy Level 2 Facilities Masterplan Pelan Detailed"
                  className="max-h-full max-w-full object-contain filter brightness-[0.98] contrast-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close Button floating */}
                <button
                  onClick={() => setIsPlanEnlarged(false)}
                  className="absolute top-4 right-4 bg-black/85 hover:bg-black text-white p-2.5 rounded-none cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom specification drawer */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FAF9F6]">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-[#B2946E] block mb-1">
                    Direct Architect Plan
                  </span>
                  <h4 className="text-lg font-serif text-[#1A1A1A]">
                    Level 2 Recreation & Amenities Club Deck Map
                  </h4>
                </div>
                <div>
                  <a
                    href="#registration"
                    onClick={() => setIsPlanEnlarged(false)}
                    className="inline-block bg-[#1A1A1A] hover:bg-[#B2946E] text-white px-6 py-3 text-xs font-mono uppercase tracking-wider rounded-none transition-all"
                  >
                    Request Physical Copy & Club Tour
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
