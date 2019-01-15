// 解析的页面：
// forum\.php

let mainPage = {
	headImages: [],
	forumGroups: {},
	headThreads: {
		latestThread: [],
		latestReply: [],
		latestStarThread: []
    }
};

for (let i of document.querySelectorAll('#portal_block_800_content > div.slidebox > div.slideshow > li')) {
	let n = {
		href: /thread-([0-9]+)-/.exec(i.querySelector('a').getAttribute('href'))[1],
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
					name: j.querySelector('dl > dt > a').innerText.trim(),
					id: /^forum\-([A-Za-z0-9\-]+)\.html$/.exec(j.querySelector('dl > dt > a').getAttribute('href'))[1].trim(),
					avatar: j.querySelector('div > a > img').getAttribute('src').trim()
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
					id: /^forum\-([A-Za-z0-9\-]+)\.html$/.exec(j.querySelector('td > h2 > a').getAttribute('href'))[1].trim(),
					avatar: j.querySelector('td.fl_icn > a > img').getAttribute('src').trim()
				};
				forums.push(n);
			} catch (e) {
				console.log(e);
			}
		}
	}
	mainPage.forumGroups[groupId] = {
		forumGroupName: groupName,
		forumGroupId: groupId,
		forums: forums
	};
}
for(let i of document.querySelectorAll('#portal_block_807_content > div > ul > li')){
	mainPage.headThreads.latestThread.push({
		title: i.querySelectorAll('a')[1].innerText.trim(),
		href: /thread-([0-9]+)-/.exec(i.querySelectorAll('a')[1].getAttribute('href'))[1],
		author: /uid=([0-9]+)/.exec(i.querySelector('em > a').getAttribute('href'))[1]
    });
}
for(let i of document.querySelectorAll('#portal_block_806_content > div > ul > li')){
	mainPage.headThreads.latestReply.push({
		title: i.querySelectorAll('a')[1].innerText.trim(),
		href: /thread-([0-9]+)-/.exec(i.querySelectorAll('a')[1].getAttribute('href'))[1],
		author: /uid=([0-9]+)/.exec(i.querySelector('em > a').getAttribute('href'))[1]
    });
}
for(let i of document.querySelectorAll('#portal_block_809_content > div > ul > li')){
	mainPage.headThreads.latestStarThread.push({
		title: i.querySelectorAll('a')[1].innerText.trim(),
		href: /thread-([0-9]+)-/.exec(i.querySelectorAll('a')[1].getAttribute('href'))[1],
		author: /uid=([0-9]+)/.exec(i.querySelector('em > a').getAttribute('href'))[1]
    });
}

let exportData = {
	mainPage: mainPage
};

export let data = exportData;
export let state = 'success'