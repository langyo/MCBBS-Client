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
	if (/flg/.test(i.className)) {
		// 双栏
		for (let j of i.querySelectorAll('div.bm_c.forum_index_bm > table > tbody > tr > td')) {
			try {
				let n = {
					name: j.querySelectorAll('dl > dt > a')[0].innerText.trim(),
					id: /^forum\-([A-Za-z0-9\-]+)\.html$/.exec(j.querySelectorAll('dl > dt > a')[0].getAttribute('href'))[1].trim(),
					avatar: j.querySelectorAll('div > a > img')[0].getAttribute('src').trim()
				}
				forums.push(n);
			} catch (e) {
				console.log(e);
			}
		}
	} else {
		// 单栏
		for (let j of i.querySelectorAll('div.bm_c.forum_index_bm > table > tbody > tr')) {
			try {
				let n = {
					name: j.querySelector('td > h2 > a').innerText.trim(),
					id: /^forum\-([A-Za-z0-9\-]+)\.html$/.exec(j.querySelectorAll('td > h2 > a')[0].getAttribute('href'))[1].trim(),
					avatar: j.querySelectorAll('td.fl_icn > a > img')[0].getAttribute('src').trim()
				};
				forums.push(n);
			} catch (e) {
				console.log(e);
			}
		}
	}
	mainPage.forumGroups[groupName] = {
		forumGroupName: groupName,
		forumGroupId: groupId,
		forums: forums
	};
}