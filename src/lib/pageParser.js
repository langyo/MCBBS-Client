/**
 *@author langyo
 *@file 页面解析支持，对不同的页面进行解析，并向 resources 与 localStorage 写入正确的数据结构
 */

import React, { Component, Fragment } from "react";

function querySelection(doc, str) {
  let tasks = [];
  str = str.trim();
  let elements = doc.body.childNodes;

  function parse(element, tasks) {
    let temp = element.getElementByClassName(tasks[0]);
    let results = [];
    for (let i = 0; i < temp.length; ++i) {
      let n = parse(temp[i], tasks.shift());
      for (let i = 0; i < n.length; ++i) {
        results.push(n[i]);
      }
    }
    return results;
  }

  // 解析 tag
  if (str[0] !== ".") {
    let pos = str.indexOf(".");
    let task = str.substr(0, pos).trim();
    str = str.substr(pos).trim();

    // 进行第一轮解析
    let temp = [];
    for (let i = 0; i < elements.length; ++i) {
      temp.push(elements[i].getElementByTagName(task));
    }
    elements = temp;
  }
  // 解析 class
  while (str.length > 0) {
    let pos = str.substr(1).indexOf(".");
    let task = str.substr(0, pos);
    tasks.push(task);
    str = str.substr(pos).trim();
  }

  return new DOMElements(doc, parse(elements, tasks));
}

function getIds(elements) {}

function getClasses(elements) {}

function getListeners(elements, listenerType) {}

function getInnerText(elements) {}

function getAttributes(elements, attribute) {}

function createReg(regStr) {
  return function(str) {
    const reg = new RegExp(regStr);
    return reg.exec(str);
  };
}

class VirtualBrowser extends React.Component {
  render() {
    return;
  }
}

class VirtualBrowserDocumentDebugger extends React.Component {
  render() {
    return;
  }
}
