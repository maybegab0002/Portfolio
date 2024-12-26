/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
      },
      colors: {
        'black': '#0f0f0f',
      },
      spacing: {
        '128': '32rem',
      },
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
}
