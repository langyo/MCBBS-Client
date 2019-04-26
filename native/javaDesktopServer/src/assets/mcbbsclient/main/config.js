let version;
let id;
let name;
let plugin;
let description;
let url;
let update_url;
let server_url;
let author;
function setName(name:string):void {
    this.name = name;
}

function setVersion(version:string):void {
    this.version = version;
}

function setId(id:string):void {
    this.id=id;
}

function setPluginMainclass(mainClassLoc:string):void {
    this.plugin = mainClassLoc;
}

function setDescription(descr:string):void {
    this.description = descr;
}

function setUrl(url:string):void {
    this.url = url;
}

function setUpdateUrl(update:string):void {
    this.update_url = update;
}

function setServerUrl(server:string):void {
    this.server_url = server;
}
function setAuthor(author:string):void {
    this.author = author;
}