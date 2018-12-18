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