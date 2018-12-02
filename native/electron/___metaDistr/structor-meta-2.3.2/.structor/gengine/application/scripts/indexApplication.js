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
	    pagesModel = dataObject.pagesModel,
	    hasApplicationFiles = dataObject.hasApplicationFiles,
	    project = dataObject.project;


	if (!(0, _lodash.has)(project, 'paths.appDirPath')) {
		throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
	}
	var result = {};
	if (hasApplicationFiles) {
		var absoluteFilePathPath = _path2.default.join(project.paths.appDirPath, 'index.js');
		var templateObject = {
			pagesModel: pagesModel
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

		result = {
			outputFilePath: absoluteFilePathPath,
			sourceCode: resultSource
		};
	}
	return result;
}