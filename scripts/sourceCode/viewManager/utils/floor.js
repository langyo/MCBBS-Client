import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import VoteIcon from "@material-ui/icons/HowToVote";

const styles = theme => ({
  actions: {
    display: "flex"
  },
  expand: {
    marginLeft: "auto" // 右侧按钮对齐
  },
  floatLeft: {
    float: "left"
  },
  floatRight: {
    float: "right"
  }
});

class Floor extends React.Component {
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              src="http://www.mcbbs.net/uc_server/data/avatar/001/28/74/72_avatar_middle.jpg"
            />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="langyo"
          subheader="Lv 8 . 考古家"
        />
        <CardContent>
          <Typography variant="caption" className={classes.floatLeft}>
            发布于 2018 年 12 月 13 日 13:26
          </Typography>
          <Typography variant="caption" className={classes.floatRight}>
            # 1
          </Typography>
        </CardContent>
        <CardContent>
          <Typography component="p">这是一段测试文本！</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton>
            <VoteIcon />
          </IconButton>
          <IconButton className={classes.expand}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

Floor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Floor);
