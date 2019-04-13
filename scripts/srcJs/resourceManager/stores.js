import accounts from "./databaseStore/accounts";
import forums from "./databaseStore/forums";
import local from "./databaseStore/local";
import mainPage from "./databaseStore/mainPage";
import medals from "./databaseStore/medals";
import userGroups from "./databaseStore/userGroups";

import posts from "./databaseStore/posts";
import rates from "./databaseStore/rates";
import threads from "./databaseStore/threads";
import tools from "./databaseStore/tools";
import users from "./databaseStore/users";

import tag from "./viewStore/tag";
import dialog from "./viewStore/dialog";
import popupMessage from "./viewStore/popupMessage";

export default {
    database: {
        // 以下部分为单个的全局 Store
        global: {
            accounts: accounts,
            forums: forums,
            local: local,
            mainPage: mainPage,
            medals: medals,
            userGroups: userGroups
        },

        // 以下部分为用于创建 Store 的类
        single: {
            post: posts,
            rate: rates,
            thread: threads,
            tool: tools,
            user: users
        }
    },

    view: {
        global: {
            tag: tag,
            dialog: dialog,
            popupMessage: popupMessage
        }
    }
}