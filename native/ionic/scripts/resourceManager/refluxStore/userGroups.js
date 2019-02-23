"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateUserGroup']);

class UserGroups extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      userGroups: {// [map:帖子 id]
      }
    };
    this.listenToMany(Actions);
  }

  updateUserGroup(id, object) {
    let t = this.state.userGroups;
    t[id] = object;

    _database.default.set("userGroups[" + id + "]", object).write();

    this.setState({
      userGroups: t
    });
  }

}

UserGroups.id = 'userGroups';
let actions = Actions;
exports.actions = actions;