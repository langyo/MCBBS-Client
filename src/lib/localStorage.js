/**
 *@author langyo
 *@file 本地存储支持
 */

let localStorage = {};
let hasInitialized = false;

// 初始化函数
(() => {
  if (hasInitialized) return;

  hasInitialized = true;

  // DFS 搜索
  function DFS(node) {
    let ret = node.data;

    Object.keys(node.dataToNode).forEach(
      i => (ret[i] = DFS(JSON.parse(localStorage["node" + node.dataToNode[i]])))
    );
    if (node.more != undefined) {
      let temp = DFS(JSON.parse(localStorage["node" + node.more]));
      Object.keys(temp).forEach(i => (ret[i] = temp[i]));
    }

    return ret;
  }

  localStorage = DFS(localStorage["node0"]);
})();

/**
 *@description 对具体某个路径的数据进行同步，将内存里的数据写入 localStorage
 *@param {Array} path 要同步的节点路径，以数组表示
 */
/**@todo 这部分来不及写了，代码暂时不用 */
function sync(path) {
  function DFS(path, data, storageId) {
    if (path.length > 0) {
      // 还未到达最终要更新的节点
      let key = path.shift();
      let stoarge = JSON.parse(localStorage["node" + storageId]);

      let hasNode = false;
      Object.keys(data).forEach(
        i => (hasNode = stoarge[i] === key ? "localData" : hasNode)
      );
      Object.keys(stoarge.data).forEach(
        i => (hasNode = stoarge[i] === key ? "data" : hasNode)
      );
      Object.keys(stoarge.dataToNode).forEach(
        i => (hasNode = stoarge[i] === key ? "dataToNode" : hasNode)
      );
      Object.keys(stoarge.dataCache).forEach(
        i => (hasNode = stoarge[i] === key ? "dataCache" : hasNode)
      );

      if (hasNode !== false) data = data[key];
      switch (hasNode) {
        case "localData":
          return DFS(path, data, storageId);
        case "data":
          return DFS(path, data, storageId);
        case "dataToNode":
          return DFS(path, data, stoarge.dataToNode[key]);
        case "dataCache":
          return DFS(path, data, stoarge.dataCache[key]);
        default:
          return undefined;
      }
    } else {
      // 到达了要更新的节点，开始刷新存储
    }
  }
}
