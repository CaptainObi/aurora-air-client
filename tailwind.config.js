module.exports = {
  mode: 'jit',
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'display': 'Montserrat',
        'sans': 'Roboto',
        'mono': 'Space Mono'
      },
      colors: {
        'aurora-pink': '#9F35F0',
        'aurora-purple': '#743DFA',
        'aurora-deep-blue': '#4343E0',
        'aurora-blue': '#3E71F7',
        'aurora-teal': '#3B9DED'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
