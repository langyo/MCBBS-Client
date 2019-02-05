// 解析的页面：
// thread-[0-9]+-[0-9]+-1\.html
// forum\.php\?mod=viewthread&tid=[0-9]+&page=[0-9]+(#pid[0-9]+)?

let thread = {};
let posts = {};
let users = {};

// 帖子编号解析
let threadID = /thread-([0-9]+)-[0-9]+-1\.html/.exec(location.href)[1]
    || /forum\.php\?mod=viewthread&tid=([0-9]+)&page=[0-9]+(#pid[0-9]+)?/.exec(location.href)[1]

console.log("[pageParser] 已开始解析……");

// 帖子回复列表解析
if (!Array.isArray(thread.posts)) thread.posts = [];
for (let i of document.querySelectorAll("#postlist > div")) {
    let match;
    if (match = /^post_([0-9]+)$/.exec(i.id)) {
        thread.posts.push(match[1]);
        posts[match[1]] = {};
        // 内容
        try {
            // latestEditTime
            try {
                posts[match[1]].latestEditTime = /[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}\s*[0-9]{1,2}\:[0-9]{1,2}/.exec(i.querySelector('table > tbody > tr:nth-child(1) > td.plc > div.pct > div > div.t_fsz > table > tbody > tr > td > i').innerText)[0];
            } catch (e) {
                // 这里忽略错误其实是因为可能不存在所谓的 latestEditTime，这里的理念是没有此数据就不往返回的对象里写 
            }

            // createTime
            posts[match[1]].createTime = /[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}\s*[0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2}/.exec(i.querySelector('table > tbody > tr:nth-child(1) > td.plc > div.pi > div.pti > div.authi > em > span') && i.querySelector('table > tbody > tr:nth-child(1) > td.plc > div.pi > div.pti > div.authi > em > span').getAttribute('title') || i.querySelector('table > tbody > tr:nth-child(1) > td.plc > div.pi > div.pti > div.authi > em').innerText)[0];

            // content
            posts[match[1]].content = i.querySelector("table > tbody > tr > td.plc > div.pct > div.pcb > div.t_fsz > table > tbody > tr > td.t_f").innerHTML;
        } catch (e) { }
        // 层主
        try {
			let u = i.querySelector('table > tbody > tr:nth-child(1) > td.pls > div');
			let id = /uid=([0-9]+)/.exec(u.querySelector('div.pi > div.authi > a').getAttribute('href'))[1];
			posts[match[1]].author = id;
			users[id] = {
				name: u.querySelector('div.pi > div.authi > a').innerText.trim(),
				id: id
			};
        } catch (e) { console.log(e) }
        // 层主数据获取
        // subBrowseUrl.push(i.querySelector("table > tbody > tr > td.pls > div > div.pi > div > a").getAttribute("href"));
    }
}

// 评分数据获取
// console.log(document.querySelector(".rate > dd > table > tbody:nth-child(1) > tr > th:nth-child(1) > a").getAttribute("href"));

// 标题解析
try {
    thread.title = document.querySelectorAll("#thread_subject")[0].innerHTML;
} catch (e) { }
// 帖子类型解析
try {
    thread.type = /typeid=([0-9]+)/.exec(
        document
            .querySelectorAll("#postlist > table")[0]
            .querySelectorAll("tbody > tr > td.plc.ptm.pbn.vwthd > h1 > a")[0]
            .getAttribute("href")
    )[1];
} catch (e) { }
// 帖子状态解析
if (typeof thread.states !== "object") thread.states = {};
try {
    let n = document
        .querySelector("#postlist > table > tbody > tr > td.plc.ptm.pbn.vwthd > span > img");
    for (let i of n) {
        n[i] = n[i].getAttribute("src");
    }
    for (let i of n) {
        // 是否被关闭
        if (/image\/locked\.gif/.test(n[i])) thread.states.closed = true;
    }
} catch (e) { }

// 主题头部解析
if (document.querySelectorAll("#tath > a").length > 0) {
    // 其它页时为一楼作者
    try {
        thread.author = document
            .querySelectorAll("#tath > a")[1]
            .getAttribute("href")
            .match(/uid=([0-9]+)/)[1];
    } catch (e) { }
} else {
    // 第一页时为查看量与回复量信息
    try {
        // 查看量
        thread.watchCount = document
            .querySelectorAll("#postlist > table")[0]
            .querySelectorAll(
                "tbody > tr > td.pls.ptn.pbn > div > span.xi1"
            )[0].innerHTML;
        // 回复量
        thread.replyCount = document
            .querySelectorAll("#postlist > table")[0]
            .querySelectorAll(
                "tbody > tr > td.pls.ptn.pbn > div > span.xi1"
            )[1].innerHTML;
    } catch (e) { }
    // 楼主检测
    try {
        thread.author = document
            .querySelector("#postlist > div > table > tbody > tr > td.pls > div > div.pi > div > a").getAttribute("href").match(/uid=([0-9]+)/)[1];
    } catch (e) { }
}

console.log("[pageParser] 解析完成，正在打包……");

let exportData = {
    threads: {},
    posts: posts
};
exportData.threads[threadID] = thread;

console.log("[pageParser] 数据已投递");

export let data = exportData;
export let state = 'success';
