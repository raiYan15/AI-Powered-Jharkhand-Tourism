/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50:  '#f9fefc',
          100: '#e6f4ea',
          200: '#c2ebce',
          300: '#a1e3b4',
          400: '#6ed49c',
          500: '#34a853',
          600: '#2d8e46',
          700: '#237a38',
          800: '#1a5c2b',
          900: '#103e1d',
        },
      },
      animation: {
        spinSlow: "spin 20s linear infinite",
        float: "float 3s ease-in-out infinite",
        'scroll-x': 'scroll-x 40s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
      'text-shimmer': 'shimmer 2.5s infinite linear',
      'glow': 'glow 2.5s infinite ease-in-out',
      'pulse-border': 'pulseBorder 2s infinite',
      'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px #fb923c, 0 0 20px #fb923c' },
          '50%': { boxShadow: '0 0 15px #fdba74, 0 0 30px #fdba74' },
        },
        pulseBorder: {
          '0%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
          '100%': { opacity: 0.5, transform: 'scale(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  backgroundImage: {
    'gradient-shimmer': 'linear-gradient(90deg, #fef2f2, #ffe4e6, #fef2f2)',
  },
  plugins: [],
};
