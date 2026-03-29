const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandTeal: {
          50: '#ecfdfd',
          100: '#cffaf9',
          200: '#a0f3f1',
          300: '#67e8e6',
          400: '#2dd4d7',
          500: '#1CC1C3',
          600: '#179fa3',
          700: '#147f83',
          800: '#155f63',
          900: '#164f52',
          950: '#052c2f',
          DEFAULT: '#1CC1C3',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'steth-hero': 'linear-gradient(to bottom right, #eff6ff, #ffffff, #f0fdfa)',
        'steth-cta': 'linear-gradient(to right, #1e40af, #0f766e)',
        'steth-footer': 'linear-gradient(to bottom, #1e293b, #0f172a)',
      },
    },
  },
  plugins: [],
}
