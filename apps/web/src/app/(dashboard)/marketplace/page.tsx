'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Tag
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  mrp: number;
  discountedPrice: number;
  seller: string;
  verified: boolean;
  imageColor: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Unpolished Toor Dal', category: 'Pulses', unit: '1 kg', mrp: 185, discountedPrice: 142, seller: 'Telangana Farmers Co-Op', verified: true, imageColor: 'from-amber-500 to-yellow-600' },
  { id: '2', name: 'Sona Masoori Raw Rice (Aged 2 Yrs)', category: 'Rice', unit: '5 kg', mrp: 360, discountedPrice: 285, seller: 'Godavari Direct Millers', verified: true, imageColor: 'from-emerald-500 to-green-600' },
  { id: '3', name: 'Cold Pressed Sunflower Oil', category: 'Oils', unit: '1 Litre', mrp: 165, discountedPrice: 124, seller: 'Kisan Natural Oils', verified: true, imageColor: 'from-yellow-400 to-amber-500' },
  { id: '4', name: 'Whole Moong Dal (High Protein)', category: 'Pulses', unit: '1 kg', mrp: 145, discountedPrice: 110, seller: 'Sahaaya Community Co-op', verified: true, imageColor: 'from-green-600 to-emerald-700' },
  { id: '5', name: 'Iodized Crystal Salt & Fine Salt Pack', category: 'Essentials', unit: '2 kg Combo', mrp: 48, discountedPrice: 28, seller: 'Coastal Salt Works', verified: true, imageColor: 'from-blue-400 to-indigo-500' },
  { id: '6', name: 'Guntur Red Chilli Powder (Pure)', category: 'Spices', unit: '500 g', mrp: 190, discountedPrice: 135, seller: 'Guntur Direct Spices', verified: true, imageColor: 'from-red-500 to-rose-600' },
  { id: '7', name: 'Organic Turmeric Powder (Curcumin 3%)', category: 'Spices', unit: '500 g', mrp: 120, discountedPrice: 85, seller: 'Nizamabad Farmers Trust', verified: true, imageColor: 'from-yellow-500 to-orange-500' },
  { id: '8', name: 'Kabuli Chana (Big Grain)', category: 'Pulses', unit: '1 kg', mrp: 160, discountedPrice: 125, seller: 'Telangana Farmers Co-Op', verified: true, imageColor: 'from-stone-400 to-amber-700' },
  { id: '9', name: 'School Student Note Book Pack (6 Long)', category: 'Stationery', unit: 'Pack of 6', mrp: 270, discountedPrice: 160, seller: 'Sahaaya Youth Education', verified: true, imageColor: 'from-purple-500 to-indigo-600' }
];

