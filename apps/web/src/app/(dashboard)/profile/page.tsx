'use client';

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Save, 
  LogOut,
  CheckCircle2
} from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('Sai Kumar Reddy');
  const [email] = useState('sai.kumar@example.com');
  const [phone, setPhone] = useState('+91 98480 22338');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');
  const [language, setLanguage] = useState<'en' | 'te' | 'hi'>('te');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#8BC34A] text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-[#1B5E20]/20">
          SK
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-black text-[#1A1A1A]">{name}</h1>
          <p className="text-xs text-gray-500 mt-0.5">Family Head Account · Active Sahaaya Member</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              Verified Resident
            </span>
            <span className="text-[10px] font-semibold text-gray-500">
              Joined October 2026
            </span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-[#1B5E20] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>Profile and language preferences updated successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-8">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div>
            <h3 className="font-black text-base text-[#1A1A1A] mb-1">Personal Details</h3>
            <p className="text-xs text-gray-500 mb-4">Your info is protected under strict Supabase Row Level Security</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address (Read-only)</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mobile Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Preferred Language</label>
              <select
                value={language}
                onChange={(e: any) => setLanguage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20] bg-white font-medium"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">City / Town</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-400">All data encrypted at rest</span>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold text-xs shadow-md shadow-[#1B5E20]/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
