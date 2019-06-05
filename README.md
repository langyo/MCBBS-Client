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

欢迎进入开发者分支，请仔细阅读 README 后再进行开发。

[Gitbook wiki 主页](https://mcbbs-client-developer.gitbook.io/mcbbs-client-dev/)

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用，并依托于本地平台。

前端部分依赖 React 库与 Material-UI 库进行构造，并使用 Reflux 库进行数据库与界面的数据交换。这需要依赖 Node.js 环境对页面进行预先转译。

后端部分的桌面端主要依赖 Electron 与 Node，移动端主要依赖 Ionic 与 Crodova。

~~Electron 是电子，Ionic 是离子，这些库的取名真好玩啊。~~

## 版本说明

此分支的版本为 **0.4**。

此分支的开发代号为 **工作台** 。

## 安装

> 请先安装 Git 与 Node 环境！

> 强烈建议使用 VSCode 进行开发！不论您使用什么语言，这个 IDE 都值得您使用！

> 对于 C++ 与 C# 开发者，建议额外使用 Visual Studio；对于 Java 开发者，建议额外使用 IDEA。

```git clone https://github.com/langyo/MCBBS-Client.git```

然后，进入自己需要参与开发的分支：

```git checkout <分支名>```

您可以选择进入的分支如下：

- native-desktop-h5
  桌面端的 H5 部分，提供对底层 Electron 桥接的壳子网页。
- native-desktop-node
  桌面端的 Node 部分，提供对 Node 本地服务端的支持，并由此桥接到其它语言编写的插件客户端。
- native-desktop-java
  桌面端的 Java 部分，提供对 Java 插件的支持。
- native-desktop-cs
  桌面端的 C# 部分，提供对 C# 插件的支持。
- native-desktop-cpp
  桌面端的 C++ 部分，提供对 C++ 插件的支持。
- native-mobile-h5
  移动端的 H5 部分，提供对底层 Ionic 桥接的壳子网页。
- native-mobile-crodova
  移动端的 crodova 部分，用于 Ionic 基底的开发，以及对 Crodova 插件的支持。
- src-resourceManager
  平台无关代码（JavaScript）的资源管理器部分，主管以 Reflux 控制的前端资源控制，包括数据驱动和触发器。
- src-viewManager
  平台无关代码（JavaScript）的视图管理器部分，主管以 JSX 编写的界面进行控制。
- src-moduleManager
  平台无关代码（JavaScript）的模块管理器部分，主管对 WebSocket 连接中具体指令执行函数的注册与模块信息注册。
- res-live2d
  用于放置 Live2D 资源，主要用于贮存客户端使用的 Live2D 虚拟形象模型
- res-vr
  用于放置 VR 资源，主要用于贮存客户端前端使用的动态背景全景图/方块图
- website
  客户端的前端宣传网站，一般不与其它分支合并
- dev
  开发分支，所有当前的开发成果请向这里合并
- master
  根分支，请勿动它

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
