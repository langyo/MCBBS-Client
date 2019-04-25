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