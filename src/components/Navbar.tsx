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
      const topOffset = 80; // height of navbar
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
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(28,28,27,0.03)] border-b border-[#EBEBE6] py-3.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-[#EBEBE6]/40 py-4'
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
              alt="D'Rapport Residences Kuala Lumpur Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-102"
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
              { id: 'register', label: 'Contact Us' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs uppercase tracking-[0.18em] font-bold text-[#2D2D2A] hover:text-[#B2946E] transition-colors duration-200 cursor-pointer"
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
                className="p-1.5 hover:bg-neutral-100 text-[#82827E] hover:text-[#B2946E] transition-all rounded-xs cursor-pointer flex items-center justify-center border border-transparent hover:border-[#EBEBE6] mr-1"
                title="Open Concierge Customizer"
              >
                <Settings className="w-4 h-4 animate-spin-slow" />
              </button>
            )}
            <a
              href={`mailto:${settings.contact.email === 'inquiry@drapportresidences.com' ? 'shyanyeews@gmail.com' : settings.contact.email}`}
              className="text-xs font-mono text-[#575754] hover:text-[#1C1C1B] flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#B2946E]" />
              <span>{settings.contact.email}</span>
            </a>
            <button
              id="nav-btn-vip"
              onClick={() => {
                window.open("https://wa.me/60126579508?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20VIP%20Tour%20to%20D'Rapport%20Residences.", "_blank");
              }}
              className="px-5 py-2.5 bg-[#1C1C1B] hover:bg-[#B2946E] text-white font-sans font-medium text-xs uppercase tracking-widest rounded-none shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book VIP Tour
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1C1B] hover:text-[#B2946E] transition-colors focus:outline-none"
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
            className="md:hidden bg-[#FCFCFA] border-b border-[#EBEBE6] py-6 px-6"
          >
            <div className="flex flex-col gap-4 text-center font-sans">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'layouts', label: 'Suites' },
                { id: 'location', label: 'Location' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'register', label: 'Contact Us' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-xs uppercase tracking-[0.15em] font-bold text-[#1C1C1B] hover:text-[#B2946E] transition-colors py-2 border-b border-[#EBEBE6]"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-4 mt-4 items-center">
                <a
                  href={`tel:${settings.contact.phone}`}
                  className="text-xs font-mono text-[#B2946E] flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{settings.contact.phone}</span>
                </a>
                <button
                  id="nav-mobile-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open("https://wa.me/60126579508?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20VIP%20Tour%20to%20D'Rapport%20Residences.", "_blank");
                  }}
                  className="w-full py-3 bg-[#1C1C1B] text-white font-sans font-medium hover:bg-[#B2946E] uppercase tracking-widest text-xs rounded-none transition-colors cursor-pointer"
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
