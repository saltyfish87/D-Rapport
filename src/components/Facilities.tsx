/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dumbbell,
  Award,
  Target,
  Droplet,
  Compass,
  Tv,
  Mic,
  Trees,
  Smile,
  ShieldCheck,
  Zap,
  Eye
} from 'lucide-react';
import { FACILITIES } from '../data';
import { Facility } from '../types';
import { transformGoogleDriveUrl } from '../context/AdminContext';
import poolImg from '../assets/images/drapport_pool_1780408204662.png';

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  Award,
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
    <section id="amenities" className="py-24 bg-[#F9F9F6] border-b border-[#EBEBE6] relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dotted-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#B2946E] font-mono text-xs uppercase tracking-[0.25em] block mb-3 font-semibold">
            World-Class Club Living
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight text-[#1C1C1B] mb-6">
            A Magnificent 200,000 sq ft Leisure Deck
          </h2>
          <p className="text-sm sm:text-base text-[#2D2D2A] font-sans font-normal leading-relaxed">
            D'Rapport boasts one of the most expansive residential lifestyle decks in Southeast Asia. From private indoor theater lounges and high-performance gymnasium spaces to winding sky forest walks, every single day here feels like an exclusive luxury retreat.
          </p>
        </div>

        {/* Featured Image and Deck Pitch */}
        <div className="relative overflow-hidden mb-20 rounded-none border border-[#EBEBE6] shadow-[0_15px_45px_rgba(28,28,27,0.03)] bg-white group p-2">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div 
              onClick={() => setIsEnlarged(true)}
              className="lg:col-span-7 h-[300px] sm:h-[400px] relative cursor-pointer overflow-hidden group/img-deck bg-[#FCFCFA]"
              title="Click to enlarge high-resolution view"
            >
              <img
                src={transformGoogleDriveUrl("https://lh3.googleusercontent.com/d/1mI3cP2NSlYRDhS5_u7WEuM6aQIS__Fr1") || poolImg}
                alt="D'Rapport Residences Kuala Lumpur spectacular resort pool grounds"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img-deck:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/img-deck:opacity-100">
                <div className="bg-white/95 text-[#1C1C1B] px-4 py-2.5 text-[10px] sm:text-xs font-mono tracking-widest uppercase font-bold shadow-md flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#B2946E]" />
                  <span>Enlarge Leisure Deck</span>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-white lg:block hidden pointer-events-none" />
            </div>
            
            <div className="lg:col-span-5 bg-[#FCFCFA] p-8 sm:p-10 lg:p-12 flex flex-col justify-center border-l border-[#EBEBE6]/60">
              <span className="inline-flex items-center gap-1.5 bg-[#B2946E]/10 border border-[#B2946E]/30 text-[#B2946E] font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-none mb-6 w-fit font-semibold">
                <Zap className="w-3 h-3" />
                Featured Amenity
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#1C1C1B] mb-4">
                The Blue Club Laguna Deck
              </h3>
              <p className="text-[#2D2D2A] text-xs sm:text-sm font-sans font-normal leading-relaxed mb-6">
                Discover resort-style swimming zones featuring custom floating lounge islands, safe shallow water structures for children, warm outdoor therapeutic jacuzzis, and an adjacent glass-walled pavilion hosting wellness lounges and dining options.
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-[#EBEBE6] pt-6 font-sans">
                <div>
                  <span className="block text-[10px] text-[#82827E] uppercase tracking-widest font-mono font-medium">
                    Lap Pool Size
                  </span>
                  <span className="text-lg font-bold text-[#1C1C1B]">50m Olympic</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#82827E] uppercase tracking-widest font-mono font-medium">
                    Total Oasis Capacity
                  </span>
                  <span className="text-lg font-bold text-[#1C1C1B]">3 Active Pools</span>
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
              className={`px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs font-sans uppercase font-bold tracking-widest cursor-pointer border rounded-none transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#1C1C1B] border-[#1C1C1B] text-white shadow-md'
                  : 'bg-white border-[#D6D6D0] text-[#1C1C1B] hover:text-[#B2946E] hover:border-[#B2946E]'
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
                  className="bg-white border border-[#EBEBE6] hover:border-[#B2946E]/50 p-6 sm:p-8 rounded-none group flex flex-col justify-between shadow-[0_4px_25px_rgba(28,28,27,0.01)] hover:shadow-[0_12px_35px_rgba(28,28,27,0.03)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Head Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-[#FCFCFA] border border-[#EBEBE6] group-hover:border-[#B2946E]/50 rounded-none text-[#B2946E] transition-colors duration-300">
                        <CustomIcon className="w-5 h-5" />
                      </div>
                      
                      {fac.highlight && (
                        <span className="text-[10px] font-mono text-[#B2946E] bg-[#B2946E]/8 border border-[#B2946E]/20 px-2 py-0.5 rounded-none uppercase tracking-wider font-semibold">
                          {fac.highlight}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-sans font-bold text-[#1C1C1B] mb-3 group-hover:text-[#B2946E] transition-colors">
                      {fac.name}
                    </h3>
                    <p className="text-[#2D2D2A] text-xs sm:text-sm font-sans font-normal leading-relaxed">
                      {fac.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-8 pt-4 border-t border-[#F0F0EB] text-[10px] font-mono uppercase tracking-widest text-[#3B3B38] font-bold group-hover:text-[#B2946E] transition-colors">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B2946E]" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnlarged(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Immersive high resolution contain-fitted card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#1C1C1B] border border-white/5 w-full max-w-5xl relative z-10 overflow-hidden shadow-2xl flex flex-col rounded-none"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] bg-[#141413] flex items-center justify-center overflow-hidden border-b border-white/5">
                <img
                  src={transformGoogleDriveUrl("https://lh3.googleusercontent.com/d/1mI3cP2NSlYRDhS5_u7WEuM6aQIS__Fr1") || poolImg}
                  alt="D'Rapport Residences Kuala Lumpur spectacular resort pool grounds"
                  className="max-h-full max-w-full object-contain select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating badge */}
                <span className="absolute top-4 left-4 bg-[#B2946E] text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                  High-Resolution Facility Tour
                </span>

                {/* Exit button */}
                <button
                  onClick={() => setIsEnlarged(false)}
                  className="absolute top-4 right-4 bg-black/60 text-white/80 hover:text-white px-3 py-2 font-mono text-[10px] tracking-widest uppercase border border-white/15 cursor-pointer bg-neutral-900/40 hover:bg-neutral-900 transition-colors"
                >
                  Close [ESC]
                </button>
              </div>

              {/* Info Frame */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#141413] text-white">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B2946E] font-bold block mb-1">
                    Featured Leisure Zone
                  </span>
                  <h4 className="text-lg sm:text-xl font-sans font-extrabold">
                    Spectacular Resort Pool & Leisure Deck Grounds
                  </h4>
                </div>
                <div>
                  <a
                    href="https://wa.me/60126579508"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsEnlarged(false)}
                    className="inline-block bg-[#B2946E] hover:bg-white text-white hover:text-[#1C1C1B] px-5 py-3 transition-colors text-[10px] font-mono uppercase tracking-widest font-bold border border-transparent"
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
