"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reflux = _interopRequireDefault(require("reflux"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("@material-ui/core/styles");

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  title: {
    padding: "12px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  maxWidth: {
    width: "100%"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%"
  },
  hide: {
    display: "none"
  }
});

const questions = [{
  value: "nil",
  label: "(未设置)"
}, {
  value: "母亲的名字",
  label: "母亲的名字"
}, {
  value: "爷爷的名字",
  label: "爷爷的名字"
}, {
  value: "父亲出生的城市",
  label: "父亲出生的城市"
}, {
  value: "您其中一位老师的名字",
  label: "您其中一位老师的名字"
}, {
  value: "您个人计算机的型号",
  label: "您个人计算机的型号"
}, {
  value: "您最喜欢的餐馆名称",
  label: "您最喜欢的餐馆名称"
}, {
  value: "驾驶执照最后四位数字",
  label: "驾驶执照最后四位数字"
}];

class Login extends _reflux.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      question: "nil"
    });

    _defineProperty(this, "handleChange", name => event => {
      this.setState({
        [name]: event.target.value
      });
    });
  }

  render() {
    const {
      classes
    } = this.props;
    return _react.default.createElement("form", {
      className: classes.container,
      noValidate: true,
      autoComplete: "off"
    }, _react.default.createElement(_Typography.default, {
      variant: "h6",
      color: "inherit",
      className: classes.title
    }, "登录"), _react.default.createElement(_TextField.default, {
      id: "outlined-name",
      label: "\u7528\u6237\u540D",
      className: classes.textField,
      value: this.state.name,
      onChange: this.handleChange("name"),
      margin: "normal",
      variant: "outlined"
    }), _react.default.createElement(_TextField.default, {
      id: "outlined-password-input",
      label: "\u5BC6\u7801",
      className: classes.textField,
      type: "password",
      autoComplete: "current-password",
      margin: "normal",
      variant: "outlined"
    }), _react.default.createElement(_TextField.default, {
      id: "outlined-select-questions",
      select: true,
      label: "\u5B89\u5168\u63D0\u95EE",
      className: classes.textField,
      value: this.state.question,
      onChange: this.handleChange("question"),
      SelectProps: {
        MenuProps: {
          className: classes.menu
        }
      },
      helperText: "\u672A\u8BBE\u7F6E\u8BF7\u5FFD\u7565",
      margin: "normal",
      variant: "outlined"
    }, questions.map(option => _react.default.createElement(_MenuItem.default, {
      key: option.value,
      value: option.value
    }, option.label))), _react.default.createElement("div", {
      className: classes.textField
    }, _react.default.createElement("div", {
      className: this.state.question === "nil" && classes.hide
    }, _react.default.createElement(_TextField.default, {
      id: "outlined-name",
      label: "\u5B89\u5168\u63D0\u95EE\u7B54\u6848",
      className: classes.maxWidth,
      value: this.state.answer,
      onChange: this.handleChange("answer"),
      margin: "normal",
      variant: "outlined"
    }))), _react.default.createElement(_Button.default, {
      variant: "outlined",
      color: "primary",
      className: classes.button
    }, "登录"));
  }

}

Login.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(Login);

exports.default = _default;