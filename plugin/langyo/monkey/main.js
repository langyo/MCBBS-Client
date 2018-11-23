function Monkey(document){
    this.document = document;

    // 获取 ID 列表
    this.id = (function dfs(node){
        let ret = [];
        for(let i of node.childNodes){
            if(i.id) ret.push(i.id);
            if(i.nodeType === 1){
                let n = dfs(i);
                for(let j of i) ret.push(j);
            }
        }
    })(document.body);
}

Monkey.prototype.bind = function(selector, event, callback){

}

Monkey.prototype.watch = function(selector, callback){
    
}