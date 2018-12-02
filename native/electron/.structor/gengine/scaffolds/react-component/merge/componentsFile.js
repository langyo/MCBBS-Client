'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFile = getFile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

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
        var ast = _structorCommons.commons.parse(index.indexSourceCode);
        if (namespace && namespace.length > 0) {
            ast = _structorCommons.commons.addNamespaceImport(ast, namespace, _path2.default.join('modules', namespace).replace(/\\/g, '/'));
            ast = _structorCommons.commons.addNamedExport(ast, namespace);
        } else {
            ast = _structorCommons.commons.addDefaultImport(ast, componentName, _path2.default.join('components', componentName).replace(/\\/g, '/'));
            ast = _structorCommons.commons.addNamedExport(ast, componentName);
        }
        sourceCode = _structorCommons.commons.generate(ast);
    } else {
        throw Error('Components index file was not found.');
    }

    return {
        outputFilePath: index.indexFilePath,
        sourceCode: sourceCode
    };
}