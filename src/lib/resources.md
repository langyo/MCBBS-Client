# resources 模块

resources 模块对外提供了一个名为 res 的复合数据，其中定义了许多的可供访问的数据节点。要访问它们是很容易的事情，例如：

```javascript
import { res } from '(到代码部分根目录)/lib/resources';
res.mainPage.forumGroups.forEach(e => { /*......*/ });
```

你还可以执行其中的一些方法，以对数据进行诸如刷新等操作。

``` res ``` 的数据来源有两个模块，一个是 *pageParse.js *，另一个是 *localStorage.js *。

# 数据结构说明

## mainPage

你可以通过 ``` res.mainPage ``` 获取有关主页部分的信息。这些信息应当来自以下页面：

> [论坛门户](http://www.mcbbs.net/portal.php)
>
> [论坛主页](http://www.mcbbs.net/forum.php)
>
> [论坛小组主页](http://www.mcbbs.net/group.php)
>
> [最新热门帖子](http://www.mcbbs.net/forum.php?mod=guide&view=hot)
>
> [最新精华帖子](http://www.mcbbs.net/forum.php?mod=guide&view=digest)
>
> [最新回复帖子](http://www.mcbbs.net/forum.php?mod=guide&view=new)
>
> [最新发表帖子](http://www.mcbbs.net/forum.php?mod=guide&view=newthread)
>
> [可抢沙发帖子](http://www.mcbbs.net/forum.php?mod=guide&view=sofa)

### forumGroups

存储了一系列大区（版块集合）的具体子版块信息。

##### 元素列表

- forumGroupName - 大版版块名称

- forums[\] - 子版块列表：

    - name - 版块特征码

    - info - 版块说明

    - avatar - 版块图标

### headImages

存储了论坛主页左上角的头图信息。

##### 元素列表

- img - 图片链接地址

- href - 要跳转的帖子链接地址

### headThreads

存储了论坛右上角的最新帖子信息。最新帖子还分为最新发布（latestThread）、最新回复（latestReply）与最新精华（latestStarThread）三类。

#### latestThread

最新发布的帖子列表。

##### 元素列表

- title - 标题

- author - 作者

- href - 跳转地址

#### latestReply

最新回复的帖子列表。

##### 元素列表

- title - 标题

- author - 作者

- href - 跳转地址

#### latestStarThread

最新被设置为精华的帖子列表。这里的最新比较特殊，它会将这一个月的精华帖都计算在内，然后再从这些精华帖中取出最后发布的十个精华帖进行展览。

##### 元素列表

- title - 标题

- author - 作者

- href - 跳转地址

## forums

此节点存储了各个版块的具体信息。此节点为一个关联容器（map），键名为版块特征码。

##### 元素列表

- info - 版头，这里直接存储 HTML 代码（未来的版本中会试图将下载的 HTML 代码转换为 UUB 再进行储存）

- threads[\] - 帖子 ID 列表

## threads

此节点存储了所有主题的具体信息。此节点为一个关联容器（map），键名为帖子 ID。

##### 元素列表

- author - 作者 ID

- title - 标题

- tags{} - 帖子属性：

    - deleted - 是否被删除；默认未被删除

    - closed - 是否被关闭；默认未被关闭

    - awardInfo{} - 帖子回复奖励信息：

        - integralType - 奖励积分类型

        - integralCount - 当前帖子剩余的可用奖励积分总量

        - everyoneAllocateIntegralCount - 每个人能分配的积分量

        - everyoneAllocateIntegralTimes - 每个人最多能被分配积分的次数（也就是最大的能获得奖励的回复次数）

        - everyoneAllocateIntegralChance - 每个人能够中奖的概率

- titleColor - 帖子标题高亮颜色；默认无额外加色

- titleBold - 帖子标题是否被加粗；则默认不加粗

- starLevel - 帖子精华等级；默认无精华等级

- hotLevel - 帖子火热等级；默认无火热等级

- topLevel - 帖子置顶等级；默认不置顶

- tags[\] - 帖子被加上的分类标签（这种标签是论坛自带的分类标签，由发帖者自行决定）；默认无分类标签

- stamp - 帖子被加上的图章名称；默认无图章

- history[\] - 帖子状态修改记录（这种记录是论坛自己整理的）

    - handler - 操作者 ID

    - act - 操作说明文字

    - opereateTime - 截至有效时间

- watchCount - 帖子查看量

- replyCount - 帖子回复量

- latestEditTime - 帖子内容最后被修改的时间（不仅仅是一楼，也包括任何可能的新回复）

- createTime - 发布时间

- posts[\] - 包含的楼层 ID

- history[\] - 帖子统计信息的历史记录

    - title - 帖子标题

    - watchCount - 帖子查看量

    - replyCount - 帖子回复量

    - editTime - 更新时间

## posts

此节点存储了各个楼层的具体信息。此节点为一个关联容器（map），键名为回复帖子 ID。

##### 元素列表

- author - 作者 ID

- title - 标题（你没看错，标题，因为其实回复层也是可以设置标题的）

- floor - 位于源帖子的楼层数

- content - 内容，这里直接存储 HTML 代码（未来的版本中会试图将下载的 HTML 代码转换为 UUB 再进行储存）

- replyList[\] - 回复的楼层 ID 列表

- rateList[\] - 评分 ID 列表

- latestEditTime - 最后编辑时间

- createTime - 发布时间

- tags{} - 帖子属性：

    - topFloor - 是否被置顶；默认未被设置为置顶楼层

    - hasBeenWarned - 是否被警告；默认没被警告；警告数据并不是由此楼层提供的，而是由专用的小黑屋页面提供的

    - awardInfo{} - 奖励信息，当楼主设置了回复奖励时回复者拿到的奖励积分的相关信息：

        - integralType - 积分类型

        - integralCount - 积分数量

    - showSignature - 是否显示签名档；默认不显示

- history[\] - 帖子内容的历史记录

    - content - 内容

    - editTime - 该内容最后一次被检索到的时间

## rate

此节点存储了有关评分的具体信息。此节点为一个关联容器（map），键名为评分数据 ID。

##### 元素列表

- author - 评分发布者

- reason - 理由


- operateTime - 操作时间

- awardInfo[\] - 评分积分奖励信息：

    - integralType - 积分类型

    - integralCount - 积分数量

## user

此节点存储了有关各个用户的具体信息。此节点为一个关联容器（map），键名为用户 ID。

##### 元素列表

- name - 用户昵称

- group - 用户组 ID

- extraGroup - 扩展用户组 ID

- integralCount - 总计分量

- stats{} - 数据统计：

    - goldNuggets - 金粒

    - goldIngots - 金锭

    - emeralds - 绿宝石

    - netherStars - 下界之星

    - devotions - 贡献

    - benevolences - 爱心

    - diamonds - 钻石

- signature - 签名档信息，这里直接存储 HTML 代码（未来的版本中会试图将下载的 HTML 代码转换为 UUB 再进行储存）

- rank - 自定义头衔

- threadCount - 发布的主题数量

- replyCount - 发布的回复总量

- friendCount - 好友总量

- knownFriendRelationShip[\] - 已知的好友列表；此列表仅仅作为在同客户端多账户的环境下是否能够加为好友/解除好友的判据

- medal[\] - 勋章列表

- online - 是否在线；默认为不在线

## userGroups

此节点存储了有关各个用户组的具体信息。此节点为一个关联容器（map），键名为用户组 ID。

##### 元素列表

- name - 用户组名称

- integralInfo - 积分上下限信息（有些用户组没有此项）：

    - min - 最低积分

    - max - 最高积分

- info{} - 权限信息，此部分不再使用特定变量，而是将其当成 json 使用，键名可以是汉语

## medals

此节点存储了有关各个勋章的具体信息。此节点为一个关联容器（map），键名为勋章 ID。

##### 元素列表

- name - 勋章名

- image - 勋章图片

- info - 勋章说明

- achieveWay - 获得方式

## tools

此节点存储了有关各个道具的具体信息。此节点为一个关联容器（map），键名为道具特征码。

##### 元素列表

- name - 道具名

- info - 道具说明

- prize - 价格

- integralType - 用于购买道具的积分类型

- weight - 质量

## accounts

此节点存储了有关在以客户端登入论坛后所获取的账号内部具体信息，例如提醒、私聊等。

### nowUsing

当前正在使用的账户 ID。必须先持有此账户 ID 所对应的登入 Cookie 才有效，否则视为未登录。

默认值为 0，即未登录。

### loggedAccount

此节点存储了已登录账户的事务信息。此节点为一个关联容器（map），键名为用户 ID。

##### 节点列表

- notifications[\] - 提醒列表：

    - noticer - 提醒者 ID；如果为 0 则为系统通知

    - content - 提醒内容

    - href - 指向的链接

    - time - 提醒时间

- messages{} - 私信列表：

    \[map:聊天对象 ID]

    - type - 消息来源类型，只有 'send' | 'receive' 两种类型

    - content - 消息内容，这里直接存储 HTML 代码（未来的版本中会试图将下载的 HTML 代码转换为 UUB 再进行储存）

    - time - 消息创建时间

- friends[\] - 朋友 ID 列表

- shortMessages{} - 打招呼列表：

    \[map:聊天对象 ID]

    - content - 打招呼内容

    - emoji - 打招呼表情

    - time - 打招呼时间

    - history[\] - 历史记录

        - content - 打招呼内容

        - emoji - 打招呼表情

        - time - 打招呼时间

- forumManageMessages[\] - 论坛管理消息列表：

    - handler - 操作者

    - integralMessage - 操作信息，这部分信息是没过滤过的积分提示信息

    - reason - 理由

    - time - 操作时间

- imtegralHisTory{} - 积分操作记录

    \[map:积分类型]

    - type - 操作理由的分类类型

    - count - 变更积分数量

    - time - 操作时间

- packbag - 背包信息

    - topWeight - 最大的背包可容纳质量大小

    - nowWeight - 当前的背包已容纳质量大小

    - tools{} - 具体明细

        \[map:道具标识名]

        - count - 数量

- favoriteThreads[\] - 收藏帖子列表

    - href - 帖子 ID

    - time - 收藏时间

    - reason - 收藏理由

## local

此节点存储与论坛本身无关的本地数据。

### log

此节点记录着客户端自启动以来所有的日志。日志可能来源于客户端的前后端，也可能来源于由客户端创建的虚拟浏览器，还可能来源于客户端的插件。

##### 元素列表

- type - 日志类型，只有 'warn' | 'info' | 'error' | 'log' 这四种类型

- content - 内容

- time - 记录时间

- from - 来源，可以是客户端本身，也可以是客户端下的其中一个虚拟浏览器，或是挂载在客户端上的插件

### history

此节点记录着用户在使用客户端时的行为记录，例如调取网页时的浏览记录、账户登入记录等。

它有许多分支节点，分别负责记录不同的行为。

#### browseHistory

此节点记录着用户在使用时访问过的网页的记录。有些页面可能并不会真正呈现在用户面前，这类页面的访问同样也会被记录在案。

##### 元素列表

- href - 链接，这里必须给出完整的 URL，因为可能还会访问外部网页

- title - 页面标题

- time - 浏览时间

#### accountHistory

此节点记录着用户在使用客户端时登录过的账户记录。用户在选择退出某个账号后，此账号的登陆信息将仍然留在客户端内，并使得用户能够在登录新用户界面中方便地选取之前退出的账号重新登录。

此节点中记录的东西是可以选择删除的，用以清除用户的使用痕迹。

###### 元素列表

- name - 账户名

- uid - 账户 ID

#### accountCookieStorage

账户登入使用的 Cookie 凭据，存储的是 CookieJar 对象的 json 文本表达。此节点为一个关联容器（map），键名为用户 ID，键值为被转换为字符串的 JSON。

#### extensionLaunchHistory

此客户端所拥有的所有插件的启动记录。

- uuid - 插件 UUID

- time - 启动时间

### extensions

此节点保存了此客户端已安装的插件的数据。此节点为一个关联容器（map），键名为插件的 UUID。

##### 元素列表

- name - 插件名称，可以是中文

- use - 是否使用，只有 'true' | 'false' 这两个类型

- codes - 插件代码的字符串，在启用时客户端会将其作为 JavaScript 代码隔离在沙箱中执行

- author - 作者 ID

- sourceLibrary[\] - 依赖的其它插件 UUID 列表

### sources

此节点保存了较大的数据文件的信息，例如下载好的图片的 Base 64 转码字符串。

此节点与 localStorage 下的键构成映射。

##### 元素列表

- size - 大小

- localStorageNodeId - 对应于本地存储的节点 ID，用于同步

- content - 缓存的数据

- time - 数据的创建时间

- url - 数据所在位置的完整 URL

### browserSettings

此节点保存了有关虚拟浏览器的设置。

#### userAgent

虚拟浏览器应当使用什么样的 User Agent 向服务器发送请求。不同的 UA 会影响服务器在同一页面下返回不同的数据。

### clientSettings

此节点保存了客户端自己的一些个性化设置。

#### theme

客户端的颜色主题。

### tempSaveThreads

此节点保存了用户在编辑新帖子时实时保存的草稿帖列表。

##### 元素列表

- time - 保存时间

- title - 标题

- content - 内容

- tags{} - 帖子属性：

     - awardInfo{} - 帖子回复奖励信息：

     - integralType - 奖励积分类型

     - integralCount - 当前帖子剩余的可用奖励积分总量

     - everyoneAllocateIntegralCount - 每个人能分配的积分量

     - everyoneAllocateIntegralTimes - 每个人最多能被分配积分的次数（也就是最大的能获得奖励的回复次数）

     - everyoneAllocateIntegralChance - 每个人能够中奖的概率

- tags[\] - 帖子被加上的分类标签（这种标签是论坛自带的分类标签，由发帖者自行决定）；默认无分类标签

### tempSaveReplys

此节点保存了用户在回复帖子时实时保存的备份列表。

##### 元素列表

- time - 保存时间

- content - 内容

- replyToThread - 回复到的主题 ID

- replyToPost - 回复到的楼层编码；默认为 1（即楼主层）

### rateReasons

此节点存储了用户自定义的快捷评分理由。它是一个字符串数组。

### reportReasions

此节点存储了用户自定义的举报理由。它是一个字符串数组。

# 函数说明

### refreshPage(url)

### initLocalStorage()

### getBinaryDataBase64(url, wantToRefresh)