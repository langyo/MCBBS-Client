import path from 'path';
import {has, get, camelCase, findIndex} from 'lodash';
import {commons} from 'structor-commons';

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
        const relativeFilePath = './' + path.join('components', componentName).replace(/\\/g, '/');
        let outputFilePath;
        if (module) {
            if (module.indexFilePath && module.indexSourceCode) {
                let ast = commons.parse(module.indexSourceCode);
                ast = commons.addDefaultImport(ast, componentName, relativeFilePath);
                ast = commons.addNamedExport(ast, componentName);
                sourceCode = commons.generate(ast);
                outputFilePath = module.indexFilePath;
            } else {
                throw Error('Module components index file was not found.');
            }
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
