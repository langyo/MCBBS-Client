const fs = require('fs');
const child_process = require('child_process');

function dfs(path){
    let files = fs.readdirSync(path);
    for(let i of files){
        if(fs.statSync(path + i).isDirectory()){
            dfs(path + i + '/');
        }else{
            if(/^_.+\.js$/.test(i)){
                console.log(path + i);
                child_process.exec("watchify " + i + " -t babelify -o " + i.slice(1) + " --debug --verbose",{
                    windowHide: false
                })// .stdout.pipe(console.log, { end:false });
            }
        }
    }
}

dfs("./");