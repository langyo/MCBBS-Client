import {forOwn, template, has} from 'lodash';
import path from 'path';
import {commons} from 'structor-commons';

export function getFile(dataObject, templateText) {

	const {index, project} = dataObject;

	if (!has(project, 'paths.sandboxDirPath')) {
		throw Error('Wrong project configuration. \'dir\' field is missing.');
	}

	const absoluteFilePathPath = path.join(project.paths.sandboxDirPath, 'index.js');
	const templateObject = {
		componentName: 'App'
	};
	let resultSource;
	try {
		resultSource = template(templateText)(templateObject);
	} catch (e) {
		throw Error('lodash template error. ' + e);
	}

	try {
		resultSource = commons.formatJs(resultSource);
		resultSource = resultSource.replace(/(^\s*[\r\n]){2,}/gm, "\n");
	} catch (e) {
		throw Error('JavaScript syntax error. ' + e + '\n[Source code:]\n' + resultSource);
	}

	return {
		outputFilePath: absoluteFilePathPath,
		sourceCode: resultSource
	};
}
