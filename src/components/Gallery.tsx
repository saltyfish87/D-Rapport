/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import { Image, Layers, ArrowUpRight, Check } from 'lucide-react';

export default function Gallery() {
  const { settings } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  // Fallback default Unsplash images if settings or gallery images are undefined
  const galleryImages = settings?.gallery?.images || [];

  // Extract all unique categories listed in the customizable images
  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category).filter(Boolean)))];

  // Filter images of chosen category
  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const activeImage = galleryImages.find(img => img.id === activeImageId);

  return (
    <section id="gallery" className="py-24 bg-[#F4F7F6] border-t border-[#EBEBE6] relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00CFC8]/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#008B85] font-mono text-xs uppercase tracking-[0.3em] block mb-3 font-bold">
            Development Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tighter text-stone-900 mb-6 leading-tight">
            Visual Experience Gallery
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] mx-auto mb-6" />
          <p className="text-base text-stone-800 font-sans font-normal leading-relaxed">
            Tour our high-end residences, expansive tropical landscapes, and world-class leisure facilities. View actual photos and conceptual sketches.
          </p>
        </div>

        {/* Dynamic Category Filtering Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-3xl mx-auto">
          {categories.map((category) => {
            const isCur = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-[10px] sm:text-xs font-sans uppercase font-black tracking-widest transition-all duration-300 rounded-none border cursor-pointer ${
                  isCur
                    ? 'bg-[#00CFC8] border-[#00CFC8] text-neutral-900 shadow-[0_2px_8px_rgba(0,207,200,0.2)]'
                    : 'bg-transparent border-stone-200 text-stone-600 hover:text-stone-900 hover:border-[#00CFC8]/40'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Beautiful Bento-inspired Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, idx) => {
              const displayUrl = transformGoogleDriveUrl(image.url);
              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="group relative cursor-pointer overflow-hidden bg-stone-100 border border-stone-200/60 aspect-[4/3] flex flex-col justify-end shadow-sm"
                  onClick={() => setActiveImageId(image.id)}
                >
                  {/* Photo container */}
                  <div className="absolute inset-0 z-0 bg-stone-50 overflow-hidden">
                    <img
                      src={displayUrl}
                      alt={image.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        // Safe image load error display fallback
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80`;
                      }}
                    />
                    {/* Dark gradient shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
                  </div>

                  {/* Absolute positioning badge */}
                  <div className="absolute top-4 left-4 z-10 bg-[#00CFC8] text-black text-[8px] sm:text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 font-black">
                    {image.category}
                  </div>

                  {/* Interactive Open Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-white text-black w-8 h-8 rounded-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-lg">
                    <ArrowUpRight className="w-4 h-4 text-[#00CFC8]" />
                  </div>

                  {/* Info Panel Text */}
                  <div className="p-5 sm:p-6 z-10 relative text-white">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#2AE8D8] font-black block mb-1">
                      0{idx + 1} // Physical Showcase
                    </span>
                    <h3 className="text-sm sm:text-base font-sans font-bold leading-tight group-hover:text-[#2AE8D8] transition-colors">
                      {image.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Lightbox Modal for Immersive Full Screen viewing */}
        <AnimatePresence>
          {activeImageId && activeImage && (
            <div className="fixed inset-0 z-[200] overflow-hidden font-sans flex items-center justify-center p-4">
              {/* Dark Ambient Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveImageId(null)}
                className="absolute inset-0 bg-stone-950/90 backdrop-blur-md cursor-pointer"
              />

              {/* Lightbox body */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-white max-w-5xl w-full relative z-10 overflow-hidden border border-[#EBEBE6] shadow-2xl"
              >
                {/* Images Container */}
                <div className="relative aspect-[16/10] bg-stone-50 flex items-center justify-center overflow-hidden border-b border-[#EBEBE6]">
                  <img
                    src={transformGoogleDriveUrl(activeImage.url)}
                    alt={activeImage.title}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80`;
                    }}
                  />
                  
                  {/* Floating category */}
                  <span className="absolute top-4 left-4 bg-[#00CFC8] text-black font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-black">
                    {activeImage.category}
                  </span>

                  {/* Absolute exit button */}
                  <button
                    onClick={() => setActiveImageId(null)}
                    className="absolute top-4 right-4 bg-stone-900 text-white hover:text-[#00CFC8] px-3 py-2 font-mono text-[10px] tracking-widest uppercase border border-stone-800 cursor-pointer hover:bg-black transition-colors"
                  >
                    Close [ESC]
                  </button>
                </div>

                {/* Info and Description Strip */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-stone-50">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#008B85] font-bold block mb-1">
                      Active High-Resolution Preview / Interactive View
                    </span>
                    <h4 className="text-lg sm:text-xl font-sans font-black text-stone-900 uppercase tracking-wider">
                      {activeImage.title}
                    </h4>
                  </div>
                  <div>
                    {/* Primary callback to call-to-action */}
                    <a
                      href={`https://wa.me/60126579508?text=${encodeURIComponent(`Hi, I am interested in booking a tour after viewing "${activeImage.title}" in your gallery.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveImageId(null)}
                      className="inline-block bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] hover:from-[#2AE8D8] hover:to-[#65FFF5] text-neutral-900 px-6 py-3.5 transition-all text-[10px] font-sans uppercase font-black tracking-widest border border-transparent shadow-lg"
                    >
                      Book Tour of Suite
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
