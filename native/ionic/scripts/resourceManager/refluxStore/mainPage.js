"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../../native/electron/localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateForumGroup', 'updateHeadImages', 'updateHeadThreads', 'pushNewPublishedThread', 'pushNewPublishedReply', 'pushNewPublishedStarThread', 'pushNewPublishedHotThread']);

class MainPage extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      mainPage: {
        // 版块
        forumGroups: [],
        // 头图
        headImages: [],
        // 主页上轮播的帖子
        headThreads: {
          latestThread: [],
          // 主页上的最新被回复的帖子
          latestReply: [],
          // 主页上的最新精华帖
          latestStarThread: []
        }
      }
    };
    this.listenToMany(Actions);
  }

  updateForumGroup(name, id, forums) {
    let t = this.state.mainPage.forumGroups;
    t.push({
      forumGroupName: name,
      forumGroupId: id,
      forums: forums
    });

    _database.default.set("mainPage.forumGroups", t).write();

    this.setState({
      mainPage: {
        forumGroups: t
      }
    });
  }

  updateHeadImages() {}

  updateHeadThreads() {}

  pushNewPublishedThread() {}

  pushNewPublishedReply() {}

  pushNewPublishedStarThread() {}

  pushNewPublishedHotThread() {}

}

MainPage.id = 'mainPage';
let actions = Actions;
exports.actions = actions;