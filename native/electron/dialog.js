const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const { ipcRenderer, shell } = electron;
const remote = electron.remote;

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

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
import LinearProgress from '@material-ui/core/LinearProgress';

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from "@material-ui/icons/Description";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import WidgetsIcon from "@material-ui/icons/Widgets";
import ListIcon from "@material-ui/icons/List";
import HomeIcon from "@material-ui/icons/Home";
import VoteIcon from "@material-ui/icons/HowToVote";
import NeedHelpIcon from "@material-ui/icons/LiveHelp";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SendIcon from "@material-ui/icons/Send";
import NoticeIcon from "@material-ui/icons/Notifications";
import SettingIcon from "@material-ui/icons/Settings";
import FaceIcon from "@material-ui/icons/Face";
import TodayIcon from "@material-ui/icons/Today";
import StarIcon from "@material-ui/icons/Star";
import PaintIcon from "@material-ui/icons/ColorLens";
import StoreIcon from "@material-ui/icons/StoreMallDirectory";
import InfoIcon from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LanguageIcon from "@material-ui/icons/Language";

import CustomScroll from "react-custom-scroll";

import MainPageRender from "./scripts/viewManager/pages/mainPage";
import WatchThreadRender from "./scripts/viewManager/pages/watchThread";
import ForumRender from "./scripts/viewManager/pages/forum";

