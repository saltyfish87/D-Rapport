/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin, transformGoogleDriveUrl } from '../context/AdminContext';
import { SuiteLayout } from '../types';
import { Info, HelpCircle, ArrowRight, DollarSign, Calculator, Ruler, Eye } from 'lucide-react';

export default function Layouts() {
  const { settings } = useAdmin();
  const SUITE_LAYOUTS = settings.suiteLayouts;
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('layout-a');
  const [viewMode, setViewMode] = useState<'floorplan' | 'blueprint'>('floorplan');
  const [isLayoutEnlarged, setIsLayoutEnlarged] = useState(false);
  
  // Mortgage calculator states
  const [downPaymentPct, setDownPaymentPct] = useState<number>(10);
  const [loanTenureYrs, setLoanTenureYrs] = useState<number>(30);
  const [interestRatePct, setInterestRatePct] = useState<number>(3.9);

  const selectedLayout = SUITE_LAYOUTS.find((l) => l.id === selectedLayoutId) || SUITE_LAYOUTS[0];

  // Calculate Loan Details
  const calculateMortgage = (price: number) => {
    const principal = price * (1 - downPaymentPct / 100);
    const monthlyRate = interestRatePct / 100 / 12;
    const totalPayments = loanTenureYrs * 12;
    
    if (monthlyRate === 0) return principal / totalPayments;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                            (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(monthlyPayment);
  };

  const monthlyPayment = calculateMortgage(selectedLayout.startingPriceRM);

  return (
    <section id="layouts" className="py-24 bg-[#FCFCFA] border-b border-[#EBEBE6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 lg:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="text-[#B2946E] font-mono text-xs uppercase tracking-[0.25em] block mb-3 font-semibold">
              Generous Living Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight text-[#1C1C1B] mb-4">
              Explore Our Spacious Suites
            </h2>
            <div className="w-16 h-0.5 bg-[#B2946E]/60 mb-6" />
            <p className="text-sm sm:text-base text-[#2D2D2A] font-sans font-normal leading-relaxed">
              D'Rapport is meticulously crafted for permanent, luxury city living. Our suites offer generous dimensions ranging from <span className="text-[#1C1C1B] font-extrabold">1,100 to 2,238 sq ft</span>, boasting expansive high-ceiling blueprints that comfortably accommodate multi-generational families.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="bg-[#F9F9F6] border border-[#EBEBE6] p-4 rounded-none flex items-center gap-3 w-fit text-left shadow-[0_4px_15px_rgba(28,28,27,0.01)]">
              <Info className="w-5 h-5 text-[#B2946E] flex-shrink-0" />
              <p className="text-xs text-[#2D2D2A] font-sans font-medium leading-relaxed font-bold">
                <span className="text-[#1C1C1B] font-extrabold">Special Opportunity:</span> Ready to move in. Contact us directly for exclusive cashback options and direct legal fee waivers.
              </p>
            </div>
          </div>
        </div>

        {/* Outer Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Suite Selection & Price Analyzer */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-[#82827E] uppercase tracking-widest block font-semibold">
                Select Floor Configuration
              </span>
              
              {/* Type selector cards */}
              <div className="flex flex-col gap-3">
                {SUITE_LAYOUTS.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayoutId(layout.id)}
                    className={`p-5 text-left border rounded-none transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      selectedLayoutId === layout.id
                        ? 'bg-white border-[#B2946E] shadow-[0_8px_30px_rgba(178,148,110,0.08)]'
                        : 'bg-white border-[#EBEBE6] hover:border-[#B2946E]/30 hover:bg-[#F9F9F6]/55'
                    }`}
                  >
                    <div>
                      <h4 className={`font-sans font-bold text-sm ${selectedLayoutId === layout.id ? 'text-[#B2946E]' : 'text-[#1C1C1B]'}`}>
                        {layout.typeName}
                      </h4>
                      <p className="text-[#2D2D2A] font-sans font-semibold text-xs mt-1">
                        {layout.sizeSqFt.toLocaleString()} sq ft ({layout.sizeSqM} m²) · {layout.bedrooms} Bed · {layout.bathrooms} Bath
                      </p>
                    </div>
                    
                    <span className="text-xs text-[#1C1C1B] font-mono font-medium whitespace-nowrap bg-[#F9F9F6] px-2.5 py-1 rounded-none border border-[#EBEBE6]">
                      RM {(layout.startingPriceRM / 1000000).toFixed(2)}M +
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mortgage Calculator Sub-Block */}
            <div className="bg-white border border-[#EBEBE6] p-6 rounded-none space-y-6 shadow-[0_4px_25px_rgba(28,28,27,0.01)]">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-[#B2946E]" />
                <h3 className="font-sans font-bold text-xs text-[#1C1C1B] uppercase tracking-wider">
                  Investment & Mortgage Estimator
                </h3>
              </div>

              <p className="text-xs text-[#2D2D2A] font-sans font-medium leading-relaxed">
                Estimate your monthly commitments based on standard mortgage lending terms in Malaysia:
              </p>

              <div className="space-y-4 font-sans">
                {/* Down Payment pct */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-[#2D2D2A]">Down Payment ({downPaymentPct}%)</span>
                    <span className="text-[#1C1C1B] font-bold">RM {(selectedLayout.startingPriceRM * (downPaymentPct / 100)).toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="w-full h-1 bg-[#F0F0EB] rounded-lg appearance-none cursor-pointer accent-[#B2946E]"
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-[#2D2D2A]">Annual Interest Rate</span>
                    <span className="text-[#1C1C1B] font-bold">{interestRatePct.toFixed(1)}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="2.5"
                    max="6.0"
                    step="0.1"
                    value={interestRatePct}
                    onChange={(e) => setInterestRatePct(Number(e.target.value))}
                    className="w-full h-1 bg-[#F0F0EB] rounded-lg appearance-none cursor-pointer accent-[#B2946E]"
                  />
                </div>

                {/* loan tenure */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-[#2D2D2A]">Loan Tenure</span>
                    <span className="text-[#1C1C1B] font-bold">{loanTenureYrs} Years</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="35"
                    step="5"
                    value={loanTenureYrs}
                    onChange={(e) => setLoanTenureYrs(Number(e.target.value))}
                    className="w-full h-1 bg-[#F0F0EB] rounded-lg appearance-none cursor-pointer accent-[#B2946E]"
                  />
                </div>
              </div>

              {/* Monthly Cost Outcome Highlight */}
              <div className="bg-[#F9F9F6] border border-[#EBEBE6] p-4 rounded-none flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#82827E] block font-semibold">
                    Est. Monthly Payment
                  </span>
                  <span className="text-2xl font-bold font-sans text-[#B2946E]">
                    RM {monthlyPayment.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#82827E] font-mono block">
                    *Excludes maintenance fees
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-[#82827E] block font-semibold">
                    Margin of Finance
                  </span>
                  <span className="text-sm font-bold text-[#1C1C1B]">
                    {100 - downPaymentPct}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Blueprint Graphics & Room Specifications */}
          <div className="lg:col-span-7 bg-white border border-[#EBEBE6] p-6 sm:p-8 rounded-none relative flex flex-col justify-between shadow-[0_12px_40px_rgba(28,28,27,0.02)]">
            <div className="space-y-6">
              
              {/* Layout Title Row */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-[#EBEBE6]">
                <div>
                  <h3 className="text-2xl font-sans font-extrabold text-[#1C1C1B] mb-1">
                    {selectedLayout.typeName}
                  </h3>
                  <p className="text-[#B2946E] font-sans text-xs flex items-center gap-1.5 font-semibold">
                    <Ruler className="w-4 h-4" />
                    <span>{selectedLayout.sizeSqFt.toLocaleString()} Sq Ft · ({selectedLayout.sizeSqM} Sq M)</span>
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-3 self-start sm:self-center font-sans">
                  <div className="text-center bg-[#FCFCFA] border border-[#EBEBE6] px-3 py-1.5 rounded-none">
                    <span className="block text-[9px] text-[#82827E] uppercase tracking-widest font-mono">Beds</span>
                    <span className="text-sm font-semibold text-[#1C1C1B]">{selectedLayout.bedrooms}</span>
                  </div>
                  <div className="text-center bg-[#FCFCFA] border border-[#EBEBE6] px-3 py-1.5 rounded-none">
                    <span className="block text-[9px] text-[#82827E] uppercase tracking-widest font-mono">Baths</span>
                    <span className="text-sm font-semibold text-[#1C1C1B]">{selectedLayout.bathrooms}</span>
                  </div>
                  <div className="text-center bg-[#FCFCFA] border border-[#EBEBE6] px-3 py-1.5 rounded-none">
                    <span className="block text-[9px] text-[#82827E] uppercase tracking-widest font-mono">Helper</span>
                    <span className="text-sm font-semibold text-[#1C1C1B]">{selectedLayout.utilityOrMaid ? 'YES' : 'NO'}</span>
                  </div>
                </div>
              </div>

              {/* Layout Description */}
              <p className="text-[#2D2D2A] text-xs sm:text-sm font-sans font-normal leading-relaxed">
                {selectedLayout.description}
              </p>

              <div className="bg-[#B2946E]/8 border border-[#B2946E]/15 p-3.5 rounded-none flex items-start gap-3">
                <span className="text-[10px] bg-[#B2946E] text-white font-mono px-2 py-0.5 rounded-none font-bold uppercase mt-0.5">
                  USP
                </span>
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#8B6E4A]">
                  {selectedLayout.keyFeature}
                </p>
              </div>

              {/* INTERACTIVE COMPREHENSIVE ARCHITECTURAL SVG FLOOR MOCK */}
              <div className="mt-8">
                {/* Layout View Toggles */}
                <div className="flex items-center justify-between border-b border-[#EBEBE6] pb-3 mb-4">
                  <span className="text-[10px] font-mono text-[#82827E] uppercase tracking-widest block font-semibold">
                    {viewMode === 'floorplan' && selectedLayout.imageUrl
                      ? 'High-Resolution Floorplan Layout'
                      : 'Interactive Architectural Guideline (Draft Drawing)'}
                  </span>
                  
                  {selectedLayout.imageUrl && (
                    <div className="flex gap-1.5 p-0.5 bg-[#F9F9F6] border border-[#EBEBE6]">
                      <button
                        onClick={() => setViewMode('floorplan')}
                        className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          viewMode === 'floorplan'
                            ? 'bg-[#1C1C1B] text-white font-bold'
                            : 'text-[#575754] hover:bg-white'
                        }`}
                      >
                        Floorplan Layout
                      </button>
                      <button
                        onClick={() => setViewMode('blueprint')}
                        className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          viewMode === 'blueprint'
                            ? 'bg-[#1C1C1B] text-white font-bold'
                            : 'text-[#575754] hover:bg-white'
                        }`}
                      >
                        Draft Guideline
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="relative aspect-video w-full bg-[#FCFCFA] border border-[#EBEBE6] rounded-none overflow-hidden flex items-center justify-center p-4">
                  {viewMode === 'floorplan' && selectedLayout.imageUrl ? (
                    <div 
                      onClick={() => setIsLayoutEnlarged(true)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-white p-2 cursor-pointer group/layout-img"
                      title="Click to enlarge floorplan layout"
                    >
                      <img
                        src={transformGoogleDriveUrl(selectedLayout.imageUrl)}
                        alt={`${selectedLayout.typeName} Floorplan Layout`}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/layout-img:scale-[1.03]"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {/* Floating overlay */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-[#EBEBE6] px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#B2946E] rounded-none font-bold shadow-sm group-hover/layout-img:bg-[#1C1C1B] group-hover/layout-img:text-white group-hover/layout-img:border-[#1C1C1B] transition-colors">
                        <Eye className="w-3.5 h-3.5 text-[#B2946E]" />
                        <span>Enlarge Floorplan</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Grid Lines in background */}
                      <div className="absolute inset-0 bg-blue-grid opacity-30 pointer-events-none" />

                      {/* Dynamic blueprint rendering based on layout ID */}
                      <svg viewBox="0 0 400 240" className="w-full h-full text-[#B2946E] stroke-[#B2946E]/40 fill-none font-mono">
                        {/* Basic perimeter walls */}
                        <rect x="20" y="20" width="360" height="200" rx="1" className="stroke-[#EBEBE6]" strokeWidth="1" />
                        <rect x="25" y="25" width="350" height="190" rx="0" className="stroke-[#B2946E]" strokeWidth="2" />
                        
                        {/* Balcony representation on top */}
                        <line x1="25" y1="215" x2="375" y2="215" className="stroke-[#B2946E]/60" strokeWidth="3" />
                        <text x="200" y="210" textAnchor="middle" className="fill-[#8D704E] text-[10px] tracking-widest uppercase text-center font-bold">
                          Private View Balcony
                        </text>

                        {/* Layout A (1100) Walls */}
                        {selectedLayoutId === 'layout-a' && (
                          <g>
                            {/* Divider bedroom 1 */}
                            <line x1="150" y1="25" x2="150" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />
                            {/* Divider bedroom 2 */}
                            <line x1="270" y1="25" x2="270" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />
                            {/* Kitchen Partition */}
                            <line x1="25" y1="120" x2="100" y2="120" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="100" y1="120" x2="100" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />

                            {/* Room labels */}
                            <text x="85" y="70" textAnchor="middle" className="fill-[#1C1C1B] text-[11px] font-bold">LIVING ZONE</text>
                            <text x="210" y="85" textAnchor="middle" className="fill-[#B2946E] text-[11px] font-bold">MASTER BED</text>
                            <text x="325" y="85" textAnchor="middle" className="fill-[#575754] text-[10px]">SUITE 2</text>
                            <text x="60" y="160" textAnchor="middle" className="fill-[#82827E] text-[9px]">GOURMET CULINARY</text>
                            <text x="180" y="180" textAnchor="middle" className="fill-[#82827E] text-[9px]">ENSUITE BATH</text>
                            <text x="310" y="180" textAnchor="middle" className="fill-[#82827E] text-[9px]">BATH 2</text>
                            
                            {/* Door drafts */}
                            <path d="M 120,120 A 30,30 0 0,1 150,150" className="stroke-[#B2946E]/50" strokeWidth="1" />
                            <path d="M 240,120 A 30,30 0 0,1 270,150" className="stroke-[#B2946E]/50" strokeWidth="1" />
                          </g>
                        )}

                        {/* Layout B (1610) Walls */}
                        {selectedLayoutId === 'layout-b' && (
                          <g>
                            {/* More Dividers */}
                            <line x1="130" y1="25" x2="130" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="250" y1="25" x2="250" y2="150" className="stroke-[#B2946E]" strokeWidth="2" />
                            {/* Helper room divider */}
                            <line x1="25" y1="80" x2="80" y2="80" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="80" y1="25" x2="80" y2="80" className="stroke-[#B2946E]" strokeWidth="2" />
                            {/* Kitchen divider */}
                            <line x1="130" y1="130" x2="375" y2="130" className="stroke-[#B2946E]" strokeWidth="2" />

                            {/* Labels */}
                            <text x="190" y="70" textAnchor="middle" className="fill-[#1C1C1B] text-[11px] font-bold">LIVING & DINING SALON</text>
                            <text x="310" y="85" textAnchor="middle" className="fill-[#B2946E] text-[11px] font-bold">MASTER SUITE</text>
                            <text x="50" y="55" textAnchor="middle" className="fill-[#82827E] text-[8px]">UTILITY/MAID</text>
                            <text x="80" y="110" textAnchor="middle" className="fill-[#575754] text-[9px]">BEDROOM 2</text>
                            <text x="80" y="180" textAnchor="middle" className="fill-[#575754] text-[9px]">BEDROOM 3</text>
                            <text x="310" y="180" textAnchor="middle" className="fill-[#82827E] text-[9px]">WET & DRY KITCHEN</text>
                          </g>
                        )}

                        {/* Layout C (1900) Walls */}
                        {selectedLayoutId === 'layout-c' && (
                          <g>
                            {/* Corner Glass front represent */}
                            <path d="M 25 150 L 150 150 L 150 215" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="210" y1="25" x2="210" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="300" y1="25" x2="300" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="210" y1="140" x2="375" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />

                            {/* Labels */}
                            <text x="110" y="70" textAnchor="middle" className="fill-[#1C1C1B] text-[11px] font-bold">GRAND SALON-LOUNGE</text>
                            <text x="260" y="85" textAnchor="middle" className="fill-[#B2946E] text-[11px] font-bold">MASTER WING</text>
                            <text x="340" y="85" textAnchor="middle" className="fill-[#575754] text-[10px]">SUITE 2</text>
                            <text x="70" y="180" textAnchor="middle" className="fill-[#575754] text-[10px]">FAMILY/STUDY</text>
                            <text x="290" y="180" textAnchor="middle" className="fill-[#82827E] text-[8px]">WET / DRY CULINARY</text>
                            <text x="180" y="180" textAnchor="middle" className="fill-[#82827E] text-[8px]">POWDER RM</text>
                          </g>
                        )}

                        {/* Layout D (2238) Walls */}
                        {selectedLayoutId === 'layout-d' && (
                          <g>
                            {/* Dual Foyer represent */}
                            <line x1="90" y1="25" x2="90" y2="90" className="stroke-[#B2946E]" strokeWidth="3" />
                            <line x1="25" y1="90" x2="90" y2="90" className="stroke-[#B2946E]" strokeWidth="3" />
                            
                            <line x1="230" y1="25" x2="230" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="310" y1="25" x2="310" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />
                            <line x1="120" y1="140" x2="375" y2="140" className="stroke-[#B2946E]" strokeWidth="2" />

                            {/* Labels */}
                            <text x="55" y="55" textAnchor="middle" className="fill-[#B2946E] text-[8px] font-bold">VIP FOYER</text>
                            <text x="160" y="75" textAnchor="middle" className="fill-[#1C1C1B] text-[11px] font-bold">DOUBLE FAMILY HOUSES</text>
                            <text x="270" y="85" textAnchor="middle" className="fill-[#B2946E] text-[10px] font-bold">PREMIER SUITE</text>
                            <text x="345" y="85" textAnchor="middle" className="fill-[#575754] text-[9px]">SUITE 2</text>
                            <text x="80" y="180" textAnchor="middle" className="fill-[#575754] text-[9px]">SUITE 3 (DUAL KEY)</text>
                            <text x="230" y="180" textAnchor="middle" className="fill-[#575754] text-[9px]">SUITE 4</text>
                            <text x="325" y="180" textAnchor="middle" className="fill-[#82827E] text-[8px]">DOMESTIC SERVICE</text>
                          </g>
                        )}
                      </svg>
                      
                      {/* Floating badge for actual blueprint lookup */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-[#EBEBE6] px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#B2946E] rounded-none font-bold shadow-sm">
                        <Eye className="w-3.5 h-3.5 text-[#B2946E]" />
                        <span>D’Rapport Concept Floorplan</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Inquire call matching selected layout */}
            <div className="mt-8 pt-6 border-t border-[#EBEBE6] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <p className="text-xs text-[#3B3B38] font-sans font-medium">
                  Ready to view this physical layout in person?
                </p>
                <p className="text-sm font-sans font-bold text-[#1C1C1B] mt-0.5">
                  Private viewings are customizable by layout preference.
                </p>
              </div>
              <button
                id="layout-inquire-action"
                onClick={() => {
                  const messageText = `Hi, I am interested in D'Rapport Residences ${selectedLayout.typeName} (${selectedLayout.sizeSqFt.toLocaleString()} sq ft). Please share more details and layout blueprints with me!`;
                  window.open(`https://wa.me/60126579508?text=${encodeURIComponent(messageText)}`, '_blank');
                }}
                className="px-6 py-3 bg-[#1C1C1B] hover:bg-[#B2946E] text-white font-sans font-semibold text-xs uppercase tracking-widest rounded-none flex items-center justify-center gap-2 transition-transform cursor-pointer"
              >
                <span>Inquire on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Immersive Layout Zoom Modal */}
      <AnimatePresence>
        {isLayoutEnlarged && selectedLayout.imageUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLayoutEnlarged(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Scale card contain-fit */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white border border-[#EBEBE6] w-full max-w-5xl relative z-10 overflow-hidden shadow-2xl flex flex-col rounded-none"
            >
              {/* Image viewport */}
              <div className="relative aspect-[16/10] bg-[#F9F9F6] flex items-center justify-center overflow-hidden border-b border-[#EBEBE6] p-4 sm:p-8">
                <img
                  src={transformGoogleDriveUrl(selectedLayout.imageUrl)}
                  alt={`${selectedLayout.typeName} Floorplan Layout`}
                  className="max-h-full max-w-full object-contain select-none shadow-sm"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating details badge */}
                <span className="absolute top-4 left-4 bg-[#B2946E] text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                  {selectedLayout.typeName} Floorplan ({selectedLayout.sizeSqFt.toLocaleString()} SQ FT)
                </span>

                {/* Exit button */}
                <button
                  onClick={() => setIsLayoutEnlarged(false)}
                  className="absolute top-4 right-4 bg-[#1C1C1B] text-white px-3 py-2 font-mono text-[10px] tracking-widest uppercase border border-transparent hover:bg-[#B2946E] cursor-pointer transition-colors"
                >
                  Close [ESC]
                </button>
              </div>

              {/* Action and description bar */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white text-[#1C1C1B]">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#B2946E] font-bold block mb-1">
                    HIGH-RESOLUTION Blueprints
                  </span>
                  <h4 className="text-lg sm:text-xl font-sans font-extrabold text-[#1C1C1B]">
                    {selectedLayout.typeName} Architectural Layout
                  </h4>
                  <p className="text-xs text-[#575754] font-sans mt-1">
                    {selectedLayout.bedrooms} Bed, {selectedLayout.bathrooms} Bath of spacious low-density premium living.
                  </p>
                </div>
                <div>
                  <a
                    href={`https://wa.me/60126579508?text=${encodeURIComponent(`Hi, I am interested in D'Rapport Residences ${selectedLayout.typeName} (${selectedLayout.sizeSqFt.toLocaleString()} sq ft). Please share more details!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsLayoutEnlarged(false)}
                    className="inline-block bg-[#1C1C1B] hover:bg-[#B2946E] text-white px-5 py-3 transition-all text-[10px] font-mono uppercase tracking-widest font-bold shadow-sm"
                  >
                    Direct Agent chat
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
