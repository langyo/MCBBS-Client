import {forOwn, template, has} from 'lodash';
import path from 'path';
import {commons} from 'structor-commons';

export function getFile(dataObject, templateText){

    const {index, model, metadata, project, namespace, componentName} = dataObject;

    if(!has(project, 'paths.appDirPath')){
        throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
    }

    const absoluteComponentDirPath = namespace && namespace.length > 0 ?
        path.join(project.paths.appDirPath, 'modules', namespace, 'components', componentName, 'tests')
        :
        path.join(project.paths.appDirPath, 'components', componentName, 'tests');
    const absoluteComponentFilePath = path.join(absoluteComponentDirPath, 'index.test.js');

    const templateObject = {
        model, namespace, componentName, metadata
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
