// 解析的页面
// forum\.php\?mod=guide&view={hot|digest|new|newthread}

let mainPage = {
    headThreads: {}
}
let threads = {};
let users = {};

let subBrowseUrl = [];

for (let i of document.querySelectorAll("#threadlist > div.bm_c > table > tbody > tr")){
    // 额外请求
    subBrowseUrl.push(i.querySelector('th > a.xst').getAttribute('href'));

    let id = /thread-([0-9]+)-/.exec(i.querySelector('th > a.xst').getAttribute('href'))[1];

    let info = {
        author: i.querySelector('td:nth-child(4) > cite > a') && /uid=([0-9]+)/.exec(i.querySelector('td:nth-child(4) > cite > a').getAttribute('href'))[1] || "0",
        title: i.querySelector('th > a.xst').innerText.trim(),
        type: i.querySelector('th > em > a') && /typeid=([0-9]+)/.exec(i.querySelector('th > em > a').getAttribute('href'))[1] || "0",
        states: {}
    };

    // 额外请求
    subBrowseUrl.push("?" + info.author);

    if(i.querySelector('td:nth-child(4) > cite > a')){
		users[info.author] = {
			name: i.querySelector('td:nth-child(4) > cite > a').innerText.trim()
		};
    }

    // 帖子状态解析
    let state = i.querySelector('td.icn > a').getAttribute('title');
    if (/关闭的主题/.test(state)) info.states.closed = true;
    if (/全局置顶主题/.test(state)) info.states.topLevel = 3;
    else if (/分类置顶主题/.test(state)) info.states.topLevel = 2;
    else if (/本版置顶主题/.test(state)) info.states.topLevel = 1;

    // 标题状态解析
    if (i.querySelector('th > a.xst').style.color) info.states.titleColor = i.querySelector('th > a.s.xst').style.color.trim();
    if (i.querySelector('th > a.xst').style.fontWeight === 'bold') info.states.titleBold = true;

    // 帖子分级解析
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
        }

        // 图章检测
        if (/static\/image\/stamp\/[0-9]+\.small\.gif/.test(j.getAttribute('src'))) {
            info.stamp = j.getAttribute('alt');
        }
    }

    // 帖子统计解析
    info.replyCount = i.querySelector('td.num > a').innerText.trim();
    info.watchCount = i.querySelector('td.num > em').innerText.trim();

    threads[id] = info;
}

// 判断 URL 以确定解析类型
// （为什么不多写几个脚本分别解析？因为我不想硬凑代码量，没意义）
let hrefType = /view=([a-zA-Z]+)/.exec(location.href)[1];

// 根据 URL 类型对 mainPage.headThreads 写入
switch(hrefType){
    case 'newthread': 
        mainPage.headThreads.latestThread = Object.keys(threads);
        break;
    case 'new':
        mainPage.headThreads.latestReply = Object.keys(threads);
        break;
    case 'digest':
        mainPage.headThreads.latestStarThread = Object.keys(threads);
        break;
    case 'hot':
        mainPage.headThreads.latestHotThread = Object.keys(threads);
        break;
    default:
        throw new Error("你给的链接没问题么？？！！" + location.href);
}

let exportData = {
    mainPage: mainPage,
    threads: threads,
	users: users
};

export let data = exportData;
export let newTask = subBrowseUrl;
export let state = 'newTask';