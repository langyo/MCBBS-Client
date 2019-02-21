"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reflux = _interopRequireDefault(require("reflux"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _LinearProgress = _interopRequireDefault(require("@material-ui/core/LinearProgress"));

var _webviewRender = _interopRequireDefault(require("../../../localScripts/localWebView/webviewRender"));

var _floor = _interopRequireDefault(require("../utils/floor"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

var _testData = _interopRequireDefault(require("../testData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  title: {
    padding: '12px'
  }
});

class Thread extends _reflux.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      title: "加载中...",
      author: "",
      topIcons: [],
      posts: [],
      users: []
    });
  }

  render() {
    const {
      classes
    } = this.props;
    return _react.default.createElement("div", null, this.state.title === "加载中..." && _react.default.createElement(_LinearProgress.default, null), _react.default.createElement(_Typography.default, {
      variant: "h6",
      color: "inherit",
      className: classes.title
    }, this.state.title), _react.default.createElement(_webviewRender.default, {
      url: "http://www.mcbbs.net/thread-" + this.props.thread + "-1-1.html"
    }), this.state.posts.forEach((n, id) => _react.default.createElement(_floor.default, {
      key: n,
      className: classes.floor,
      accountAvatar: this.state.users[n.author].avatar,
      accountName: this.state.users[n.author].name,
      accountInfo: _testData.default.userGroup[this.state.users[n.author].userGroup].name,
      contentTimeInfo: "发布于 " + n.createTime,
      contentFloor: id + 1,
      content: n.content,
      reply: _database.default.get("accounts.nowUsing").value() != n.author && _database.default.get("accounts.nowUsing").value() != 0,
      rate: _database.default.get("accounts.nowUsing").value() != n.author && _database.default.get("accounts.nowUsing").value() != 0,
      edit: _database.default.get("accounts.nowUsing").value() == n.author
    })));
  }

}

Thread.propTypes = {
  classes: _propTypes.default.object.isRequired,
  thread: _propTypes.default.number
};

var _default = (0, _styles.withStyles)(styles)(Thread);

exports.default = _default;