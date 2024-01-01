import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/*.md', '**/*.md/*.*', 'dist/', 'public/', '**/dist/**/', 'node_modules', '**/node_modules/**', 'node_modules/', '**/node_modules/**/', 'patches/', '**/patches/**/', 'types/', '**/types/**/', 'cache/', '**/cache/**/', '!packages/.vitepress', '!packages/.vitepress/**', '!.eslintrc.js', '!.eslintrc.js/**', '!rollup.config.js', '!rollup.config.js/**', '!.test', '!**/.test/**', '.temp', '**/.temp/**'],
}, {
  rules: {
    'vue/no-deprecated-functional-template': 'off',
    'vue/one-component-per-file': 'off',
    'vue/no-template-shadow': 'off',
    'vue/require-prop-types': 'off',
    'vue/dot-location': 'off',
    'spaced-comment': ['error', 'always', { exceptions: ['#__PURE__'] }],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../**/core', '../**/vue3'],
      },
    ],
    'vue/eqeqeq': 'off',
    'vue/space-unary-ops': 'off',
    'vue/comma-dangle': ['error', 'only-multiline'],
    'node/no-callback-literal': 'off',
    'import/namespace': 'off',
    'eqeqeq': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'curly': ['error', 'multi-line'],
    'max-statements-per-line': ['error', {
      max: 1,
    }],
  },
}, {
  files: ['demo.vue', 'demo.client.vue', 'scripts/*.ts', '**/*.test.ts'],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
