/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#071C16',
        'deep-emerald': '#0B3D2E',
        emerald: {
          DEFAULT: '#12A875',
          50: '#F0FDF8',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#8DE0BE',
          400: '#34D399',
          500: '#12A875',
          600: '#0E8A60',
          700: '#0B6D4C',
          800: '#0B3D2E',
          900: '#071C16',
          950: '#04120E',
        },
        mint: '#8DE0BE',
        gold: {
          DEFAULT: '#D6B56D',
          light: '#EAD7A5',
          dark: '#B08E46',
        },
        ivory: '#F4F1E8',
        sage: '#A8B8B0',
        nw: {
          green: '#12A875',
          deep: '#0B3D2E',
          dark: '#071C16',
          soft: '#EAF7EF',
          border: 'rgba(214, 181, 109, 0.2)',
          muted: '#A8B8B0',
          error: '#C62828',
          hover: '#0E8A60',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
