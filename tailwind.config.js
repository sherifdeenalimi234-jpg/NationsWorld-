/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nw: {
          green: '#16834B',
          deep: '#0B5D36',
          dark: '#17211B',
          soft: '#EAF7EF',
          border: '#D9E4DD',
          muted: '#65736B',
          error: '#C62828',
          hover: '#126c3e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
