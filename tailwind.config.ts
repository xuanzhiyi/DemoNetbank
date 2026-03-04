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
          50: '#f5f7ff',
          100: '#e8edff',
          500: '#001E9E',
          600: '#001a7f',
          700: '#001560',
          900: '#000d2e',
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
      },
      textColor: {
        light: '#F0F0F0',
      }
    },
  },
  plugins: [],
} satisfies Config
