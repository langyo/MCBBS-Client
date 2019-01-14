const remote = require("electron").remote;
const {BrowserWindow} = remote;

import shortid from "shortid";

import WebView from "./webview";

import pageBindScript from "../../scripts/forumWorker/pageBindScript";

function handleCallBack(n) {
    console.log(n);
    switch (n.state) {
        case 'newTask':
            console.log('Done! ' + this.url);
            for (let i of n.newTask) {
                console.log('Loading: ' + i);
                console.log(this);
                newBrowser(i);
            }
            break;
        case 'success':
            console.log('Done! ' + this.url);
            break;
        case 'error':
            console.error('There\'s someting wrong at this url :' + this.url)
            console.error(n.data);
            break;
        case 'log':
            console.log(n.data);
        default:
    }
}

function newBrowser(url) {
    for (let i of Object.keys(pageBindScript)) {
        for (let exprString of Object.keys(pageBindScript[i].url)) {
            // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
            let expr = new RegExp(exprString);
            if (expr.test(url)) {
                console.log("成功匹配 " + url);
                let wnd = new BrowserWindow({
                    width: 800,
                    height: 600,
                    show: true
                });
                wnd.loadURL(`file://${__dirname}/public/workpage.html`);
                remote.getGlobal("taskWnd").push(wnd);
                console.log(this.virtualBrowsers);
            }
        }
    }
    // 没有任何匹配时，当然就要报错了
    throw Error("URL 解析错误：已阅，狗屁不通！");
}

console.log("已加载 Virtual Browser");
// 以下为调试代码
this.newBrowser("http://www.mcbbs.net/thread-834717-1-1.html");

