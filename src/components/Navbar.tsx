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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#EBEBE6] py-3 shadow-md'
          : 'bg-white/80 backdrop-blur-sm border-b border-stone-200/40 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group relative"
          >
            {/* Subtle glow behind logo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00CFC8]/10 to-[#2AE8D8]/10 rounded-full blur-md opacity-0 group-hover:opacity-65 transition-opacity duration-500"></div>
            <img
              src={drapportLogo}
              alt="D'Rapport Residences Kuala Lumpur Logo"
              className="h-8 sm:h-9.5 w-auto object-contain transition-all duration-300 group-hover:scale-105 relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'amenities', label: 'Amenities' },
              { id: 'layouts', label: 'Suites' },
              { id: 'location', label: 'Location' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'registration', label: 'Contact Us' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[10px] lg:text-xs uppercase tracking-[0.25em] font-black text-stone-600 hover:text-[#008B85] transition-colors duration-300 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#008B85] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Contact Actions */}
          <div className="hidden md:flex items-center gap-5">
            {isAdminSession && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="p-1.5 hover:bg-stone-50 text-stone-500 hover:text-[#008B85] transition-all rounded-none cursor-pointer flex items-center justify-center border border-stone-100 hover:border-stone-200 mr-1"
                title="Open Concierge Customizer"
              >
                <Settings className="w-4 h-4 animate-spin-slow text-[#008B85]" />
              </button>
            )}
            <a
              href={`mailto:${settings.contact.email === 'inquiry@drapportresidences.com' ? 'shyanyeews@gmail.com' : settings.contact.email}`}
              className="text-[11px] font-mono text-stone-600 hover:text-[#008B85] flex items-center gap-1.5 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-[#008B85]" />
              <span>{settings.contact.email}</span>
            </a>
            <button
              id="nav-btn-vip"
              onClick={() => {
                window.open("https://wa.me/60126579508?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20VIP%20Tour%20to%20D'Rapport%20Residences.", "_blank");
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] hover:from-[#2AE8D8] hover:to-[#65FFF5] text-neutral-900 font-sans font-black text-[10px] uppercase tracking-widest rounded-none shadow-sm hover:shadow transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book VIP Tour
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-[#008B85] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-[#EBEBE6] py-6 px-6 shadow-lg"
          >
            <div className="flex flex-col gap-4 text-center font-sans">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'layouts', label: 'Suites' },
                { id: 'location', label: 'Location' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'registration', label: 'Contact Us' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-xs uppercase tracking-[0.2em] font-bold text-stone-600 hover:text-[#008B85] transition-colors py-3 border-b border-stone-100"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-4 mt-4 items-center">
                <a
                  href={`tel:${settings.contact.phone}`}
                  className="text-xs font-mono text-[#008B85] flex items-center gap-2 font-black"
                >
                  <Phone className="w-3.5 h-3.5 text-[#008B85]" />
                  <span>{settings.contact.phone}</span>
                </a>
                <button
                  id="nav-mobile-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open("https://wa.me/60126579508?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20VIP%20Tour%20to%20D'Rapport%20Residences.", "_blank");
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] text-neutral-900 font-sans font-bold hover:from-[#2AE8D8] hover:to-[#65FFF5] uppercase tracking-widest text-[10px] rounded-none transition-colors cursor-pointer shadow-md"
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
