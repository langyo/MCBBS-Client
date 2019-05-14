import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grow from '@material-ui/core/Grow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { CirclePicker } from 'react-color';

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({
    subTitle: {
        marginBottom: 8,
    }
});

class MainWindowManager extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [Stores.view.global.dialog, Stores.view.global.theme];
    }

    handleCloseDialog = Actions.view.global.dialog.reset;

    render() {
        const { classes, theme } = this.props;

        return (
            <Dialog
                open={this.state.show == 'colorChoser'}
                onClose={this.handleCloseDialog}
            >
                <DialogTitle>主题选择</DialogTitle>
                <DialogContent>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" className={classes.subTitle}>
                                主色
                            </Typography>
                            <CirclePicker
                                width="300px"
                                colors={['#39C5BB', '#FFA500', '#FFE211', '#FAAFBE', '#66CCFF', '#99FFFF', '#EE0000']}
                                onChange={(color, event) => Actions.view.global.theme.togglePrimary(color.hex)}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" className={classes.subTitle}>
                                副色
                            </Typography>
                            <CirclePicker
                                width="300px"
                                colors={['#39C5BB', '#FFA500', '#FFE211', '#FAAFBE', '#66CCFF', '#99FFFF', '#EE0000']}
                                onChange={(color, event) => Actions.view.global.theme.toggleSecondary(color.hex)}
                            />
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="primary">
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(MainWindowManager);
