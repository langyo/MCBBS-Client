"use strict";

(() => {
  let pageBindScript = require('./pageBindScript');

  let ipcRenderer = require('electron').ipcRenderer; // 当页面完整加载完成后，开始装载对应的解析器等脚本


  window.onload = n => {
    ipcRenderer.sendToHost(JSON.stringify(require("./pageParser/watchThread")));
  };
})();