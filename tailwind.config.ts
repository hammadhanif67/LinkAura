import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        aura: {
          bg: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
          hover: 'var(--bg-hover)',
          red: 'var(--accent-red)',
          pink: 'var(--accent-pink)',
          purple: 'var(--accent-purple)',
          text: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
          border: 'var(--border)',
        },
      },
      boxShadow: {
        aura: '0 18px 45px rgba(15, 23, 42, 0.10)',
        glow: '0 20px 60px rgba(239, 68, 68, 0.18)',
      },
    },
  },
  plugins: [],
} satisfies Config;
