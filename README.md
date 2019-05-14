# MCBBS-Client \(MCBBS 客户端\)

<div align="center">
<a href="http://miao.su/image/HdIbf">
<img src="http://miao.su/images/2018/12/24/447a2b32e7ec7bd5fb486.md.png" width="200" height="200">
</a>
</div>
<br />
<div align="center">
<a href="https://travis-ci.com/langyo/MCBBS-Client">
<img src="https://travis-ci.com/langyo/MCBBS-Client.svg?branch=master">
</a>
<img src="https://badges.depfu.com/badges/dbdc735d3c1f776180e36eb3fbc572fd/overview.svg">
</div>

正在全速开发中，请耐心等待……

[Gitbook wiki 主页](https://mcbbs-client-developer.gitbook.io/mcbbs-client-dev/)

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用，并依托于本地平台。

前端部分依赖 React 库与 Material-UI 库进行构造，并使用 Reflux 库进行数据库与界面的数据交换。这需要依赖 Node.js 环境对页面进行预先转译。

后端部分的桌面端依赖 Electron 、 Node 与 Java，移动端依赖 Ionic。

~~Electron 是电子，Ionic 是离子，这些库的取名真好玩啊。~~

## 版本说明

此分支的版本为 **0.3**。

此分支的开发代号为 **沙子** 。

## 安装

> 请先安装 Git 与 Node 环境！

```
git clone https://github.com/langyo/MCBBS-Client.git
npm run autoinstall
```

## 源码结构说明

* /native - 平台相关部分代码。
  * /desktop - 以 electron 为核心开发的部分。
    * /server - 与桌面端配套的 Node 本地服务端部分。
    * /javaServer - 与桌面端配套的 Java 本地服务端部分。
  * /mobile - 以 ionic 为核心开发的部分。
* /src - 平台无关部分代码。
* /docs - 客户端的网站前端，含下载页与开发者文档等。
* /demos - 用于实验客户端各种功能的杂项文件夹。
  * /algorithms - 用于测试算法。
  * /components - 用于测试界面元素。
  * /sockets - 用于测试 Socket 连接。
  * /utils - 无法准确分类的测试。
  * /views - 用于测试界面中完整的页面组件。
