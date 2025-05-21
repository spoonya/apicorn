// tailwind.config.js
import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui()],
};

export default config;
