const baseConfig = require('./webpack.base.config')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge({
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server'
  ],
  plugins: [new webpack.HotModuleReplacementPlugin()]
}, baseConfig)
