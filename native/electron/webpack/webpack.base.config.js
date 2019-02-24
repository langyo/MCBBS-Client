const path = require('path')

module.exports = {
  entry: './localScripts/localViewManager/mainViewRender.js',
  target: 'electron-renderer',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
}
