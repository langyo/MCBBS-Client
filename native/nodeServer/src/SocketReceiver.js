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