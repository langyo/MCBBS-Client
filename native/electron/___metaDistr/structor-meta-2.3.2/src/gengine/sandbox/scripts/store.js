import {forOwn, template, has} from 'lodash';
import path from 'path';
import {commons} from 'structor-commons';

export function getFile(dataObject, templateText) {

	const {index, project, namespaces} = dataObject;

	if (!has(project, 'paths.sandboxDirPath')) {
		throw Error('Wrong project configuration. \'dir\' field is missing.');
	}

	const absoluteFilePathPath = path.join(project.paths.sandboxDirPath, 'store.js');
	let namespaceReducers = [];
	let namespaceSagas = [];
	if (namespaces && namespaces.length > 0) {
		let moduleDef;
		namespaces.forEach(namespace => {
			moduleDef = index.modules[namespace];
			if (moduleDef) {
				if (moduleDef.reducerImportPath) {
					namespaceReducers.push(
						{
							name: namespace,
							importPath: moduleDef.reducerImportPath
						}
					);
				}
				if (moduleDef.sagasImportPath) {
					namespaceSagas.push(
						{
							name: namespace,
							importPath: moduleDef.sagasImportPath
						}
					);
				}
			}
		});
	}
	const templateObject = {
		namespaceReducers, namespaceSagas
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
