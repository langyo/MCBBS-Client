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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

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
        this.stores = [Stores.view.dialog, Stores.view.theme];
    }

    handleCloseDialog = Actions.view.dialog.reset;

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
                            <List>
                            {
                                [
                                    {
                                        color: '#39C5BB',
                                        name: "初音绿"
                                    },
                                    {
                                        color: '#FFA500',
                                        name: "镜音铃橙"
                                    },
                                    {
                                        color: '#FFE211',
                                        name: "镜音连黄"
                                    },
                                    {
                                        color: '#FAAFBE',
                                        name: "巡音粉"
                                    },
                                    {
                                        color: '#66CCFF',
                                        name: "天依蓝"
                                    },
                                    {
                                        color: '#99FFFF',
                                        name: "言和青"
                                    },
                                    {
                                        color: '#EE0000',
                                        name: "正绫红"
                                    }].map(n => (
                                    <ListItem button onClick={() => Actions.view.theme.togglePrimary(n.color)} key={n.color}>
                                        <Avatar style={{backgroundColor: n.color}} />
                                        <ListItemText primary={n.name} secondary={this.state.primaryColor == n.color ? "已选中" : ""}/>
                                    </ListItem>
                                ))
                            }
                            </List>
                        </CardContent>
                        <CardContent>
                            <Typography variant="subtitle1" className={classes.subTitle}>
                                副色
                            </Typography>
                            <List>
                            {
                                [
                                    {
                                        color: '#39C5BB',
                                        name: "初音绿"
                                    },
                                    {
                                        color: '#FFA500',
                                        name: "镜音铃橙"
                                    },
                                    {
                                        color: '#FFE211',
                                        name: "镜音连黄"
                                    },
                                    {
                                        color: '#FAAFBE',
                                        name: "巡音粉"
                                    },
                                    {
                                        color: '#66CCFF',
                                        name: "天依蓝"
                                    },
                                    {
                                        color: '#99FFFF',
                                        name: "言和青"
                                    },
                                    {
                                        color: '#EE0000',
                                        name: "正绫红"
                                    }].map(n => (
                                    <ListItem button onClick={() => Actions.view.theme.toggleSecondary(n.color)} key={n.color}>
                                        <Avatar style={{backgroundColor: n.color}} />
                                        <ListItemText primary={n.name} secondary={this.state.secondaryColor == n.color ? "已选中" : ""}/>
                                    </ListItem>
                                ))
                            }
                            </List>
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
