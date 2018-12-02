import {forOwn, template, has} from 'lodash';
import path from 'path';
import {commons, gengine} from 'structor-commons';

export function getFile(dataObject, templateText){

    const {index, pagesModel, hasApplicationFiles, project, metadata} = dataObject;

    if(!has(project, 'paths.appDirPath')){
        throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
    }

    let result = [];

    if (pagesModel && pagesModel.length > 0) {
        pagesModel.forEach(srcModel => {
            const componentName = srcModel.pageName;
            const {imports, model} = gengine.prepareModelWithImports(index, srcModel, null);

            const absoluteComponentFilePath =
                path.join(project.paths.appDirPath, 'routes', `${componentName}.js`);

            const templateObject = {
                model, imports, componentName, metadata
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

            result.push({
                outputFilePath: absoluteComponentFilePath,
                sourceCode: resultSource
            });

        });
    }
    return result;

}
