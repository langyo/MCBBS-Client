let database = {};

function get(key) {
    return localStorage.getItem(key);
}

function set(key, value){
    return localStorage.setItem(key, value);
}

function remove(key){
    return localStorage.removeItem(key);
}

function init(){
    if(get('.') === undefined){
        // 第一次初始化 databse
        // 初始化后调用 writeBack
    }
}

function read(object, path, location){
    if(object === undefined) object = { node: Object.keys(database) };
    if(location === undefined) location = '.';

    assert(path.length > 0);
    if(path.length === 1) return object.data[path[0]];
    let key = path.pop();
    location += '.' + key;

    if(object.unCache){
        // 此时需要从数据库中动态提取
        return read(load(location), path, location + '.' + key);
    }else{
        return read(object.node[key], path, location + '.' + key);
    }
}

/**
 * @description 用于将一个由 read 返回的对象扁平化
 * @todo 注意，此实现无法自动将嵌套的带 unCache 标示的节点进行动态加载
 */
function join(object){
    let ret = object.data;
    for(let i of Object.keys(object.node)){
        ret[i] = join(object.node[i]);
    }
    return ret;
}

function load(key){
    return JSON.parse(get(key));
}

function writeBack(object, path, location){
    // 比较差异后写回数据库
    if(location === undefined) location = '.';
    let inDatabase = join(load(get(location)));
    let addNode = [], deleteNode = [], updateNode = [];

    // 创建任务列表
    for(let i of Object.keys(object)) if(!inDatabase.hasOwnProperty(i)) addNode.push(i),console.log('[数据库] 数据写回 添加任务 ' + location + '.' + i);
    for(let i of Object.keys(inDatabase)) if(!object.hasOwnProperty(i) && addNode.indexOf(i) === -1) deleteNode.push(i),console.log('[数据库] 数据写回 删除任务 ' + location + '.' + i);
    for(let i of Object.keys(object)) if(addNode.indexOf(i) === -1 && object[i] !== inDatabase[i]) updateNode.push(i),console.log('[数据库] 数据写回 更新任务 ' + location + '.' + i);

    // 删除部分
    for(let i of deleteNode){

    }
}