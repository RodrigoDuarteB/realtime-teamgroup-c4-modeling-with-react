module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#d1c4e9',
        'primary-light': '#fff7ff',
        'primary-dark': '#a094b7',
        'secondary': '#f5f5f5',
        'secondary-light': '#ffffff',
        'secondary-dark': '#c2c2c2',
      }
    },
    maxWidth: {
      '4/5': '80%'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
