import React from "react";
import PropTypes from "prop-types";

import db from "../localDatabase/database";

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
      console.log(this.props);
      console.log(data);
      this.props.callBack(data);
    });
    this.refs.webview.addEventListener('console-message', n => {
      n.level >= 2 && console.warn(n);
    });
  }

  componentWillUnmount() {
    this.refs.webview.removeEventListener('ipc-message');
  }
}

WebView.propTypes = {
  url: PropTypes.string,
  callBack: PropTypes.func
};

export default WebView;