/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

const customColors = {
  'yellow-1': '#F5D834',
  'red-1': '#DA0023',
};

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      colors: Object.assign(colors, customColors),
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require('daisyui')],
};
