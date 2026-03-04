import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e6ecff',
          500: '#1a237e',
          600: '#0d1b5e',
          700: '#0a1645',
          900: '#050b2f',
        },
        pink: {
          400: '#f06292',
          500: '#e91e63',
          600: '#c2185b',
          700: '#ad1457',
        }
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config
