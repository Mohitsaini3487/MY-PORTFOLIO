/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          BASE: '#050505',
          SURFACE: '#121212',
          ELEVATED: '#1a1a1a',
        },
        brand: {
          primary: '#A855F7',
          secondary: '#3B82F6',
          accent: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
        'glass-hover': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
      }
    },
  },
  plugins: [],
};
