import { Jsdom } from "jsdom";
import { browserConfig, userCookies } from "./localStorage";

let browsers = [];

/**
 * @description 创建一个虚拟浏览器类
 *
 * @param {string} url 链接
 * @param {number} userID 当前登入的用户 ID；如果存储的 cookie 中没有此用户的登入信息，则以匿名用户模式访问
 */
function Browser(url, userID) {
  let config = browserConfig;
  if (userCookies[userID] !== undefined) config.cookieJar = userCookies[userID];

  this.url = url;
  this.browser = new Jsdom(url, config);
}

export default {
  /**
   * @description 用于根据 url 获取已经创建的虚拟浏览器。
   * @description 除非先前没有根据此 url 创建虚拟浏览器，否则将返回之前已经创建的虚拟浏览器。
   *
   * @param {string} url 链接
   * @param {number} userID 当前登入的用户 ID；如果存储的 cookie 中没有此用户的登入信息，则以匿名用户模式访问
   *
   * @returns {Browser} 虚拟浏览器对象
   */
  getBrowser: (url, userID) => {
    for (let i = 0, length = browsers.length; i < length; ++i) {
      if (browsers[i] === url) return browsers[i];
    }
    browsers.push(new Browser(url, userID));
    return browsers[browsers.length - 1];
  },
  /**
   * @description 用于根据 url 获取已经创建的虚拟浏览器。
   * @description 无论是否先前已经有创建同 url 的虚拟浏览器，该函数都会重新刷新创建新的虚拟浏览器。
   *
   * @param {string} url 链接
   * @param {number} userID 当前登入的用户 ID；如果存储的 cookie 中没有此用户的登入信息，则以匿名用户模式访问
   *
   * @returns {Browser} 虚拟浏览器对象
   */
  initBrowser: (url, userID) => {
    for (let i = 0, length = browsers.length; i < length; ++i) {
      if (browsers[i] === url) {
        browsers[i] = new Browser(url, userID);
        return browsers[i];
      }
    }
    browsers.push(new Browser(url, userID));
    return browsers[browsers.length - 1];
  }
};
