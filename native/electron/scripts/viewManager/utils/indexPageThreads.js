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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  content: {
    maxHeight: 300,
    position: "relative"
  },
  cover: {
    height: 100,
    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)",
    bottom: 0,
    position: "absolute"
  },
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
        src: this.props.accountAvatar
      }),
      title: this.props.accountName,
      subheader: this.props.contentTimeInfo
    }), _react.default.createElement(_CardContent.default, {
      className: classes.content
    }, _react.default.createElement("div", {
      className: classes.cover
    }), _react.default.createElement(_Typography.default, {
      component: "p",
      dangerouslySetInnerHTML: {
        __html: this.props.content
      }
    })));
  }

}

Floor.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(Floor);

exports.default = _default;