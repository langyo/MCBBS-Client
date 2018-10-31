import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import { res } from "../../lib/resources";

import { MainBar } from "../com/appBar/menuBar";
import { MainDrawer } from "../com/drawer/mainDrawer";

const styles = theme => ({
  list: {
    marginTop: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  }
});

class Root extends React.component {
  state = {
    opening: null
  };

  render() {
    const { classes } = this.props;
    return (
      <MainBar
        title="MainPage"
        onclick={this.setState({ opening: "drawer" })}
      />
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Root);
