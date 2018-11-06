/**
 *@author langyo
 *@file 页面解析支持，对不同的页面进行解析，并向 resources 与 localStorage 写入正确的数据结构
 */

import React, { Component, Fragment } from "react";

function querySelection(doc, str) {}

function DOMElements(doc, elements) {}

DOMElements.prototype = {
  getIds: function() {},
  getClasses: function() {},
  getListeners: function(listenerType) {},
  getInnerText: function() {},
  at: function(pos) {}
};

function DOMElement(element) {}

DOMElement.prototype = {
  getIds: function() {},
  getClasses: function() {},
  getListeners: function(listenerType) {},
  getInnerText: function() {}
};

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
