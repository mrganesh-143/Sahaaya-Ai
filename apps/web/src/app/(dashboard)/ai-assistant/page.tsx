'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Globe, 
  Lightbulb, 
  IndianRupee,
  RefreshCw,
  GraduationCap
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Namaste! 🙏 I am Sahaaya AI, your personal family savings companion and youth counselor. How can I help your family save more money or explore career opportunities today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en' | 'te' | 'hi'>('en');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    "How can I cut ₹1,000 from our monthly kitchen budget?",
    "What free government scholarships are available for 10th/12th students?",
    "How should a family with ₹20,000 monthly income budget for emergencies?",
    "Which courses on Sahaaya guarantee job interviews?"
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const newMsgs = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content })),
          language: lang
        })
      });

      const data = await res.json();
      setMessages([...newMsgs, { role: 'assistant', content: data.message || "Namaste! Thank you for your question. Saving steadily is the key to prosperity." }]);
    } catch {
      setMessages([...newMsgs, { role: 'assistant', content: "Namaste! I'm momentarily offline. A great tip for today: comparing essential prices across local sellers can save up to ₹500 every single week!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto w-full p-4 md:p-8">
      
      {/* Top Banner */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-sm mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#8BC34A] text-white flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-black text-base text-[#1A1A1A]">Sahaaya AI Assistant</h2>
            <p className="text-[10px] text-gray-500">Powered by Google Gemini · Multilingual Financial & Skilling Companion</p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1.5 bg-[#FAFAF7] p-1 rounded-xl border border-gray-200">
          <Globe className="w-3.5 h-3.5 text-[#1B5E20] ml-1.5" />
          <button
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg ${lang === 'en' ? 'bg-[#1B5E20] text-white' : 'text-gray-600'}`}
          >
            English
          </button>
          <button
            onClick={() => setLang('te')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg ${lang === 'te' ? 'bg-[#1B5E20] text-white' : 'text-gray-600'}`}
          >
            తెలుగు
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg ${lang === 'hi' ? 'bg-[#1B5E20] text-white' : 'text-gray-600'}`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 md:p-6 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-[#1B5E20] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Bot className="w-4 h-4 text-[#8BC34A]" />
              </div>
            )}

            <div 
              className={`max-w-2xl px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-[#1B5E20] text-white rounded-tr-none' 
                  : 'bg-[#FAFAF7] text-[#1A1A1A] border border-gray-200 rounded-tl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-500 pl-11">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#1B5E20]" />
            <span>Sahaaya AI is preparing your savings advice...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="flex gap-2 overflow-x-auto py-2.5">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-[#1B5E20] text-[11px] font-semibold text-gray-700 hover:text-[#1B5E20] whitespace-nowrap shadow-sm transition-all"
          >
            <Lightbulb className="w-3 h-3 text-[#8BC34A]" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex gap-2 bg-white p-2 rounded-2xl border border-[#E5E7EB] shadow-sm"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'te' ? 'మీ ప్రశ్నను ఇక్కడ అడగండి...' : lang === 'hi' ? 'अपना प्रश्न यहाँ पूछें...' : 'Ask about savings, pulses prices, courses, or budget planning...'}
          className="flex-1 px-4 py-2 text-xs sm:text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#1B5E20]/20"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
