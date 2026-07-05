/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Building2, Phone, Menu, X, Globe, Mail, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin } from '../context/AdminContext';
import drapportLogo from '../assets/images/drapport_logo_1780681993105.png';

export default function Navbar() {
  const { settings, setIsAdminOpen, isAdminSession } = useAdmin();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 85; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F7F4]/95 backdrop-blur-md border-b border-editorial-faint py-3'
          : 'bg-[#F8F7F4]/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src={drapportLogo}
              alt="Cappella Embassy Kuala Lumpur Logo"
              className="h-7 sm:h-8.5 w-auto object-contain transition-all duration-300 relative z-10 filter grayscale brightness-95 opacity-80 group-hover:opacity-100 group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'amenities', label: 'Key Features' },
              { id: 'location', label: 'Location' },
              { id: 'layouts', label: 'Suites' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'registration', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[10px] font-mono tracking-widest uppercase font-medium text-[#1A1A1A]/70 hover:text-[#B2946E] transition-colors duration-200 cursor-pointer py-1"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Contact Actions */}
          <div className="hidden md:flex items-center gap-6">
            {isAdminSession && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="p-1.5 hover:bg-stone-100 text-stone-500 hover:text-black transition-all rounded-none cursor-pointer flex items-center justify-center border border-[#1A1A1A]/20"
                title="Open Concierge Customizer"
              >
                <Settings className="w-3.5 h-3.5 animate-spin-slow text-[#B2946E]" />
              </button>
            )}
            <a
              href={`mailto:${settings.contact.email === 'inquiry@drapportresidences.com' ? 'shyanyeews@gmail.com' : settings.contact.email}`}
              className="text-[10px] font-mono text-[#1A1A1A]/60 hover:text-[#1A1A1A] tracking-wider uppercase flex items-center gap-1.5 transition-colors font-medium"
            >
              <span>{settings.contact.email}</span>
            </a>
            <button
              id="nav-btn-vip"
              onClick={() => {
                window.open("https://wa.me/60126579508?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20VIP%20Tour%20to%20Cappella%20Embassy.", "_blank");
              }}
              className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#B2946E] text-white font-mono uppercase text-[10px] tracking-wider rounded-none shadow-none transition-all duration-300 cursor-pointer"
            >
              Book VIP Tour
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-colors focus:outline-none rounded-none border border-editorial-faint"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-[#F8F7F4]/98 backdrop-blur-md border-b border-editorial-faint py-4 px-6 shadow-md"
          >
            <div className="flex flex-col gap-3 text-center">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'amenities', label: 'Key Features' },
                { id: 'location', label: 'Location' },
                { id: 'layouts', label: 'Suites' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'registration', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[11px] font-mono tracking-widest uppercase font-medium text-[#1A1A1A]/70 hover:text-[#B2946E] transition-colors py-2.5 border-b border-editorial-faint"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-3 items-center">
                <a
                  href={`tel:${settings.contact.phone}`}
                  className="text-[10px] font-mono text-[#1A1A1A]/60 flex items-center gap-1.5 font-medium uppercase tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B2946E]" />
                  <span>{settings.contact.phone}</span>
                </a>
                <button
                  id="nav-mobile-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open("https://wa.me/60126579508?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20VIP%20Tour%20to%20Cappella%20Embassy.", "_blank");
                  }}
                  className="w-full py-3 bg-[#1A1A1A] hover:bg-[#B2946E] text-white font-mono uppercase text-[10px] tracking-widest rounded-none transition-colors cursor-pointer"
                >
                  Book VIP Tour
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
