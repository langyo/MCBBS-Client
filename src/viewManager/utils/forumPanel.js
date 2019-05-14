import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";

import DownIcon from "mdi-material-ui/ChevronDown";
import MoreIcon from "mdi-material-ui/DotsVertical";

import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "50%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  list: {
    width: "100%"
  }
});

class ForumPanel extends Reflux.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<DownIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>
                {this.props.forumGroupName}
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <List component="nav" className={classes.list}>
              {this.props.forums.map((n, id) => (
                <ListItem button key={id}>
                  <ListItemIcon>
                    <img alt={n.avatar} src={n.avatar} />
                  </ListItemIcon>
                  <ListItemText primary={n.name} secondary={n.info} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Comments">
                      <MoreIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ForumPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForumPanel);
