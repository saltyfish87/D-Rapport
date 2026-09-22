import { motion } from 'motion/react';
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
    window.open("https://wa.me/60126579508?text=Hi%2C%20I'm%20interested%20in%20Cappella%20Embassy.%20Please%20provide%20more%20details.", "_blank");
  };

  // Determine background image (dynamic URL with local asset fallback)
  const rawBgUrl = settings.hero.imageUrl === 'default' || !settings.hero.imageUrl ? heroImg : settings.hero.imageUrl;
  const bgUrl = transformGoogleDriveUrl(rawBgUrl);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white py-24 sm:py-32">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgUrl}
          alt="Cappella Embassy architectural majesty"
          className="w-full h-full object-cover filter sepia-[0.10] brightness-[0.45] contrast-[1.05] scale-[1.01]"
          referrerPolicy="no-referrer"
        />
        {/* Linear Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center flex flex-col items-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#B2946E] text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase font-bold bg-black/40 backdrop-blur-sm px-4 py-1.5 border border-[#B2946E]/30"
        >
          {settings.hero.subtitle || "Ready for Occupancy · Elite Enclave"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-white text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] drop-shadow-md"
        >
          {settings.hero.title || "Cappella Embassy"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-gray-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal drop-shadow-sm"
        >
          {settings.hero.description || "A prestigious low-density residential masterpiece sitting on 9.12 prime acres of key Embassy Row territory. Just 3.5km from KL City Centre."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 pt-2"
        >
          <button
            id="hero-inquire-btn"
            onClick={handleInquire}
            className="px-8 py-3.5 bg-[#B2946E] hover:bg-white hover:text-black text-white font-mono uppercase text-[11px] tracking-wider rounded-none transition-all duration-300 cursor-pointer shadow-lg border border-[#B2946E]"
          >
            {settings.hero.buttonPrimaryText || "Register for view"}
          </button>
          <button
            id="hero-explore-btn"
            onClick={handleExplore}
            className="px-8 py-3.5 border border-white bg-transparent hover:bg-white hover:text-black text-white font-mono uppercase text-[11px] tracking-wider rounded-none transition-all duration-300 cursor-pointer"
          >
            {settings.hero.buttonSecondaryText || "Explore Development"}
          </button>
        </motion.div>

        {/* Minimal Bottom Indicators */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 w-full max-w-4xl border-t border-white/20 mt-12 sm:mt-16">
          <div className="space-y-1">
            <span className="block text-[#B2946E] text-[9px] font-mono font-bold tracking-widest uppercase">
              {settings.metrics.proximityLabel || "Proximity"}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-light text-white">
              {settings.metrics.proximity} <span className="text-xs font-sans text-gray-300">KM</span>
            </div>
            <p className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">
              {settings.metrics.proximityDesc || "to KL City Centre CBD"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="block text-[#B2946E] text-[9px] font-mono font-bold tracking-widest uppercase">
              {settings.metrics.landSprawlLabel || "Estate Sprawl"}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-light text-white">
              {settings.metrics.landSprawl} <span className="text-xs font-sans text-gray-300">Acres</span>
            </div>
            <p className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">
              {settings.metrics.landSprawlDesc || "Low-density parkland"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="block text-[#B2946E] text-[9px] font-mono font-bold tracking-widest uppercase">
              {settings.metrics.gatherSpaceLabel || "Leisure Deck"}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-light text-white">
              {settings.metrics.gatherSpace} <span className="text-xs font-sans text-gray-300">sq ft</span>
            </div>
            <p className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">
              {settings.metrics.gatherSpaceDesc || "Private club life"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="block text-[#B2946E] text-[9px] font-mono font-bold tracking-widest uppercase">
              {settings.metrics.suiteSizesLabel || "Sizing Options"}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-light text-white">
              {settings.metrics.suiteSizes} <span className="text-xs font-sans text-gray-300">sq ft</span>
            </div>
            <p className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">
              {settings.metrics.suiteSizesDesc || "Lush private balconies"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
