"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

var _resources = require("../src/lib/resources");

var _fullTextViewer = _interopRequireDefault(require("../src/ui/com/textEditor/fullTextViewer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const style = theme => {
  root: {
    width: "100%";
  }
}; // 普通楼层
// Prop 参数：
//   userId - 此层楼的用户 ID
//   floorId - 楼层 ID，也就是楼层在 res 里的编号
//   floorCount - 楼层编号，也就是第几层


class Floor extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleMoreClick", () => {});
  }

  render() {
    const {
      classes
    } = this.props;
    return _react.default.createElement(_Card.default, {
      className: classes.root
    }, _react.default.createElement(_CardHeader.default, {
      avatar: _react.default.createElement(_Avatar.default, {
        "aria-label": _resources.res.users[this.props.userId].name,
        src: _resources.res.users.getAvatarUrl(this.props.userId)
      }),
      action: _react.default.createElement(_IconButton.default, null, " ", _react.default.createElement(_MoreVert.default, {
        onClick: this.handleMoreClick
      }), " "),
      title: _resources.res.users[this.props.userId].name,
      subHeader: _resources.res.users.getGroupName(this.props.userId)
    }), _react.default.createElement(_CardContent.default, null, _react.default.createElement(_Typography.default, {
      variant: "caption",
      gutterBottom: true,
      align: "center"
    }, "最后编辑于 " + _resources.res.floor[this.props.floorId].latestEditTime), _react.default.createElement(_fullTextViewer.default, {
      content: _resources.res.floor[this.props.floorId].content
    }), _react.default.createElement(_Typography.default, {
      variant: ""
    })));
  }

}

Floor.propTypes = {
  classes: _propTypes.default.object.isRequired
}; // 帖子头部
// Prop 参数：
//   threadId - 帖子编号

class FloorHead extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleMoreClick", () => {});
  }

  render() {
    const {
      classes
    } = this.props;
    return _react.default.createElement(_Card.default, {
      className: classes.root
    }, _react.default.createElement(_CardHeader.default, {
      action: _react.default.createElement(_IconButton.default, null, " ", _react.default.createElement(_MoreVert.default, {
        onClick: this.handleMoreClick
      }), " "),
      title: _resources.res.thread[this.props.threadId].title
    }), _react.default.createElement(_CardContent.default, null, " "));
  }

}

FloorHead.propTypes = {
  classes: _propTypes.default.object.isRequired
};