/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00695c', // Teal
                secondary: '#f2e8ab', // Sponssor Color
                danger: '#ff3817', // Orange Red
                warning: '#ffb300', // Amber
                success: '#4caf50', // Green
                info: '#0288d1', // Teal Blue
                background: '#f5f5f5', // Light Gray
                text: '#212121',
            },
            backgroundImage: {
                'leaf-wall': "url('/leafs_bg.png')",
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                quicksand: ['Quicksand', 'sans-serif'],
                sniglet: ['Sniglet', 'cursive'],
            },
        },
    },
};
