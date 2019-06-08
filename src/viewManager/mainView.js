import React from "react";
import Reflux from "reflux";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Drawer from "./views/drawer";
import WindowManager from "./views/windowManager";
import Background from "./views/background";
// import Secretary from "./views/secretary";
import FabView from "./views/fab";

import Forum from "./pages/forums";

import Stores from "../resourceManager/stores";
import Actions from "../resourceManager/actions";

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
  constructor(props) {
    super(props);
    this.store = Stores.view.theme;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={createMuiTheme({
          palette: {
            primary: { main: this.state.primaryColor, contrastText: '#ffffff' },
            secondary: { main: this.state.secondaryColor, contrastText: '#ffffff' }
          }
        })}>
          <BrowserRouter>
            <Drawer />
            <WindowManager />
            {/* <Background /> */}
            {/* <Secretary /> */}
            <FabView />

            <Switch>
              <Route exact path='/index' component={Home} />
              <Route path='/forum' component={() => <Forum />} />
              <Redirect path="/" to={{ pathname: '/index' }} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(MainView);
