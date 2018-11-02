# MCBBS-Client

MCBBS 客户端

正在全速开发中，请耐心等待……

[此客户端的在线编辑地址](https://codesandbox.io/s/github/langyo/MCBBS-Client/tree/master/)

## 此客户端的开发模式

此客户端本体属于 HTML5 应用，理论上可以放置在任何网站上供任何现代浏览器运行。此客户端的所有页面必须使用 React 进行编译。

如果要使网页能够适应于浏览器环境，必须先使用诸如 Browserify 这样的转译库进行转换；如果要使得网页能够作为本地化应用使用，需要使用诸如 Electron 这样的库。