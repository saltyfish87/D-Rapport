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
    <section id="overview" className="py-24 bg-[#FCFCFA] border-b border-[#EBEBE6] relative overflow-hidden">
      {/* Decorative accent background gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#B2946E]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#B2946E]/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-20 max-w-3xl">
          <span className="text-[#B2946E] font-mono text-xs uppercase tracking-[0.2em] block mb-3 font-bold">
            {settings.overview.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight text-[#1C1C1B] mb-6 leading-tight">
            {settings.overview.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#B2946E]/60 mb-6 hidden md:block" />
          <p className="text-sm sm:text-base text-[#2D2D2A] font-sans font-normal leading-relaxed">
            {settings.overview.description}
          </p>
        </div>

        {/* Feature Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Descriptive Specs */}
          <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
            <div className="flex gap-5">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-white border border-[#EBEBE6] rounded-sm text-[#B2946E] shadow-[0_4px_12px_rgba(28,28,27,0.01)]">
                  <Trees className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-[#1C1C1B] mb-2">9.12 Acres of Lush Green Landscaping</h3>
                <p className="text-[#3B3B38] text-xs sm:text-sm font-sans font-normal leading-relaxed">
                  Almost 60% of the entire estate is dedicated to beautifully manicured greenery, scenic forest walks,
                  sensory gardens, and soothing water installations, providing pristine air quality in the city center.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-white border border-[#EBEBE6] rounded-sm text-[#B2946E] shadow-[0_4px_12px_rgba(28,28,27,0.01)]">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-[#1C1C1B] mb-2">Elite Multi-Tier Guarded Security</h3>
                <p className="text-[#3B3B38] text-xs sm:text-sm font-sans font-normal leading-relaxed">
                  Situated in Kuala Lumpur's premier diplomatic district alongside national embassies. Features include strict fenced perimeter access, 24/7 private security patrols, card-activated privacy lifts, and comprehensive CCTV surveillance.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-white border border-[#EBEBE6] rounded-sm text-[#B2946E] shadow-[0_4px_12px_rgba(28,28,27,0.01)]">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-[#1C1C1B] mb-2">360° Unrivalled Panoramic Suites</h3>
                <p className="text-[#3B3B38] text-xs sm:text-sm font-sans font-normal leading-relaxed">
                  Whether overlooking the rolling emerald fairways of the Royal Selangor Golf Club, the serene pool
                  gardens, or the spectacular skyline of central Kuala Lumpur, every residence is crafted for remarkable views.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-white border border-[#EBEBE6] rounded-sm text-[#B2946E] shadow-[0_4px_12px_rgba(28,28,27,0.01)]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-sans font-bold text-[#1C1C1B] mb-2">Elite Developer Partnership</h3>
                <p className="text-[#3B3B38] text-xs sm:text-sm font-sans font-normal leading-relaxed">
                  Brought to life by the renowned Acmar Group. Built using premium quality materials, generous
                  high-ceiling architecture, premium granite and marble flooring, and solid acoustic soundproofing.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Image Frame */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#B2946E]/3 translate-x-2.5 translate-y-2.5 pointer-events-none transition duration-700" />
              
              <div className="relative overflow-hidden border border-[#EBEBE6] shadow-[0_12px_45px_rgba(28,28,27,0.03)] bg-white p-2 rounded-none">
                <div className="relative overflow-hidden h-[350px] sm:h-[450px]">
                  <img
                    src={overviewImg}
                    alt="D'Rapport Residences Kuala Lumpur interior penthouse living room view"
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-[#1C1C1B]/95 via-[#1C1C1B]/60 to-transparent">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C5A880] font-bold block mb-1">
                      Actual Panoramic Vista
                    </span>
                    <h4 className="text-white text-base sm:text-lg font-sans font-bold">
                      Estate Living with Sky High KL Twin Towers Views
                    </h4>
                    <p className="text-xs text-[#EBEBE6] font-sans font-light mt-1 max-w-lg">
                      Expansive open-plan living layout featuring 3.2-meter high ceilings and full-perimeter sun protection tinted glass.
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
