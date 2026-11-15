'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Sparkles, 
  GraduationCap, 
  Store, 
  ShieldAlert, 
  User, 
  LogOut,
  IndianRupee,
  Bell
} from 'lucide-react';

interface SidebarProps {
  userRole?: string;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ userRole = 'family' }) => {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Savings Dashboard', icon: LayoutDashboard },
    { href: '/marketplace', label: 'Affordable Market', icon: ShoppingBag },
    { href: '/ai-assistant', label: 'Sahaaya AI Assistant', icon: Sparkles, badge: 'Gemini' },
    { href: '/youth', label: 'Youth & Skilling', icon: GraduationCap },
    { href: '/partner', label: 'Partner Portal', icon: Store },
    { href: '/admin', label: 'Admin & Safety', icon: ShieldAlert },
    { href: '/profile', label: 'My Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1B5E20] flex items-center justify-center font-bold text-white shadow-sm">
            S
          </div>
          <div>
            <span className="font-extrabold text-lg text-[#1B5E20] tracking-tight">SAHAAYA</span>
            <span className="block text-[9px] uppercase font-bold text-[#8BC34A] tracking-wider">Savings Network</span>
          </div>
        </Link>
        <button className="text-gray-400 hover:text-[#1B5E20] relative p-1.5 rounded-lg hover:bg-[#FAFAF7]">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8BC34A]"></span>
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/20'
                  : 'text-[#1A1A1A]/70 hover:bg-[#FAFAF7] hover:text-[#1B5E20]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#1B5E20]'}`} />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#8BC34A]/20 text-[#1B5E20]'
                }`}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Savings Metric Box */}
      <div className="p-4 mx-4 mb-4 rounded-xl bg-gradient-to-br from-[#FAFAF7] to-[#C8E6C9]/40 border border-[#C8E6C9]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1B5E20] mb-1">
          <IndianRupee className="w-3.5 h-3.5 text-[#8BC34A]" />
          <span>Collective Savings</span>
        </div>
        <p className="text-lg font-black text-[#1B5E20]">₹ 2.34 Cr</p>
        <p className="text-[10px] text-gray-500 font-medium">Saved by Indian families on Sahaaya</p>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-[#E5E7EB]">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3.5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};
