/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f172a', // Azul medianoche profundo
        accent: '#22c55e', // Verde Python/Terminal para CTAs
        cardBg: '#1e293b', // Color para tarjetas de proyectos
        textMain: '#f8fafc',
        textDim: '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}