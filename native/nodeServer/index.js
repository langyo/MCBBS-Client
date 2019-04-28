import ws from "ws";

// ------ PackageManager ------

class CommandBuilder{
    commands = [];
    append = str => this.commands.push(str);
    toString = () => this.commands.reduce((prev, next) => prev + " " + next).trim();
}

const dataStates = ["success", "fail"];

const PluginDashboard = {
    execute: (src, pkg, cmd, args) => {
        if(!src in sockets) throw new Error("没有名为 " + src + " 的连接！");
        let str = new CommandBuilder();
        str.append("execute");
        str.append(pkg);
        str.append(cmd);
        str.append(args);
        sendMessage(src, str.toString());
    },
    data: (src, stat, pkg, cmd, args) => {
        if(!src in sockets) throw new Error("没有名为 " + src + " 的连接！");
        if(!stat in dataStates) throw new Error("未知的状态 " + stat + "！");
        let str = new CommandBuilder();
        str.append("data");
        str.append(stat);
        str.append(pkg);
        str.append(cmd);
        str.append(args);
        sendMessage(src, str.toString());
    },
}

// ------ PluginDashboard ------

class PluginDesigner{
    constructor(infoObj, commandsObj, dataListenersObj){
        // 检查 infoObj
        if(infoObj.package === undefined) throw new Error("未指定包名！");
        this.package = infoObj.package;
        if(infoObj.version === undefined) throw new Error("未指定版本！");
        this.version = infoObj.version;
        if(infoObj.author !== undefined) this.author = infoObj.author;
        if(infoObj.description !== undefined) this.description = infoObj.description;

        // 检查 commandsObj 与 dataListenersObj
        for(let i of Object.keys(commandsObj)) if(typeof commandsObj[i] != 'function') throw new Error("execute 监听的指令 " + i + " 不是一个函数！");
        this.commands = commandsObj;
        for(let i of Object.keys(dataListenersObj)) if(typeof dataListenersObj[i] != 'function') throw new Error("dataListener 监听的指令 " + i + " 不是一个函数！");
        this.dataListeners = dataListenersObj;
    }
}

let packages = {};

// ------ SocketManager ------

let sockets = {};

const shakehandReg = /^execute system shakehand ([0-9a-zA-Z]+)\s*$/;

function createSocket(conn){
    let chunks = "";
    let listener = conn.on('message', n => {
        chunks += n;
        if(chunks.indexOf('\n') != -1){
            // 换行代表握手指令发送完毕
            let match = shakehandReg.exec(chunks)
            if(match){
                // 识别正确，创建新 Socket
                let src = match[1];
                console.log("已与 " + src + "建立连接！");
                conn.send("data system shakehand success\n");
                conn.removeListener(listener);
                socket[src] = new Socket(conn, src);
            }else{
                // 识别错误，拒绝连接
                console.log("检测到一个连接，但由于无法识别握手内容而失败：" + chunks);
                conn.close();
            }
        }
    })
}

function sendMessage(src, cmd){
    if(!src in sockets) throw new Error("没有名为 " + src + " 的 socket 连接！");
    sockets[src].socket.send(cmd);
}

function receiveMessage(src, cmd){
    try{
        console.log("接收到了来自 " + src + " 的指令 " + cmd + "！");
        commandParse(src, cmd);
    }catch(e){
        console.error(e.what());
    }
}

class Socket{
    constructor(conn, src){
        this.socket = conn;
        this.src = src;

        // 由于一次可能会传输多行，或一次性没传完完整的数据
        // 所以需要一个缓冲区变量
        let chunks = "";
        conn.on('message', n => {
            chunks += n;
            let pos = chunks.indexOf('\n');
            while(pos != -1){
                // 有完整结束的一行，开始处理命令
                receiveMessage(src, chunks.slice(0, pos));
                chubks = chunks.slice(pos + 1);
                pos = chunks.indexOf('\n');
            }
        });
        conn.on('close', () => {
            console.log("连接 " + name + " 已关闭。");
            delete sockets[name];
        })
    }
}

// ------ SocketReceiver ------

function commandParse(src, cmd){
    commandExecute(new commandParse(src, cmd));
}

class Command{
    constructor(src, cmd){
        const reg = /^({execute|data}) ([a-zA-Z0-9\_\$]+) ([a-zA-Z0-9\_\$]+)( ({success|fail}))?( (.*))?$/;
        let match = reg.exec(cmd);
        if(match){
            this.src = src;
            this.type = match[1];
            this.pkg = match[2];
            this.cmd = match[3];
            this.stat = match[5];
            this.args = match[7];
        }else throw new Error("收到了一个无法解析的指令：" + cmd);
    }
}

function commandExecute(cmd){
    switch(cmd.type){
        case "execute":
            if(!cmd.pkg in packages) PluginDashboard.data(cmd,src, "fail", cmd.pkg, cmd.cmd, "没有对应的包！");
            if(!cmd.cmd in packages[cmd.pkg].commands) PluginDashboard.data(cmd.src, "fail", cmd.pkg, cmd.cmd, "没有对应的指令！");
            packages[cmd.pkg].commands[cmd.cmd].call(cmd.args);
            break;
        case "data":
            if(!cmd.pkg in packages) throw new Error("无法处理包" + cmd.pkg + "下的指令" + cmd.cmd + "返回的数据！");
            if(!cmd.stat in packages[cmd.pkg].dataListeners) throw new Error("无法处理包" + cmd.pkg + "下的指令" + cmd.cmd + "返回的数据！");
            if(!cmd.cmd in packages[cmd.pkg].dataListeners[cmd.stat]) throw new Error("无法处理包" + cmd.pkg + "下的指令" + cmd.cmd + "返回的数据！");
            packages[cmd.pkg].dataListeners[cmd.stat][cmd.cmd].call(cmd.args);
            break;
        default:
            throw new Error("未知错误，这种错误从逻辑上来讲不应该发生！");
    }
}

// ------ 主程序部分 ------

