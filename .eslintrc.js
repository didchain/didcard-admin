// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: [
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/prettier',
    'prettier/standard',
    'prettier/vue',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-tabs': ['error', { allowIndentationTabs: true }],
    //
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'vue/array-bracket-spacing': 'warn',
    'vue/arrow-spacing': 'warn',
    'vue/block-spacing': 'warn',
    'vue/brace-style': 'warn',
    'vue/camelcase': 'warn',
    'vue/comma-dangle': 'warn',
    'vue/component-name-in-template-casing': 'off', // 'warn',
    'vue/dot-location': 'warn',
    'vue/eqeqeq': 'warn',
    'vue/key-spacing': 'warn',
    'vue/keyword-spacing': 'warn',
    'vue/match-component-file-name': 'warn',
    'vue/no-boolean-default': 'off',
    'vue/no-deprecated-scope-attribute': 'warn',
    'vue/no-empty-pattern': 'warn',
    'vue/no-restricted-syntax': 'warn',
    'vue/no-unused-components': 'off',
    'vue/object-curly-spacing': 'warn',
    'vue/require-direct-export': 'warn',
    'vue/html-self-closing': 'off',
    'vue/space-infix-ops': 'warn',
    'vue/space-unary-ops': 'warn',
    'vue/v-on-function-call': 'warn',
    'vuetify/no-deprecated-classes': 'off',
    'vuetify/grid-unknown-attributes': 'off',
    'vuetify/no-legacy-grid': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/v-slot-style': 'off',
    'vue/object-curly-spacing': 'off',
    'vue/no-v-html': 'warn',
    "vue/html-indent":"off",
    'vue/script-indent': [
      'warn',
      2,
      {
        baseIndent: 0,
        switchCase: 0,
      },
    ],
    indent: 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
};
