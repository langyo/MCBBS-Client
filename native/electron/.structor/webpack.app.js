/**
 * Application specific configuration options for Webpack.
 * This file will not be updated after the Structor's next installation
 */

var config = require('./config.js');
module.exports = require('./webpack.base.js')(config);
