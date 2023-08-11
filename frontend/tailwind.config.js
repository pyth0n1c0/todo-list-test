/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xm: '350px',
      sm: '500px',
    },
    
    extend: {
      colors: {
        'bg': '#9C8EF6',
        'title': '#5A48CA',
        'text': '#100841',
        'placeholder': '#888599',
        'emphasis': '#6F5ED8',
      },

      fontFamily: {
        'title': ['Poppins', 'sans-serif'],
        'text': ['Open Sans', 'sans-serif']
      },
  },
  plugins: [],
}}