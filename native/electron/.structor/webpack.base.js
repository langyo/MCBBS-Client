/**
 * COMMON STRUCTOR WEBPACK CONFIGURATION
 */

var path = require('path');
var webpack = require('webpack');

module.exports = (options) => ({
	// Add hot reloading in development
	entry: [
		'react-hot-loader/patch',
		'eventsource-polyfill', // Necessary for hot reloading with IE
		'webpack-hot-middleware/client?path=/structor-dev/a&timeout=2000&overlay=false&noInfo=true',
		path.join(process.cwd(), '.structor/src/default.js'), // Start
	],

	output: {
		path: path.join(process.cwd(), '.structor/desk/__build__'),
		filename: 'bundle.js',
		publicPath: '/structor-dev/__build__',
	},

	module: {
		loaders: [{
			test: /\.js$/, // Transform all .js files required somewhere with Babel
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				plugins: ['react-hot-loader/babel'],
				presets: [
					[
						'es2015',
						{
							modules: false
						}
					],
					'react',
					'stage-0',
				]
			},
		}, {
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader'],
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			loader: 'file-loader',
		}, {
			test: /\.html$/,
			loader: 'html-loader',
		}, {
			test: /\.json$/,
			loader: 'json-loader',
		}, {
			test: /\.mp4$/,
			loader: 'url?limit=10000&mimetype=video/mp4',
		}, {
			test: /\.webm$/,
			loader: 'url?limit=10000&mimetype=video/webm',
		}],
	},

	plugins: [

		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ProvidePlugin({
			// make fetch available
			fetch: 'exports?self.fetch!whatwg-fetch',
		}),

		// Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
		// inside your code for any environment checks; UglifyJS will automatically
		// drop any unreachable code.
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),

	],

	resolve: {
		modules: [path.resolve(__dirname, '../' + options.srcPath), 'node_modules'],
		extensions: [
			'.js',
			'.jsx',
			'.react.js',
		],
		mainFields: [
			'browser',
			'jsnext:main',
			'main',
		],
	},

	// Emit a source map for easier debugging
	devtool: 'cheap-module-eval-source-map',
	target: 'web', // Make web variables accessible to webpack, e.g. window
	stats: false, // Don't show stats in the console
	performance: {
		hints: false
	},
});
