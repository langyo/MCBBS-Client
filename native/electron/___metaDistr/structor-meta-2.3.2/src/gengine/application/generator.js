import path from 'path';
import {cloneDeep, template, isObject, isArray} from 'lodash';
import {commons} from 'structor-commons';
import metadata from './metadata.js';
import dependencies from './dependencies.js';

const templateNames = [
	'page', 'indexRoutes', 'indexApplication', 'store'
];

export function process(currentDir, dataObject) {

	const templateDatas = {};
	let templateReaders = [];

	let newDataObject = Object.assign({}, dataObject, {metadata: metadata.metaData});

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
			templateNames.forEach(name => {
				const generatorModule = require(path.join(currentDir, 'scripts', name + '.js'));
				file = generatorModule.getFile(newDataObject, templateDatas[name]);
				if (file) {
					if (isArray(file) && file.length > 0) {
						file.forEach(item => {
							if (item.outputFilePath) {
								item.outputFileName = path.basename(item.outputFilePath);
								files.push(item);
							}
						});
					} else if (isObject(file)) {
						if (file.outputFilePath) {
							file.outputFileName = path.basename(file.outputFilePath);
							files.push(file);
						}
					}
				}
			});
			return {files, dependencies: newDependencies};
		});
}
