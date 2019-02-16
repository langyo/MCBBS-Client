// 解析的页面：
// home\.php\?mod=space&uid=[0-9]+

let user = {
    id: /[0-9]+/.exec(
        document
            .querySelectorAll(
                "#ct > div > div.bm.bw0 > div > div.bm_c.u_profile > div:nth-child(1) > h2 > span"
            )[0]
            .innerText.trim()
    )[0],
    states: {}
};

user.name = document
    .querySelectorAll("#uhd > div.h.cl > h2")[0]
    .innerText.trim();
user.avatar = document
    .querySelector("#uhd > div.h.cl > div > a > img")
    .getAttribute("src")
    .replace("size=small", "size=big");

for (let i of document.querySelectorAll("div.pbm.mbm.bbda.cl > ul > li")) {
    try {
        switch (i.querySelector("em").innerText.trim()) {
            case "邮箱状态":
                i.removeChild(i.querySelector("em"));
                user.mailState = i.innerText.trim();
                break;
            case "视频认证":
                i.removeChild(i.querySelector("em"));
                user.videoProve = i.innerText.trim();
                break;
            case "自定义头衔":
                i.removeChild(i.querySelector("em"));
                user.rank = i.innerText.trim();
                break;
            case "个人签名":
                i.removeChild(i.querySelector("em"));
                user.signature = i.innerHTML;
                break;
            case "统计信息":
                for (let j of i.querySelectorAll("a")) {
                    let match = /^([^0-9\s]+)\s*([0-9]+)$/.exec(j.innerText);
                    switch (match[1]) {
                        case "好友数":
                            user.states.friendCount = match[2];
                            break;
                        case "回帖数":
                            user.states.replyCount = match[2];
                            break;
                        case "主题数":
                            user.states.threadCount = match[2];
                            break;
                    }
                }
                break;
            case "星座":
                i.removeChild(i.querySelector("em"));
                user.starSign = i.innerText.trim();
                break;
            case "个人主页":
                i.removeChild(i.querySelector("em"));
                user.homePage = i.innerText.trim();
                break;
            case "Java版ID":
                i.removeChild(i.querySelector("em"));
                user.javaVersionID = i.innerText.trim();
                break;
            case "基岩版ID":
                i.removeChild(i.querySelector("em"));
                user.bedrockVersionID = i.innerText.trim();
                break;
            case "管理组":
                user.managerGroup = /gid=([0-9]+)/.exec(
                    i.querySelector("a").getAttribute("href")
                )[1];
                break;
            case "用户组":
                user.userGroup = /gid=([0-9]+)/.exec(
                    i.querySelector("a").getAttribute("href")
                )[1];
                break;
            // case '扩展用户组':
            case "在线时间":
                i.removeChild(i.querySelector("em"));
                user.onlineTimeCount = i.innerText.trim();
                break;
            case "注册时间":
                i.removeChild(i.querySelector("em"));
                user.registerTime = i.innerText.trim();
                break;
            case "最后访问":
            case "上次活动时间":
                i.removeChild(i.querySelector("em"));
                user.latestOnlineTime = i.innerText.trim();
                break;
            case "上次发表时间":
                i.removeChild(i.querySelector("em"));
                user.latestReplyTime = i.innerText.trim();
                break;
            case "所在时区":
                i.removeChild(i.querySelector("em"));
                user.timeZone = i.innerText.trim();
                break;
        }
    } catch (e) {
        console.log(e);
    }
}

for (let i of document.querySelectorAll("#psts > ul > li")) {
    let type = i.querySelector("em").innerText.trim();
    i.removeChild(i.querySelector("em"));
    switch (type) {
        case "已用空间":
            user.states.usingSpace = i.innerText.trim();
            break;
        case "积分":
            user.states.globalIntegral = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
        case "人气":
            user.states.popularity = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
        case "金粒":
            user.states.goldNuggets = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
        case "金锭":
            user.states.goldIngots = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
        case "绿宝石":
            user.states.emeralds = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
        case "下界之星":
            user.states.netherStars = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
        case "贡献":
            user.states.devotion = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
        case "爱心":
            user.states.benevolence = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
        case "钻石":
            user.states.diamonds = /[0-9]+/.exec(i.innerText.trim())[0];
            break;
    }
}

let exportData = {
    users: {}
};
exportData.users[user.id] = user;

export let data = exportData;
export let state = 'success';