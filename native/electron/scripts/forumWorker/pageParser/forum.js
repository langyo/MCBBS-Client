"use strict";

let forum = {
  info: {},
  threads: []
};
let threads = [];

for (let i of document.querySelectorAll('#threadlisttableid > tbody > tr')) {
  if (i.className !== "") continue;
  forum.threads.push(/thread-([0-9]+)-/.exec(i.querySelector('th > a.s.xst').getAttribute('href'))[1]);
  let info = {
    author: i.querySelector('td:nth-child(3) > cite > a') && /uid=([0-9]+)/.exec(i.querySelector('td:nth-child(3) > cite > a').getAttribute('href'))[1] || "0",
    title: i.querySelector('th > a.s.xst').innerText.trim(),
    type: i.querySelector('th > em > a') && /typeid=([0-9]+)/.exec(i.querySelector('th > em > a').getAttribute('href'))[1] || "0",
    states: {}
  }; // 帖子状态解析

  if (i.querySelector('th').className === 'lock') info.states.closed = true; // 标题状态解析

  if (i.querySelector('th > a.s.xst').style.color) info.states.titleColor = i.querySelector('th > a.s.xst').style.color.trim();
  if (i.querySelector('th > a.s.xst').style.fontWeight === 'bold') info.states.titleBold = true; // 帖子分级解析

  for (let j of i.querySelectorAll('th > img')) {
    switch (j.getAttribute('src')) {
      case 'template/mcbbs/image/digest_1.gif':
        // 精华 I
        info.states.starLevel = 1;
        break;

      case 'template/mcbbs/image/digest_2.gif':
        // 精华 II
        info.states.starLevel = 2;
        break;

      case 'template/mcbbs/image/digest_3.gif':
        // 精华 III
        info.states.starLevel = 3;
        break;
    } // 图章检测


    if (/static\/image\/stamp\/[0-9]+\.small\.gif/.test(j.getAttribute('src'))) {
      info.stamp = j.getAttribute('alt');
    }
  } // 帖子统计解析


  info.replyCount = i.querySelector('td.num > a').innerText.trim();
  info.watchCount = i.querySelector('td.num > em').innerText.trim();
  threads.push(info);
}