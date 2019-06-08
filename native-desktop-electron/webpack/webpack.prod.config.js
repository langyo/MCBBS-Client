const baseConfig = require('./webpack.base.config')
const TerserPlugin = require('terser-webpack-plugin')
const merge = require('webpack-merge')

module.exports = merge({
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  },
}, baseConfig)
