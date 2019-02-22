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

import FavoriteIcon from "mdi-material-ui/Heart";
import ShareIcon from "mdi-material-ui/Share";
import DownIcon from "mdi-material-ui/ChevronDown";
import MoreIcon from "mdi-material-ui/DotsVertical";
import VoteIcon from "mdi-material-ui/VoteOutline";
import MessageIcon from "mdi-material-ui/MessageTextOutline";
import EditIcon from "mdi-material-ui/SquareEditOutline";

import db from "../../../../native/electron/localScripts/localDatabase/database";

import testData from "../testData";

const styles = theme => ({
  floor: {
    padding: '8px',
    margin: '8px'
  },
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
      <Card className={classes.floor}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} src={this.props.accountAvatar} />
          }
          action={
            <IconButton>
              <MoreIcon />
            </IconButton>
          }
          title={this.props.accountName}
          subheader={this.props.accountInfo}
        />
        <CardContent>
          <Typography variant="caption" className={classes.floatLeft}>
            {this.props.contentTimeInfo}
          </Typography>
          <Typography variant="caption" className={classes.floatRight}>
            {"# " + this.props.contentFloor}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            component="p"
            dangerouslySetInnerHTML={{ __html: this.props.content }}
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton>{this.props.reply && <MessageIcon />}</IconButton>
          <IconButton>{this.props.edit && <EditIcon />}</IconButton>
          <IconButton className={classes.expand}>
            {this.props.rate && <VoteIcon />}
          </IconButton>
          <IconButton>
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
