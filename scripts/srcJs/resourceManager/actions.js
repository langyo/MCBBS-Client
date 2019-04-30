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
    if(path[id] === undefined) path[id] = Reflux.createActions(actions);
    return path[id];
};

export default {
    database: {
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
            post: (id) => checkSingleStore(id, singleList.database.single.post,[
                'updatePost'
            ]),
            rate: (id) => checkSingleStore(id, singleList.database.single.rate, [
                'updateRate'
            ]),
            forum: (id) => checkSingleStore(id, singleList.database.single.forum, [
                'updateThreadList',
                'updateHeadInfo'
            ]),
            thread: (id) => checkSingleStore(id, singleList.database.single.thread, [
                'updateThread'
            ]),
            /* tool: tools, */
            user: (id) => checkSingleStore(id, singleList.database.single.user, [
                'updateUser'
            ])
        }
    },

    view: {
        global: {
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
            ])
        }
    }
}