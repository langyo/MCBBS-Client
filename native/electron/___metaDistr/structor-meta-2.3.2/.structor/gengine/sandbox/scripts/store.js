'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFile = getFile;

var _lodash = require('lodash');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _structorCommons = require('structor-commons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFile(dataObject, templateText) {
	var index = dataObject.index,
	    project = dataObject.project,
	    namespaces = dataObject.namespaces;


	if (!(0, _lodash.has)(project, 'paths.sandboxDirPath')) {
		throw Error('Wrong project configuration. \'dir\' field is missing.');
	}

	var absoluteFilePathPath = _path2.default.join(project.paths.sandboxDirPath, 'store.js');
	var namespaceReducers = [];
	var namespaceSagas = [];
	if (namespaces && namespaces.length > 0) {
		var moduleDef = void 0;
		namespaces.forEach(function (namespace) {
			moduleDef = index.modules[namespace];
			if (moduleDef) {
				if (moduleDef.reducerImportPath) {
					namespaceReducers.push({
						name: namespace,
						importPath: moduleDef.reducerImportPath
					});
				}
				if (moduleDef.sagasImportPath) {
					namespaceSagas.push({
						name: namespace,
						importPath: moduleDef.sagasImportPath
					});
				}
			}
		});
	}
	var templateObject = {
		namespaceReducers: namespaceReducers, namespaceSagas: namespaceSagas
	};
	var resultSource = void 0;
	try {
		resultSource = (0, _lodash.template)(templateText)(templateObject);
	} catch (e) {
		throw Error('lodash template error. ' + e);
	}

	try {
		resultSource = _structorCommons.commons.formatJs(resultSource);
		resultSource = resultSource.replace(/(^\s*[\r\n]){2,}/gm, "\n");
	} catch (e) {
		throw Error('JavaScript syntax error. ' + e + '\n[Source code:]\n' + resultSource);
	}

	return {
		outputFilePath: absoluteFilePathPath,
		sourceCode: resultSource
	};
}