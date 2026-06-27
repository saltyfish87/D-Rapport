/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InquiryLead } from '../types';
import { SUITE_LAYOUTS } from '../data';
import { useAdmin } from '../context/AdminContext';
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
  Sparkles,
  X
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
  const { settings } = useAdmin();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    const referenceId = 'DRP-' + Math.floor(100000 + Math.random() * 900000);
    const selectedLayout = SUITE_LAYOUTS.find((l) => l.id === preferredLayoutId);
    const layoutDetails = selectedLayout ? `${selectedLayout.typeName} (${selectedLayout.sizeSqFt.toLocaleString()} sq ft)` : preferredLayoutId;
    const purposeText = sizeCategory === 'own-stay' ? 'Personal Use / Own Stay' : sizeCategory === 'investment' ? 'Investment Yield' : 'Corporate Expat';

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

    // Determine target serverless form endpoint
    let endpointUrl = '';
    const formspreeId = settings.contact.formspreeId ? settings.contact.formspreeId.trim() : 'saltyfish1987@gmail.com';

    if (formspreeId.includes('@')) {
      // Direct Email configuration uses FormSubmit.co secure AJAX api
      endpointUrl = `https://formsubmit.co/ajax/${formspreeId}`;
    } else {
      // Standard Formspree ID endpoint configuration
      endpointUrl = `https://formspree.io/f/${formspreeId}`;
    }

    // Prepare payload
    const payload = {
      _subject: `D'Rapport Residences Private Tour Inquiry - ${referenceId}`,
      referenceId: referenceId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: `${countryCode} ${phoneNumber.trim()}`,
      preferredLayout: layoutDetails,
      intendedUse: purposeText,
      pdpaConsent: "Agreed",
      timestamp: new Date().toLocaleString()
    };

    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // Lead successful delivery! Commit to state and persistent storage logs
        const updatedLeads = [newLead, ...leads];
        setLeads(updatedLeads);
        localStorage.setItem('drapport_leads', JSON.stringify(updatedLeads));

        setNewlySubmittedLead(newLead);
        setFormSubmitted(true);

        // Clear fields
        setFullName('');
        setEmail('');
        setPhoneNumber('');
      } else {
        const responseData = await response.json().catch(() => ({}));
        throw new Error(responseData?.message || 'Server returned a submission error status.');
      }
    } catch (error: any) {
      console.error('Serverless form submission error:', error);
      setErrorMessage(`Inquiry transmission failed: ${error?.message || 'Check network connection'}. Please try again, or connect directly with our sales concierge!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setNewlySubmittedLead(null);
  };

  return (
    <section id="registration" className="py-24 bg-[#F5F5F0] border-b border-[#EBEBE6] relative">
      {/* Visual background lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-stone-200 via-stone-100 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Vision pitch, phone support, and VIP amenities highlight */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#008B85] font-mono text-xs uppercase tracking-[0.3em] block mb-3 font-bold">
                Schedule Private viewing
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tighter text-stone-900 mb-6">
                Register For an Exclusive Tour
              </h2>
              <div className="w-16 h-[3px] bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] mb-6" />
              <p className="text-base text-stone-850 font-sans font-normal leading-relaxed">
                Private viewings of our move-in ready suites are available by appointment. Slots are personalized to ensure complete privacy, a guided walkthrough, and elite hospitality.
              </p>
            </div>

            {/* List of details provided in viewings */}
            <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-600 font-medium">
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#008B85] flex-shrink-0" />
                <span className="text-stone-800">Guided tour of actual configured suites</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#008B85] flex-shrink-0" />
                <span className="text-stone-800">Full access to the 200,000 sq ft Club Deck</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#008B85] flex-shrink-0" />
                <span className="text-stone-800">Developer incentives & direct financing options</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#008B85] flex-shrink-0" />
                <span className="text-stone-800">Beverage service at the Sky Lounge</span>
              </div>
            </div>

            {/* Hotline banner */}
            <div className="bg-white border border-[#EBEBE6] p-5 rounded-none space-y-4 shadow-sm">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 block font-bold">
                Direct Sales Concierge
              </span>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#00CFC8]/10 rounded-full flex items-center justify-center border border-[#00CFC8]/20 text-[#008B85]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-stone-500 font-sans font-light">Corporate Hotline</span>
                  <a href="tel:+60126579508" className="text-base sm:text-lg font-sans font-black text-stone-900 hover:text-[#008B85] transition-colors">
                    +60 12-657 9508
                  </a>
                </div>
              </div>
              <div className="text-[11px] text-stone-700 leading-relaxed font-sans font-normal">
                Connect directly with our registration desk. We are open daily from <span className="text-stone-800 font-bold">9:00 AM - 6:00 PM</span>, including public holidays.
              </div>
            </div>
          </div>

          {/* Right Block: Interactive form OR ticket slip */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#EBEBE6] p-6 sm:p-10 rounded-none relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00CFC8]/3 rounded-full blur-2xl pointer-events-none" />

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
                      <h3 className="text-lg font-sans font-black text-stone-900 uppercase tracking-wider">
                        VIP Admission Intake
                      </h3>
                      <p className="text-stone-700 font-sans text-xs mt-1 font-normal">
                        Please provide your details below. Your information is kept strictly private in accordance with the PDPA.
                      </p>
                    </div>

                    {/* Show validation errors */}
                    {errorMessage && (
                      <div className="bg-red-500/5 border border-red-500/20 text-red-600 text-xs p-3 font-sans rounded-none font-bold">
                        {errorMessage}
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-750 uppercase tracking-widest block font-bold">
                        Full Legal Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Michael Tan King Wei"
                          className="w-full bg-white border border-stone-200 focus:border-[#00CFC8] py-3 pl-11 pr-4 text-xs font-sans text-stone-900 font-medium focus:outline-none rounded-none transition-all placeholder:text-stone-400 focus:ring-1 focus:ring-[#00CFC8]/30"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-750 uppercase tracking-widest block font-bold">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="michael@example.com"
                          className="w-full bg-white border border-stone-200 focus:border-[#00CFC8] py-3 pl-11 pr-4 text-xs font-sans text-stone-900 font-medium focus:outline-none rounded-none transition-all placeholder:text-stone-400 focus:ring-1 focus:ring-[#00CFC8]/30"
                        />
                      </div>
                    </div>

                    {/* Mobile contact info */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-stone-750 uppercase tracking-widest block font-bold">
                        Mobile Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-white border border-stone-200 focus:border-[#00CFC8] px-3 text-xs font-sans text-stone-900 font-medium focus:outline-none rounded-none cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-white text-stone-900">
                              {c.code} ({c.name})
                            </option>
                          ))}
                        </select>
                        
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="e.g. 12345678"
                            className="w-full bg-white border border-stone-200 focus:border-[#00CFC8] py-3 pl-11 pr-4 text-xs font-sans text-stone-900 font-medium focus:outline-none rounded-none transition-all placeholder:text-stone-400 focus:ring-1 focus:ring-[#00CFC8]/30"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pref Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-stone-750 uppercase tracking-widest block font-bold">
                          Preferred Layout Type
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <Layers className="w-4 h-4" />
                          </div>
                          <select
                            value={preferredLayoutId}
                            onChange={(e) => setPreferredLayoutId(e.target.value)}
                            className="w-full bg-white border border-stone-200 focus:border-[#00CFC8] py-3 pl-11 pr-8 text-xs font-sans text-stone-900 font-medium focus:outline-none rounded-none appearance-none cursor-pointer text-left"
                          >
                            {SUITE_LAYOUTS.map((ly) => (
                              <option key={ly.id} value={ly.id} className="bg-white text-stone-900">
                                {ly.typeName} ({ly.sizeSqFt.toLocaleString()} sq ft)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-stone-750 uppercase tracking-widest block font-bold">
                          Intended Use / Purpose
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <select
                            value={sizeCategory}
                            onChange={(e) => setSizeCategory(e.target.value)}
                            className="w-full bg-white border border-stone-200 focus:border-[#00CFC8] py-3 pl-11 pr-8 text-xs font-sans text-stone-900 font-medium focus:outline-none rounded-none appearance-none cursor-pointer"
                          >
                            <option value="own-stay" className="bg-white text-stone-900">Personal Use / Own Stay</option>
                            <option value="investment" className="bg-white text-stone-900">Investment Asset / Rental Yield</option>
                            <option value="expat" className="bg-white text-stone-900">Corporate Expat Relocation</option>
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
                        className="mt-1 cursor-pointer accent-[#00CFC8]"
                      />
                      <label htmlFor="consent-check" className="text-[11px] text-stone-700 font-sans leading-relaxed font-normal select-none cursor-pointer">
                        Consent Declaration: I hereby authorize the D'Rapport Residences team to contact me via phone, secure email, or WhatsApp to schedule viewings and send promotional materials in accordance with the Personal Data Protection Act (PDPA).
                      </label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      id="form-submit-inquiry"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#00CFC8] to-[#2AE8D8] hover:from-[#2AE8D8] hover:to-[#65FFF5] disabled:bg-stone-300 disabled:cursor-not-allowed text-neutral-900 font-sans font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all cursor-pointer rounded-none flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-neutral-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Validating Credentials...</span>
                        </>
                      ) : (
                        <span>Secure Private Tour Credentials</span>
                      )}
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
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#00CFC8]/10 border border-[#00CFC8]/20 text-[#008B85] mb-2">
                      <FileCheck className="w-6 h-6 animate-pulse" />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-stone-900 uppercase tracking-wider">
                        VIP Credentials Confirmed
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-700 font-normal max-w-sm mx-auto mt-2 leading-relaxed">
                        Your private tour request is being processed. An official Sales Concierge representative will contact you via WhatsApp to coordinate your viewing slot.
                      </p>
                    </div>

                    {/* TICKET MOCK */}
                    <div className="my-6 max-w-sm mx-auto border-2 border-dashed border-[#00CFC8]/30 bg-stone-950 font-mono text-xs rounded-none overflow-hidden text-left shadow-md">
                      {/* Ticket Header */}
                      <div className="bg-stone-900 text-white p-4 font-bold flex justify-between items-center border-b border-stone-800">
                        <span className="tracking-widest text-[9px] uppercase font-bold text-[#2AE8D8]">D'Rapport Residences VIP Pass</span>
                        <Sparkles className="w-4 h-4 text-[#2AE8D8]" />
                      </div>

                      {/* Ticket Body */}
                      <div className="p-5 space-y-3.5 text-stone-300">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-stone-500 uppercase text-[9px]">Admission Ref</span>
                          <span className="text-[#2AE8D8] font-bold">{newlySubmittedLead?.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-stone-500 uppercase text-[9px]">Guest Holder</span>
                          <span className="text-white font-bold">{newlySubmittedLead?.fullName}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-stone-500 uppercase text-[9px]">Suite Chosen</span>
                          <span className="text-white font-bold">
                            {SUITE_LAYOUTS.find((l) => l.id === newlySubmittedLead?.preferredLayoutId)?.typeName || 'Type B'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-stone-500 uppercase text-[9px]">Intended Purpose</span>
                          <span className="text-white">
                            {newlySubmittedLead?.sizeCategory === 'own-stay' ? 'Own Stay' : newlySubmittedLead?.sizeCategory === 'investment' ? 'Investment Yield' : 'Corporate Expat'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500 uppercase text-[9px]">Verified On</span>
                          <span className="text-stone-400">
                            {newlySubmittedLead?.createdAt ? new Date(newlySubmittedLead.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Ticket Footer barcode accent */}
                      <div className="bg-stone-900 p-4 border-t border-stone-800 flex flex-col items-center justify-center gap-1">
                        <div className="h-6 w-full bg-barcode-pattern opacity-70 bg-repeat-x" />
                        <span className="text-[8px] text-stone-500 text-center tracking-widest uppercase">
                          * SHOW THIS PASS AT EMBASSY ROW SECURITY GATEWAY *
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 border border-stone-200 hover:border-stone-400 text-stone-600 hover:text-stone-800 text-[10px] font-mono uppercase tracking-widest rounded-none transition-all cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
