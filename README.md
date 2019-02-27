# MCBBS-Client (MCBBS 客户端)

<div align="center">
<a href="http://miao.su/image/HdIbf">
<img src="http://miao.su/images/2018/12/24/447a2b32e7ec7bd5fb486.md.png" width="200" height="200">
</a>
</div>

<div align="center">
<a href="https://travis-ci.com/langyo/MCBBS-Client">
<img src="https://travis-ci.com/langyo/MCBBS-Client.svg?branch=master">
</a>
</div>

正在全速开发中，请耐心等待……

[wiki 主页](https://langyo.github.io/MCBBS-Client/docs/index)

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用。

前端部分依赖 React 库与 Material-UI 库进行构造，并使用 Reflux 库进行数据库与界面的数据交换。这需要依赖 Node.js 环境对页面进行预先转译。

后端部分的桌面端依赖 Electron，移动端依赖 Ionic。

~~Electron 是电子，Ionic 是离子，Atom是原子，这些库的取名真好玩~~

## 版本说明

此分支的版本为 **0.2**。

此分支的开发代号为 **圆石** 。

## 调试方式

### 桌面端（electron）
```sh
// 安装依赖
npm i
// 启动文件监视
npm run watch
// 运行
npm run electron:start
```
### 移动端（ionic）
```sh
// 安装依赖
npm i
// 启动监视
npm run watch
// 构建
npm run ionic:build
```
## 源码结构说明

- /native - 平台相关部分代码。
  - /electron - 以 electron 为核心开发的客户端部分。
  - /ionic - 以 ionic 为核心开发的客户端部分。
- /scripts - 平台无关部分代码。

> P.S. 插件功能搁置中，后续再补
