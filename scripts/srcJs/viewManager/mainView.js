import React from "react";
import Reflux from "reflux";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import Drawer from "./views/drawer";
import WindowManager from "./views/windowManager";

import Forum from "./pages/forums";

const Home = () => (
  <div>
    <ul>
      <li><Link to='/forum'>Forum</Link></li>
    </ul>
  </div>
)

class MainView extends Reflux.Component {
  render() {
    return (
      <BrowserRouter>
        <Drawer />
        <WindowManager />

        <Switch>
          <Route exact path='/index' component={Home} />
          <Route path='/forum' component={() => <Forum />} />
          <Redirect path="/" to={{pathname: '/index'}} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default MainView;
