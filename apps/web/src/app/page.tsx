'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  PiggyBank, 
  GraduationCap, 
  Store, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Coins, 
  Award,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Decorative background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#8BC34A]/20 via-[#1B5E20]/10 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B5E20]/10 border border-[#1B5E20]/20 text-[#1B5E20] text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#8BC34A] animate-pulse"></span>
            Empowering 50,000+ Indian Families & Students
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1A1A1A] tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
            Save More. Live Better.{' '}
            <span className="text-[#1B5E20] bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#8BC34A] bg-clip-text text-transparent">
              Grow Together.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed mb-10">
            <strong>SAHAAYA</strong> is India's premier AI-powered social-impact network. We provide poor and middle-class families with deeply discounted groceries, smart automated budgeting, and youth with free skills and career opportunities.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold text-base shadow-xl shadow-[#1B5E20]/25 transition-all hover:-translate-y-0.5"
            >
              <span>Join Sahaaya Network Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/marketplace"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-[#FAFAF7] text-[#1B5E20] border-2 border-[#1B5E20]/20 font-bold text-base transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-[#8BC34A]" />
              <span>Explore Affordable Marketplace</span>
            </Link>
          </div>

          {/* Floating Live Impact Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:border-[#8BC34A] transition-colors text-left">
              <div className="flex items-center gap-2 text-[#1B5E20] mb-1">
                <Coins className="w-5 h-5 text-[#8BC34A]" />
                <span className="text-xs uppercase font-extrabold text-gray-500">Savings Created</span>
              </div>
              <p className="text-3xl font-black text-[#1B5E20]">₹ 2.34 Cr+</p>
              <p className="text-xs text-gray-500 mt-1">Direct monthly household relief</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:border-[#8BC34A] transition-colors text-left">
              <div className="flex items-center gap-2 text-[#1B5E20] mb-1">
                <Users className="w-5 h-5 text-[#8BC34A]" />
                <span className="text-xs uppercase font-extrabold text-gray-500">Families Benefited</span>
              </div>
              <p className="text-3xl font-black text-[#1B5E20]">50,000+</p>
              <p className="text-xs text-gray-500 mt-1">Across Telangana, AP & India</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:border-[#8BC34A] transition-colors text-left">
              <div className="flex items-center gap-2 text-[#1B5E20] mb-1">
                <ShoppingBag className="w-5 h-5 text-[#8BC34A]" />
                <span className="text-xs uppercase font-extrabold text-gray-500">Discounted Staples</span>
              </div>
              <p className="text-3xl font-black text-[#1B5E20]">1,200+</p>
              <p className="text-xs text-gray-500 mt-1">Up to 35% lower than MRP</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:border-[#8BC34A] transition-colors text-left">
              <div className="flex items-center gap-2 text-[#1B5E20] mb-1">
                <GraduationCap className="w-5 h-5 text-[#8BC34A]" />
                <span className="text-xs uppercase font-extrabold text-gray-500">Youth Upskilled</span>
              </div>
              <p className="text-3xl font-black text-[#1B5E20]">850+ Jobs</p>
              <p className="text-xs text-gray-500 mt-1">Free courses & internships</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6-PILLAR FEATURES SECTION */}
      <section id="features" className="py-20 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B5E20]">Engineered For Indian Reality</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mt-2 mb-4">
              A Complete Social-Impact Technology Ecosystem
            </h2>
            <p className="text-gray-600 text-base">
              SAHAAYA combines financial empowerment, local supply chains, and artificial intelligence into one unified national platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-[#FAFAF7] border border-[#E5E7EB] hover:border-[#1B5E20] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PiggyBank className="w-6 h-6 text-[#8BC34A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Family Savings Dashboard</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Set monthly family budgets, track expenses by categories (Pulses, Milk, Education), and automatically calculate target funds for children’s schooling or emergencies.
              </p>
              <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B5E20] group-hover:underline">
                <span>View Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-[#FAFAF7] border border-[#E5E7EB] hover:border-[#1B5E20] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 text-[#8BC34A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Affordable Marketplace</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Direct access to high-quality rice, toor dal, sunflower oil, and everyday staples sourced directly from verified local MSMEs and cooperatives at wholesale rates.
              </p>
              <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B5E20] group-hover:underline">
                <span>Shop Marketplace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-[#FAFAF7] border border-[#E5E7EB] hover:border-[#1B5E20] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-[#8BC34A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">SAHAAYA AI Assistant</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Powered by Google Gemini. Speaks warmly in English, Telugu, and Hindi to guide families on where they are overspending and suggest smart swaps that save money.
              </p>
              <Link href="/ai-assistant" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B5E20] group-hover:underline">
                <span>Ask AI Advisor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl bg-[#FAFAF7] border border-[#E5E7EB] hover:border-[#1B5E20] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-[#8BC34A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Youth Skilling & Jobs</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Free certified courses in Tally, Digital Marketing, Web Development, and Spoken English, plus direct linkage to verified entry-level jobs and scholarship portals.
              </p>
              <Link href="/youth" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B5E20] group-hover:underline">
                <span>Browse Opportunities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl bg-[#FAFAF7] border border-[#E5E7EB] hover:border-[#1B5E20] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Store className="w-6 h-6 text-[#8BC34A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Business Partner Portal</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Enables neighbourhood grocers, farmers, and self-help groups to sell in bulk to community buyers with transparent analytics, zero predatory commissions.
              </p>
              <Link href="/partner" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B5E20] group-hover:underline">
                <span>Partner With Us</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl bg-[#FAFAF7] border border-[#E5E7EB] hover:border-[#1B5E20] transition-all hover:shadow-lg group">
              <div className="w-12 h-12 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-[#8BC34A]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Safety & Moderation</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Strict Row Level Security (RLS) on PostgreSQL, verified seller KYC, product quality moderation, and transparent audit logging for every single community transaction.
              </p>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B5E20] group-hover:underline">
                <span>Admin Safety Suite</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B5E20]">Simple & Accessible</span>
            <h2 className="text-3xl font-black text-[#1A1A1A] mt-2">How Sahaaya Works in 3 Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-[#E5E7EB] text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#1B5E20]/10 text-[#1B5E20] font-black text-xl flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="font-bold text-lg mb-2 text-[#1A1A1A]">Create Free Profile</h4>
              <p className="text-gray-600 text-sm">
                Sign up in under 60 seconds with your phone number and choose your preferred language: English, Telugu, or Hindi.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-[#E5E7EB] text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#8BC34A]/20 text-[#1B5E20] font-black text-xl flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="font-bold text-lg mb-2 text-[#1A1A1A]">Plan & Shop Smart</h4>
              <p className="text-gray-600 text-sm">
                Track your expenses, set your family goals, and buy monthly kitchen essentials directly from verified local suppliers at discounted rates.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-[#E5E7EB] text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#1B5E20]/10 text-[#1B5E20] font-black text-xl flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="font-bold text-lg mb-2 text-[#1A1A1A]">Grow & Upskill</h4>
              <p className="text-gray-600 text-sm">
                Enroll youth in free career courses, apply for internships, and consult the Sahaaya AI advisor for personal wealth building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER & SOCIAL IMPACT STATEMENT */}
      <section id="impact" className="py-20 bg-gradient-to-br from-[#113B15] to-[#1B5E20] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 rounded-3xl bg-[#8BC34A] flex items-center justify-center font-black text-5xl text-[#113B15] shrink-0 shadow-2xl">
              SJ
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#8BC34A] uppercase tracking-wider mb-3">
                <HeartHandshake className="w-3.5 h-3.5" /> Founder & CEO Statement
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4">
                "Our ultimate mission is to build a scalable Indian technology platform that improves millions of lives."
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                "In India, daily groceries and education absorb over 65% of an average family's monthly earnings. SAHAAYA was born to eliminate middlemen, harness artificial intelligence for frugal household budgeting, and open life-changing career avenues for our ambitious youth."
              </p>
              <div className="font-bold text-white text-base">
                Gunda Sai Jayanth
              </div>
              <div className="text-xs text-[#8BC34A]">
                Founder & CEO, SAHAAYA – People's Savings Network
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">
            Start Saving More For Your Family Today
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto mb-8">
            Join over 50,000 households already cutting their kitchen bills and investing in their future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Enter your phone or email" 
              className="px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1B5E20] text-sm"
            />
            <Link 
              href="/register" 
              className="px-6 py-3.5 bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#1B5E20]/20 whitespace-nowrap"
            >
              Get Started Free
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">100% Free to join · English, Telugu & Hindi · Secure Data</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
