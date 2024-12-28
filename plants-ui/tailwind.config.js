/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2e8b57',    // Sea Green
        secondary: '#f2e8ab',  // Sponssor Color
        danger: 'ff7043',      // Orange Red
        warning: 'ffb300',     // Amber
        success: '4caf50',     // Green
        info: '0288d1',        // Teal Blue
        accent: '00695c',      // Teal
        background: 'f5f5f5',  // Light Gray
        text: '212121',        // Charcoal
      },
    },
  },
  plugins: [],
}

