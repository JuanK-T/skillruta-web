/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: { xs: '480px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    extend: {
      colors: {
        primary: '#0D1B3E', // Azul oscuro
        secondary: '#D43B3B', // Rojo
        neutral: '#FFFFFF',
        accent: '#2A3D8C', // Azul violáceo
      },
    },
  },
  plugins: [],
};
