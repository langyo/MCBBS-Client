import React from "react";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import Avatar from "@material-ui/core/Avatar";

import { res } from "../../lib/resources";

const styles = theme => ({
  list:{
    marginTop:theme.spacing.unit * 2
  },
  subHeader:{
    backgroundColor:theme.palette.background.paper
  }
});

class MainPageForumList extends React.Component{
  render(){
    return({
      <React.Component>
        <List className={classes.list}>
          {
            res.mainPage.map(({ forumGroupName, forums }) => (
              <Fragment
            ));
          }
        </List>
      </React.Component>
    });
  }
}