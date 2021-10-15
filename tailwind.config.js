module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        vermilion: {
          50: '#FFE7DE',
          100: '#FFD5C4',
          200: '#FFB191',
          300: '#FF8C5E',
          400: '#FF682B',
          500: '#F74700',
          600: '#C43800',
          700: '#912A00',
          800: '#5E1B00',
          900: '#2B0C00'
        },
        envy: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#E4EAE3',
          300: '#C9D4C6',
          400: '#ADBEA9',
          500: '#91A88C',
          600: '#75926F',
          700: '#5E7559',
          800: '#475843',
          900: '#2F3B2D'
        },
        sandal: {
          50: '#FFFFFF',
          100: '#F6F2EF',
          200: '#E2D7D0',
          300: '#CFBCB0',
          400: '#BBA291',
          500: '#A88771',
          600: '#8F6D57',
          700: '#6F5544',
          800: '#4F3D31',
          900: '#30251D'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
