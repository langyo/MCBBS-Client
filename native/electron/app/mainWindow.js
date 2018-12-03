const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const { ipcRenderer, shell } = electron;
const { dialog } = electron.remote;

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

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
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
    state = {
        drawerOpen: false
    };

    toggleDrawer = open => () => {
        this.setState({
            drawerOpen: open
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button>
                        <ListItemIcon> <InsertDriveFileIcon /> </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon> <ExtensionIcon /> </ListItemIcon>
                    </ListItem>
                </List>
            </div>
        );
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Client
            </Typography>
                        <IconButton color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

MainWindow.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainWindow);
