# Socket 多元通信协议说明

Node 进程作为所有其它端的 WebSocket 服务端，端口号 9233。

不同端之间的通讯采用发送类似 minecraft 指令的形式，并且指令只有两个。

下面是所有指令的列表：

| 命令名 | 参数表 | 说明 |
| :- | :- | :- |
| execute | <路由> <包名> <具体子命令> \[具体参数...\] | 请求执行某个模块下注册的某个指令。路由为一个类似```XXX->XXX```格式的文本，箭头左侧为发送者自己的平台类型，箭头右侧为目标平台类型；包名可以理解为插件名。例如，从 Node 向 Java 发送请求启用托盘图标，托盘图标显示用的插件 tray 的启动指令为 start，不需要参数，那么就传递 ```execute node->H5 tray start```。 |
| data | <路由> <包名> <success\|fail> <具体子命令> \[返回的数据...\] | 这是为了回复对方 execute 请求的数据而出现的指令，用于返回对方某个具体指令请求的数据；规则与 execute 指令大致相同，但它是用于回复命令而不是执行命令的。data 指令发送时源的箭头应当是向左的，以表示这是一个“回调函数”一样的存在，目的是为了发送对方所需的信息而不是请求信息。 |

上述的 execute 与 callback 两个指令是一对，一次 execute 必定要伴随着一个 callback。system 指令与 log 指令的执行不用回复 callback 指令。

不过，你可能会对这种机制有所疑问，如果我想从对方套个数据（例如剪贴板数据、网页抓包得来的文本），但对面只回复个```callback got```，怎么获取数据？解决方法很简单，也符合异步调用的机制：一方在 execute 后就可以先在那里等待，直到另一方完成了数据的处理后，可以主动向对方调用一次 data，这样子对方就能够接收到它想要的数据了。

例如，我想让 H5 端向 Java 端请求剪贴板的数据，那么 H5 端先主动请求：

```execute clipboard get```

然后 Node 端在那里等待，直到 Java 端的数据获取完成，由 Java 端主动发起请求：

```data clipboard get success [...txt...]```

经过 Node 端时，Node 会将命令再根据路由原封不动转发回 H5。

这时候 H5 就成功地拿到了数据。

源有以下几种：

- H5 —— HTML5 UI 客户端，可直接在网页上运行，也可以以 Electron 等框架运行，它们不会使用本地方法，只会试图与本地平台进行通讯（例如使用 WebSocket 或部分平台提供可用的 window.postMessage 等）。
- java —— java 客户端端。
- node —— node 服务端。

设计的时候遵循下图所述的结构：
![MCBBSClientServerSocketa0da9.png](https://miao.su/images/2019/04/24/MCBBSClientServerSocketa0da9.png)