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
const mainPage = {
  headImages: [{
    href: "thread-829068-1-1.html",
    img: "http://attachment.mcbbs.net/forum/201812/09/235920hi6f9ez6vkixq31i.png",
    title: "123"
  }, {
    href: "thread-828658-1-1.html",
    img: "https://raw.githubusercontent.com/Tollainmear/PicRepo/master/%E7%A7%91%E6%8A%80%E7%A9%BA%E5%B2%9B/%E9%A6%96%E9%A1%B5N%E6%A0%BC.jpg",
    title: "1444444444444444444444444"
  }, {
    href: "thread-827490-1-1.html",
    img: "http://wx2.sinaimg.cn/large/005UHtVDgy1fxi7tl5xbsj32nu0y2npi.jpg",
    title: "123"
  }, {
    href: "thread-830195-1-1.html",
    img: "http://wx2.sinaimg.cn/mw690/8d60bc48gy1fx9fw29jchj20hd06mwk8.jpg",
    title: "1"
  }, {
    href: "thread-823489-1-1.html",
    img: "http://attachment.mcbbs.net/forum/201811/15/075403rzirr25c2szh89tk.png.thumb.jpg",
    title: "1"
  }],
  forumGroups: {}
};

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
  },
  typography: {
    colorTextPrimary: '#FFFFFF'
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
        activeStep: prevState.activeStep + 1
      }));
    });

    _defineProperty(this, "handleBack", () => {
      this.setState(prevState => ({
        activeStep: prevState.activeStep - 1
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
    const maxSteps = mainPage.headImages.length;
    return _react.default.createElement("div", {
      className: classes.root
    }, _react.default.createElement(AutoPlaySwipeableViews, {
      axis: theme.direction === "rtl" ? "x-reverse" : "x",
      index: activeStep,
      onChangeIndex: this.handleStepChange,
      enableMouseEvents: true
    }, mainPage.headImages.map((step, index) => _react.default.createElement("div", {
      key: step.label
    }, Math.abs(activeStep - index) <= 2 ? _react.default.createElement("div", null, _react.default.createElement("img", {
      className: classes.img,
      src: step.img,
      alt: step.href
    }), _react.default.createElement("div", {
      className: classes.titleBar
    }, _react.default.createElement(_Typography.default, {
      variant: "subtitle1",
      color: "textPrimary",
      className: classes.typography
    }, step.title))) : null))), _react.default.createElement(_MobileStepper.default, {
      steps: maxSteps,
      position: "static",
      activeStep: activeStep,
      className: classes.mobileStepper,
      nextButton: _react.default.createElement(_Button.default, {
        size: "small",
        onClick: this.handleNext,
        disabled: activeStep === maxSteps - 1
      }, _react.default.createElement(_KeyboardArrowRight.default, null)),
      backButton: _react.default.createElement(_Button.default, {
        size: "small",
        onClick: this.handleBack,
        disabled: activeStep === 0
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
