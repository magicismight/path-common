module.exports = {
  extends: ['alloy', 'alloy/typescript'],
  ignorePatterns: ['test/*.js', 'dist/**/*'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    jest: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    'no-unused-vars': 'error',
    'max-depth': 'off',
    'prefer-const': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    complexity: 'off'
  }
};
