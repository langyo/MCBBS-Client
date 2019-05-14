import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db');
const db = lowdb(adapter);

db.defaults({
    // 主页中的数据
    mainPage: {
        // 版块
        forumGroups: [],
        // 头图
        headImages: [],
        // 主页上轮播的帖子
        headThreads: {
            latestThread: [],
            // 主页上的最新被回复的帖子
            latestReply: [],
            // 主页上的最新精华帖
            latestStarThread: []
        }
    },

    // 版块
    forums: {
        // [map:版块特征码，特征码由对应板块在 URL 上体现的名称决定]
    },

    // 主题
    threads: {
        // [map:帖子 id]
    },

    // 楼层
    posts: {
        // [map:楼层 ID]
    },

    // 评分
    rates: {
        // [map:评分 ID]
    },

    // 用户
    users: {
        // [map:用户 ID]
    },

    // 用户组
    userGroups: {
        // [map:用户组 ID]
    },

    // 勋章
    medals: {
        // [map:勋章 ID]
    },

    // 道具
    tools: {
        // [map:道具标识名]
    },

    // 本地账户
    accounts: {
        // 当前正在使用的已登入账户 ID
        nowUsing: 0,
        loggedAccount: {
            // [map:登入账户 ID]
        }
    },

    // 本地存贮的设置数据
    local: {
        // 日志记录
        log: [],

        // 浏览记录
        history: {
            // 页面浏览历史
            browseHistory: [],
            // 账户登入历史
            accountHistory: [],
            // 账户登入使用的 Cookie 凭据，存储的是 CookieJar 对象的 json 文本表达
            accountCookieStorage: {
                // [map:账户 ID]
            },
            // 插件启动记录
            extensionLaunchHistory: []
        },

        // 插件
        extensions: {
            // [map:插件 UUID]
        },

        // 资源数据
        sources: {
            // [map:资源文件的 URL 的特征码]
        },

        // 虚拟浏览器设置
        browserSettings: {
            // User-Agent 设置
            userAgent: "",
            // 最大虚拟浏览器个数
            maxVirtalBrowserCount: 4
        },

        // 客户端个性化设置
        clientSettings: {
            // 主题
            theme: ""
        },

        // 临时储存的草稿帖子
        tempSaveThreads: [],

        // 临时储存的草稿回复
        tempSaveReplys: [],

        // 储存的评分理由
        rateReasons: [
            /* 字符串数组 */
        ],

        // 储存的举报理由
        reportReasions: [
            /* 字符串数组 */
        ]
    }
}).write();

export default db;