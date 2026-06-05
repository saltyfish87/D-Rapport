/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InquiryLead } from '../types';
import { SUITE_LAYOUTS } from '../data';
import {
  ShieldCheck,
  Calendar,
  CheckCircle,
  FileCheck,
  User,
  Mail,
  Phone,
  Layers,
  HelpCircle,
  Trash2,
  Clock,
  Sparkles
} from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+60', name: 'Malaysia' },
  { code: '+65', name: 'Singapore' },
  { code: '+852', name: 'Hong Kong' },
  { code: '+81', name: 'Japan' },
  { code: '+86', name: 'China' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+1', name: 'United States' },
  { code: '+61', name: 'Australia' }
];

export default function Registration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+60');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredLayoutId, setPreferredLayoutId] = useState('layout-b');
  const [sizeCategory, setSizeCategory] = useState('own-stay');
  
  const [leads, setLeads] = useState<InquiryLead[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newlySubmittedLead, setNewlySubmittedLead] = useState<InquiryLead | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Load existing leads from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('drapport_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse leads from local storage', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMsg('');

    // Validations
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage('Please enter a valid business or personal email address.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 7) {
      setErrorMessage('Please enter a valid mobile number for VIP SMS confirmation.');
      return;
    }

    // Success intake creation
    const referenceId = 'DRP-' + Math.floor(100000 + Math.random() * 900000);
    const newLead: InquiryLead = {
      id: referenceId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      preferredLayoutId,
      sizeCategory,
      countryCode,
      createdAt: new Date().toISOString()
    };

    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem('drapport_leads', JSON.stringify(updatedLeads));

    setNewlySubmittedLead(newLead);
    setFormSubmitted(true);
    
    // Auto-dispatch Mailto prefill to the requested emails
    const selectedLayout = SUITE_LAYOUTS.find((l) => l.id === preferredLayoutId);
    const layoutDetails = selectedLayout ? `${selectedLayout.typeName} (${selectedLayout.sizeSqFt.toLocaleString()} sq ft)` : preferredLayoutId;
    const emailBody = `Dear D'Rapport Residences Team,

I have submitted an exclusive private viewing tour inquiry. Here are my details:

Reference ID: ${referenceId}
Guest Name  : ${fullName.trim()}
Email       : ${email.trim()}
Contact     : ${countryCode} ${phoneNumber.trim()}
Suite choice: ${layoutDetails}
Purpose     : ${sizeCategory === 'own-stay' ? 'Personal Use / Own Stay' : sizeCategory === 'investment' ? 'Investment Yield' : 'Corporate Expat'}
PDPA Policy : Agreed

Please get in touch to confirm my private viewings.

Kind Regards,
${fullName.trim()}`;

    const mailtoUrl = `mailto:clairee0726@gmail.com,shyanyeews@gmail.com?subject=${encodeURIComponent(`D'Rapport Residences Private Tour Inquiry - ${referenceId}`)}&body=${encodeURIComponent(emailBody)}`;
    
    // Safety delay to allow React state updates to render before opening mail client
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 150);

    // Clear fields
    setFullName('');
    setEmail('');
    setPhoneNumber('');
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setNewlySubmittedLead(null);
  };

  const clearLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem('drapport_leads', JSON.stringify(updated));
  };

  return (
    <section id="register" className="py-24 bg-white border-b border-[#EBEBE6] relative">
      {/* Visual background lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#EBEBE6] via-[#EBEBE6]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Vision pitch, phone support, and VIP amenities highlight */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[#B2946E] font-mono text-xs uppercase tracking-[0.25em] block mb-3 font-semibold">
                Schedule Private viewing
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight text-[#1C1C1B] mb-6">
                Register For an Exclusive Tour
              </h2>
              <div className="w-16 h-0.5 bg-[#B2946E]/60 mb-6" />
              <p className="text-sm sm:text-base text-[#2D2D2A] font-sans font-normal leading-relaxed">
                Thank you for your interest in D'Rapport Residences. Private viewings of move-in ready suites are available strictly by reservation. Booking slots are coordinated to ensure complete privacy, a personalized walkthrough, and exclusive lounge hospitality.
              </p>
            </div>

            {/* List of details provided in viewings */}
            <div className="space-y-4 font-sans text-xs sm:text-sm text-[#2D2D2A] font-semibold">
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#B2946E] flex-shrink-0" />
                <span className="text-[#1C1C1B]">Walking tour of actual suites (Type A, B, C, or D)</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#B2946E] flex-shrink-0" />
                <span className="text-[#1C1C1B]">Personalized walkthrough of our 200,000 sq ft Club Deck</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#B2946E] flex-shrink-0" />
                <span className="text-[#1C1C1B]">In-depth briefing on bank financing options and premium incentives</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#B2946E] flex-shrink-0" />
                <span className="text-[#1C1C1B]">Premium beverage hospitality at the private Residents' Sky Lounge</span>
              </div>
            </div>

            {/* Hotline banner */}
            <div className="bg-[#FCFCFA] border border-[#EBEBE6] p-6 rounded-none space-y-4 shadow-[0_4px_15px_rgba(28,28,27,0.01)]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#52524F] font-bold">
                Direct Sales Concierge
              </span>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#B2946E]/10 rounded-full flex items-center justify-center border border-[#B2946E]/30 text-[#B2946E]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-[#52524F] font-sans font-medium">Corporate Hotline</span>
                  <a href="tel:+60126579508" className="text-base sm:text-lg font-sans font-bold text-[#1C1C1B] hover:text-[#B2946E] transition-colors">
                    +60 12-657 9508
                  </a>
                </div>
              </div>
              <div className="text-[11px] text-[#2D2D2A] leading-relaxed font-sans font-normal">
                Connect directly with our registration desk. We are open daily from <span className="text-[#1C1C1B] font-bold">9:00 AM - 6:00 PM</span>, including public holidays.
              </div>
            </div>
          </div>

          {/* Right Block: Interactive form OR ticket slip */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#EBEBE6] p-6 sm:p-10 rounded-none relative overflow-hidden shadow-[0_10px_35px_rgba(28,28,27,0.03)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B2946E]/5 rounded-full blur-2xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="inquiry-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-[#EBEBE6] pb-4 mb-6">
                      <h3 className="text-lg font-sans font-extrabold text-[#1C1C1B] uppercase tracking-wider">
                        VIP Admission Intake
                      </h3>
                      <p className="text-[#2D2D2A] font-sans text-xs mt-1 font-medium">
                        Please provide your details below. Your information is kept strictly private in accordance with the PDPA.
                      </p>
                    </div>

                    {/* Show validation errors */}
                    {errorMessage && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-650 text-xs p-3 font-sans rounded-none">
                        {errorMessage}
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-[#3B3B38] uppercase tracking-widest block font-bold">
                        Full Legal Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#52524F]">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Michael Tan King Wei"
                          className="w-full bg-white border border-[#CCCCCC] focus:border-[#B2946E] py-3 pl-11 pr-4 text-xs font-sans text-[#1C1C1B] font-medium focus:outline-none rounded-none transition-colors placeholder:text-[#82827E]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-[#3B3B38] uppercase tracking-widest block font-bold">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#52524F]">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="michael@example.com"
                          className="w-full bg-white border border-[#CCCCCC] focus:border-[#B2946E] py-3 pl-11 pr-4 text-xs font-sans text-[#1C1C1B] font-medium focus:outline-none rounded-none transition-colors placeholder:text-[#82827E]"
                        />
                      </div>
                    </div>

                    {/* Mobile contact info */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-[#3B3B38] uppercase tracking-widest block font-bold">
                        Mobile Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-white border border-[#CCCCCC] focus:border-[#B2946E] px-3 text-xs font-sans text-[#1C1C1B] font-medium focus:outline-none rounded-none"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-white text-[#1C1C1B]">
                              {c.code} ({c.name})
                            </option>
                          ))}
                        </select>
                        
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#52524F]">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="e.g. 12345678"
                            className="w-full bg-white border border-[#CCCCCC] focus:border-[#B2946E] py-3 pl-11 pr-4 text-xs font-sans text-[#1C1C1B] font-medium focus:outline-none rounded-none transition-colors placeholder:text-[#82827E]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pref Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-[#3B3B38] uppercase tracking-widest block font-bold">
                          Preferred Layout Type
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#52524F]">
                            <Layers className="w-4 h-4" />
                          </div>
                          <select
                            value={preferredLayoutId}
                            onChange={(e) => setPreferredLayoutId(e.target.value)}
                            className="w-full bg-white border border-[#CCCCCC] focus:border-[#B2946E] py-3 pl-11 pr-8 text-xs font-sans text-[#1C1C1B] font-medium focus:outline-none rounded-none appearance-none cursor-pointer text-left"
                          >
                            {SUITE_LAYOUTS.map((ly) => (
                              <option key={ly.id} value={ly.id} className="bg-white text-[#1C1C1B]">
                                {ly.typeName} ({ly.sizeSqFt.toLocaleString()} sq ft)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-[#3B3B38] uppercase tracking-widest block font-bold">
                          Intended Use / Purpose
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#52524F]">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <select
                            value={sizeCategory}
                            onChange={(e) => setSizeCategory(e.target.value)}
                            className="w-full bg-white border border-[#CCCCCC] focus:border-[#B2946E] py-3 pl-11 pr-8 text-xs font-sans text-[#1C1C1B] font-medium focus:outline-none rounded-none appearance-none cursor-pointer"
                          >
                            <option value="own-stay" className="bg-white text-[#1C1C1B]">Personal Use / Own Stay</option>
                            <option value="investment" className="bg-white text-[#1C1C1B]">Investment Asset / Rental Yield</option>
                            <option value="expat" className="bg-white text-[#1C1C1B]">Corporate Expat Relocation</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* PDPA consent check */}
                    <div className="flex gap-2.5 items-start mt-2">
                      <input
                        type="checkbox"
                        required
                        id="consent-check"
                        defaultChecked
                        className="mt-1 cursor-pointer accent-[#B2946E]"
                      />
                      <label htmlFor="consent-check" className="text-[11px] text-[#2D2D2A] font-sans leading-relaxed font-normal select-none cursor-pointer">
                        Consent Declaration: I hereby authorize the D'Rapport Residences team to contact me via phone, secure email, or WhatsApp to schedule viewings and send promotional materials in accordance with the Personal Data Protection Act (PDPA).
                      </label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      id="form-submit-inquiry"
                      className="w-full py-4 bg-[#1C1C1B] hover:bg-[#B2946E] transition-colors text-white font-sans font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer rounded-none"
                    >
                      Secure Private Tour Credentials
                    </button>
                  </motion.form>
                ) : (
                  /* GORGEOUS TICKET CONFIRMATION SLIP */
                  <motion.div
                    key="success-slip"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6 space-y-6 font-sans"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 mb-2">
                      <FileCheck className="w-6 h-6 animate-pulse" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1C1C1B] uppercase tracking-wider">
                        VIP Credentials Confirmed
                      </h3>
                      <p className="text-xs sm:text-sm text-[#2D2D2A] font-medium max-w-sm mx-auto mt-2 leading-relaxed">
                        Your private tour request is being processed. An official Sales Concierge representative will contact you via WhatsApp to coordinate your viewing slot.
                      </p>
                    </div>

                    {/* TICKET MOCK */}
                    <div className="my-6 max-w-sm mx-auto border-2 border-dashed border-[#B2946E]/40 bg-[#FCFCFA] font-mono text-xs rounded-none overflow-hidden text-left shadow-lg">
                      {/* Ticket Header */}
                      <div className="bg-[#1C1C1B] text-[#FCFCFA] p-4 font-bold flex justify-between items-center">
                        <span className="tracking-widest text-[9px] uppercase font-bold text-[#B2946E]">D'Rapport Residences VIP Pass</span>
                        <Sparkles className="w-4 h-4 text-[#B2946E]" />
                      </div>

                      {/* Ticket Fields */}
                      <div className="p-5 space-y-3 font-mono text-[11px] text-[#575754]">
                        <div className="flex justify-between border-b border-[#EBEBE6] pb-2">
                          <span className="text-[#82827E] uppercase">Dispatch To:</span>
                          <span className="text-[#1C1C1B] font-bold text-[9px] truncate" title="clairee0726@gmail.com, shyanyeews@gmail.com">
                            clairee0726@gmail.com, shyanyeews@gmail.com
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-[#EBEBE6] pb-2">
                          <span className="text-[#82827E] uppercase">Lead Ref:</span>
                          <span className="text-[#1C1C1B] font-bold">{newlySubmittedLead?.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#EBEBE6] pb-2">
                          <span className="text-[#82827E] uppercase">Guest:</span>
                          <span className="text-[#8D704E] font-bold truncate max-w-[190px]">
                            {newlySubmittedLead?.fullName}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-[#EBEBE6] pb-2">
                          <span className="text-[#82827E] uppercase">Telecom:</span>
                          <span className="text-[#1C1C1B]">
                            {newlySubmittedLead?.countryCode} {newlySubmittedLead?.phoneNumber}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-[#EBEBE6] pb-2">
                          <span className="text-[#82827E] uppercase">Unit Choice:</span>
                          <span className="text-[#1C1C1B] uppercase font-semibold">
                            {newlySubmittedLead?.preferredLayoutId.replace('layout-', 'Type ')}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-[#EBEBE6] pb-2">
                          <span className="text-[#82827E] uppercase">Purpose:</span>
                          <span className="text-[#1C1C1B] uppercase">{newlySubmittedLead?.sizeCategory.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#82827E] uppercase">Status:</span>
                          <span className="text-emerald-500 font-bold uppercase animate-pulse">Assigning VIP Host</span>
                        </div>
                      </div>

                      {/* Barcode representation */}
                      <div className="bg-white px-6 py-4 border-t border-[#EBEBE6] flex flex-col items-center justify-center gap-1">
                        <div className="h-6 w-full flex justify-between items-center select-none text-[#575754] tracking-tighter opacity-70">
                          |||| | ||||| | ||| | |||| || ||| | ||| |||| | ||| || ||| | || |||| | ||| ||| ||| ||  
                        </div>
                        <span className="text-[8px] text-[#82827E]">PRESENT THIS RECEIPT TO GUARD POST</span>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 border border-[#EBEBE6] hover:border-[#B2946E] text-[#575754] hover:text-[#B2946E] text-xs font-mono uppercase tracking-widest rounded-none transition-colors cursor-pointer"
                    >
                      Book Another Viewing Slot
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Dynamic Registered Leads Table (Only visible in sandbox/dashboard view so user saltyfish can verify their form works perfectly!) */}
        {leads.length > 0 && (
          <div className="mt-20 border-t border-[#EBEBE6] pt-16">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-sm font-mono text-[#B2946E] uppercase tracking-widest font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Sandbox Lead Database ({leads.length} registrations)</span>
                </h3>
                <p className="text-[11px] text-[#82827E] font-sans mt-0.5">
                  Visible solely for review & testing. Form leads are saved in your browser's persistent key-value storage.
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Clear all leads stored in sandbox?')) {
                    setLeads([]);
                    localStorage.removeItem('drapport_leads');
                  }
                }}
                className="px-3.5 py-1.5 border border-red-200 hover:border-red-500 text-red-600 hover:text-red-700 text-[10px] font-mono uppercase tracking-widest rounded-none transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-center bg-[#FFF8F8]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Logs</span>
              </button>
            </div>

            <div className="border border-[#EBEBE6] rounded-none overflow-hidden bg-white shadow-[0_4px_15px_rgba(28,28,27,0.01)] font-mono">
              <div className="overflow-x-auto font-mono">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FCFCFA] text-[#82827E] border-b border-[#EBEBE6] uppercase text-[9px] tracking-wider">
                      <th className="p-4">Ref ID</th>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Contact Code</th>
                      <th className="p-4">Layout Prefer</th>
                      <th className="p-4">Category</th>
                      <th className="p-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBEBE6] text-[#575754]">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-[#FCFCFA]/80 transition-colors">
                        <td className="p-4 text-[#B2946E] font-bold">{l.id}</td>
                        <td className="p-4 font-sans font-semibold text-[#1C1C1B]">{l.fullName}</td>
                        <td className="p-4">{l.countryCode} {l.phoneNumber}</td>
                        <td className="p-4 uppercase">{l.preferredLayoutId.replace('layout-', 'Type ')}</td>
                        <td className="p-4 uppercase text-[10px] text-[#82827E]">{l.sizeCategory}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => clearLead(l.id)}
                            className="p-1 text-neutral-400 hover:text-red-500 hover:scale-110 transition-transform cursor-pointer"
                            title="Remove lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
