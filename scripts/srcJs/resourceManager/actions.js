import accounts from "./refluxStore/accounts";
import forums from "./refluxStore/forums";
import local from "./refluxStore/local";
import mainPage from "./refluxStore/mainPage";
import medals from "./refluxStore/medals";
import posts from "./refluxStore/posts";
import rates from "./refluxStore/rates";
import threads from "./refluxStore/threads";
import tools from "./refluxStore/tools";
import userGroups from "./refluxStore/userGroups";
import users from "./refluxStore/users";

export let stores = {
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
        posts: posts,
        rates: rates,
        threads: threads,
        tools: tools,
        users: users
    }
};