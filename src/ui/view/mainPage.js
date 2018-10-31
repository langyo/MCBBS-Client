import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import SearchIcon from "@material-ui/icons/Search"

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
      >
        <IconButton onclick={this.setState({opening:'searchDialog'})} >
          <SearchIcon />
        </IconButton>
      </MainBar>
      <MainDrawer open={this.state==='drawer'} onclick={open=>this.setState({opening:'drawer'})} />
      
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Root);
