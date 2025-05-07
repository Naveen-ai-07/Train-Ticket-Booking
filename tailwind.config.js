/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f6cbd',
          dark: '#0a4f8a',
          light: '#3a87d0'
        },
        secondary: {
          DEFAULT: '#ec4e20',
          dark: '#c63e19',
          light: '#f17553'
        },
        accent: {
          DEFAULT: '#ffbb00',
          dark: '#cc9500',
          light: '#ffc933'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'card': '0.5rem',
      },
    },
  },
  plugins: [],
} 