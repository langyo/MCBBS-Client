function getIDs(document){
    // 获取页面的所有 ID
    let idList = [];
    function dfs(node){
        if(node && node.nodeType === document.ELEMENT_NODE){
            if(node.id) idList.push(node.id);
        }
        let childNodes = node.childNodes;
        for(let item of childNodes){
            if(item.nodeType === 1){
                dfs(item);
            }
        }
    }
    dfs(document);
    return idList;
}

function Monkey(document){
    this.document = document;
    this.idList = getIDs(document.body);
}

Monkey.prototype.bind = function(selector, event, callback){

}

Monkey.prototype.watch = function(selector, callback){

}

Monkey.prototype.send = function(selector, event, args){

}

Monkey.prototype.getNodes = function(selector){

}

Monkey.prototype.reviewIDs = function(){
    this.idList = getIDs(this.document.body);
}