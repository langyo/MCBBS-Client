import Reflux from "reflux";

let singleList = {
    database: {
        single: {
            post: {},
            rate: {},
            thread: {},
            forum: {},
            /* tool: tools, */
            user: {}
        }
    }
};

const checkSingleStore = (id, path, actions) => {
    if (path[id] === undefined) path[id] = Reflux.createActions(actions);
    return path[id];
};

export default {
    database: {
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
        ]),
        posts: Reflux.createActions([
            'updatePost'
        ]),
        rates: Reflux.createActions([
            'updateRate'
        ]),
        forums: Reflux.createActions([
            'updateThreadList',
            'updateHeadInfo'
        ]),
        threads: Reflux.createActions([
            'updateThread'
        ]),
        /* tool: tools, */
        users: Reflux.createActions([
            'updateUser'
        ])
    },

    view: {
        tag: Reflux.createActions([
            'create',
            'delete',
            'toggleTo'
        ]),
        dialog: Reflux.createActions([
            'toggleTo',
            'reset'
        ]),
        fab: Reflux.createActions([
            'toggleTo',
            'reset'
        ]),
        popupMessage: Reflux.createActions([
            'sendNewMessage',
            'popupNewMessage'
        ]),
        theme: Reflux.createActions([
            'togglePrimary',
            'toggleSecondary'
        ]),
        language: Reflux.createActions([
            'toggleTo',
        ])
    },

    page: {
        chatting: Reflux.createActions([

        ]),
        chattingList: Reflux.createActions([

        ]),
        chooseAccount: Reflux.createActions([

        ]),
        forum: Reflux.createActions([

        ]),
        forums: Reflux.createActions([

        ]),
        login: Reflux.createActions([

        ]),
        mainMakeNewThread: Reflux.createActions([

        ]),
        mainPage: Reflux.createActions([

        ]),
        newThread: Reflux.createActions([

        ]),
        notices: Reflux.createActions([

        ]),
        recentNews: Reflux.createActions([

        ]),
        register: Reflux.createActions([

        ]),
        reply: Reflux.createActions([

        ]),
        report: Reflux.createActions([

        ]),
        review: Reflux.createActions([

        ]),
        search: Reflux.createActions([

        ]),
        settings: Reflux.createActions([

        ]),
        userCenter: Reflux.createActions([

        ]),
        userInfo: Reflux.createActions([

        ]),
        watchThread: Reflux.createActions([

        ])
    }
}