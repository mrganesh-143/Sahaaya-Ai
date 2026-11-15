import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#113B15] text-[#FAFAF7] pt-16 pb-12 border-t border-[#1B5E20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8BC34A] flex items-center justify-center font-black text-xl text-[#113B15]">
                S
              </div>
              <span className="text-2xl font-black tracking-tight text-white">SAHAAYA</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              <strong>People's Savings Network</strong><br />
              Save More. Live Better. Grow Together.<br />
              Empowering Indian families and youth through technology, savings, and collective social impact.
            </p>
            <div className="text-xs text-[#8BC34A] font-semibold pt-1">
              Founder & CEO: Gunda Sai Jayanth
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#8BC34A] mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Family Savings Dashboard</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Affordable Marketplace</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-white transition-colors">Sahaaya AI Assistant</Link></li>
              <li><Link href="/youth" className="hover:text-white transition-colors">Youth Opportunities & Courses</Link></li>
              <li><Link href="/partner" className="hover:text-white transition-colors">Business Partner Portal</Link></li>
            </ul>
          </div>

          {/* Social Impact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#8BC34A] mb-4">Social Impact</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link href="#impact" className="hover:text-white transition-colors">Financial Inclusion</Link></li>
              <li><Link href="/youth" className="hover:text-white transition-colors">Free Vocational Skilling</Link></li>
              <li><Link href="/partner" className="hover:text-white transition-colors">Local MSME Empowerment</Link></li>
              <li><Link href="/youth" className="hover:text-white transition-colors">Scholarship Guidance</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Impact Transparency</Link></li>
            </ul>
          </div>

          {/* Contact / Indian Trust */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#8BC34A] mb-4">India Headquarters</h4>
            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8BC34A] shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8BC34A] shrink-0" />
                <span>contact@sahaaya.network</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8BC34A] shrink-0" />
                <span>Compliant with Indian IT & Data Norms</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} SAHAAYA – People's Savings Network. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>for millions of families across India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
