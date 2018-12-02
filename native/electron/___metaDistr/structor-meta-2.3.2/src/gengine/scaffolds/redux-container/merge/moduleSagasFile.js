import path from 'path';
import {has} from 'lodash';
import {gengine} from 'structor-commons';

const sagasTemplate = (importName, relativeFilePath) => {
    const result =
`import ${importName} from '${relativeFilePath}';
                
export default [
    ...${importName}
];
`;
    return result;
};

export function getFile(dataObject, dependencies){

    const {index, model, metadata, project, namespace, componentName} = dataObject;

    if(!has(project, 'paths.appDirPath')){
        throw Error('Wrong project configuration. \'appDirPath\' field is missing.');
    }

    if (namespace && namespace.length > 0) {
        let sourceCode;
        const module = index.modules[namespace];
        const relativeFilePath = './' + path.join('containers', componentName, 'sagas.js').replace(/\\/g, '/');
        let outputFilePath;
        if (module && module.sagasFilePath && module.sagasSourceCode) {
            sourceCode = gengine.injectModuleSaga(
                module.sagasSourceCode,
                `${componentName}Sagas`,
                relativeFilePath
            );
            outputFilePath = module.sagasFilePath;
        } else {
            sourceCode = sagasTemplate(
                `${componentName}Sagas`,
                relativeFilePath
            );
            outputFilePath = path.join(project.paths.appDirPath, 'modules', namespace, 'sagas.js');
        }
        return {
            outputFilePath,
            sourceCode,
        }

    }
    return {};
}
