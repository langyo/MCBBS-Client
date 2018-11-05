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
      threads[] - 帖子 ID 列表
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
        online - 是否在线；默认为不在线
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

  // 勋章
  medals: {
    // [map:勋章 ID]
    /*
      元素列表：
        name - 勋章名
        image - 勋章图片
        info - 勋章说明
        achieveWay - 获得方式
    */
  },

  // 道具
  tools: {
    // [map:道具标识名]
    /*
      元素列表：
        name - 道具名
        info - 道具说明
        prize - 价格
        integralType - 用于购买道具的积分类型
        weight - 质量
    */
  },

  // 本地账户
  accounts: {
    // 当前正在使用的已登入账户 ID
    nowUsing: 0,
    loggedAccount: {
      // [map:登入账户 ID]
      /*
        元素列表：
        notifications[] - 提醒列表：
          noticer - 提醒者 ID；如果为 0 则为系统通知
          content - 提醒内容
          href - 指向的链接
          time - 提醒时间
        messages{} - 私信列表：
          [map:聊天对象 ID]
          type - 消息来源类型，只有 'send' | 'receive' 两种类型
          content - 消息内容，这里直接存储 HTML 代码（未来的版本中会试图将下载的 HTML 代码转换为 UUB 再进行储存）
          time - 消息创建时间
        friends[] - 朋友 ID 列表
        shortMessages{} - 打招呼列表：
          [map:聊天对象 ID]
          content - 打招呼内容
          emoji - 打招呼表情
          time - 打招呼时间
          history[] - 历史记录
            content - 打招呼内容
            emoji - 打招呼表情
            time - 打招呼时间
        forumManageMessages[] - 论坛管理消息列表：
          handler - 操作者
          integralMessage - 操作信息，这部分信息是没过滤过的积分提示信息
          reason - 理由
          time - 操作时间
        imtegralHisTory{} - 积分操作记录
          [map:积分类型]
          type - 操作理由的分类类型
          count - 变更积分数量
          time - 操作时间
        packbag - 背包信息
          topWeight - 最大的背包可容纳质量大小
          nowWeight - 当前的背包已容纳质量大小
          tools{} - 具体明细
            [map:道具标识名]
            count - 数量
        favoriteThreads[] - 收藏帖子列表
          href - 帖子 ID
          time - 收藏时间
          reason - 收藏理由
      */
    }
  },

  // 本地存贮的设置数据
  local: {
    // 日志记录
    log: [
      /*
        元素列表：
          type - 日志类型，只有 'warn' | 'info' | 'error' | 'log' 这四种类型
          content - 内容
          time - 记录时间
          from - 来源，可以是客户端本身，也可以是客户端下的其中一个虚拟浏览器，或是挂载在客户端上的插件
      */
    ],

    // 浏览记录
    history: {
      // 页面浏览历史
      browseHistory: [
        /*
          元素列表：
            href - 链接，这里必须给出完整的 URL，因为可能还会访问外部网页
            title - 页面标题
            time - 浏览时间
        */
      ],

      // 账户登入历史
      accountHistory: [
        /*
          元素列表：
            name - 账户名
            uid - 账户 ID
        */
      ],

      // 账户登入使用的 Cookie 凭据，存储的是 CookieJar 对象的 json 文本表达
      accountCookieStorage: {
        // [map:账户 ID]
      },

      // 插件启动记录
      extensionLaunchHistory: [
        /*
          元素列表：
            uuid - 插件 UUID
            time - 启动时间
        */
      ]
    },

    // 插件
    extensions: {
      // [map:插件 UUID]
      /*
        元素列表：
          name - 插件名称，可以是中文
          use - 是否使用，只有 'true' | 'false' 这两个类型
          codes - 插件代码的字符串，在启用时客户端会将其作为 JavaScript 代码隔离在沙箱中执行
          author - 作者 ID
          sourceLibrary[] - 依赖的其它插件 UUID 列表
      */
    },

    // 资源数据
    sources: {
      // [map:资源文件的 URL 的特征码]
      /*
        元素列表：
          size - 大小
          localStorageNodeId - 对应于本地存储的节点 ID，用于同步
          content - 缓存的数据
          time - 数据的创建时间
          url - 数据所在位置的完整 URL
      */
    },

    // 虚拟浏览器设置
    browserSettings: {
      // User-Agent 设置
      userAgent: ""
    },

    // 客户端个性化设置
    clientSettings: {
      // 主题
      theme: ""
    },

    // 临时储存的草稿帖子
    tempSaveThreads: [
      /*
        元素列表：
          time - 保存时间
          title - 标题
          content - 内容
          tags{} - 帖子属性：
            awardInfo{} - 帖子回复奖励信息：
              integralType - 奖励积分类型
              integralCount - 当前帖子剩余的可用奖励积分总量
              everyoneAllocateIntegralCount - 每个人能分配的积分量
              everyoneAllocateIntegralTimes - 每个人最多能被分配积分的次数（也就是最大的能获得奖励的回复次数）
              everyoneAllocateIntegralChance - 每个人能够中奖的概率
            tags[] - 帖子被加上的分类标签（这种标签是论坛自带的分类标签，由发帖者自行决定）；默认无分类标签
      */
    ],

    // 临时储存的草稿回复
    tempSaveReplys: [
      /*
        元素列表：
          time - 保存时间
          content - 内容
          replyToThread - 回复到的主题 ID
          replyToPost - 回复到的楼层编码；默认为 1（即楼主层）
      */
    ],

    // 储存的评分理由
    rateReasons: [
      /* 字符串数组 */
    ],

    // 储存的举报理由
    reportReasions: [
      /* 字符串数组 */
    ]
  }
};

/**
 *@description 从 browsers 获取最新信息，并存储到 localStorage；如果因断网等获取失败，也不会覆盖原来的数据。
 *@return {Boolean}
 */
res.mainPage.forumGroups.__defineSetter__(
  "refresh",
  () => {}
);

/**
 *@description 从 localStorage 读取信息；如果没有可用信息，则会自动调用 refresh() 以重试；如果调用 refresh() 后仍然无可用信息，会返回 false 以提示 UI 层显示错误信息。
 *@return {Boolean}
 */
res.mainPage.forumGroups.__defineSetter__(
  "init",
  () => {}
);

/**
 *@description 令 forumGroups 初始化一个新的版块大区。此方法仅供后端调用。
 */
res.mainPage.forumGroups.__defineSetter__(
  "pushNewForums",
  () => {}
);

/**
 *@description 从 browsers 获取最新信息，并存储到 localStorage；如果因断网等获取失败，也不会覆盖原来的数据。
 *@return {Boolean}
 */
res.mainPage.headImages.__defineSetter__(
  "refresh",
  () => {}
);

/**
 *@description 从 localStorage 读取信息；如果没有可用信息，则会自动调用 refresh() 以重试；如果调用 refresh() 后仍然无可用信息，会返回 false 以提示 UI 层显示错误信息。
 *@return {Boolean}
 */
res.mainPage.headImages.__defineSetter__(
  "init",
  () => {}
);

/**
 *@description 向 headImages 加入新的图片。此方法仅供后端调用。
 */
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
