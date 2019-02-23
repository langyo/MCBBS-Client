"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateMedal']);

class Medals extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      medals: {// [map:勋章 ID]
      }
    };
    this.listenToMany(Actions);
  }

  updateMedal(id, object) {
    let t = this.state.medals;
    t[id] = object;

    _database.default.set("medals[" + id + "]", object).write();

    this.setState({
      medals: t
    });
  }

}

Medals.id = 'medals';
let actions = Actions;
exports.actions = actions;