let out = {};

for (let i of Object.keys(pageBindScript)) {
    console.log(i);
    for (let exprString of pageBindScript[i].urlReg) {
      console.log(exprString);
      // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
      let expr = new RegExp(exprString);
      if (expr.test(location.href)) {
        out = require("./" + pageBindScript[i].preload[0]);
      }
    }
  }