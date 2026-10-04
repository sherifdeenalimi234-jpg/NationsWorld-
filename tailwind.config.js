/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#071C16',
        'deep-emerald': '#0B3D2E',
        emerald: '#12A875',
        mint: '#8DE0BE',
        gold: {
          DEFAULT: '#D6B56D',
          light: '#E6C98A',
          dark: '#B5944C',
        },
        ivory: '#F4F1E8',
        sage: '#A8B8B0',
        // Legacy fallbacks mapped to premium palette
        'nw-deep': '#0B3D2E',
        'nw-green': '#12A875',
        'nw-soft': '#071C16',
        'nw-dark': '#F4F1E8',
        'nw-muted': '#A8B8B0',
        'nw-border': 'rgba(214, 181, 109, 0.2)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glass-dark': '0 20px 40px -15px rgba(7, 28, 22, 0.7)',
        'emerald-glow': '0 0 30px -5px rgba(18, 168, 117, 0.3)',
        'gold-glow': '0 0 25px -5px rgba(214, 181, 109, 0.25)',
      },
    },
  },
  plugins: [],
};
