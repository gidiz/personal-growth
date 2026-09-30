/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // Not theming yet: 'media' makes NativeWind throw when expo-router sets the colour scheme.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb',
          pressed: '#1d4ed8',
        },
        surface: '#ffffff',
        ink: {
          DEFAULT: '#18181b',
          muted: '#52525b',
          inverted: '#ffffff',
        },
        disabled: '#d4d4d8',
        focus: '#0f172a',
      },
      spacing: {
        // 44 is the minimum mobile touch target this project commits to.
        'touch-min': '44px',
      },
      borderRadius: {
        control: '10px',
      },
    },
  },
  plugins: [],
};
