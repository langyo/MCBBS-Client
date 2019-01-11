(() => {
  let pageBindScript = require('./pageBindScript');

  let ipcRenderer = require('electron').ipcRenderer;

  ipcRenderer.sendToHost(JSON.stringify({ state: 'log', data: pageBindScript }));

  // 当页面完整加载完成后，开始装载对应的解析器等脚本
  window.onload = (n) => {
    for (let i of Object.keys(pageBindScript)) {
      for (let exprString of pageBindScript[i].url) {
        // 如果匹配对应正则表达式，则凭此项对应的 preload 列表初始化内容
        let expr = new RegExp(exprString);
        if (expr.test(url)) {
          for (let j of i.preload) {
            ipcRenderer.sendToHost(JSON.stringify({ state: 'log', data: i.preload.j }))
            ipcRenderer.sendToHost(JSON.stringify(require("./" + j)));
          }
        }
      }
    }
  };
})()