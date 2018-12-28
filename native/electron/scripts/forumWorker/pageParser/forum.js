"use strict";

let forum = {
  info: {},
  threads: []
};
let threads = [];

for (let i of document.querySelectorAll('#threadlisttableid > tbody > tr')) {
  if (i.className !== "") continue;
  forum.threads.push(/thread-([0-9]+)-/.exec(i.querySelector('th > a.s.xst').getAttribute('href'))[1]);
  threads.push({
    author: i.querySelector('td:nth-child(3) > cite > a') && /uid=([0-9]+)/.exec(i.querySelector('td:nth-child(3) > cite > a').getAttribute('href'))[1] || "0",
    title: i.querySelector('th > a.s.xst').innerText.trim(),
    type: i.querySelector('th > em > a') && /typeid=([0-9]+)/.exec(i.querySelector('th > em > a').getAttribute('href'))[1] || "0",
    states: {}
  });
}