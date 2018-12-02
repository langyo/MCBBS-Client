import path from 'path';
import {has} from 'lodash';
import {gengine} from 'structor-commons';

const indexTemplate = (componentName, relativeFilePath) => {
    const result =
`import ${componentName} from '${relativeFilePath}';
                
export {
    ${componentName}
};
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
        const relativeFilePath = './' + path.join('containers', componentName).replace(/\\/g, '/');
        let outputFilePath;
        if (module && module.indexFilePath && module.indexSourceCode) {
            sourceCode = gengine.injectModuleComponent(
                module.indexSourceCode,
                componentName,
                relativeFilePath
            );
            outputFilePath = module.indexFilePath;
        } else {
            sourceCode = indexTemplate(componentName, relativeFilePath);
            outputFilePath = path.join(project.paths.appDirPath, 'modules', namespace, 'index.js').replace(/\\/g, '/');
        }
        return {
            outputFilePath,
            sourceCode,
        }
    }
    return {};
}
