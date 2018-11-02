/**
 *@author langyo
 *@file 本地存储支持，使得原本的扁平的值对存储可以类似 json 的复杂结构存储
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
let nodeCount = 0;
let dataCount = 0;

let init = once(() => {
  nodeCount = 0 + ls("nodeCount");
  for (let i = 0; i < nodeCount; ++i) data.push(JSON.parse(ls("node" + i)));
  dataCount = 0 + ls("dataCount");
});
init();

let initGlobal = once(() => {
  if (ls("_init") != undefined) {
    // ls("_init", "true");
  }
});

function Node(type, value) {
  this.type = type;
  switch (type) {
    case "node":
      this.value = {};
      break;
    case "list":
      this.value = [];
      break;
    case "bigData":
      this.value = new Data(value).id();
      break;
    case "data":
    default:
      this.type = "data";
      this.value = value;
      break;
  }
  this.id = nodeCount++;
  ls("nodeCount", nodeCount);
}

function Data(value) {
  this.id = dataCount++;
  this.value = value;
  ls("data" + this.id, value);
}

function slicePath(str) {
  let n,
    ret = [];
  str = str.trim();

  while ((n = str.indexOf("."))) {
    ret.push(str.slice(0, n));
    str = str.slice(n + 1).trim();
  }
  ret.push(str.trim());
  return ret;
}

function parsePath(path) {
  let nowAt = 0;

  while (path.length > 1) {
    if (data[nowAt].type !== "node" && data[nowAt].type !== "list") return;
    nowAt = 0 + data[nowAt].value[path.shift()];
  }
  return nowAt;
}

function get(path) {
  let nowAt = parsePath(slicePath(path));

  switch (data[nowAt].type) {
    case "bigData":
      return load(data[nowAt].value[path.shift()]);
    case "data":
      return data[nowAt].value[path.shift()];
    default:
      return;
  }
}

function load(id) {
  dataRecycle[id] = ls("data" + id);
  return dataRecycle[id];
}

function set(path, value) {
  path = slicePath(path);
  let name = path[path.length - 1];
  let nowAt = parsePath(path.pop());
  if (nowAt === -1) return false;

  switch (data[nowAt].type) {
    case "bigData":
      ls("data" + data[nowAt].value[name], value);
      load(data[nowAt].value[name]);
      break;
    case "data":
      data[nowAt].value[name] = value;
      ls("node" + nowAt, JSON.stringify(data[nowAt]));
      break;
    default:
      return false;
  }
  return true;
}

function addNode(path, name) {
  let nowAt = parsePath(slicePath(path));
  if (nowAt === -1) return -1;
  let n = new Node("node");
  data[n.id] = n;
  ls("node" + n.id, JSON.stringify(data[nowAt]));
  data[nowAt].value[name] = n.id;
  ls("node" + nowAt, JSON.stringify(data[nowAt]));

  return n.id;
}

function push(path, value) {
  let nowAt = parsePath(slicePath(path));
  if (nowAt === -1) return false;
  if (data[nowAt].type !== "list") return false;
  data[nowAt].value.push(value);
  return ls("node" + nowAt, JSON.stringify(data[nowAt]));
}

function insert(path, name, value, isBigData) {
  isBigData = isBigData === undefined ? false : isBigData;
  let nowAt = parsePath(slicePath(path));
  if (nowAt === -1) return false;
  if (data[nowAt].type !== "node") return false;
  data[nowAt].value[name] = value;
  return ls("node" + nowAt, JSON.stringify(data[nowAt]));
}

function remove(path) {
  let nowAt = parsePath(slicePath(path));
}
