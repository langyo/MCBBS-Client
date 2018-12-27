"use strict";

let forum = {
  info: {},
  threads: []
};

for (let i of document.querySelectorAll('#threadlisttableid > tbody > tr')) {
  if (i.className !== "") continue;
  forum.threads.push(/thread-([0-9]+)-/.exec(i.querySelector('th > a.s.xst').getAttribute('href'))[1]);
}