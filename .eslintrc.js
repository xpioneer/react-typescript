module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect'
    }
  },
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
    // 'project': './tsconfig.json'
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    // 'prettier'
  ],
  'rules': {
    'no-undef': 0,
    // 'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 2, 'never' ],
    'no-unused-vars': 'off',
    'prefer-spread': 0,
    'prefer-const': 0,
    'switch-colon-spacing': [2, {'after': true, 'before': true}],
    'default-case': 2,
    'no-spaced-func': 2,
    'no-case-declarations': 0,
    // react jsx
    'react/display-name': 0,
    'react/jsx-filename-extension': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-indent': [ 'error', 2 ],
    'react/jsx-indent-props': [2, 2],

    // @typescript-eslint 
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/class-name-casing': 0,
  }
};