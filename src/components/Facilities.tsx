/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FACILITIES } from '../data';
import {
  Dumbbell,
  ShieldCheck,
  Eye,
  Zap,
  Flame,
  Gamepad2,
  Tv,
  Mic,
  Trees,
  Smile,
  Target,
  Droplet,
  Compass,
  X
} from 'lucide-react';
import poolImg from '../assets/images/drapport_pool_1780408204662.png';
import { transformGoogleDriveUrl } from '../context/AdminContext';

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  Target,
  Droplet,
  Compass,
  Tv,
  Mic,
  Trees,
  Smile
};

export default function Facilities() {
  const [activeTab, setActiveTab] = useState<'all' | 'sports' | 'leisure' | 'wellness' | 'family'>('all');
  const [isEnlarged, setIsEnlarged] = useState(false);

  const filteredFacilities = FACILITIES.filter(
    (fac) => activeTab === 'all' || fac.category === activeTab
  );

  return (
    <section id="amenities" className="py-24 bg-white border-b border-[#EBEBE6] relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dotted-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#00CFC8]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-left max-w-4xl mb-16">
          <span className="text-[#008B85] font-mono text-xs uppercase tracking-[0.3em] block mb-3 font-bold">
            World-Class Club Living
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tighter text-stone-900 mb-6">
            A Spectacular <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008B85] to-[#2AE8D8]">200,000 SQ FT</span> Leisure Deck
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] mb-6" />
          <p className="text-base text-stone-800 font-sans font-normal leading-relaxed max-w-3xl">
            Experience one of Southeast Asia's most expansive residential leisure decks. Enjoy premium amenities, high-performance training spaces, and scenic sky canopy forest walks designed for an elite resort lifestyle.
          </p>
        </div>

        {/* Featured Image and Deck Pitch */}
        <div className="relative overflow-hidden mb-16 rounded-none border border-[#EBEBE6] bg-[#FCFCFA] group p-2.5 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div 
              onClick={() => setIsEnlarged(true)}
              className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9.5] w-full relative cursor-pointer overflow-hidden group/img-deck bg-[#0A0A0A]"
              title="Click to enlarge high-resolution view"
            >
              <img
                src={transformGoogleDriveUrl("https://lh3.googleusercontent.com/d/1mI3cP2NSlYRDhS5_u7WEuM6aQIS__Fr1") || poolImg}
                alt="D'Rapport Residences Kuala Lumpur spectacular resort pool grounds"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/img-deck:scale-[1.04] filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/img-deck:opacity-100">
                <div className="bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] text-neutral-900 px-5 py-3 text-[10px] sm:text-xs font-mono tracking-widest uppercase font-black shadow-lg flex items-center gap-2">
                  <Eye className="w-4 h-4 text-neutral-900 stroke-[3px]" />
                  <span>Enlarge Leisure Deck</span>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#FCFCFA] lg:block hidden pointer-events-none" />
            </div>
            
            <div className="lg:col-span-5 bg-[#FCFCFA] p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#00CFC8]/10 border border-[#00CFC8]/30 text-[#008B85] font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-none mb-5 w-fit font-bold">
                <Zap className="w-3.5 h-3.5" />
                Featured Amenity
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-stone-900 mb-3">
                The Blue Club Laguna Deck
              </h3>
              <p className="text-stone-800 text-xs sm:text-sm font-sans font-normal leading-relaxed mb-5">
                Resort-style swimming zones featuring floating lounge islands, children's water play areas, therapeutic jacuzzis, and an adjacent glass wellness pavilion hosting elite dining and social spaces.
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-[#EBEBE6] pt-5 font-sans">
                <div>
                  <span className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono font-medium mb-1">
                    Lap Pool Size
                  </span>
                  <span className="text-base font-black text-stone-900">50m Olympic</span>
                </div>
                <div>
                  <span className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono font-medium mb-1">
                    Total Oasis Capacity
                  </span>
                  <span className="text-base font-black text-[#008B85]">3 Active Pools</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Facilities' },
            { id: 'sports', label: 'Sports & Active' },
            { id: 'leisure', label: 'Club & Lounges' },
            { id: 'wellness', label: 'Wellness & Sky' },
            { id: 'family', label: 'Greenery & Family' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-[10px] sm:text-xs font-sans uppercase font-bold tracking-[0.2em] cursor-pointer border rounded-none transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] border-transparent text-neutral-900 font-black shadow-[0_2px_8px_rgba(0,207,200,0.2)]'
                  : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-[#00CFC8]/40 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredFacilities.map((fac) => {
              const CustomIcon = IconMap[fac.iconName] || Dumbbell;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={fac.id}
                  className="bg-white border border-[#EBEBE6] hover:border-[#00CFC8]/30 p-6 sm:p-8 rounded-none group flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Head Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-[#FCFCFA] border border-stone-200 group-hover:border-[#00CFC8]/40 rounded-none text-[#008B85] transition-colors duration-300">
                        <CustomIcon className="w-5 h-5" />
                      </div>
                      
                      {fac.highlight && (
                        <span className="text-[9px] font-mono text-[#008B85] bg-[#00CFC8]/10 border border-[#00CFC8]/20 px-2.5 py-0.5 rounded-none uppercase tracking-widest font-bold">
                          {fac.highlight}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-sans font-bold text-stone-900 mb-3 group-hover:text-[#008B85] transition-colors">
                      {fac.name}
                    </h3>
                    <p className="text-stone-700 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                      {fac.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-8 pt-4 border-t border-stone-100 text-[9px] font-mono uppercase tracking-widest text-stone-500 font-bold group-hover:text-[#008B85] transition-colors">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#008B85]" />
                    <span>Exclusive Key Access Only</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Immersive Zoom Lightbox for Leisure Deck */}
      <AnimatePresence>
        {isEnlarged && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnlarged(false)}
              className="absolute inset-0 bg-stone-950/90 backdrop-blur-md cursor-pointer"
            />

            {/* Immersive high resolution contain-fitted card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white border border-[#EBEBE6] w-full max-w-5xl relative z-10 overflow-hidden shadow-2xl flex flex-col rounded-none"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] bg-stone-50 flex items-center justify-center overflow-hidden border-b border-[#EBEBE6]">
                <img
                  src={transformGoogleDriveUrl("https://lh3.googleusercontent.com/d/1mI3cP2NSlYRDhS5_u7WEuM6aQIS__Fr1") || poolImg}
                  alt="D'Rapport Residences Kuala Lumpur spectacular resort pool grounds"
                  className="max-h-full max-w-full object-contain select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating badge */}
                <span className="absolute top-4 left-4 bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] text-black font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                  High-Resolution Facility Tour
                </span>

                {/* Exit button */}
                <button
                  onClick={() => setIsEnlarged(false)}
                  className="absolute top-4 right-4 bg-stone-900 text-white hover:text-[#00CFC8] px-3 py-2 font-mono text-[10px] tracking-widest uppercase border border-stone-800 cursor-pointer hover:bg-black transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  <span>Close [ESC]</span>
                </button>
              </div>

              {/* Info Frame */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-stone-50 text-stone-900">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#008B85] font-bold block mb-1">
                    Featured Leisure Zone
                  </span>
                  <h4 className="text-lg sm:text-2xl font-sans font-black tracking-tight">
                    Spectacular Resort Pool & Leisure Deck Grounds
                  </h4>
                </div>
                <div>
                  <a
                    href="https://wa.me/60126579508"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsEnlarged(false)}
                    className="inline-block bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] hover:from-[#2AE8D8] hover:to-[#65FFF5] text-neutral-900 px-6 py-3.5 transition-colors text-[10px] font-sans uppercase tracking-widest font-black rounded-none shadow-lg"
                  >
                    Inquire via WhatsApp
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
