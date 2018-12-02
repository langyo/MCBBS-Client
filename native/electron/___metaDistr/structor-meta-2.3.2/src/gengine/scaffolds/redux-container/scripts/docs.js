import {forOwn, template, has} from 'lodash';
import path from 'path';

export function getFile(dataObject, templateText){

    const {metadata, project, namespace, componentName} = dataObject;

    if(!has(project, 'paths.docsComponentsDirPath')){
        throw Error('Wrong project configuration. \'docsComponentsDirPath\' field is missing.');
    }

    const absoluteFilePath = namespace && namespace.length > 0 ?
        path.join(project.paths.docsComponentsDirPath, namespace, componentName + '.md')
        :
        path.join(project.paths.docsComponentsDirPath, componentName + '.md');

    const templateObject = {
        namespace, componentName, metadata
    };

    let resultSource;
    try{
        resultSource = template(templateText)(templateObject);
    } catch(e){
        throw Error('lodash template error. ' + e);
    }

    return {
        outputFilePath: absoluteFilePath,
        sourceCode: resultSource
    };
}
