function Monkey(document){
    this.document = document;

    // 获取页面的所有 ID
    let idList = [];
    function dfs(node){
        if(node && node.nodeType === document.ELEMENT_NODE){
            if(node.id) idList(node.id);
        }
        let childNodes = node.childNodes;
        for(let i = 0; i < childNodes.length; ++i){
            let item = childNodes[i];
            if(item.nodeType === 1){
                dfs(item);
            }
        }
    }
    dfs(document.body);

    this.idList = idList;
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
    // 获取页面的所有 ID
    let idList = [];
    function dfs(node){
        if(node && node.nodeType === document.ELEMENT_NODE){
            if(node.id) idList(node.id);
        }
        let childNodes = node.childNodes;
        for(let i = 0; i < childNodes.length; ++i){
            let item = childNodes[i];
            if(item.nodeType === 1){
                dfs(item);
            }
        }
    }
    dfs(document.body);

    this.idList = idList;
}