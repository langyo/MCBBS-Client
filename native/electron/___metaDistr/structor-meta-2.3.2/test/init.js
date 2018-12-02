var path = require('path');
var {config} = require('../distr/index.js');

const testPorjectPath = path.join(__dirname, 'test-project-dir');

module.exports = () => {
	return config.init(testPorjectPath, true)
		.then(status => {
			if (status === config.READY) {

			} else {
				throw Error('Config did not load properly...');
			}
		})
};
