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

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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
  }
});

function DetailedExpansionPanel(props) {
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
  }, "\u95EE\u7B54\u5927\u7248")), _react.default.createElement("div", {
    className: classes.column
  }, _react.default.createElement(_Typography.default, {
    className: classes.secondaryHeading
  }, "mhmmmmmm"))), _react.default.createElement(_ExpansionPanelDetails.default, {
    className: classes.details
  }), _react.default.createElement(_Divider.default, null), _react.default.createElement(_ExpansionPanelActions.default, null, _react.default.createElement(_Button.default, {
    size: "small"
  }, "Cancel"), _react.default.createElement(_Button.default, {
    size: "small",
    color: "primary"
  }, "Save"))));
}

DetailedExpansionPanel.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(DetailedExpansionPanel);

exports.default = _default;