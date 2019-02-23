"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateForum']);

class Forums extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      forums: {// [map:版块特征码，特征码由对应板块在 URL 上体现的名称决定]
      }
    };
    this.listenToMany(Actions);
  }

  updateForum(id, object) {
    let t = this.state.forums;
    t[id] = object;

    _database.default.set("forums[" + id + "]", object).write();

    this.setState({
      forums: t
    });
  }

}

Forums.id = 'forums';
let actions = Actions;
exports.actions = actions;