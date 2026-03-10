import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  typescript: true,
  react: true,
  jsx: true,
  vue: false,
  jsonc: false,
  yaml: false,
  markdown: false,
  ignores: [
    '**/fixtures',
    'src/components/ui/**',
  ],
  rules: {
    'curly': ['error', 'multi-line'],
    'no-use-before-define': 'off',
    'eqeqeq': 'off',
    'unused-imports/no-unused-vars': ['error', {
      caughtErrors: 'none',
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    'ts/explicit-function-return-type': 'off',
    'style/max-statements-per-line': ['error', {
      max: 2,
    }],
  },
})
