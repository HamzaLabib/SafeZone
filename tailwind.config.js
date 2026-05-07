/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        academyBlue: '#1d5cff',
        academyNavy: '#020d2d',
      },
    },
  },
  plugins: [],
};
