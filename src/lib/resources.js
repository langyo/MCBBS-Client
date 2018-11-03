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
    /*
      元素列表：
      info - 版头
      threads - 帖子列表
    */
  },

  // 用户数据
  user: {}
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
