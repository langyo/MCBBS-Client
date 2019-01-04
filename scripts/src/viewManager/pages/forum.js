import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import DescriptionIcon from "@material-ui/icons/Description";

import testData from "../testData";

const styles = theme => ({
  fill: {
    width: "100%",
    height: "100%",
    maxHeight: "100%"
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
  }
});

class Forum extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <Typography variant="h6" color="inherit" className={classes.title}>
          {testData.forums[this.props.forum].name}
        </Typography>
        <List className={classes.fill}>
          {testData.forums[this.props.forum].threads.map((n, id) => (
            <ListItem button key={n}>
              <ListItemIcon>
                <DescriptionIcon />
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
      </Card>
    );
  }
}

Forum.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Forum);
