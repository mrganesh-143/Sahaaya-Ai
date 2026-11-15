'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data?.user) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAFAF7] px-4 py-12">
      
      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#1B5E20] flex items-center justify-center font-black text-2xl text-white shadow-md shadow-[#1B5E20]/25">
          S
        </div>
        <div>
          <span className="text-2xl font-black tracking-tight text-[#1B5E20]">SAHAAYA</span>
          <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8BC34A] leading-none">People's Savings Network</p>
        </div>
      </Link>

      <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-[#1A1A1A]">Welcome Back</h2>
          <p className="text-xs text-gray-500 mt-1">Sign in to manage your family budget and marketplace orders</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs font-semibold text-[#1B5E20] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#1B5E20]/20"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-600">
            Don't have an account yet?{' '}
            <Link href="/register" className="font-bold text-[#1B5E20] hover:underline">
              Create an account
            </Link>
          </p>
        </div>

      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-gray-500">
        <ShieldCheck className="w-4 h-4 text-[#8BC34A]" />
        <span>End-to-End Secure Supabase Authentication</span>
      </div>

    </div>
  );
}
