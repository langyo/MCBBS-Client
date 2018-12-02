var {commons, gengine} = require('structor-commons');
var {getFile} = require('../../../../.structor/gengine/scaffolds/react-component/scripts/index.js');

const generatorDataFilePath = '../../generatorData.json';
const templateFilePath = '../../../../.structor/gengine/scaffolds/react-component/templates/index.tpl';

let templateData;

commons.readFile(templateFilePath)
	.then(data => {
		templateData = data;
		return commons.readJson(generatorDataFilePath);
	})
	.then(data => {
		return getFile(data, templateData);
	})
	.then(generated => {
		// console.log(JSON.stringify(generated, null, 4));
		if (generated && generated.sourceCode) {
			console.log(generated.sourceCode);
		}
	})
	.catch(error => {
		console.error(error);
	});