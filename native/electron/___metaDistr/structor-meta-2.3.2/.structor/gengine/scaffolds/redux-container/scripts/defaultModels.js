'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFile = getFile;

var _lodash = require('lodash');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFile(dataObject, templateText) {
    var model = dataObject.model,
        metadata = dataObject.metadata,
        project = dataObject.project,
        namespace = dataObject.namespace,
        componentName = dataObject.componentName;


    if (!(0, _lodash.has)(project, 'paths.componentDefaultsDirPath')) {
        throw Error('Wrong project configuration. \'componentDefaultsDirPath\' field is missing.');
    }

    var absoluteFilePath = namespace && namespace.length > 0 ? _path2.default.join(project.paths.componentDefaultsDirPath, namespace, componentName + '.json') : _path2.default.join(project.paths.componentDefaultsDirPath, componentName + '.json');

    var templateObject = {
        namespace: namespace, componentName: componentName, metadata: metadata, model: model
    };

    var resultSource = void 0;
    try {
        resultSource = (0, _lodash.template)(templateText)(templateObject);
    } catch (e) {
        throw Error('lodash template error. ' + e);
    }

    var defaults = [];
    try {
        defaults = JSON.parse(resultSource);
    } catch (e) {
        throw Error('Parsing default models JSON error. ' + e);
    }

    return {
        outputFilePath: absoluteFilePath,
        sourceCode: JSON.stringify(defaults),
        defaults: defaults
    };
}