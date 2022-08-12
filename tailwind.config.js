/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#C21010",
        "secondary": "#E64848",
        "tertiary": "#FFFDE3",
        "quaternary": "#CFE8A9",
      }
    },
  },
  plugins: [],
}