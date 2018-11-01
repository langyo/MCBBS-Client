/**
 *@author langyo
 *@file 本地存储支持，将原本的值对存储抽象化为非固定索引的高性能数据库
 */

let localStorage = {};

function init() {
  // DFS 搜索
  function DFS(node) {
    let ret = node.data;
    for (let i in node.dataToNode)
      if (node.dataToNode.hasOwnProperty(i))
        ret[i] = DFS(
          JSON.parse(localStorage.getItem("node" + node.dataToNode[i]))
        );
    let temp = DFS(JSON.parse(localStorage.getItem("node" + node.more)));
    for (let i in temp) if (temp.hasOwnProperty(i)) ret[i] = temp[i];
    return ret;
  }

  localStorage = DFS(localStorage.getItem("node1"));
}
