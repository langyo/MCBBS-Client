import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import JsonView from "react-json-view";

const styles = theme => ({
  hideMode: {
    display: "none",
    height: 0,
    width: 0
  },
  debugMode: {
    height: "600px"
  },
  buttons: {
    zIndex: "9999",
    position: "absolute",
    top: 0,
    left: 200
  }
});

class WebView extends React.Component {
  refWebView = React.createRef();

  state = {
    openResult: false,
    result: null
  }

  handleOpenDevTools = () => {
    this.refs.webview.openDevTools();
  }

  handleOpenResultDialog = () => {
    this.setState({ openResult: true });
  }

  handleCloseResultDialog = () => {
    this.setState({ openResult: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {
          this.props.debug && <div className={classes.buttons}>
            <Button variant="contained" onClick={this.handleOpenDevTools}>
              打开此页面的控制台
          </Button>
            <Button variant="contained" onClick={this.handleOpenResultDialog}>
              打开输出结果
          </Button>
          </div>
        }
        <Dialog
          open={this.state.openResult}
          onClose={this.handleCloseResultDialog}
          aria-labelledby="result-dialog"
        >
          <DialogTitle>输出结果</DialogTitle>
          <DialogContent>
            {
              this.state.result
              &&
              <JsonView src={this.state.result} name="由页面返回的解析数据" />
              ||
              <DialogContentText>
                数据正在解析，请稍候……
              </DialogContentText>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseResultDialog} color="primary">
              OjbK
            </Button>
          </DialogActions>
        </Dialog>
        {
          this.props.debug && <webview className={classes.debugMode} src={this.props.url} ref="webview" preload="../scripts/forumWorker/export.js" />
          || <webview className={classes.hideMode} src={this.props.url} ref="webview" preload="../scripts/forumWorker/export.js" />
        }
      </div>
    )
  }

  componentDidMount() {
    this.refs.webview.addEventListener('ipc-message', (n) => {
      this.props.debug && this.setState({
        result: JSON.parse(n.channel)
      });
      console.log(this.props.onLoad);
    })
  }
}

WebView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WebView);