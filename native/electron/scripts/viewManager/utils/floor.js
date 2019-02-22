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

var _Heart = _interopRequireDefault(require("mdi-material-ui/Heart"));

var _Share = _interopRequireDefault(require("mdi-material-ui/Share"));

var _ChevronDown = _interopRequireDefault(require("mdi-material-ui/ChevronDown"));

var _DotsVertical = _interopRequireDefault(require("mdi-material-ui/DotsVertical"));

var _VoteOutline = _interopRequireDefault(require("mdi-material-ui/VoteOutline"));

var _MessageTextOutline = _interopRequireDefault(require("mdi-material-ui/MessageTextOutline"));

var _SquareEditOutline = _interopRequireDefault(require("mdi-material-ui/SquareEditOutline"));

var _database = _interopRequireDefault(require("../../../../native/electron/localScripts/localDatabase/database"));

var _testData = _interopRequireDefault(require("../testData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  floor: {
    padding: '8px',
    margin: '8px'
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
    return _react.default.createElement(_Card.default, {
      className: classes.floor
    }, _react.default.createElement(_CardHeader.default, {
      avatar: _react.default.createElement(_Avatar.default, {
        className: classes.avatar,
        src: this.props.accountAvatar
      }),
      action: _react.default.createElement(_IconButton.default, null, _react.default.createElement(_DotsVertical.default, null)),
      title: this.props.accountName,
      subheader: this.props.accountInfo
    }), _react.default.createElement(_CardContent.default, null, _react.default.createElement(_Typography.default, {
      variant: "caption",
      className: classes.floatLeft
    }, this.props.contentTimeInfo), _react.default.createElement(_Typography.default, {
      variant: "caption",
      className: classes.floatRight
    }, "# " + this.props.contentFloor)), _react.default.createElement(_CardContent.default, null, _react.default.createElement(_Typography.default, {
      component: "p",
      dangerouslySetInnerHTML: {
        __html: this.props.content
      }
    })), _react.default.createElement(_CardActions.default, {
      className: classes.actions,
      disableActionSpacing: true
    }, _react.default.createElement(_IconButton.default, null, this.props.reply && _react.default.createElement(_MessageTextOutline.default, null)), _react.default.createElement(_IconButton.default, null, this.props.edit && _react.default.createElement(_SquareEditOutline.default, null)), _react.default.createElement(_IconButton.default, {
      className: classes.expand
    }, this.props.rate && _react.default.createElement(_VoteOutline.default, null)), _react.default.createElement(_IconButton.default, null, _react.default.createElement(_Share.default, null))));
  }

}

Floor.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(Floor);

exports.default = _default;