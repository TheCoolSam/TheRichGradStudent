/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rgs-gold': '#D4AF37', // More premium gold
        'rgs-navy': '#0F172A',
        'rgs-green': '#065f46',
        'rgs-dark-green': '#064e3b',
        'rgs-black': '#0a0a0a',
        'rgs-off-black': '#1a1a1a',
        'rgs-light-green': '#10b981',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}
