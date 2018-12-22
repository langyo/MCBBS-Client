"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _forumPanel = _interopRequireDefault(require("../utils/forumPanel"));

var _testData = _interopRequireDefault(require("../testData"));

var _headImages = _interopRequireDefault(require("../utils/headImages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MainPage extends _react.default.Component {
  render() {
    return _react.default.createElement("div", null, _react.default.createElement(_headImages.default, {
      headImages: _testData.default.mainPage.headImages
    }), Object.keys(_testData.default.mainPage.forumGroups).map(n => _react.default.createElement(_forumPanel.default, {
      forumGroupName: _testData.default.mainPage.forumGroups[n].forumGroupName,
      key: _testData.default.mainPage.forumGroups[n].forumGroupId,
      forums: _testData.default.mainPage.forumGroups[n].forums
    })));
  }

}

var _default = withStyles(styles, {
  withTheme: true
})(MainPage);

exports.default = _default;