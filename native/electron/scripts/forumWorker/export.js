"use strict";

(() => {
  console.log("已开始加载 preload 脚本");
  console.log("当前的 location :" + location.href); // 当页面完整加载完成后，开始装载对应的解析器等脚本

  window.onload = n => {
    console.log("已载入完毕，现在加载解析器（pageParser）");
    console.log(require("./pageParser/watchThread"));
  };
})();