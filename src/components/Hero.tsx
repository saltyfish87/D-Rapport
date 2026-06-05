/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowRight, MapPin } from 'lucide-react';
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 text-white">
      {/* Immersive full-screen background banner image */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={bgUrl}
          alt="D'Rapport Residences Kuala Lumpur elite visual background"
          className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.02] transform scale-[1.01]"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic rich dark and golden lighting gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1B] via-transparent to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 flex flex-col justify-between min-h-[calc(100vh-6rem)]">
        
        {/* Central Left Content Deck - Optimized and balanced against background */}
        <div className="max-w-3xl space-y-6 text-left my-auto pt-10 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#B2946E]/20 border border-[#B2946E]/40 px-4 py-1.5 rounded-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B2946E] animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#FCFCFA] font-mono">
              {settings.hero.subtitle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] drop-shadow-md"
          >
            {settings.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-neutral-200 text-base sm:text-lg leading-relaxed max-w-2xl font-light drop-shadow-sm"
          >
            {settings.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <button
              id="hero-inquire-btn"
              onClick={handleInquire}
              className="px-8 py-4 bg-[#B2946E] hover:bg-[#C5A880] text-[#1C1C1B] hover:text-[#1C1C1B] text-xs uppercase tracking-[0.18em] font-bold font-sans rounded-none flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <span>{settings.hero.buttonPrimaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-explore-btn"
              onClick={handleExplore}
              className="px-8 py-4 border border-white/35 hover:border-white text-white hover:text-[#B2946E] text-xs uppercase tracking-[0.18em] font-bold font-sans rounded-none flex items-center justify-center gap-2 transition-all duration-300 bg-black/10 backdrop-blur-xs cursor-pointer"
            >
              <span>{settings.hero.buttonSecondaryText}</span>
            </button>
          </motion.div>
        </div>

        {/* Feature Tags / Key Metrics Ribbon - Beautiful and airy Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#161615]/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 mt-12 shadow-[0_4px_30px_rgba(0,0,0,0.3)] text-white"
        >
          <div>
            <span className="block text-[#B2946E] font-mono text-[10px] uppercase tracking-widest mb-1 font-semibold">
              {settings.metrics.proximityLabel}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-white">{settings.metrics.proximity}</span>
              <span className="text-xs font-sans text-neutral-300 font-light">km to KLCC</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
              {settings.metrics.proximityDesc}
            </p>
          </div>

          <div>
            <span className="block text-[#B2946E] font-mono text-[10px] uppercase tracking-widest mb-1 font-semibold">
              {settings.metrics.landSprawlLabel}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-white">{settings.metrics.landSprawl}</span>
              <span className="text-xs font-sans text-neutral-300 font-light">Acres</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
              {settings.metrics.landSprawlDesc}
            </p>
          </div>

          <div>
            <span className="block text-[#B2946E] font-mono text-[10px] uppercase tracking-widest mb-1 font-semibold">
              {settings.metrics.gatherSpaceLabel}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-white">{settings.metrics.gatherSpace}</span>
              <span className="text-xs font-sans text-neutral-300 font-light">sq ft</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
              {settings.metrics.gatherSpaceDesc}
            </p>
          </div>

          <div>
            <span className="block text-[#B2946E] font-mono text-[10px] uppercase tracking-widest mb-1 font-semibold">
              {settings.metrics.suiteSizesLabel}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-white">{settings.metrics.suiteSizes}</span>
              <span className="text-xs font-sans text-neutral-300 font-light">sq ft</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
              {settings.metrics.suiteSizesDesc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
