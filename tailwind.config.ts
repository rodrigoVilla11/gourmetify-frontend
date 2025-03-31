import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
    './src/app/globals.css', // Ag
  ],
  theme: {
    extend: {
      colors: {
        border: '#E5E7EB',
        input: '#E5E7EB',
        ring: '#144336',
        background: '#FBFAF7',
        foreground: '#000000',
        primary: {
          DEFAULT: '#144336',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FBBF24',
          foreground: '#000000',
        },
        muted: {
          DEFAULT: '#6B7280',
          foreground: '#374151',
        },
        accent: {
          DEFAULT: '#FBFAF7',
          foreground: '#144336',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Albert Sans', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        strong: '0px 8px 20px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
