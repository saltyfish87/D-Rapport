/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Sparkles, Trees, Eye } from 'lucide-react';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import livingImg from '../assets/images/drapport_living_1780408222565.png';

export default function Overview() {
  const { settings } = useAdmin();
  const rawOverviewImg = settings.overview.imageUrl === 'default' || !settings.overview.imageUrl ? livingImg : settings.overview.imageUrl;
  const overviewImg = transformGoogleDriveUrl(rawOverviewImg);

  return (
    <section id="overview" className="py-24 bg-[#F4F7F6] border-b border-[#EBEBE6] relative overflow-hidden">
      {/* Decorative accent background gradients */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#00CFC8]/3 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-[#2AE8D8]/2 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-dotted-pattern opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-left mb-16 max-w-4xl">
          <span className="text-[#008B85] font-mono text-xs uppercase tracking-[0.3em] block mb-3 font-bold">
            {settings.overview.tagline || "Elite Architectural Vision"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tighter text-stone-900 mb-6 leading-tight">
            {settings.overview.title ? (
              <span>{settings.overview.title}</span>
            ) : (
              <span>Luxury Living. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008B85] to-[#2AE8D8]">Elevated Investment.</span></span>
            )}
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] mb-6" />
          <p className="text-base text-stone-800 font-sans font-normal leading-relaxed max-w-3xl">
            {settings.overview.description || "Own Kuala Lumpur's most prestigious luxury address. D'Rapport Residences fuses grand architecture with elite security and a lush park oasis right in the heart of Embassy Row."}
          </p>
        </div>

        {/* Feature Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Descriptive Specs */}
          <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
            <div className="flex gap-4 bg-white border border-[#EBEBE6] hover:border-[#00CFC8]/30 p-5 transition-all duration-300 group rounded-none shadow-sm">
              <div className="flex-shrink-0">
                <div className="p-2.5 bg-[#F4F7F6] border border-stone-200 group-hover:border-[#00CFC8]/30 rounded-none text-[#008B85] transition-colors shadow-sm">
                  <Trees className="w-4.5 h-4.5" />
                </div>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-sans font-bold text-stone-900 mb-1 group-hover:text-[#008B85] transition-colors">9.12 Acres of Landscape Oasis</h3>
                <p className="text-stone-700 text-xs font-sans font-normal leading-relaxed">
                  Over 60% of the estate is dedicated to beautifully manicured greenery, scenic canopy walks, and calming water features.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white border border-[#EBEBE6] hover:border-[#00CFC8]/30 p-5 transition-all duration-300 group rounded-none shadow-sm">
              <div className="flex-shrink-0">
                <div className="p-2.5 bg-[#F4F7F6] border border-stone-200 group-hover:border-[#00CFC8]/30 rounded-none text-[#008B85] transition-colors shadow-sm">
                  <Shield className="w-4.5 h-4.5" />
                </div>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-sans font-bold text-stone-900 mb-1 group-hover:text-[#008B85] transition-colors">Elite Diplomatic Security</h3>
                <p className="text-stone-700 text-xs font-sans font-normal leading-relaxed">
                  Located in the premier diplomatic district with multi-tier smart card access, 24/7 patrols, and high-coverage CCTV.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white border border-[#EBEBE6] hover:border-[#00CFC8]/30 p-5 transition-all duration-300 group rounded-none shadow-sm">
              <div className="flex-shrink-0">
                <div className="p-2.5 bg-[#F4F7F6] border border-stone-200 group-hover:border-[#00CFC8]/30 rounded-none text-[#008B85] transition-colors shadow-sm">
                  <Eye className="w-4.5 h-4.5" />
                </div>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-sans font-bold text-stone-900 mb-1 group-hover:text-[#008B85] transition-colors">360° Panoramic Sky Frontage</h3>
                <p className="text-stone-700 text-xs font-sans font-normal leading-relaxed">
                  Breathtaking, unobstructed views of the Royal Selangor Golf Club, the central gardens, or the stunning KL skyline.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white border border-[#EBEBE6] hover:border-[#00CFC8]/30 p-5 transition-all duration-300 group rounded-none shadow-sm">
              <div className="flex-shrink-0">
                <div className="p-2.5 bg-[#F4F7F6] border border-stone-200 group-hover:border-[#00CFC8]/30 rounded-none text-[#008B85] transition-colors shadow-sm">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-sans font-bold text-stone-900 mb-1 group-hover:text-[#008B85] transition-colors">Architectural Masterpiece</h3>
                <p className="text-stone-700 text-xs font-sans font-normal leading-relaxed">
                  Crafted with grand 3.2m high ceilings, premium marble tile designs, high-end acoustic proofing, and luxury finishes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Image Frame */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00CFC8]/10 to-[#2AE8D8]/10 rounded-none blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative overflow-hidden border border-[#EBEBE6] transition-colors duration-500 bg-white p-2.5 rounded-none shadow-md">
                <div className="relative overflow-hidden h-[340px] sm:h-[420px]">
                  <img
                    src={overviewImg}
                    alt="D'Rapport Residences Kuala Lumpur interior penthouse living room view"
                    className="w-full h-full object-cover scale-[1.01] hover:scale-[1.04] transition-transform duration-1000 ease-out filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#2AE8D8] font-bold block mb-1">
                      Panoramic Sky Vistas
                    </span>
                    <h4 className="text-white text-base sm:text-xl font-sans font-black tracking-tight">
                      Where Architecture Meets Opportunity.
                    </h4>
                    <p className="text-xs text-stone-300 font-sans font-light mt-1.5 max-w-xl leading-relaxed">
                      Sleek high-clearance glass designs, premium concrete framework, and custom designer finishes throughout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
