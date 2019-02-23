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

export let actions = {
    accounts: accounts,
    forums: forums,
    local: local,
    mainPage: mainPage,
    medals: medals,
    posts: posts,
    rates: rates,
    threads: threads,
    tools: tools,
    userGroups: userGroups,
    users: users
};