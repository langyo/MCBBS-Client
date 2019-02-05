"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _webviewRender = _interopRequireDefault(require("../../../localScripts/localWebView/webviewRender"));

var _floor = _interopRequireDefault(require("../utils/floor"));

var _database = _interopRequireDefault(require("../../../localScripts/localDatabase/database"));

var _testData = _interopRequireDefault(require("../testData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({
  title: {
    padding: '12px'
  }
});

class Thread extends _react.default.Component {
  render() {
    const {
      classes
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement(_Typography.default, {
      variant: "h6",
      color: "inherit",
      className: classes.title
    }, _testData.default.threads[this.props.thread].title), _react.default.createElement(_webviewRender.default, {
      url: "http://www.mcbbs.net/thread-" + this.props.thread + "-1-1.html"
    }), _testData.default.threads[this.props.thread].posts.map((n, id) => _react.default.createElement(_floor.default, {
      key: n,
      className: classes.floor,
      accountAvatar: _testData.default.users[_testData.default.posts[n].author].avatar,
      accountName: _testData.default.users[_testData.default.posts[n].author].name,
      accountInfo: _testData.default.userGroup[_testData.default.users[_testData.default.posts[n].author].userGroup].name,
      contentTimeInfo: "发布于 " + _testData.default.posts[n].createTime,
      contentFloor: id + 1,
      content: _testData.default.posts[n].content,
      reply: true,
      rate: true,
      edit: true
    })));
  }

}

Thread.propTypes = {
  classes: _propTypes.default.object.isRequired,
  thread: _propTypes.default.number
};

var _default = (0, _styles.withStyles)(styles)(Thread);

exports.default = _default;