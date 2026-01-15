/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF385C',           // Rouge Airbnb
        'primary-dark': '#E31C5F',      // Rouge foncé au hover
        'secondary': '#00A699',         // Vert secondaire
        'dark-gray': '#222222',         // Texte principal
        'medium-gray': '#717171',       // Texte secondaire
        'light-gray': '#DDDDDD',        // Bordures claires
        'border-color': '#EBEBEB',      // Bordures
      }
    },
  },
  plugins: [],
}
