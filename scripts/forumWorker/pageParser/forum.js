let mainPage = {
	headImages: [],
	forumGroups: {}
}
for(let i of document.querySelectorAll('#portal_block_800_content > div.slidebox > div.slideshow > li > a')){
	let n = {
		href: i.getAttribute('href'),
		img: i.querySelector('img').getAttribute('src')
    };
	mainPage.headImages.push(n);
}