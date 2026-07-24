/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0f19',
        charcoal: {
          900: '#0f172a',
          800: '#131c2c',
          700: '#1e293b',
        },
        clinical: {
          blue: '#3b82f6',
          blueHover: '#60a5fa',
          teal: '#14b8a6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
