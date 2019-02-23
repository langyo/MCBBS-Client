'use strict'
const ora = require('ora')
const chalk = require('chalk')
const webpackConfig = require('./webpack.prod.config')
const path = require('path')
const webpack = require('webpack')

const webpackBuild = async config => {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err)
      resolve(stats)
    })
  })
}

(async () => {
  let spinner = ora('Building...')
  spinner.start()
  let stats = await webpackBuild(webpackConfig)
  spinner.stop()
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
})()
