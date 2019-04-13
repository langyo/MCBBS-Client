import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import Stores from '../../resourceManager/stores';

import AboutDialog from '../dialogs/about';

const styles = theme => ({

});

class MainWindowManager extends Reflux.Component {
  constructor() {
    super();
    // this.stores = [Stores.view.dialog];
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        {/* {this.state.show == 'about' && <AboutDialog />} */}
      </div>
    );
  }
}

export default withStyles(styles)(MainWindowManager);
