/** @type {import('tailwindcss').Config} */



export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#16A34A',
          dark: '#15803D',
          light: '#DCFCE7'
        },
        status: {
          pending: '#EF4444',
          verified: '#22C55E',
          deleted: '#6B7280',
          alert: '#F59E0B'
        }
      },
      boxShadow: {
        soft: '0 10px 40px rgba(15, 23, 42, 0.08)'
      }
    },
  },
  plugins: []
};
