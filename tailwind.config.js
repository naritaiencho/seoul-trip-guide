/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0A0712',
        night2: '#140D24',
        night3: '#1D1433',
        cream: '#F6EFE3',
        gold: '#E5C374',
        blush: '#FF5C8A',
        violet: '#9D6BFF',
        teal: '#3ED6C0',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        mincho: ['"Shippori Mincho B1"', 'serif'],
        body: ['"Zen Kaku Gothic New"', '"Noto Sans JP"', 'sans-serif'],
        kr: ['"Noto Serif KR"', 'serif'],
      },
    },
  },
  plugins: [],
}
