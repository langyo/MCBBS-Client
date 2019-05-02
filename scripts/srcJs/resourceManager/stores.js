import accounts from "./databaseStore/accounts";
import forums from "./databaseStore/forums";
import local from "./databaseStore/local";
import mainPage from "./databaseStore/mainPage";
import medals from "./databaseStore/medals";
import userGroups from "./databaseStore/userGroups";

import post from "./databaseStore/posts";
import rate from "./databaseStore/rates";
import forum from "./databaseStore/forum";
import thread from "./databaseStore/threads";
import tool from "./databaseStore/tools";
import user from "./databaseStore/users";

import tag from "./viewStore/tag";
import dialog from "./viewStore/dialog";
import popupMessage from "./viewStore/popupMessage";
import theme from "./viewStore/theme";
import fab from "./viewStore/fab";
import language from "./viewStore/language";

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
            post: post,
            rate: rate,
            forum: forum,
            thread: thread,
            tool: tool,
            user: user
        }
    },

    view: {
        global: {
            tag: tag,
            dialog: dialog,
            popupMessage: popupMessage,
            theme: theme,
            fab: fab,
            language: language
        }
    }
}