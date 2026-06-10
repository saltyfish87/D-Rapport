/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdmin, AdminSettings } from '../context/AdminContext';
import {
  X,
  Settings,
  Sparkles,
  FileText,
  DollarSign,
  PhoneCall,
  Save,
  RotateCcw,
  Check,
  Eye,
  Info,
  Image
} from 'lucide-react';

export default function AdminPanel() {
  const { settings, updateSettings, resetSettings, isAdminOpen, setIsAdminOpen } = useAdmin();
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'metrics' | 'layouts' | 'gallery'>('content');
  const [formData, setFormData] = useState<AdminSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state with settings when drawer is opened
  React.useEffect(() => {
    if (isAdminOpen) {
      setFormData(settings);
    }
  }, [isAdminOpen, settings]);

  const handleInputChange = (section: keyof AdminSettings, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        [field]: value,
      },
    }));
  };

  const handleGalleryChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedImages = [...prev.gallery.images];
      updatedImages[index] = {
        ...updatedImages[index],
        [field]: value,
      };
      return {
        ...prev,
        gallery: {
          ...prev.gallery,
          images: updatedImages,
        }
      };
    });
  };

  const handleLayoutChange = (index: number, field: string, value: string | number) => {
    setFormData((prev) => {
      const updatedLayouts = [...prev.suiteLayouts];
      updatedLayouts[index] = {
        ...updatedLayouts[index],
        [field]: value,
      };
      return {
        ...prev,
        suiteLayouts: updatedLayouts,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleReset = () => {
    if (window.confirm('Restore original D’Rapport Residences configurations? Daily overrides will be cleared.')) {
      resetSettings();
      setFormData(settings);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  if (!isAdminOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden font-sans">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Dynamic drawer body */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 sm:pl-16">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-xl bg-white flex flex-col shadow-2xl relative"
          >
            {/* Control Drawer Header */}
            <div className="px-6 py-5 bg-[#1C1C1B] text-white flex items-center justify-between border-b border-[#EBEBE6]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#B2946E]/20 text-[#B2946E] rounded-none border border-[#B2824C]/30">
                  <Settings className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold tracking-wide uppercase font-sans">Concierge Editor</h3>
                  <p className="text-[10px] text-[#A3A39E] font-mono tracking-widest mt-0.5">ADMIN SECURITY PRIVILEGES ACTIVE</p>
                </div>
              </div>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-1 rounded-none hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Tips / Instructions Banner */}
            <div className="bg-[#FCFCFA] border-b border-[#EBEBE6] px-6 py-3 flex items-start gap-2.5 text-xs text-[#575754]">
              <Info className="w-4 h-4 text-[#B2946E] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Configure your copy, customize imagery by entering external public URLs (like unsplash), and check SEO parameters. Changes save instantly to your local browser partition.
              </p>
            </div>

            {/* Editing Category Navigation Tabs */}
            <div className="bg-white border-b border-[#EBEBE6] flex divide-x divide-[#EBEBE6] text-xs">
              {[
                { id: 'content', label: 'Branding', icon: Sparkles },
                { id: 'seo', label: 'SEO', icon: FileText },
                { id: 'metrics', label: 'Stats & Contact', icon: PhoneCall },
                { id: 'layouts', label: 'Suites', icon: DollarSign },
                { id: 'gallery', label: 'Gallery', icon: Image }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-3 px-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 font-sans uppercase tracking-wider text-[10px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#B2946E] bg-[#FCFCFA] border-b-2 border-[#B2946E]'
                        : 'text-[#82827E] hover:text-[#1C1C1B] hover:bg-[#FCFCFA]/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Save Confirmation Notification Area */}
            {saveSuccess && (
              <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs px-6 py-2.5 flex items-center justify-between font-sans">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 block" />
                  Configurations written successfully! Live site updated.
                </span>
                <span className="text-[10px] font-mono text-emerald-600 bg-white px-1.5 py-0.5 border border-emerald-200 rounded-xs uppercase tracking-wider">OK</span>
              </div>
            )}

            {/* Main Form Fields scroll container */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-xs">
              
              {/* TAB 1: BRANDING & HERO BACKGROUND */}
              {activeTab === 'content' && (
                <div className="space-y-5">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#B2946E] font-extrabold pb-1 border-b border-[#EBEBE6]">
                    Hero Banner Background & Copy
                  </h4>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      Hero Section Title (Headline)
                    </label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      Hero Subtitle Block (Badge)
                    </label>
                    <input
                      type="text"
                      value={formData.hero.subtitle}
                      onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      Hero Headline Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.hero.description}
                      onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold flex items-center justify-between">
                      <span>Hero Whole Background Banner Image URL</span>
                      <span className="text-[8px] text-[#A3A39E] font-normal lowercase">Enter URL or &lsquo;default&rsquo;</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/photo-1545324418-cc1a3fa10c00..."
                      value={formData.hero.imageUrl}
                      onChange={(e) => handleInputChange('hero', 'imageUrl', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none font-mono"
                    />
                    <p className="text-[10px] text-[#82827E] leading-relaxed">
                      To make the hero spectacular, use public image networks (like Unsplash). If set to <code className="bg-neutral-100 px-1 text-black font-semibold">default</code>, the system will use the pre-packaged high-rise tower exterior elevation.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                        Primary Button Copy
                      </label>
                      <input
                        type="text"
                        value={formData.hero.buttonPrimaryText}
                        onChange={(e) => handleInputChange('hero', 'buttonPrimaryText', e.target.value)}
                        className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-2.5 text-xs text-[#1C1C1B] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                        Secondary Button Copy
                      </label>
                      <input
                        type="text"
                        value={formData.hero.buttonSecondaryText}
                        onChange={(e) => handleInputChange('hero', 'buttonSecondaryText', e.target.value)}
                        className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-2.5 text-xs text-[#1C1C1B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#B2946E] font-extrabold pt-4 pb-1 border-b border-[#EBEBE6]">
                    Secondary Overview Image block
                  </h4>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold flex items-center justify-between">
                      <span>Interior Penthouse living room Image URL</span>
                      <span className="text-[8px] text-[#A3A39E] font-normal lowercase">Enter URL or &lsquo;default&rsquo;</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/photo-1600210492486-724fe5c67fb0..."
                      value={formData.overview.imageUrl}
                      onChange={(e) => handleInputChange('overview', 'imageUrl', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      Luxury Section Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.overview.tagline}
                      onChange={(e) => handleInputChange('overview', 'tagline', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      Overview Long Title
                    </label>
                    <input
                      type="text"
                      value={formData.overview.title}
                      onChange={(e) => handleInputChange('overview', 'title', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: SEO CONFIG BLOCK */}
              {activeTab === 'seo' && (
                <div className="space-y-5">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#B2946E] font-extrabold pb-1 border-b border-[#EBEBE6] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#B2946E]" />
                    <span>Search Engine Optimization (SEO)</span>
                  </h4>
                  <p className="text-[10px] text-[#575754] leading-relaxed">
                    Improve Google ranking instantly. These parameters are injected in real-time into the HTML <code>&lt;head&gt;</code> element of this landing page so crawlers read customized, keyword-rich details.
                  </p>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      SEO Headline (HTML title)
                    </label>
                    <input
                      type="text"
                      value={formData.seo.title}
                      onChange={(e) => handleInputChange('seo', 'title', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      SEO Meta Description (150-160 Recommended)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.seo.description}
                      onChange={(e) => handleInputChange('seo', 'description', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      SEO Keywords (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formData.seo.keywords}
                      onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-[#EBEBE6]">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                        Google Search Console verification key
                      </label>
                      <span className="text-[8px] bg-amber-50 text-[#B2946E] border border-amber-200 uppercase px-1.5 py-0.5 tracking-wider font-semibold font-mono">Google Console</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. google-site-verification=xxxx..."
                      value={formData.seo.googleVerification}
                      onChange={(e) => handleInputChange('seo', 'googleVerification', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs font-sans text-[#1C1C1B] focus:outline-none font-mono"
                    />
                    <p className="text-[10px] text-[#82827E]">
                      Drop your unique verification token here to verify ownership with Search Console and check indexing status immediately.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: CONTACT CHANNELS & CORE STAT METRICS */}
              {activeTab === 'metrics' && (
                <div className="space-y-5">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#B2946E] font-extrabold pb-1 border-b border-[#EBEBE6]">
                    Developer Contacts & Corporate Hotline
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                        Corporate Hotline
                      </label>
                      <input
                        type="text"
                        value={formData.contact.phone}
                        onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                        className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-2.5 text-xs text-[#1C1C1B] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                        Inquiry Central Email
                      </label>
                      <input
                        type="text"
                        value={formData.contact.email}
                        onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                        className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-2.5 text-xs text-[#1C1C1B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                      Sales Gallery Address
                    </label>
                    <input
                      type="text"
                      value={formData.contact.address}
                      onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-3 text-xs text-[#1C1C1B] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                        Developer Partner
                      </label>
                      <input
                        type="text"
                        value={formData.contact.developer}
                        onChange={(e) => handleInputChange('contact', 'developer', e.target.value)}
                        className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-2.5 text-xs text-[#1C1C1B] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold">
                        Licensed Subsidiary
                      </label>
                      <input
                        type="text"
                        value={formData.contact.subsidiary}
                        onChange={(e) => handleInputChange('contact', 'subsidiary', e.target.value)}
                        className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-2.5 text-xs text-[#1C1C1B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="block text-[10px] font-mono text-[#82827E] uppercase font-bold flex items-center justify-between">
                      <span>Serverless Form ID / Email Hook</span>
                      <span className="text-[8px] bg-emerald-50 text-emerald-600 border border-emerald-200 uppercase px-1.5 py-0.5 font-bold font-mono">Formspree & FormSubmit</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. saltyfish1987@gmail.com or Formspree Form ID"
                      value={formData.contact.formspreeId || ''}
                      onChange={(e) => handleInputChange('contact', 'formspreeId', e.target.value)}
                      className="w-full bg-[#FCFCFA] border border-[#EBEBE6] focus:border-[#B2946E] p-2.5 text-xs text-[#1C1C1B] focus:outline-none font-mono"
                    />
                    <p className="text-[10px] text-[#82827E] leading-relaxed">
                      Enter your Formspree Form ID (e.g. <code className="bg-neutral-100 px-1 text-[#1c1c1b] font-semibold">mvgozypb</code>) or enter your email address directly to route via FormSubmit.co auto-forwarding with zero-setup!
                    </p>
                  </div>

                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#B2946E] font-extrabold pt-4 pb-1 border-b border-[#EBEBE6]">
                    Interactive Highlight Metrics
                  </h4>

                  <div className="space-y-4">
                    {/* Stat 1 */}
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <span className="font-mono text-[9px] uppercase text-[#82827E] font-bold">Stat Room 1</span>
                      <input
                        type="text"
                        value={formData.metrics.proximity}
                        onChange={(e) => handleInputChange('metrics', 'proximity', e.target.value)}
                        className="bg-[#FCFCFA] border border-[#EBEBE6] p-2 focus:border-[#B2946E] text-xs focus:outline-none col-span-2"
                        placeholder="Value (e.g. 3.5)"
                      />
                    </div>

                    {/* Stat 2 */}
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <span className="font-mono text-[9px] uppercase text-[#82827E] font-bold">Stat Room 2</span>
                      <input
                        type="text"
                        value={formData.metrics.landSprawl}
                        onChange={(e) => handleInputChange('metrics', 'landSprawl', e.target.value)}
                        className="bg-[#FCFCFA] border border-[#EBEBE6] p-2 focus:border-[#B2946E] text-xs focus:outline-none col-span-2"
                        placeholder="Value (e.g. 9.12)"
                      />
                    </div>

                    {/* Stat 3 */}
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <span className="font-mono text-[9px] uppercase text-[#82827E] font-bold">Stat Room 3</span>
                      <input
                        type="text"
                        value={formData.metrics.gatherSpace}
                        onChange={(e) => handleInputChange('metrics', 'gatherSpace', e.target.value)}
                        className="bg-[#FCFCFA] border border-[#EBEBE6] p-2 focus:border-[#B2946E] text-xs focus:outline-none col-span-2"
                        placeholder="Value (e.g. 200k)"
                      />
                    </div>

                    {/* Stat 4 */}
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <span className="font-mono text-[9px] uppercase text-[#82827E] font-bold">Stat Room 4</span>
                      <input
                        type="text"
                        value={formData.metrics.suiteSizes}
                        onChange={(e) => handleInputChange('metrics', 'suiteSizes', e.target.value)}
                        className="bg-[#FCFCFA] border border-[#EBEBE6] p-2 focus:border-[#B2946E] text-xs focus:outline-none col-span-2"
                        placeholder="Value (e.g. 1.1-2.2k)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SUITE LAYOUTS & LEADS SETS */}
              {activeTab === 'layouts' && (
                <div className="space-y-6">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#B2946E] font-extrabold pb-1 border-b border-[#EBEBE6]">
                    Suite Pricing & Layout Options
                  </h4>
                  <p className="text-[10px] text-[#575754] leading-relaxed">
                    Manage sizing, room numbers, descriptions and exact benchmark pricing parameters displayed inside the interactive layouts selector and calculator.
                  </p>

                  {formData.suiteLayouts.map((layout, index) => (
                    <div key={layout.id} className="p-4 border border-[#EBEBE6] bg-[#FCFCFA] space-y-3 relative group">
                      <div className="flex justify-between items-center pb-2 border-b border-[#EBEBE6]">
                        <span className="text-[10px] font-mono uppercase bg-[#1C1C1B] text-[#FCFCFA] font-bold px-2 py-0.5 tracking-wider">
                          {layout.typeName.split(' ')[0]} {layout.typeName.split(' ')[1] || ''}
                        </span>
                        <span className="text-[10px] text-[#82827E] font-mono lowercase">ID: {layout.id}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Listing Title Name</label>
                          <input
                            type="text"
                            value={layout.typeName}
                            onChange={(e) => handleLayoutChange(index, 'typeName', e.target.value)}
                            className="w-full bg-white border border-[#EBEBE6] p-2 font-semibold text-xs focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Estimated Starting Price (RM)</label>
                          <input
                            type="number"
                            value={layout.startingPriceRM}
                            onChange={(e) => handleLayoutChange(index, 'startingPriceRM', Number(e.target.value))}
                            className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Size Sq Ft</label>
                          <input
                            type="number"
                            value={layout.sizeSqFt}
                            onChange={(e) => handleLayoutChange(index, 'sizeSqFt', Number(e.target.value))}
                            className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Bedrooms</label>
                          <input
                            type="number"
                            value={layout.bedrooms}
                            onChange={(e) => handleLayoutChange(index, 'bedrooms', Number(e.target.value))}
                            className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Bathrooms</label>
                          <input
                            type="number"
                            value={layout.bathrooms}
                            onChange={(e) => handleLayoutChange(index, 'bathrooms', Number(e.target.value))}
                            className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Highlight Key Feature</label>
                        <input
                          type="text"
                          value={layout.keyFeature}
                          onChange={(e) => handleLayoutChange(index, 'keyFeature', e.target.value)}
                          className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Floorplan Image Link (Google Drive / Webp / JPEG)</label>
                        <input
                          type="text"
                          value={layout.imageUrl || ''}
                          onChange={(e) => handleLayoutChange(index, 'imageUrl', e.target.value)}
                          className="w-full bg-white border border-[#EBEBE6] p-2 text-xs font-mono focus:outline-none"
                          placeholder="e.g. https://lh3.googleusercontent.com/d/..."
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Description Paragraph</label>
                        <textarea
                          rows={2}
                          value={layout.description}
                          onChange={(e) => handleLayoutChange(index, 'description', e.target.value)}
                          className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none resize-none leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: VISUAL GALLERY CUSTOMIZER */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-[#B2946E] font-extrabold pb-1 border-b border-[#EBEBE6]">
                    Visual Gallery Customizer
                  </h4>
                  <p className="text-[10px] text-[#575754] leading-relaxed">
                    Provide custom direct image links below. If hosting images on Google Drive, ensure each file is shared with "Anyone with the link can view", or use public static hosting URLs.
                  </p>

                  {formData.gallery?.images?.map((image, index) => (
                    <div key={image.id} className="p-4 border border-[#EBEBE6] bg-[#FCFCFA] space-y-3 relative group">
                      <div className="flex justify-between items-center pb-2 border-b border-[#EBEBE6]">
                        <span className="text-[10px] font-mono uppercase bg-[#1C1C1B] text-[#FCFCFA] font-bold px-2 py-0.5 tracking-wider">
                          Gallery Image #{index + 1}
                        </span>
                        <span className="text-[10px] text-[#82827E] font-mono lowercase">ID: {image.id}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Image Title</label>
                          <input
                            type="text"
                            value={image.title}
                            onChange={(e) => handleGalleryChange(index, 'title', e.target.value)}
                            className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none font-sans font-medium text-[#1C1C1B]"
                            placeholder="e.g. Master Suite Views"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold">Category</label>
                          <input
                            type="text"
                            value={image.category}
                            onChange={(e) => handleGalleryChange(index, 'category', e.target.value)}
                            className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none font-sans font-medium text-[#1C1C1B]"
                            placeholder="e.g. Interiors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#82827E] uppercase block font-bold flex items-center justify-between">
                          <span>Public Image URL or Google Drive Link</span>
                          {image.url && (
                            <a
                              href={image.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[8px] text-[#B2946E] hover:underline flex items-center gap-0.5"
                            >
                              <Eye className="w-2.5 h-2.5" /> View current
                            </a>
                          )}
                        </label>
                        <input
                          type="text"
                          value={image.url}
                          onChange={(e) => handleGalleryChange(index, 'url', e.target.value)}
                          className="w-full bg-white border border-[#EBEBE6] p-2 text-xs focus:outline-none font-mono"
                          placeholder="Paste image address details..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>

            {/* Sticky Actions bar inside control panel */}
            <div className="px-6 py-4 border-t border-[#EBEBE6] bg-[#FCFCFA] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3.5 border border-red-200 hover:border-red-500 text-red-600 hover:text-[#fff] hover:bg-red-500 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5"
                title="Restore default database layout state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(false)}
                  className="px-4 py-3.5 border border-[#EBEBE6] hover:bg-[#1C1C1B]/5 text-[#575754] text-[10px] font-sans font-bold uppercase tracking-widest transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3.5 bg-[#1C1C1B] hover:bg-[#B2946E] text-white text-[10px] font-sans font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-lg hover:-translate-y-px"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Apply Changes</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
