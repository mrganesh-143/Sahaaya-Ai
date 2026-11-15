'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Store, 
  ShoppingBag, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Activity,
  Coins,
  FileText
} from 'lucide-react';

export default function AdminPage() {
  const [tab, setTab] = useState<'sellers' | 'products' | 'audit'>('sellers');

  const [pendingSellers, setPendingSellers] = useState([
    { id: '1', business: 'Warangal Organic Farmers Federation', owner: 'M. Venkat Rao', gst: '36AAACW1234F1Z5', location: 'Warangal, TS', applied: 'Yesterday' },
    { id: '2', business: 'Krishna Delta Pulses & Oil Co-Op', owner: 'G. Suresh', gst: '37AABCK5678G2Z1', location: 'Vijayawada, AP', applied: '2 days ago' },
    { id: '3', business: 'Hyderabad Community Fair-Price Staples', owner: 'R. Koteshwar', gst: '36AABCS9876H1Z9', location: 'Hyderabad, TS', applied: '3 days ago' }
  ]);

  const [pendingProducts, setPendingProducts] = useState([
    { id: '1', name: 'Cold-Pressed Groundnut Oil (5L Can)', seller: 'Warangal Farmers Co-Op', mrp: 950, sahaayaPrice: 720, margin: '24% Relief' },
    { id: '2', name: 'Fortified Wheat Flour Atta (10kg)', seller: 'Krishna Delta Co-Op', mrp: 480, sahaayaPrice: 380, margin: '21% Relief' }
  ]);

  const [auditLogs] = useState([
    { id: 1, action: 'SELLER_VERIFIED', target: 'Godavari Direct Millers', admin: 'Gunda Sai Jayanth (CEO)', time: '10 mins ago' },
    { id: 2, action: 'PRODUCT_PRICE_AUDIT', target: 'Toor Dal 1kg', admin: 'Auto-Moderator', time: '1 hr ago' },
    { id: 3, action: 'COMMUNITY_RELIEF_BATCH', target: '500 Packages dispatched', admin: 'Dispatch Ops', time: '3 hrs ago' }
  ]);

  const handleVerifySeller = (id: string, approve: boolean) => {
    setPendingSellers(pendingSellers.filter(s => s.id !== id));
  };

  const handleModerateProduct = (id: string, approve: boolean) => {
    setPendingProducts(pendingProducts.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Admin Header */}
      <div className="bg-[#113B15] p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Administrator & Governance Console</span>
          </div>
          <h1 className="text-3xl font-black">Platform Safety & Moderation</h1>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            Overseeing social-impact integrity, fair pricing verification, and user protection.
          </p>
        </div>

        <div className="flex gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20">
          <button
            onClick={() => setTab('sellers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'sellers' ? 'bg-[#8BC34A] text-[#113B15]' : 'text-white hover:bg-white/10'
            }`}
          >
            Pending Sellers ({pendingSellers.length})
          </button>
          <button
            onClick={() => setTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'products' ? 'bg-[#8BC34A] text-[#113B15]' : 'text-white hover:bg-white/10'
            }`}
          >
            Product Moderation ({pendingProducts.length})
          </button>
          <button
            onClick={() => setTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'audit' ? 'bg-[#8BC34A] text-[#113B15]' : 'text-white hover:bg-white/10'
            }`}
          >
            Audit Trail
          </button>
        </div>
      </div>

      {/* High-level Platform Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Enrolled Families</span>
          <p className="text-2xl font-black text-[#1A1A1A]">51,420</p>
          <p className="text-xs text-green-600 font-bold mt-2">+1,200 this week</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Total Savings Delivered</span>
          <p className="text-2xl font-black text-[#1B5E20]">₹ 2,34,50,000</p>
          <p className="text-xs text-gray-500 mt-2">Verified household relief</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Active Sellers</span>
          <p className="text-2xl font-black text-[#1A1A1A]">142 Partners</p>
          <p className="text-xs text-gray-500 mt-2">Across 18 districts</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">System Security</span>
          <p className="text-2xl font-black text-[#8BC34A]">100% RLS</p>
          <p className="text-xs text-gray-500 mt-2">Zero database breaches</p>
        </div>
      </div>

      {/* PENDING SELLERS TAB */}
      {tab === 'sellers' && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-lg font-black text-[#1A1A1A] mb-1">Sellers Awaiting KYC & Verification</h3>
          <p className="text-xs text-gray-500 mb-6">Verify GST and physical cooperative credentials before granting marketplace listing access.</p>

          <div className="space-y-4">
            {pendingSellers.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400">
                All business partner applications have been reviewed!
              </div>
            ) : (
              pendingSellers.map(seller => (
                <div key={seller.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-base text-[#1A1A1A]">{seller.business}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Proprietor: {seller.owner} · GST: <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200">{seller.gst}</code> · {seller.location}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">Applied: {seller.applied}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleVerifySeller(seller.id, false)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleVerifySeller(seller.id, true)}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-xs font-bold shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* PRODUCT MODERATION TAB */}
      {tab === 'products' && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-lg font-black text-[#1A1A1A] mb-1">Affordable Pricing Moderation</h3>
          <p className="text-xs text-gray-500 mb-6">Ensure products meet the Sahaaya promise of genuine savings compared to open market retail.</p>

          <div className="space-y-4">
            {pendingProducts.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400">
                No products currently pending moderation.
              </div>
            ) : (
              pendingProducts.map(p => (
                <div key={p.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-base text-[#1A1A1A]">{p.name}</h4>
                    <p className="text-xs text-gray-600">Listed by: {p.seller}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-gray-400 line-through">MRP: ₹ {p.mrp}</span>
                      <span className="font-black text-[#1B5E20]">Sahaaya Price: ₹ {p.sahaayaPrice}</span>
                      <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {p.margin}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleModerateProduct(p.id, false)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                    <button
                      onClick={() => handleModerateProduct(p.id, true)}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-xs font-bold shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve for Live Sale</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* AUDIT LOG TAB */}
      {tab === 'audit' && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-lg font-black text-[#1A1A1A] mb-1">Security Audit Trail</h3>
          <p className="text-xs text-gray-500 mb-6">Immutable system actions recorded for transparency and compliance.</p>

          <div className="divide-y divide-gray-100">
            {auditLogs.map(log => (
              <div key={log.id} className="py-3.5 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4 text-[#1B5E20]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">{log.action}: {log.target}</span>
                    <span className="text-gray-400">Actor: {log.admin}</span>
                  </div>
                </div>
                <span className="text-gray-400">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