export default function MarketplacePage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = ['All', 'Pulses', 'Rice', 'Oils', 'Spices', 'Essentials', 'Stationery'];

  const filteredProducts = SAMPLE_PRODUCTS.filter(p => {
    const matchCat = selectedCat === 'All' || p.category === selectedCat;
    const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const copy = { ...prev };
      if (copy[id] > 1) {
        copy[id] -= 1;
      } else {
        delete copy[id];
      }
      return copy;
    });
  };

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = SAMPLE_PRODUCTS.find(item => item.id === id);
    return sum + (p ? p.discountedPrice * qty : 0);
  }, 0);

  const cartMrpTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = SAMPLE_PRODUCTS.find(item => item.id === id);
    return sum + (p ? p.mrp * qty : 0);
  }, 0);

  const totalSavedInCart = cartMrpTotal - cartTotal;

  const handleCheckout = () => {
    setOrderSuccess(true);
    setCart({});
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Header & Cart Trigger */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-[#1B5E20] text-xs font-bold mb-1">
            <Tag className="w-3.5 h-3.5 text-[#8BC34A]" />
            <span>Direct MSME & Co-Op Sourcing</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A1A1A]">Affordable Essentials Marketplace</h1>
          <p className="text-xs text-gray-500">Quality tested groceries up to 35% below retail MRP</p>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold text-sm shadow-md shadow-[#1B5E20]/20"
        >
          <ShoppingBag className="w-4 h-4 text-[#8BC34A]" />
          <span>My Basket</span>
          {cartItemCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#8BC34A] text-[#113B15] font-black text-xs flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Search & Categories Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-[#E5E7EB]">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dal, rice, oil..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#1B5E20]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-[#1B5E20] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const savings = product.mrp - product.discountedPrice;
          const savingsPercent = Math.round((savings / product.mrp) * 100);
          const inCartQty = cart[product.id] || 0;

          return (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#1B5E20] transition-all p-5 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Visual Placeholder Header */}
                <div className={`w-full h-36 rounded-xl bg-gradient-to-br ${product.imageColor} flex items-center justify-center text-white font-extrabold text-2xl relative mb-4 shadow-inner`}>
                  <span>{product.name.split(' ')[0]}</span>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                    Save {savingsPercent}%
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 mb-1">
                  <span>{product.seller}</span>
                  {product.verified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1B5E20]" />
                  )}
                </div>

                <h3 className="font-bold text-sm text-[#1A1A1A] line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{product.unit}</p>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-black text-[#1B5E20]">₹ {product.discountedPrice}</span>
                  <span className="text-xs text-gray-400 line-through">₹ {product.mrp}</span>
                  <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                    Save ₹ {savings}
                  </span>
                </div>

                {inCartQty === 0 ? (
                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-[#1B5E20] text-[#1B5E20] hover:text-white font-bold text-xs border border-gray-200 hover:border-[#1B5E20] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Basket</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-1.5">
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      className="p-1 rounded-md bg-white text-[#1B5E20] hover:bg-gray-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-extrabold text-xs text-[#1B5E20]">{inCartQty} in basket</span>
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="p-1 rounded-md bg-[#1B5E20] text-white hover:bg-[#2E7D32]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl animate-slide-left">
            
            {/* Header */}
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#1B5E20]" />
                  <h3 className="text-lg font-black text-[#1A1A1A]">Your Savings Basket</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100 max-h-[50vh] overflow-y-auto mt-4">
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-xs">
                    Your basket is empty. Add staples to see your collective savings!
                  </div>
                ) : (
                  Object.entries(cart).map(([id, qty]) => {
                    const p = SAMPLE_PRODUCTS.find(item => item.id === id);
                    if (!p) return null;
                    return (
                      <div key={id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-xs text-[#1A1A1A]">{p.name}</p>
                          <span className="text-[10px] text-gray-400">₹ {p.discountedPrice} × {qty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#1B5E20]">
                            ₹ {p.discountedPrice * qty}
                          </span>
                          <button 
                            onClick={() => removeFromCart(id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom Checkout Details */}
            {Object.keys(cart).length > 0 && (
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="bg-green-50 p-3 rounded-xl flex justify-between items-center text-xs text-[#1B5E20] font-bold">
                  <span>Direct Savings with Sahaaya:</span>
                  <span>₹ {totalSavedInCart} Saved</span>
                </div>

                <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                  <span>Subtotal:</span>
                  <span>₹ {cartTotal}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Community Delivery:</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center text-base font-black text-[#1A1A1A] pt-1">
                  <span>Final Total:</span>
                  <span>₹ {cartTotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold text-sm shadow-md"
                >
                  Confirm Community Order
                </button>
                <p className="text-[10px] text-center text-gray-400">
                  Architecture ready for Razorpay. Prototype mode active.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-green-100 text-[#1B5E20] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] mb-2">Order Confirmed! 🎉</h3>
            <p className="text-xs text-gray-600 mb-6">
              Your grocery bundle has been scheduled for collective community dispatch. You saved on middleman markups!
            </p>
            <button
              onClick={() => { setOrderSuccess(false); setIsCartOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-[#1B5E20] text-white font-bold text-xs"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
