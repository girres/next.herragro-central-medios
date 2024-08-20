/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

const customColors = {};

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
