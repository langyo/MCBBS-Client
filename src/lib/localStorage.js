/**
 *@author langyo
 *@file 本地存储支持，将原本的值对存储抽象化为非固定索引的高性能数据库
 */

let localStorage = {};
let syncLog = [];

function init() {
  // DFS 搜索
  function DFS(node, path) {
    let ret = node.data;

    Object.keys(node.dataToNode).forEach(i => {
      let tempPath = path;
      ret[i] = DFS(
        JSON.parse(localStorage.getItem("node" + node.dataToNode[i])),
        tempPath.push(i)
      );
    });
    if (node.more != undefined) {
      let temp = DFS(
        JSON.parse(localStorage.getItem("node" + node.more)),
        path
      );
      Object.keys(temp).forEach(i => (ret[i] = temp[i]));
    }

    ret.prototype.__defineSetter__(
      "set",
      (name, value) => {
        let log = this.path;
        log.push(name);
        syncLog.push(log); // 待修改
        this[name] = value;
      }
    );

    // setter:'delete'

    return ret;
  }

  localStorage = DFS(localStorage.getItem("node1"));
}
