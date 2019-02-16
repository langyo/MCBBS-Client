(() => {
  let pageBindScript = require('./pageBindScript').default;

  let ipcRenderer = require('electron').ipcRenderer;

  // 当页面完整加载完成后，开始装载对应的解析器等脚本
  window.onload = (n) => {
    for (let i of Object.keys(pageBindScript)) {
      console.log(i);
      for (let exprString of pageBindScript[i].urlReg) {
        console.log(exprString);
        // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
        let expr = new RegExp(exprString);
        if (expr.test(location.href)) {
          ipcRenderer.sendToHost(JSON.stringify(require("./" + pageBindScript[i].preload[0])));
          return;
        }
      }
    }
  };

})()