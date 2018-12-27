"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _MobileStepper = _interopRequireDefault(require("@material-ui/core/MobileStepper"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _KeyboardArrowLeft = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowRight"));

var _reactSwipeableViews = _interopRequireDefault(require("react-swipeable-views"));

var _reactSwipeableViewsUtils = require("react-swipeable-views-utils");

var _GridList = _interopRequireDefault(require("@material-ui/core/GridList"));

var _GridListTile = _interopRequireDefault(require("@material-ui/core/GridListTile"));

var _GridListTileBar = _interopRequireDefault(require("@material-ui/core/GridListTileBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AutoPlaySwipeableViews = (0, _reactSwipeableViewsUtils.autoPlay)(_reactSwipeableViews.default);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  img: {
    display: "block",
    overflow: "hidden",
    width: "100%",
    height: "100%"
  },
  titleBar: {
    background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " + "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    top: 0,
    padding: 12,
    position: "absolute",
    width: "100%",
    height: 16
  }
});

class HeadImages extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      activeStep: 0
    });

    _defineProperty(this, "handleNext", () => {
      this.setState(prevState => ({
        activeStep: prevState.activeStep + 1 >= this.props.headImages.length ? 0 : prevState.activeStep + 1
      }));
    });

    _defineProperty(this, "handleBack", () => {
      this.setState(prevState => ({
        activeStep: prevState.activeStep - 1 < 0 ? this.props.headImages.length - 1 : prevState.activeStep - 1
      }));
    });

    _defineProperty(this, "handleStepChange", activeStep => {
      this.setState({
        activeStep
      });
    });
  }

  render() {
    const {
      classes,
      theme
    } = this.props;
    const {
      activeStep
    } = this.state;
    const maxSteps = this.props.headImages.length;
    return _react.default.createElement("div", {
      className: classes.root
    }, _react.default.createElement(AutoPlaySwipeableViews, {
      axis: theme.direction === "rtl" ? "x-reverse" : "x",
      index: activeStep,
      onChangeIndex: this.handleStepChange,
      enableMouseEvents: true
    }, this.props.headImages.map((step, index) => _react.default.createElement("div", {
      key: index
    }, Math.abs(activeStep - index) <= 2 ? _react.default.createElement("div", {
      key: index
    }, _react.default.createElement("img", {
      className: classes.img,
      src: step.img,
      alt: step.href
    }), _react.default.createElement("div", {
      className: classes.titleBar
    }, _react.default.createElement(_Typography.default, {
      variant: "subtitle1"
    }, step.title))) : null))), _react.default.createElement(_MobileStepper.default, {
      steps: maxSteps,
      position: "static",
      activeStep: activeStep,
      className: classes.mobileStepper,
      nextButton: _react.default.createElement(_Button.default, {
        size: "small",
        onClick: this.handleNext
      }, _react.default.createElement(_KeyboardArrowRight.default, null)),
      backButton: _react.default.createElement(_Button.default, {
        size: "small",
        onClick: this.handleBack
      }, _react.default.createElement(_KeyboardArrowLeft.default, null))
    }));
  }

}

HeadImages.propTypes = {
  classes: _propTypes.default.object.isRequired,
  theme: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles, {
  withTheme: true
})(HeadImages);

exports.default = _default;