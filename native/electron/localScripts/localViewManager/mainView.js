const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const { ipcRenderer, shell } = electron;
const remote = electron.remote;

import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import TestDrawer from "../../../../scripts/srcJs/viewManager/utils/mainDrawer";
import TestDialog from "../../../../scripts/srcJs/viewManager/utils/mainWindowManager";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex",
    overflow: "hidden"
  }
});

// 窗口主体
class MainWindow extends Reflux.Component {
  state = {
    leftBarType: "main",
    tag: "mainPage",
    aboutDialog: false,
    databaseDebugDialog: false,
    loading: false
  };

  render() {
    const { classes, theme } = this.props;

    try {
      return (
        <div className={classes.root}>
          <TestDialog />
          <TestDrawer />
        </div>
      );
    } catch (e) {
      remote.getCurrentWebContents().openDevTools();
      throw e;
    }
  }
}

MainWindow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainWindow);
