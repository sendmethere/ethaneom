/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#76020E',
          dark: '#370001',
          foreground: '#FFFFFF',
        },
        bg: {
          deep: '#DAC8B5',
          light: '#EDE3DA',
        },
        text: {
          DEFAULT: '#222222',
          muted: '#6B6B6B',
        },
      },
      fontFamily: {
        pretendard: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        heading: '-0.02em',
      },
      lineHeight: {
        heading: '1.2',
        body: '1.7',
      },
    },
  },
  plugins: [],
}
