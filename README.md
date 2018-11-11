# MCBBS-Client

MCBBS 客户端

正在全速开发中，请耐心等待……

[此客户端的在线编辑地址](https://codesandbox.io/s/github/langyo/MCBBS-Client/tree/master/)

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用。

前端部分依赖 React 与 Material-UI 库进行构造，这需要 Node.js 对页面进行转译。

后端部分的桌面端依赖 Electron，移动端待定（因为跨域访问问题）。

## 版本说明

此分支的版本为 **0.1** （非常不稳定的版本，随时可能出现架构上的改变） 。

此分支的开发代号为 **原木** 。

## 具体的操作文档

### 后端库部分

后端不再依赖 Node.js 库，转而直接写可供浏览器运行的 JavaScript 代码。

#### 后端部分各个模块的具体文档

> [resources 模块](https://github.com/langyo/MCBBS-Client/blob/master/corePlugins/resourceManager/resources.md)
>
> [pageParser 模块](https://github.com/langyo/MCBBS-Client/blob/master/corePlugins/pageParser/pageParser.md)
>
> 待编辑

### 前端库部分

#### 前端部分使用的库

> [React](https://github.com/facebook/react)
>
> [React-Dom](https://github.com/facebook/react)
>
> [Prop-Types](https://github.com/facebook/prop-types)
>
> [classnames](https://github.com/JedWatson/classnames)
>
> [Google Material-UI](https://github.com/mui-org/material-ui)

#### 前端部分各个模块的具体文档

> 待编辑

# 插件管理器

插件管理器是整个客户端的核心，它负责引导、关联与执行插件代码。

对于未加装额外插件的客户端来讲，客户端只有 lib 与 corePlugin 两个部分。前者是所有插件都能使用的库的定义列表，后者则是客户端默认自带的核心插件列表。

插件可以便捷地调用由 lib 定义的各种接口，从而进行各种操作。

### pluginManager.js

插件管理的入口代码文件。在客户端启动时，首先会加载 index.html，而 index.html 最先载入的就是这个文件。

此文件在启动时，会首先载入 pluginManagerConfig.js，从而获取有关此客户端的一些最基础的信息。

### pluginManagerConfig.js

### config.json

config.json 是每个插件都应当拥有的一个配置文件，定义了有关插件的各种相关信息。

##### 元素列表

- name - 插件名称，可以是中文

- use - 是否使用，只有 'true' | 'false' 这两个类型

- sha1 - 插件代码的数字签名

- version - 当前存贮在本地的插件版本

- codes - 插件代码的字符串，在启用时客户端会将其作为 JavaScript 代码隔离在沙箱中执行

- author - 作者 ID

- localStorage - 插件在本地存贮的数据

- permissions - 插件权限列表，为 \[ 权限名 - 是否允许的布尔值 ]的值对

- sourceLibrary[\] - 依赖的其它插件 UUID 列表
