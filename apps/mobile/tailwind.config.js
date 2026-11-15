/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B5E20',
          light: '#2E7D32',
          dark: '#145214',
        },
        accent: {
          DEFAULT: '#8BC34A',
          light: '#AED581',
          dark: '#689F38',
        },
        background: '#FAFAF7',
        surface: '#FFFFFF',
        sahaaya: {
          green: '#1B5E20',
          'green-light': '#2E7D32',
          lime: '#8BC34A',
          cream: '#FAFAF7',
          white: '#FFFFFF',
          error: '#D32F2F',
          warning: '#F57C00',
          info: '#0288D1',
          success: '#388E3C',
          'text-primary': '#1A1A1A',
          'text-secondary': '#6B7280',
          'text-muted': '#9CA3AF',
          border: '#E5E7EB',
          'border-light': '#F3F4F6',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'System'],
        'heading': ['Inter-Bold', 'System'],
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};
