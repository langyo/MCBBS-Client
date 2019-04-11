import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import MainDrawer from "./utils/mainDrawer";

const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
)
const About = () => (
  <div>
    <h2>关于</h2>
  </div>
)

class RouterView extends Component {
  render() {
    return (
      <Router>

        <div>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/about">关于</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default RouterView;
