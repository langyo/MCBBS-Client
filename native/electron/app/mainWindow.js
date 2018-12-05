const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const { ipcRenderer, shell } = electron;
const remote = electron.remote;

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExtensionIcon from "@material-ui/icons/Extension";

import { Window, TitleBar } from 'react-desktop/windows';

const styles = {
  root: {
    height:'100%',
    width:'100%',
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  canDrag: {
    "-webkit-app-region": "drag"
  },
  canNootDrag: {
    "-webkit-app-region": "no-drag"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  }
};

class MainWindow extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <InsertDriveFileIcon />{" "}
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <AccountCircleIcon />{" "}
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <ExtensionIcon />{" "}
            </ListItemIcon>
          </ListItem>
        </List>
      </div>
    );
    return (
      <Window
        color={this.props.color}
        theme={this.props.theme}
        className={classes.root}
        chrome
      >
        <TitleBar title="Client" controls 
          onCloseClick={() => remote.process.exit()}
        />
        <AppBar position="static">
          <Toolbar className={classes.canDrag}>
            <IconButton
              className={classes.menuButton + " " + classes.canNootDrag}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Client
            </Typography>
          </Toolbar>
        </AppBar>
      </Window>
    );
  }
}

MainWindow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainWindow);
