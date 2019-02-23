"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Actions = _reflux.default.createActions(['updateRate']);

class Rates extends _reflux.default.Store {
  constructor() {
    super();
    this.state = {
      rates: {// [map:评分 ID]
      }
    };
    this.listenToMany(Actions);
  }

  updateRate(id, object) {
    let t = this.state.rates;
    t[id] = object;

    _database.default.set("rates[" + id + "]", object).write();

    this.setState({
      rates: t
    });
  }

}

Rates.id = 'rates';
let actions = Actions;
exports.actions = actions;