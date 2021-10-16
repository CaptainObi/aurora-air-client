module.exports = {
  '*.{js,jsx}': ['eslint --cache --fix'],
  '*.{ts,tsx}': [
    () => 'bash -c tsc --skipLibCheck --noEmit',
    'eslint --cache --fix',
  ],
};
