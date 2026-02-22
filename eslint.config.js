import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  typescript: true,
  vue: true,
  jsonc: false,
  yaml: false,
  rules: {
    'curly': ['error', 'multi-line'],
    'ts/no-use-before-define': 'off',
    'ts/explicit-function-return-type': 'off',
    'eqeqeq': 'off',
    'unused-imports/no-unused-vars': ['error', { caughtErrors: 'none' }],
    'style/max-statements-per-line': ['error', {
      max: 2,
    }],
  },
})
