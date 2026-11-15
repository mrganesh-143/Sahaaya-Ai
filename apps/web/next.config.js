/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  // Expose BACKEND_URL (injected by Vercel binding) to Next.js server components
  // and API routes as NEXT_PUBLIC_BACKEND_URL for client-side usage.
  // Falls back to localhost:8000 when running outside Vercel (local dev).
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8000',
  },

  // Proxy /api/* to the FastAPI backend so the browser never needs to know the
  // internal service URL (also works with `vercel dev`).
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },

  // i18n is handled by next-intl middleware
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr'],
  },
};

module.exports = nextConfig;
