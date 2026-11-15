import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "SAHAAYA – People's Savings Network",
  description: "Save More. Live Better. Grow Together. Founder & CEO: Gunda Sai Jayanth. An AI-powered social-impact ecosystem for affordable essentials, family savings, youth skilling and employment.",
  keywords: ["Sahaaya", "Savings Network", "Family Budgeting", "Affordable Groceries", "Youth Skilling", "India", "Social Impact"],
  authors: [{ name: "Gunda Sai Jayanth" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#1B5E20",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Telugu:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  );
}
