/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lilac: {
                    50: '#FAF5FF',
                    100: '#F3E8FF',
                    200: '#E9D5FF',
                    300: '#D8B4FE',
                    400: '#C084FC',
                    500: '#A855F7',
                    600: '#9333EA',
                    700: '#7E22CE',
                    800: '#6B21A8',
                    900: '#581C87',
                },
                lavender: {
                    soft: '#EBE4FF',
                    deep: '#4C1D95'
                }
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Poppins', 'sans-serif'],
                handwriting: ['Dancing Script', 'cursive'],
            },
            animation: {
                'float-slow': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2.5s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-10px) rotate(2deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(192, 132, 252, 0.4))' },
                    '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.8))' },
                }
            }
        },
    },
    plugins: [],
}