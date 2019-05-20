import { EventEmitter } from 'events';

let emitter = new EventEmitter();

let result = "";

emitter.on('test', () => {
    console.log("异步函数开始执行");
    for(let i = 0; i < 1000000; ++i);
    console.log("异步函数结束执行");
    result = "异步函数结果";
});

console.log("同步进程开始执行");
console.log((function *(){
    yield emitter.emit('test');
})().next());
console.log("同步进程结束执行, ", result);