import path from 'path';
import {gengine} from 'structor-commons';

export function getFile(dataObject, dependencies){

    const {index, model, metadata, project, namespace, componentName} = dataObject;

    let sourceCode;
    if (index && index.indexFilePath && index.indexSourceCode) {
        if (namespace && namespace.length > 0) {
            sourceCode = gengine.injectNamespaceComponent(
                index.indexSourceCode,
                namespace,
                path.join('modules', namespace).replace(/\\/g, '/')
            );
        } else {
            sourceCode = gengine.injectModuleComponent(
                index.indexSourceCode,
                componentName,
                path.join('containers', componentName).replace(/\\/g, '/')
            );
        }
    } else {
        throw Error('Components index file was not found.');
    }

    return {
        outputFilePath: index.indexFilePath,
        sourceCode,
    }
}
