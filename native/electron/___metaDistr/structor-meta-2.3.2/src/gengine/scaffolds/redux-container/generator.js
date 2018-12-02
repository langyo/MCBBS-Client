import path from 'path';
import {cloneDeep, template, camelCase} from 'lodash';
import {commons} from 'structor-commons';
import metadata from './metadata.js';
import dependencies from './dependencies.js';

const templateNames = [
	'index',
	'constants',
	'docs',
	'actions',
	'selectors',
	'reducer',
	'sagas',
	'defaultModels',
	'test',
	'testActions',
	'testReducer',
	'testSagas',
	'testSelectors'
];

const mergeScripts = [
	'componentsFile',
	'moduleIndexFile',
	'reducersFile',
	'moduleReducerFile',
	'sagasFile',
	'moduleSagasFile'
];

export function preProcess(currentDir, dataObject) {
	const {componentName} = dataObject;
	let newMetaData = cloneDeep(metadata);
	newMetaData.metaData.reducerKeyProperty = camelCase(componentName);
	return newMetaData;

}

export function process(currentDir, dataObject) {

	const templateDatas = {};
	let templateReaders = [];

	templateNames.forEach(name => {
		templateReaders.push(
			commons.readFile(path.join(currentDir, 'templates', name + '.tpl'))
				.then(fileData => {
					templateDatas[name] = fileData;
				})
		);
	});
	return Promise.all(templateReaders)
		.then(() => {
			let newDependencies = cloneDeep(dependencies);
			let files = [];
			let file;
			let defaults = [];
			templateNames.forEach(name => {
				const generatorModule = require(path.join(currentDir, 'scripts', name + '.js'));
				file = generatorModule.getFile(dataObject, templateDatas[name]);
				if (file.outputFilePath) {
					file.outputFileName = path.basename(file.outputFilePath);
					files.push(file);
				}
				if (file.defaults && file.defaults.length > 0) {
					defaults = defaults.concat(file.defaults);
				}
			});
			mergeScripts.forEach(script => {
				const mergeModule = require(path.join(currentDir, 'merge', script + '.js'));
				file = mergeModule.getFile(dataObject, dependencies);
				if (file.outputFilePath) {
					file.outputFileName = path.basename(file.outputFilePath);
					files.push(file);
				}
			});
			return {files, dependencies: newDependencies, defaults};
		});
}
