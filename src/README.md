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

<div align="center">
<h3>平台无关代码分支</h3>
</div>

欢迎来到平台无关代码分支！这大概是整个客户端最核心的部分之一了，因为它负责了客户端前端部分的所有内容！

代码结构如下：

- forumWorker
  用于分析来自论坛的页面，并模拟用户操作。它不能单独工作，需要对接到本地后端的网络通信模块才能正常工作。
  
  本质上，它是一个插件，会向```moduleManager```注册自己的解析指令函数。
- viewManager
  用于控制整个客户端的前端界面显示。使用 JSX 构建，依赖于 [React](https://zh-hans.reactjs.org/)、[Reflux](https://github.com/reflux/refluxjs) 与 [Material-UI](https://material-ui.com/zh/) 框架。

  另外，我们还使用了 [mdi-material-ui](https://materialdesignicons.com/) 图标库~

  不过，请注意，它只包含了界面代码，没有包含事件处理与数据控制，这些都在```resourceManager```中。
- resourceManager
  用于控制前端的界面数据，通过动作监听与触发获取用户对界面所做的一切事件，并对其作出处理，处理完成后会将数据反馈回界面。

  要想看懂这究竟是什么操作，请阅读开发者文档，并结合 Reflux 官方提供的资料理解这种模式。
- moduleManager
  用于管理其对外以 WebSocket 通讯时所用的模块。这同时包含自身 HTML5 端所创建的模块，以及对方 Node 本地服务端乃至整个客户端的所有可用模块。
