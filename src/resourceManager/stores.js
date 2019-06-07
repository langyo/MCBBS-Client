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

import chattingPage from "./pageStore/chatting";
import chattingListPage from "./pageStore/chattingList";
import chooseAccountPage from "./pageStore/chooseAccount";
import forumPage from "./pageStore/forum";
import forumsPage from "./pageStore/forums";
import loginPage from "./pageStore/login";
import mainMakeNewThreadPage from "./pageStore/mainMakeNewThread";
import mainPagePage from "./pageStore/mainPage";
import newThreadPage from "./pageStore/newThread";
import noticesPage from "./pageStore/notices";
import recentNewsPage from "./pageStore/recentNews";
import registerPage from "./pageStore/register";
import replyPage from "./pageStore/reply";
import reportPage from "./pageStore/report";
import reviewPage from "./pageStore/review";
import searchPage from "./pageStore/search";
import settingPage from "./pageStore/settings";
import userCenterPage from "./pageStore/userCenter";
import userInfoPage from "./pageStore/userInfo";
import watchThreadPage from "./pageStore/watchThread";

export default {
    database: {
        accounts: accounts,
        forums: forums,
        local: local,
        mainPage: mainPage,
        medals: medals,
        userGroups: userGroups,
        posts: post,
        rates: rate,
        forums: forum,
        threads: thread,
        tools: tool,
        users: user
    },

    view: {
        tag: tag,
        dialog: dialog,
        popupMessage: popupMessage,
        theme: theme,
        fab: fab,
        language: language
    },

    page: {
        chatting: chattingPage,
        chattingList: chattingListPage,
        chooseAccount: chooseAccountPage,
        forum: forumPage,
        forums: forumsPage,
        login: loginPage,
        mainMakeNewThread: mainMakeNewThreadPage,
        mainPage: mainPagePage,
        newThread: newThreadPage,
        notices: noticesPage,
        recentNews: recentNewsPage,
        register: registerPage,
        reply: replyPage,
        report: reportPage,
        review: reviewPage,
        search: searchPage,
        setting: settingPage,
        userCenter: userCenterPage,
        userInfo: userInfoPage,
        watchThread: watchThreadPage
    }
}