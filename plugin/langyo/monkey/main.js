function Monkey(document){
    this.document = document.body;
    this.actions = {};
}

Monkey.prototype.send = function(selector, event){
    eval(document.querySelectorAll(selector).getAttribute(event));
};

Monkey.prototype.filterNode = function(selectorList){
    let ret = {};
    for(let i of selectorList){
        ret[i] = this.document.querySelectorAll(i);
    }
    return ret;
};

Monkey.prototype.defineActions = function(name, actions){
    // 无效动作检查
    for(let i of actions){
        switch(i.type){
            case 'send':
            
            case 'filterNode':

            case 'runActions':

            default:
                throw new Error('未知动作');
        }
    }

    this.actions[name] = actions;
}

Monkey.prototype.runActions = function(actions){
    let nextInput;
    for(let i of actions) nextInput = this[this.actions[i].type].apply(this.actions[i].data.push(nextInput));
}