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


    if (!index.reducersSourceCode) {
        throw Error('Reducer source code was not found.');
    }

    var reducerFilePath = void 0;
    var sourceCode = void 0;
    if (namespace && namespace.length > 0) {
        reducerFilePath = _path2.default.join('modules', namespace, 'reducer.js').replace(/\\/g, '/');
        sourceCode = _structorCommons.gengine.injectReducer(index.reducersSourceCode, namespace, namespace + 'Reducer', reducerFilePath);
    } else {
        reducerFilePath = _path2.default.join('containers', componentName, 'reducer.js').replace(/\\/g, '/');
        sourceCode = _structorCommons.gengine.injectReducer(index.reducersSourceCode, metadata.reducerKeyProperty, metadata.reducerKeyProperty + 'Reducer', reducerFilePath);
    }

    return {
        outputFilePath: index.reducersFilePath,
        sourceCode: sourceCode
    };
}