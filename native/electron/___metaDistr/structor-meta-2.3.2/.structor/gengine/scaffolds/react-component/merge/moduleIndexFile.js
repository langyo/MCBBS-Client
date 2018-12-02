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

var indexTemplate = function indexTemplate(componentName, relativeFilePath) {
    var result = 'import ' + componentName + ' from \'' + relativeFilePath + '\';\n                \nexport {\n    ' + componentName + '\n};\n';
    return result;
};

function getFile(dataObject, dependencies) {
    var index = dataObject.index,
        model = dataObject.model,
        metadata = dataObject.metadata,
        project = dataObject.project,
        namespace = dataObject.namespace,
        componentName = dataObject.componentName;


    if (!(0, _lodash.has)(project, 'paths.appDirPath')) {
        throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
    }

    if (namespace && namespace.length > 0) {
        var sourceCode = void 0;
        var module = index.modules[namespace];
        var relativeFilePath = './' + _path2.default.join('components', componentName).replace(/\\/g, '/');
        var outputFilePath = void 0;
        if (module) {
            if (module.indexFilePath && module.indexSourceCode) {
                var ast = _structorCommons.commons.parse(module.indexSourceCode);
                ast = _structorCommons.commons.addDefaultImport(ast, componentName, relativeFilePath);
                ast = _structorCommons.commons.addNamedExport(ast, componentName);
                sourceCode = _structorCommons.commons.generate(ast);
                outputFilePath = module.indexFilePath;
            } else {
                throw Error('Module components index file was not found.');
            }
        } else {
            sourceCode = indexTemplate(componentName, relativeFilePath);
            outputFilePath = _path2.default.join(project.paths.appDirPath, 'modules', namespace, 'index.js').replace(/\\/g, '/');
        }
        return {
            outputFilePath: outputFilePath,
            sourceCode: sourceCode
        };
    }
    return {};
}