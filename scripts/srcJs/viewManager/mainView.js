import React from "react";
import Reflux from "reflux";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import MainDrawer from "./utils/mainDrawer";

const Home = () => (
  <div>
    <ul>
      <li><Link to='/schedule'>Schedule</Link></li>
    </ul>
  </div>
)

const Schedule = () => (
  <div>
    <ul>
      <li>6/5 @ Evergreens</li>
      <li>6/8 vs Kickers</li>
      <li>6/14 @ United</li>
      <li><Link to='/'>Home</Link></li>
    </ul>
  </div>
)

class RouterView extends Reflux.Component {
  render() {
    return (
      <BrowserRouter>
        <MainDrawer />

        <Switch>
          <Route exact path='/index' component={Home} />
          <Route path='/schedule' component={Schedule} />
          <Redirect path="/" to={{pathname: '/index'}} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default RouterView;
