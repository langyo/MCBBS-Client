import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TestData from "../testData";
import ForumTabs from "./forumTabs";

function TabContainer(props) {
  return (
      <Typography component="div" style={{padding: 8 * 3}}>
        {props.children}
      </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ForumGroup extends React.Component {
  state = {
    value:'1',
  };
  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;

    return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="off"
            >
              {
                Object.keys(TestData.mainPage.forumGroups).map(n => (
                    <Tab label={TestData.mainPage.forumGroups[n].forumGroupName}
                         value={TestData.mainPage.forumGroups[n].forumGroupId}/>
                ))
              }
            </Tabs>
          </AppBar>
          <ForumTabs group={TestData.mainPage.forumGroups[value]}/>
        </div>
    );
  }
}

ForumGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForumGroup);
