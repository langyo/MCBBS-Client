import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Floor from "../utils/floor";

import db from "../../../localScripts/localDatabase/database";

import testData from "../testData";

const styles = theme => ({
  title: {
    padding: '12px'
  }
});

class Thread extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h6" color="inherit" className={classes.title}>
          {testData.threads[this.props.thread].title}
        </Typography>
        {testData.threads[this.props.thread].posts.map((n, id) => (
          <Floor
            key={n}
            className={classes.floor}
            accountAvatar={testData.users[testData.posts[n].author].avatar}
            accountName={testData.users[testData.posts[n].author].name}
            accountInfo={
              testData.userGroup[
                testData.users[testData.posts[n].author].userGroup
              ].name
            }
            contentTimeInfo={"发布于 " + testData.posts[n].createTime}
            contentFloor={id + 1}
            content={testData.posts[n].content}
            reply
            rate
            edit
          />
        ))}
      </div>
    );
  }
}

Thread.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Thread);
