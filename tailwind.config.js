/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7E22CE',
          violet: '#8B4DFF',
          deep: '#4C1191',
          acid: '#E2FF66',
          ink: '#141118',
          paper: '#F6F5FA',
          moss: '#1F9A63',
          rose: '#E03A3A',
        },
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        card: '36px',
        inner: '20px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,17,24,.04), 0 24px 60px -24px rgba(76,17,145,.18)',
        purple: '0 40px 100px -30px rgba(126,34,206,.45)',
        acid: '0 20px 50px -20px rgba(226,255,102,.45)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.55', transform: 'scale(.8)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
