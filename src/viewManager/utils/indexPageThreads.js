import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  content: {
    maxHeight: 300,
    overflow: "hidden",
    position: "relative"
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

class Floor extends Reflux.Component {
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} src={this.props.accountAvatar} />
          }
          title={this.props.threadTitle}
          subheader={this.props.contentTimeInfo}
        />
        <CardContent>
          <Typography
            className={classes.content}
            component="p"
            dangerouslySetInnerHTML={{ __html: this.props.content }}
          />
        </CardContent>
      </div>
    );
  }
}

Floor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Floor);
