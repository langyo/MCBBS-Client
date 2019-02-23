const baseConfig = require('./webpack.base.config')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge({
  mode: 'development',
  watch: true
}, baseConfig)
