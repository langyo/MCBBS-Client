"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../../native/electron/localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateThread']);

class Threads extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      threads: _database.default.get("threads").value()
    };
    this.listenToMany(Actions);
  }

  updateThread(id, object) {
    let t = this.state.threads;
    t[id] = object;

    _database.default.set("threads[" + id + "]", object).write();

    this.setState({
      threads: t
    });
  }

}

Threads.id = 'threads';
let actions = Actions;
exports.actions = actions;