import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";

import CubeSendIcon from "mdi-material-ui/CubeSend";
import MenuUpIcon from "mdi-material-ui/MenuUp";

import Stores from '../../resourceManager/stores';
import { Icon } from "@material-ui/core";

const styles = theme => ({
    root: {
        position: 'absolute',
        right: theme.spacing(1),
        bottom: theme.spacing(1)
    },
    fab: {
        margin: theme.spacing(1),
        paddingRight: theme.spacing(8)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    extendedButton: {
        transform: "translateX(-64px)"
    }
});

class FabView extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = Stores.view.fab;
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <Fab variant="extended" color="primary" className={classes.fab} onClick={() => console.log(1)}>
                    <CubeSendIcon className={classes.extendedIcon} />
                    开始游戏
                </Fab>
                <IconButton className={classes.extendedButton} onClick={() => console.log(2)}>
                    <MenuUpIcon />
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(FabView);
