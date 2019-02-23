"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateUser']);

class Users extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      userGroups: _database.default.get("users").value()
    };
    this.listenToMany(Actions);
  }

  updateUserGroup(id, object) {
    let t = this.state.users;
    t[id] = object;

    _database.default.set("users[" + id + "]", object).write();

    this.setState({
      users: t
    });
  }

}

Users.id = 'users';
let actions = Actions;
exports.actions = actions;