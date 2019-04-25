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