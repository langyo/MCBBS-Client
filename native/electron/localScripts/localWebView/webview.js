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
      console.log('%cMainThread', 'color: blue;', "即将合并的数据：");
      console.log(data);
      db.merge(data.data).write();
      this.props.callBack(data);
    });
    this.refs.webview.addEventListener('console-message', n => {
      console.group("Virtual Browser " + this.props.id);
      console.log('%cLevel ' + n.level, 'color: red;');
      console.log(n.message);
      console.log("%cAt " + n.line, 'color: blue;');
      console.groupEnd();
    });
  }
}

WebView.propTypes = {
  id: PropTypes.number,
  callBack: PropTypes.func
};

export default WebView;