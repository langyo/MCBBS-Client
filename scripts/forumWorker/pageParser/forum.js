"use strict";

let mainPage = {
  headImages: [],
  forumGroups: {}
};

for (let i of document.querySelectorAll('#portal_block_800_content > div.slidebox > div.slideshow > li')) {
  let n = {
    href: i.querySelector('a').getAttribute('href'),
    img: i.querySelector('a > img').getAttribute('src'),
    title: i.querySelector('span.title').innerText
  };
  mainPage.headImages.push(n);
}

for (let i of document.querySelectorAll('#ct > div.mn > div.fl.bm > div.bm.bmw.cl')) {
  let group = i.querySelector('div.bm_h.cl.forum_index_title > h2 > a');
  let groupId = /gid=([0-9]+)/.exec(group.getAttribute('href'))[1];
  let groupName = group.innerText.trim();
  let forums = [];

  for (let j of i.querySelectorAll('div.bm_c.forum_index_bm > table > tbody > tr')) {
    try {
      let n = {
        name: j.querySelectorAll('td')[1].querySelector('h2 > a').innerText.trim()
      };
      forums.push(n);
    } catch (e) {
      console.error(e);
    }
  }

  mainPage.forumGroups[groupName] = {
    forumGroupName: groupName,
    forumGroupId: groupId,
    forums: forums
  };
}