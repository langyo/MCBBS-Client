import React from "react";
import Reflux from "reflux";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import Drawer from "./views/drawer";
import WindowManager from "./views/windowManager";
import Background from "./views/background";
import Secretary from "./views/secretary";

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

const palette = {
  primary: { main: '#00C853', contrastText: '#ffffff' },
  secondary: { main: '#2E7D32', contrastText: '#ffffff' }
};

const theme = createMuiTheme({ 
  palette: palette, 
  themeName: "默认主题" 
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
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Drawer />
            <WindowManager />
            <Background />
            <Secretary />

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
