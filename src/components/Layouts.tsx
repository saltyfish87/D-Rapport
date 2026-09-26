import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import { Info, HelpCircle, Ruler, Eye, X, AlertTriangle } from 'lucide-react';

export default function Layouts() {
  const { settings } = useAdmin();
  const SUITE_LAYOUTS = settings.suiteLayouts;
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('layout-d1');
  const [viewMode, setViewMode] = useState<'floorplan' | 'blueprint'>('floorplan');
  const [isLayoutEnlarged, setIsLayoutEnlarged] = useState(false);

  const selectedLayout = SUITE_LAYOUTS.find((l) => l.id === selectedLayoutId) || SUITE_LAYOUTS[0];

  // Helper function to extract a unique file ID from Google Drive URLs
  const getDriveFileId = (url: string | null | undefined): string => {
    if (!url) return '';
    const cleaned = url.trim().replace(/^"|"$/g, '');
    const match = cleaned.match(/\/d\/([a-zA-Z0-9_-]+)/) || cleaned.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : cleaned;
  };

  // Helper function to extract type code/identifier from a layout name (e.g., "Type D2" from "Type D2 (The Executive)")
  const extractTypeIdentifier = (typeName: string): string => {
    const match = typeName.match(/Type\s+[A-Z0-9]+/i);
    return match ? match[0] : '';
  };

  // Helper to check if type identifier matches image title (supporting direct and crossover mappings)
  const isTypeMatchedWithTitle = (identifier: string, imageTitle: string): boolean => {
    const idClean = identifier.toLowerCase().replace(/\s+/g, '');
    const titleClean = imageTitle.toLowerCase().replace(/\s+/g, '');
    
    if (titleClean.includes(idClean)) return true;

    // Allowed official crossover pairings for D'Rapport / Cappella Embassy
    const crossovers: Record<string, string[]> = {
      'typea1': ['typed2'],
      'typea2': ['typed1'],
      'typeb': ['typec'],
      'typec': ['typeb'],
      'typed1': ['typea1'],
      'typed2': ['typea2'],
      'typed3': ['typea3']
    };

    const allowed = crossovers[idClean];
    if (allowed) {
      return allowed.some(alt => titleClean.includes(alt));
    }
    return false;
  };

  // Sanity check effect: Logs errors/warnings to the console for any layout image mismatches
  useEffect(() => {
    SUITE_LAYOUTS.forEach((layout) => {
      const identifier = extractTypeIdentifier(layout.typeName);
      if (!identifier || !layout.imageUrl) return;

      const layoutFileId = getDriveFileId(layout.imageUrl);
      const matchingGalleryImage = settings.gallery?.images?.find(
        (img) => getDriveFileId(img.url) === layoutFileId
      );

      if (matchingGalleryImage) {
        const imageTitle = matchingGalleryImage.title;
        const matched = isTypeMatchedWithTitle(identifier, imageTitle);
        
        if (!matched) {
          console.error(
            `[Sanity Check Mismatch] Floor plan image source name "${imageTitle}" does not match the expected type identifier "${identifier}" or its valid crossover equivalents for layout ID "${layout.id}".`
          );
        }
      }
    });
  }, [SUITE_LAYOUTS, settings.gallery?.images]);

  // Helper function to dynamically resolve the correct floorplan image asset from the customizable gallery settings
  const getDynamicImageUrl = (layout: typeof selectedLayout): string => {
    const identifier = extractTypeIdentifier(layout.typeName); // e.g., "Type A1", "Type A2", "Type B", etc.
    if (!identifier) return layout.imageUrl || '';

    // Search the customizable gallery images for a matching Suite Floorplans category image
    const matchingImage = settings.gallery?.images?.find(
      (img) => 
        img.category === 'Suite Floorplans' && 
        isTypeMatchedWithTitle(identifier, img.title)
    );

    return matchingImage ? matchingImage.url : (layout.imageUrl || '');
  };

  // Check mismatch for the currently selected layout for a prominent visual warning
  const currentIdentifier = extractTypeIdentifier(selectedLayout.typeName);
  const currentImageUrl = getDynamicImageUrl(selectedLayout);
  const currentGalleryImage = currentImageUrl ? settings.gallery?.images?.find(
    (img) => getDriveFileId(img.url) === getDriveFileId(currentImageUrl)
  ) : null;

  const isCurrentMismatched = !!(
    currentGalleryImage && 
    currentIdentifier && 
    !isTypeMatchedWithTitle(currentIdentifier, currentGalleryImage.title)
  );

  return (
    <section id="layouts" className="py-24 bg-[#FAF9F6] relative border-b border-editorial-faint">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-3">
              Generous Living Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6 leading-[1.1]">
              Explore Our Spacious Suites
            </h2>
            <p className="text-base text-[#1A1A1A]/70 font-sans leading-relaxed font-normal">
              Designed for luxurious city living, our premier suites range from <span className="text-[#1A1A1A] font-bold">1,108 to 2,260 sq ft</span>, featuring grand high-ceiling layouts perfect for families.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="bg-[#F8F7F4] border border-editorial-faint p-5 rounded-none flex items-center gap-4 w-fit text-left shadow-none">
              <Info className="w-5 h-5 text-[#B2946E] flex-shrink-0" />
              <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
                <span className="text-[#1A1A1A] font-bold">Developer Special:</span> Ready to move in. Contact us for exclusive direct developer pricing and legal fee waivers.
              </p>
            </div>
          </div>
        </div>

        {/* Outer Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Suite Selection & Information summary (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.15em] uppercase block mb-2 font-bold">
                Select Floor Configuration
              </span>
              
              {/* Type selector cards */}
              <div className="flex flex-col gap-3">
                {SUITE_LAYOUTS.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayoutId(layout.id)}
                    className={`p-4 text-left border rounded-none transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      selectedLayoutId === layout.id
                        ? 'bg-[#F8F7F4] border-[#B2946E] shadow-none ring-1 ring-[#B2946E]/10'
                        : 'bg-transparent border-editorial-faint hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                    }`}
                  >
                    <div>
                      <h4 className={`font-mono uppercase text-xs tracking-widest font-bold ${selectedLayoutId === layout.id ? 'text-[#B2946E]' : 'text-[#1A1A1A]'}`}>
                        {layout.typeName}
                      </h4>
                      <p className="text-[#1A1A1A]/60 font-sans text-xs mt-1">
                        {layout.sizeSqFt.toLocaleString()} sq ft ({layout.sizeSqM} m²) · {layout.bedrooms} Bed · {layout.bathrooms} Bath
                      </p>
                    </div>
                    
                    <span className="text-[10px] text-[#1A1A1A] font-mono tracking-wider whitespace-nowrap bg-[#F8F7F4] px-2.5 py-1 rounded-none border border-editorial-faint uppercase font-bold">
                      Price list on request
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* General Suite Disclaimers */}
            <div className="bg-[#F8F7F4] p-5 rounded-none border border-editorial-faint space-y-2 text-xs text-[#1A1A1A]/70">
              <h4 className="font-mono uppercase text-xs tracking-widest font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#B2946E]" />
                <span>Suite Premium Inclusions</span>
              </h4>
              <p className="font-sans leading-relaxed">
                Pre-fitted with premium timber flooring, designer split air-conditioning, central gas lines, and fully modular wet/dry gourmet kitchen setups.
              </p>
            </div>
          </div>

          {/* Right Column: Blueprint Graphics & Room Specifications (8 columns) */}
          <div className="lg:col-span-8 bg-[#FAF9F6] border border-editorial-faint p-6 sm:p-8 rounded-none relative flex flex-col justify-between shadow-none">
            <div className="space-y-6">
              
              {/* Layout Title Row */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-editorial-faint">
                <div>
                  <h3 className="text-xl font-serif text-[#1A1A1A] tracking-tight mb-1">
                    {selectedLayout.typeName}
                  </h3>
                  <p className="text-[#1A1A1A]/60 font-mono text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-wider">
                    <Ruler className="w-4 h-4 text-[#B2946E]" />
                    <span>{selectedLayout.sizeSqFt.toLocaleString()} Sq Ft · ({selectedLayout.sizeSqM} Sq M)</span>
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-3 self-start sm:self-center font-mono">
                  <div className="text-center bg-[#F8F7F4] border border-editorial-faint px-3 py-1.5 rounded-none">
                    <span className="block text-[8px] text-[#1A1A1A]/40 font-bold uppercase tracking-wider">Beds</span>
                    <span className="text-xs font-bold text-[#1A1A1A]">{selectedLayout.bedrooms}</span>
                  </div>
                  <div className="text-center bg-[#F8F7F4] border border-editorial-faint px-3 py-1.5 rounded-none">
                    <span className="block text-[8px] text-[#1A1A1A]/40 font-bold uppercase tracking-wider">Baths</span>
                    <span className="text-xs font-bold text-[#1A1A1A]">{selectedLayout.bathrooms}</span>
                  </div>
                  <div className="text-center bg-[#F8F7F4] border border-editorial-faint px-3 py-1.5 rounded-none">
                    <span className="block text-[8px] text-[#1A1A1A]/40 font-bold uppercase tracking-wider">Helper</span>
                    <span className="text-xs font-bold text-[#1A1A1A]">{selectedLayout.utilityOrMaid ? 'YES' : 'NO'}</span>
                  </div>
                </div>
              </div>

              {/* Layout Description */}
              <p className="text-[#1A1A1A]/70 text-xs sm:text-sm font-sans leading-relaxed">
                {selectedLayout.description}
              </p>

              <div className="bg-[#F8F7F4] border border-editorial-faint p-4 rounded-none flex items-start gap-3">
                <span className="text-[8px] bg-[#1A1A1A] text-white font-mono px-2 py-1 rounded-none font-bold uppercase tracking-wider mt-0.5">
                  USP
                </span>
                <p className="text-xs sm:text-sm font-sans font-medium text-[#1A1A1A]/80">
                  {selectedLayout.keyFeature}
                </p>
              </div>

              {/* Floor Plan Display Card */}
              <div className="mt-8">
                {/* Layout View Toggles */}
                <div className="flex items-center justify-between border-b border-editorial-faint pb-3 mb-4">
                  <span className="text-[#1A1A1A]/60 text-[10px] font-mono font-bold tracking-wider uppercase block">
                    {viewMode === 'floorplan' && getDynamicImageUrl(selectedLayout)
                      ? 'Detailed Floorplan Layout'
                      : 'Architectural Layout Guidelines'}
                  </span>
                  
                  {getDynamicImageUrl(selectedLayout) && (
                    <div className="flex gap-1 p-0.5 bg-[#F8F7F4] border border-editorial-faint rounded-none">
                      <button
                        onClick={() => setViewMode('floorplan')}
                        className={`px-3 py-1 text-[9px] font-mono font-bold tracking-widest uppercase rounded-none transition-all cursor-pointer ${
                          viewMode === 'floorplan'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                        }`}
                      >
                        Floorplan
                      </button>
                      <button
                        onClick={() => setViewMode('blueprint')}
                        className={`px-3 py-1 text-[9px] font-mono font-bold tracking-widest uppercase rounded-none transition-all cursor-pointer ${
                          viewMode === 'blueprint'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                        }`}
                      >
                        Draft Guideline
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="relative aspect-[1.25/1] sm:min-h-[480px] md:min-h-[520px] w-full bg-[#1C1C1A] border border-editorial-faint rounded-none overflow-hidden flex items-center justify-center p-4 shadow-inner">
                  {/* Visual Mismatch Warning */}
                  {isCurrentMismatched && (
                    <div className="absolute top-4 left-4 right-4 z-50 bg-[#1C1C1A]/95 backdrop-blur-md border border-amber-500/40 p-4 shadow-xl flex items-start gap-3 text-left">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold">
                          Asset Mismatch Warning
                        </h5>
                        <p className="text-stone-300 text-xs mt-1 font-sans leading-relaxed">
                          The floor plan configuration <strong>{selectedLayout.typeName}</strong> is linked to an image titled <em className="text-white">"{currentGalleryImage?.title}"</em>. Please verify to prevent wrong descriptions.
                        </p>
                      </div>
                    </div>
                  )}

                  {viewMode === 'floorplan' && getDynamicImageUrl(selectedLayout) ? (
                    <div 
                      onClick={() => setIsLayoutEnlarged(true)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#1C1C1A] p-2 cursor-pointer group/layout-img"
                      title="Click to enlarge view"
                    >
                      <img
                        src={transformGoogleDriveUrl(getDynamicImageUrl(selectedLayout))}
                        alt={`${selectedLayout.typeName} Floorplan Layout`}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-[1.01] filter sepia-[0.10] contrast-[1.02]"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {/* Floating overlay */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white text-[#1A1A1A] px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest font-bold shadow-md rounded-none border border-editorial-faint">
                        <Eye className="w-3.5 h-3.5 text-[#B2946E]" />
                        <span>Enlarge Floorplan</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Grid Lines in background */}
                      <div className="absolute inset-0 bg-[#121210] pointer-events-none" />
                      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(178,148,110,0.12) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                      {/* Dynamic blueprint rendering based on layout ID with Editorial Gold accents */}
                      <svg viewBox="0 0 400 240" className="w-full h-full text-[#B2946E] stroke-[#B2946E]/40 fill-none font-mono">
                        {/* Basic perimeter walls */}
                        <rect x="20" y="20" width="360" height="200" rx="0" className="stroke-white/5" strokeWidth="1" />
                        <rect x="25" y="25" width="350" height="190" rx="0" className="stroke-[#B2946E]" strokeWidth="2" />
                        
                        {/* Balcony representation on top */}
                        <line x1="25" y1="215" x2="375" y2="215" className="stroke-[#B2946E]/60" strokeWidth="3" />
                        <text x="200" y="210" textAnchor="middle" className="fill-[#B2946E] text-[8px] tracking-[0.2em] uppercase font-bold">
                          Private View Balcony
                        </text>

                        {/* Layout D (1108 / 1152) Walls */}
                        {(selectedLayoutId === 'layout-a1' || selectedLayoutId === 'layout-a2') && (
                          <g>
                            <line x1="150" y1="25" x2="150" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="270" y1="25" x2="270" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="25" y1="120" x2="100" y2="120" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="100" y1="120" x2="100" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />

                            <text x="85" y="70" textAnchor="middle" className="fill-white text-[10px] font-bold uppercase tracking-wider">LIVING ZONE</text>
                            <text x="210" y="85" textAnchor="middle" className="fill-[#B2946E] text-[10px] font-bold uppercase tracking-wider">MASTER BED</text>
                            <text x="325" y="85" textAnchor="middle" className="fill-white/60 text-[9px] uppercase">SUITE 2</text>
                            <text x="60" y="160" textAnchor="middle" className="fill-[#FAF9F6]/60 text-[8px] uppercase">GOURMET CULINARY</text>
                            <text x="180" y="180" textAnchor="middle" className="fill-[#FAF9F6]/60 text-[8px] uppercase">ENSUITE BATH</text>
                            <text x="310" y="180" textAnchor="middle" className="fill-[#FAF9F6]/60 text-[8px] uppercase">BATH 2</text>
                            
                            <path d="M 120,120 A 30,30 0 0,1 150,150" className="stroke-[#B2946E]/40" strokeWidth="1" />
                            <path d="M 240,120 A 30,30 0 0,1 270,150" className="stroke-[#B2946E]/40" strokeWidth="1" />
                          </g>
                        )}

                        {/* Layout C (1626) Walls */}
                        {selectedLayoutId === 'layout-b' && (
                          <g>
                            <line x1="130" y1="25" x2="130" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="250" y1="25" x2="250" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="25" y1="80" x2="80" y2="80" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="80" y1="25" x2="80" y2="80" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="130" y1="130" x2="375" y2="130" className="stroke-[#B2946E]" strokeWidth="2" />

                            <text x="190" y="70" textAnchor="middle" className="fill-white text-[10px] font-bold uppercase tracking-wider">LIVING & DINING SALON</text>
                            <text x="310" y="85" textAnchor="middle" className="fill-[#B2946E] text-[10px] font-bold uppercase tracking-wider">MASTER SUITE</text>
                            <text x="50" y="55" textAnchor="middle" className="fill-[#FAF9F6]/60 text-[7px] uppercase">UTILITY/MAID</text>
                            <text x="80" y="110" textAnchor="middle" className="fill-white/60 text-[8px] uppercase">BEDROOM 2</text>
                            <text x="80" y="180" textAnchor="middle" className="fill-white/60 text-[8px] uppercase">BEDROOM 3</text>
                            <text x="310" y="180" textAnchor="middle" className="fill-[#FAF9F6]/60 text-[8px] uppercase">WET & DRY KITCHEN</text>
                          </g>
                        )}

                        {/* Layout B (1927) Walls */}
                        {selectedLayoutId === 'layout-c' && (
                          <g>
                            <path d="M 25 150 L 150 150 L 150 215" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="210" y1="25" x2="210" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="300" y1="25" x2="300" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="210" y1="140" x2="375" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />

                            <text x="110" y="70" textAnchor="middle" className="fill-white text-[10px] font-bold uppercase tracking-wider">GRAND SALON-LOUNGE</text>
                            <text x="260" y="85" textAnchor="middle" className="fill-[#B2946E] text-[10px] font-bold uppercase tracking-wider">MASTER WING</text>
                            <text x="340" y="85" textAnchor="middle" className="fill-white/60 text-[9px] uppercase">SUITE 2</text>
                            <text x="70" y="180" textAnchor="middle" className="fill-white/60 text-[9px] uppercase">FAMILY/STUDY</text>
                            <text x="290" y="180" textAnchor="middle" className="fill-[#FAF9F6]/60 text-[8px] uppercase">WET / DRY CULINARY</text>
                            <text x="180" y="180" textAnchor="middle" className="fill-[#FAF9F6]/60 text-[8px] uppercase">POWDER RM</text>
                          </g>
                        )}

                        {/* Layout A (2238) Walls */}
                        {(selectedLayoutId === 'layout-d1' || selectedLayoutId === 'layout-d2' || selectedLayoutId === 'layout-d3') && (
                          <g>
                            <line x1="90" y1="25" x2="90" y2="90" className="stroke-[#B2946E]" strokeWidth="3" />
                            <line x1="25" y1="90" x2="90" y2="90" className="stroke-[#B2946E]" strokeWidth="3" />
                            
                            <line x1="230" y1="25" x2="230" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="310" y1="25" x2="310" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="120" y1="140" x2="375" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />

                            <text x="55" y="55" textAnchor="middle" className="fill-[#B2946E] text-[7px] font-bold uppercase tracking-wider">VIP FOYER</text>
                            <text x="160" y="75" textAnchor="middle" className="fill-white text-[10px] font-bold uppercase tracking-wider">DOUBLE FAMILY SALON</text>
                            <text x="270" y="85" textAnchor="middle" className="fill-[#B2946E] text-[9px] font-bold uppercase tracking-wider">PREMIER SUITE</text>
                            <text x="345" y="85" textAnchor="middle" className="fill-white/60 text-[8px] uppercase">SUITE 2</text>
                            <text x="180" y="180" textAnchor="middle" className="fill-[#FAF9F6]/60 text-[8px] uppercase">PRIVATE ENTRANCES</text>
                          </g>
                        )}
                      </svg>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* CTAs Row */}
            <div className="mt-8 pt-6 border-t border-editorial-faint flex flex-col sm:flex-row gap-4 items-stretch sm:items-center sm:justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold text-[#1A1A1A]/40 block uppercase tracking-wider">
                  Interactive Architectural Preview
                </span>
                <span className="text-sm font-serif text-[#1A1A1A]">
                  Ready for physical walkthroughs
                </span>
              </div>
              
              <a
                href="#registration"
                className="inline-block bg-[#1A1A1A] hover:bg-[#B2946E] text-white text-center px-6 py-3 font-mono uppercase text-[11px] tracking-wider rounded-none shadow-none cursor-pointer transition-all"
              >
                Schedule Private Walkthrough
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Floorplan Enlargement Overlay */}
      <AnimatePresence>
        {isLayoutEnlarged && getDynamicImageUrl(selectedLayout) && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLayoutEnlarged(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Lightbox Content Body */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#F8F7F4] max-w-4xl w-full relative z-10 overflow-hidden border border-editorial-faint shadow-2xl rounded-none"
            >
              {/* Image box */}
              <div className="relative aspect-[16/10] bg-stone-50 flex items-center justify-center overflow-hidden border-b border-editorial-faint p-4">
                <img
                  src={transformGoogleDriveUrl(getDynamicImageUrl(selectedLayout))}
                  alt={`${selectedLayout.typeName} Floorplan Detailed`}
                  className="max-h-full max-w-full object-contain filter sepia-[0.10] contrast-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close Button floating */}
                <button
                  onClick={() => setIsLayoutEnlarged(false)}
                  className="absolute top-4 right-4 bg-black/75 hover:bg-black text-white p-2 rounded-none cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom detailed descriptive drawer */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FAF9F6]">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-[#B2946E] block mb-1">
                    Direct Builder Blueprint
                  </span>
                  <h4 className="text-lg font-serif text-[#1A1A1A]">
                    {selectedLayout.typeName} Specifications
                  </h4>
                </div>
                <div>
                  <a
                    href="#registration"
                    onClick={() => setIsLayoutEnlarged(false)}
                    className="inline-block bg-[#1A1A1A] hover:bg-[#B2946E] text-white px-6 py-3 text-xs font-mono uppercase tracking-wider rounded-none transition-all"
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
