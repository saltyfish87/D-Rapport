import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function Footer() {
  const { settings } = useAdmin();
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8F7F4] font-sans border-t border-editorial-faint text-[#1A1A1A]/60 py-20 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-editorial-faint">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg tracking-tight text-[#1A1A1A] uppercase">
                Cappella Embassy
              </span>
            </div>

            <p className="text-xs text-[#1A1A1A]/60 font-normal leading-relaxed max-w-sm font-sans">
              Discover a low-density, resort-style executive lifestyle block in Kuala Lumpur's elite Embassy district. Set across 9.12 prime acres with world-class facilities and panoramic city views.
            </p>

            {/* Quick specifications stats summary */}
            <div className="grid grid-cols-2 gap-4 text-xs border-t border-editorial-faint pt-6">
              <div>
                <span className="text-[#1A1A1A]/40 block uppercase text-[8px] font-mono tracking-wider font-bold">Developer Partner:</span>
                <span className="text-[#1A1A1A] font-bold font-sans">{settings.contact.developer}</span>
              </div>
              <div>
                <span className="text-[#1A1A1A]/40 block uppercase text-[8px] font-mono tracking-wider font-bold">Licensed Subsidiary:</span>
                <span className="text-[#1A1A1A] font-bold font-sans">{settings.contact.subsidiary}</span>
              </div>
            </div>
          </div>

          {/* Quick Sects */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A] font-bold">
              Development Sections
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              {[
                { id: 'overview', label: 'Ecosystem Overview' },
                { id: 'amenities', label: '200,000 sq ft Club' },
                { id: 'location', label: 'Embassy Row Proximity' },
                { id: 'layouts', label: 'Suite Floorplans' },
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
                  className="hover:text-[#B2946E] text-[#1A1A1A]/70 transition-colors cursor-pointer text-left focus:outline-none font-medium text-xs font-sans"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Address Col */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A] font-bold">
              Sales Gallery Location
            </h4>
            <div className="space-y-4 text-xs">
              <div className="flex gap-3 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#B2946E] mt-0.5 flex-shrink-0" />
                <p className="font-normal text-[#1A1A1A]/70">
                  <span className="text-[#1A1A1A] font-bold font-serif">Cappella Embassy Kuala Lumpur</span> <br />
                  {settings.contact.address}
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <a
                  href={`tel:${settings.contact.phone}`}
                  className="flex items-center gap-2 text-[#1A1A1A]/70 hover:text-[#B2946E] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B2946E]" />
                  <span>{settings.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${settings.contact.email === 'inquiry@drapportresidences.com' ? 'shyanyeews@gmail.com' : settings.contact.email}`}
                  className="flex items-center gap-2 text-[#1A1A1A]/70 hover:text-[#B2946E] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B2946E]" />
                  <span>{settings.contact.email}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Real Estate HDA Disclaimers */}
        <div className="pt-8 text-[10px] text-[#1A1A1A]/40 leading-relaxed font-normal space-y-4 font-sans">
          <p>
            <span className="text-[#1A1A1A]/70 font-semibold uppercase font-mono text-[9px] tracking-wider">Official Regulatory Disclaimer:</span> All architectural structures, pricing calculations, distances, transit times, graphics, layout measurements, furniture sketches, and facilities discussed in this landing page are subject to change without warning in accordance with final builder designs and approvals from relevant regulatory municipal boards under the Housing Development Act (HDA) of Malaysia.
          </p>
          <p>
            All generated 3D visual mock perspectives (including sky high-rise, pool deck, and suite interior perspectives) represent artists&rsquo; conceptual sketches and do not define binding property structures. Interested parties are requested to consult official physical copy brochures and HDA Sale and Purchase Agreements (SPA) before executing commitments.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-editorial-faint text-[10px] text-[#1A1A1A]/50">
            <div>
              &copy; {currentYear} Cappella Embassy. All Rights Reserved. Developer: TSLAW Land (formerly D'Rapport Residences by Acmar Group).
            </div>
            <p className="mt-2">More Kuala Lumpur new launches on <a href="https://www.propertyportal.my/" className="underline">propertyportal.my</a>.</p>
            
            <button
              onClick={handleScrollTop}
              className="flex items-center gap-1 hover:text-[#B2946E] transition-colors uppercase cursor-pointer font-bold text-[9px] tracking-widest font-mono"
            >
              <span>Scroll to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#B2946E]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
