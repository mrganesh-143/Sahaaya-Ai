'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'TE' | 'HI'>('EN');

  const toggleLanguage = () => {
    if (lang === 'EN') setLang('TE');
    else if (lang === 'TE') setLang('HI');
    else setLang('EN');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center shadow-md shadow-[#1B5E20]/20">
              <span className="text-white font-extrabold text-2xl tracking-tighter">S</span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#1B5E20]">SAHAAYA</span>
              <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8BC34A] leading-none">People's Savings Network</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1A1A1A]/80">
            <Link href="#features" className="hover:text-[#1B5E20] transition-colors">Features</Link>
            <Link href="/marketplace" className="hover:text-[#1B5E20] transition-colors">Marketplace</Link>
            <Link href="/youth" className="hover:text-[#1B5E20] transition-colors">Youth & Skilling</Link>
            <Link href="#impact" className="hover:text-[#1B5E20] transition-colors">Social Impact</Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#1B5E20] text-xs font-semibold text-[#1B5E20] transition-all bg-white"
              title="Change Language (English / తెలుగు / हिंदी)"
            >
              <Globe className="w-3.5 h-3.5 text-[#8BC34A]" />
              <span>{lang}</span>
            </button>

            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-semibold text-[#1B5E20] hover:text-[#0D3B11] transition-colors"
            >
              Sign In
            </Link>
            
            <Link 
              href="/register" 
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-sm font-bold shadow-md shadow-[#1B5E20]/25 transition-all hover:translate-y-[-1px]"
            >
              <span>Join Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-bold text-[#1B5E20] border border-[#E5E7EB] rounded-md bg-white"
            >
              {lang}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#1A1A1A] hover:bg-[#E5E7EB]/50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-[#E5E7EB] bg-white px-4 pt-3 pb-6 space-y-3">
          <Link 
            href="#features" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-[#1A1A1A] hover:bg-[#FAFAF7] rounded-lg"
          >
            Features
          </Link>
          <Link 
            href="/marketplace" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-[#1A1A1A] hover:bg-[#FAFAF7] rounded-lg"
          >
            Marketplace
          </Link>
          <Link 
            href="/youth" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-[#1A1A1A] hover:bg-[#FAFAF7] rounded-lg"
          >
            Youth & Skilling
          </Link>
          <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2">
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="text-center w-full py-2.5 text-sm font-bold text-[#1B5E20] border border-[#1B5E20] rounded-xl"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsOpen(false)}
              className="text-center w-full py-2.5 text-sm font-bold text-white bg-[#1B5E20] rounded-xl shadow-md"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
