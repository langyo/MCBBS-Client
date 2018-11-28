import { AsyncStorage} from 'react-native';

let database = {};

async function get(key) {
    try{
        return await AsyncStorage.getItem(key);
    }catch(e){
        console.error(e);
    }
}

async function set(key, value){
    try{
        await AsyncStorage.setItem(key, value);
    }catch(e){
        console.error(e);
    }
}

function load(path) {
    try{
        if(path === undefined) path = 'database';
        let data = JSON.parse(get(path));
        eval(path) = data.data;
        for(let i of data.node) eval(path)[i] = load(path + '["' + i + '"]');
    }catch(e){
        console.log(e);
    }
}

function writeBack(path){
    try{
        if(path === undefined) path = 'database';
        let data = {};
        let node = [];
        let allData = eval(path);
        for(let i of Object.keys(allData)){
            if(typeof allData[i] === 'object' || Array.isArray(allData[i])) node.push(i);
            else data[i] = allData[i];
        }
        set(path, JSON.stringify({
            data:data,
            node:node
        }));
        for(let i of node) writeBack(path + '["' + i + '"]');
    }catch(e){
        console.log(e);
    }
}