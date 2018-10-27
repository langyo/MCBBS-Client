import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import { res } from "../../lib/resources";

const styles = theme => ({
  list: {
    marginTop: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  }
});

function MainPageForumList(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          {res.MainPageForumList.map(({ forumGroupName, forums }) => (
            <Fragment>
              <ListSubheader className={classes.subHeader}>
                {forumGroupName}
              </ListSubheader>
              {forums.map(({ name, info, avatar }) => {
                <ListItem button onClick={null}>
                  <Avatar src={avatar} />
                  <ListItemText primary={name} secondary={info} />
                </ListItem>;
              })}
            </Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}

MainPageForumList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainPageForumList);
