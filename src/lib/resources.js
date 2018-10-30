/**
 *@author langyo
 *@file 资源控制支持，为前端界面的数据源
 *@todo 此部分将要重写
 */

import { getBrowser, initBrowser } from "./browser";

let globalData = {
  // 主页中的数据
  mainPage: {
    // 版块
    forum: [
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
    slidebox: [
      /*
        元素列表：
        img - 图片链接地址
        href - 要跳转的帖子链接地址
      */
    ],
    // 主页上的最新发布帖子
    latestThread: [
      /*
        元素列表：
        title - 标题
        href - 跳转地址
      */
    ],
    // 主页上的最新被回复的帖子
    latestReply: [
      /*
        元素列表：
        title - 标题
        href - 跳转地址
      */
    ],
    // 主页上的最新精华帖
    latestStarThread: [
      /*
        元素列表：
        title - 标题
        href - 跳转地址
      */
    ]
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
  user: {},
  // 已登入的账户数据
  account: {}
};
