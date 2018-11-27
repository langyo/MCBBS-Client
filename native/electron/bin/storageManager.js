let global = {};

function get(key) {
    return localStorage.getItem(key);
}

function set(key, value){
    return localStorage.setItem(key, value);
}

function init(path) {
    if (path === undefined) {
        path = '.';

        let ret = JSON.parse(get(path));
        global = ret.data === undefined ? {} : ret.data;
        for(let i of ret.node){
            // 待编辑
        }
    }

}

function writeBack(path){
    if(path === undefined) path = '.';
}