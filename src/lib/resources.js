/**
 *@author langyo
 *@file 资源控制支持，为前端界面的数据源
 *@todo 此部分将要重写
 */

import { getBrowser, initBrowser } from "./browser";

let res = {
  // 主页中的数据
  mainPage: {
    // 版块
    forumGroups: [
      /*
        元素列表：
        forumGroupName - 大版版块名称
        forums[] - 子版块列表：
          name - 版块名
          info - 版块说明
          avatar - 版块图标
      */
    ],
    // 头图
    headImages: [
      /*
        元素列表：
        img - 图片链接地址
        href - 要跳转的帖子链接地址
      */
    ],
    // 主页上轮播的帖子
    headThreads: {
      latestThread: [
        /*
          元素列表：
          title - 标题
          author - 作者
          href - 跳转地址
        */
      ],
      // 主页上的最新被回复的帖子
      latestReply: [
        /*
          元素列表：
          title - 标题
          author - 作者
          href - 跳转地址
        */
      ],
      // 主页上的最新精华帖
      latestStarThread: [
        /*
          元素列表：
          title - 标题
          author - 作者
          href - 跳转地址
        */
      ]
    }
  },

  // 版块
  forums: {
    // [map:版块特征码，特征码由对应板块在 URL 上体现的名称决定]
    /*
      元素列表：
      info - 版头，这里直接存储 HTML 代码（未来的版本中会试图将下载的 HTML 代码转换为 UUB 再进行储存）
      threads - 帖子列表
    */
  },

  // 主题
  threads: {
    // [map:帖子 id]
    /*
      元素列表：
      author - 作者 ID
      title - 标题
      tags{} - 帖子属性：
        deleted - 是否被删除；默认未被删除
        closed - 是否被关闭；默认未被关闭
        awardInfo{} - 帖子回复奖励信息：
          integralType - 奖励积分类型
          integralCount - 当前帖子剩余的可用奖励积分总量
          everyoneAllocateIntegralCount - 每个人能分配的积分量
          everyoneAllocateIntegralTimes - 每个人最多能被分配积分的次数（也就是最大的能获得奖励的回复次数）
          everyoneAllocateIntegralChance - 每个人能够中奖的概率
        titleColor - 帖子标题高亮颜色；默认无额外加色
        titleBold - 帖子标题是否被加粗；则默认不加粗
        starLevel - 帖子精华等级；默认无精华等级
        hotLevel - 帖子火热等级；默认无火热等级
        topLevel - 帖子置顶等级；默认不置顶
        tags[] - 帖子被加上的分类标签（这种标签是论坛自带的分类标签，由发帖者自行决定）；默认无分类标签
        stamp - 帖子被加上的图章名称；默认无图章
        history[] - 帖子状态修改记录（这种记录是论坛自己整理的）
          handler - 操作者 ID
          act - 操作说明文字
          opereateTime - 截至有效时间
      watchCount - 帖子查看量
      replyCount - 帖子回复量
      latestEditTime - 帖子内容最后被修改的时间（不仅仅是一楼，也包括任何可能的新回复）
      createTime - 发布时间
      posts[] - 包含的楼层 ID
      history[] - 帖子统计信息的历史记录
        title - 帖子标题
        watchCount - 帖子查看量
        replyCount - 帖子回复量
        editTime - 更新时间
    */
  },

  // 楼层
  posts: {
    // [map:楼层 ID]
    /*
      元素列表：
        author - 作者 ID
        title - 标题（你没看错，标题，因为其实回复层也是可以设置标题的）
        floor - 位于源帖子的楼层数
        content - 内容，这里直接存储 HTML 代码（未来的版本中会试图将下载的 HTML 代码转换为 UUB 再进行储存）
        replyList[] - 回复的楼层 ID 列表
        rateList[] - 评分 ID 列表
        latestEditTime - 最后编辑时间
        createTime - 发布时间
        tags{} - 帖子属性：
          topFloor - 是否被置顶；默认未被设置为置顶楼层
          hasBeenWarned - 是否被警告；默认没被警告；警告数据并不是由此楼层提供的，而是由专用的小黑屋页面提供的
          awardInfo{} - 奖励信息，当楼主设置了回复奖励时回复者拿到的奖励积分的相关信息：
            integralType - 积分类型
            integralCount - 积分数量
          showSignature - 是否显示签名档；默认不显示
        history[] - 帖子内容的历史记录
          content - 内容
          editTime - 该内容最后一次被检索到的时间
    */
  },

  // 评分
  rate: {
    // [map:评分 ID]
    /*
      元素列表：
        author - 评分发布者
        reason - 理由
        operateTime - 操作时间
        awardInfo[] - 评分积分奖励信息：
          integralType - 积分类型
          integralCount - 积分数量
    */
  },

  // 用户
  user: {
    // [map:用户 ID]
    /*
      元素列表：
        name - 用户昵称
        group - 用户组 ID
        extraGroup - 扩展用户组 ID
        integralCount - 总计分量
        stats{} - 数据统计：
          goldNuggets - 金粒
          goldIngots - 金锭
          emeralds - 绿宝石
          netherStars - 下界之星
          devotions - 贡献
          benevolences - 爱心
          diamonds - 钻石
        signature - 签名档信息，这里直接存储 HTML 代码（未来的版本中会试图将下载的 HTML 代码转换为 UUB 再进行储存）
        rank - 自定义头衔
        threadCount - 发布的主题数量
        replyCount - 发布的回复总量
        friendCount - 好友总量
        knownFriendRelationShip[] - 已知的好友列表；此列表仅仅作为在同客户端多账户的环境下是否能够加为好友/解除好友的判据
        medal[] - 勋章列表
    */
  },

  // 用户组
  userGroups: {
    // [map:用户组 ID]
    /*
      元素列表：
        name - 用户组名称
        integralInfo - 积分上下限信息（有些用户组没有此项）：
          min - 最低积分
          max - 最高积分
        info{} - 权限信息，此部分不再使用特定变量，而是将其当成 json 使用，键名可以是汉语
    */
  },

  medals: {
    // [map:勋章 ID]
    /*
      元素列表：
        name - 勋章名
        image - 勋章图片
        info - 勋章说明
        achieveWay - 获得方式
    */
  }
};

res.mainPage.forumGroups.__defineSetter__(
  "refresh",
  () => {}
);

res.mainPage.forumGroups.__defineSetter__(
  "init",
  () => {}
);

res.mainPage.forumGroups.__defineSetter__(
  "newForums",
  () => {}
);

res.mainPage.headImages.__defineSetter__(
  "refresh",
  () => {}
);

res.mainPage.headImages.__defineSetter__(
  "init",
  () => {}
);

res.mainPage.headImages.__defineSetter__(
  "pushNew",
  (image, href) => {}
);

res.mainPage.headThreads.__defineSetter__(
  "refresh",
  () => {}
);

res.mainPage.headThreads.__defineSetter__(
  "init",
  () => {}
);

res.mainPage.headThreads.__defineSetter__(
  "more",
  () => {}
);

res.mainPage.headThreads.__defineSetter__(
  "unshiftNew",
  () => {}
);
