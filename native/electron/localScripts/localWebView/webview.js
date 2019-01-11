import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";

import db from "../localDatabase/database";

const styles = theme => ({
});

class WebView extends React.Component {
  render() {
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
      data.newTask && this.props.callBack('newTask', data.newTask) || this.props.callBack('done');
    })
  }

  componentWillUnmount() {
    this.refs.webview.removeEventListener('ipc-message');
  }
}

WebView.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string,
  callBack: PropTypes.func
};

export default withStyles(styles)(WebView);