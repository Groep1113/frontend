module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'react-app'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      // allow export default ClassName.. after decorators
      legacyDecorators: true,
    },
  },
  plugins: [],
  rules: {
    // allow jsx in both .js and .jsx extensions.. Because lets keep everything .js
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // Most react packages using higher order components more or less require
    // this to be diabled
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    // This is an unrealistic expectation when using react lifecycle methods
    "class-methods-use-this": 0,
    // 2 space indentation
    "indent": [2, 2],
    "react/jsx-indent": [2, 2]
  },
}
