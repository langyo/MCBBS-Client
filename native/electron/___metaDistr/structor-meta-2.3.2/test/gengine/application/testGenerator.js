var {commons, gengine} = require('structor-commons');
var generator = require('../../../.structor/gengine/application/generator.js');

const generatorDataFilePath = './generatorData.json';
const generatorDirPath = '../../../.structor/gengine/application';

let templateData;

return commons.readJson(generatorDataFilePath)
	.then(data => {
		return generator.process(generatorDirPath, data);
	})
	.then(generated => {
		console.log(JSON.stringify(generated, null, 4));
		const {files} = generated;
		if (files && files.length > 0) {
			files.forEach(file => {
				console.log(file.sourceCode);
			});
		}
	})
	.catch(error => {
		console.error(error);
	});