import {forOwn, template, has} from 'lodash';
import path from 'path';
import {commons, gengine} from 'structor-commons';

export function getFile(dataObject, templateText){

    const {index, project, namespaces} = dataObject;

    if(!has(project, 'paths.sandboxDirPath')){
        throw Error('Wrong project configuration. \'sandboxDirPath\' field is missing.');
    }

    let srcModel = gengine.combineAllModulesComponents(index, namespaces);
    const {imports, model} = gengine.prepareModelWithImports(index, srcModel);

    const absoluteComponentFilePath = path.join(project.paths.sandboxDirPath, 'App.js');

    const templateObject = {
        model, imports, componentName: 'App'
    };

    let resultSource;
    try{
        resultSource = template(templateText)(templateObject);
    } catch(e){
        throw Error('lodash template error. ' + e);
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
