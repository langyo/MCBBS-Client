import Reflux from "reflux";

export let stores = {
    // 以下部分为单个的全局 Store
    global: {
        /* accounts: accounts, */
        forums: Reflux.createActions([
            'updateForum'
        ]),
        /* local: local, */
        mainPage: Reflux.createActions([
            'updateForumGroup',
            'updateHeadImages',
            'updateHeadThreads',
            'pushNewPublishedThread',
            'pushNewPublishedReply',
            'pushNewPublishedStarThread',
            'pushNewPublishedHotThread'
        ]),
        medals: Reflux.createActions([
            'updateMedal'
        ]),
        userGroups: Reflux.createActions([
            'updateUserGroup'
        ])
    },

    // 以下部分为用于创建 Store 的类
    single: {
        post: [
            'updatePost'
        ],
        rate: [
            'updateRate'
        ],
        thread: [
            'updateThread'
        ],
        /* tool: tools, */
        user: [
            'updateUser'
        ]
    }
};