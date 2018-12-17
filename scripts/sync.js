const fs = require('fs');
const child_process = require('child_process');

function dfs(path){
    let files = fs.readdirSync(path);
    for(let i of files){
        if(fs.statSync(path + i).isDirectory()){
            dfs(path + i + '/');
        }else{
            if(/^.+\.js$/.test(i)){
                child_process.exec("",{
                    windowHide: true
                }, (err, out) => console.log(err || out))
            }
        }
    }
}

dfs("./");