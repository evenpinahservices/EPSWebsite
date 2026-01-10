/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1a2b4b',
        'secondary-accent': '#808c5a',
        'highlight-gold': '#b7965c',
        'background-light': '#efeee5',
      },
      fontFamily: {
        serif: ['Lora', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Roboto', 'Public Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

