'use strict'

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false, useBuiltIns: 'entry'}],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/proposal-object-rest-spread', {loose: true}],
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel',
  ],
}
