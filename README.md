# MCBBS-Client

MCBBS 客户端

正在全速开发中，请耐心等待……

[此客户端的在线编辑地址](https://codesandbox.io/s/github/langyo/MCBBS-Client/tree/master/)

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用。

前端部分依赖 React 与 Material-UI 库进行构造，这需要依赖 Node.js 环境对页面进行转译。

后端部分的桌面端依赖 Electron，移动端依赖 React-Native。

## 版本说明

此分支的版本为 **0.1** （非常不稳定的版本，随时可能出现架构上的改变） 。

此分支的开发代号为 **原木** 。

## 源码结构说明

- /native
  依赖于对应平台的核心源代码。
  - /electron
    以 electron 为核心开发的客户端部分。
  - /reactNative
    以 reactNative 为核心开发的客户端部分。
- /web

- /plugin

## 具体的操作文档

### 后端库文档

> [本地核心 API（只能由客户端钦定的一部分 JavaScript 插件执行）](https://github.com/langyo/MCBBS-Client/blob/master/native/api.md)
>
> 插件 API（待编辑）
>
> 插件配置文件说明（config.json）（待编辑）

### 前端部分使用的库

> [React](https://github.com/facebook/react)
>
> [React-Dom](https://github.com/facebook/react)
>
> [Prop-Types](https://github.com/facebook/prop-types)
>
> [classnames](https://github.com/JedWatson/classnames)
>
> [Google Material-UI](https://github.com/mui-org/material-ui)
