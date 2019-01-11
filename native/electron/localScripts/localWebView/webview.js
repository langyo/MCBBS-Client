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

import db from "../localDatabase/database";

const styles = theme => ({
  buttons: {
    zIndex: "9999",
    position: "absolute",
    top: 0,
    left: 200
  }
});

class WebView extends React.Component {
  refWebView = React.createRef();

  render() {
    const { classes } = this.props;

    return (
      <div>
        <webview src={this.props.url} ref="webview" preload="../scripts/forumWorker/export.js" />
      </div>
    )
  }

  componentDidMount() {
    this.refs.webview.addEventListener('ipc-message', (n) => {
      let data = JSON.parse(n.channel);
      db.merge(data.data).write();
      console.log(this.props);
      this.props.callBack();
    })
  }

  componentWillUnmount() {
    this.refs.webview.removeEventListener('ipc-message');
  }
}

WebView.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string,
  preload: PropTypes.arrayOf(PropTypes.string),
  callBack: PropTypes.func
};

export default withStyles(styles)(WebView);