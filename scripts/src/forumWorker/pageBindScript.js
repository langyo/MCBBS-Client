/**
 * @description 为什么要将此文件写成 js 的格式而非 json 或 xml 这样的数据表达语言？
 * 理由如下：
 * 1. 直接原因：Babel 不会监测诸如 json 或 xml 这样后缀名的文件的更改，而 scripts 文件夹下的相关文件更改需要实时同步到 native 文件夹下
 * 2. 根本原因：未来在支持插件功能的时候，这部分内容是要动态生成的！preload 需要根据客户端已装配的插件与个性化设置动态生成
 * （如有异议，欢迎发 issue 作深入探讨）
 */

export default {
    "thread": {
        "urlReg": [
            "thread-([0-9]+)-([0-9]+)-1\\.html",
            "forum\\.php\\?mod=viewthread&tid=([0-9]+)&page=([0-9]+)(#pid([0-9]+))?"
        ],
        "urlRegArgsIndex": [
            {
                "threadID": 1,
                "threadPageIndex": 2
            },
            {
                "threadID": 1,
                "threadPageIndex": 2,
                "post": 4
            }
        ],
        "preload": [
            "pageParser/watchThread"
        ]
    },
    "users": {
        "urlReg": [
            "home\\.php\\?mod=space&username=(.+)",
            "\\?([0-9]+)",
            "home.php\\?mod=space&uid=([0-9]+)"
        ],
        "urlRegArgsIndex": [
            {
                "name": 1
            },
            {
                "userID": 1
            },
            {
                "userID": 1
            }
        ],
        "preload": [
            "pageParser/userInfo"
        ]
    },
    "forum": {
        "urlReg": [
            "forum-([a-zA-Z0-9]+)-([0-9]+)\.html"
        ],
        "urlRegArgsIndex": [
            {
                "forumID": 1,
                "forumPageIndex": 2
            }
        ],
        "preload": [
            "pageParser/forum"
        ]
    },
    "index-threads-list": {
        "urlReg": [
            "forum\.php\?mod=guide&view=({hot|digest|new|newthread})"
        ],
        "urlRegArgsIndex": [
            {
                "type": 1
            }
        ],
        "preload": [
            "pageParser/threadGroup"
        ]
    }
};