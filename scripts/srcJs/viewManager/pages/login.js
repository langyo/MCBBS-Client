import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

const questions = [
  {
    value: "nil",
    label: "(未设置)"
  },
  {
    value: "母亲的名字",
    label: "母亲的名字"
  },
  {
    value: "爷爷的名字",
    label: "爷爷的名字"
  },
  {
    value: "父亲出生的城市",
    label: "父亲出生的城市"
  },
  {
    value: "您其中一位老师的名字",
    label: "您其中一位老师的名字"
  },
  {
    value: "您个人计算机的型号",
    label: "您个人计算机的型号"
  },
  {
    value: "您最喜欢的餐馆名称",
    label: "您最喜欢的餐馆名称"
  },
  {
    value: "驾驶执照最后四位数字",
    label: "驾驶执照最后四位数字"
  }
];

class Login extends Reflux.Component {
  state = {
    question: "nil"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Typography variant="h6" color="inherit" className={classes.title}>
          {"登录"}
        </Typography>
        <TextField
          id="outlined-name"
          label="用户名"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="密码"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-select-questions"
          select
          label="安全提问"
          className={classes.textField}
          value={this.state.question}
          onChange={this.handleChange("question")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="未设置请忽略"
          margin="normal"
          variant="outlined"
        >
          {questions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div className={classes.textField}>
        <div className={this.state.question === "nil" && classes.hide}>
          <TextField
            id="outlined-name"
            label="安全提问答案"
            className={classes.maxWidth}
            value={this.state.answer}
            onChange={this.handleChange("answer")}
            margin="normal"
            variant="outlined"
          />
        </div>
        </div>
        <Button variant="outlined" color="primary" className={classes.button}>
          {"登录"}
        </Button>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
