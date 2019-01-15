"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _FileDocument = _interopRequireDefault(require("mdi-material-ui/FileDocument"));

var _testData = _interopRequireDefault(require("../testData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  actions: {
    display: "flex"
  },
  expand: {
    marginLeft: "auto" // 右侧按钮对齐

  },
  floatLeft: {
    float: "left"
  },
  floatRight: {
    float: "right"
  },
  title: {
    padding: "12px"
  },
  paper: {
    width: "100%",
    padding: 8,
    margin: 8
  }
});

class Forum extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});
  }

  render() {
    const {
      classes
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement(_Typography.default, {
      variant: "h6",
      color: "inherit",
      className: classes.title
    }, _testData.default.forums[this.props.forum].name), _react.default.createElement(_Paper.default, {
      className: classes.paper
    }, _react.default.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: _testData.default.forums[this.props.forum].info
      }
    })), _react.default.createElement(_List.default, {
      component: "nav"
    }, _testData.default.forums[this.props.forum].threads.map((n, id) => _react.default.createElement(_ListItem.default, {
      button: true
    }, _react.default.createElement(_ListItemIcon.default, null, _react.default.createElement(_FileDocument.default, null)), _react.default.createElement(_ListItemText.default, {
      primary: _testData.default.threads[n].title,
      secondary: (_testData.default.threads[n].author === "0" ? "匿名" : _testData.default.users[_testData.default.threads[n].author] && _testData.default.users[_testData.default.threads[n].author].name) || "?"
    })))));
  }

}

Forum.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(Forum);

exports.default = _default;