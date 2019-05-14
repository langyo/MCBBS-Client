import React from "react";
import Reflux from "reflux";
import { withStyles } from "@material-ui/core/styles";

import ForumPanel from "../utils/forumPanel";
import HeadImages from "../utils/headImages";
import MiniThread from "../utils/indexPageThreads";

import db from "../../../../native/electron/localScripts/localDatabase/database";

import TestData from "../testData"

const styles = theme => ({
  padding: {
    padding: "8px"
  }
});

class MainPage extends Reflux.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <HeadImages headImages={TestData.mainPage.headImages} className={classes.padding} />
        {
          // TODO: 这里开始往 indexPageThreads 套接
          // (也就是最新帖子列表)
        }
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);
