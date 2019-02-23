"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateForumGroup', 'updateHeadImages', 'updateHeadThreads', 'pushNewPublishedThread', 'pushNewPublishedReply', 'pushNewPublishedStarThread', 'pushNewPublishedHotThread']);

class MainPage extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      mainPage: _database.default.get("mainPage").value()
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