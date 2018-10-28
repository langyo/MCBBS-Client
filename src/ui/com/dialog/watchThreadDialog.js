import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { res } from "../src/lib/resources";
import TextViewer from "../src/ui/com/textEditor/fullTextViewer";

const style = theme => {
  root: {
    width: "100%";
  }
};

// 普通楼层
// Prop 参数：
//   userId - 此层楼的用户 ID
//   floorId - 楼层 ID，也就是楼层在 res 里的编号
//   floorCount - 楼层编号，也就是第几层
class Floor extends React.Component {
  handleMoreClick = () => {};

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label={res.users[this.props.userId].name}
              src={res.users.getAvatarUrl(this.props.userId)}
            />
          }
          action={
            <IconButton>
              {" "}
              <MoreVertIcon onClick={this.handleMoreClick} />{" "}
            </IconButton>
          }
          title={res.users[this.props.userId].name}
          subHeader={res.users.getGroupName(this.props.userId)}
        />
        <CardContent>
          {/* 日期部分 */}
          <Typography variant="caption" gutterBottom align="center">
            {"最后编辑于 " + res.floor[this.props.floorId].latestEditTime}
          </Typography>
          {/* 内容部分 */}
          <TextViewer content={res.floor[this.props.floorId].content} />
          {/* 评分部分 */}
          <Typography variant="" />
        </CardContent>
      </Card>
    );
  }
}

Floor.propTypes = {
  classes: PropTypes.object.isRequired
};

// 帖子头部
// Prop 参数：
//   threadId - 帖子编号
class FloorHead extends React.Component {
  handleMoreClick = () => {};

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton>
              {" "}
              <MoreVertIcon onClick={this.handleMoreClick} />{" "}
            </IconButton>
          }
          title={res.thread[this.props.threadId].title}
        />
        <CardContent> </CardContent>
      </Card>
    );
  }
}

FloorHead.propTypes = {
  classes: PropTypes.object.isRequired
};
