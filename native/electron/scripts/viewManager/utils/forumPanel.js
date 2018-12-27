"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _ExpansionPanel = _interopRequireDefault(require("@material-ui/core/ExpansionPanel"));

var _ExpansionPanelDetails = _interopRequireDefault(require("@material-ui/core/ExpansionPanelDetails"));

var _ExpansionPanelSummary = _interopRequireDefault(require("@material-ui/core/ExpansionPanelSummary"));

var _ExpansionPanelActions = _interopRequireDefault(require("@material-ui/core/ExpansionPanelActions"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _ListItemSecondaryAction = _interopRequireDefault(require("@material-ui/core/ListItemSecondaryAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "50%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  list: {
    width: "100%"
  }
});

function ForumPanel(props) {
  const {
    classes
  } = props;
  return _react.default.createElement("div", {
    className: classes.root
  }, _react.default.createElement(_ExpansionPanel.default, {
    defaultExpanded: true
  }, _react.default.createElement(_ExpansionPanelSummary.default, {
    expandIcon: _react.default.createElement(_ExpandMore.default, null)
  }, _react.default.createElement("div", {
    className: classes.column
  }, _react.default.createElement(_Typography.default, {
    className: classes.heading
  }, props.forumGroupName))), _react.default.createElement(_ExpansionPanelDetails.default, {
    className: classes.details
  }, _react.default.createElement(_List.default, {
    component: "nav",
    className: classes.list
  }, props.forums.map((n, id) => _react.default.createElement(_ListItem.default, {
    button: true,
    key: id
  }, _react.default.createElement(_ListItemIcon.default, null, _react.default.createElement("img", {
    alt: n.avatar,
    src: n.avatar
  })), _react.default.createElement(_ListItemText.default, {
    primary: n.name,
    secondary: n.info
  }), _react.default.createElement(_ListItemSecondaryAction.default, null, _react.default.createElement(_IconButton.default, {
    "aria-label": "Comments"
  }, _react.default.createElement(_MoreVert.default, null))))))), _react.default.createElement(_ExpansionPanelActions.default, null, _react.default.createElement(_IconButton.default, {
    color: "inherit"
  }, _react.default.createElement(_MoreVert.default, null)))));
}

ForumPanel.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(ForumPanel);

exports.default = _default;