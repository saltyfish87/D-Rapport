/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Building2, Mail, Phone, MapPin, ExternalLink, ArrowUp } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import drapportLogo from '../assets/images/drapport_logo_1780681993105.png';

export default function Footer() {
  const { settings } = useAdmin();
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FCFCFA] font-sans border-t border-[#EBEBE6] text-stone-500 py-20 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-stone-200/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <img
                src={drapportLogo}
                alt="D'Rapport Residences Kuala Lumpur Logo"
                className="h-10 sm:h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-stone-700 font-normal leading-relaxed max-w-sm font-sans">
              Discover a low-density, resort-style executive lifestyle block in Kuala Lumpur's elite Embassy district. Set across 9.12 prime acres with world-class facilities and panoramic city views.
            </p>

            {/* Quick specifications stats summary */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-stone-100 pt-6">
              <div>
                <span className="text-stone-600 block uppercase text-[9px] tracking-wider font-bold">Developer Partner:</span>
                <span className="text-stone-800 font-extrabold">{settings.contact.developer}</span>
              </div>
              <div>
                <span className="text-stone-600 block uppercase text-[9px] tracking-wider font-bold">Licensed Subsidiary:</span>
                <span className="text-stone-800 font-extrabold">{settings.contact.subsidiary}</span>
              </div>
            </div>
          </div>

          {/* Quick Sects */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-stone-900 font-black">
              Development Sections
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              {[
                { id: 'overview', label: 'Ecosystem Overview' },
                { id: 'amenities', label: '200,000 sq ft Club' },
                { id: 'layouts', label: 'Suite Floorplans & Information' },
                { id: 'location', label: 'Embassy Row Proximity' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'registration', label: 'VIP Tour Admission' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    const el = document.getElementById(link.id);
                    if (el) {
                      const offset = 85;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elRect = el.getBoundingClientRect().top;
                      const elPosition = elRect - bodyRect;
                      window.scrollTo({
                        top: elPosition - offset,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="hover:text-[#008B85] text-stone-700 transition-colors cursor-pointer text-left focus:outline-none font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Address Col */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-stone-900 font-black">
              Sales Gallery Location
            </h4>
            <div className="space-y-4 text-xs">
              <div className="flex gap-3 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#008B85] mt-0.5 flex-shrink-0" />
                <p className="font-normal text-stone-700">
                  <span className="text-stone-900 font-black">D&rsquo;Rapport Residences Kuala Lumpur</span> <br />
                  {settings.contact.address}
                </p>
              </div>

              <div className="space-y-1 font-mono text-[11px] pt-2">
                <a
                  href={`tel:${settings.contact.phone}`}
                  className="flex items-center gap-2 text-stone-700 hover:text-[#008B85] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#008B85]" />
                  <span>{settings.contact.phone} (Sales Direct)</span>
                </a>
                <a
                  href={`mailto:${settings.contact.email === 'inquiry@drapportresidences.com' ? 'shyanyeews@gmail.com' : settings.contact.email}`}
                  className="flex items-center gap-2 text-stone-700 hover:text-[#008B85] transition-colors pt-1"
                >
                  <Mail className="w-3.5 h-3.5 text-[#008B85]" />
                  <span>{settings.contact.email}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Real Estate HDA Disclaimers */}
        <div className="pt-8 text-[10px] text-stone-600 leading-relaxed font-normal space-y-4">
          <p>
            <span className="text-stone-750 font-extrabold uppercase">Official Regulatory Disclaimer:</span> All architectural structures, pricing calculations, distances, transit times, graphics, layout measurements, furniture sketches, and facilities discussed in this landing page are subject to change without warning in accordance with final builder designs and approvals from relevant regulatory municipal boards under the Housing Development Act (HDA) of Malaysia.
          </p>
          <p>
            All generated 3D visual mock perspectives (including sky high-rise, pool deck, and suite interior perspectives) represent artists&rsquo; conceptual sketches and do not define binding property structures. Interested parties are requested to consult official physical copy brochures and HDA Sale and Purchase Agreements (SPA) before executing commitments.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-stone-200/80 font-mono text-[10px] text-stone-700">
            <div>
              &copy; {currentYear} D&rsquo;Rapport Residences. All Rights Reserved. Built for ACMAR Group Property Enclave.
            </div>
            
            <button
              onClick={handleScrollTop}
              className="flex items-center gap-1 hover:text-[#008B85] transition-colors uppercase cursor-pointer font-bold text-[9px] tracking-wider"
            >
              <span>Scroll to Elite Roof</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#008B85]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
