# 本地 API 说明

客户端仅凭纯浏览器环境是无法做到应当做到的功能的，所以就需要依赖的应用程序框架额外提供一些功能。

目前决定使用的可以自定义编程的应用程序框架有：

- Electron : 桌面端支持 (Windows / Linux / MacOS)
- React Native : 移动端支持 (Android / iOS)

# 本地 API 大纲

- ClientRequest - HTTP/HTTPS 协议请求支持
- File - 文件操作支持
- LocalDatabase - 本地数据库支持
- View - 界面控制支持
- Browser - 浏览器实体支持；这里的浏览器可以是虚拟浏览器，也可以通过将其绑定在一个 View 实体上使之成为一个可视的浏览器窗口，你还可以控制是否为此浏览器实体提供本地 API
- DownloadItem - 资源下载支持；可以指定下载路径到 LocalDatabase 并以 Base64 形式存储
- Process - 直接与系统 API 沟通，它有许多分模块
  - ClipBoard - 剪贴板支持
  - Shell - 命令行支持
  - Tray - 对于桌面端，它提供系统托盘支持；对于移动端，它提供常驻服务与通知支持
  - Notification - 对于桌面端，它提供系统托盘气泡支持；对于移动端，它提供推送下拉菜单通知支持
  - PowerMonitor - 电源健康情况支持与电源状态监视支持
  - Log - 调试支持；可以通过提供行号、消息类型等信息帮助其更好的构造日志
  - Time - 时间与日期支持

## File API

- readDir(path)

获取指定路径下的文件列表，此路径指向的必须是一个文件夹；返回一个包含若干文件名的数组；如出现问题，返回一个包含错误信息的字符串。

- getState(path)

获取指定路径的属性，例如用于判断某个路径是否为目录；返回一个有若干可调用方法的实例。

### 方法列表

    - isDirectory() 是否为目录；返回一个布尔值。
    - isHidden() 是否为一个隐藏文件；返回一个布尔值。
    - latestChangeTime() 获取此路径的最后修改事件；返回一个表示时间的字符串，格式为 yy-mm-dd-hh:mm:ss。

- readFile(path, code)

读取文件；返回一个事件分配器，你可以用 on() 方法为其创建事件侦听器。
