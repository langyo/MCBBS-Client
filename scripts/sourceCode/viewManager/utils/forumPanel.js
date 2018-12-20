import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreIcon from "@material-ui/icons/MoreVert";

import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

let forumList = [
  {
    name: "原版问答",
    info: "1",
    avatar: "http://attachment.mcbbs.net/common/5f/common_110_icon.png"
  },
  {
    name: "联机问答",
    info: "2",
    avatar: "http://attachment.mcbbs.net/common/5f/common_110_icon.png"
  },
  {
    name: "Mod问答",
    info: "3",
    avatar: "http://attachment.mcbbs.net/common/5f/common_110_icon.png"
  },
  {
    name: "周边问答",
    info: "4",
    avatar: "http://attachment.mcbbs.net/common/5f/common_110_icon.png"
  },
  {
    name: "PE问答",
    info: "5",
    avatar: "http://attachment.mcbbs.net/common/5f/common_110_icon.png"
  }
];

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

function forumPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>问答大版</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <List component="nav" className={classes.list}>
            {forumList.map(n => (
              <ListItem button>
                <ListItemIcon>
                  <Avatar src={n.avatar} />
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
        <Divider />
        <ExpansionPanelActions>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

forumPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(forumPanel);
