# resources 模块说明

resources 模块对外提供了一个名为 res 的复合数据，其中定义了许多的可供访问的数据节点。要访问它们是很容易的事情，例如：

```javascript
import { res } from '(到代码部分根目录)/lib/resources';
res.mainPage.forumGroups.forEach(e => { /*......*/ });
```

你还可以执行其中的一些方法，以对数据进行诸如刷新等操作。

## mainPage

你可以通过 ``` res.mainPage ``` 获取有关主页部分的信息。这些信息应当来自以下页面：

> [论坛门户](http://www.mcbbs.net/portal.php)
> [论坛主页](http://www.mcbbs.net/forum.php)
> [论坛小组主页](http://www.mcbbs.net/group.php)
> [最新热门帖子](http://www.mcbbs.net/forum.php?mod=guide&view=hot)
> [最新精华帖子](http://www.mcbbs.net/forum.php?mod=guide&view=digest)
> [最新回复帖子](http://www.mcbbs.net/forum.php?mod=guide&view=new)
> [最新发表帖子](http://www.mcbbs.net/forum.php?mod=guide&view=newthread)
> [可抢沙发帖子](http://www.mcbbs.net/forum.php?mod=guide&view=sofa)


