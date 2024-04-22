/* eslint-disable prettier/prettier */
module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  ignorePatterns: ["dist/"]
}
