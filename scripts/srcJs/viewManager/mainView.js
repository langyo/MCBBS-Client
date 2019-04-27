import React from "react";
import Reflux from "reflux";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import Drawer from "./views/drawer";
import WindowManager from "./views/windowManager";
import Background from "./views/background";

import Forum from "./pages/forums";

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    border: 0
  }
});

const Home = () => (
  <div>
    <ul>
      <li><Link to='/forum'>Forum</Link></li>
    </ul>
  </div>
)

class MainView extends Reflux.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <BrowserRouter>
          <Drawer />
          <WindowManager />
          <Background />

          <Switch>
            <Route exact path='/index' component={Home} />
            <Route path='/forum' component={() => <Forum />} />
            <Redirect path="/" to={{ pathname: '/index' }} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default withStyles(styles)(MainView);
