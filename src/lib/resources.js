import { getBrowser, initBrowser } from "./browser";

let globalData = {
  // 主页中的数据
  mainPage: {
    // 版块
    forum: [
      /*
        元素列表：
        id - 版块编号；注意这里的 id 是字符串
        info - 版块宣传信息
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
    // 主页上的帖子
    tab: {}
  },
  // 用户数据
  user: {}
};
