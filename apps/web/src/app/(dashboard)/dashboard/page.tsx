'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PiggyBank, 
  IndianRupee, 
  TrendingUp, 
  Target, 
  Plus, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Receipt,
  Calendar
} from 'lucide-react';

export default function DashboardPage() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCat, setExpenseCat] = useState('Groceries');
  const [expenseDesc, setExpenseDesc] = useState('');

  // Prototype state for interactive responsiveness
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Monthly Rice & Pulses Pack', category: 'Groceries', amount: 1250, date: 'Today' },
    { id: 2, title: 'Milk & Dairy Delivery', category: 'Dairy', amount: 480, date: 'Yesterday' },
    { id: 3, title: 'School Notebooks & Pens', category: 'Education', amount: 320, date: '12 Nov' },
    { id: 4, title: 'Cooking Oil (2L Sunflower)', category: 'Oil & Spices', amount: 260, date: '10 Nov' }
  ]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseAmount) return;
    const newExp = {
      id: Date.now(),
      title: expenseDesc || `${expenseCat} purchase`,
      category: expenseCat,
      amount: parseFloat(expenseAmount),
      date: 'Just now'
    };
    setExpenses([newExp, ...expenses]);
    setShowAddExpense(false);
    setExpenseAmount('');
    setExpenseDesc('');
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] p-8 rounded-3xl text-white shadow-xl shadow-[#1B5E20]/15">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#8BC34A] mb-2">
            <span>🇮🇳</span>
            <span>Telangana Family Savings Circle</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Namaste, Sai Kumar! 🙏</h1>
          <p className="text-white/80 text-sm mt-1">
            Your family has saved <strong className="text-[#8BC34A]">₹ 1,420</strong> this month using Sahaaya smart staples and budgeting.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddExpense(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#8BC34A] hover:bg-[#9CCC65] text-[#113B15] font-extrabold text-sm shadow-md transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
          <Link
            href="/marketplace"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#8BC34A]" />
            <span>Shop Essentials</span>
          </Link>
        </div>
      </div>

      {/* 4 Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Monthly Budget</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-[#1B5E20] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#1A1A1A]">₹ 18,000</p>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#1B5E20] h-full rounded-full" style={{ width: '42%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">42% utilized (18 days remaining)</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#1A1A1A]">₹ 7,560</p>
          <p className="text-xs text-green-600 font-bold mt-3 flex items-center gap-1">
            <span>↓ 14% lower than last month</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">₹ 10,440 remaining in budget</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Saved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#1B5E20]">₹ 14,800</p>
          <p className="text-xs text-[#8BC34A] font-bold mt-3">
            All-time family savings
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Direct relief from community bulk rates</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Goals On Track</span>
            <div className="w-8 h-8 rounded-lg bg-lime-50 text-[#1B5E20] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#1A1A1A]">3 Active</p>
          <p className="text-xs text-green-700 font-bold mt-3">
            Children's school fee fund 65%
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Emergency cushion on schedule</p>
        </div>

      </div>

      {/* Main Grid: Goals + Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Savings Goals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black text-[#1A1A1A]">Family Savings Goals</h3>
              <p className="text-xs text-gray-500">Every rupee saved here compounds into security</p>
            </div>
            <button className="text-xs font-bold text-[#1B5E20] hover:underline flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              <span>New Goal</span>
            </button>
          </div>

          <div className="space-y-4">
            
            {/* Goal 1 */}
            <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-[#1B5E20] tracking-wider px-2 py-0.5 rounded-full bg-green-50">
                    Education
                  </span>
                  <h4 className="font-bold text-base text-[#1A1A1A] mt-1">Children's Annual School Fee Fund</h4>
                  <p className="text-xs text-gray-500">Target Date: May 2025</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#1B5E20]">₹ 13,000</span>
                  <span className="text-xs text-gray-400"> / ₹ 20,000</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#1B5E20] h-full rounded-full transition-all" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-2 font-medium">
                <span>65% completed</span>
                <span>₹ 7,000 to go</span>
              </div>
            </div>

            {/* Goal 2 */}
            <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-[#8BC34A] tracking-wider px-2 py-0.5 rounded-full bg-lime-50">
                    Emergency
                  </span>
                  <h4 className="font-bold text-base text-[#1A1A1A] mt-1">Emergency Health & Medicine Reserve</h4>
                  <p className="text-xs text-gray-500">Continuous buffer fund</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#1B5E20]">₹ 8,400</span>
                  <span className="text-xs text-gray-400"> / ₹ 10,000</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#8BC34A] h-full rounded-full transition-all" style={{ width: '84%' }}></div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-2 font-medium">
                <span>84% completed</span>
                <span>₹ 1,600 to go</span>
              </div>
            </div>

            {/* Goal 3 */}
            <div className="p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-blue-700 tracking-wider px-2 py-0.5 rounded-full bg-blue-50">
                    Home Improvement
                  </span>
                  <h4 className="font-bold text-base text-[#1A1A1A] mt-1">Roof Repair & Monsoon Prep</h4>
                  <p className="text-xs text-gray-500">Target Date: June 2025</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#1B5E20]">₹ 4,200</span>
                  <span className="text-xs text-gray-400"> / ₹ 15,000</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: '28%' }}></div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-2 font-medium">
                <span>28% completed</span>
                <span>₹ 10,800 to go</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Col: AI Tip & Recent Expenses */}
        <div className="space-y-6">
          
          {/* Sahaaya AI Tip */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#113B15] to-[#1B5E20] text-white shadow-md">
            <div className="flex items-center gap-2 text-[#8BC34A] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Sahaaya AI Daily Tip</span>
            </div>
            <h4 className="font-bold text-base mb-2">Save ₹ 320 on Cooking Oil</h4>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              "Buying loose retail pouches costs ₹ 145/litre. Switching to Sahaaya verified 5L cold-pressed can drops your unit rate to ₹ 118/litre."
            </p>
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8BC34A] hover:underline"
            >
              <span>Ask AI for custom budget audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Recent Expenses List */}
          <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-base text-[#1A1A1A]">Recent Expenses</h4>
              <span className="text-xs text-gray-400">{expenses.length} records</span>
            </div>

            <div className="space-y-3.5">
              {expenses.map((exp) => (
                <div key={exp.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-xs text-[#1A1A1A]">{exp.title}</p>
                    <span className="text-[10px] text-gray-400">{exp.category} · {exp.date}</span>
                  </div>
                  <span className="font-bold text-xs text-red-600">
                    - ₹ {exp.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB]">
            <h3 className="text-xl font-black text-[#1A1A1A] mb-1">Add Family Expense</h3>
            <p className="text-xs text-gray-500 mb-4">Log daily expenses to keep your monthly savings on target</p>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Amount (₹)</label>
                <input 
                  type="number"
                  required
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="e.g. 450"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                <select
                  value={expenseCat}
                  onChange={(e) => setExpenseCat(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20] bg-white"
                >
                  <option value="Groceries">Groceries & Staples</option>
                  <option value="Dairy">Dairy & Milk</option>
                  <option value="Vegetables">Vegetables & Fruits</option>
                  <option value="Education">Children Education</option>
                  <option value="Healthcare">Medicines & Healthcare</option>
                  <option value="Transport">Transport & Fuel</option>
                  <option value="Utilities">Electricity & Gas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description (Optional)</label>
                <input 
                  type="text"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                  placeholder="e.g. Toor Dal 2kg and Spices"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-[#1B5E20] rounded-xl hover:bg-[#2E7D32]"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
