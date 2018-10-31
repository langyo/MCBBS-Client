import React, { Fragment } from "react";
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

import { res } from "../../lib/resources";

import { MainBar } from "../com/appBar/menuBar";

const styles = theme => ({
  list: {
    marginTop: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  }
});

class MainDrawer extends React.component {
  render() {
    const { classes } = this.props;
    return <SwipeableDrawer />;
  }
}

class Root extends React.component {
  state = {
    opening: "mainPage"
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MainBar
          title="MainPage"
          onclick={this.setState({ opening: "drawer" })}
        >
          <IconButton onclick={this.setState({ opening: "searchDialog" })}>
            <SearchIcon />
          </IconButton>
        </MainBar>
        <MainDrawer
          open={this.state.opening === "drawer"}
          onclick={open => this.setState({ opening: "drawer" })}
        />
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
