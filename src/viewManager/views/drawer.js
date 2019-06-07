import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grow from '@material-ui/core/Grow';

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

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
import MoreVertIcon from "mdi-material-ui/DotsVertical";
import EarthIcon from "mdi-material-ui/Earth";

import Actions from "../../resourceManager/actions";

const styles = theme => ({
  list: {
    width: 250,
    opacity: 0.8
  },
  menuButton: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1150
  }
});

let tags = [];

// 构建新的标签实体
class Tag {
  constructor(object) {
    this.key = shortid.generate();

    this.title = object.title == null ? "未知标题" : object.title;
    this.subTitle = object.subTitle == null ? "" : object.subTitle;
    this.icon = object.icon == null ? <DocumentIcon /> : object.icon;
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
  title: "1",
  subTitle: "1",
  render: <div />
});
newTag({
  title: "2",
  icon: <WidgetsIcon />,
  render: <div />
});

class SwipeableTemporaryDrawer extends Reflux.Component {
  state = {
    drawerOpen: false,
    tag: "mainPage"
  };

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <SwipeableDrawer
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
            className={classes.list}
          >
            <CardHeader
              avatar={
                <IconButton>
                  <Avatar
                    src="http://www.mcbbs.net/uc_server/images/noavatar_big.gif"
                    className={classes.avatar}
                  />
                </IconButton>
              }
              title="未登录"
              subheader="点击右侧以登录"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <List>
              {tags.map(n => {
                return (
                  <ListItem
                    key={n.key}
                    button
                    selected={this.state.tag === n.key}
                  >
                    <ListItemIcon>{n.icon}</ListItemIcon>
                    <ListItemText
                      primary={<Typography noWrap>{n.title}</Typography>}
                      secondary={n.subTitle}
                    />
                    {n.enableClose && (
                      <ListItemSecondaryAction>
                        <IconButton onClick={null}>
                          <CloseIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                );
              })}
              <ListSubheader disableSticky>快速通道</ListSubheader>
              <ListItem button selected={this.state.tag === "mainPage"}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="主页" />
              </ListItem>
              <ListItem selected={this.state.tag === "forums"} button>
                <ListItemIcon><ListIcon /></ListItemIcon>
                <ListItemText primary="所有板块" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><SignInIcon /></ListItemIcon>
                <ListItemText primary="签到" secondary={"您今日还未签到！"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon><StarIcon /></ListItemIcon>
                <ListItemText primary="收藏" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><TaskIcon /></ListItemIcon>
                <ListItemText primary="任务" />
              </ListItem>
              <ListSubheader disableSticky>通知</ListSubheader>
              <ListItem button>
                <ListItemIcon><SendIcon /></ListItemIcon>
                <ListItemText primary="消息" secondary={"没有新消息"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon><NoticeIcon /></ListItemIcon>
                <ListItemText primary="我的帖子" secondary={"没有新通知"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon><SettingIcon /></ListItemIcon>
                <ListItemText primary="系统提醒" secondary={"没有新通知"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon><FaceIcon /></ListItemIcon>
                <ListItemText primary="坛友互动" secondary={"没有新通知"} />
              </ListItem>
              <ListSubheader disableSticky>个性化</ListSubheader>
              <ListItem button>
                <ListItemIcon><SettingIcon /></ListItemIcon>
                <ListItemText primary="本体设置" />
              </ListItem>
              <ListItem button onClick={() => Actions.view.dialog.toggleTo('colorChoser')}>
                <ListItemIcon><PaintIcon /></ListItemIcon>
                <ListItemText primary="主题" />
              </ListItem>
              <ListItem button onClick={() => Actions.view.dialog.toggleTo('about')}>
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="关于" />
              </ListItem>
              <ListItem button onClick={() => Actions.view.dialog.toggleTo('language')}>
                <ListItemIcon><EarthIcon /></ListItemIcon>
                <ListItemText primary="语言 / Language" />
              </ListItem>
              <ListSubheader disableSticky>调试区</ListSubheader>
              <ListItem button>
                <ListItemIcon><StoreIcon /></ListItemIcon>
                <ListItemText primary="插件中心" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><SettingIcon /></ListItemIcon>
                <ListItemText primary="开发者控制" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><DatabaseIcon /></ListItemIcon>
                <ListItemText primary="数据库调试" />
              </ListItem>
            </List>
            <Divider />
          </div>
        </SwipeableDrawer>
        <IconButton className={classes.menuButton} onClick={this.toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
