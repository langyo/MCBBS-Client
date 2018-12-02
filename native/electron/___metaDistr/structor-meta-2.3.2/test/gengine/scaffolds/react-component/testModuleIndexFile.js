var {commons, gengine} = require('structor-commons');
var {getFile} = require('../../../../.structor/gengine/scaffolds/react-component/merge/moduleIndexFile.js');

const generatorDataFilePath = '../../generatorData.json';

let templateData;

commons.readJson(generatorDataFilePath)
	.then(data => {
		return getFile(data);
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