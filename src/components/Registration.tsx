import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InquiryLead } from '../types';
import { SUITE_LAYOUTS } from '../data';
import { useAdmin } from '../context/AdminContext';
import {
  ShieldCheck,
  CheckCircle,
  FileCheck,
  User,
  Mail,
  Phone,
  Layers,
  HelpCircle,
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
      _subject: `Cappella Embassy Private Tour Inquiry - ${referenceId}`,
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
    <section id="registration" className="py-24 bg-[#FAF9F6] relative border-b border-editorial-faint">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Vision pitch, phone support, and VIP amenities highlight */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#B2946E] text-[10px] font-mono tracking-[0.2em] uppercase font-bold block mb-3">
                Schedule Private viewing
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6 leading-[1.1]">
                Register For an Exclusive Tour
              </h2>
              <p className="text-base text-[#1A1A1A]/70 font-sans leading-relaxed font-normal">
                Private viewings of our move-in ready suites are available by appointment. Slots are personalized to ensure complete privacy, a guided walkthrough, and elite hospitality.
              </p>
            </div>

            {/* List of details provided in viewings */}
            <div className="space-y-3 font-sans text-xs sm:text-sm text-[#1A1A1A]/80 font-medium">
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#B2946E] flex-shrink-0" />
                <span>Guided tour of actual configured suites</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#B2946E] flex-shrink-0" />
                <span>Full access to the 200,000 sq ft Club Deck</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#B2946E] flex-shrink-0" />
                <span>Developer incentives & direct financing options</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-4 h-4 text-[#B2946E] flex-shrink-0" />
                <span>Beverage service at the Sky Lounge</span>
              </div>
            </div>

            {/* Hotline banner */}
            <div className="bg-[#F8F7F4] border border-editorial-faint p-6 rounded-none space-y-4 shadow-none">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#B2946E] block font-bold">
                Direct Sales Concierge
              </span>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#FAF9F6] rounded-none flex items-center justify-center border border-editorial-faint text-[#1A1A1A]">
                  <Phone className="w-4 h-4 text-[#B2946E]" />
                </div>
                <div>
                  <span className="block text-[8px] text-[#1A1A1A]/40 font-mono uppercase tracking-wider">Corporate Hotline</span>
                  <a href="tel:+60126579508" className="text-base sm:text-lg font-serif font-bold text-[#1A1A1A] hover:text-[#B2946E] transition-colors">
                    +60 12-657 9508
                  </a>
                </div>
              </div>
              <div className="text-xs text-[#1A1A1A]/60 leading-relaxed font-sans font-normal">
                Connect directly with our registration desk. We are open daily from <span className="text-[#1A1A1A] font-semibold">9:00 AM - 6:00 PM</span>, including public holidays.
              </div>
            </div>
          </div>

          {/* Right Block: Interactive form OR ticket slip */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8F7F4] border border-editorial-faint p-6 sm:p-10 rounded-none relative overflow-hidden shadow-none">
              
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
                    <div className="border-b border-editorial-faint pb-4 mb-6">
                      <h3 className="text-lg font-serif text-[#1A1A1A] tracking-tight">
                        VIP Admission Intake
                      </h3>
                      <p className="text-[#1A1A1A]/60 font-sans text-xs mt-1 font-normal">
                        Please provide your details below. Your information is kept strictly private in accordance with the PDPA.
                      </p>
                    </div>

                    {/* Show validation errors */}
                    {errorMessage && (
                      <div className="bg-red-500/5 border border-red-500/10 text-red-600 text-xs p-3 font-sans rounded-none font-medium">
                        {errorMessage}
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-widest block">
                        Full Legal Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B2946E]">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Michael Tan King Wei"
                          className="w-full bg-[#FAF9F6] border border-editorial-faint focus:border-[#B2946E] py-3 pl-11 pr-4 text-xs font-sans text-[#1A1A1A] font-medium focus:outline-none rounded-none transition-all placeholder:text-[#1A1A1A]/45 focus:ring-1 focus:ring-[#B2946E]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-widest block">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B2946E]">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="michael@example.com"
                          className="w-full bg-[#FAF9F6] border border-editorial-faint focus:border-[#B2946E] py-3 pl-11 pr-4 text-xs font-sans text-[#1A1A1A] font-medium focus:outline-none rounded-none transition-all placeholder:text-[#1A1A1A]/45 focus:ring-1 focus:ring-[#B2946E]"
                        />
                      </div>
                    </div>

                    {/* Mobile contact info */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-widest block">
                        Mobile Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-[#FAF9F6] border border-editorial-faint focus:border-[#B2946E] px-3 text-xs font-mono text-[#1A1A1A] font-bold focus:outline-none rounded-none cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-white text-stone-900">
                              {c.code} ({c.name})
                            </option>
                          ))}
                        </select>
                        
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B2946E]">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="e.g. 12345678"
                            className="w-full bg-[#FAF9F6] border border-editorial-faint focus:border-[#B2946E] py-3 pl-11 pr-4 text-xs font-sans text-[#1A1A1A] font-medium focus:outline-none rounded-none transition-all placeholder:text-[#1A1A1A]/45 focus:ring-1 focus:ring-[#B2946E]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pref Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-widest block">
                          Preferred Layout Type
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B2946E]">
                            <Layers className="w-4 h-4" />
                          </div>
                          <select
                            value={preferredLayoutId}
                            onChange={(e) => setPreferredLayoutId(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-editorial-faint focus:border-[#B2946E] py-3 pl-11 pr-8 text-xs font-sans text-[#1A1A1A] font-medium focus:outline-none rounded-none appearance-none cursor-pointer text-left"
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
                        <label className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-widest block">
                          Intended Use / Purpose
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B2946E]">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <select
                            value={sizeCategory}
                            onChange={(e) => setSizeCategory(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-editorial-faint focus:border-[#B2946E] py-3 pl-11 pr-8 text-xs font-sans text-[#1A1A1A] font-medium focus:outline-none rounded-none appearance-none cursor-pointer"
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
                        className="mt-1 cursor-pointer accent-[#B2946E]"
                      />
                      <label htmlFor="consent-check" className="text-[11px] text-[#1A1A1A]/60 font-sans leading-relaxed font-normal select-none cursor-pointer">
                        Consent Declaration: I hereby authorize the Cappella Embassy team to contact me via phone, secure email, or WhatsApp to schedule viewings and send promotional materials in accordance with the Personal Data Protection Act (PDPA).
                      </label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      id="form-submit-inquiry"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#1A1A1A] hover:bg-[#B2946E] disabled:bg-[#1A1A1A]/40 disabled:cursor-not-allowed text-white font-mono font-bold text-xs uppercase tracking-widest transition-all cursor-pointer rounded-none flex items-center justify-center gap-2 border border-[#1A1A1A]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                  /* LUXURY TICKET CONFIRMATION SLIP */
                  <motion.div
                    key="success-slip"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="text-center py-6 space-y-6 font-sans"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-[#FAF9F6] border border-editorial-faint text-[#1A1A1A] mb-2">
                      <FileCheck className="w-6 h-6 text-[#B2946E] animate-pulse" />
                    </div>

                    <div>
                      <h3 className="text-xl font-serif text-[#1A1A1A] tracking-tight">
                        VIP Credentials Confirmed
                      </h3>
                      <p className="text-xs sm:text-sm text-[#1A1A1A]/60 font-normal max-w-sm mx-auto mt-2 leading-relaxed">
                        Your private tour request is being processed. An official Sales Concierge representative will contact you via WhatsApp to coordinate your viewing slot.
                      </p>
                    </div>

                    {/* TICKET MOCK */}
                    <div className="my-6 max-w-sm mx-auto border border-editorial-faint bg-[#FAF9F6] font-mono text-xs rounded-none overflow-hidden text-left shadow-none">
                      {/* Ticket Header */}
                      <div className="bg-[#FAF9F6] px-5 py-4 font-bold flex justify-between items-center border-b border-editorial-faint">
                        <span className="tracking-wider text-[9px] uppercase font-bold text-[#B2946E]">Cappella Embassy VIP Pass</span>
                        <Sparkles className="w-4 h-4 text-[#B2946E]" />
                      </div>

                      {/* Ticket Body */}
                      <div className="p-5 space-y-3.5 text-[#1A1A1A]/80 bg-[#FAF9F6]">
                        <div className="flex justify-between border-b border-editorial-faint/40 pb-2">
                          <span className="text-[#1A1A1A]/40 uppercase text-[9px] font-bold">Admission Ref</span>
                          <span className="text-[#1A1A1A] font-bold">{newlySubmittedLead?.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-editorial-faint/40 pb-2">
                          <span className="text-[#1A1A1A]/40 uppercase text-[9px] font-bold">Guest Holder</span>
                          <span className="text-[#1A1A1A] font-bold">{newlySubmittedLead?.fullName}</span>
                        </div>
                        <div className="flex justify-between border-b border-editorial-faint/40 pb-2">
                          <span className="text-[#1A1A1A]/40 uppercase text-[9px] font-bold">Suite Chosen</span>
                          <span className="text-[#1A1A1A] font-bold">
                            {SUITE_LAYOUTS.find((l) => l.id === newlySubmittedLead?.preferredLayoutId)?.typeName || 'Type B'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-editorial-faint/40 pb-2">
                          <span className="text-[#1A1A1A]/40 uppercase text-[9px] font-bold">Intended Purpose</span>
                          <span className="text-[#1A1A1A]">
                            {newlySubmittedLead?.sizeCategory === 'own-stay' ? 'Own Stay' : newlySubmittedLead?.sizeCategory === 'investment' ? 'Investment Yield' : 'Corporate Expat'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#1A1A1A]/40 uppercase text-[9px] font-bold">Verified On</span>
                          <span className="text-[#1A1A1A]/70">
                            {newlySubmittedLead?.createdAt ? new Date(newlySubmittedLead.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Ticket Footer barcode accent */}
                      <div className="bg-white p-5 border-t border-editorial-faint flex flex-col items-center justify-center gap-1.5">
                        <div className="h-6 w-full bg-barcode-pattern opacity-40 bg-repeat-x" />
                        <span className="text-[9px] text-[#B2946E] text-center tracking-widest uppercase font-bold">
                          * PRESENT PASS AT EMBASSY ROW SECURITY GATEWAY *
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 border border-editorial-faint hover:border-[#1A1A1A] text-[#1A1A1A] text-[10px] font-mono uppercase font-bold tracking-widest rounded-none transition-all cursor-pointer bg-transparent"
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
