import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import MiniFloor from "./floor";

import testData from "./testData";

const styles = theme => ({});

class Thread extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <List>
        {testData.threads[this.props.thread].posts.map((n, id) => (
          <ListItem button>
            <MiniFloor
              key={n}
              accountAvatar={testData.users[testData.posts[n].author].avatar}
              accountName={testData.users[testData.posts[n].author].name}
              contentTimeInfo={"发布于 " + testData.posts[n].createTime}
              content={testData.posts[n].content}
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

Thread.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Thread);
