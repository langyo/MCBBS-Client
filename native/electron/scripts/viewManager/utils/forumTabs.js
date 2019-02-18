import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TestData from "../testData";

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

class ForumTabs extends React.Component {
  state = {
    value: 0,
  };
  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;
    let tabs;
    if (this.props.group&&this.props.group.forums) {
      tabs =
          <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="off"
              centered={true}
          >
            {
              Object.keys(this.props.group.forums).map(n => (
                  <Tab label={this.props.group.forums[n].name}/>
              ))
            }
          </Tabs>
    }

    return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
            {tabs}
          </AppBar>
        </div>
    );
  }
}

ForumTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForumTabs);
