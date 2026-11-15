'use client';

import React, { useState } from 'react';
import { 
  Store, 
  ShieldCheck, 
  Plus, 
  Package, 
  TrendingUp, 
  IndianRupee, 
  Tag, 
  CheckCircle2,
  Trash2,
  AlertCircle
} from 'lucide-react';

export default function PartnerPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('Pulses');
  const [mrp, setMrp] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [stock, setStock] = useState('');

  const [products, setProducts] = useState([
    { id: 1, name: 'Sona Masoori Raw Rice (Aged 2 Yrs)', category: 'Rice', mrp: 360, discountedPrice: 285, stock: 450, active: true },
    { id: 2, name: 'Premium Unpolished Toor Dal', category: 'Pulses', mrp: 185, discountedPrice: 142, stock: 280, active: true },
    { id: 3, name: 'Cold Pressed Sunflower Oil (1L)', category: 'Oils', mrp: 165, discountedPrice: 124, stock: 120, active: true },
    { id: 4, name: 'Whole Moong Dal High Protein', category: 'Pulses', mrp: 145, discountedPrice: 110, stock: 95, active: true }
  ]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !mrp || !discountedPrice) return;
    const newP = {
      id: Date.now(),
      name: productName,
      category: productCategory,
      mrp: parseFloat(mrp),
      discountedPrice: parseFloat(discountedPrice),
      stock: parseInt(stock) || 100,
      active: true
    };
    setProducts([newP, ...products]);
    setShowAddModal(false);
    setProductName('');
    setMrp('');
    setDiscountedPrice('');
    setStock('');
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Partner Banner */}
      <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center font-black text-2xl shadow-md">
            <Store className="w-8 h-8 text-[#8BC34A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#1A1A1A]">Godavari Direct Millers Co-Op</h1>
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified MSME
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Member ID: SAH-PTNR-8842 · Telangana Region · Zero-commission community distribution partner
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product Listing</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Total Products</span>
          <p className="text-2xl font-black text-[#1A1A1A]">{products.length} Active</p>
          <p className="text-xs text-green-600 font-bold mt-2">100% in stock</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Community Orders</span>
          <p className="text-2xl font-black text-[#1B5E20]">642 Units</p>
          <p className="text-xs text-gray-500 mt-2">Dispatched this month</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Collective Revenue</span>
          <p className="text-2xl font-black text-[#1A1A1A]">₹ 1,84,300</p>
          <p className="text-xs text-[#8BC34A] font-bold mt-2">Direct bank settlement</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Customer Rating</span>
          <p className="text-2xl font-black text-amber-500">4.9 ★</p>
          <p className="text-xs text-gray-500 mt-2">Based on 310 community ratings</p>
        </div>
      </div>

      {/* Product Management Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-black text-lg text-[#1A1A1A]">Catalog Management</h3>
            <p className="text-xs text-gray-500">Manage fair pricing and stock availability for community households</p>
          </div>
          <span className="text-xs text-gray-400">{products.length} listed staples</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider">
                <th className="pb-3 font-bold">Product Name</th>
                <th className="pb-3 font-bold">Category</th>
                <th className="pb-3 font-bold">Retail MRP</th>
                <th className="pb-3 font-bold">Sahaaya Price</th>
                <th className="pb-3 font-bold">Stock</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 font-bold text-[#1A1A1A]">{p.name}</td>
                  <td className="py-3.5 text-gray-600">{p.category}</td>
                  <td className="py-3.5 text-gray-400 line-through">₹ {p.mrp}</td>
                  <td className="py-3.5 font-black text-[#1B5E20]">₹ {p.discountedPrice}</td>
                  <td className="py-3.5 text-gray-600">{p.stock} units</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                      Live
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-black text-[#1A1A1A] mb-1">List New Affordable Essential</h3>
            <p className="text-xs text-gray-500 mb-4">Set fair wholesale community pricing</p>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Sona Masoori Rice (10 kg)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20] bg-white"
                >
                  <option value="Rice">Rice & Grains</option>
                  <option value="Pulses">Pulses & Dals</option>
                  <option value="Oils">Cooking Oils</option>
                  <option value="Spices">Spices & Condiments</option>
                  <option value="Household">Household & Hygiene</option>
                  <option value="Stationery">Youth Educational Supplies</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Market MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    placeholder="350"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sahaaya Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    placeholder="270"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Initial Stock Units</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="200"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-[#1B5E20] rounded-xl hover:bg-[#2E7D32]"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
