module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Enables eslint-config-prettier which disables ESLint rules conflicting with Prettier
  ],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error', // Shows Prettier formatting errors in ESLint
    'react/react-in-jsx-scope': 'off', // Disable 'React must be in scope' rule for React 17+
    // Add other custom rules as needed
  },
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
}
