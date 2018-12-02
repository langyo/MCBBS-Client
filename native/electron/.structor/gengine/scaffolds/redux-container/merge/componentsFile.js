'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFile = getFile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _structorCommons = require('structor-commons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFile(dataObject, dependencies) {
    var index = dataObject.index,
        model = dataObject.model,
        metadata = dataObject.metadata,
        project = dataObject.project,
        namespace = dataObject.namespace,
        componentName = dataObject.componentName;


    var sourceCode = void 0;
    if (index && index.indexFilePath && index.indexSourceCode) {
        if (namespace && namespace.length > 0) {
            sourceCode = _structorCommons.gengine.injectNamespaceComponent(index.indexSourceCode, namespace, _path2.default.join('modules', namespace).replace(/\\/g, '/'));
        } else {
            sourceCode = _structorCommons.gengine.injectModuleComponent(index.indexSourceCode, componentName, _path2.default.join('containers', componentName).replace(/\\/g, '/'));
        }
    } else {
        throw Error('Components index file was not found.');
    }

    return {
        outputFilePath: index.indexFilePath,
        sourceCode: sourceCode
    };
}