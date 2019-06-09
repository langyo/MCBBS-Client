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
<h3>开发分支（dev 分支）</h3>
</div>

欢迎进入开发者分支，请仔细阅读 README 后再进行开发。

[Gitbook wiki 主页](https://mcbbs-client-developer.gitbook.io/mcbbs-client-dev/)

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用，并依托于本地平台。

前端部分依赖 React 库与 Material-UI 库进行构造，并使用 Reflux 库进行数据库与界面的数据交换。这需要依赖 Node.js 环境对页面进行预先转译。

后端部分的桌面端主要依赖 Electron，移动端主要依赖 Crodova。

## 版本说明

当前 dev 分支的版本为 **0.4.0**，开发代号为 **工作台** 。

## Git 工作指南

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

然后，命令行进入拉取的仓库文件夹内输入以下指令，进入自己想参与开发的分支：

```git checkout <分支名>```

您可以选择进入的分支如下：

- ```native-desktop-h5```
  桌面端的 H5 部分，提供对底层 Electron 桥接的壳子网页。

- ```native-desktop-node```
  桌面端的 Node 部分，提供对 Node 本地服务端的支持，并由此桥接到其它语言编写的插件客户端。

- ```native-desktop-java```
  桌面端的 Java 部分，提供对 Java 插件的支持。

- ```native-desktop-cs```
  桌面端的 C# 部分，提供对 C# 插件的支持。

- ```native-desktop-cpp```
  桌面端的 C++ 部分，提供对 C++ 插件的支持。

- ```native-mobile-h5```
  移动端的 H5 部分，提供对底层 Ionic 桥接的壳子网页。

- ```native-mobile-crodova```
  移动端的 crodova 部分，用于 Ionic 基底的开发，以及对 Crodova 插件的支持。

- ```src```
  平台无关代码（JavaScript）部分，具体请查看对应的分支。这应该算是整个项目最重要的一个分支了。

- ```res-live2d```
  用于放置 Live2D 资源，主要用于贮存客户端使用的 Live2D 虚拟形象模型。

- ```res-vr```
  用于放置 VR 资源，主要用于贮存客户端前端使用的动态背景全景图/方块图。

- ```website```
  客户端的前端宣传网站，一般不与其它分支合并。

- ```dev```
  开发分支，所有当前的开发成果请向这里合并。

- ```master```
  根分支，只能当 dev 分支有 release 时才会被修改，请勿动它。

最后，您需要在自己本地新建属于自己的分支，这里使用的名字为 work：

```git branch work```

后续要进入自己的工作分支，请使用```checkout```这个命令：

```git checkout work```

如果需要提交自己工作分支上所作的修改，请使用```commit```这个命令：

```git commit -m "提交的理由；请勿瞎写，您应当对您上传的每一次提交负责！"```

------

接下来是如何正确地将您的修改提交到 Github 上，请注意，在操作之前您一定要记得所有的修改都已经以```commit```提交到本地分支中，否则```checkout```操作很可能会把您之前努力的成果全部删除！

另外，对于协作者，由于您直接拥有读写源仓库的权限，所以**必须**使用以下的方法进行提交！对于其他用户（例如普通的贡献者），请使用您 Fork 的分支。

首先需要同步您的计算机上的非本地分支：

```git checkout <您正在参与开发的远程分支>```

```git pull```

```git checkout <之前您使用的属于自己的本地分支>```

然后使用```rebase```合并远程已有的修改，这是为了防止您的修改与其他人在您修改时提交的修改产生冲突：

```git rebase <您正在参与开发的远程分支>```

此时 Git 可能会提示您有冲突，您可以通过 IDE 便捷地解决冲突。VSCode 等 IDE 会有专用的界面提供。

回到远程分支，并合并您本地的更改：

```git checkout <您正在参与开发的远程分支>```

```git merge <之前您使用的属于自己的本地分支>```

最后提交：

```git pull```

------

如果您是协作者，并且直接操作了源仓库，可以不需继续看下去，直接以上述步骤做就好了。如果您是其他人（贡献者），您需要在 Github 上进行操作，发起对源仓库的 Pull Request 请求，待任意协作者合并了您的合并请求后，您的代码才会正式出现在项目中。

协作者权限以邀请制发放。

## 源码结构说明

> 需要注意的是，在各个子分支下将只存在其所负责的子文件夹，这有助于开发者专注于其正在开发的那部分模块。
>
> 你或许会对依赖有疑问，因为分支的切换会删除当前工作树下的文件。我的答案是，如果依赖库都在你切换前与切换后两个分支的 .gitignore 下，依赖一般都不会被 Git 自己删除\~所以放心开发\~
>
> 项目已于 0.4.0 版本扁平化！~

- ```./native-desktop-electron/```
  桌面端的 H5 部分，并提供对底层 Electron 桥接。

- ```./native-desktop-node/```
  桌面端的 Node 部分，提供对 Node 本地服务端的支持，并由此桥接到其它语言编写的插件客户端。

- ```./native-desktop-java/```
  桌面端的 Java 部分，提供对 Java 插件的支持。

- ```./native-desktop-cs/```
  桌面端的 C# 部分，提供对 C# 插件的支持。

- ```./native-desktop-cpp/```
  桌面端的 C++ 部分，提供对 C++ 插件的支持。

- ```./native-mobile-cordova/```
  移动端的 H5 部分，并提供对底层 Cordova 桥接。

- ```./src/```
  平台无关代码（JavaScript）部分，具体请查看对应的分支。这应该算是整个项目最重要的一个分支了。

- ```./res/```

  用于放置资源文件。其中，Live2D 资源，主要用于贮存客户端使用的 Live2D 虚拟形象模型。background 放置背景图片资源，包括静态与动态的。

- ```./website/```
  客户端的前端宣传网站，一般不与其它分支合并，它是独立开发的。
