module.exports = {
  arrowParens: 'always',
  overrides: [
    {
      files: ['package.json'],
      options: {
        plugins: [require.resolve('prettier-plugin-packagejson')],
      },
    },
    {
      excludeFiles: ['package.json'],
      files: ['*.json'],
      options: {
        jsonRecursiveSort: true,
        plugins: [require.resolve('prettier-plugin-sort-json')],
      },
    },
  ],
  plugins: [],
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
};
