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
<h3>主仓库</h3>
</div>

欢迎使用 MCBBS 客户端，这里是 MCBBS 客户端的源代码仓库。

[论坛首页](http://www.mcbbs.net)

[项目展示首页](https://app.langyo.xyz)

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用，并依托于本地平台。

前端部分依赖 React 库与 Material-UI 库进行构造，并使用 Reflux 库进行数据库与界面的数据交换。这需要依赖 Node.js 环境对页面进行预先转译。

后端部分的桌面端主要依赖 Electron，移动端主要依赖 Crodova。

## 版本说明

当前 dev 分支的版本为 **0.5.0**，开发代号为 **熔炉** 。

## 工作指南

> 请先安装 Git 与 Node 环境！
>
> 强烈建议使用 VSCode 进行开发！不论您使用什么语言，这个 IDE 都值得您使用！
>
> 对于 C++ 与 C# 开发者，建议额外使用 Visual Studio；对于 Java 开发者，建议额外使用 IDEA。

在开始之前，您应当先设置自己的 Git 用户名和邮箱，这是 Github 识别您的提交的依据！

```git config user.name <您在Github上的用户名>```

```git config user.email <您在Github上注册时使用的邮箱>```

先拉取仓库：

（对于协作者）

```git clone https://github.com/langyo/MCBBS-Client.git```

（对于其他人，您需要先右上角 Fork，然后拉取您自己的 Fork 仓库）

```git clone https://github.com/<Github用户名>/MCBBS-Client.git```

然后执行子模块刷新：

```git submodule init```

如果您已经克隆过该仓库，但需要进行子模块同步，请执行：

```
git pull
git submodule sync
```

协作者权限与小组成员身份以邀请制发放。

## 子仓库说明

> 需要注意的是，在各个子模块下将只存在其所负责的子项目，这有助于开发者专注于其正在开发的那部分模块。
>
> 项目已于 0.5.0 版本子模块化！~

- ```native-desktop-electron```
  桌面端的 H5 部分，并提供对底层 Electron 桥接。

- ```native-desktop-node```
  桌面端的 Node 部分，提供对 Node 本地服务端的支持，并由此桥接到其它语言编写的插件客户端。

- ```native-desktop-java```
  桌面端的 Java 部分，提供对 Java 插件的支持。

- ```native-desktop-cs```
  桌面端的 C# 部分，提供对 C# 插件的支持。

- ```native-desktop-cpp```
  桌面端的 C++ 部分，提供对 C++ 插件的支持。

- ```native-mobile-cordova```
  移动端的 H5 部分，并提供对底层 Cordova 桥接。

- ```core```
  平台无关代码（JavaScript）部分，具体请查看对应的分支。这应该算是整个项目最重要的一个分支了。

- ```res-live2d```

  用于放置Live2D 资源，主要用于贮存客户端使用的 Live2D 虚拟形象模型。
  
- ```res-wallpaper```

  用于放置背景图片资源。

- ```website```
  客户端的前端宣传网站，它是独立开发的。
