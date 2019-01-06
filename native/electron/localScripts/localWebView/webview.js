import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';

const styles = theme => ({
  hide: {
    // display: "none",
    // width: "600px",
    height: "600px"
  },
  button: {
    zIndex: "9999",
    position: "absolute",
    top: 0,
    left: 200
  }
});

class WebView extends React.Component {
  refWebView = React.createRef();

  handleOpenDevTools = () => {
    this.refs.webview.openDevTools();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="contained" className={classes.button} onClick={this.handleOpenDevTools}>
          打开此页面的控制台
        </Button>
        <webview className={classes.hide} src={this.props.url} ref="webview" />
      </div>
    )
  }
}

WebView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WebView);