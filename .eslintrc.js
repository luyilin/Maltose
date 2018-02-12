module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-console": "off",
    "no-undef": "off"
  }
}
