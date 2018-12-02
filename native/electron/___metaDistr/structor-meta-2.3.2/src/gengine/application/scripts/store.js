import {forOwn, template, has} from 'lodash';
import path from 'path';
import {commons} from 'structor-commons';

export function getFile(dataObject, templateText) {

	const {index, pagesModel, hasApplicationFiles, project} = dataObject;

	if (!has(project, 'paths.appDirPath')) {
		throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
	}
	let result = [];
	if (hasApplicationFiles) {
		const absoluteFilePathPath = path.join(project.paths.appDirPath, 'store.js');
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

		result.push({
			outputFilePath: absoluteFilePathPath,
			sourceCode: resultSource
		});

		if (index.reducersSourceCode) {
			result.push({
				outputFilePath: path.join(project.paths.appDirPath, 'reducers.js'),
				sourceCode: index.reducersSourceCode
			});
		}

		if (index.sagasSourceCode) {
			result.push({
				outputFilePath: path.join(project.paths.appDirPath, 'sagas.js'),
				sourceCode: index.sagasSourceCode
			});
		}

	}
	return result;
}
