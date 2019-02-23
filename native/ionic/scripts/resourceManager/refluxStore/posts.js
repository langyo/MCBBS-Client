"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updatePost']);

class Posts extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      posts: _database.default.get("posts").value()
    };
    this.listenToMany(Actions);
  }

  updatePosts(id, object) {
    let t = this.state.posts;
    t[id] = object;

    _database.default.set("posts[" + id + "]", object).write();

    this.setState({
      posts: t
    });
  }

}

Posts.id = 'posts';
let actions = Actions;
exports.actions = actions;