import path from 'path';
import {has} from 'lodash';
import {gengine} from 'structor-commons';

const reducerTemplate = (name, importName, relativeFilePath) => {
    const result =
`import { combineReducers } from 'redux';
import ${importName} from '${relativeFilePath}';
                
export default combineReducers({
    ${name}: ${importName}
});
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
        const relativeFilePath = './' + path.join('containers', componentName, 'reducer.js').replace(/\\/g, '/');
        let outputFilePath;
        if (module && module.reducerFilePath && module.reducerSourceCode) {
            sourceCode = gengine.injectModuleReducer(
                module.reducerSourceCode,
                metadata.reducerKeyProperty,
                `${metadata.reducerKeyProperty}Reducer`,
                relativeFilePath
            );
            outputFilePath = module.reducerFilePath;
        } else {
            sourceCode = reducerTemplate(
                metadata.reducerKeyProperty,
                `${metadata.reducerKeyProperty}Reducer`,
                relativeFilePath
            );
            outputFilePath = path.join(project.paths.appDirPath, 'modules', namespace, 'reducer.js').replace(/\\/g, '/');
        }
        return {
            outputFilePath,
            sourceCode,
        }

    }
    return {};
}
