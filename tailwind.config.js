module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './enums/**/*.{js, ts, jsx, tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
