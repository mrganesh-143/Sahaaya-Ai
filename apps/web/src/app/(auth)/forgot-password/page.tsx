'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(email);
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Always show success to prevent enumeration
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAFAF7] px-4 py-12">
      <Link href="/" className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#1B5E20] flex items-center justify-center font-black text-2xl text-white shadow-md">
          S
        </div>
        <div>
          <span className="text-2xl font-black tracking-tight text-[#1B5E20]">SAHAAYA</span>
          <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8BC34A] leading-none">People's Savings Network</p>
        </div>
      </Link>

      <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Check Your Email</h3>
            <p className="text-xs text-gray-500 mb-6">
              If an account is associated with {email}, we've sent password reset instructions.
            </p>
            <Link href="/login" className="text-xs font-bold text-[#1B5E20] hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-[#1A1A1A]">Reset Password</h2>
              <p className="text-xs text-gray-500 mt-1">Enter your registered email address and we'll send a recovery link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1B5E20]/20"
              >
                <span>{loading ? 'Sending...' : 'Send Recovery Link'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <Link href="/login" className="text-xs font-semibold text-gray-500 hover:text-[#1B5E20] flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
