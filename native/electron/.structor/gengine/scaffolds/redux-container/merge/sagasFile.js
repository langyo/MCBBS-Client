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


    if (!index.sagasSourceCode) {
        throw Error('Sagas source code was not found.');
    }

    var reducerFilePath = void 0;
    var sourceCode = void 0;
    if (namespace && namespace.length > 0) {
        reducerFilePath = _path2.default.join('modules', namespace, 'sagas.js').replace(/\\/g, '/');
        sourceCode = _structorCommons.gengine.injectModuleSaga(index.sagasSourceCode, namespace + 'Sagas', reducerFilePath);
    } else {
        reducerFilePath = _path2.default.join('containers', componentName, 'sagas.js').replace(/\\/g, '/');
        sourceCode = _structorCommons.gengine.injectSaga(index.sagasSourceCode, componentName + 'Sagas', reducerFilePath);
    }

    return {
        outputFilePath: index.sagasFilePath,
        sourceCode: sourceCode
    };
}