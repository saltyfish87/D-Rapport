import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FACILITIES } from '../data';
import {
  Dumbbell,
  ShieldCheck,
  Eye,
  X,
  Target,
  Droplet,
  Compass,
  Tv,
  Mic,
  Trees,
  Smile
} from 'lucide-react';
import poolImg from '../assets/images/drapport_pool_1780408204662.jpg';
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
    <section id="amenities" className="py-24 bg-[#F8F7F4] relative border-b border-editorial-faint">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-3">
            Elite Leisure & Recreation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6 leading-[1.1]">
            Resort Facilities & Amenities
          </h2>
          <p className="text-base text-[#1A1A1A]/70 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
            Experience Southeast Asia's most expansive residential leisure deck. A 200,000 sq ft private sanctuary hosting premium training hubs, aquatic lagoons, and scenic canopy walks.
          </p>
        </div>

        {/* Featured Image and Deck Pitch */}
        <div className="relative overflow-hidden mb-16 rounded-none border border-editorial-faint bg-[#FAF9F6] p-2 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div 
              onClick={() => setIsEnlarged(true)}
              className="lg:col-span-8 aspect-[16/10] w-full relative cursor-pointer overflow-hidden rounded-none bg-black"
              title="Click to enlarge view"
            >
              <img
                src={transformGoogleDriveUrl("https://lh3.googleusercontent.com/d/1PuuEW6pWUUp_Tt8NchanJL-Xr_XYVNl4") || poolImg}
                alt="Cappella Embassy Kuala Lumpur spectacular resort pool grounds"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02] filter sepia-[0.12] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white text-[#1A1A1A] px-4 py-2 text-[10px] font-mono uppercase tracking-wider rounded-none shadow-md flex items-center gap-1.5 border border-editorial-faint">
                  <Eye className="w-3.5 h-3.5 text-[#B2946E]" />
                  <span>View Full Screen</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 p-4 flex flex-col justify-center">
              <span className="text-[#B2946E] text-[10px] font-mono font-bold tracking-widest uppercase mb-3 block">
                Featured Amenity
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] tracking-tight mb-3">
                The Blue Club Laguna Deck
              </h3>
              <p className="text-[#1A1A1A]/70 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                Resort pool zones featuring floating lounge islands, therapeutic jacuzzis, and an adjacent wellness pavilion hosting elite social spaces.
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-editorial-faint pt-5">
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-[#1A1A1A]/50 font-bold mb-1">
                    Lap Pool Size
                  </span>
                  <span className="text-base font-serif text-[#1A1A1A]">50m Olympic</span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-[#1A1A1A]/50 font-bold mb-1">
                    Pool Zones
                  </span>
                  <span className="text-base font-serif text-[#1A1A1A]">3 Main Basins</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filtering Tabs (Editorial Slate Button) */}
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
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase font-bold rounded-none transition-all duration-200 cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm'
                  : 'bg-transparent text-[#1A1A1A]/60 border-editorial-faint hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
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
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  key={fac.id}
                  className="bg-[#FAF9F6] border border-editorial-faint p-6 sm:p-8 rounded-none group flex flex-col justify-between shadow-none hover:border-[#B2946E] transition-all duration-300"
                >
                  <div>
                    {/* Head Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-2.5 bg-[#F8F7F4] border border-editorial-faint rounded-none text-[#B2946E]">
                        <CustomIcon className="w-4 h-4" />
                      </div>
                      
                      {fac.highlight && (
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#B2946E] bg-[#FAF9F6] border border-[#B2946E]/30 px-2.5 py-0.5 font-bold">
                          {fac.highlight}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs font-mono uppercase tracking-widest font-bold text-[#1A1A1A] mb-2">
                      {fac.name}
                    </h3>
                    <p className="text-[#1A1A1A]/60 text-xs sm:text-sm font-sans leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Unified Minimal Security Notice */}
        <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/50">
          <ShieldCheck className="w-4 h-4 text-[#B2946E]" />
          <span>Note: All facilities require registered smart key credentials for entry</span>
        </div>
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Immersive high resolution contain-fitted card */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#F8F7F4] border border-editorial-faint w-full max-w-4xl relative z-10 overflow-hidden shadow-2xl flex flex-col rounded-none"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] bg-black flex items-center justify-center overflow-hidden border-b border-editorial-faint">
                <img
                  src={transformGoogleDriveUrl("https://lh3.googleusercontent.com/d/1PuuEW6pWUUp_Tt8NchanJL-Xr_XYVNl4") || poolImg}
                  alt="Cappella Embassy Kuala Lumpur spectacular resort pool grounds"
                  className="max-h-full max-w-full object-contain select-none filter sepia-[0.10] contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Exit button */}
                <button
                  onClick={() => setIsEnlarged(false)}
                  className="absolute top-4 right-4 bg-black/75 hover:bg-black text-white p-2 rounded-none cursor-pointer transition-colors border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Info Frame */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FAF9F6] text-[#1A1A1A]">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-[#B2946E] block mb-1">
                    Featured Leisure Zone
                  </span>
                  <h4 className="text-lg sm:text-xl font-serif tracking-tight">
                    Spectacular Resort Pool & Leisure Deck Grounds
                  </h4>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setIsEnlarged(false);
                      window.open("https://wa.me/60126579508", "_blank");
                    }}
                    className="inline-block bg-[#1A1A1A] hover:bg-[#B2946E] text-white px-6 py-3 text-xs font-mono uppercase tracking-wider rounded-none transition-colors cursor-pointer shadow-none"
                  >
                    Inquire via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
