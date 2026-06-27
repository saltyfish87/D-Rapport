/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import { SuiteLayout } from '../types';
import { Info, HelpCircle, ArrowRight, Ruler, Eye, X } from 'lucide-react';

export default function Layouts() {
  const { settings } = useAdmin();
  const SUITE_LAYOUTS = settings.suiteLayouts;
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('layout-a');
  const [viewMode, setViewMode] = useState<'floorplan' | 'blueprint'>('floorplan');
  const [isLayoutEnlarged, setIsLayoutEnlarged] = useState(false);

  const selectedLayout = SUITE_LAYOUTS.find((l) => l.id === selectedLayoutId) || SUITE_LAYOUTS[0];

  return (
    <section id="layouts" className="py-24 bg-[#F5F5F0] border-b border-[#EBEBE6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="text-[#008B85] font-mono text-xs uppercase tracking-[0.3em] block mb-3 font-bold">
              Generous Living Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tighter text-stone-900 mb-6">
              Explore Our Spacious Suites
            </h2>
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] mb-6" />
            <p className="text-base text-stone-600 font-sans font-light leading-relaxed">
              Designed for luxurious city living, our premier suites range from <span className="text-stone-900 font-extrabold">1,100 to 2,238 sq ft</span>, featuring grand high-ceiling layouts perfect for families.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="bg-white border border-[#EBEBE6] p-4.5 rounded-none flex items-center gap-4 w-fit text-left shadow-sm">
              <Info className="w-5 h-5 text-[#008B85] flex-shrink-0" />
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                <span className="text-stone-900 font-extrabold">Developer Special:</span> Ready to move in. Contact us for exclusive direct developer pricing and legal fee waivers.
              </p>
            </div>
          </div>
        </div>

        {/* Outer Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Suite Selection & Information summary (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest block font-extrabold">
                Select Floor Configuration
              </span>
              
              {/* Type selector cards */}
              <div className="flex flex-col gap-3">
                {SUITE_LAYOUTS.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayoutId(layout.id)}
                    className={`p-4.5 text-left border rounded-none transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      selectedLayoutId === layout.id
                        ? 'bg-white border-[#00CFC8] shadow-[0_4px_15px_rgba(0,207,200,0.08)] ring-1 ring-[#00CFC8]/30'
                        : 'bg-white border-[#EBEBE6] hover:border-[#00CFC8]/30 hover:bg-stone-50/50'
                    }`}
                  >
                    <div>
                      <h4 className={`font-sans font-extrabold text-sm ${selectedLayoutId === layout.id ? 'text-[#008B85]' : 'text-stone-900'}`}>
                        {layout.typeName}
                      </h4>
                      <p className="text-stone-700 font-sans font-normal text-xs mt-1">
                        {layout.sizeSqFt.toLocaleString()} sq ft ({layout.sizeSqM} m²) · {layout.bedrooms} Bed · {layout.bathrooms} Bath
                      </p>
                    </div>
                    
                    <span className="text-xs text-stone-900 font-mono font-bold whitespace-nowrap bg-stone-100 px-2.5 py-1 rounded-none border border-stone-200">
                      RM {(layout.startingPriceRM / 1000000).toFixed(2)}M +
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* General Suite Disclaimers */}
            <div className="bg-white p-5 rounded-none border border-[#EBEBE6] space-y-2 text-xs text-stone-800 shadow-sm">
              <h4 className="font-sans font-black uppercase text-[10px] text-stone-800 tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#008B85]" />
                <span>Suite Premium Inclusions</span>
              </h4>
              <p className="font-sans font-normal text-stone-700 leading-relaxed">
                Pre-fitted with premium timber flooring, designer split air-conditioning, central gas lines, and fully modular wet/dry gourmet kitchen setups.
              </p>
            </div>
          </div>

          {/* Right Column: Blueprint Graphics & Room Specifications (7 columns) */}
          <div className="lg:col-span-7 bg-white border border-[#EBEBE6] p-6 sm:p-8 rounded-none relative flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              
              {/* Layout Title Row */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-[#EBEBE6]">
                <div>
                  <h3 className="text-2xl font-sans font-black tracking-tight text-stone-900 mb-1">
                    {selectedLayout.typeName}
                  </h3>
                  <p className="text-[#008B85] font-sans text-xs flex items-center gap-1.5 font-bold">
                    <Ruler className="w-4 h-4" />
                    <span>{selectedLayout.sizeSqFt.toLocaleString()} Sq Ft · ({selectedLayout.sizeSqM} Sq M)</span>
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-3 self-start sm:self-center font-sans">
                  <div className="text-center bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-none">
                    <span className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono">Beds</span>
                    <span className="text-sm font-bold text-stone-900">{selectedLayout.bedrooms}</span>
                  </div>
                  <div className="text-center bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-none">
                    <span className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono">Baths</span>
                    <span className="text-sm font-bold text-stone-900">{selectedLayout.bathrooms}</span>
                  </div>
                  <div className="text-center bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-none">
                    <span className="block text-[9px] text-stone-500 uppercase tracking-widest font-mono">Helper</span>
                    <span className="text-sm font-bold text-[#008B85]">{selectedLayout.utilityOrMaid ? 'YES' : 'NO'}</span>
                  </div>
                </div>
              </div>

              {/* Layout Description */}
              <p className="text-stone-800 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                {selectedLayout.description}
              </p>

              <div className="bg-[#00CFC8]/10 border border-[#00CFC8]/20 p-4 rounded-none flex items-start gap-3">
                <span className="text-[10px] bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] text-neutral-900 font-mono px-2 py-0.5 rounded-none font-black uppercase mt-0.5">
                  USP
                </span>
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#008B85]">
                  {selectedLayout.keyFeature}
                </p>
              </div>

              {/* INTERACTIVE COMPREHENSIVE ARCHITECTURAL SVG FLOOR MOCK */}
              <div className="mt-8">
                {/* Layout View Toggles */}
                <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3 mb-4">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block font-bold">
                    {viewMode === 'floorplan' && selectedLayout.imageUrl
                      ? 'High-Resolution Floorplan Layout'
                      : 'Interactive Architectural Guideline (Draft Drawing)'}
                  </span>
                  
                  {selectedLayout.imageUrl && (
                    <div className="flex gap-1.5 p-0.5 bg-stone-100 border border-stone-200">
                      <button
                        onClick={() => setViewMode('floorplan')}
                        className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          viewMode === 'floorplan'
                            ? 'bg-[#00CFC8] text-neutral-900 font-black'
                            : 'text-stone-600 hover:bg-stone-200/50'
                        }`}
                      >
                        Floorplan Layout
                      </button>
                      <button
                        onClick={() => setViewMode('blueprint')}
                        className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          viewMode === 'blueprint'
                            ? 'bg-[#00CFC8] text-neutral-900 font-black'
                            : 'text-stone-600 hover:bg-stone-200/50'
                        }`}
                      >
                        Draft Guideline
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="relative aspect-video w-full bg-[#0A0A0A] border border-stone-200 rounded-none overflow-hidden flex items-center justify-center p-4">
                  {viewMode === 'floorplan' && selectedLayout.imageUrl ? (
                    <div 
                      onClick={() => setIsLayoutEnlarged(true)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0A0A0A] p-2 cursor-pointer group/layout-img"
                      title="Click to enlarge floorplan layout"
                    >
                      <img
                        src={transformGoogleDriveUrl(selectedLayout.imageUrl)}
                        alt={`${selectedLayout.typeName} Floorplan Layout`}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/layout-img:scale-[1.03] filter brightness-90"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {/* Floating overlay */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-black rounded-none font-bold shadow-sm transition-colors cursor-pointer">
                        <Eye className="w-3.5 h-3.5 text-black stroke-[2px]" />
                        <span>Enlarge Floorplan</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Grid Lines in background */}
                      <div className="absolute inset-0 bg-[#0A0A0A] pointer-events-none" />
                      <div className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />

                      {/* Dynamic blueprint rendering based on layout ID */}
                      <svg viewBox="0 0 400 240" className="w-full h-full text-[#00CFC8] stroke-[#00CFC8]/40 fill-none font-mono">
                        {/* Basic perimeter walls */}
                        <rect x="20" y="20" width="360" height="200" rx="1" className="stroke-white/10" strokeWidth="1" />
                        <rect x="25" y="25" width="350" height="190" rx="0" className="stroke-[#00CFC8]" strokeWidth="2" />
                        
                        {/* Balcony representation on top */}
                        <line x1="25" y1="215" x2="375" y2="215" className="stroke-[#2AE8D8]/50" strokeWidth="3" />
                        <text x="200" y="210" textAnchor="middle" className="fill-[#2AE8D8] text-[9px] tracking-widest uppercase text-center font-bold">
                          Private View Balcony
                        </text>

                        {/* Layout A (1100) Walls */}
                        {selectedLayoutId === 'layout-a' && (
                          <g>
                            {/* Divider bedroom 1 */}
                            <line x1="150" y1="25" x2="150" y2="150" className="stroke-[#00CFC8]" strokeWidth="2" />
                            {/* Divider bedroom 2 */}
                            <line x1="270" y1="25" x2="270" y2="150" className="stroke-[#00CFC8]" strokeWidth="2" />
                            {/* Kitchen Partition */}
                            <line x1="25" y1="120" x2="100" y2="120" className="stroke-[#00CFC8]" strokeWidth="2" />
                            <line x1="100" y1="120" x2="100" y2="150" className="stroke-[#00CFC8]" strokeWidth="2" />

                            {/* Room labels */}
                            <text x="85" y="70" textAnchor="middle" className="fill-white text-[11px] font-bold">LIVING ZONE</text>
                            <text x="210" y="85" textAnchor="middle" className="fill-[#00CFC8] text-[11px] font-bold">MASTER BED</text>
                            <text x="325" y="85" textAnchor="middle" className="fill-white/70 text-[10px]">SUITE 2</text>
                            <text x="60" y="160" textAnchor="middle" className="fill-[#B5B5B5] text-[9px]">GOURMET CULINARY</text>
                            <text x="180" y="180" textAnchor="middle" className="fill-[#B5B5B5] text-[9px]">ENSUITE BATH</text>
                            <text x="310" y="180" textAnchor="middle" className="fill-[#B5B5B5] text-[9px]">BATH 2</text>
                            
                            {/* Door drafts */}
                            <path d="M 120,120 A 30,30 0 0,1 150,150" className="stroke-[#00CFC8]/40" strokeWidth="1" />
                            <path d="M 240,120 A 30,30 0 0,1 270,150" className="stroke-[#00CFC8]/40" strokeWidth="1" />
                          </g>
                        )}

                        {/* Layout B (1610) Walls */}
                        {selectedLayoutId === 'layout-b' && (
                          <g>
                            {/* More Dividers */}
                            <line x1="130" y1="25" x2="130" y2="150" className="stroke-[#00CFC8]" strokeWidth="2" />
                            <line x1="250" y1="25" x2="250" y2="150" className="stroke-[#00CFC8]" strokeWidth="2" />
                            {/* Helper room divider */}
                            <line x1="25" y1="80" x2="80" y2="80" className="stroke-[#00CFC8]" strokeWidth="2" />
                            <line x1="80" y1="25" x2="80" y2="80" className="stroke-[#00CFC8]" strokeWidth="2" />
                            {/* Kitchen divider */}
                            <line x1="130" y1="130" x2="375" y2="130" className="stroke-[#00CFC8]" strokeWidth="2" />

                            {/* Labels */}
                            <text x="190" y="70" textAnchor="middle" className="fill-white text-[11px] font-bold">LIVING & DINING SALON</text>
                            <text x="310" y="85" textAnchor="middle" className="fill-[#00CFC8] text-[11px] font-bold">MASTER SUITE</text>
                            <text x="50" y="55" textAnchor="middle" className="fill-[#B5B5B5] text-[8px]">UTILITY/MAID</text>
                            <text x="80" y="110" textAnchor="middle" className="fill-white/70 text-[9px]">BEDROOM 2</text>
                            <text x="80" y="180" textAnchor="middle" className="fill-white/70 text-[9px]">BEDROOM 3</text>
                            <text x="310" y="180" textAnchor="middle" className="fill-[#B5B5B5] text-[9px]">WET & DRY KITCHEN</text>
                          </g>
                        )}

                        {/* Layout C (1900) Walls */}
                        {selectedLayoutId === 'layout-c' && (
                          <g>
                            {/* Corner Glass front represent */}
                            <path d="M 25 150 L 150 150 L 150 215" className="stroke-[#00CFC8]" strokeWidth="2" />
                            <line x1="210" y1="25" x2="210" y2="140" className="stroke-[#00CFC8]" strokeWidth="2" />
                            <line x1="300" y1="25" x2="300" y2="140" className="stroke-[#00CFC8]" strokeWidth="2" />
                            <line x1="210" y1="140" x2="375" y2="140" className="stroke-[#00CFC8]" strokeWidth="2" />

                            {/* Labels */}
                            <text x="110" y="70" textAnchor="middle" className="fill-white text-[11px] font-bold">GRAND SALON-LOUNGE</text>
                            <text x="260" y="85" textAnchor="middle" className="fill-[#00CFC8] text-[11px] font-bold">MASTER WING</text>
                            <text x="340" y="85" textAnchor="middle" className="fill-white/70 text-[10px]">SUITE 2</text>
                            <text x="70" y="180" textAnchor="middle" className="fill-white/70 text-[10px]">FAMILY/STUDY</text>
                            <text x="290" y="180" textAnchor="middle" className="fill-[#B5B5B5] text-[8px]">WET / DRY CULINARY</text>
                            <text x="180" y="180" textAnchor="middle" className="fill-[#B5B5B5] text-[8px]">POWDER RM</text>
                          </g>
                        )}

                        {/* Layout D (2238) Walls */}
                        {selectedLayoutId === 'layout-d' && (
                          <g>
                            {/* Dual Foyer represent */}
                            <line x1="90" y1="25" x2="90" y2="90" className="stroke-[#00CFC8]" strokeWidth="3" />
                            <line x1="25" y1="90" x2="90" y2="90" className="stroke-[#00CFC8]" strokeWidth="3" />
                            
                            <line x1="230" y1="25" x2="230" y2="140" className="stroke-[#00CFC8]" strokeWidth="2" />
                            <line x1="310" y1="25" x2="310" y2="140" className="stroke-[#00CFC8]" strokeWidth="2" />
                            <line x1="120" y1="140" x2="375" y2="140" className="stroke-[#00CFC8]" strokeWidth="2" />

                            {/* Labels */}
                            <text x="55" y="55" textAnchor="middle" className="fill-[#00CFC8] text-[8px] font-bold">VIP FOYER</text>
                            <text x="160" y="75" textAnchor="middle" className="fill-white text-[11px] font-bold">DOUBLE FAMILY HOUSES</text>
                            <text x="270" y="85" textAnchor="middle" className="fill-[#00CFC8] text-[10px] font-bold">PREMIER SUITE</text>
                            <text x="345" y="85" textAnchor="middle" className="fill-white/70 text-[9px]">SUITE 2</text>
                            <text x="180" y="180" textAnchor="middle" className="fill-[#B5B5B5] text-[8px]">PRIVATE ENTRANCES</text>
                          </g>
                        )}
                      </svg>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* CTAs Row */}
            <div className="mt-8 pt-6 border-t border-[#EBEBE6] flex flex-col sm:flex-row gap-4 items-stretch sm:items-center sm:justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                  Interactive Architectural Preview
                </span>
                <span className="text-sm font-bold text-stone-900">
                  Ready for physical walkthroughs
                </span>
              </div>
              
              <a
                href="#registration"
                className="inline-block bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] hover:from-[#2AE8D8] hover:to-[#65FFF5] text-neutral-900 text-center px-6 py-3.5 font-sans uppercase font-black tracking-widest text-[10px] transition-all shadow-[0_2px_10px_rgba(0,207,200,0.15)] rounded-none cursor-pointer"
              >
                Schedule Private Walkthrough
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Floorplan Enlargement Overlay */}
      <AnimatePresence>
        {isLayoutEnlarged && selectedLayout.imageUrl && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLayoutEnlarged(false)}
              className="absolute inset-0 bg-stone-950/90 backdrop-blur-md cursor-pointer"
            />

            {/* Lightbox Content Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white max-w-5xl w-full relative z-10 overflow-hidden border border-[#EBEBE6] shadow-2xl"
            >
              {/* Image box */}
              <div className="relative aspect-[16/10] bg-stone-50 flex items-center justify-center overflow-hidden border-b border-[#EBEBE6] p-4">
                <img
                  src={transformGoogleDriveUrl(selectedLayout.imageUrl)}
                  alt={`${selectedLayout.typeName} Floorplan Detailed`}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close Button floating */}
                <button
                  onClick={() => setIsLayoutEnlarged(false)}
                  className="absolute top-4 right-4 bg-stone-900 text-white px-3 py-2 font-mono text-[10px] tracking-widest uppercase border border-stone-800 cursor-pointer hover:bg-black transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  <span>Close [ESC]</span>
                </button>
              </div>

              {/* Bottom detailed descriptive drawer */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-stone-50">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#008B85] font-extrabold block mb-1">
                    Direct Builder Blueprint
                  </span>
                  <h4 className="text-lg sm:text-xl font-sans font-black text-stone-900">
                    {selectedLayout.typeName} Specifications
                  </h4>
                </div>
                <div>
                  <a
                    href="#registration"
                    onClick={() => setIsLayoutEnlarged(false)}
                    className="inline-block bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] hover:from-[#2AE8D8] hover:to-[#65FFF5] text-neutral-900 px-6 py-3.5 text-[10px] font-sans uppercase font-black tracking-widest border border-transparent shadow-md transition-all rounded-none"
                  >
                    Request Physical Copy
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
