/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c4961a',
          light: '#d4a82e',
          dark: '#a67e15',
        },
        navy: {
          DEFAULT: '#192332',
          light: '#2a3442',
          dark: '#0f1722',
        },
        teal: {
          DEFAULT: '#0d9488',
          light: '#14b8a6',
          dark: '#0f766e',
        },
        beige: {
          DEFAULT: '#e8dcc4',
          light: '#f0e8d8',
          dark: '#d4c8a8',
        },
      },
    },
  },
  plugins: [],
};
