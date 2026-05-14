/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        darkest: '#0D1B2A',
        dark: '#1B263B',
        base: '#415A77',
        light: '#778DA9',
      },
      neutral: {
        light: '#E0E1DD',
      },

      
    },
    extend: {
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-1': 'span 1 / span 1',
        'span-2': 'span 2 / span 2',
        'span-3': 'span 3 / span 3',
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        'extra-light': '200',
        light: '300',
      },
    },
  },
  plugins: [],
}
