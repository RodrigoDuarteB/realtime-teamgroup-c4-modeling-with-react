module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#ff7043',
        'primary-light': '#ffa270',
        'primary-dark': '#c63f17',
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
