class Monkey {
    constructor(document) {
        this.document = document.body;
        this.actions = {};
    }
    send(selector, event) {
        eval(document.querySelectorAll(selector).getAttribute(event));
    }
    filter(selector) {
        let ret = {};
        for (let i of selectorList) {
            ret[i] = this.document.querySelectorAll(i);
        }
        return ret;
    }
    select(selector) {
        return this.document.querySelectorAll(selector);
    }
    defineActions(name, actions) {
        // 无效动作检查
        for (let i of actions) {
            switch (i.type) {
                case 'send':
                case 'filter':
                case 'run':
                case 'reduce':
                case 'select':
                    break;
                default:
                    throw new Error('未知动作');
            }
        }
        this.actions[name] = actions;
    }
    run(actions) {
        let nextInput, tempData;
        for (let i of actions) {
            let n = this[this.actions[i].type](nextInput, tempData);
            nextInput = n.nextInput ? n.nextInput : [];
            tempData = n.tempData ? n.tempData : {};
        }
        return tempData;
    }
}





