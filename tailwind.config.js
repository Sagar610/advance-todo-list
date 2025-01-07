/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all files in the src folder
  ],
  theme: {
    extend: {colors: {
      // Define custom colors if you want
    },},
  },
  plugins: [],
};
