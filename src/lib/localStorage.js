/**
 *@author langyo
 *@file 本地存储支持，将原本的值对存储抽象化为非固定索引的高性能数据库
 */

let localStorage = {};

function init() {
  let queue = [1];
  // BFS 搜索
  while (queue.length > 0) {
    let node = JSON.parse(localStorage.getItem("node" + queue.shift()));
    // 未完成
  }
}