import TestData from "./scripts/viewManager/testData";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex",
    overflow: "hidden"
  },
  content: {
    overflowX: "hidden",
    overflowY: "auto",
    maxHeight: "600px",
    width: "752px"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 48
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  toolbarDrawerClosing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

let tags = [];

// 构建新的标签实体
class Tag {
  constructor(object, where) {
    this.uuid = + new Date();

    this.title = object.title == null ? "未知标题" : object.title;
    this.subTitle = object.subTitle == null ? "" : object.subTitle;
    this.icon = object.icon == null ? <DescriptionIcon /> : object.icon;
    this.content = object.content == null ? {} : object.content;

    this.enableClose = object.enableClose == null ? true : object.enableClose;
    this.enableSelect =
      object.enableSelect == null ? true : object.enableSelect;

    this.titleBold = object.titleBold == null ? false : object.titleBold;
    this.titleItalic = object.titleItalic == null ? false : object.titleItalic;
    this.titleUnderline =
      object.titleUnderline == null ? false : object.titleUnderline;
    this.titleDeleteline =
      object.titleDeleteline == null ? false : object.titleDeleteline;
    this.titleColor = object.titleColor == null ? "#000" : object.titleColor;

    if (object.render == null) throw Error("未定义标签的渲染器！");
    this.render = object.render;
  }
}

function newTag(object) {
  tags.push(new Tag(object));
}

// 测试数据
newTag({
  title: TestData.threads[825413].title,
  subTitle: TestData.users[TestData.threads[825413].author].name,
  render: <WatchThreadRender thread={825413} />
});
newTag({
  title: TestData.forums["announcement-1"].name,
  icon: <WidgetsIcon />,
  render: <ForumRender forum="announcement-1" />
});
newTag({
  title: "模拟浏览器标签",
  icon: <LanguageIcon />,
  render: <webview src="http://www.mcbbs.net/forum.php" style={{ width: "770px", height: "600px" }} />
})

// 窗口主体
class MainWindow extends React.Component {
  state = {
    leftBarType: "main",
    tag: "mainPage"
  };

  handleOpenDevTools = () => {
    remote.getCurrentWebContents().openDevTools({ detach: true });
  }

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

  handleCreateTagDestoryer = function(id) {
    return () => {
      tags.splice(id, 1);
      this.setState({
        tag: this.state.tag === (+ this.state.tag) && this.state.tag - 1 < 0 ? "mainPage" : this.state.tag - 1
      });
    }
  }

  mainRef = React.createRef();

  render() {
    const { classes, theme } = this.props;

    try {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.leftBarType !== "main",
              [classes.drawerClose]: this.state.leftBarType === "main"
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.leftBarType !== "main",
                [classes.drawerClose]: this.state.leftBarType === "main"
              })
            }}
            open={this.state.leftBarType !== "main"}
          >
            {this.state.leftBarType === "documents" && (
              <div>
                <div className={classes.toolbar}>
                  <Fade
                    in={this.state.leftBarType === "documents"}
                    timeout={500}
                  >
                    <IconButton onClick={this.handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </Fade>
                </div>
                <Divider />
                <List>
                  {tags.map((n, index) => {
                    return (
                      <ListItem
                        key={n.uuid}
                        button
                        onClick={this.handleCreateTagSelector(index)}
                        selected={this.state.tag === index}
                      >
                        {n.icon}
                        <ListItemText
                          primary={<Typography noWrap>{n.title}</Typography>}
                          secondary={n.subTitle}
                        />
                        {n.enableClose && (
                          <ListItemSecondaryAction>
                            <Fade
                              in={this.state.leftBarType === "documents"}
                              timeout={500}
                            >
                              <IconButton>
                                <CloseIcon onClick={this.handleCreateTagDestoryer(index)}/>
                              </IconButton>
                            </Fade>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    );
                  })}
                  <ListSubheader>快速通道</ListSubheader>
                  <ListItem
                    button
                    onClick={this.handleCreateTagSelector("mainPage")}
                    selected={this.state.tag === 'mainPage'}
                  >
                    <HomeIcon />
                    <ListItemText primary="主页" />
                  </ListItem>
                  <ListItem button>
                    <TodayIcon />
                    <ListItemText
                      primary="签到"
                      secondary={"您今日还未签到！"}
                    />
                  </ListItem>
                  <ListItem button>
                    <StarIcon />
                    <ListItemText primary="收藏" />
                  </ListItem>
                  <ListItem button>
                    <ListAltIcon />
                    <ListItemText primary="任务" />
                  </ListItem>
                </List>
              </div>
            )}

            {this.state.leftBarType === "navigation" && (
              <div>
                <div className={classes.toolbar}>
                  <Fade
                    in={this.state.leftBarType === "navigation"}
                    timeout={500}
                  >
                    <IconButton onClick={this.handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </Fade>
                </div>
                <Divider />
                <List>
                  <ListSubheader>通知</ListSubheader>
                  <ListItem button>
                    <SendIcon />
                    <ListItemText primary="消息" secondary={"没有新消息"} />
                  </ListItem>
                  <ListItem button>
                    <NoticeIcon />
                    <ListItemText primary="我的帖子" secondary={"没有新通知"} />
                  </ListItem>
                  <ListItem button>
                    <SettingIcon />
                    <ListItemText primary="系统提醒" secondary={"没有新通知"} />
                  </ListItem>
                  <ListItem button>
                    <FaceIcon />
                    <ListItemText primary="坛友互动" secondary={"没有新通知"} />
                  </ListItem>
                </List>
              </div>
            )}

            {this.state.leftBarType === "settings" && (
              <div>
                <div className={classes.toolbar}>
                  <Fade
                    in={this.state.leftBarType === "settings"}
                    timeout={500}
                  >
                    <IconButton onClick={this.handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </Fade>
                </div>
                <Divider />
                <List>
                  <ListSubheader>个性化</ListSubheader>
                  <ListItem button>
                    <SettingIcon />
                    <ListItemText primary="本体设置" />
                  </ListItem>
                  <ListItem button>
                    <PaintIcon />
                    <ListItemText primary="主题" />
                  </ListItem>
                  <ListItem button>
                    <InfoIcon />
                    <ListItemText primary="关于" />
                  </ListItem>
                  <ListSubheader>插件控制</ListSubheader>
                  <ListItem button>
                    <StoreIcon />
                    <ListItemText primary="插件中心" />
                  </ListItem>
                  <ListItem button onClick={this.handleOpenDevTools}>
                    <SettingIcon />
                    <ListItemText primary="开发者控制" />
                  </ListItem>
                </List>
              </div>
            )}

            {this.state.leftBarType === "users" && (
              <div>
                <div className={classes.toolbar}>
                  <Fade in={this.state.leftBarType === "users"} timeout={500}>
                    <IconButton onClick={this.handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </Fade>
                </div>
                <Divider />
                <List>
                  <ListItem button>
                    <AddIcon />
                    <ListItemText primary="新增账户" />
                  </ListItem>
                </List>
              </div>
            )}

            <div className={classes.toolbarDrawerClosing}>
              <Fade in={this.state.leftBarType === "main"} timeout={500}>
                <IconButton
                  onClick={this.handleDrawerOpenUsers}
                  className={
                    this.state.leftBarType !== "main" ? " " + classes.hide : ""
                  }
                >
                  <AccountCircleIcon />
                </IconButton>
              </Fade>
            </div>
            <Divider />
            <Fade in={this.state.leftBarType === "main"} timeout={500}>
              <IconButton
                onClick={this.handleDrawerOpenDocuments}
                className={
                  this.state.leftBarType !== "main" ? " " + classes.hide : ""
                }
              >
                <DescriptionIcon />
              </IconButton>
            </Fade>
            <Fade in={this.state.leftBarType === "main"} timeout={500}>
              <IconButton
                onClick={this.handleDrawerOpenNavigation}
                className={
                  this.state.leftBarType !== "main" ? " " + classes.hide : ""
                }
              >
                <ListIcon />
              </IconButton>
            </Fade>
            <Fade in={this.state.leftBarType === "main"} timeout={500}>
              <IconButton
                onClick={this.handleDrawerOpenSettings}
                className={
                  this.state.leftBarType !== "main" ? " " + classes.hide : ""
                }
              >
                <WidgetsIcon />
              </IconButton>
            </Fade>
            <Divider />
          </Drawer>
          <main className={classes.content} ref={this.mainRef}>
              {/* <LinearProgress /> */}
              {(this.state.tag === "mainPage" && <MainPageRender />) || (
                <div key={this.state.tag}>{tags[this.state.tag].render}</div>
              )}
          </main>
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
