import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

import Floor from "../utils/floor";

import testData from "../testData";

const styles = theme => ({});

class Thread extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        {testData.threads[this.props.thread].posts.map((n, id) => (
          <Floor
            key={n}
            accountAvatar={testData.users[testData.posts[n].author].avatar}
            accountName={testData.users[testData.posts[n].author].name}
            accountInfo={
              testData.userGroups[
                testData.users[testData.posts[n].author].userGroup
              ].name
            }
            contentTimeInfo={"发布于 ?"}
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
