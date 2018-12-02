const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const { ipcRenderer, shell } = electron;
const { dialog } = electron.remote;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExtensionIcon from '@material-ui/icons/Extension';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 60;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: theme.spacing.unit * 7 + 1,
        flexShrink: 0,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

function MainWindow(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Client
                    </Typography>
                    <div className={classes.grow} />
                    <div>
                        <IconButton color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawer,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
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
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    test
                </Typography>
            </main>
        </div >
    );
}

MainWindow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainWindow);
