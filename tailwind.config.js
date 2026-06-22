/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/script.js"],
  theme: {
    extend: {
      colors: {
        olive: '#555b00',
        gold: '#be7f00',
        sand: '#f6efe5',
        carbon: '#1c1c1a',
        surface: '#242422',
        light: '#eae3d5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
