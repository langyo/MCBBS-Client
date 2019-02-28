import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import WebviewRender from "../../../../native/electron/localScripts/localWebView/webviewRender";
import Floor from "../utils/floor";

import ThreadStore from "../../../../scripts/srcJs/resourceManager/refluxStore/threads";
import db from "../../../../native/electron/localScripts/localDatabase/database";

import testData from "../testData";

const styles = theme => ({
  title: {
    padding: '12px'
  }
});

class Thread extends Reflux.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "加载中...",
      author: "",
      topIcons: [],
      posts: [],
      users: []
    };
    this.store = new ThreadStore(props.thread);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.title === "加载中..." && <LinearProgress />}
        <Typography variant="h6" color="inherit" className={classes.title}>
          {this.state.title}
        </Typography>
        <WebviewRender url={"http://www.mcbbs.net/thread-" + this.props.thread + "-1-1.html"} />
        {
          this.state.posts.forEach((n, id) => (
          <Floor
            key={n}
            className={classes.floor}
            user = {n.author}
            /* post = {n.post} */
            accountAvatar={this.state.users[n.author].avatar}
            accountName={this.state.users[n.author].name}
            accountInfo={
              testData.userGroup[
                this.state.users[n.author].userGroup
              ].name
            }
            contentTimeInfo={"发布于 " + n.createTime}
            contentFloor={id + 1}
            content={n.content}
            reply={db.get("accounts.nowUsing").value() != n.author && db.get("accounts.nowUsing").value() != 0}
            rate={db.get("accounts.nowUsing").value() != n.author && db.get("accounts.nowUsing").value() != 0}
            edit={db.get("accounts.nowUsing").value() == n.author}
          />
        ))}
      </div>
    );
  }
}

Thread.propTypes = {
  classes: PropTypes.object.isRequired,
  thread: PropTypes.number
};

export default withStyles(styles)(Thread);
