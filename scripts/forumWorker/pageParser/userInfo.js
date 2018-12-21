"use strict";

let users = {};
users[/[0-9]+/.exec(document.querySelectorAll('#ct > div > div.bm.bw0 > div > div.bm_c.u_profile > div:nth-child(1) > h2 > span')[0].innerText.trim())[0]] = {
  name: document.querySelectorAll('#uhd > div.h.cl > h2')[0].innerText.trim(),
  group: /gid=([0-9]+)/.exec(document.querySelectorAll('#ct > div > div.bm.bw0 > div > div.bm_c.u_profile > div.pbm.mbm.bbda.cl')[1].querySelectorAll('ul')[0].querySelectorAll('li > span > a')[0].getAttribute('href'))[1]
};