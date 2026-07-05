import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import { ArrowUpRight, X } from 'lucide-react';

export default function Gallery() {
  const { settings } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  // Fallback default images, filtered to exclude floorplan layout images and location maps as requested (visual gallery is only for facilities)
  const galleryImages = (settings?.gallery?.images || []).filter(
    (img) => 
      img.category !== 'Suite Floorplans' && 
      img.category !== 'Location' &&
      !img.title.toLowerCase().includes('floorplan') && 
      !img.title.toLowerCase().includes('layout')
  );

  // Extract all unique categories listed in the customizable images
  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category).filter(Boolean)))];

  // Filter images of chosen category
  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const activeImage = galleryImages.find(img => img.id === activeImageId);

  return (
    <section id="gallery" className="py-24 bg-[#FAF9F6] relative overflow-hidden border-b border-editorial-faint">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-3">
            Development Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6 leading-[1.1]">
            Visual Experience Gallery
          </h2>
          <p className="text-base text-[#1A1A1A]/70 font-sans leading-relaxed font-normal">
            Tour our high-end residences, expansive tropical landscapes, and world-class leisure facilities. View actual photos and conceptual sketches.
          </p>
        </div>

        {/* Dynamic Category Filtering Buttons (Editorial Style Tabs) */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {categories.map((category) => {
            const isCur = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase font-bold rounded-none transition-all duration-200 cursor-pointer border ${
                  isCur
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm'
                    : 'bg-transparent text-[#1A1A1A]/60 border-editorial-faint hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Bento-inspired Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, idx) => {
              const displayUrl = transformGoogleDriveUrl(image.url);
              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group relative cursor-pointer overflow-hidden bg-[#F8F7F4] border border-editorial-faint aspect-[4/3] flex flex-col justify-end shadow-none rounded-none"
                  onClick={() => setActiveImageId(image.id)}
                >
                  {/* Photo container */}
                  <div className="absolute inset-0 z-0 bg-[#F8F7F4] overflow-hidden">
                    <img
                      src={displayUrl}
                      alt={image.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter sepia-[0.10] contrast-[1.02]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80`;
                      }}
                    />
                    {/* Soft dark gradient shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
                  </div>

                  {/* Absolute positioning badge */}
                  <div className="absolute top-4 left-4 z-10 bg-[#FAF9F6] border border-editorial-faint text-[#B2946E] text-[9px] font-mono uppercase font-bold px-2.5 py-1 rounded-none shadow-sm">
                    {image.category}
                  </div>

                  {/* Interactive Open Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-white text-[#1A1A1A] w-8 h-8 rounded-none border border-editorial-faint flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-md">
                    <ArrowUpRight className="w-4 h-4 text-[#B2946E]" />
                  </div>

                  {/* Info Panel Text */}
                  <div className="p-5 sm:p-6 z-10 relative text-white">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-white/70 font-bold block mb-1">
                      0{idx + 1} · Showcase
                    </span>
                    <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-white font-bold leading-tight">
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
            <div className="fixed inset-0 z-[200] overflow-hidden flex items-center justify-center p-4">
              {/* Dark Ambient Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveImageId(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
              />

              {/* Lightbox body */}
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-[#F8F7F4] max-w-4xl w-full relative z-10 overflow-hidden border border-editorial-faint shadow-2xl rounded-none"
              >
                {/* Images Container */}
                <div className="relative aspect-[16/10] bg-black flex items-center justify-center overflow-hidden border-b border-editorial-faint">
                  <img
                    src={transformGoogleDriveUrl(activeImage.url)}
                    alt={activeImage.title}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain filter sepia-[0.10] contrast-[1.02]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80`;
                    }}
                  />
                  
                  {/* Floating category */}
                  <span className="absolute top-4 left-4 bg-[#FAF9F6] border border-editorial-faint text-[#B2946E] font-mono text-[9px] uppercase font-bold px-3 py-1.5 rounded-none shadow-sm">
                    {activeImage.category}
                  </span>

                  {/* Absolute exit button */}
                  <button
                    onClick={() => setActiveImageId(null)}
                    className="absolute top-4 right-4 bg-black/75 hover:bg-black text-white p-2 rounded-none border border-white/10 cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Info and Description Strip */}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FAF9F6]">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#B2946E] block mb-1 font-bold">
                      High-Resolution Preview
                    </span>
                    <h4 className="text-lg font-serif text-[#1A1A1A]">
                      {activeImage.title}
                    </h4>
                  </div>
                  <div>
                    {/* Primary callback to call-to-action */}
                    <button
                      onClick={() => {
                        setActiveImageId(null);
                        window.open(`https://wa.me/60126579508?text=${encodeURIComponent(`Hi, I am interested in booking a tour after viewing "${activeImage.title}" in your gallery.`)}`, "_blank");
                      }}
                      className="inline-block bg-[#1A1A1A] hover:bg-[#B2946E] text-white px-6 py-3 text-xs font-mono uppercase tracking-wider rounded-none transition-all cursor-pointer shadow-none"
                    >
                      Book Tour of Suite
                    </button>
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
