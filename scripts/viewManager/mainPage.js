import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  list: {
    marginTop: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  }
});

class Root extends React.Component {
  constructor(){
    this.state = {
      opening: "mainPage"
    };
  }

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <List>{[""]}</List>
      </div>
    );

    return (
      <div className={classes.root}>
        <SwipeableDrawer
          open={this.state.opening === "drawer"}
          onclick={open => this.setState({ opening: "drawer" })}
        >
          {drawer}
        </SwipeableDrawer>
        {this.state.opening === "mainPage"
          ? res.MainPage.forumGroups.map(({ forumGroupName, forums }) => (
              <div>
                <ListSubheader className={classes.subHeader}>
                  {forumGroupName}
                </ListSubheader>
                <div>
                  {this.props.forums.map(({ name, info, avatar }) => (
                    <ListItem
                      button
                      onclick={this.setState({
                        opening: "forums",
                        arg: res.forums.get(name)
                      })}
                    >
                      <Avatar src={avatar} />
                      <ListItemText primary={name} secondary={info} />
                    </ListItem>
                  ))}
                </div>
              </div>
            ))
          : ""}
      </div>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Root);
