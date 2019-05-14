import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";

import shortid from "shortid";

import db from "../localDatabase/database";
import reflux from "../../../../scripts/srcJs/resourceManager/actions";

class WebView extends Reflux.Component {
  constructor(props){
    super(props);
    console.log("n:", reflux)
    this.stores = reflux.stores;
  }

  timeoutObject;
  done = false;

  render() {
    return (
      <div>
        <webview src={this.props.data.url} ref="webview" preload="../../../scripts/srcJs/forumWorker/preload.js" />
      </div>
    )
  }

  componentDidMount() {
    this.refs.webview.addEventListener('ipc-message', (n) => {
      this.done = true;
      let data = JSON.parse(n.channel);
      console.log('%cMainThread', 'color: blue;', "即将合并的数据：");
      console.log(data);
      db.merge(data.data).write();
      this.props.callBack(data);
    });
    this.refs.webview.addEventListener('console-message', n => {
      console.group("Virtual Browser " + this.props.data.url);
      console.log('%cLevel ' + n.level, 'color: red;');
      console.log(n.message);
      console.log("%cAt " + n.line, 'color: blue;');
      console.groupEnd();
      // 能有控制台信息传入，说明连接上去了，取消自动刷新
      clearTimeout(this.timeoutObject);
    });
    this.refs.webview.addEventListener('did-fail-load', n => {
      console.group("Virtual Browser " + this.props.data.url);
      console.log('%c ERR code ' + n.errorCode + " : " + n.errorDescription, 'color: red;');
      console.groupEnd();
      this.refs.webview.reload();
    });
    this.refs.webview.addEventListener('crashed', n => {
      console.group("Virtual Browser " + this.props.data.url);
      console.log('%c ERR : 浏览器标签崩溃！重新刷新', 'color: red;');
      console.groupEnd();
      this.refs.webview.reload();
    });
    this.timeoutObject = setInterval(() => {
      if(!this.done && this.props.data.url !== undefined) {
        console.group("Virtual Browser " + this.props.data.url);
        console.log('%c WARN : 浏览器无反应，重新刷新', 'background: yellow;');
        console.groupEnd();
        this.refs.webview.reload();
      }
    }, 10000)
  }

  componentWillUnmount(){
    this.done = true;
    clearTimeout(this.timeoutObject);
  }
}

WebView.propTypes = {
  callBack: PropTypes.func
};

export default WebView;
