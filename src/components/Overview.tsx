import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import { COMPLETED_YEAR, TOTAL_ACRES, TOTAL_UNITS, LOW_DENSITY_RATIO, DEV_PARTNER } from '../data';
import { Calendar, Layers, MapPin, ShieldAlert, Award, Grid } from 'lucide-react';

export default function Overview() {
  const { settings } = useAdmin();
  
  // Locate the Facade/Exterior shot image from settings
  const facadeImgObj = settings?.gallery?.images?.find(
    (img) => img.category.toLowerCase() === 'exterior & grounds' || img.id === 'gal-1'
  );
  
  const facadeImgUrl = facadeImgObj 
    ? transformGoogleDriveUrl(facadeImgObj.url) 
    : "https://lh3.googleusercontent.com/d/1Vl3T3BzDlKwmKbW3PM4VXxP27Op-cSlm";

  return (
    <section id="overview" className="py-24 bg-[#FAF9F6] relative overflow-hidden border-b border-editorial-faint">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-3">
            Project Overview
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6 leading-[1.1]">
            The Diplomatic District Sanctuary
          </h2>
          <p className="text-base text-[#1A1A1A]/70 font-sans leading-relaxed font-normal">
            Cappella Embassy fuses majestic architecture, elite biometric security, and a massive 9.12-acre resort park. Nestled in Ampang Hilir's premium Embassy Row enclave, it is designed for absolute privacy and luxury.
          </p>
        </div>

        {/* 2-Column Grid (Image vs. Project Specs) - Image is 8 columns, description is 4 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Giant Facade Image (8 columns) */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            <span className="text-[#1A1A1A]/50 text-[10px] font-mono font-bold tracking-wider uppercase block">
              Grand Entrance Portal & Architectural Facade
            </span>
            <div className="relative overflow-hidden rounded-none bg-[#1C1C1A] p-2 border border-editorial-faint shadow-md">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={facadeImgUrl}
                  alt="Cappella Embassy architectural majesty grand facade entrance"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02] filter sepia-[0.10] contrast-[1.04]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Project Details Summary Grid (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F8F7F4] border border-editorial-faint p-6 sm:p-8 space-y-6">
              <div className="pb-4 border-b border-editorial-faint">
                <h3 className="font-mono uppercase text-xs tracking-widest font-bold text-[#1A1A1A]">
                  Development Specs
                </h3>
              </div>

              {/* Specifications List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint text-[#B2946E] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 font-bold tracking-wider">
                      Developer Partner
                    </span>
                    <span className="text-sm font-serif text-[#1A1A1A]">
                      {DEV_PARTNER}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint text-[#B2946E] shrink-0">
                    <Grid className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 font-bold tracking-wider">
                      Total Estate Sprawl
                    </span>
                    <span className="text-sm font-serif text-[#1A1A1A]">
                      {TOTAL_ACRES}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint text-[#B2946E] shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 font-bold tracking-wider">
                      Low-Density Standard
                    </span>
                    <span className="text-sm font-serif text-[#1A1A1A]">
                      {LOW_DENSITY_RATIO}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint text-[#B2946E] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 font-bold tracking-wider">
                      Residences Layout
                    </span>
                    <span className="text-sm font-serif text-[#1A1A1A]">
                      {TOTAL_UNITS} Private Suites (5 Towers)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#FAF9F6] border border-editorial-faint text-[#B2946E] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono uppercase text-gray-500 font-bold tracking-wider">
                      Completion Year
                    </span>
                    <span className="text-sm font-serif text-[#1A1A1A]">
                      Year {COMPLETED_YEAR} (Ready for Move-In)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-[#B2946E]/20 bg-[#FAF9F6] text-[11px] font-mono tracking-wide text-[#1A1A1A]/60 text-center">
              * Full-height double-corner glass frontal panels on all executive towers.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
