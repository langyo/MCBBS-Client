"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _floor = _interopRequireDefault(require("../utils/floor"));

var _testData = _interopRequireDefault(require("../testData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({});

class Thread extends _react.default.Component {
  render() {
    const {
      classes
    } = this.props;
    return _react.default.createElement("div", null, _testData.default.threads[this.props.thread].posts.map((n, id) => _react.default.createElement(_floor.default, {
      key: n,
      accountAvatar: _testData.default.users[_testData.default.posts["post_" + n].author].avatar,
      accountName: _testData.default.users[_testData.default.posts["post_" + n].author].name,
      accountInfo: "Lv ? .",
      contentTimeInfo: "发布于 ?",
      contentFloor: id + 1,
      content: _testData.default.posts["post_" + n].content,
      reply: true,
      rate: true,
      edit: true
    })));
  }

}

Thread.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(Thread);

exports.default = _default;