"use strict";

let thread = {};
let posts = {}; // 帖子回复列表解析

let postList = document.querySelectorAll('#postlist > div');
if (!Array.isArray(thread.posts)) thread.posts = [];

for (let i = 0; i < postList.length; ++i) {
  let match;

  if (match = /^post_([0-9]+)$/.exec(postList[i].id)) {
    thread.posts.push(match[1]);
    posts[postList[i].id] = {}; // 内容

    try {
      posts[postList[i].id].content = postList[i].querySelectorAll('table > tbody > tr')[0].querySelectorAll('td.plc > div.pct > div.pcb > div.t_fsz')[0].innerHTML;
    } catch (e) {
      console.log(e);
    } // 作者


    try {
      posts[postList[i].id].author = postList[i].querySelectorAll('table > tbody > tr')[0].querySelectorAll('td.pls > div > div.pi > div > a')[0].getAttribute('href').match(/uid=([0-9]+)/)[1];
    } catch (e) {
      console.log(e);
    } // 请求获取用户数据
    // mposter.send('newParseTask', postList[i].querySelectorAll('table > tbody > tr')[0].querySelectorAll('td.pls > div > div.pi > div > a')[0].getAttribute('href'))
    // 请求获取评分数据
    // poster.send('newParseTask', document.querySelectorAll('.rate')[0].querySelectorAll('dd > table > tbody:nth-child(1) > tr > th:nth-child(1) > a')[0].getAttribute('href'));

  }
} // 标题解析


try {
  thread.title = document.querySelectorAll('#thread_subject')[0].innerHTML;
} catch (e) {
  console.log(e);
} // 帖子类型解析


try {
  thread.type = /typeid=([0-9]+)/.exec(document.querySelectorAll('#postlist > table')[0].querySelectorAll('tbody > tr > td.plc.ptm.pbn.vwthd > h1 > a')[0].getAttribute('href'))[1];
} catch (e) {
  console.log(e);
} // 帖子状态解析


if (typeof thread.states !== 'object') thread.states = {};

try {
  let n = document.querySelectorAll('#postlist > table')[0].querySelectorAll('tbody > tr > td.plc.ptm.pbn.vwthd > span > img');

  for (let i of n) {
    n[i] = n[i].getAttribute('src');
  }

  for (let i of n) {
    // 是否被关闭
    if (/image\/locked\.gif/.test(n[i])) thread.states.closed = true;
  }
} catch (e) {
  console.log(e);
} // 主题头部解析


if (document.querySelectorAll('#tath > a').length > 0) {
  // 其它页时为一楼作者
  try {
    thread.author = document.querySelectorAll('#tath > a')[1].getAttribute('href').match(/uid=([0-9]+)/)[1];
  } catch (e) {
    console.log(e);
  }
} else {
  // 第一页时为查看量与回复量信息
  try {
    // 查看量
    thread.watchCount = document.querySelectorAll('#postlist > table')[0].querySelectorAll('tbody > tr > td.pls.ptn.pbn > div > span.xi1')[0].innerHTML; // 回复量

    thread.replyCount = document.querySelectorAll('#postlist > table')[0].querySelectorAll('tbody > tr > td.pls.ptn.pbn > div > span.xi1')[1].innerHTML;
  } catch (e) {
    console.log(e);
  } // 楼主检测


  try {
    thread.author = document.querySelectorAll('#postlist > div')[0].querySelectorAll('table > tbody > tr')[0].querySelectorAll('td.pls > div > div.pi > div > a')[0].getAttribute('href').match(/uid=([0-9]+)/)[1];
  } catch (e) {
    console.log(e);
  }
}