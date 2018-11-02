/**
 *@author langyo
 *@file 本地存储支持
 */

import ls from "local-storage";

const once = fn => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};

let data = [];
let dataRecycle = {};

let init = once(() => {
  let nodeCount = 0 + ls("nodeCount");
  for (let i = 0; i < nodeCount; ++i) data.push(JSON.parse(ls("node" + i)));
});
init();

let initGlobal = once(() => {
  if (ls("_init") != undefined) {
    ls("_init", "true");
  }
});
