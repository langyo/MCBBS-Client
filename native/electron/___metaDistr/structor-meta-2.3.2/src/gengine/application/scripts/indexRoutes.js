import {forOwn, template, has} from 'lodash';
import path from 'path';
import {commons} from 'structor-commons';

export function getFile(dataObject, templateText) {

	const {index, pagesModel, project} = dataObject;

	if (!has(project, 'paths.appDirPath')) {
		throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
	}

	const absoluteFilePathPath = path.join(project.paths.appDirPath, 'routes', 'index.js');
	const templateObject = {
		pagesModel
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
