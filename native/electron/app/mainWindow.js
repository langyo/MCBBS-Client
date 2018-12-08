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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import MobileStepper from '@material-ui/core/MobileStepper';

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

import { Window, TitleBar } from "react-desktop/windows";

import MainPageTag from "./bin/viewManager/mainPage";

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%'
  },
  grow: {
    flexGrow: 1
  },
  shrink: {
    flexShrink: 0
  },
  leftAppBar: {
    position: 'absolute',
    width: 40,
    left: 0,
    top: 0,
    background: '#999',
    height: '100%'
  },
  documentList: {
    position: 'absolute',
    width: 190,
    left: 50,
    top: 0,
    background: '#ecdec1',
    height: '100%'
  },
  documentArea: {
    position: 'absolute',
    paddingLeft: 240,
    boxSizing: 'border-box',
    top: 0,
  },
  primaryColor: {
    colorPrimary: '#ecdec1'
  }
};

let tags = {
  // 栏一，论坛概览
  "快速访问":[],
  "收藏":[],
  // 栏二，标签列表
  "正在编辑":[],
  "正在查看":[],
  "历史记录":[],
  // 栏三，个性化
  "个人中心":[],
  "设置":[],
};

// 构建新的标签实体
function Tag(object, where){
  this.tagId = tags[where].length;

  this.title = object.title == null ? "未知标题" : object.title;
  this.subTitle = object.subTitle == null ? "" : object.subTitle;
  this.icon = object.icon == null ? <DescriptionIcon /> : object.icon;
  this.content = object.content == null ? {} : object.content;

  this.enableClose = object.enableClose == null ? true : object.enableClose;
  this.enableSelect = object.enableSelect == null ? true : object.enableSelect;

  this.titleBold = object.titleBold == null ? false : object.titleBold;
  this.titleItalic = object.titleItalic == null ? false : object.titleItalic;
  this.titleUnderline = object.titleUnderline == null ? false : object.titleUnderline;
  this.titleDeleteline = object.titleDeleteline == null ? false : object.titleDeleteline;
  this.titleColor = object.titleColor == null ? "#000" : object.titleColor;

  if(object.render == null) throw Error('未定义标签的渲染器！');
  this.render = object.render;
}

function newTag(object, where){
  tags[where].push(new Tag(object, where));
}

// 标签图标列表
const icons = {
  "主页": <HomeIcon />,
  "帖子": <DescriptionIcon />,
  "投票": <VoteIcon />,
  "悬赏": <NeedHelpIcon />,
}

class MainWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      isMaximized: false,
      tag: "论坛概览",
      subTag: 0
    };
  }

  toggleMaximize() {
    this.setState((state, porps) => {
      return {
        isMaximized: !state.isMaximized
      };
    }, () => {
      remote.getCurrentWindow().maximize();
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Window
          color={'#6bbb45'}
          theme={this.props.theme}
          width='800'
          height='600'
          chrome
        >
          <TitleBar title="Client" controls
            background={'#6bbb45'}
            onCloseClick={() => remote.process.exit()}
            onMinimizeClick={() => remote.getCurrentWindow().minimize()}
            onMaximizeClick={this.toggleMaximize}
          />
          <div className={classes.grow + " " + classes.shrink}>
            <div className={classes.paddingLeft}>
              <Grid container direction='column' justify='flex-start' alignItems='baseline' className={classes.stretch}>
                <Grid item xs={1}>
                  <IconButton>
                    <DescriptionIcon color={"primary"} className={classes.primaryColor}/>
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton>
                    <ListIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton>
                    <WidgetsIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
            <div className={classes.documentList}>
              <List>
                <ListItem>
                  {icons['主页']}
                  <ListItemText primary="主页" />
                  <ListItemSecondaryAction>
                    <IconButton disabled aria-label="关闭">
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
            <div className={classes.documentArea}>
              
            </div>
          </div>
        </Window>
      </div>
    );
  }
}

MainWindow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainWindow);
