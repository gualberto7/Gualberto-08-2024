/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2196f3',
        secondary: '#b88bf5',
        success: '#4caf50',
        warning: '#fb8c00',
        danger: '#c51162'
      }
    }
  },
  plugins: []
}
