import path from 'path';
import {gengine} from 'structor-commons';

export function getFile(dataObject, dependencies){

    const {index, model, metadata, project, namespace, componentName} = dataObject;

    if (!index.reducersSourceCode) {
        throw Error('Reducer source code was not found.');
    }

    let reducerFilePath;
    let sourceCode;
    if (namespace && namespace.length > 0) {
        reducerFilePath = path.join('modules', namespace, 'reducer.js').replace(/\\/g, '/');
        sourceCode = gengine.injectReducer(
            index.reducersSourceCode,
            namespace,
            `${namespace}Reducer`,
            reducerFilePath
        );
    } else {
        reducerFilePath = path.join('containers', componentName, 'reducer.js').replace(/\\/g, '/');
        sourceCode = gengine.injectReducer(
            index.reducersSourceCode,
            metadata.reducerKeyProperty,
            `${metadata.reducerKeyProperty}Reducer`,
            reducerFilePath
        );
    }

    return {
        outputFilePath: index.reducersFilePath,
        sourceCode
    }
}
