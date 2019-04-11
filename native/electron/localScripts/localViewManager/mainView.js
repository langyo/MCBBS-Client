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
import Fade from "@material-ui/core/Fade";
import Grow from '@material-ui/core/Grow';

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
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
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import MenuIcon from "mdi-material-ui/Menu";
import CloseIcon from "mdi-material-ui/Close";
import DocumentIcon from "mdi-material-ui/FileDocument";
import AccountCircleIcon from "mdi-material-ui/AccountCircle";
import WidgetsIcon from "mdi-material-ui/Widgets";
import ListIcon from "mdi-material-ui/FormatListBulleted";
import HomeIcon from "mdi-material-ui/Home";
import ChevronLeftIcon from "mdi-material-ui/ChevronLeft";
import SendIcon from "mdi-material-ui/Send";
import NoticeIcon from "mdi-material-ui/Bell";
import SettingIcon from "mdi-material-ui/Settings";
import FaceIcon from "mdi-material-ui/Face";
import SignInIcon from "mdi-material-ui/CalendarClock";
import StarIcon from "mdi-material-ui/Star";
import PaintIcon from "mdi-material-ui/Palette";
import StoreIcon from "mdi-material-ui/Store";
import InfoIcon from "mdi-material-ui/Information";
import AddIcon from "mdi-material-ui/Plus";
import TaskIcon from "mdi-material-ui/CalendarText";
import WebIcon from "mdi-material-ui/Web";
import DatabaseIcon from "mdi-material-ui/Database";

import CustomScroll from "react-custom-scroll";
import JsonView from "react-json-view";
// import TitleBar from 'frameless-titlebar';

import MainPageRender from "../../../../scripts/srcJs/viewManager/pages/mainPage";
import WatchThreadRender from "../../../../scripts/srcJs/viewManager/pages/watchThread";
import ForumRender from "../../../../scripts/srcJs/viewManager/pages/forum";
import WebviewRender from "../localWebView/webviewRender";
import LoginRender from "../../../../scripts/srcJs/viewManager/pages/login";
import ForumsRender from "../../../../scripts/srcJs/viewManager/pages/forums";

import TestData from "../../../../scripts/srcJs/viewManager/testData";
import pageBindScript from "../../../../scripts/srcJs/forumWorker/pageBindScript";
import db from "../localDatabase/database";

import TestDrawer from "../../../../scripts/srcJs/viewManager/utils/mainDrawer";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex",
    overflow: "hidden"
  },
  // content: {
  //   overflowX: "hidden",
  //   overflowY: "auto",
  //   maxHeight: "600px",
  //   width: "752px"
  // },
  // hide: {
  //   display: "none"
  // },
  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  //   whiteSpace: "nowrap"
  // },
  // drawerOpen: {
  //   width: drawerWidth,
  //   transition: theme.transitions.create("width", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen
  //   })
  // },
  // drawerClose: {
  //   transition: theme.transitions.create("width", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen
  //   }),
  //   overflowX: "hidden",
  //   width: 48
  // },
  // toolbar: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   padding: "0 8px",
  //   ...theme.mixins.toolbar
  // },
  // toolbarDrawerClosing: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: "0 8px",
  //   ...theme.mixins.toolbar
  // }
});

// let tags = [];

// // 构建新的标签实体
// class Tag {
//   constructor(object) {
//     this.key = shortid.generate();

//     this.title = object.title == null ? "未知标题" : object.title;
//     this.subTitle = object.subTitle == null ? "" : object.subTitle;
//     this.icon = object.icon == null ? <DocumentIcon /> : object.icon;
//     this.content = object.content == null ? {} : object.content;

//     this.enableClose = object.enableClose == null ? true : object.enableClose;
//     this.enableSelect =
//       object.enableSelect == null ? true : object.enableSelect;

//     this.titleBold = object.titleBold == null ? false : object.titleBold;
//     this.titleItalic = object.titleItalic == null ? false : object.titleItalic;
//     this.titleUnderline =
//       object.titleUnderline == null ? false : object.titleUnderline;
//     this.titleDeleteline =
//       object.titleDeleteline == null ? false : object.titleDeleteline;
//     this.titleColor = object.titleColor == null ? "#000" : object.titleColor;

//     if (object.render == null) throw Error("未定义标签的渲染器！");
//     this.render = object.render;
//   }
// }

// function newTag(object) {
//   tags.push(new Tag(object));
// }

// // 测试数据
// newTag({
//   title: TestData.threads[825413].title,
//   subTitle: TestData.users[TestData.threads[825413].author].name,
//   render: <WatchThreadRender thread={825413} />
// });
// newTag({
//   title: TestData.forums["announcement-1"].name,
//   icon: <WidgetsIcon />,
//   render: <ForumRender forum="announcement-1" />
// });

// 窗口主体
class MainWindow extends Reflux.Component {
  state = {
    leftBarType: "main",
    tag: "mainPage",
    aboutDialog: false,
    databaseDebugDialog: false,
    loading: false
  };

  handleRefresh = () => {
    console.log('refresh!');
    this.setState({});
  };

  handleOpenDevTools = () => {
    remote.getCurrentWebContents().openDevTools({ detach: true });
  };

  handleDrawerOpenUsers = () => {
    this.setState({ leftBarType: "users" });
  };

  handleDrawerOpenNavigation = () => {
    this.setState({ leftBarType: "navigation" });
  };

  handleDrawerOpenDocuments = () => {
    this.setState({ leftBarType: "documents" });
  };

  handleDrawerOpenSettings = () => {
    this.setState({ leftBarType: "settings" });
  };

  handleDrawerClose = () => {
    this.setState({ leftBarType: "main" });
  };

  handleCreateTagSelector = function (id) {
    return () => {
      this.mainRef.current.scrollTo(0, 0);
      this.setState({ tag: id });
    };
  };

  handleCreateTagDestoryer = function (id) {
    return () => {
      let where = tags.indexOf(id);
      let selecting = tags.indexOf(this.state.tag);
      if (where === selecting) where = 0;

      tags.splice(id, 1);
      this.setState({
        tag: tags.length <= 1 ? "mainPage" : tags[where].key
      });
    }
  };

  handleOpenAboutDialog = () => this.setState({ aboutDialog: true });

  handleCloseAboutDialog = () => this.setState({ aboutDialog: false });

  handleOpenDatabaseDebugDialog = () => this.setState({ databaseDebugDialog: true });

  handleCloseDatabaseDebugDialog = () => this.setState({ databaseDebugDialog: false });

  handleOpenLoadingProgress = () => this.setState({ loading: true });

  handleCloseLoadingProgress = () => this.setState({ loading: false });

  mainRef = React.createRef();

  render() {
    const { classes, theme } = this.props;

    try {
      return (
        <div className={classes.root}>
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
