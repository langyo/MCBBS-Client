let version;
let id;
let name;
let plugin;
let description;
let url;
let updateUrl;
let serverUrl;
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

function setUrl(url:string) {
    this.url = url;
}

function setUpdateUrl(update:string) {
    this.updateUrl = update;
}

function setAuthor(author:string) {
    this.author = author;
}