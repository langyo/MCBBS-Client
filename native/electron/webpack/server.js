const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

let config = require('./webpack.dev.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function(err, result) {
  if (err) {
    return console.log(err)
  }

  console.log('Listening at http://localhost:3000/')
})
