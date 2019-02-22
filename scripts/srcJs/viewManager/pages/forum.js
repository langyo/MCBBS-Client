import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import DocumentIcon from "mdi-material-ui/FileDocument";

import db from "../../../../native/electron/localScripts/localDatabase/database";

import testData from "../testData";

const styles = theme => ({
  actions: {
    display: "flex"
  },
  expand: {
    marginLeft: "auto" // 右侧按钮对齐
  },
  floatLeft: {
    float: "left"
  },
  floatRight: {
    float: "right"
  },
  title: {
    padding: "12px"
  },
  paper:{
    width: "100%",
    padding: "8px",
    margin: "8px"
  }
});

class Forum extends Reflux.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h6" color="inherit" className={classes.title}>
          {testData.forums[this.props.forum].name}
        </Typography>
        <Paper className={classes.paper}>
        
          <div dangerouslySetInnerHTML={{ __html: testData.forums[this.props.forum].info }}></div>
        </Paper>
        <List component="nav">
          {testData.forums[this.props.forum].threads.map((n, id) => (
            <ListItem button>
              <ListItemIcon>
                <DocumentIcon />
              </ListItemIcon>
              <ListItemText
                primary={testData.threads[n].title}
                secondary={
                  (testData.threads[n].author === "0"
                    ? "匿名"
                    : testData.users[testData.threads[n].author] &&
                      testData.users[testData.threads[n].author].name) || "?"
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Forum.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Forum);
