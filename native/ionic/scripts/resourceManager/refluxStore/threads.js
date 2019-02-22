"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.out = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateThread']);

class Threads extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      threads: {// [map:帖子 id]
      }
    };
    this.listenToMany(Actions);
  } // updateForumGroup(name, id, forums){
  //     let t = this.state.mainPage.forumGroups;
  //     t.push(
  //         {
  //             forumGroupName: name,
  //             forumGroupId: id,
  //             forums: forums
  //         }
  //     );
  //     db.set("mainPage.forumGroups", t).write();
  //     this.setState({
  //         mainPage: {
  //             forumGroups: t
  //         }
  //     });
  // }


}

Threads.id = 'threads';
let out = {
  store: _reflux.default.GlobalState['threads'],
  actions: Actions
};
exports.out = out;