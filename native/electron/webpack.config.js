const path = require('path')

module.exports = {
  entry: './localScripts/localViewManager/mainViewRender.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react' ,'@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    }]
  }
}
