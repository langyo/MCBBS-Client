export default {
    merge:merge
};

function merge(baseDatabase, formDatabase){
    const storageByHistory = ['threads', 'posts'];

    for(let i of Object.keys(formDatabase)){
        if(storageByHistory[i] === undefined){
            baseDatabase[i] = subMerge(baseDatabase[i], formDatabase[i]);
        }else{
            if(Array.isArray(baseDatabase[i].history)) baseDatabase[i].history = [];
            let changed = {};
            for(let j of Object.keys(formDatabase[i])){
                if(baseDatabase[i][j] !== formDatabase[i][j] && j !== 'history'){
                    changed[j] = baseDatabase[i][j];
                    baseDatabase[i][j] = formDatabase[i][j];
                }
            }
            baseDatabase[i].history.push(changed);
        }
    }
    return baseDatabase;
}

function subMerge(baseObject, formObject){
    for(let i of Object.keys(formObject)){
        if(typeof formObject === 'object'){
            baseObject[i] = subMerge(baseObject[i] === undefined ? {} : baseObject[i], formObject[i]);
        }else{
            baseObject[i] = formObject[i];
        }
    }
}