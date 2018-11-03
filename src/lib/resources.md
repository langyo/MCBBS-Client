# resources 模块说明

resources 模块对外提供了一个名为 res 的复合数据，其中定义了许多的可供访问的数据节点。要访问它们是很容易的事情，例如：

```javascript
import { res } from '(到代码部分根目录)/lib/resources';
res.mainPage.forumGroups.forEach(e => { /*......*/ });
```

你还可以执行其中的一些方法，以对数据进行诸如刷新等操作。

``` res ``` 的数据来源有两个模块，一个是 *pageParse.js *，另一个是 *localStorage.js *。

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

- forums[] - 子版块列表：

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

- threads[] - 帖子 ID 列表

