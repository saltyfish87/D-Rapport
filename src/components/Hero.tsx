/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import heroImg from '../assets/images/drapport_hero_1780408186865.png';

export default function Hero() {
  const { settings } = useAdmin();

  const handleExplore = () => {
    const element = document.getElementById('overview');
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleInquire = () => {
    window.open("https://wa.me/60126579508?text=Hi%2C%20I'm%20interested%20in%20D'Rapport%20Residences.%20Please%20provide%20more%20details.", "_blank");
  };

  // Determine background image (dynamic URL with local asset fallback)
  const rawBgUrl = settings.hero.imageUrl === 'default' || !settings.hero.imageUrl ? heroImg : settings.hero.imageUrl;
  const bgUrl = transformGoogleDriveUrl(rawBgUrl);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-12 text-white bg-[#0A0A0A]">
      {/* Immersive full-screen background banner image */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={bgUrl}
          alt="D'Rapport Residences Kuala Lumpur elite visual background"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.05] opacity-80 transform scale-[1.02]"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic rich dark and cyan/teal lighting gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-black/30 to-transparent" />
        {/* Soft teal glow backlights */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#00CFC8]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#2AE8D8]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-dotted-pattern opacity-15 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 flex flex-col justify-between min-h-[calc(100vh-7rem)]">
        
        {/* Central Left Content Deck - Optimized and balanced against background */}
        <div className="max-w-4xl space-y-8 my-auto pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-none backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#2AE8D8] animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-extrabold text-[#2AE8D8] font-mono">
              {settings.hero.subtitle || "The Ultimate Sanctuary"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-white leading-[1.05] max-w-5xl"
          >
            {settings.hero.title ? (
              <span>{settings.hero.title}</span>
            ) : (
              <span>Luxury Living in the <span className="text-gradient-teal">Heart of Kuala Lumpur</span></span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-secondary-gray text-base sm:text-xl leading-relaxed max-w-3xl font-light"
          >
            {settings.hero.description || "Own a premium residence minutes from KLCC with exceptional connectivity, refined interiors, and long-term investment potential."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6"
          >
            <button
              id="hero-inquire-btn"
              onClick={handleInquire}
              className="px-10 py-4.5 bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] hover:from-[#2AE8D8] hover:to-[#65FFF5] text-black text-xs uppercase tracking-[0.25em] font-black font-sans rounded-none flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(0,207,200,0.25)] hover:shadow-[0_0_35px_rgba(0,207,200,0.5)] cursor-pointer"
            >
              <span>{settings.hero.buttonPrimaryText || "Book Private Viewing"}</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
            <button
              id="hero-explore-btn"
              onClick={handleExplore}
              className="px-10 py-4.5 border border-white/20 hover:border-[#2AE8D8] hover:bg-[#2AE8D8]/5 text-white hover:text-[#2AE8D8] text-xs uppercase tracking-[0.25em] font-bold font-sans rounded-none flex items-center justify-center gap-2 transition-all duration-300 bg-white/5 backdrop-blur-md cursor-pointer"
            >
              <span>{settings.hero.buttonSecondaryText || "Explore Masterpiece"}</span>
            </button>
          </motion.div>
        </div>

        {/* Feature Tags / Key Metrics Ribbon - Beautiful and airy Glassmorphism */}
        <div className="space-y-6 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#101820]/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-white relative overflow-hidden group hover:border-[#00CFC8]/30 transition-all duration-500"
          >
            {/* Soft gradient border effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00CFC8]/40 to-transparent" />
            
            <div className="transition-transform duration-300 hover:translate-y-[-2px]">
              <span className="block text-[#00CFC8] font-mono text-[9px] uppercase tracking-widest mb-1.5 font-bold">
                {settings.metrics.proximityLabel || "Proximity"}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-sans text-white">{settings.metrics.proximity}</span>
                <span className="text-xs font-sans text-secondary-gray font-light">km to KLCC</span>
              </div>
              <p className="text-[11px] text-secondary-gray font-sans mt-1">
                {settings.metrics.proximityDesc || "Nestled close to city core"}
              </p>
            </div>

            <div className="transition-transform duration-300 hover:translate-y-[-2px]">
              <span className="block text-[#00CFC8] font-mono text-[9px] uppercase tracking-widest mb-1.5 font-bold">
                {settings.metrics.landSprawlLabel || "Grand Estate"}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-sans text-white">{settings.metrics.landSprawl}</span>
                <span className="text-xs font-sans text-secondary-gray font-light">Acres</span>
              </div>
              <p className="text-[11px] text-secondary-gray font-sans mt-1">
                {settings.metrics.landSprawlDesc || "Sizable landscape paradise"}
              </p>
            </div>

            <div className="transition-transform duration-300 hover:translate-y-[-2px]">
              <span className="block text-[#00CFC8] font-mono text-[9px] uppercase tracking-widest mb-1.5 font-bold">
                {settings.metrics.gatherSpaceLabel || "Leisure Hub"}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-sans text-white">{settings.metrics.gatherSpace}</span>
                <span className="text-xs font-sans text-secondary-gray font-light">sq ft</span>
              </div>
              <p className="text-[11px] text-secondary-gray font-sans mt-1">
                {settings.metrics.gatherSpaceDesc || "Resort club amenities layout"}
              </p>
            </div>

            <div className="transition-transform duration-300 hover:translate-y-[-2px]">
              <span className="block text-[#00CFC8] font-mono text-[9px] uppercase tracking-widest mb-1.5 font-bold">
                {settings.metrics.suiteSizesLabel || "Suite Formats"}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black font-sans text-white">{settings.metrics.suiteSizes}</span>
                <span className="text-xs font-sans text-secondary-gray font-light">sq ft</span>
              </div>
              <p className="text-[11px] text-secondary-gray font-sans mt-1">
                {settings.metrics.suiteSizesDesc || "Spacious layouts with balcony"}
              </p>
            </div>
          </motion.div>

          {/* Smooth animated scroll indicator */}
          <div className="flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              onClick={handleExplore}
              className="flex flex-col items-center gap-1 cursor-pointer group text-secondary-gray hover:text-[#2AE8D8] transition-colors"
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.25em]">Scroll to Discover</span>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
