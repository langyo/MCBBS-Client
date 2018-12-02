import {template, has} from 'lodash';
import path from 'path';
import {commons} from 'structor-commons';

export function getFile(dataObject, templateText){

    const {index, model, metadata, project, namespace, componentName} = dataObject;

    if(!has(project, 'paths.appDirPath')){
        throw Error('Wrong project configuration. "appDirPath" field is missing.');
    }

    const absoluteComponentDirPath = namespace && namespace.length > 0 ?
        path.join(project.paths.appDirPath, 'modules', namespace, 'containers', componentName)
        :
        path.join(project.paths.appDirPath, 'containers', componentName);
    const absoluteComponentFilePath = path.join(absoluteComponentDirPath, 'sagas.js');

    let resultSource;
    try{
        resultSource = template(templateText)({
            model, namespace, componentName, metadata
        });
    } catch(e){
        throw Error('Online generator. lodash template error. ' + e);
    }

    try{
        resultSource = commons.formatJs(resultSource);
        resultSource = resultSource.replace(/(^\s*[\r\n]){2,}/gm, "\n");
    } catch (e){
        throw Error('JavaScript syntax error. ' + e + '\n[Source code:]\n' + resultSource);
    }

    return {
        outputFilePath: absoluteComponentFilePath,
        sourceCode: resultSource
    };
}
