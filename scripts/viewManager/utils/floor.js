"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Favorite = _interopRequireDefault(require("@material-ui/icons/Favorite"));

var _Share = _interopRequireDefault(require("@material-ui/icons/Share"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

var _HowToVote = _interopRequireDefault(require("@material-ui/icons/HowToVote"));

var _Message = _interopRequireDefault(require("@material-ui/icons/Message"));

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
  }
});

class Floor extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleExpandClick", () => {
      this.setState(state => ({
        expanded: !state.expanded
      }));
    });
  }

  render() {
    const {
      classes
    } = this.props;
    return _react.default.createElement(_Card.default, null, _react.default.createElement(_CardHeader.default, {
      avatar: _react.default.createElement(_Avatar.default, {
        className: classes.avatar,
        src: "http://www.mcbbs.net/uc_server/data/avatar/001/28/74/72_avatar_middle.jpg"
      }),
      action: _react.default.createElement(_IconButton.default, null, _react.default.createElement(_MoreVert.default, null)),
      title: "langyo",
      subheader: "Lv 8 . \u8003\u53E4\u5BB6"
    }), _react.default.createElement(_CardContent.default, null, _react.default.createElement(_Typography.default, {
      variant: "caption",
      className: classes.floatLeft
    }, "\u53D1\u5E03\u4E8E 2018 \u5E74 12 \u6708 13 \u65E5 13:26"), _react.default.createElement(_Typography.default, {
      variant: "caption",
      className: classes.floatRight
    }, "# 2")), _react.default.createElement(_CardContent.default, null, _react.default.createElement(_Typography.default, {
      component: "p"
    }, "\u8FD9\u662F\u4E00\u6BB5\u6D4B\u8BD5\u6587\u672C\uFF01")), _react.default.createElement(_CardActions.default, {
      className: classes.actions,
      disableActionSpacing: true
    }, _react.default.createElement(_IconButton.default, null, _react.default.createElement(_Message.default, null)), _react.default.createElement(_IconButton.default, {
      className: classes.expand
    }, _react.default.createElement(_HowToVote.default, null)), _react.default.createElement(_IconButton.default, null, _react.default.createElement(_Share.default, null))));
  }

}

Floor.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(Floor);

exports.default = _default;