/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        extend: {
            colors: {
                'orange-600': 'oklch(0.64 0.22 29.57)',
                'orange-500': 'oklab(0.7 0.16 0.12)',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
        },
    },
    plugins: [],
}
