import {forOwn, template, has} from 'lodash';
import path from 'path';
import {commons, gengine} from 'structor-commons';

export function getFile(dataObject, templateText){

    const {index, model: srcModel, metadata, project, namespace, componentName} = dataObject;

    if(!has(project, 'paths.appDirPath')){
        throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
    }

    const {imports, model: srcModel1} = gengine.prepareModelWithImports(index, srcModel, namespace);
  const {foundObjects, model} = gengine.prepareModelWithObjects(srcModel1);

    const absoluteComponentDirPath = namespace && namespace.length > 0 ?
        path.join(project.paths.appDirPath, 'modules', namespace, 'containers', componentName)
        :
        path.join(project.paths.appDirPath, 'containers', componentName);

    const absoluteComponentFilePath = path.join(absoluteComponentDirPath, 'index.js');

    const templateObject = {
        model, imports, foundObjects, namespace, componentName, metadata
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
