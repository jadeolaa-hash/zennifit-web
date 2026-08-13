/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        salmon: {
          DEFAULT: '#FF6B5B',
          light: '#FF8A7D',
          dark: '#E5533F',
        },
        garnet: {
          DEFAULT: '#B3241C',
          dark: '#7A1712',
        },
        ink: {
          DEFAULT: '#121214',
          raised: '#1C1C1F',
          card: '#232327',
          border: '#2E2E33',
        },
        paper: {
          DEFAULT: '#FAF7F5',
          card: '#FFFFFF',
          border: '#EAE2DF',
        },
        tier: {
          basic: '#8A8F98',
          silver: '#C7CBD1',
          gold: '#E8B84C',
          platinum: '#C9A7F2',
        },
        fg: {
          DEFAULT: '#F5F3F2',
          muted: '#A9A9AE',
          subtle: '#75757C',
        },
        success: '#3FC77A',
      },
      fontFamily: {
        display: ['System'],
      },
    },
  },
  plugins: [],
};
