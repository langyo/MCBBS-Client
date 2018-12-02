import {forOwn, template, has} from 'lodash';
import path from 'path';

export function getFile(dataObject, templateText){

    const {model, metadata, project, namespace, componentName} = dataObject;

    if(!has(project, 'paths.componentDefaultsDirPath')){
        throw Error('Wrong project configuration. \'componentDefaultsDirPath\' field is missing.');
    }

    const absoluteFilePath = namespace && namespace.length > 0 ?
        path.join(project.paths.componentDefaultsDirPath, namespace, componentName + '.json')
        :
        path.join(project.paths.componentDefaultsDirPath, componentName + '.json');

    const templateObject = {
        namespace, componentName, metadata, model
    };

    let resultSource;
    try{
        resultSource = template(templateText)(templateObject);
    } catch(e){
        throw Error('lodash template error. ' + e);
    }

    let defaults = [];
    try {
        defaults = JSON.parse(resultSource);
    } catch (e) {
        throw Error('Parsing default models JSON error. ' + e);
    }

    return {
        outputFilePath: absoluteFilePath,
        sourceCode: JSON.stringify(defaults),
        defaults: defaults,
    };
}
