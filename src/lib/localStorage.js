/**
 *@author langyo
 *@file 本地存储支持，将原本的值对存储抽象化为非固定索引的高性能数据库
 */

let localStorage = {};

function init() {
  // DFS 搜索
  function DFS(node, path) {
    let ret = node.data;
    Object.keys(node.dataToNode).forEach(
      i =>
        (ret[i] = DFS(
          JSON.parse(localStorage.getItem("node" + node.dataToNode[i])),
          path.push(i)
        ))
    );
    if (node.more != undefined) {
      let temp = DFS(
        JSON.parse(localStorage.getItem("node" + node.more)),
        path
      );
      Object.keys(temp).forEach(i => (ret[i] = temp[i]));
    }
    // 未完成
    return ret;
  }

  localStorage = DFS(localStorage.getItem("node1"));
}
