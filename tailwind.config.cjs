/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        streak: '0 0 50px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
