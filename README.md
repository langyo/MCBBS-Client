# MCBBS-Client (MCBBS 客户端)

<div align="center">
<a href="http://miao.su/image/HdIbf">
<img src="http://miao.su/images/2018/12/24/447a2b32e7ec7bd5fb486.md.png" width="200" height="200">
</a>
</div>

<div align="center">
[![Build Status](https://travis-ci.com/langyo/MCBBS-Client.svg?branch=master)](https://travis-ci.com/langyo/MCBBS-Client)
</div>

正在全速开发中，请耐心等待……

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用。

前端部分依赖 React 与 Material-UI 库进行构造，这需要依赖 Node.js 环境对页面进行转译。

后端部分的桌面端依赖 Electron，移动端依赖 React-Native。

## 版本说明

此分支的版本为 **0.2**。

此分支的开发代号为 **圆石** 。

## 调试方式

### 平台无关部分

在进行任何调试前，你都应当启用平台无关部分的实时编译。

    // 进入 scripts 文件夹
    cd scripts
    // 安装依赖
    npm i
    // 启动监视
    npm run watch

### 桌面端（electron）

    // 进入 electron 文件夹
    cd native/electron
    // 安装依赖
    npm i
    // 启动文件监视
    npm run watch
    // 运行
    npm start

### 移动端（react native）

React native 的工程文件夹（native/reactNative）下分别有对应于 Android Studio 与 XCode 的工程文件（分别是 android/build.gradle 与 ios/MCBBSClient.xcodeproj/project.pbxproj），直接使用对应开发环境打开此类文件即可进行测试，测试时 react native 会自动调用 react native packager 对源代码进行打包。

在开始调试前，你应当执行以下命令：
    npm start

## 源码结构说明

- /native - 平台相关部分代码。
  - /electron - 以 electron 为核心开发的客户端部分。
  - /reactNative - 以 reactNative 为核心开发的客户端部分。
- /scripts - 平台无关部分代码。

> P.S. 插件功能搁置中，后续再补