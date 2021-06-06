module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Open Sans'],
      },
      colors: {
        'outer-space': {
          DEFAULT: '#2A3135',
          50: '#98A5AD',
          100: '#8999A2',
          200: '#6E808A',
          300: '#57666E',
          400: '#414B51',
          500: '#2A3135',
          600: '#131719',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        'picton-blue': {
          DEFAULT: '#4BADDF',
          50: '#FFFFFF',
          100: '#F8FCFE',
          200: '#CDE8F6',
          300: '#A2D4EE',
          400: '#76C1E7',
          500: '#4BADDF',
          600: '#2597D2',
          700: '#1E78A6',
          800: '#16597B',
          900: '#0E3A50',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
