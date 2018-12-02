'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.process = process;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _structorCommons = require('structor-commons');

var _metadata = require('./metadata.js');

var _metadata2 = _interopRequireDefault(_metadata);

var _dependencies = require('./dependencies.js');

var _dependencies2 = _interopRequireDefault(_dependencies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateNames = ['app', 'indexApplication', 'store'];

function process(currentDir, dataObject) {

	var templateDatas = {};
	var templateReaders = [];

	var newDataObject = Object.assign({}, dataObject, { metadata: _metadata2.default.metaData });

	templateNames.forEach(function (name) {
		templateReaders.push(_structorCommons.commons.readFile(_path2.default.join(currentDir, 'templates', name + '.tpl')).then(function (fileData) {
			templateDatas[name] = fileData;
		}));
	});
	return Promise.all(templateReaders).then(function () {
		var newDependencies = (0, _lodash.cloneDeep)(_dependencies2.default);
		var files = [];
		var file = void 0;
		templateNames.forEach(function (name) {
			var generatorModule = require(_path2.default.join(currentDir, 'scripts', name + '.js'));
			file = generatorModule.getFile(newDataObject, templateDatas[name]);
			if (file) {
				if ((0, _lodash.isArray)(file) && file.length > 0) {
					file.forEach(function (item) {
						if (item.outputFilePath) {
							item.outputFileName = _path2.default.basename(item.outputFilePath);
							files.push(item);
						}
					});
				} else if ((0, _lodash.isObject)(file)) {
					if (file.outputFilePath) {
						file.outputFileName = _path2.default.basename(file.outputFilePath);
						files.push(file);
					}
				}
			}
		});
		return { files: files, dependencies: newDependencies };
	});
}