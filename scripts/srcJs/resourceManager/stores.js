import { accounts, forums, local, mainPage, medals, posts, rates, threads, tools, userGroups, users} from "./databaseStore";
import { dialog, popupMessage, tag} from "./viewStore";

export let database = {
    // 以下部分为单个的全局 Store
    global: {
        accounts: accounts,
        forums: forums,
        local: local,
        mainPage: mainPage,
        medals: medals,
        userGroups: suerGroups
    },

    // 以下部分为用于创建 Store 的类
    single: {
        post: posts,
        rate: rates,
        thread: threads,
        tool: tools,
        user: users
    }
};

export let view = {
    global: {
        tag: tag,
        dialog: dialog,
        popupMessage: popupMessage
    }
};