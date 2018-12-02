import path from 'path';
import {has, get, camelCase, findIndex} from 'lodash';
import {commons} from 'structor-commons';

export function getFile(dataObject, dependencies){

    const {index, model, metadata, project, namespace, componentName} = dataObject;

    let sourceCode;
    if (index && index.indexFilePath && index.indexSourceCode) {
        let ast = commons.parse(index.indexSourceCode);
        if (namespace && namespace.length > 0) {
            ast = commons.addNamespaceImport(ast, namespace, path.join('modules', namespace).replace(/\\/g, '/'));
            ast = commons.addNamedExport(ast, namespace);
        } else {
            ast = commons.addDefaultImport(ast, componentName, path.join('components', componentName).replace(/\\/g, '/'));
            ast = commons.addNamedExport(ast, componentName);
        }
        sourceCode = commons.generate(ast);
    } else {
        throw Error('Components index file was not found.');
    }

    return {
        outputFilePath: index.indexFilePath,
        sourceCode,
    }
}
