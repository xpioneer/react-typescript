
module.exports = {
  'extends': 'stylelint-config-standard',
  'rules': {
    'selector-list-comma-newline-after': 'never-multi-line',
    'value-list-comma-newline-after': 'never-multi-line',
    'selector-pseudo-class-no-unknown': null,
    'declaration-colon-newline-after': null,
    'no-descending-specificity': null,
    'max-empty-lines': 2,
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [/for|while|include/]
    }]
  },
  ignoreFiles: [
    'node_modules/**/*',
    'public/**/*',
    'dist/**/*',
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts'
  ]
}