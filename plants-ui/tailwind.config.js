import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00695c',     // Teal
        secondary: '#f2e8ab',   // Sponssor Color
        danger: '#ff7043',      // Orange Red
        warning: '#ffb300',     // Amber
        success: '#4caf50',     // Green
        info: '#0288d1',        // Teal Blue
        accent: '#00695c',      // Teal
        background: '#f5f5f5',  // Light Gray
        text: '#212121',        // Charcoal
      },
      fontFamily: {
        montserrat: [
          'Montserrat',
          'sans-serif',
        ],
        quicksand: [
          'Quicksand',
          'sans-serif',
        ],
        sniglet: [
          'Sniglet',
          'cursive',
        ],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

