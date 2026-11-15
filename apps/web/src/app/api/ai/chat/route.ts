import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages, language = 'en' } = await req.json();

    // 1. Call backend service via internal binding URL if available (runtime function)
    const backendUrl = process.env.BACKEND_URL;
    if (backendUrl) {
      try {
        const backendEndpoint = new URL('/ai/chat', backendUrl);
        const backendRes = await fetch(backendEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: messages.map((m: any) => ({
              role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
              content: m.content
            })),
            language
          })
        });

        if (backendRes.ok) {
          const backendData = await backendRes.json();
          return NextResponse.json({
            message: backendData.message,
            language: backendData.language || language,
            session_id: backendData.session_id
          });
        }
      } catch (err) {
        console.warn('Backend service call via BACKEND_URL failed, falling back to direct handler:', err);
      }
    }

    // 2. Direct Gemini fallback
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        message: "Namaste! I am Sahaaya AI. To enable live conversational intelligence with Google Gemini 1.5 Pro, please configure your GEMINI_API_KEY in .env.local. In the meantime: you can save an estimated ₹400-600 every month by buying unpolished pulses in 5kg community bulk packs directly through our marketplace!",
        language
      });
    }

    const systemPrompt = `You are Sahaaya AI, a compassionate financial and lifestyle advisor for Indian families. Founder & CEO of SAHAAYA is Gunda Sai Jayanth.
Tagline: Save More. Live Better. Grow Together.
Languages: English, Telugu, Hindi. Current language is: ${language}.
Provide practical, culturally grounded savings suggestions, Indian grocery staples advice, budgeting frameworks, and free youth skill opportunities. Always use the Indian Rupee symbol (₹).`;

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: "Understood! I am Sahaaya AI, ready to assist Indian families with savings, budgeting, and youth opportunities." }] },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))
    ];

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({
        message: "Namaste! Sahaaya AI is temporarily running in smart local mode. Always keep 3-6 months of essential grocery and medical buffer in your savings goals.",
        detail: errText,
        language
      });
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Namaste! How can I assist you with your family savings today?";

    return NextResponse.json({
      message: candidateText,
      language
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: "Namaste! An unexpected error occurred. Please try asking again.", error: error?.message },
      { status: 500 }
    );
  }
}
